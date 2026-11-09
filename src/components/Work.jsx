import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import projects from '../data/projects.json';
import Maqam from '../assets/Capture.webp';
import Storify from '../assets/Capture2.webp';
import { EASE_OUT, prefersReducedMotion, scrollToY, seeded } from '../lib/motion';
import { RevealText } from './Fx';
import { ArrowUpRight } from './Icons';

/*
 * "Level select": the section pins like a game's stage-select screen. Scrolling
 * moves a pixel selection frame across the project tiles; the big preview
 * swaps with a quick pixel flip, the title decodes, and the whole page takes
 * on the selected project's colour. Tiles are also clickable.
 */

const LOCAL_IMAGES = { maqam: Maqam, storify: Storify };
const imageFor = (p) => LOCAL_IMAGES[p.img] ?? p.img;
const N = projects.length;
const tintBg = (tint) => `color-mix(in oklab, ${tint} 16%, #0a0c0b)`;

// Pixel flip grid: per-cell delays so the swap ripples across the image.
const FLIP_COLS = 12;
const FLIP_ROWS = 8;
const rnd = seeded(11);
const FLIP_DELAYS = Array.from({ length: FLIP_COLS * FLIP_ROWS }, (_, i) => {
  const x = i % FLIP_COLS;
  return (x / FLIP_COLS) * 0.18 + rnd() * 0.12;
});

const GLYPHS = '!<>-_/[]{}=+*^?#%ABCDEFGHJKLMNPRSTUVXYZ0123456789';
function useScramble(text, enabled) {
  const [out, setOut] = useState(text);
  useEffect(() => {
    if (!enabled) return;
    let frame = 0;
    const total = 12;
    const id = setInterval(() => {
      frame += 1;
      const reveal = Math.floor((text.length * frame) / total);
      setOut(
        [...text]
          .map((ch, i) => (i < reveal || ch === ' ' ? ch : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]))
          .join('')
      );
      if (frame >= total) clearInterval(id);
    }, 30);
    return () => clearInterval(id);
  }, [text, enabled]);
  return enabled ? out : text;
}

function Corner({ className }) {
  return <span className={`absolute h-3 w-3 border-mint ${className}`} />;
}

function Tile({ project, selected, onSelect }) {
  return (
    <li>
      <button
        type="button"
        onClick={onSelect}
        aria-pressed={selected}
        aria-label={`Show ${project.title}`}
        data-cursor="Select"
        className="group relative block w-full text-left"
      >
        <span
          className="relative block aspect-[4/3] overflow-hidden rounded-xl transition-[transform,opacity,filter] duration-500 ease-(--ease-out)"
          style={{
            background: project.tint,
            opacity: selected ? 1 : 0.45,
            filter: selected ? 'none' : 'saturate(0.4)',
            transform: selected ? 'translateY(-4px)' : 'none',
          }}
        >
          <img
            src={imageFor(project)}
            alt=""
            loading="lazy"
            className="absolute inset-x-[10%] top-[16%] w-[80%] rounded-[4px] object-cover object-top shadow-lg transition-transform duration-500 ease-(--ease-out) group-hover:scale-105"
            style={{ aspectRatio: '16/10', backgroundColor: project.bg ?? '#0e1110' }}
          />
        </span>
        {selected && (
          <motion.span
            layoutId="level-cursor"
            aria-hidden="true"
            className="pointer-events-none absolute -inset-[7px] bottom-auto aspect-[4/3] w-[calc(100%+14px)]"
            transition={{ type: 'spring', stiffness: 420, damping: 34 }}
          >
            <Corner className="left-0 top-0 border-l-2 border-t-2" />
            <Corner className="right-0 top-0 border-r-2 border-t-2" />
            <Corner className="bottom-0 left-0 border-b-2 border-l-2" />
            <Corner className="bottom-0 right-0 border-b-2 border-r-2" />
          </motion.span>
        )}
        <span
          className={`mt-2 block truncate font-mono text-[11px] uppercase tracking-[0.06em] transition-colors duration-300 ${
            selected ? 'text-mint' : 'text-muted'
          }`}
        >
          {project.title}
        </span>
      </button>
    </li>
  );
}

