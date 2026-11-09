import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '../lib/motion';

/*
 * The hero's centerpiece: the name, built from thousands of square pixels.
 * They sweep into place on load, scatter away from the cursor or finger like
 * sand and spring back, and dissolve upward as the hero scrolls away.
 * Plain canvas 2D; the loop sleeps whenever nothing is moving.
 */

const INK = '#f2f7f5';
const MINT = '#b6ffe9';
const FONT = '"Geist Variable", system-ui, sans-serif';

function layout(width) {
  // one line on wide screens, two on narrow ones
  return width >= 900
    ? [[{ text: 'Raouf ', color: INK }, { text: 'Allala', color: MINT }]]
    : [[{ text: 'Raouf', color: INK }], [{ text: 'Allala', color: MINT }]];
}

function sample(width) {
  const lines = layout(width);
  const off = document.createElement('canvas');
  const ctx = off.getContext('2d', { willReadFrequently: true });
  // find the font size that makes the widest line fill the width
  ctx.font = `600 100px ${FONT}`;
  if ('letterSpacing' in ctx) ctx.letterSpacing = '-5px';
  const widest = Math.max(
    ...lines.map((parts) => parts.reduce((w, p) => w + ctx.measureText(p.text).width, 0))
  );
  const size = Math.floor((100 * width) / widest) * 0.98;
  const lineH = size * 0.92;
  const height = Math.ceil(lineH * lines.length + size * 0.12);
  off.width = Math.ceil(width);
  off.height = height;
  ctx.font = `600 ${size}px ${FONT}`;
  ctx.textBaseline = 'alphabetic';
  if ('letterSpacing' in ctx) ctx.letterSpacing = `${-0.05 * size}px`;

  const step = width >= 1200 ? 5 : width >= 700 ? 4 : 3;
  const points = [];
  lines.forEach((parts, li) => {
    let x = 0;
    const y = lineH * (li + 1) - size * 0.08;
    parts.forEach((p) => {
      ctx.clearRect(0, 0, off.width, off.height);
      ctx.fillStyle = '#fff';
      ctx.fillText(p.text, x, y);
      const w = ctx.measureText(p.text).width;
      const { data } = ctx.getImageData(0, 0, off.width, off.height);
      for (let py = 0; py < off.height; py += step) {
        for (let px = Math.floor(x); px < Math.min(off.width, x + w + step); px += step) {
          if (data[(py * off.width + px) * 4 + 3] > 140) points.push({ tx: px, ty: py, color: p.color });
        }
      }
      x += w;
    });
  });
  return { points, height, step };
}

