import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { EASE_IN_OUT } from '../lib/motion';
import Sprite from './Sprite';

const KEY = 'ra-intro-seen';
const BLOCKS = 20;
const DURATION = 1400;

/**
 * Agency-style preloader with a game loading bar: a 0→100 counter, a
 * segmented pixel bar and Bit the robot. Shown once per visit; any key,
 * click or tap skips it.
 */
export default function Loader({ show, onDone }) {
  const [pct, setPct] = useState(0);
  const finished = useRef(false);

  useEffect(() => {
    if (!show) return;
    const finish = () => {
      if (finished.current) return;
      finished.current = true;
      try {
        sessionStorage.setItem(KEY, '1');
      } catch {
        /* private mode */
      }
      onDone();
    };
    const t0 = performance.now();
    let raf;
    const tick = (now) => {
      const p = Math.min(1, (now - t0) / DURATION);
      // ease-out so it rushes, then settles at 100
      setPct(Math.round((1 - Math.pow(1 - p, 3)) * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(finish, 180);
    };
    raf = requestAnimationFrame(tick);
    window.addEventListener('keydown', finish);
    window.addEventListener('pointerdown', finish);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('keydown', finish);
      window.removeEventListener('pointerdown', finish);
    };
  }, [show, onDone]);

  const filled = Math.round((pct / 100) * BLOCKS);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="loader"
          role="presentation"
          className="fixed inset-0 z-[100] flex flex-col bg-ground-deep"
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          initial={{ clipPath: 'inset(0 0 0% 0)' }}
          transition={{ duration: 0.8, ease: EASE_IN_OUT }}
        >
          <div className="page flex flex-1 flex-col justify-center">
            <Sprite size={72} className="bob pixelated" />
            <p className="mt-8 font-pixel text-xs uppercase tracking-widest text-muted">
              Loading portfolio
            </p>
            <div className="mt-4 flex gap-1.5" aria-hidden="true">
              {Array.from({ length: BLOCKS }, (_, i) => (
                <span
                  key={i}
                  className={`h-4 flex-1 transition-colors duration-75 ${i < filled ? 'bg-mint' : 'bg-line'}`}
                />
              ))}
            </div>
          </div>
          <div className="page flex items-end justify-between pb-8">
            <span className="font-pixel text-[0.65rem] uppercase text-muted">press any key</span>
            <span className="font-display text-[clamp(4.5rem,16vw,12rem)] leading-[0.8] tabular-nums text-mint">
              {pct}
              <span className="text-[0.4em] text-muted">%</span>
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
