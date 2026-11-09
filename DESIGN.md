# Design system: Blueprint

The portfolio reads like a technical drawing: dark slate paper, mint ink and
construction lines. The lines come from the original site's abstract shapes
and are redrawn as strokes that animate in.

## Colour (Committed strategy)

| Token | Value | Use |
|---|---|---|
| `ground` | `#23272c` | page background (the original brand slate) |
| `ground-deep` | `#1b1e22` | intro, menu, footer, image mats |
| `ink` | `#ecf6f2` | primary text |
| `muted` | `#a6b8b1` | secondary text (mint-tinted, never grey) |
| `mint` | `#b6ffe9` | signal colour: name, actions, markers, contact band |
| `mint-soft` | `#dbfbf1` | text on green fields |
| `green` / `field` | `#1e755a` / `#0f3a2d` | the Webexpo band, hover fills |
| `on-mint` | `#0d2a21` | text on mint |
| `line` / `line-strong` | mint at 14% / 32% | hairlines, grids, plate frames |

## Type

- **Archivo** (variable, width axis): display at `wdth 118`, weight 760,
  tracking -0.035em; body at `wdth 100`.
- **JetBrains Mono**: only for annotations (categories, roles, dimension
  labels) and the typewriter line.

## Components

- **Plate:** a 1px frame with mint corner ticks around every screenshot.
- **Section title:** heading with the 5px mint marker bar from the original.
- **Buttons:** pill; `btn-mint` (primary), `btn-line` (secondary),
  `btn-dark` (on mint). They press to 0.97 scale.
- **Grids:** hairline cells (Toolkit), and `grid-ground` for intro, menu and
  Webexpo.

## Motion

- Easing: `cubic-bezier(0.23, 1, 0.32, 1)` for entrances and
  `cubic-bezier(0.77, 0, 0.175, 1)` for movement.
- Intro (~1.5s, once per visit, skippable) → hero entrance (lines draw, name
  rises, screenshot unfolds).
- Scroll moments: project screenshots unfold from their frame; the About
  statement lights up word by word; rules draw across.
- Lenis smooth scrolling. Under `prefers-reduced-motion`: no intro, no Lenis,
  no scroll-linked effects, and all content is visible.
