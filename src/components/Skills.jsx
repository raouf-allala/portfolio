import { motion } from 'framer-motion';
import {
  siGit,
  siLaravel,
  siMongodb,
  siMysql,
  siNextdotjs,
  siNodedotjs,
  siReact,
  siTailwindcss,
} from 'simple-icons';
import { EASE_OUT } from '../lib/motion';
import { SectionTitle } from './Blueprint';
import Marquee from './Marquee';

// AWS isn't in simple-icons (trademark removal), so it gets a drawn cloud.
const cloud = {
  path: 'M6.5 19a4.5 4.5 0 0 1-.42-8.98 6 6 0 0 1 11.6-1.5A5 5 0 0 1 17.5 19h-11Z',
  stroke: true,
};

const SKILLS = [
  { name: 'React', role: 'Front end', icon: siReact },
  { name: 'React Native', role: 'Mobile', icon: siReact },
  { name: 'Next.js', role: 'Front end', icon: siNextdotjs },
  { name: 'Tailwind CSS', role: 'Styling', icon: siTailwindcss },
  { name: 'Node.js', role: 'Back end', icon: siNodedotjs },
  { name: 'Laravel', role: 'Back end', icon: siLaravel },
  { name: 'MongoDB', role: 'Database', icon: siMongodb },
  { name: 'MySQL', role: 'Database', icon: siMysql },
  { name: 'Git', role: 'Tooling', icon: siGit },
  { name: 'AWS', role: 'Cloud', icon: cloud },
];

function SkillIcon({ icon }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="36"
      height="36"
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
  return (
    <section id="skills" aria-labelledby="skills-title" className="relative overflow-hidden py-24 sm:py-32">
      <Marquee
        rows={[
          ['React', 'Next.js', 'React Native', 'Tailwind CSS', 'Node.js'],
          ['Laravel', 'MongoDB', 'MySQL', 'Git', 'AWS'],
        ]}
      />
      <div className="page mt-16 sm:mt-24">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <SectionTitle id="skills-title" className="lg:col-span-6">
            Toolkit
          </SectionTitle>
          <p className="max-w-[44ch] text-muted lg:col-span-6 lg:justify-self-end">
            The stack I reach for every day, from the interface down to the server.
          </p>
        </div>

        <ul className="mt-14 grid grid-cols-2 border-l border-t border-line md:grid-cols-5">
          {SKILLS.map((s, i) => (
            <motion.li
              key={s.name}
              className="group relative flex aspect-square flex-col sm:aspect-[5/4] justify-between border-b border-r border-line p-5 transition-colors duration-300 hover:bg-field/70 sm:p-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ duration: 0.6, delay: (i % 5) * 0.06, ease: EASE_OUT }}
            >
              <span className="text-mint transition-transform duration-300 ease-(--ease-out) group-hover:-translate-y-1">
                <SkillIcon icon={s.icon} />
              </span>
              <span>
                <span className="block font-wide text-lg font-semibold leading-tight text-ink">
                  {s.name}
                </span>
                <span className="mt-1 block font-mono text-[11px] text-muted">{s.role}</span>
              </span>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
