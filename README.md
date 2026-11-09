# Raouf Allala — Portfolio

Personal portfolio site: a single-page React app showcasing my work as a
full-stack developer (personal projects, client projects with CodevIT, and
Webexpo ElDjazair), my tech skills, and a downloadable CV.

## Stack

- [React 19](https://react.dev/)
- [Vite](https://vite.dev/) (dev server + build)
- [Tailwind CSS 4](https://tailwindcss.com/) plus custom CSS in `src/index.css`
- [Motion (framer-motion)](https://motion.dev/) for animations
- [typewriter-effect](https://www.npmjs.com/package/typewriter-effect)

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
  App.jsx               # loading screen → header + home
  pages/                # Header, Home, AppLoading
  components/           # Bento grid tiles for the projects section
  data/projects.json    # CodevIT projects shown in the grid
  assets/               # images, icons, CV
public/                 # static files served as-is (project thumbnails, favicon)
```

To add or edit a client project, update `src/data/projects.json` and put its
thumbnail in `public/assets/<project>/`. Set `"wide": true` for a tile that
spans two columns.

## Deployment

Deployed on Netlify, which builds automatically on every push. Build settings
live in `netlify.toml` (`npm run build`, publish directory `build`, Node 22).
