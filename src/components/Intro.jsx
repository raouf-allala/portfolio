import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { EASE_IN_OUT, EASE_OUT } from '../lib/motion';

const KEY = 'ra-intro-seen';

/**
 * ~1.5s branded opening: construction lines draw the "RA" monogram, the name
 * sets beside it, then the panel lifts away. Click, tap or any key skips it.
 */
export default function Intro({ show, onDone }) {
  const finished = useRef(false);

  useEffect(() => {
    if (!show) return;
    const finish = () => {
      if (finished.current) return;
      finished.current = true;
      try {
        sessionStorage.setItem(KEY, '1');
      } catch {
        /* private mode: the intro simply plays again next visit */
      }
      onDone();
    };
    const timer = setTimeout(finish, 1500);
    window.addEventListener('keydown', finish);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', finish);
    };
  }, [show, onDone]);

  const skip = () => {
    if (finished.current) return;
    finished.current = true;
    try {
      sessionStorage.setItem(KEY, '1');
    } catch {
      /* ignore */
    }
    onDone();
  };

  // Monogram strokes: an R and an A built from straight construction lines.
  const strokes = [
    'M10 90V10h34c14 0 22 8 22 20s-8 20-22 20H10', // R bowl
    'M40 50l28 40', // R leg
    'M78 90l26-80 26 80', // A
    'M88 62h32', // A bar
  ];

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="intro"
          role="presentation"
          onClick={skip}
          className="fixed inset-0 z-[100] flex cursor-pointer items-center justify-center bg-ground-deep grid-ground"
          initial={{ clipPath: 'inset(0 0 0% 0)' }}
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 0.7, ease: EASE_IN_OUT }}
        >
          <div className="flex items-center gap-6">
            <svg
              viewBox="0 0 140 100"
              className="h-16 w-auto text-mint sm:h-20"
              fill="none"
              aria-hidden="true"
            >
              {strokes.map((d, i) => (
                <motion.path
                  key={d}
                  d={d}
                  stroke="currentColor"
                  strokeWidth="7"
                  strokeLinecap="square"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.55, delay: 0.1 + i * 0.12, ease: EASE_IN_OUT }}
                />
              ))}
            </svg>
            <motion.div
              className="overflow-hidden"
              initial={{ clipPath: 'inset(0 100% 0 0)' }}
              animate={{ clipPath: 'inset(0 0% 0 0)' }}
              transition={{ duration: 0.6, delay: 0.55, ease: EASE_OUT }}
            >
              <p className="font-display text-3xl text-ink sm:text-4xl">Raouf Allala</p>
              <p className="mt-1 font-mono text-xs tracking-wide text-muted">
                full-stack developer
              </p>
            </motion.div>
          </div>
          <span className="absolute bottom-6 font-mono text-[11px] text-muted/70">
            tap to skip
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
