# Design system

A modern, agency-style dark site in mint: near-black ground, big tight
type, soft rounded surfaces, and motion that makes scrolling feel like one
continuous experience. Personality comes through pixels, not a mascot.

## Colour

| Token | Value | Use |
|---|---|---|
| `ground` | `#0a0c0b` | page background |
| `ink` / `muted` | `#f2f7f5` / `#8f9c97` | text |
| `mint` | `#b6ffe9` | signal colour, contact section |
| `field` | `#0d3a2c` | Webexpo section |
| `on-mint` | `#08231b` | text on mint |

The page background **morphs** between sections: each section declares
`data-bg` (and `data-fg`); `App.jsx` watches which one holds the middle of the
screen and the `html` background transitions to it. Project cards are tinted
with each product's own colour (`tint` in `projects.json`).

## Type

- **Geist** for everything: display weight 600, tracking -0.055em.
- **Geist Mono** for small uppercase labels and hints.

## Signature: pixel-particle name

`ParticleName.jsx` samples the name into thousands of square pixels on a
canvas. They sweep in after the loader, scatter from the cursor/finger and
spring back, dissolve upward as the hero scrolls away, and explode on the
Konami code. The loop sleeps when nothing moves.

## Motion

- Easing `cubic-bezier(0.23, 1, 0.32, 1)`; Lenis smooth scrolling.
- Loader: 0→100 counter + progress line, once per visit.
- About: pinned; the statement lights up word by word, with mint highlights
  sweeping under "software engineer" and "AI engineer".
- Work: sticky cards stack like a deck; screenshots drift inside colour panels.
- Webexpo: parallax screenshots; images reveal from blur.
- Headings reveal word by word; buttons are magnetic; a dot cursor grows into
  a label over projects (mouse only); nav hides on scroll down.
- `prefers-reduced-motion`: no loader, no Lenis, no pinning, static name.
