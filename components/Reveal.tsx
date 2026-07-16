'use client';

import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react';

type RevealProps = {
  children: ReactNode;
  /** Stagger delay in ms, applied via transition-delay */
  delay?: number;
  className?: string;
};

/**
 * Fades content up on first scroll into view (ease-out, 250ms).
 * Falls back to visible content when JS is disabled or reduced motion is set.
 */
export default function Reveal({ children, delay = 0, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const style =
    delay > 0 ? ({ '--reveal-delay': `${delay}ms` } as CSSProperties) : undefined;

  return (
    <div ref={ref} className={`reveal ${className ?? ''}`} style={style}>
      {children}
    </div>
  );
}
