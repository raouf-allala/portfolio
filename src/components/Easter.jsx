import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { EASE_OUT, prefersReducedMotion } from '../lib/motion';

const Trophy = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4ZM7 6H4a3 3 0 0 0 3 4M17 6h3a3 3 0 0 1-3 4" />
  </svg>
);
const Spark = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 2.5 13.8 9a2 2 0 0 0 1.2 1.2l6.5 1.8-6.5 1.8a2 2 0 0 0-1.2 1.2L12 21.5 10.2 15a2 2 0 0 0-1.2-1.2L2.5 12 9 10.2A2 2 0 0 0 10.2 9Z" />
  </svg>
);

/** A small toast that slides up from the bottom. */
export function Toast({ toast }) {
  return (
    <div aria-live="polite" className="pointer-events-none fixed bottom-5 left-4 right-4 z-[95] flex justify-center sm:left-auto sm:right-6 sm:justify-end">
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.title}
            className="flex items-center gap-4 rounded-2xl bg-ink/95 py-3 pl-3 pr-5 text-ground shadow-[0_20px_50px_-15px_rgb(0_0_0/0.6)] backdrop-blur"
            initial={{ y: 40, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-mint text-on-mint">
              {toast.icon === 'spark' ? <Spark /> : <Trophy />}
            </span>
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-ground/60">{toast.title}</p>
              <p className="text-sm font-medium">{toast.body}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/** Mint pixels rain down the screen for a couple of seconds. */
export function PixelRain({ active, onEnd }) {
  const canvas = useRef(null);
  useEffect(() => {
    if (!active) return;
    if (prefersReducedMotion()) {
      onEnd();
      return;
    }
    const c = canvas.current;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    c.width = window.innerWidth * dpr;
    c.height = window.innerHeight * dpr;
    const ctx = c.getContext('2d');
    ctx.scale(dpr, dpr);
    const colors = ['#b6ffe9', '#1e755a', '#dbfbf1', '#f2f7f5'];
    const drops = Array.from({ length: 160 }, () => ({
      x: Math.random() * window.innerWidth,
      y: -Math.random() * window.innerHeight,
      v: 4 + Math.random() * 7,
      s: [5, 7, 10][Math.floor(Math.random() * 3)],
      c: colors[Math.floor(Math.random() * colors.length)],
    }));
    const t0 = performance.now();
    let raf;
    const frame = (now) => {
      const t = now - t0;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      ctx.globalAlpha = t > 2200 ? Math.max(0, 1 - (t - 2200) / 500) : 1;
      for (const d of drops) {
        d.y += d.v;
        ctx.fillStyle = d.c;
        ctx.fillRect(Math.round(d.x / 4) * 4, Math.round(d.y / 4) * 4, d.s, d.s);
      }
      if (t < 2700) raf = requestAnimationFrame(frame);
      else onEnd();
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [active, onEnd]);

  if (!active) return null;
  return <canvas ref={canvas} aria-hidden="true" className="pointer-events-none fixed inset-0 z-[94] h-full w-full" />;
}
