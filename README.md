# Personal Website

A single-page portfolio built with React and Vite: about, skills (with [Devicon](https://devicon.dev/) logos), career timeline, featured projects (SQL-style query UI), and a DSA playground.

## Quick start

```bash
npm install
npm run dev
```

Dev server: `http://localhost:5173` (or the next free port).

```bash
npm run build    # output: dist/
npm run preview  # local preview of production build
```

## Project structure

```
PersonalWebsite/
  src/
    components/
      Portfolio.jsx    # main page: about, skills, career, projects, DSA
      SkillLogos.jsx   # skill grid (Devicon CDN + Hugging Face logo)
      Header.jsx
      Footer.jsx
    App.jsx
    main.jsx
    styles.css
  index.html
  vite.config.js
  package.json
  README.md
```

`App.jsx` mounts `Header`, `Portfolio`, and `Footer` only.

## Customization

| What | Where |
|------|--------|
| Name, intro, quick facts, social links | `Portfolio.jsx`: `ABOUT_FACTS`, `SOCIAL`, about section copy |
| Career / education timeline | `Portfolio.jsx`: `CAREER_ENTRIES` |
| Featured projects (after Run query) | `Portfolio.jsx`: `FEATURED_PROJECTS` |
| Skills list and icon URLs | `SkillLogos.jsx`: `SKILLS` (Devicon CDN) |
| Site chrome | `Header.jsx`, `Footer.jsx` |
| Theme (light/dark) | `App.jsx` and `styles.css` (`[data-theme]`, `:root`) |
| Colors and typography | `src/styles.css` (e.g. `--color-accent`, `--font-sans`) |

## Tech stack

- **React 18** - UI
- **Vite 7** - dev server and production build
- **CSS** - custom properties, layout, component styles

## Deployment

**Vercel / Netlify:** connect the repo, build command `npm run build`, publish directory `dist`.

**GitHub Pages (optional):** e.g. add `gh-pages` and a `deploy` script that runs `npm run build` then publishes `dist`.

---

Built with React and Vite.