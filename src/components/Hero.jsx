import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Maqam from '../assets/Capture.webp';
import { EASE_OUT, prefersReducedMotion, scrollToId } from '../lib/motion';
import { Construction } from './Blueprint';
import { ArrowDown, Mail } from './Icons';
import { EMAIL, SOCIALS } from '../lib/socials';

const QUALITIES = ['Passionate', 'Hardworker', 'Fast learner'];

function useTypewriter(words, active) {
  const [text, setText] = useState(words[0]);
  useEffect(() => {
    if (!active || prefersReducedMotion()) return;
    let word = 0;
    let len = words[0].length;
    let deleting = true;
    let timer;
    const tick = () => {
      if (deleting) {
        len -= 1;
        if (len === 0) {
          deleting = false;
          word = (word + 1) % words.length;
        }
      } else {
        len += 1;
      }
      setText(words[word].slice(0, len));
      const done = !deleting && len === words[word].length;
      if (done) deleting = true;
      timer = setTimeout(tick, done ? 1600 : deleting ? 35 : 65);
    };
    timer = setTimeout(tick, 1800);
    return () => clearTimeout(timer);
  }, [words, active]);
  return text;
}

const rise = (delay) => ({
  initial: { y: '105%' },
  animate: { y: '0%' },
  transition: { duration: 0.9, delay, ease: EASE_OUT },
});

const fade = (delay, y = 14) => ({
  initial: { opacity: 0, y },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: EASE_OUT },
});

export default function Hero({ ready }) {
  const typed = useTypewriter(QUALITIES, ready);
  // Hold every entrance until the intro has lifted.
  const on = (props) => (ready ? props : { initial: props.initial });

  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative flex min-h-[100svh] flex-col overflow-hidden pt-24 sm:pt-28"
    >
      {/* Construction drawing behind the hero */}
      <Construction
        shape="tall"
        draw={ready}
        delay={0.1}
        className="pointer-events-none absolute -right-16 top-0 h-full w-auto text-line opacity-80 max-lg:hidden"
      />
      <Construction
        shape="corner"
        draw={ready}
        delay={0.5}
        className="pointer-events-none absolute bottom-0 left-0 h-56 w-auto text-line-strong opacity-70 sm:h-72"
      />

      <div className="page relative grid flex-1 items-center gap-12 pb-16 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-6">
          <h1 id="hero-title" className="font-display text-[clamp(3.4rem,11vw,6rem)] text-ink">
            <span className="block overflow-hidden pb-[0.06em]">
              <motion.span className="block" {...on(rise(0.05))}>
                Raouf
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.06em]">
              <motion.span className="block text-mint" {...on(rise(0.15))}>
                Allala
              </motion.span>
            </span>
          </h1>

          <motion.p
            className="mt-7 max-w-[34ch] text-[clamp(1.2rem,2.4vw,1.6rem)] leading-snug text-ink font-wide"
            {...on(fade(0.35))}
          >
            A full-stack developer with UI/UX expertise, building web and mobile products at{' '}
            <a
              href="https://codevit.net/"
              target="_blank"
              rel="noreferrer"
              className="text-mint link-draw"
            >
              CodevIT
            </a>
            .
          </motion.p>

          <motion.p
            className="mt-6 flex h-7 items-center gap-3 font-mono text-[0.95rem] tracking-[0.12em] text-mint-soft"
            {...on(fade(0.45))}
            aria-label={QUALITIES.join(', ')}
          >
            <span aria-hidden="true" className="h-full w-[4px] bg-mint" />
            <span aria-hidden="true">
              {typed}
              <span className="caret ml-0.5 text-mint">_</span>
            </span>
          </motion.p>

          <motion.div className="mt-10 flex flex-wrap items-center gap-3" {...on(fade(0.55))}>
            <a href={`mailto:${EMAIL}`} className="btn btn-mint max-sm:flex-1">
              <Mail size={18} /> Email me
            </a>
            <a
              href="#work"
              onClick={(e) => {
                e.preventDefault();
                scrollToId('work');
              }}
              className="btn btn-line max-sm:flex-1"
            >
              See my work <ArrowDown size={16} />
            </a>
            <div className="ml-1 flex gap-2 max-sm:mt-2 max-sm:w-full max-sm:justify-start">
              {SOCIALS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="flex h-12 w-12 items-center justify-center rounded-full text-muted transition-colors duration-200 hover:text-mint"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Featured work plate */}
        <motion.figure
          className="relative lg:col-span-6 lg:pl-6"
          initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
          animate={ready ? { opacity: 1, clipPath: 'inset(0 0 0% 0)' } : undefined}
          transition={{ duration: 1.1, delay: 0.4, ease: [0.77, 0, 0.175, 1] }}
        >
          <div className="plate relative bg-ground-deep">
            <img
              src={Maqam}
              alt="Maqam association management dashboard, designed and built by Raouf"
              width="1600"
              height="789"
              className="aspect-[16/10] w-full object-cover object-left-top"
              fetchPriority="high"
            />
          </div>
          {/* dimension line */}
          <div aria-hidden="true" className="mt-3 flex items-center gap-3 font-mono text-[11px] text-muted">
            <span className="h-px flex-1 bg-line-strong" />
            <span>maqam / management system</span>
            <span className="h-px w-6 bg-line-strong" />
          </div>
        </motion.figure>
      </div>

      <motion.a
        href="#work"
        onClick={(e) => {
          e.preventDefault();
          scrollToId('work');
        }}
        aria-label="Scroll to work"
        className="page relative mb-6 hidden items-center gap-3 font-mono text-xs text-muted sm:flex"
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : undefined}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <span className="relative block h-10 w-px overflow-hidden bg-line">
          <span className="absolute inset-x-0 top-0 h-1/2 animate-[scrollcue_1.8s_var(--ease-in-out)_infinite] bg-mint" />
        </span>
        scroll
      </motion.a>
    </section>
  );
}
