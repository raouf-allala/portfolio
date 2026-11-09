import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Logo from '../assets/RA.png';
import Cv from '../assets/Raouf-Allala-CV.pdf';
import { EASE_OUT, lockScroll, scrollToId } from '../lib/motion';
import { EMAIL, SOCIALS } from '../lib/socials';
import { Download } from './Icons';

const LINKS = [
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'skills', label: 'Toolkit' },
  { id: 'contact', label: 'Contact' },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  // Hide on scroll down, show on scroll up.
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > 160 && y > last + 4 ? true : y < last - 4 ? false : (h) => h);
      last = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    lockScroll(open);
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const go = (id) => (e) => {
    e.preventDefault();
    setOpen(false);
    lockScroll(false);
    scrollToId(id);
    history.replaceState(null, '', `#${id}`);
  };

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50 pt-4"
        animate={{ y: hidden && !open ? '-120%' : '0%' }}
        transition={{ duration: 0.5, ease: EASE_OUT }}
      >
        <nav className="page flex items-center justify-between" aria-label="Main">
          <a
            href="#top"
            onClick={go('top')}
            className="flex h-12 items-center rounded-full bg-ground/60 px-4 backdrop-blur-xl"
            aria-label="Raouf Allala, back to top"
          >
            <img src={Logo} alt="" className="h-5 w-auto" width="36" height="20" />
          </a>

          <ul className="hidden items-center gap-1 rounded-full bg-ground/60 p-1.5 ring-1 ring-white/10 backdrop-blur-xl md:flex">
            {LINKS.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  onClick={go(l.id)}
                  className="block rounded-full px-4 py-2 text-sm text-ink/75 transition-colors duration-200 hover:bg-white/10 hover:text-ink"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href={Cv}
              download
              className="hidden h-12 items-center gap-2 rounded-full bg-mint px-5 text-sm font-medium text-on-mint transition-colors hover:bg-white sm:inline-flex"
            >
              Résumé <Download size={15} />
            </a>
            <button
              type="button"
              className="relative flex h-12 w-12 items-center justify-center rounded-full bg-ground/60 ring-1 ring-white/10 backdrop-blur-xl md:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((o) => !o)}
            >
              <span className={`absolute h-[1.5px] w-5 bg-ink transition-transform duration-300 ${open ? 'rotate-45' : '-translate-y-[4px]'}`} />
              <span className={`absolute h-[1.5px] w-5 bg-ink transition-transform duration-300 ${open ? '-rotate-45' : 'translate-y-[4px]'}`} />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col bg-ground px-5 pb-8 pt-28 md:hidden"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
          >
            <ul className="flex flex-col">
              {LINKS.map((l, i) => (
                <motion.li
                  key={l.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.15 + i * 0.05, ease: EASE_OUT }}
                >
                  <a
                    href={`#${l.id}`}
                    onClick={go(l.id)}
                    className="block py-2 font-display text-[3.5rem] text-ink active:text-mint"
                  >
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="mt-auto flex flex-col gap-3">
              <a href={`mailto:${EMAIL}`} className="btn btn-mint w-full">
                Email me
              </a>
              <a href={Cv} download className="btn btn-ghost w-full">
                Download résumé <Download size={16} />
              </a>
              <div className="mt-2 flex justify-center gap-3">
                {SOCIALS.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-white/[0.06] text-ink"
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
