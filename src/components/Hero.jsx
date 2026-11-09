import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { EASE_OUT, prefersReducedMotion, scrollToId } from '../lib/motion';
import { EMAIL, SOCIALS } from '../lib/socials';
import { Magnetic } from './Fx';
import { ArrowDown, ArrowUpRight } from './Icons';
import ParticleName from './ParticleName';
import Starfield from './Starfield';

const rise = (delay, ready) => ({
  initial: { opacity: 0, y: 28, filter: 'blur(8px)' },
  animate: ready ? { opacity: 1, y: 0, filter: 'blur(0px)' } : undefined,
  transition: { duration: 1, delay, ease: EASE_OUT },
});

export default function Hero({ ready, burst }) {
  const ref = useRef(null);
  const reduced = prefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const lift = useTransform(scrollYProgress, [0, 1], ['0%', '-25%']);
  const fade = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const spaceY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  return (
    <section
      id="top"
      ref={ref}
      data-bg="#0a0c0b"
      aria-labelledby="hero-title"
      className="relative flex min-h-[100svh] flex-col overflow-hidden pt-28"
    >
      {/* deep space: drifting pixel stars and a green nebula */}
      <motion.div className="absolute inset-0" style={reduced ? undefined : { y: spaceY }}>
        <Starfield />
      </motion.div>

      <div className="page relative flex flex-1 flex-col justify-center">
        <h1 id="hero-title" className="sr-only">
          Raouf Allala, also known as rwifoo, software and AI engineer
        </h1>
        <ParticleName ready={ready} progress={scrollYProgress} burst={burst} />
        {/* player tag */}
        <motion.p
          aria-hidden="true"
          className="mt-5 inline-flex items-center gap-2.5 self-start rounded-full bg-white/[0.06] py-2 pl-3 pr-4 font-mono text-sm text-ink ring-1 ring-white/10 backdrop-blur sm:self-end"
          {...rise(0.9, ready)}
        >
          <span className="h-2 w-2 bg-mint" />
          <span className="text-muted">aka</span> rwifoo
        </motion.p>
      </div>

      <motion.div
        className="page relative grid gap-10 pb-10 pt-12 md:grid-cols-12 md:items-end"
        style={reduced ? undefined : { y: lift, opacity: fade }}
      >
        <motion.div className="md:col-span-6" {...rise(0.35, ready)}>
          <p className="text-[clamp(1.6rem,3vw,2.5rem)] font-medium leading-[1.1] tracking-[-0.035em] text-ink">
            Software & AI Engineer
          </p>
          <p className="mt-4 max-w-[44ch] text-muted">
            I build web and mobile products end to end, from the database to the interface, and the AI
            features that make them smarter.
          </p>
        </motion.div>

        <motion.div
          className="flex flex-wrap items-center gap-3 md:col-span-6 md:justify-end"
          {...rise(0.5, ready)}
        >
          <Magnetic>
            <a href={`mailto:${EMAIL}`} className="btn btn-mint" data-cursor="Say hi">
              Get in touch <ArrowUpRight size={16} />
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href="#work"
              onClick={(e) => {
                e.preventDefault();
                scrollToId('work');
              }}
              className="btn btn-ghost"
            >
              See the work <ArrowDown size={16} />
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
                className="flex h-12 w-12 items-center justify-center rounded-full text-muted transition-colors duration-200 hover:bg-white/5 hover:text-ink"
              >
                <Icon />
              </a>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
