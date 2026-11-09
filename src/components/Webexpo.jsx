import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Site from '../assets/webexpo/webexpo.webp';
import Dashboard from '../assets/webexpo/webexpo2.webp';
import { prefersReducedMotion } from '../lib/motion';
import { Label, RevealImage, RevealText } from './Fx';
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
  const fast = useTransform(scrollYProgress, [0, 1], ['35%', '-35%']);

  return (
    <section
      id="webexpo"
      ref={ref}
      data-bg="#0d3a2c"
      aria-labelledby="webexpo-title"
      className="relative overflow-hidden py-28 sm:py-40"
    >
      <div className="page relative">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <h2 id="webexpo-title" className="font-display text-[clamp(2.75rem,8vw,7.5rem)] text-ink lg:col-span-8">
            <RevealText text="Webexpo ElDjazair" />
          </h2>
          <p className="max-w-[44ch] text-mint-soft/80 lg:col-span-4">
            As part of the organizing IT team, I made sure every technical piece of a large-scale event ran
            smoothly: the website, online registration, check-in and the infrastructure on site.
          </p>
        </div>

        <div className="relative mt-20 grid gap-6 md:grid-cols-12">
          <motion.div className="md:col-span-8" style={reduced ? undefined : { y: slow }}>
            <RevealImage
              src={Site}
              alt="Webexpo ElDjazair 2nd edition website"
              loading="lazy"
              className="rounded-[1.5rem]"
              imgClassName="aspect-[16/10] w-full object-cover object-left-top"
            />
          </motion.div>
          <motion.div className="md:col-span-5 md:-ml-[25%] md:mt-[28%]" style={reduced ? undefined : { y: fast }}>
            <RevealImage
              src={Dashboard}
              alt="Webexpo admin dashboard for exhibitors, visitors and check-ins"
              loading="lazy"
              className="rounded-[1.25rem] shadow-[0_40px_80px_-30px_rgb(0_0_0/0.7)]"
              imgClassName="aspect-[16/10] w-full object-cover object-left-top"
            />
          </motion.div>
        </div>

        <div className="mt-24 grid gap-10 border-t border-mint/15 pt-10 md:grid-cols-3">
          {PARTS.map(([title, body]) => (
            <div key={title}>
              <Label className="text-mint">{title}</Label>
              <p className="mt-4 text-mint-soft/80">{body}</p>
            </div>
          ))}
        </div>

        <a
          href="https://webexpo-dz.com/"
          target="_blank"
          rel="noreferrer"
          className="btn btn-mint mt-14"
          data-cursor="Visit"
        >
          Visit webexpo-dz.com <ArrowUpRight size={16} />
        </a>
      </div>
    </section>
  );
}
