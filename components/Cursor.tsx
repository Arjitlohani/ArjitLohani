'use client';

import { useEffect, useRef } from 'react';

/**
 * Custom cursor: a dot that tracks the pointer directly plus a ring that
 * lerps behind it, growing over interactive elements. Only activates on
 * fine-pointer devices without reduced motion; touch devices never see it.
 */
export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const finePointer = window.matchMedia(
      '(hover: hover) and (pointer: fine)',
    ).matches;
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!finePointer || reducedMotion || !dot || !ring) return;

    document.body.classList.add('has-cursor');

    let pointerX = -100;
    let pointerY = -100;
    let ringX = -100;
    let ringY = -100;
    let rafId = 0;

    const onMove = (event: PointerEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      dot.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0)`;
    };

    const loop = () => {
      ringX += (pointerX - ringX) * 0.18;
      ringY += (pointerY - ringY) * 0.18;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      rafId = requestAnimationFrame(loop);
    };

    const onOver = (event: PointerEvent) => {
      const interactive = (event.target as Element).closest?.(
        'a, button, [role="button"]',
      );
      document.body.classList.toggle('cursor-hover', Boolean(interactive));
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerover', onOver, { passive: true });
    rafId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerover', onOver);
      document.body.classList.remove('has-cursor', 'cursor-hover');
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  );
}
