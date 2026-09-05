# Welcome Woods Interior — design presentation

A portfolio and services website for Welcome Woods Interior. React + Vite + Tailwind, with GSAP/ScrollTrigger for the original cinematic opening and Lenis for smooth scrolling.

## Preview

```bash
npm install
npm run dev
npm run build
```

The seven main pages are Home, Studio, Expertise, Selected Spaces, Process, Recognition and Contact. Three sample project-detail pages demonstrate the case-study layout. Hash routes work with the existing static deployment.

## Content status

This is a client design presentation. All reference photography and project narratives are placeholders. They must be replaced with approved Welcome Woods materials before the final business launch. The eight client-shared previews are retained on disk but are not represented as verified completed-project evidence.

The supplied ring-and-disc logo has been recreated as a scalable vector and high-resolution transparent PNG. The cream and walnut palette and existing homepage aesthetic are preserved. The contact name, phone and email come from the supplied brand card.

No invented statistics, awards, testimonials, property inventory, office locations, possession dates or registration information appear in the new page flow. Search indexing is disabled for this concept.

## Enquiries

The form validates a project brief and presents an editable draft. The visitor can then open their email app to send it. The website itself does not send or store enquiries. Automated email, CRM or WhatsApp integration awaits the final client workflow.

## Handoff

- [Client walkthrough](CLIENT-WALKTHROUGH.md): a simple 5–7 minute presentation script and plan for adding real project materials.
- [Design handoff](DESIGN-HANDOFF.md): page map, content editing, logo assets and validation.
- Main content: `src/data/site.js`.
- Page layouts: `src/pages/`.
- Responsive design: `src/editorial.css`.
- Brand downloads: `public/brand/`.

The legacy single-page sections remain as source references and are no longer imported. Existing Framer work is separate and has not been overwritten or deployed.

## Technical notes

Respect reduced motion. Avoid moving fixed layers with blend modes: previous versions experienced expensive page recompositing. Keep new images optimized and use the existing lazy-loading pattern. The Vercel deployment uses the existing project and static Vite output.
