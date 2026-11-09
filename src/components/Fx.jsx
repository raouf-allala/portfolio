import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { EASE_OUT, prefersReducedMotion } from '../lib/motion';

/* ── Masked word-by-word reveal for headings ────────────────────────── */
export function RevealText({ text, className = '', delay = 0, stagger = 0.06, once = true }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: '0px 0px -12% 0px' });
  const reduced = prefersReducedMotion();
  const words = text.split(' ');
  return (
    <span ref={ref} className={className} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} aria-hidden="true" className="inline-block overflow-hidden pb-[0.1em] align-top">
          <motion.span
            className="inline-block"
            initial={reduced ? false : { y: '110%' }}
            animate={inView || reduced ? { y: '0%' } : undefined}
            transition={{ duration: 1, delay: delay + i * stagger, ease: EASE_OUT }}
          >
            {w}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/* ── Small mono label ───────────────────────────────────────────────── */
export function Label({ children, className = '' }) {
  return <span className={`font-mono text-xs uppercase tracking-[0.08em] ${className}`}>{children}</span>;
}

/* ── Magnetic: children drift toward the cursor, then spring back ───── */
export function Magnetic({ children, strength = 0.3, className = '' }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 16, mass: 0.4 });
  const move = (e) => {
    if (e.pointerType !== 'mouse' || prefersReducedMotion()) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };
  return (
    <motion.div ref={ref} className={`inline-flex ${className}`} style={{ x: sx, y: sy }} onPointerMove={move} onPointerLeave={reset}>
      {children}
    </motion.div>
  );
}

/* ── Cursor (mouse only): a small dot that grows into a label ───────── */
export function Cursor() {
  const [enabled] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
      !prefersReducedMotion()
  );
  const [label, setLabel] = useState('');
  const [visible, setVisible] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 600, damping: 45, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 600, damping: 45, mass: 0.4 });

  useEffect(() => {
    if (!enabled) return;
    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const t = e.target.closest?.('[data-cursor]');
      setLabel(t ? t.getAttribute('data-cursor') : '');
    };
    const leave = () => setVisible(false);
    window.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerleave', leave);
    return () => {
      window.removeEventListener('pointermove', move);
      document.removeEventListener('pointerleave', leave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;
  return (
    <motion.div aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-[90]" style={{ x: sx, y: sy }}>
      <motion.div
        className="flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-mint text-on-mint"
        animate={{ width: label ? 92 : 10, height: label ? 92 : 10, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.35, ease: EASE_OUT }}
      >
        <motion.span
          className="text-sm font-medium"
          animate={{ opacity: label ? 1 : 0, scale: label ? 1 : 0.6 }}
          transition={{ duration: 0.25 }}
        >
          {label}
        </motion.span>
      </motion.div>
    </motion.div>
  );
}

/* ── Image reveal: unclips from a smaller frame as it enters ───────── */
export function RevealImage({ src, alt, className = '', imgClassName = '', bg, ...props }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' });
  const reduced = prefersReducedMotion();
  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        className={imgClassName}
        style={{ backgroundColor: bg }}
        initial={reduced ? false : { scale: 1.15, opacity: 0, filter: 'blur(12px)' }}
        animate={inView || reduced ? { scale: 1, opacity: 1, filter: 'blur(0px)' } : undefined}
        transition={{ duration: 1.3, ease: EASE_OUT }}
        {...props}
      />
    </div>
  );
}
