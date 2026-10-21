import { useEffect, useRef, useState } from 'react';

/* Counts the load-record numbers up once when the card comes into view */
export function useCountUp(targets, duration = 1400) {
  const ref = useRef(null);
  const [values, setValues] = useState(() => targets.map(() => 0));
  useEffect(() => {
    const el = ref.current;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!el || reduce || !('IntersectionObserver' in window)) { setValues(targets); return; }
    let raf;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (now) => {
        const t = Math.min(1, (now - start) / duration);
        const ease = 1 - Math.pow(1 - t, 3);
        setValues(targets.map((n) => Math.round(n * ease)));
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.3 });
    io.observe(el);
    // Never leave a half-counted card behind (print, background tab)
    const done = () => setValues(targets);
    window.addEventListener('beforeprint', done);
    return () => { io.disconnect(); cancelAnimationFrame(raf); window.removeEventListener('beforeprint', done); };
    // targets are constants defined at module level
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return [ref, values];
}

export const fmt = (n) => n.toLocaleString('en-US');
