import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import projects from '../data/projects.json';
import Maqam from '../assets/Capture.webp';
import Storify from '../assets/Capture2.webp';
import { EASE_OUT, prefersReducedMotion, scrollToId } from '../lib/motion';
import { Rule, SectionTitle } from './Blueprint';
import { ArrowUpRight } from './Icons';

const LOCAL_IMAGES = { maqam: Maqam, storify: Storify };
const imageFor = (p) => LOCAL_IMAGES[p.img] ?? p.img;

function ProjectPlate({ project, index, onActive }) {
  const ref = useRef(null);
  const reduced = prefersReducedMotion();
  // Scroll moment: the plate unfolds from its construction frame as it enters.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start 35%'] });
  const clip = useTransform(scrollYProgress, [0, 1], ['inset(14% 10% 14% 10%)', 'inset(0% 0% 0% 0%)']);
  const scale = useTransform(scrollYProgress, [0, 1], [1.18, 1]);

  useEffect(() => {
    const el = ref.current;
    const io = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && onActive(index),
      { rootMargin: '-45% 0px -45% 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [index, onActive]);

  const contain = project.fit === 'contain';

  return (
    <article
      ref={ref}
      id={`project-${project.id}`}
      aria-labelledby={`project-${project.id}-title`}
      className="scroll-mt-24"
    >
      <div className="plate">
        <motion.div
          className="overflow-hidden"
          style={reduced ? undefined : { clipPath: clip }}
        >
          <motion.img
            src={imageFor(project)}
            alt={`${project.title}: ${project.summary}`}
            loading="lazy"
            decoding="async"
            className={`aspect-[16/10] w-full ${contain ? 'object-contain' : 'object-cover object-top'}`}
            style={{
              backgroundColor: project.bg ?? 'var(--color-ground-deep)',
              ...(reduced ? null : { scale }),
            }}
          />
        </motion.div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-[1fr_auto] sm:items-start sm:gap-8">
        <div>
          <h3
            id={`project-${project.id}-title`}
            className="font-display text-[clamp(1.75rem,3.5vw,2.5rem)] leading-none text-ink"
          >
            {project.title}
          </h3>
          <p className="mt-2 font-mono text-[0.8rem] text-mint">
            {project.category}
            <span className="text-muted"> · {project.kind === 'client' ? 'with CodevIT' : 'personal project'}</span>
          </p>
          <p className="mt-4 max-w-[52ch] text-muted">{project.summary}</p>
        </div>
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className="btn btn-line self-start max-sm:w-full"
          >
            {project.linkLabel} <ArrowUpRight size={16} />
            <span className="sr-only"> ({project.title})</span>
          </a>
        )}
      </div>
    </article>
  );
}

export default function Work() {
  const [active, setActive] = useState(0);

  return (
    <section id="work" aria-labelledby="work-title" className="relative py-24 sm:py-32">
      <div className="page">
        <Rule className="mb-16 sm:mb-24" />
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          {/* Sticky index (desktop) */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <SectionTitle id="work-title">Selected work</SectionTitle>
              <p className="mt-5 max-w-[36ch] text-muted">
                Client products built with the CodevIT team, and things I made on my own. Web,
                mobile, and everything between the database and the pixels.
              </p>
              <ol className="mt-10 hidden border-t border-line lg:block">
                {projects.map((p, i) => (
                  <li key={p.id} className="border-b border-line">
                    <a
                      href={`#project-${p.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToId(`project-${p.id}`);
                      }}
                      aria-current={active === i ? 'true' : undefined}
                      className="group relative flex items-baseline justify-between gap-4 py-3 pl-5"
                    >
                      <motion.span
                        aria-hidden="true"
                        className="absolute left-0 top-1/2 h-px w-3 origin-left bg-mint"
                        animate={{ scaleX: active === i ? 1 : 0 }}
                        transition={{ duration: 0.4, ease: EASE_OUT }}
                      />
                      <span
                        className={`font-medium transition-colors duration-300 ${
                          active === i ? 'text-mint' : 'text-muted group-hover:text-ink'
                        }`}
                      >
                        {p.title}
                      </span>
                      <span className="font-mono text-[11px] text-muted/80">
                        {p.kind === 'client' ? 'client' : 'personal'}
                      </span>
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Plates */}
          <div className="flex flex-col gap-24 sm:gap-32 lg:col-span-8">
            {projects.map((p, i) => (
              <ProjectPlate key={p.id} project={p} index={i} onActive={setActive} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
