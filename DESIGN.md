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
| paper | `#eef2ef` | education story (dark text, green accents) |
| `on-mint` | `#08231b` | text on mint |

The page background **morphs** between sections: each section declares
`data-bg` (and `data-fg`); `App.jsx` watches which one holds the middle of the
screen and the `html` background transitions to it. Project cards are tinted
with each product's own colour (`tint` in `projects.json`).

## Type

- **Geist** for everything: display weight 600, tracking -0.055em.
- **Geist Mono** for small uppercase labels and hints.

## Hero

A green light from above whose edges break up into nebula dust, fringed with
violet, magenta and deep blue (`Nebula.jsx`, a small WebGL shader rendered at
half resolution, paused off-screen, CSS glow fallback). The gamer tag sits under the name as a small player tag: "aka rwifoo".

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
- Education ("How I got here"): the page turns light; each part of the story
  comes into focus at the middle of the screen while a pixel drawing on the
  side morphs (`</>` → sparkle → heart) and First / Then / Now updates.
- Work ("level select"): the section pins like a game's stage-select screen.
  Scroll moves a mint pixel-bracket cursor across the project tiles; the
  preview swaps with a pixel flip, the title decodes, and the page takes on a
  hint of the project's colour. Tiles are clickable.
- Webexpo: parallax screenshots; images reveal from blur.
- Headings reveal word by word; buttons are magnetic; a dot cursor grows into
  a label over projects (mouse only); nav hides on scroll down.
- `prefers-reduced-motion`: no loader, no Lenis, no pinning, static name.

## Voice

The page reads as one story told in first person: who I am → how I got here →
what I built → Webexpo → my tools → "your turn". Short, plain sentences and
contractions; no numbered chapters, counters or labels standing in for words.
