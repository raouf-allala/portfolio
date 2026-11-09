import { useRef } from 'react';
import { motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion';
import { EMAIL, SOCIALS } from '../lib/socials';
import { prefersReducedMotion, scrollToId } from '../lib/motion';
import { ArrowUp } from './Icons';

/**
 * Curtain reveal: the page scrolls away to uncover a fixed footer underneath,
 * where a full-width "Raouf Allala" wordmark rises into place.
 * (A clip-path on the wrapper confines the fixed layer to the wrapper's box.)
 */
export default function Footer({ onReachEnd }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] });
  const y = useTransform(scrollYProgress, [0, 1], ['45%', '0%']);
  const opacity = useTransform(scrollYProgress, [0.2, 1], [0.2, 1]);
  const reduced = prefersReducedMotion();
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (v > 0.92) onReachEnd?.();
  });

  const year = new Date().getFullYear();

  return (
    <div
      ref={ref}
      className="relative h-[78svh] sm:h-[min(100svh,46rem)]"
      style={{ clipPath: 'polygon(0% 0, 100% 0%, 100% 100%, 0 100%)' }}
    >
      <footer className="fixed bottom-0 left-0 flex h-[78svh] w-full flex-col bg-ground-deep grid-ground sm:h-[min(100svh,46rem)]">
        <div className="page flex flex-1 flex-col pt-20 sm:pt-24">
          <div className="grid gap-10 sm:grid-cols-3">
            <div>
              <p className="font-mono text-xs text-muted">email</p>
              <a href={`mailto:${EMAIL}`} className="mt-2 inline-block break-all text-ink link-draw hover:text-mint">
                {EMAIL}
              </a>
            </div>
            <div>
              <p className="font-mono text-xs text-muted">elsewhere</p>
              <ul className="mt-2 flex flex-col gap-1">
                {SOCIALS.map(({ label, href }) => (
                  <li key={label}>
                    <a href={href} target="_blank" rel="noreferrer" className="text-ink link-draw hover:text-mint">
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="sm:justify-self-end">
              <a
                href="#top"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToId('top');
                }}
                className="btn btn-line"
              >
                Back to top <ArrowUp size={16} />
              </a>
            </div>
          </div>

          <div className="mt-auto overflow-hidden">
            <motion.svg
              viewBox="0 0 1000 150"
              className="block w-full text-mint"
              style={reduced ? undefined : { y, opacity }}
              aria-label="Raouf Allala"
              role="img"
            >
              <text
                x="0"
                y="128"
                textLength="1000"
                lengthAdjust="spacingAndGlyphs"
                fill="currentColor"
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontVariationSettings: "'wdth' 118",
                  fontWeight: 780,
                  fontSize: 160,
                  letterSpacing: '-0.03em',
                }}
              >
                Raouf Allala
              </text>
            </motion.svg>
          </div>
        </div>
        <div className="border-t border-line">
          <div className="page flex flex-col gap-1 py-5 font-mono text-[11px] text-muted sm:flex-row sm:justify-between">
            <p>© {year} Raouf Allala</p>
            <p>Designed and built by me</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
