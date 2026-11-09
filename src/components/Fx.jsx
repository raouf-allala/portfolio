import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { EASE_OUT, prefersReducedMotion } from '../lib/motion';

/* ── Masked word-by-word reveal for headings ────────────────────────── */
export function RevealText({ text, as: Tag = 'span', className = '', delay = 0, stagger = 0.06, once = true }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: '0px 0px -12% 0px' });
  const reduced = prefersReducedMotion();
  const words = text.split(' ');
  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} aria-hidden="true" className="inline-block overflow-hidden pb-[0.08em] align-top">
          <motion.span
            className="inline-block"
            initial={reduced ? false : { y: '110%' }}
            animate={inView || reduced ? { y: '0%' } : undefined}
            transition={{ duration: 0.9, delay: delay + i * stagger, ease: EASE_OUT }}
          >
            {w}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

/* ── Small pixel-font label, the "HUD" voice of the site ───────────── */
export function PixelLabel({ children, className = '' }) {
  return (
    <span className={`font-pixel text-[0.7rem] uppercase leading-none tracking-[0.08em] ${className}`}>
      {children}
    </span>
  );
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
    <motion.div
      ref={ref}
      className={`inline-flex ${className}`}
      style={{ x: sx, y: sy }}
      onPointerMove={move}
      onPointerLeave={reset}
    >
      {children}
    </motion.div>
  );
}

/* ── Custom cursor (mouse only): a mint pixel that becomes a label ──── */
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
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.5 });

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
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[90]"
      style={{ x: sx, y: sy }}
    >
      <motion.div
        className="flex -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-mint text-on-mint pixel-corners pixel-corners-sm"
        animate={{
          width: label ? 96 : 10,
          height: label ? 40 : 10,
          opacity: visible ? 1 : 0,
        }}
        transition={{ duration: 0.25, ease: EASE_OUT }}
      >
        {label && <span className="font-pixel text-[0.7rem] uppercase">{label}</span>}
      </motion.div>
    </motion.div>
  );
}

/* ── Pixel resolve: an image sharpens from big pixels as it enters ──── */
export function PixelImage({ src, alt, className = '', imgClassName = '', fit = 'cover', bg, ...props }) {
  const wrap = useRef(null);
  const canvas = useRef(null);
  const img = useRef(null);
  const inView = useInView(wrap, { once: true, margin: '0px 0px -15% 0px' });
  const [done, setDone] = useState(() => prefersReducedMotion());

  useEffect(() => {
    if (!inView || done) return;
    const el = img.current;
    let cancelled = false;
    const run = () => {
      if (cancelled) return;
      const c = canvas.current;
      const r = wrap.current.getBoundingClientRect();
      const W = Math.max(1, Math.round(r.width));
      const H = Math.max(1, Math.round(r.height));
      c.width = W;
      c.height = H;
      const ctx = c.getContext('2d');
      // replicate object-fit on the canvas
      const ai = el.naturalWidth / el.naturalHeight;
      const ac = W / H;
      let dw, dh;
      if ((fit === 'cover') === ai > ac) {
        dh = H;
        dw = H * ai;
      } else {
        dw = W;
        dh = W / ai;
      }
      const dx = (W - dw) / 2;
      const dy = fit === 'cover' ? 0 : (H - dh) / 2;
      const off = document.createElement('canvas');
      const octx = off.getContext('2d');
      const steps = [48, 28, 16, 8, 4];
      let i = 0;
      const draw = () => {
        if (cancelled) return;
        if (i >= steps.length) {
          setDone(true);
          return;
        }
        const block = steps[i];
        const sw = Math.max(1, Math.ceil(W / block));
        const sh = Math.max(1, Math.ceil(H / block));
        off.width = sw;
        off.height = sh;
        octx.fillStyle = bg || '#1b1e22';
        octx.fillRect(0, 0, sw, sh);
        octx.drawImage(el, (dx / W) * sw, (dy / H) * sh, (dw / W) * sw, (dh / H) * sh);
        ctx.imageSmoothingEnabled = false;
        ctx.clearRect(0, 0, W, H);
        ctx.drawImage(off, 0, 0, W, H);
        i += 1;
        setTimeout(draw, 85);
      };
      draw();
    };
    if (el.complete && el.naturalWidth) run();
    else el.addEventListener('load', run, { once: true });
    return () => {
      cancelled = true;
    };
  }, [inView, done, fit, bg]);

  return (
    <div ref={wrap} className={`relative ${className}`}>
      <img
        ref={img}
        src={src}
        alt={alt}
        className={`${imgClassName} transition-opacity duration-150 ${done ? 'opacity-100' : 'opacity-0'}`}
        style={{ backgroundColor: bg }}
        {...props}
      />
      {!done && (
        <canvas
          ref={canvas}
          aria-hidden="true"
          className="pixelated absolute inset-0 h-full w-full"
          style={{ backgroundColor: bg || '#1b1e22' }}
        />
      )}
    </div>
  );
}
