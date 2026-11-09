import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { EASE_OUT, prefersReducedMotion } from '../lib/motion';
import { TROPHY, ROBOT } from '../lib/sprites';
import { PixelLabel } from './Fx';
import Sprite from './Sprite';

/** A small game-style toast that slides up from the bottom corner. */
export function Toast({ toast }) {
  return (
    <div aria-live="polite" className="pointer-events-none fixed bottom-4 left-4 right-4 z-[95] flex justify-center sm:left-auto sm:justify-end">
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.title}
            className="flex items-center gap-4 bg-mint p-px pixel-corners"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE_OUT }}
          >
            <div className="flex items-center gap-4 bg-ground-deep px-4 py-3 pixel-corners">
              <Sprite grid={toast.icon === 'robot' ? ROBOT : TROPHY} size={32} />
              <div>
                <PixelLabel className="block text-mint">{toast.title}</PixelLabel>
                <p className="mt-1 text-sm text-ink">{toast.body}</p>
              </div>
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
    const colors = ['#b6ffe9', '#1e755a', '#dbfbf1', '#ffd166'];
    const drops = Array.from({ length: 140 }, () => ({
      x: Math.random() * window.innerWidth,
      y: -Math.random() * window.innerHeight,
      v: 4 + Math.random() * 7,
      s: [6, 8, 12][Math.floor(Math.random() * 3)],
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
