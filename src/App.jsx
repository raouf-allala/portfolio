import { useCallback, useEffect, useRef, useState } from 'react';
import Loader from './components/Loader';
import Nav from './components/Nav';
import Hero from './components/Hero';
import About from './components/About';
import Journey from './components/Journey';
import Work from './components/Work';
import Webexpo from './components/Webexpo';
import Skills from './components/Skills';
import Contact from './components/Contact';
import { Cursor } from './components/Fx';
import { PixelRain, Toast } from './components/Easter';
import { introAlreadySeen, useSmoothScroll } from './lib/motion';

const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
const DEFAULT_BG = '#0a0c0b';
const DEFAULT_FG = '#f2f7f5';

/** The page colour follows whichever section holds the middle of the screen. */
function useSectionColors() {
  useEffect(() => {
    const root = document.documentElement;
    const sections = [...document.querySelectorAll('[data-bg]')];
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((e) => e.isIntersecting);
        if (!hit) return;
        root.style.setProperty('--page-bg', hit.target.dataset.bg || DEFAULT_BG);
        root.style.setProperty('--page-fg', hit.target.dataset.fg || DEFAULT_FG);
      },
      { rootMargin: '-50% 0px -50% 0px' }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);
}

export default function App() {
  const [ready, setReady] = useState(introAlreadySeen);
  const [toast, setToast] = useState(null);
  const [rain, setRain] = useState(false);
  const [burst, setBurst] = useState(0);
  const toastTimer = useRef(null);
  const endShown = useRef(false);
  const done = useCallback(() => setReady(true), []);
  const stopRain = useCallback(() => setRain(false), []);
  useSmoothScroll();
  useSectionColors();

  const show = useCallback((t) => {
    clearTimeout(toastTimer.current);
    setToast(t);
    toastTimer.current = setTimeout(() => setToast(null), 3800);
  }, []);

  // ↑ ↑ ↓ ↓ ← → ← → B A
  useEffect(() => {
    let i = 0;
    const onKey = (e) => {
      const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      i = k === KONAMI[i] ? i + 1 : k === KONAMI[0] ? 1 : 0;
      if (i === KONAMI.length) {
        i = 0;
        setRain(true);
        setBurst((b) => b + 1);
        show({ icon: 'spark', title: 'Cheat code accepted', body: '+30 lives. Nice moves.' });
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [show]);

  const reachEnd = useCallback(() => {
    if (endShown.current) return;
    endShown.current = true;
    show({ icon: 'trophy', title: 'Achievement unlocked', body: 'You scrolled all the way down. Respect.' });
  }, [show]);

  return (
    <>
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-mint focus:px-4 focus:py-2 focus:text-on-mint"
      >
        Skip to content
      </a>
      <Loader show={!ready} onDone={done} />
      <Nav />
      <main>
        <Hero ready={ready} burst={burst} />
        <About />
        <Journey />
        <Work />
        <Webexpo />
        <Skills />
      </main>
      <Contact onReachEnd={reachEnd} />
      <Cursor />
      <Toast toast={toast} />
      <PixelRain active={rain} onEnd={stopRain} />
      <div aria-hidden="true" className="grain" />
    </>
  );
}
