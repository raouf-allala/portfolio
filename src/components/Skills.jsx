import { motion } from 'framer-motion';
import {
  siGit,
  siLaravel,
  siMongodb,
  siMysql,
  siNextdotjs,
  siNodedotjs,
  siPython,
  siReact,
  siTailwindcss,
} from 'simple-icons';
import { EASE_OUT, prefersReducedMotion } from '../lib/motion';
import { PixelLabel, RevealText } from './Fx';

// Drawn glyphs for the two items simple-icons doesn't carry.
const SPARK = {
  path: 'M12 2.5 13.8 9a2 2 0 0 0 1.2 1.2l6.5 1.8-6.5 1.8a2 2 0 0 0-1.2 1.2L12 21.5 10.2 15a2 2 0 0 0-1.2-1.2L2.5 12 9 10.2A2 2 0 0 0 10.2 9Z',
  stroke: true,
};
const CLOUD = {
  path: 'M6.5 19a4.5 4.5 0 0 1-.42-8.98 6 6 0 0 1 11.6-1.5A5 5 0 0 1 17.5 19h-11Z',
  stroke: true,
};

const GROUPS = [
  { name: 'AI', items: [{ name: 'Python', icon: siPython }, { name: 'LLM APIs', icon: SPARK }] },
  {
    name: 'Front end',
    items: [
      { name: 'React', icon: siReact },
      { name: 'Next.js', icon: siNextdotjs },
      { name: 'React Native', icon: siReact },
      { name: 'Tailwind CSS', icon: siTailwindcss },
    ],
  },
  { name: 'Back end', items: [{ name: 'Node.js', icon: siNodedotjs }, { name: 'Laravel', icon: siLaravel }] },
  { name: 'Data', items: [{ name: 'MongoDB', icon: siMongodb }, { name: 'MySQL', icon: siMysql }] },
  { name: 'Tools', items: [{ name: 'Git', icon: siGit }, { name: 'AWS', icon: CLOUD }] },
];

const COUNT = GROUPS.reduce((n, g) => n + g.items.length, 0);

function Icon({ icon }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="30"
      height="30"
      aria-hidden="true"
      fill={icon.stroke ? 'none' : 'currentColor'}
      stroke={icon.stroke ? 'currentColor' : 'none'}
      strokeWidth={icon.stroke ? 1.75 : 0}
      strokeLinejoin="round"
    >
      <path d={icon.path} />
    </svg>
  );
}

function Slot({ item, delay }) {
  const reduced = prefersReducedMotion();
  return (
    <motion.li
      className="group bg-line p-px pixel-corners transition-colors duration-300 hover:bg-mint"
      initial={reduced ? false : { opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.5, delay, ease: EASE_OUT }}
    >
      <div className="flex h-full flex-col justify-between gap-6 bg-ground p-4 pixel-corners sm:p-5">
        <span className="text-mint transition-transform duration-300 ease-(--ease-out) group-hover:-translate-y-1 group-hover:scale-110">
          <Icon icon={item.icon} />
        </span>
        <span className="font-wide text-base font-semibold leading-tight text-ink">{item.name}</span>
      </div>
    </motion.li>
  );
}

export default function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="relative py-24 sm:py-32">
      <div className="page">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 id="skills-title" className="font-display text-[clamp(2.75rem,8vw,7rem)] text-ink lg:col-span-8">
            <RevealText text="Toolkit" />
          </h2>
          <p className="max-w-[40ch] text-muted lg:col-span-4 lg:justify-self-end">
            My inventory: {COUNT} items, from AI features down to the server that runs them.
          </p>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-5 lg:gap-4">
          {GROUPS.map((g, gi) => (
            <div key={g.name}>
              <PixelLabel className="text-mint">{g.name}</PixelLabel>
              <ul className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-1">
                {g.items.map((item, ii) => (
                  <Slot key={item.name} item={item} delay={gi * 0.06 + ii * 0.04} />
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