export default function Work() {
  const ref = useRef(null);
  const reduced = prefersReducedMotion();
  const [index, setIndex] = useState(0);
  const [shown, setShown] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  // Scroll drives the selection, and tints the page while the screen is pinned.
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (reduced) return;
    const i = Math.min(N - 1, Math.max(0, Math.floor(v * N)));
    if (i !== index) setIndex(i);
    if (v > 0 && v < 1) document.documentElement.style.setProperty('--page-bg', tintBg(projects[i].tint));
  });

  // The preview swaps halfway through the pixel flip.
  useEffect(() => {
    const t = setTimeout(() => setShown(index), reduced ? 0 : 260);
    return () => clearTimeout(t);
  }, [index, reduced]);

  const select = (i) => {
    if (reduced) {
      setIndex(i);
      return;
    }
    const el = ref.current;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const travel = el.offsetHeight - window.innerHeight;
    scrollToY(top + ((i + 0.5) / N) * travel);
  };

  const p = projects[shown];
  const target = projects[index];
  const title = useScramble(p.title, !reduced);

  return (
    <section id="work" data-bg="#0a0c0b" aria-labelledby="work-title" className="relative">
      <div ref={ref} style={reduced ? undefined : { height: `${100 + N * 55}vh` }}>
        <div className={`${reduced ? 'py-28' : 'sticky top-0 h-[100svh]'} flex flex-col pb-5 pt-20 sm:pb-8 sm:pt-24`}>
          <div className="page flex min-h-0 flex-1 flex-col">
            {/* header */}
            <div className="flex items-end justify-between gap-6">
              <h2 id="work-title" className="font-display text-[clamp(2.5rem,6.5vw,5.75rem)] text-ink">
                <RevealText text="Selected work" />
              </h2>
              <p className="hidden max-w-[34ch] pb-2 text-muted lg:block">
                After school came the real thing: products for real clients at CodevIT, and the ones I build for
                myself when an idea won&apos;t leave me alone.
              </p>
            </div>

            {/* preview */}
            <div className="mt-5 grid min-h-0 flex-1 gap-5 lg:mt-8 lg:grid-cols-12 lg:gap-10">
              <div
                className="relative min-h-[11rem] overflow-hidden rounded-[1.5rem] transition-[background-color] duration-700 lg:order-2 lg:col-span-8"
                style={{
                  backgroundColor: target.tint,
                  backgroundImage: 'linear-gradient(140deg, transparent, rgb(0 0 0 / 0.45))',
                }}
              >
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.img
                    key={p.id}
                    src={imageFor(p)}
                    alt={`${p.title} screenshot`}
                    className="absolute left-1/2 top-1/2 max-h-[84%] max-w-[88%] -translate-x-1/2 -translate-y-1/2 rounded-lg object-contain shadow-[0_30px_60px_-20px_rgb(0_0_0/0.6)]"
                    style={{ backgroundColor: p.bg ?? '#0e1110' }}
                    initial={reduced ? false : { opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, ease: EASE_OUT }}
                  />
                </AnimatePresence>
                {!reduced && (
                  <div
                    key={index}
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 grid"
                    style={{ gridTemplateColumns: `repeat(${FLIP_COLS}, 1fr)`, gridTemplateRows: `repeat(${FLIP_ROWS}, 1fr)` }}
                  >
                    {FLIP_DELAYS.map((d, i) => (
                      <span
                        key={i}
                        className="block"
                        style={{
                          background: `color-mix(in oklab, ${target.tint} 80%, white)`,
                          transform: 'scale(0)',
                          animation: `pixelflip 520ms ${d}s var(--ease-in-out) both`,
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>

              <div className="flex flex-col justify-end lg:order-1 lg:col-span-4">
                <h3 className="font-display text-[clamp(2rem,4.2vw,3.75rem)] text-ink" aria-live="polite">
                  {title}
                </h3>
                <p className="mt-3 text-sm text-mint">
                  {p.category}
                  <span className="text-muted"> · {p.kind === 'client' ? 'at CodevIT' : 'side project'}</span>
                </p>
                <p className="mt-3 max-w-[42ch] text-muted max-sm:line-clamp-2 [@media(max-height:760px)]:hidden">
                  {p.summary}
                </p>
                {p.link && (
                  <a href={p.link} target="_blank" rel="noreferrer" className="btn btn-ghost mt-5 self-start" data-cursor="Visit">
                    {p.linkLabel} <ArrowUpRight size={16} />
                  </a>
                )}
              </div>
            </div>

            {/* level select */}
            <ul className="mt-6 grid grid-cols-4 gap-x-2.5 gap-y-3 sm:gap-x-3 lg:mt-8 lg:grid-cols-8 lg:gap-4" aria-label="Projects">
              {projects.map((proj, i) => (
                <Tile key={proj.id} project={proj} selected={i === index} onSelect={() => select(i)} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
