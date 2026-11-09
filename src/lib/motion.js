import { useEffect, useState } from 'react';
import Lenis from 'lenis';

/** Strong ease-out, used for every entrance. */
export const EASE_OUT = [0.23, 1, 0.32, 1];
/** Strong ease-in-out, used for on-screen movement. */
export const EASE_IN_OUT = [0.77, 0, 0.175, 1];

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** True when the intro should not play (seen this visit, or reduced motion). */
export function introAlreadySeen() {
  try {
    if (prefersReducedMotion()) return true;
    return sessionStorage.getItem('ra-intro-seen') === '1';
  } catch {
    return false;
  }
}

let lenis = null;

/** Inertia smooth scrolling. Skipped entirely under reduced motion. */
export function useSmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    lenis = new Lenis({
      autoRaf: true,
      lerp: 0.11,
      anchors: true, // offset comes from html { scroll-padding-top }
    });
    return () => {
      lenis?.destroy();
      lenis = null;
    };
  }, []);
}

export const lockScroll = (locked) => {
  if (lenis) (locked ? lenis.stop() : lenis.start());
  document.documentElement.style.overflow = locked ? 'hidden' : '';
};

/** Scrolls to an element id, through Lenis when it is running. */
export const scrollToId = (id) => {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenis) lenis.scrollTo(el); // honours scroll-padding-top
  else el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
};

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches
  );
  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setMatches(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [query]);
  return matches;
}
