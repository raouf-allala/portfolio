import { useCallback, useEffect, useRef, useState } from 'react';
import Loader from './components/Loader';
import Nav from './components/Nav';
import Hero from './components/Hero';
import About from './components/About';
import Work from './components/Work';
import Webexpo from './components/Webexpo';
import Skills from './components/Skills';
import Contact from './components/Contact';
import { Cursor } from './components/Fx';
import { PixelRain, Toast } from './components/Easter';
import { introAlreadySeen, useSmoothScroll } from './lib/motion';

const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

export default function App() {
  const [ready, setReady] = useState(introAlreadySeen);
  const [toast, setToast] = useState(null);
  const [rain, setRain] = useState(false);
  const toastTimer = useRef(null);
  const endShown = useRef(false);
  const pokes = useRef(0);
  const done = useCallback(() => setReady(true), []);
  const stopRain = useCallback(() => setRain(false), []);
  useSmoothScroll();

  const show = useCallback((t) => {
    clearTimeout(toastTimer.current);
    setToast(t);
    toastTimer.current = setTimeout(() => setToast(null), 3800);
  }, []);

  const cheat = useCallback(() => {
    setRain(true);
    show({ icon: 'robot', title: 'Cheat code accepted', body: '+30 lives. Bit is impressed.' });
  }, [show]);

  // ↑ ↑ ↓ ↓ ← → ← → B A
  useEffect(() => {
    let i = 0;
    const onKey = (e) => {
      const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      i = k === KONAMI[i] ? i + 1 : k === KONAMI[0] ? 1 : 0;
      if (i === KONAMI.length) {
        i = 0;
        cheat();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [cheat]);

  const poke = useCallback(() => {
    pokes.current += 1;
    if (pokes.current === 5) {
      pokes.current = 0;
      cheat();
    }
  }, [cheat]);

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
        <Hero ready={ready} onPoke={poke} />
        <About />
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
