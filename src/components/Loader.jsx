import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { EASE_IN_OUT } from '../lib/motion';

const KEY = 'ra-intro-seen';
const DURATION = 1300;

/**
 * Preloader: a 0→100 counter and a thin progress line, then the panel lifts
 * away. Shown once per visit; any key, click or tap skips it.
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
      setPct(Math.round((1 - Math.pow(1 - p, 3)) * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(finish, 200);
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

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="loader"
          role="presentation"
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-ground"
          initial={{ clipPath: 'inset(0 0 0% 0)' }}
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 0.9, ease: EASE_IN_OUT }}
        >
          <div className="page flex items-center justify-between pt-8 font-mono text-xs uppercase tracking-[0.08em] text-muted">
            <span>Raouf Allala</span>
            <span>Software & AI engineer</span>
          </div>
          <div className="page pb-8">
            <div className="flex items-end justify-between">
              <span className="font-mono text-xs uppercase tracking-[0.08em] text-muted">Loading</span>
              <span className="font-display text-[clamp(5rem,18vw,14rem)] leading-[0.8] tabular-nums text-ink">
                {pct}
              </span>
            </div>
            <div className="mt-6 h-px w-full bg-line">
              <div className="h-px origin-left bg-mint" style={{ transform: `scaleX(${pct / 100})` }} />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
