import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { EASE_OUT, prefersReducedMotion, seeded } from '../lib/motion';
import { RevealText } from './Fx';

/*
 * "How I got here": the education story. The page turns light like a
 * notebook, each part of the story comes into focus as it reaches the middle
 * of the screen, and a little pixel drawing on the side morphs to match it
 * (a quiet echo of the pixel name in the hero).
 */

const STEPS = [
  {
    when: 'First',
    title: "Bachelor's in Software Engineering",
    body: 'This is where it clicked. I came in curious about how software works and left knowing how to build it properly: clean code, solid databases, and the patience to debug the things I broke along the way.',
    shape: 'code',
  },
  {
    when: 'Then',
    title: "Master's in Artificial Intelligence & Data Science",
    body: "Building apps wasn't enough anymore. I wanted the things I make to understand data, spot patterns and get a little smarter over time, so I kept going with a master's in AI and data science.",
    shape: 'spark',
  },
  {
    when: 'Now',
    title: 'Somewhere in between',
    body: "Which is exactly where I like it: solid engineering underneath, AI where it actually helps, and a soft spot for the small details people notice without knowing why.",
    shape: 'heart',
  },
];

// 12 × 10 pixel drawings
const SHAPES = {
  code: [
    '............',
    '.......#....',
    '.......#....',
    '..#...#..#..',
    '.#....#...#.',
    '#....#.....#',
    '.#...#....#.',
    '..#.#....#..',
    '....#.......',
    '............',
  ],
  spark: [
    '.....#......',
    '.....#......',
    '....###.....',
    '...#####....',
    '###########.',
    '...#####....',
    '....###.....',
    '.....#...#..',
    '.....#..###.',
    '.........#..',
  ],
  heart: [
    '............',
    '..###..###..',
    '.#####.####.',
    '############',
    '############',
    '.##########.',
    '..########..',
    '...######...',
    '....####....',
    '.....##.....',
  ],
};
const COLS = 12;
const ROWS = 10;
const rnd = seeded(5);
const DELAYS = Array.from({ length: COLS * ROWS }, () => rnd() * 0.35);

function PixelMorph({ shape, cell }) {
  const grid = SHAPES[shape];
  return (
    <div
      aria-hidden="true"
      className="grid gap-[3px]"
      style={{ gridTemplateColumns: `repeat(${COLS}, ${cell}px)` }}
    >
      {Array.from({ length: COLS * ROWS }, (_, i) => {
        const on = grid[Math.floor(i / COLS)][i % COLS] === '#';
        return (
          <span
            key={i}
            className="block rounded-[2px] bg-green transition-[opacity,transform] duration-500 ease-(--ease-out)"
            style={{
              width: cell,
              height: cell,
              opacity: on ? 1 : 0.07,
              transform: on ? 'scale(1)' : 'scale(0.55)',
              transitionDelay: `${DELAYS[i]}s`,
            }}
          />
        );
      })}
    </div>
  );
}

export default function Journey() {
  const [active, setActive] = useState(0);
  const steps = useRef([]);
  const reduced = prefersReducedMotion();

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number(e.target.dataset.index));
        });
      },
      { rootMargin: '-45% 0px -45% 0px' }
    );
    steps.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const step = STEPS[active];

  return (
    <section
      id="education"
      data-bg="#eef2ef"
      data-fg="#0a0c0b"
      aria-labelledby="education-title"
      className="relative pt-28 text-ground sm:pt-40"
    >
      <div className="page">
        <h2 id="education-title" className="font-display text-[clamp(3rem,9vw,8.5rem)]">
          <RevealText text="How I got here" />
        </h2>

        <div className="mt-10 grid lg:grid-cols-12 lg:gap-12">
          {/* sticky side: the drawing and where we are in the story */}
          <div className="sticky top-0 z-10 -mx-5 self-start bg-[#eef2ef]/90 px-5 py-4 backdrop-blur lg:top-0 lg:col-span-5 lg:mx-0 lg:flex lg:h-[100svh] lg:items-center lg:bg-transparent lg:p-0 lg:backdrop-blur-none">
            <div className="flex items-center gap-5 lg:block">
              <div className="lg:hidden">
                <PixelMorph shape={step.shape} cell={7} />
              </div>
              <div className="hidden lg:block">
                <PixelMorph shape={step.shape} cell={22} />
              </div>
              <div className="lg:mt-10">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.p
                    key={step.when}
                    className="font-mono text-xs uppercase tracking-[0.08em] text-green"
                    initial={reduced ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3, ease: EASE_OUT }}
                  >
                    {step.when}
                  </motion.p>
                </AnimatePresence>
                <div className="mt-3 hidden h-px w-48 bg-ground/10 lg:block">
                  <motion.div
                    className="h-px origin-left bg-green"
                    animate={{ scaleX: (active + 1) / STEPS.length }}
                    transition={{ duration: 0.6, ease: EASE_OUT }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* the story itself */}
          <ol className="lg:col-span-7">
            {STEPS.map((s, i) => (
              <li
                key={s.title}
                ref={(el) => {
                  steps.current[i] = el;
                }}
                data-index={i}
                className="flex min-h-[70svh] flex-col justify-center py-12 transition-opacity duration-500 lg:min-h-[95svh]"
                style={{ opacity: active === i || reduced ? 1 : 0.22 }}
              >
                <p className="font-mono text-xs uppercase tracking-[0.08em] text-green">{s.when}</p>
                <h3 className="mt-4 text-[clamp(2rem,4.2vw,3.75rem)] font-semibold leading-[1] tracking-[-0.045em]">
                  {s.title}
                </h3>
                <p className="mt-6 max-w-[46ch] text-[clamp(1.1rem,1.6vw,1.35rem)] leading-relaxed text-ground/70">
                  {s.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
