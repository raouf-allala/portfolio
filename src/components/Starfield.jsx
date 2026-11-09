import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '../lib/motion';

/*
 * Hero background: deep space. Pixel stars drift at three depths around a
 * slowly breathing green nebula, lean a little with the mouse, and stretch
 * into warp streaks when the page is scrolled quickly. Sleeps off-screen.
 */

const COLORS = ['#f2f7f5', '#b6ffe9', '#dbfbf1'];

export default function Starfield({ className = '' }) {
  const canvas = useRef(null);

  useEffect(() => {
    const c = canvas.current;
    const ctx = c.getContext('2d');
    const reduced = prefersReducedMotion();
    let w = 0, h = 0, dpr = 1, stars = [], raf = 0, visible = true;
    let mx = 0, my = 0, tmx = 0, tmy = 0;
    let lastY = window.scrollY, velocity = 0;

    const resize = () => {
      const r = c.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width;
      h = r.height;
      c.width = Math.round(w * dpr);
      c.height = Math.round(h * dpr);
      const count = Math.round((w * h) / 4200);
      stars = Array.from({ length: count }, () => {
        const depth = Math.random() < 0.6 ? 0 : Math.random() < 0.7 ? 1 : 2;
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          depth,
          size: [1, 2, 3][depth],
          speed: [0.04, 0.09, 0.18][depth],
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          tw: Math.random() * Math.PI * 2,
        };
      });
    };

    const nebula = (t) => {
      // two soft clouds drifting on slow orbits, layered over the void
      const blobs = [
        { x: 0.5 + Math.sin(t * 0.00011) * 0.08, y: 0.18 + Math.cos(t * 0.00013) * 0.05, r: 0.62, c: '30,117,90', a: 0.42 },
        { x: 0.78 + Math.cos(t * 0.00009) * 0.06, y: 0.55 + Math.sin(t * 0.0001) * 0.06, r: 0.38, c: '13,58,44', a: 0.55 },
        { x: 0.18 + Math.sin(t * 0.00008) * 0.05, y: 0.7 + Math.cos(t * 0.00012) * 0.04, r: 0.3, c: '182,255,233', a: 0.07 },
      ];
      for (const b of blobs) {
        const R = b.r * Math.max(w, h);
        const g = ctx.createRadialGradient(b.x * w, b.y * h, 0, b.x * w, b.y * h, R);
        g.addColorStop(0, `rgba(${b.c},${b.a})`);
        g.addColorStop(1, `rgba(${b.c},0)`);
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);
      }
    };

    const frame = (t) => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      nebula(t);
      // ease mouse lean and scroll velocity
      mx += (tmx - mx) * 0.05;
      my += (tmy - my) * 0.05;
      const y = window.scrollY;
      velocity += (y - lastY - velocity) * 0.2;
      lastY = y;
      const warp = Math.min(60, Math.abs(velocity) * 0.9);
      for (const s of stars) {
        s.y -= s.speed + velocity * 0.02 * (s.depth + 1);
        if (s.y < -10) s.y = h + 10;
        if (s.y > h + 10) s.y = -10;
        const px = s.x + mx * (s.depth + 1) * 6;
        const py = s.y + my * (s.depth + 1) * 6;
        const tw = 0.55 + 0.45 * Math.sin(t * 0.002 + s.tw);
        ctx.globalAlpha = tw * [0.45, 0.7, 0.95][s.depth];
        ctx.fillStyle = s.color;
        const streak = warp * (s.depth + 1) * 0.35;
        ctx.fillRect(Math.round(px), Math.round(py - (velocity > 0 ? 0 : streak)), s.size, s.size + streak);
      }
      ctx.globalAlpha = 1;
      if (!reduced && visible) raf = requestAnimationFrame(frame);
    };

    const onMove = (e) => {
      tmx = e.clientX / window.innerWidth - 0.5;
      tmy = e.clientY / window.innerHeight - 0.5;
    };

    resize();
    frame(0);
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible && !reduced) raf = requestAnimationFrame(frame);
    });
    io.observe(c);
    const ro = new ResizeObserver(() => {
      resize();
      if (reduced) frame(0);
    });
    ro.observe(c);
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener('pointermove', onMove);
    };
  }, []);

  return <canvas ref={canvas} aria-hidden="true" className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} />;
}
