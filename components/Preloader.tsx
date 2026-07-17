'use client';

import { useEffect, useState } from 'react';

const COUNT_MS = 900;
const EXIT_MS = 650;

/**
 * First-visit loading screen: counts to 100, then sweeps up to reveal the
 * page. Sets `data-ready` on <html>, which starts the hero entrance
 * animations. Skipped on repeat visits (per tab session) and under
 * prefers-reduced-motion.
 */
export default function Preloader() {
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState<'loading' | 'exiting' | 'done'>('loading');

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem('preloader-seen') === '1';
    } catch {
      // sessionStorage unavailable — treat as first visit
    }
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    if (seen || reducedMotion) {
      document.documentElement.dataset.ready = 'true';
      setPhase('done');
      return;
    }

    let rafId = 0;
    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      try {
        sessionStorage.setItem('preloader-seen', '1');
      } catch {
        // ignore
      }
      setCount(100);
      document.documentElement.dataset.ready = 'true';
      setPhase('exiting');
      window.setTimeout(() => setPhase('done'), EXIT_MS);
    };

    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / COUNT_MS);
      setCount(Math.round(progress * 100));
      if (progress < 1) rafId = requestAnimationFrame(tick);
      else finish();
    };
    rafId = requestAnimationFrame(tick);

    // rAF pauses in background tabs — never leave the page stuck behind
    // the loader if the visitor opens it in one.
    const failsafe = window.setTimeout(finish, COUNT_MS + 1200);

    return () => {
      cancelAnimationFrame(rafId);
      window.clearTimeout(failsafe);
    };
  }, []);

  if (phase === 'done') return null;

  return (
    <div
      className={`preloader${phase === 'exiting' ? ' preloader-exit' : ''}`}
      aria-hidden="true"
    >
      <span className="preloader-name">arjitlohani.com.np</span>
      <span className="preloader-count">{count}</span>
    </div>
  );
}
