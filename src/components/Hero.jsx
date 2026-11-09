import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { EASE_OUT, prefersReducedMotion, scrollToId, seeded } from '../lib/motion';
import { EMAIL, SOCIALS } from '../lib/socials';
import { Magnetic, PixelLabel } from './Fx';
import { ArrowDown, Mail } from './Icons';
import Sprite from './Sprite';
import { ROBOT, ROBOT_BLINK } from '../lib/sprites';

const STATS = [
  ['Class', 'Software & AI engineer'],
  ['XP', '3+ years shipping'],
  ['Main quest', 'Full-stack & AI products'],
  ['Side quest', 'Games & pixel art'],
];

/** Pixel "stars" scattered over the hero, in three parallax depths. */
const starRnd = seeded(7);
const STARS = Array.from({ length: 36 }, (_, i) => ({
  left: `${starRnd() * 100}%`,
  top: `${starRnd() * 100}%`,
  size: [3, 4, 6][i % 3],
  depth: i % 3,
  tw: `${2 + starRnd() * 3}s`,
  td: `${starRnd() * 3}s`,
}));

function Bit({ onPoke }) {
  const [blink, setBlink] = useState(false);
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const id = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 140);
    }, 3200);
    return () => clearInterval(id);
  }, []);
  return (
    <button type="button" onClick={onPoke} aria-label="Bit, the robot mascot" className="group relative block">
      <span className="absolute -top-12 left-1/2 hidden -translate-x-1/2 whitespace-nowrap bg-mint px-3 py-2 text-on-mint pixel-corners pixel-corners-sm sm:block">
        <span className="font-pixel text-[0.7rem]">hello, world!</span>
      </span>
      <Sprite
        grid={blink ? ROBOT_BLINK : ROBOT}
        size={96}
        className="bob h-auto w-16 transition-transform duration-200 group-active:scale-90 sm:w-24"
      />
    </button>
  );
}

const enter = (delay, ready) => ({
  initial: { y: '105%' },
  animate: ready ? { y: '0%' } : undefined,
  transition: { duration: 1.1, delay, ease: EASE_OUT },
});

export default function Hero({ ready, onPoke }) {
  const ref = useRef(null);
  const reduced = prefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  // Scroll moment: the name splits apart and the layers drift at different depths.
  const leftX = useTransform(scrollYProgress, [0, 1], ['0%', '-22%']);
  const rightX = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const lift = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);
  const d0 = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);
  const d1 = useTransform(scrollYProgress, [0, 1], ['0%', '-50%']);
  const d2 = useTransform(scrollYProgress, [0, 1], ['0%', '-90%']);
  const depth = [d0, d1, d2];
  const botY = useTransform(scrollYProgress, [0, 1], ['0%', '-160%']);
  const s = (style) => (reduced ? undefined : style);

  return (
    <section
      id="top"
      ref={ref}
      aria-labelledby="hero-title"
      className="relative flex min-h-[100svh] flex-col overflow-hidden pt-24 sm:pt-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 grid-ground opacity-50 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
      />
      {[0, 1, 2].map((d) => (
        <motion.div key={d} aria-hidden="true" className="pointer-events-none absolute inset-0" style={s({ y: depth[d] })}>
          {STARS
            .filter((st) => st.depth === d)
            .map((st, i) => (
              <span
                key={i}
                className="twinkle absolute bg-mint"
                style={{ left: st.left, top: st.top, width: st.size, height: st.size, '--tw': st.tw, '--td': st.td }}
              />
            ))}
        </motion.div>
      ))}

      <div className="page relative flex flex-1 flex-col">
        <h1
          id="hero-title"
          aria-label="Raouf Allala"
          className="font-display text-[clamp(4.25rem,22vw,15.5rem)] sm:text-[clamp(4.25rem,17vw,15.5rem)] leading-[0.82] tracking-[-0.045em]"
        >
          <motion.span aria-hidden="true" className="block" style={s({ x: leftX, opacity: fade })}>
            <span className="block overflow-hidden pb-[0.04em]">
              <motion.span className="block" {...enter(0.05, ready)}>
                Raouf
              </motion.span>
            </span>
          </motion.span>
          <motion.span aria-hidden="true" className="block text-right text-mint" style={s({ x: rightX, opacity: fade })}>
            <span className="block overflow-hidden pb-[0.04em]">
              <motion.span className="block" {...enter(0.15, ready)}>
                Allala
              </motion.span>
            </span>
          </motion.span>
        </h1>

        <motion.div
          className="absolute right-[6%] top-[1%] sm:right-[12%] sm:top-[4%]"
          style={s({ y: botY })}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={ready ? { opacity: 1, scale: 1 } : undefined}
          transition={{ duration: 0.6, delay: 0.7, ease: EASE_OUT }}
        >
          <Bit onPoke={onPoke} />
        </motion.div>

        <motion.div
          className="mt-auto grid gap-8 pb-8 pt-12 md:grid-cols-12 md:items-end md:gap-8"
          style={s({ y: lift, opacity: fade })}
        >
          <motion.div
            className="md:col-span-5"
            initial={{ opacity: 0, y: 24 }}
            animate={ready ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.9, delay: 0.45, ease: EASE_OUT }}
          >
            <p className="font-wide text-[clamp(1.5rem,2.6vw,2.1rem)] font-semibold leading-tight text-ink">
              Software & AI Engineer
            </p>
            <p className="mt-3 max-w-[40ch] text-muted">
              I build web and mobile products end to end, from the database to the interface, and the AI
              features that make them smarter.
            </p>
          </motion.div>

          <motion.dl
            className="bg-line-strong p-px pixel-corners md:col-span-4"
            initial={{ opacity: 0, y: 24 }}
            animate={ready ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.9, delay: 0.55, ease: EASE_OUT }}
          >
            <div className="grid gap-3 bg-ground-deep p-5 pixel-corners">
              {STATS.map(([k, v]) => (
                <div key={k} className="flex items-baseline justify-between gap-4">
                  <dt>
                    <PixelLabel className="text-mint">{k}</PixelLabel>
                  </dt>
                  <dd className="text-right text-sm text-ink">{v}</dd>
                </div>
              ))}
            </div>
          </motion.dl>

          <motion.div
            className="flex flex-wrap items-center gap-3 md:col-span-3 md:justify-end"
            initial={{ opacity: 0, y: 24 }}
            animate={ready ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.9, delay: 0.65, ease: EASE_OUT }}
          >
            <Magnetic>
              <a href={`mailto:${EMAIL}`} className="btn btn-mint" data-cursor="Say hi">
                <Mail size={18} /> Get in touch
              </a>
            </Magnetic>
            <div className="flex gap-1">
              {SOCIALS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="flex h-12 w-12 items-center justify-center text-muted transition-colors duration-200 hover:text-mint"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      <a
        href="#about"
        onClick={(e) => {
          e.preventDefault();
          scrollToId('about');
        }}
        className="page relative mb-6 flex items-center gap-3 text-muted hover:text-mint"
        aria-label="Scroll down"
      >
        <ArrowDown size={16} className="animate-bounce" />
        <PixelLabel>Scroll to start</PixelLabel>
      </a>
    </section>
  );
}
