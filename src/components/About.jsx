import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { prefersReducedMotion } from '../lib/motion';
import { Rule, SectionTitle } from './Blueprint';

const STATEMENT =
  "Hi, I'm Raouf Allala, a software engineer with over 3 years of experience in full-stack development. I've worked on a wide range of projects, from scalable web applications to intuitive user interfaces.";

function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.22, 1]);
  return (
    <motion.span style={{ opacity }} className="inline-block whitespace-pre">
      {children}
    </motion.span>
  );
}

/** Scroll moment: the statement lights up word by word as it is read. */
function Statement() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 45%'] });
  const words = STATEMENT.split(' ');

  if (prefersReducedMotion()) {
    return <p className="statement">{STATEMENT}</p>;
  }
  return (
    <p ref={ref} className="statement" aria-label={STATEMENT}>
      {words.map((w, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
          {w + (i < words.length - 1 ? ' ' : '')}
        </Word>
      ))}
    </p>
  );
}

const FOCUS = [
  {
    title: 'Full-stack development',
    body: 'I work on both the front end and the back end, building complete web applications from start to finish, so everything runs smoothly and efficiently and users have a great experience.',
  },
  {
    title: 'UI/UX',
    body: 'I focus on interfaces that are easy to navigate and pleasant to use. Design and code come from the same hands, so nothing gets lost between the mockup and the product.',
  },
];

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="relative py-24 sm:py-32">
      <div className="page">
        <SectionTitle id="about-title">About me</SectionTitle>
        <div className="mt-12 lg:ml-[calc(100%/12*2)]">
          <Statement />
        </div>
        <Rule className="mt-16 lg:ml-[calc(100%/12*2)]" />
        <div className="mt-10 grid gap-10 md:grid-cols-2 lg:ml-[calc(100%/12*2)]">
          {FOCUS.map((f) => (
            <div key={f.title}>
              <h3 className="font-wide text-xl font-semibold text-mint">{f.title}</h3>
              <p className="mt-3 max-w-[48ch] text-muted">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
