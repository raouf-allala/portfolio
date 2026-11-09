import { motion } from 'framer-motion';
import Site from '../assets/webexpo/webexpo.webp';
import Dashboard from '../assets/webexpo/webexpo2.webp';
import { EASE_OUT } from '../lib/motion';
import { Construction, SectionTitle } from './Blueprint';
import { ArrowUpRight } from './Icons';

const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '0px 0px -15% 0px' },
  transition: { duration: 0.9, ease: EASE_OUT },
};

export default function Webexpo() {
  return (
    <section
      id="webexpo"
      aria-labelledby="webexpo-title"
      className="relative overflow-hidden bg-field py-24 sm:py-32"
    >
      <div className="pointer-events-none absolute inset-0 grid-ground opacity-60" aria-hidden="true" />
      <Construction
        shape="corner"
        className="pointer-events-none absolute -right-6 top-0 h-80 w-auto -scale-x-100 text-line-strong"
      />

      <div className="page relative">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionTitle id="webexpo-title">Webexpo ElDjazair</SectionTitle>
            <p className="mt-6 max-w-[58ch] text-lg text-mint-soft/90">
              I was part of the organizing team for Webexpo. As a member of the IT team, I made
              sure every technical part of a large-scale event ran smoothly, from the event’s
              website and online registration to the technical infrastructure on site.
            </p>
          </div>
          <div className="lg:col-span-5 lg:justify-self-end">
            <a
              href="https://webexpo-dz.com/"
              target="_blank"
              rel="noreferrer"
              className="btn btn-mint"
            >
              Visit webexpo-dz.com <ArrowUpRight size={16} />
            </a>
          </div>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-12">
          <motion.figure className="md:col-span-7" {...reveal}>
            <div className="plate bg-ground-deep">
              <img
                src={Site}
                alt="Webexpo ElDjazair 2nd edition website"
                loading="lazy"
                width="1600"
                height="791"
                className="aspect-[16/10] w-full object-cover object-left-top"
              />
            </div>
          </motion.figure>
          <motion.figure className="md:col-span-5 md:mt-24" {...reveal} transition={{ ...reveal.transition, delay: 0.1 }}>
            <div className="plate bg-ground-deep">
              <img
                src={Dashboard}
                alt="Webexpo admin dashboard for exhibitors, visitors and check-ins"
                loading="lazy"
                width="1600"
                height="799"
                className="aspect-[16/10] w-full object-cover object-left-top"
              />
            </div>
          </motion.figure>
        </div>

        <div className="mt-14 grid gap-8 border-t border-line-strong pt-10 md:grid-cols-3">
          {[
            ['Admin dashboard', 'Built and maintained the dashboard the organizers used to run exhibitors, visitors and content.'],
            ['Registration', 'With the CodevIT team, a streamlined registration flow that kept sign-up simple for every attendee.'],
            ['Mobile check-in', 'A mobile app for on-site check-ins, so attendees got through the door quickly.'],
          ].map(([title, body]) => (
            <div key={title}>
              <h3 className="font-wide text-lg font-semibold text-mint">{title}</h3>
              <p className="mt-2 text-mint-soft/80">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
