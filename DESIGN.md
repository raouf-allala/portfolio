# Design system

A premium, agency-style dark site in mint, with a nerdy pixel-art soul:
pixel touches add personality without turning the site into a game.

## Colour

| Token | Value | Use |
|---|---|---|
| `ground` | `#23272c` | page background |
| `ground-deep` | `#1b1e22` | loader, footer, cards' inner fill |
| `surface` | `#2b3036` | project cards |
| `ink` | `#ecf6f2` | primary text |
| `muted` | `#a6b8b1` | secondary text (mint-tinted) |
| `mint` | `#b6ffe9` | signal colour: name, actions, labels, contact band |
| `field` | `#0f3a2d` | Webexpo band |
| `on-mint` | `#0d2a21` | text on mint |
| `line` / `line-strong` | mint at 14% / 32% | hairlines, grid, card borders |

## Type

- **Archivo** (variable width axis): display at `wdth 118`, weight 760, tight
  tracking, set very large (hero name up to ~15rem); body at `wdth 100`.
- **Silkscreen** (pixel font): only for small HUD labels (player card,
  counters, categories, toasts).
- **JetBrains Mono**: project categories.

## Pixel soul

- `pixel-corners`: 8-bit stepped corners on cards, slots, the cursor, toasts.
- Bit, an original 16×16 robot mascot (`src/lib/sprites.js`), plus a trophy.
- Images resolve from big pixels to sharp as they enter (`PixelImage`).
- Player card in the hero; "Achievement unlocked" toast at the end of the page;
  Konami code (or tapping Bit 5 times) triggers a pixel rain.

## Motion

- Easing: `cubic-bezier(0.23, 1, 0.32, 1)` (entrances),
  `cubic-bezier(0.77, 0, 0.175, 1)` (movement). Lenis smooth scrolling.
- Loader: 0→100 counter with a segmented pixel bar, once per visit, skippable.
- Hero: name lines rise in; on scroll they split apart, stars drift at three
  parallax depths, Bit floats up faster.
- About: pinned for ~2.6 screens: the statement lights up word by word while
  Bit assembles from scattered pixels.
- Work: sticky cards stack like a deck; earlier cards shrink and dim.
- Webexpo: two screenshots in parallax at different speeds.
- Headings reveal word by word through a mask; buttons are magnetic; a pixel
  cursor turns into a label ("Visit ↗") over projects (mouse only).
- `prefers-reduced-motion`: no loader, no Lenis, no pinning or scroll-linked
  motion; all content static and visible.
