'use client';

import { useEffect, useRef } from 'react';
import { Renderer, Camera, Transform, Plane, Mesh, Program, Texture } from 'ogl';

const vertex = /* glsl */ `
  attribute vec3 position;
  attribute vec2 uv;
  uniform mat4 modelViewMatrix;
  uniform mat4 projectionMatrix;
  uniform float uStrength;
  varying vec2 vUv;

  void main() {
    vUv = uv;
    vec3 p = position;
    // Bow the plane along its width, proportional to scroll velocity
    p.y += sin(uv.x * 3.141592) * uStrength;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;

const fragment = /* glsl */ `
  precision highp float;
  uniform sampler2D tMap;
  uniform vec2 uPlaneSize;
  uniform vec2 uImageSize;
  uniform float uStrength;
  uniform float uAlpha;
  varying vec2 vUv;

  void main() {
    // object-fit: cover
    vec2 ratio = vec2(
      min((uPlaneSize.x / uPlaneSize.y) / (uImageSize.x / uImageSize.y), 1.0),
      min((uPlaneSize.y / uPlaneSize.x) / (uImageSize.y / uImageSize.x), 1.0)
    );
    vec2 uv = vec2(
      vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
      vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
    );

    // subtle chromatic split while scrolling
    float shift = uStrength * 0.08;
    vec4 color;
    color.r = texture2D(tMap, uv + vec2(0.0, shift)).r;
    color.g = texture2D(tMap, uv).g;
    color.b = texture2D(tMap, uv - vec2(0.0, shift)).b;
    color.a = 1.0;

    gl_FragColor = vec4(color.rgb, 1.0) * uAlpha;
  }
`;

type Item = {
  img: HTMLImageElement;
  mesh: Mesh;
  program: Program;
};

/**
 * Draws every img[data-gl] onto a fixed fullscreen WebGL canvas. Planes track
 * the DOM position each frame and bend + chroma-shift with scroll velocity
 * (the Robin Noguier effect). If WebGL fails, reduced motion is set, or the
 * device is coarse-pointer-slow, the DOM images simply stay visible.
 */
export default function GLGallery() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    let renderer: Renderer;
    try {
      renderer = new Renderer({
        canvas,
        alpha: true,
        antialias: true,
        dpr: Math.min(window.devicePixelRatio, 2),
      });
    } catch {
      return; // no WebGL, so DOM images remain visible
    }
    const gl = renderer.gl;
    const camera = new Camera(gl);
    const scene = new Transform();
    const geometry = new Plane(gl, { widthSegments: 24, heightSegments: 24 });

    const imgs = Array.from(
      document.querySelectorAll<HTMLImageElement>('img[data-gl]'),
    );
    if (imgs.length === 0) return;

    const items: Item[] = imgs.map((img) => {
      const texture = new Texture(gl, { generateMipmaps: false });
      const image = new window.Image();
      image.crossOrigin = 'anonymous';
      image.src = img.currentSrc || img.src;
      image.onload = () => {
        texture.image = image;
        program.uniforms.uImageSize.value = [
          image.naturalWidth,
          image.naturalHeight,
        ];
      };
      const program = new Program(gl, {
        vertex,
        fragment,
        uniforms: {
          tMap: { value: texture },
          uPlaneSize: { value: [1, 1] },
          uImageSize: { value: [1, 1] },
          uStrength: { value: 0 },
          uAlpha: { value: 0 },
        },
        transparent: true,
      });
      const mesh = new Mesh(gl, { geometry, program });
      mesh.setParent(scene);
      return { img, mesh, program };
    });

    document.documentElement.classList.add('gl-on');

    const resize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.orthographic({
        left: -window.innerWidth / 2,
        right: window.innerWidth / 2,
        top: window.innerHeight / 2,
        bottom: -window.innerHeight / 2,
        near: -100,
        far: 100,
      });
    };
    resize();
    window.addEventListener('resize', resize);

    let lastScroll = window.scrollY;
    let velocity = 0;
    let rafId = 0;

    const loop = () => {
      const scroll = window.scrollY;
      velocity += (scroll - lastScroll - velocity) * 0.1;
      lastScroll = scroll;
      // normalize: ~40px/frame of fast scrolling → full bend
      const strength = Math.max(-0.35, Math.min(0.35, velocity * 0.006));

      const w = window.innerWidth;
      const h = window.innerHeight;
      items.forEach(({ img, mesh, program }) => {
        const rect = img.getBoundingClientRect();
        mesh.scale.set(rect.width, rect.height, 1);
        mesh.position.set(
          rect.left + rect.width / 2 - w / 2,
          h / 2 - (rect.top + rect.height / 2),
          0,
        );
        program.uniforms.uPlaneSize.value = [rect.width, rect.height];
        program.uniforms.uStrength.value = strength;
        // follow the Reveal fade so planes don't pop in ahead of their section
        const media = img.parentElement;
        program.uniforms.uAlpha.value = media
          ? parseFloat(getComputedStyle(media).opacity || '1')
          : 1;
      });

      renderer.render({ scene, camera });
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      document.documentElement.classList.remove('gl-on');
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, []);

  return <canvas ref={canvasRef} className="gl-canvas" aria-hidden="true" />;
}
