import { useCallback, useState } from 'react';
import Intro from './components/Intro';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Work from './components/Work';
import Webexpo from './components/Webexpo';
import About from './components/About';
import Skills from './components/Skills';
import Contact from './components/Contact';
import { introAlreadySeen, useSmoothScroll } from './lib/motion';

export default function App() {
  const [ready, setReady] = useState(introAlreadySeen);
  const done = useCallback(() => setReady(true), []);
  useSmoothScroll();

  return (
    <>
      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-mint focus:px-4 focus:py-2 focus:text-on-mint"
      >
        Skip to content
      </a>
      <Intro show={!ready} onDone={done} />
      <Nav />
      <main>
        <Hero ready={ready} />
        <Work />
        <Webexpo />
        <About />
        <Skills />
        <Contact />
      </main>
    </>
  );
}
