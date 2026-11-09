import { useRef } from 'react';
import {
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'framer-motion';
import { prefersReducedMotion } from '../lib/motion';

const wrap = (min, max, v) => {
  const r = max - min;
  return ((((v - min) % r) + r) % r) + min;
};

/**
 * A giant line of words that drifts on its own and accelerates with scroll
 * velocity, reversing when the visitor scrolls back up.
 */
function Row({ words, baseVelocity, outline }) {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: '20% 0px' });
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { damping: 50, stiffness: 400 });
  const factor = useTransform(smooth, [0, 1000], [0, 4], { clamp: false });
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);
  const direction = useRef(1);
  const still = prefersReducedMotion();

  useAnimationFrame((_, delta) => {
    if (still || !inView) return;
    let move = direction.current * baseVelocity * (delta / 1000);
    const f = factor.get();
    if (f < 0) direction.current = -1;
    else if (f > 0) direction.current = 1;
    move += direction.current * move * f;
    baseX.set(baseX.get() + move);
  });

  const line = (
    <span className="flex shrink-0 items-center">
      {words.map((w) => (
        <span key={w} className="flex items-center">
          <span
            className={`px-[0.25em] font-display text-[clamp(3.5rem,11vw,10rem)] leading-[1.05] ${
              outline ? 'text-transparent [-webkit-text-stroke:1.5px_var(--color-mint)]' : 'text-ink'
            }`}
          >
            {w}
          </span>
          <svg viewBox="0 0 20 20" className="h-[0.9em] w-auto shrink-0 text-mint" style={{ fontSize: 'clamp(1.5rem,3vw,2.75rem)' }} aria-hidden="true">
            <path d="M10 1 19 10 10 19 1 10Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </span>
      ))}
    </span>
  );

  return (
    <div ref={ref} className="flex overflow-hidden whitespace-nowrap">
      <motion.div className="flex will-change-transform" style={{ x }}>
        {line}
        {line}
      </motion.div>
    </div>
  );
}

export default function Marquee({ rows }) {
  return (
    <div aria-hidden="true" className="select-none py-6">
      {rows.map((r, i) => (
        <Row key={i} words={r} baseVelocity={i % 2 ? 2.5 : -2.5} outline={i % 2 === 1} />
      ))}
    </div>
  );
}
