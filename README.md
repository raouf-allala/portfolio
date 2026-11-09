# Raouf Allala — Portfolio

Personal portfolio of Raouf Allala, software & AI engineer: a single-page
React app with my projects (personal work and products built at CodevIT,
plus Webexpo ElDjazair), my toolkit, and a downloadable CV.

## Stack

- [React 19](https://react.dev/)
- [Vite](https://vite.dev/) (dev server + build)
- [Tailwind CSS 4](https://tailwindcss.com/) plus custom CSS in `src/index.css`
- [Motion (framer-motion)](https://motion.dev/) for animations
- [Lenis](https://lenis.darkroom.engineering/) for smooth scrolling
- Self-hosted Archivo, Silkscreen and JetBrains Mono (Fontsource), icons from simple-icons

## Getting started

Requires Node.js 20.19+ (Node 22 recommended).

```bash
npm install
npm run dev       # start dev server at http://localhost:5173
npm run build     # production build into ./build
npm run preview   # serve the production build locally
npm run lint      # ESLint
```

## Project structure

```
index.html              # HTML entry (title, meta tags, fonts)
src/
  main.jsx              # React entry point
  App.jsx               # loader → nav + sections, easter egg, toasts
  components/           # Loader, Nav, Hero, About, Work, Webexpo, Skills, Contact, Footer, Fx (shared effects)
  lib/                  # motion helpers, pixel sprites, contact links
  data/projects.json    # projects shown in "Selected work"
  assets/               # images, icons, CV
public/                 # static files served as-is (project thumbnails, favicon)
```

To add or edit a project, update `src/data/projects.json` and put its
screenshot in `public/assets/<project>/` (WebP, ~1600px wide). `kind` is
`client` or `personal`; use `"fit": "contain"` plus a `bg` colour for images
that should not be cropped. Design decisions are documented in `DESIGN.md`.

## Deployment

Deployed on Netlify, which builds automatically on every push. Build settings
live in `netlify.toml` (`npm run build`, publish directory `build`, Node 22).
