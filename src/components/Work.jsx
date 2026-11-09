import { useLayoutEffect, useRef, useState } from 'react';
import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from 'framer-motion';
import projects from '../data/projects.json';
import Maqam from '../assets/Capture.webp';
import Storify from '../assets/Capture2.webp';
import { prefersReducedMotion, useMediaQuery } from '../lib/motion';
import { SectionTitle } from './Blueprint';
import { ArrowUpRight } from './Icons';
import RippleImage from './RippleImage';

const LOCAL_IMAGES = { maqam: Maqam, storify: Storify };
const imageFor = (p) => LOCAL_IMAGES[p.img] ?? p.img;
const pad = (n) => String(n).padStart(2, '0');

const INTRO = 'Client products built with the CodevIT team, and things I made on my own. Web, mobile, and everything between the database and the pixels.';

function ProjectMeta({ project, compact = false }) {
  return (
    <div className={`grid gap-4 ${compact ? '' : 'sm:grid-cols-[1fr_auto] sm:items-start sm:gap-8'}`}>
      <div>
        <h3
          id={`project-${project.id}-title`}
          className="font-display text-[clamp(1.75rem,3.2vw,2.75rem)] leading-none text-ink"
        >
          {project.title}
        </h3>
        <p className="mt-2 font-mono text-[0.8rem] text-mint">
          {project.category}
          <span className="text-muted">
            {' '}
            · {project.kind === 'client' ? 'with CodevIT' : 'personal project'}
          </span>
        </p>
        <p className="mt-3 max-w-[52ch] text-muted">{project.summary}</p>
      </div>
      {project.link && (
        <a
          href={project.link}
          target="_blank"
          rel="noreferrer"
          className={`btn btn-line self-start justify-self-start ${compact ? '' : 'max-sm:w-full'}`}
        >
          {project.linkLabel} <ArrowUpRight size={16} />
          <span className="sr-only"> ({project.title})</span>
        </a>
      )}
    </div>
  );
}

/* ── Desktop: pinned horizontal gallery ─────────────────────────────── */

function GalleryCard({ project, index, progress, center }) {
  // Inner parallax: the screenshot drifts against the track as it passes.
  const x = useTransform(progress, [center - 0.3, center + 0.3], ['4%', '-4%']);
  const reduced = prefersReducedMotion();
  return (
    <article
      id={`project-${project.id}`}
      aria-labelledby={`project-${project.id}-title`}
      className="flex shrink-0 flex-col"
      style={{ width: 'min(52vw, calc((100vh - 15rem) * 1.6))' }}
    >
      <div className="mb-4 flex items-center gap-3 font-mono text-xs text-muted">
        <span className="text-mint">{pad(index + 1)}</span>
        <span className="h-px flex-1 bg-line-strong" />
        <span>{project.kind === 'client' ? 'client' : 'personal'}</span>
      </div>
      <div className="plate">
        <div className="overflow-hidden">
          <motion.div style={reduced ? undefined : { x, scale: 1.09 }}>
            <RippleImage
              src={imageFor(project)}
              alt={`${project.title}: ${project.summary}`}
              fit={project.fit}
              position={[0.5, 0]}
              bg={project.bg ?? '#1b1e22'}
              loading="lazy"
              decoding="async"
              imgClassName={`aspect-[16/10] w-full ${
                project.fit === 'contain' ? 'object-contain' : 'object-cover object-top'
              }`}
            />
          </motion.div>
        </div>
      </div>
      <div className="mt-6">
        <ProjectMeta project={project} compact />
      </div>
    </article>
  );
}

