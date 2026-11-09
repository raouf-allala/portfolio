import { motion } from 'framer-motion';
import { EASE_IN_OUT, EASE_OUT } from '../lib/motion';

/*
 * The construction lines are the site's signature, taken from the original
 * hand-drawn shapes (the triangles and verticals of "Group 1/2.svg") and
 * redrawn as strokes that animate in like a pen on a drafting table.
 */
const SHAPES = {
  // Tall construction: rectangle split by diagonals (from Group 2)
  tall: {
    viewBox: '0 0 281 465',
    paths: [
      'M141 340V1H0',
      'M0 171H280V340',
      'M0 1L220 269',
      'M280 171L180 340',
      'M218.5 268.7L0 269.2',
      'M280.5 339.5L0 464',
    ],
  },
  // Corner triangle (from Group 1)
  corner: {
    viewBox: '0 0 182 251',
    paths: ['M1 0V250H181', 'M182.5 249L4.5 3.5', 'M94 130L181 130', 'M95 130L1 250'],
  },
};

export function Construction({
  shape = 'tall',
  draw = true,
  delay = 0,
  className = '',
  strokeWidth = 1.25,
}) {
  const { viewBox, paths } = SHAPES[shape];
  return (
    <svg
      viewBox={viewBox}
      fill="none"
      aria-hidden="true"
      className={className}
      preserveAspectRatio="xMidYMid meet"
    >
      {paths.map((d, i) => (
        <motion.path
          key={d}
          d={d}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={draw ? { pathLength: 1, opacity: 1 } : undefined}
          transition={{
            pathLength: { duration: 1.1, delay: delay + i * 0.09, ease: EASE_IN_OUT },
            opacity: { duration: 0.2, delay: delay + i * 0.09 },
          }}
        />
      ))}
    </svg>
  );
}

/** A hairline rule that draws across when it scrolls into view. */
export function Rule({ className = '', origin = 'left' }) {
  return (
    <motion.div
      aria-hidden="true"
      className={`h-px bg-line-strong ${className}`}
      style={{ transformOrigin: origin }}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 1.2, ease: EASE_OUT }}
    />
  );
}

/** Section heading with the mint marker bar from the original design. */
export function SectionTitle({ id, children, tone = 'ink', className = '' }) {
  return (
    <h2
      id={id}
      className={`flex items-start gap-4 font-display text-[clamp(2.25rem,6vw,4.5rem)] ${
        tone === 'dark' ? 'text-on-mint' : 'text-ink'
      } ${className}`}
    >
      <span
        aria-hidden="true"
        className={`mt-[0.12em] block h-[0.8em] w-[5px] shrink-0 ${
          tone === 'dark' ? 'bg-on-mint' : 'bg-mint'
        }`}
      />
      <span>{children}</span>
    </h2>
  );
}
