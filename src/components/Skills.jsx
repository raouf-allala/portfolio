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
import { RevealText } from './Fx';

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

function Icon({ icon }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
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

export default function Skills() {
  const reduced = prefersReducedMotion();
  return (
    <section id="skills" data-bg="#0a0c0b" aria-labelledby="skills-title" className="relative py-28 sm:py-40">
      <div className="page">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 id="skills-title" className="font-display text-[clamp(3rem,9vw,8.5rem)] text-ink lg:col-span-8">
            <RevealText text="Toolkit" />
          </h2>
          <p className="max-w-[38ch] text-muted lg:col-span-4 lg:justify-self-end">
            What I carry into every project, from the AI features down to the server that runs them.
          </p>
        </div>

        <ul className="mt-16 border-t border-line">
          {GROUPS.map((g, gi) => (
            <motion.li
              key={g.name}
              className="group grid gap-5 border-b border-line py-7 sm:grid-cols-12 sm:items-center sm:py-9"
              initial={reduced ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ duration: 0.8, delay: gi * 0.06, ease: EASE_OUT }}
            >
              <h3 className="text-[clamp(1.5rem,3vw,2.5rem)] font-medium tracking-[-0.035em] text-ink transition-colors duration-300 group-hover:text-mint sm:col-span-4">
                {g.name}
              </h3>
              <div className="flex flex-wrap gap-2 sm:col-span-8 sm:justify-end">
                {g.items.map((item) => (
                  <span
                    key={item.name}
                    className="inline-flex items-center gap-2.5 rounded-full bg-white/[0.06] px-4 py-2.5 text-[0.95rem] text-ink transition-colors duration-300 hover:bg-mint hover:text-on-mint"
                  >
                    <Icon icon={item.icon} />
                    {item.name}
                  </span>
                ))}
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
