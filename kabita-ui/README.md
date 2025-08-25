## Kabita Team Library UI

React + Tailwind app scaffolded with Vite. Implements an app shell and a grid view inspired by the shared Figma library.

### Run locally

```bash
cd kabita-ui
npm install
npm run dev
```

### Build

```bash
npm run build
npm run preview
```

### Notes

- Tailwind v4 via `@import "tailwindcss"` in `src/index.css`
- PostCSS configured with `@tailwindcss/postcss`
- Dark mode toggle persists to `localStorage`