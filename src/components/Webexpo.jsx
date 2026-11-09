import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Site from '../assets/webexpo/webexpo.webp';
import Dashboard from '../assets/webexpo/webexpo2.webp';
import { prefersReducedMotion } from '../lib/motion';
import { PixelImage, PixelLabel, RevealText } from './Fx';
import { ArrowUpRight } from './Icons';

const PARTS = [
  ['Admin dashboard', 'The dashboard organizers used to run exhibitors, visitors and content.'],
  ['Registration', 'A streamlined online registration flow that kept sign-up simple for every attendee.'],
  ['Mobile check-in', 'A mobile app for on-site check-ins, so attendees got through the door quickly.'],
];

export default function Webexpo() {
  const ref = useRef(null);
  const reduced = prefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  // Parallax: the two screenshots travel at different speeds.
  const slow = useTransform(scrollYProgress, [0, 1], ['8%', '-8%']);
  const fast = useTransform(scrollYProgress, [0, 1], ['30%', '-30%']);

  return (
    <section
      id="webexpo"
      ref={ref}
      aria-labelledby="webexpo-title"
      className="relative overflow-hidden bg-field py-24 sm:py-36"
    >
      <div className="pointer-events-none absolute inset-0 grid-ground opacity-50" aria-hidden="true" />
      <div className="page relative">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <h2 id="webexpo-title" className="font-display text-[clamp(2.5rem,7vw,6rem)] text-ink">
              <RevealText text="Webexpo ElDjazair" />
            </h2>
          </div>
          <p className="max-w-[44ch] text-mint-soft/85 lg:col-span-4">
            As part of the organizing IT team, I made sure every technical piece of a large-scale event
            ran smoothly: the website, online registration, check-in and the infrastructure on site.
          </p>
        </div>

        <div className="relative mt-16 grid gap-6 md:grid-cols-12">
          <motion.div className="md:col-span-8" style={reduced ? undefined : { y: slow }}>
            <div className="overflow-hidden pixel-corners">
              <PixelImage
                src={Site}
                alt="Webexpo ElDjazair 2nd edition website"
                loading="lazy"
                imgClassName="aspect-[16/10] w-full object-cover object-left-top"
              />
            </div>
          </motion.div>
          <motion.div
            className="md:col-span-5 md:-ml-[25%] md:mt-[28%]"
            style={reduced ? undefined : { y: fast }}
          >
            <div className="overflow-hidden pixel-corners shadow-[0_30px_60px_-20px_rgb(0_0_0/0.6)]">
              <PixelImage
                src={Dashboard}
                alt="Webexpo admin dashboard for exhibitors, visitors and check-ins"
                loading="lazy"
                imgClassName="aspect-[16/10] w-full object-cover object-left-top"
              />
            </div>
          </motion.div>
        </div>

        <div className="mt-20 grid gap-8 border-t border-line-strong pt-10 md:grid-cols-3">
          {PARTS.map(([title, body]) => (
            <div key={title}>
              <PixelLabel className="text-mint">{title}</PixelLabel>
              <p className="mt-3 text-mint-soft/80">{body}</p>
            </div>
          ))}
        </div>

        <a
          href="https://webexpo-dz.com/"
          target="_blank"
          rel="noreferrer"
          className="btn btn-mint mt-12"
          data-cursor="Visit ↗"
        >
          Visit webexpo-dz.com <ArrowUpRight size={16} />
        </a>
      </div>
    </section>
  );
}
