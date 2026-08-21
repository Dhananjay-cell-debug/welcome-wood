# Welcome Woods — concept presentation

A single-page site for a luxury residential developer. React + Vite + Tailwind,
with GSAP/ScrollTrigger for motion and Lenis for smooth scrolling.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
```

## ⚠️ Placeholder content

Nothing here is final. The client has not yet supplied branding, copy or
photography, so this build uses stand-ins throughout:

- **Branding** — the "W" monogram, Italiana / Cormorant Garamond / Jost, and
  the beige (`#EDE8D0`) + brown (`#6F4A2E`) palette are all provisional.
- **Imagery in `public/ref/`** — reference renders from other developers'
  websites, used to communicate design direction only. These do **not** depict
  Welcome Woods property and must be replaced before any real launch.
- **Imagery in `public/estate/`** — the client's own renders and site photos.
- **Every figure** — project names, localities, drive times, carpet areas,
  possession dates and completion percentages are invented placeholders.

See `../ASSET-USAGE-NOTES.md` for the full policy.

## Notes for whoever picks this up

- **Tailwind config changes need a dev-server restart.** Editing the theme in
  `tailwind.config.js` does not hot-reload here; the running server keeps
  serving the old palette, which is silently confusing.
- **Avoid `mix-blend-mode` on fixed elements that move.** A blend-mode layer
  forces the compositor to re-flatten everything beneath it every frame. On a
  page this long, with full-bleed photography, it locked the renderer solid.
- Motion respects `prefers-reduced-motion` throughout.
