import { useEffect, useRef } from 'react';
import { motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion';
import { prefersReducedMotion, seeded } from '../lib/motion';
import { PixelLabel, RevealText } from './Fx';
import { pixels, ROBOT } from '../lib/sprites';

const STATEMENT =
  "Hi, I'm Raouf, a software engineer with over 3 years of experience building full-stack web and mobile products. These days I work as an AI engineer too, turning models into features people actually use.";

const FOCUS = [
  {
    label: 'Software engineering',
    body: 'Complete products, front end to back end: APIs, databases, web and mobile apps that stay fast and reliable.',
  },
  {
    label: 'AI engineering',
    body: 'Bringing AI into real products: LLM-powered features, integrations and the plumbing that makes them dependable.',
  },
  {
    label: 'Off the clock',
    body: 'Games, pixel art and whatever nerdy side project has my attention this week.',
  },
];

function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  return (
    <motion.span style={{ opacity }} className="inline">
      {children}
    </motion.span>
  );
}

const rnd = seeded(42);
const CELLS = pixels(ROBOT).map((p) => ({
  ...p,
  sx: (rnd() - 0.5) * 3.2, // start offset, in sprite widths
  sy: (rnd() - 0.5) * 3.2,
  delay: rnd() * 0.45,
  spin: (rnd() - 0.5) * Math.PI,
}));

/** Bit assembles itself from scattered pixels as the visitor scrolls. */
function Assembly({ progress, still }) {
  const canvas = useRef(null);

  const draw = (p) => {
    const c = canvas.current;
    if (!c) return;
    const size = c.clientWidth;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    if (c.width !== size * dpr) {
      c.width = size * dpr;
      c.height = size * dpr;
    }
    const ctx = c.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, size, size);
    const cell = size / 24;
    const origin = (size - cell * 16) / 2;
    for (const px of CELLS) {
      const t = Math.min(1, Math.max(0, (p - px.delay) / 0.5));
      const e = 1 - Math.pow(1 - t, 3);
      const x = origin + (px.x + px.sx * 16 * (1 - e)) * cell;
      const y = origin + (px.y + px.sy * 16 * (1 - e)) * cell;
      const a = px.spin * (1 - e);
      ctx.globalAlpha = 0.25 + 0.75 * e;
      ctx.fillStyle = px.c;
      ctx.save();
      ctx.translate(x + cell / 2, y + cell / 2);
      ctx.rotate(a);
      ctx.fillRect(-cell / 2, -cell / 2, cell + 0.5, cell + 0.5);
      ctx.restore();
    }
    ctx.globalAlpha = 1;
  };

  useMotionValueEvent(progress, 'change', (v) => draw(still ? 1 : v));
  useEffect(() => {
    draw(still ? 1 : progress.get());
    const onResize = () => draw(still ? 1 : progress.get());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <canvas ref={canvas} aria-hidden="true" className="aspect-square w-full" />;
}

export default function About() {
  const ref = useRef(null);
  const reduced = prefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const words = STATEMENT.split(' ');
  const build = useTransform(scrollYProgress, [0.05, 0.75], [0, 1]);
  const status = useTransform(scrollYProgress, (v) => (v > 0.75 ? 1 : 0));

  return (
    <section id="about" aria-labelledby="about-title" className="relative">
      <div ref={ref} className={reduced ? 'py-24' : 'h-[260vh]'}>
        <div className={reduced ? '' : 'sticky top-0 flex h-[100svh] items-center overflow-hidden'}>
          <div className="page grid w-full items-center gap-8 pt-16 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <h2 id="about-title" className="font-display text-[clamp(2.5rem,6vw,5rem)] text-ink">
                <RevealText text="About me" />
              </h2>
              <p
                className="statement mt-8 !max-w-[34ch] !text-[clamp(1.35rem,2.6vw,2.25rem)]"
                aria-label={STATEMENT}
              >
                {reduced
                  ? STATEMENT
                  : words.map((w, i) => (
                      <Word
                        key={i}
                        progress={scrollYProgress}
                        range={[0.04 + (i / words.length) * 0.6, 0.04 + ((i + 1) / words.length) * 0.6]}
                      >
                        {w + ' '}
                      </Word>
                    ))}
              </p>
            </div>

            <div className="mx-auto w-44 sm:w-64 lg:col-span-5 lg:w-full lg:max-w-[26rem]">
              <Assembly progress={build} still={reduced} />
              <motion.p className="mt-2 text-center" style={reduced ? undefined : { opacity: status }}>
                <PixelLabel className="text-mint">Bit assembled · ready</PixelLabel>
              </motion.p>
            </div>
          </div>
        </div>
      </div>

      <div className="page pb-24 sm:pb-32">
        <div className="grid gap-8 border-t border-line pt-8 sm:grid-cols-3">
          {FOCUS.map((f) => (
            <div key={f.label}>
              <PixelLabel className="text-mint">{f.label}</PixelLabel>
              <p className="mt-3 max-w-[40ch] text-muted">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
