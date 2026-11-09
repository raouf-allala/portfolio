import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import projects from '../data/projects.json';
import Maqam from '../assets/Capture.webp';
import Storify from '../assets/Capture2.webp';
import { prefersReducedMotion } from '../lib/motion';
import { PixelImage, PixelLabel, RevealText } from './Fx';
import { ArrowUpRight } from './Icons';

const LOCAL_IMAGES = { maqam: Maqam, storify: Storify };
const imageFor = (p) => LOCAL_IMAGES[p.img] ?? p.img;
const pad = (n) => String(n).padStart(2, '0');

/**
 * Scroll moment: cards pin one after another and stack like a deck; each
 * card already in the deck shrinks and dims as the next one slides over it.
 */
function Card({ project, index, total, progress }) {
  const reduced = prefersReducedMotion();
  const start = index / total;
  const scale = useTransform(progress, [start, 1], [1, 1 - (total - index) * 0.035]);
  const dim = useTransform(progress, [start, Math.min(1, start + 1 / total)], [0, index === total - 1 ? 0 : 0.55]);

  return (
    <div
      className="sticky"
      style={{ top: `calc(5.5rem + ${index * 14}px)` }}
    >
      <motion.article
        id={`project-${project.id}`}
        aria-labelledby={`project-${project.id}-title`}
        className="relative origin-top bg-line-strong p-px pixel-corners"
        style={reduced ? undefined : { scale }}
      >
        <div className="grid gap-6 bg-surface p-4 pixel-corners sm:p-6 lg:grid-cols-12 lg:gap-10 lg:p-8">
          <div className="flex flex-col lg:col-span-5">
            <div className="flex items-center justify-between">
              <PixelLabel className="text-mint">
                {pad(index + 1)} / {pad(total)}
              </PixelLabel>
              <PixelLabel className="text-muted">
                {project.kind === 'client' ? 'CodevIT' : 'Personal'}
              </PixelLabel>
            </div>
            <h3
              id={`project-${project.id}-title`}
              className="mt-6 font-display text-[clamp(2rem,4.5vw,3.75rem)] text-ink lg:mt-auto"
            >
              {project.title}
            </h3>
            <p className="mt-3 font-mono text-[0.8rem] text-mint">{project.category}</p>
            <p className="mt-3 max-w-[44ch] text-muted">{project.summary}</p>
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="btn btn-line mt-6 self-start"
              >
                {project.linkLabel} <ArrowUpRight size={16} />
                <span className="sr-only"> ({project.title})</span>
              </a>
            )}
          </div>
          <a
            href={project.link ?? undefined}
            target={project.link ? '_blank' : undefined}
            rel="noreferrer"
            tabIndex={project.link ? -1 : undefined}
            aria-hidden="true"
            data-cursor={project.link ? 'Visit ↗' : 'Preview'}
            className="group block overflow-hidden pixel-corners lg:col-span-7"
          >
            <PixelImage
              src={imageFor(project)}
              alt=""
              fit={project.fit}
              bg={project.bg ?? '#1b1e22'}
              loading="lazy"
              decoding="async"
              imgClassName={`aspect-[16/10] w-full transition-transform duration-700 ease-(--ease-out) group-hover:scale-[1.03] ${
                project.fit === 'contain' ? 'object-contain' : 'object-cover object-top'
              }`}
            />
          </a>
        </div>
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-ground-deep"
          style={reduced ? { opacity: 0 } : { opacity: dim }}
        />
      </motion.article>
    </div>
  );
}

export default function Work() {
  const deck = useRef(null);
  const { scrollYProgress } = useScroll({ target: deck, offset: ['start start', 'end end'] });

  return (
    <section id="work" aria-labelledby="work-title" className="relative py-24 sm:py-32">
      <div className="page">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 id="work-title" className="font-display text-[clamp(2.75rem,8vw,7rem)] text-ink lg:col-span-8">
            <RevealText text="Selected work" />
          </h2>
          <p className="max-w-[40ch] text-muted lg:col-span-4 lg:justify-self-end">
            Products I built at CodevIT, and things I made on my own: web, mobile, and everything
            between the database and the pixels.
          </p>
        </div>

        <div ref={deck} className="mt-14 flex flex-col gap-[12vh] pb-[6vh]">
          {projects.map((p, i) => (
            <Card key={p.id} project={p} index={i} total={projects.length} progress={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  );
}
