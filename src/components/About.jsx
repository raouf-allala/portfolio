import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { prefersReducedMotion } from '../lib/motion';
import { Label, RevealText } from './Fx';

// Words wrapped in [brackets] get a mint highlighter that sweeps in.
const STATEMENT =
  "I'm Raouf, a [software engineer] with over 3 years of experience building full-stack web and mobile products. These days I also work as an [AI engineer], turning models into features people actually use.";

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

// Split into tokens, remembering which words sit inside [ ... ].
const TOKENS = (() => {
  const out = [];
  let hl = false;
  for (const raw of STATEMENT.split(' ')) {
    let w = raw;
    if (w.startsWith('[')) {
      hl = true;
      w = w.slice(1);
    }
    const close = w.includes(']');
    w = w.replace(']', '');
    out.push({ w, hl });
    if (close) hl = false;
  }
  return out;
})();
const PLAIN = STATEMENT.replace(/[[\]]/g, '');

function Word({ token, progress, range }) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  const sweep = useTransform(progress, range, [0, 1]);
  // highlighted words stay light until the mint sweep has passed under them
  const color = useTransform(progress, [range[0], range[1]], ['#f2f7f5', '#08231b']);
  return (
    <motion.span style={{ opacity }} className="relative inline">
      {token.hl && (
        <motion.span
          aria-hidden="true"
          className="absolute inset-x-[-0.08em] bottom-[0.06em] top-[0.12em] -z-10 origin-left rounded-[0.15em] bg-mint"
          style={{ scaleX: sweep }}
        />
      )}
      {token.hl ? <motion.span style={{ color }}>{token.w}</motion.span> : token.w}{' '}
    </motion.span>
  );
}

export default function About() {
  const ref = useRef(null);
  const reduced = prefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const n = TOKENS.length;

  return (
    <section id="about" data-bg="#0a0c0b" aria-labelledby="about-title" className="relative">
      <div ref={ref} className={reduced ? 'py-28' : 'h-[240vh]'}>
        <div className={reduced ? '' : 'sticky top-0 flex h-[100svh] items-center'}>
          <div className="page w-full">
            <h2 id="about-title" className="text-sm text-muted">
              <RevealText text="About me" />
            </h2>
            <p
              className="isolate mt-8 max-w-[22ch] text-[clamp(2rem,5.6vw,5.25rem)] font-medium leading-[1.02] tracking-[-0.045em] text-ink"
              aria-label={PLAIN}
            >
              {reduced
                ? TOKENS.map((t, i) => (
                    <span key={i} className={t.hl ? 'rounded bg-mint text-on-mint' : undefined}>
                      {t.w}{' '}
                    </span>
                  ))
                : TOKENS.map((t, i) => (
                    <Word
                      key={i}
                      token={t}
                      progress={scrollYProgress}
                      range={[0.05 + (i / n) * 0.75, 0.05 + ((i + 1) / n) * 0.75]}
                    />
                  ))}
            </p>
          </div>
        </div>
      </div>

      <div className="page pb-28 sm:pb-36">
        <div className="grid gap-10 border-t border-line pt-10 sm:grid-cols-3">
          {FOCUS.map((f) => (
            <div key={f.label}>
              <Label className="text-mint">{f.label}</Label>
              <p className="mt-4 max-w-[40ch] text-muted">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