export default function ParticleName({ ready, progress, burst = 0, className = '' }) {
  const wrap = useRef(null);
  const canvas = useRef(null);
  const state = useRef(null);
  const readyRef = useRef(ready);
  const kickRef = useRef(() => {});
  const burstRef = useRef(() => {});

  // Build (and rebuild on resize) the particle field.
  useEffect(() => {
    const reduced = prefersReducedMotion();
    let disposed = false;

    const build = async () => {
      try {
        await document.fonts.load(`600 100px ${FONT}`);
      } catch {
        /* fall back to the system face */
      }
      if (disposed) return;
      const width = wrap.current.clientWidth;
      const { points, height, step } = sample(width);
      const c = canvas.current;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      c.width = Math.round(width * dpr);
      c.height = Math.round(height * dpr);
      c.style.height = `${height}px`;
      const prev = state.current;
      const particles = points.map((p, i) => {
        const old = prev?.particles[i];
        return {
          ...p,
          x: old ? old.x : reduced ? p.tx : p.tx + (Math.random() - 0.5) * width * 0.2,
          y: old ? old.y : reduced ? p.ty : height + 40 + Math.random() * height * 1.5,
          vx: 0,
          vy: 0,
          // sweep in from left to right
          delay: old ? 0 : reduced ? 0 : (p.tx / width) * 700 + Math.random() * 250,
          seed: Math.random(),
        };
      });
      state.current = {
        particles,
        width,
        height,
        size: Math.max(1.5, step - 1),
        dpr,
        pointer: { x: -9999, y: -9999, active: false },
        t0: performance.now(),
        running: false,
        reduced,
        dissolve: 0,
      };
      kick();
    };

    const frame = (now) => {
      const s = state.current;
      if (!s) return;
      const ctx = canvas.current.getContext('2d');
      ctx.setTransform(s.dpr, 0, 0, s.dpr, 0, 0);
      ctx.clearRect(0, 0, s.width, s.height);
      const started = readyRef.current;
      const t = now - s.t0;
      const R = Math.max(70, s.width * 0.07);
      const d = s.dissolve;
      let moving = false;
      for (const p of s.particles) {
        if (!started || t < p.delay) {
          if (!s.reduced) continue;
        }
        // where this pixel wants to be (drifts up and away while scrolling)
        const dx0 = (p.seed - 0.5) * 120 * d;
        const ty = p.ty - d * d * (180 + p.seed * 260);
        const tx = p.tx + dx0;
        let ax = (tx - p.x) * 0.075;
        let ay = (ty - p.y) * 0.075;
        if (s.pointer.active) {
          const ddx = p.x - s.pointer.x;
          const ddy = p.y - s.pointer.y;
          const dist = Math.hypot(ddx, ddy);
          if (dist < R && dist > 0.01) {
            const f = ((R - dist) / R) ** 2 * 9;
            ax += (ddx / dist) * f;
            ay += (ddy / dist) * f;
          }
        }
        p.vx = (p.vx + ax) * 0.8;
        p.vy = (p.vy + ay) * 0.8;
        p.x += p.vx;
        p.y += p.vy;
        if (Math.abs(p.vx) + Math.abs(p.vy) > 0.05 || Math.abs(tx - p.x) + Math.abs(ty - p.y) > 0.5) moving = true;
        const alpha = Math.max(0, 1 - d * (0.8 + p.seed * 0.6));
        if (alpha <= 0) continue;
        ctx.globalAlpha = alpha;
        ctx.fillStyle = p.color;
        ctx.fillRect(Math.round(p.x), Math.round(p.y), s.size, s.size);
      }
      ctx.globalAlpha = 1;
      const intro = started && t < 2200;
      if (!s.reduced && (moving || s.pointer.active || intro || !started)) {
        s.raf = requestAnimationFrame(frame);
      } else {
        s.running = false;
      }
    };

    const kick = () => {
      const s = state.current;
      if (!s || s.running) return;
      s.running = true;
      s.raf = requestAnimationFrame(frame);
    };
    kickRef.current = kick;
    burstRef.current = () => {
      const s = state.current;
      if (!s || s.reduced) return;
      for (const p of s.particles) {
        const a = Math.random() * Math.PI * 2;
        const v = 10 + Math.random() * 30;
        p.vx += Math.cos(a) * v;
        p.vy += Math.sin(a) * v;
      }
      kick();
    };

    const toLocal = (x, y) => {
      const r = canvas.current.getBoundingClientRect();
      return { x: x - r.left, y: y - r.top, inside: y > r.top - 120 && y < r.bottom + 120 };
    };
    const onPointer = (e) => {
      const s = state.current;
      if (!s || s.reduced) return;
      const l = toLocal(e.clientX, e.clientY);
      s.pointer = { x: l.x, y: l.y, active: l.inside };
      if (l.inside) kick();
    };
    const onTouch = (e) => {
      const tch = e.touches[0];
      if (tch) onPointer({ clientX: tch.clientX, clientY: tch.clientY });
    };
    const onLeave = () => {
      if (state.current) state.current.pointer.active = false;
      kick();
    };

    build();
    let rt;
    const onResize = () => {
      clearTimeout(rt);
      rt = setTimeout(() => {
        if (wrap.current && state.current && wrap.current.clientWidth !== state.current.width) build();
      }, 150);
    };
    window.addEventListener('resize', onResize);
    window.addEventListener('pointermove', onPointer, { passive: true });
    window.addEventListener('touchmove', onTouch, { passive: true });
    window.addEventListener('touchstart', onTouch, { passive: true });
    window.addEventListener('touchend', onLeave);
    document.addEventListener('pointerleave', onLeave);
    return () => {
      disposed = true;
      cancelAnimationFrame(state.current?.raf);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointermove', onPointer);
      window.removeEventListener('touchmove', onTouch);
      window.removeEventListener('touchstart', onTouch);
      window.removeEventListener('touchend', onLeave);
      document.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  // Start the sweep once the loader has gone.
  useEffect(() => {
    readyRef.current = ready;
    if (ready && state.current) {
      state.current.t0 = performance.now();
      kickRef.current();
    }
  }, [ready]);

  // Dissolve with scroll.
  useEffect(() => {
    if (!progress) return;
    return progress.on('change', (v) => {
      const s = state.current;
      if (!s || s.reduced) return;
      s.dissolve = Math.min(1, Math.max(0, (v - 0.15) / 0.6));
      kickRef.current();
    });
  }, [progress]);

  // Easter egg: blow the pixels apart, then let them reform.
  useEffect(() => {
    if (burst) burstRef.current();
  }, [burst]);

  return (
    <div ref={wrap} className={`relative w-full ${className}`}>
      <canvas ref={canvas} aria-hidden="true" className="block w-full touch-pan-y" />
    </div>
  );
}
