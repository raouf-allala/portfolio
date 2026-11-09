import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Logo from '../assets/RA.png';
import Cv from '../assets/Raouf-Allala-CV.pdf';
import { EASE_OUT, lockScroll, scrollToId } from '../lib/motion';
import { Download } from './Icons';
import { EMAIL, SOCIALS } from '../lib/socials';

const LINKS = [
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuButton = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
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
    lockScroll(false); // release the menu's lock before scrolling
    scrollToId(id);
    history.replaceState(null, '', `#${id}`);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
          scrolled || open
            ? 'border-b border-line bg-ground/85 backdrop-blur-md'
            : 'border-b border-transparent'
        }`}
      >
        <nav className="page flex h-16 items-center justify-between sm:h-[4.5rem]" aria-label="Main">
          <a href="#top" onClick={go('top')} className="flex items-center gap-3" aria-label="Raouf Allala, back to top">
            <img src={Logo} alt="" className="h-6 w-auto sm:h-7" width="50" height="28" />
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {LINKS.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  onClick={go(l.id)}
                  className="rounded-full px-4 py-2 text-[0.95rem] font-medium text-muted transition-colors duration-200 hover:text-mint"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a href={Cv} download className="btn btn-line hidden !min-h-10 !px-4 text-sm sm:inline-flex">
              Résumé <Download size={16} />
            </a>
            <button
              ref={menuButton}
              type="button"
              className="relative flex h-11 w-11 items-center justify-center rounded-full border border-line-strong md:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((o) => !o)}
            >
              <span
                className={`absolute h-[1.5px] w-5 bg-ink transition-transform duration-300 ease-(--ease-out) ${
                  open ? 'rotate-45' : '-translate-y-[4px]'
                }`}
              />
              <span
                className={`absolute h-[1.5px] w-5 bg-ink transition-transform duration-300 ease-(--ease-out) ${
                  open ? '-rotate-45' : 'translate-y-[4px]'
                }`}
              />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col bg-ground-deep grid-ground px-5 pb-8 pt-24 md:hidden"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
          >
            <ul className="flex flex-col">
              {LINKS.map((l, i) => (
                <motion.li
                  key={l.id}
                  className="border-b border-line"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.12 + i * 0.05, ease: EASE_OUT }}
                >
                  <a
                    href={`#${l.id}`}
                    onClick={go(l.id)}
                    className="flex items-baseline justify-between py-4 font-display text-5xl text-ink active:text-mint"
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
              <a href={Cv} download className="btn btn-line w-full">
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
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-line-strong text-mint"
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