function Gallery() {
  const section = useRef(null);
  const track = useRef(null);
  const [geo, setGeo] = useState({ dist: 0, centers: [] });
  const [current, setCurrent] = useState(1);

  useLayoutEffect(() => {
    const measure = () => {
      const t = track.current;
      const dist = Math.max(0, t.scrollWidth - window.innerWidth);
      const cards = [...t.querySelectorAll('article')];
      const centers = cards.map((c) =>
        dist ? Math.min(1, Math.max(0, (c.offsetLeft + c.offsetWidth / 2 - window.innerWidth / 2) / dist)) : 0
      );
      setGeo({ dist, centers });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track.current);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end end'] });
  // Lenis already smooths the scroll, so the track follows it directly.
  const x = useTransform(scrollYProgress, (v) => -v * geo.dist);
  const bar = useSpring(scrollYProgress, { stiffness: 200, damping: 40 });

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (!geo.centers.length) return;
    let best = 0;
    geo.centers.forEach((c, i) => {
      if (Math.abs(c - v) < Math.abs(geo.centers[best] - v)) best = i;
    });
    setCurrent(best + 1);
  });

  return (
    <section
      id="work"
      ref={section}
      aria-labelledby="work-title"
      className="relative"
      style={{ height: `calc(100vh + ${geo.dist}px)` }}
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden pt-16">
        <motion.div ref={track} style={{ x }} className="flex items-center gap-[5vw] pl-[max(2.5rem,calc((100vw-76rem)/2+2.5rem))] pr-[10vw] will-change-transform">
          <div className="flex w-[30vw] max-w-[28rem] shrink-0 flex-col self-stretch justify-center">
            <SectionTitle id="work-title" className="!text-[clamp(3rem,6vw,5.5rem)]">
              Selected work
            </SectionTitle>
            <p className="mt-6 max-w-[36ch] text-muted">{INTRO}</p>
            <p className="mt-10 flex items-center gap-3 font-mono text-xs text-mint">
              keep scrolling
              <span aria-hidden="true" className="h-px w-16 bg-mint" />
              <ArrowUpRight size={14} className="rotate-45" />
            </p>
          </div>

          {projects.map((p, i) => (
            <GalleryCard key={p.id} project={p} index={i} progress={scrollYProgress} center={geo.centers[i] ?? 0} />
          ))}

          <a
            href="https://github.com/raouf-allala"
            target="_blank"
            rel="noreferrer"
            className="group flex w-[26vw] shrink-0 flex-col items-start gap-6 self-stretch justify-center"
          >
            <span className="font-display text-[clamp(2.5rem,4.5vw,4rem)] text-ink transition-colors duration-300 group-hover:text-mint">
              More on GitHub
            </span>
            <span className="btn btn-line">
              github.com/raouf-allala <ArrowUpRight size={16} />
            </span>
          </a>
        </motion.div>

        {/* progress */}
        <div className="page mt-10 flex items-center gap-5 font-mono text-xs text-muted">
          <span className="whitespace-nowrap tabular-nums text-mint">
            {pad(current)} / {pad(projects.length)}
          </span>
          <div className="relative h-px flex-1 bg-line">
            <motion.div className="absolute inset-0 origin-left bg-mint" style={{ scaleX: bar }} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Mobile / tablet: vertical stack with unfolding plates ───────────── */

function StackPlate({ project }) {
  const ref = useRef(null);
  const reduced = prefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start 35%'] });
  const clip = useTransform(scrollYProgress, [0, 1], ['inset(14% 10% 14% 10%)', 'inset(0% 0% 0% 0%)']);
  const scale = useTransform(scrollYProgress, [0, 1], [1.18, 1]);
  return (
    <article ref={ref} id={`project-${project.id}`} aria-labelledby={`project-${project.id}-title`}>
      <div className="plate">
        <motion.div className="overflow-hidden" style={reduced ? undefined : { clipPath: clip }}>
          <motion.img
            src={imageFor(project)}
            alt={`${project.title}: ${project.summary}`}
            loading="lazy"
            decoding="async"
            className={`aspect-[16/10] w-full ${project.fit === 'contain' ? 'object-contain' : 'object-cover object-top'}`}
            style={{ backgroundColor: project.bg ?? 'var(--color-ground-deep)', ...(reduced ? null : { scale }) }}
          />
        </motion.div>
      </div>
      <div className="mt-6">
        <ProjectMeta project={project} />
      </div>
    </article>
  );
}

function Stack() {
  return (
    <section id="work" aria-labelledby="work-title" className="relative py-24 sm:py-32">
      <div className="page">
        <SectionTitle id="work-title">Selected work</SectionTitle>
        <p className="mt-5 max-w-[44ch] text-muted">{INTRO}</p>
        <div className="mt-14 flex flex-col gap-20 sm:gap-28">
          {projects.map((p) => (
            <StackPlate key={p.id} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Work() {
  const wide = useMediaQuery('(min-width: 1024px) and (min-height: 600px)');
  const reduced = prefersReducedMotion();
  return wide && !reduced ? <Gallery /> : <Stack />;
}
