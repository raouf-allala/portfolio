import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import projects from '../data/projects.json';
import Maqam from '../assets/Capture.webp';
import Storify from '../assets/Capture2.webp';
import { prefersReducedMotion } from '../lib/motion';
import { Label, RevealText } from './Fx';
import { ArrowUpRight } from './Icons';

const LOCAL_IMAGES = { maqam: Maqam, storify: Storify };
const imageFor = (p) => LOCAL_IMAGES[p.img] ?? p.img;
const pad = (n) => String(n).padStart(2, '0');

/**
 * Scroll moment: each card pins and the next one slides over it, so the
 * projects stack like a deck. Every card takes the colour of its product.
 */
function Card({ project, index, total, progress }) {
  const ref = useRef(null);
  const reduced = prefersReducedMotion();
  const start = index / total;
  const scale = useTransform(progress, [start, 1], [1, 1 - (total - index) * 0.03]);
  const dim = useTransform(progress, [start, Math.min(1, start + 1 / total)], [0, index === total - 1 ? 0 : 0.6]);
  // inner parallax: the screenshot drifts inside its colour panel
  const { scrollYProgress: local } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const drift = useTransform(local, [0, 1], ['10%', '-6%']);
  const tint = project.tint ?? '#1e755a';

  return (
    <div ref={ref} className="sticky" style={{ top: `calc(6rem + ${index * 12}px)` }}>
      <motion.article
        id={`project-${project.id}`}
        aria-labelledby={`project-${project.id}-title`}
        className="relative origin-top overflow-hidden rounded-[2rem] shadow-[0_-20px_60px_-30px_rgb(0_0_0/0.8)]"
        style={{
          background: `color-mix(in oklab, ${tint} 16%, #121514)`,
          ...(reduced ? null : { scale }),
        }}
      >
        <div className="grid gap-6 p-5 sm:p-8 lg:grid-cols-12 lg:gap-10 lg:p-10">
          <div className="flex flex-col lg:col-span-4">
            <div className="flex items-center gap-3">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: tint }} />
              <Label className="text-muted">
                {pad(index + 1)} / {pad(total)} · {project.kind === 'client' ? 'CodevIT' : 'Personal'}
              </Label>
            </div>
            <h3
              id={`project-${project.id}-title`}
              className="mt-6 font-display text-[clamp(2.25rem,4.6vw,4rem)] text-ink lg:mt-auto"
            >
              {project.title}
            </h3>
            <p className="mt-3 text-sm text-mint">{project.category}</p>
            <p className="mt-3 max-w-[42ch] text-muted">{project.summary}</p>
            {project.link && (
              <a href={project.link} target="_blank" rel="noreferrer" className="btn btn-ghost mt-7 self-start">
                {project.linkLabel} <ArrowUpRight size={16} />
                <span className="sr-only"> ({project.title})</span>
              </a>
            )}
          </div>

          <a
            href={project.link ?? undefined}
            target={project.link ? '_blank' : undefined}
            rel="noreferrer"
            tabIndex={-1}
            aria-hidden="true"
            data-cursor={project.link ? 'Visit' : 'Preview'}
            className="group relative block aspect-[16/11] overflow-hidden rounded-[1.4rem] lg:col-span-8"
            style={{ background: `linear-gradient(140deg, ${tint}, color-mix(in oklab, ${tint} 55%, #000))` }}
          >
            <motion.div
              className="absolute inset-x-[7%] top-[9%]"
              style={reduced ? undefined : { y: drift }}
            >
              <img
                src={imageFor(project)}
                alt=""
                loading="lazy"
                decoding="async"
                className={`w-full rounded-xl shadow-[0_30px_60px_-20px_rgb(0_0_0/0.6)] transition-transform duration-700 ease-(--ease-out) group-hover:scale-[1.03] ${
                  project.fit === 'contain' ? 'aspect-[16/10] object-contain' : 'aspect-[16/10] object-cover object-top'
                }`}
                style={{ backgroundColor: project.bg ?? '#0e1110' }}
              />
            </motion.div>
          </a>
        </div>
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-ground"
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
    <section id="work" data-bg="#0a0c0b" aria-labelledby="work-title" className="relative pb-28 sm:pb-36">
      <div className="page">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 id="work-title" className="font-display text-[clamp(3rem,9vw,8.5rem)] text-ink lg:col-span-8">
            <RevealText text="Selected work" />
          </h2>
          <p className="max-w-[38ch] text-muted lg:col-span-4 lg:justify-self-end">
            Products I built at CodevIT, and things I made on my own: web, mobile, and everything between the
            database and the pixels.
          </p>
        </div>

        <div ref={deck} className="mt-16 flex flex-col gap-[14vh] pb-[4vh]">
          {projects.map((p, i) => (
            <Card key={p.id} project={p} index={i} total={projects.length} progress={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  );
}
