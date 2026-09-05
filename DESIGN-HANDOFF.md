# Welcome Woods — September 2026 design presentation

## Design direction

The existing cinematic homepage remains the visual anchor: warm cream `#EDE8D0`, walnut brown `#6F4A2E`, Cormorant Garamond display typography, Jost labels, subtle image transitions and generous space. The original hero images, headline, slideshow, live clock, opening reveal and optional ambient sound are retained. Its service positioning and calls to action now lead into a studio portfolio.

ZERO9 informed the information hierarchy: studio → work → project story → approach → enquiry. Its copy, code, projects, team and accolades are not reproduced. Godly / Recent and 21st.dev were reviewed as secondary interface references; no template or external component code was imported.

References: https://www.zero9.in/interiors-architecture · https://www.zero9.in/journey · https://www.zero9.in/connect · https://godly.website · https://21st.dev

## Ready layouts

| Route | What is ready |
| --- | --- |
| `#/` | Original opening, studio introduction, selected studies, full-width image moment, interactive service accordion, materials, process, studio teaser, enquiry invitation |
| `#/studio` | Editorial introduction, philosophy, three values, material story, reserved founder/team profile, recognition link |
| `#/services` | Five service chapters, image/text spreads, service index, scope lists, preselected enquiry links |
| `#/projects` | Curated editorial collection; three explicitly labelled design studies |
| `#/projects/a-quieter-kind-of-home` | Case-study template: hero, discipline, material direction, brief, approach, expandable gallery, next project |
| `#/projects/the-art-of-gathering` | Second sample case study |
| `#/projects/a-considered-workspace` | Third sample case study |
| `#/process` | Six-stage proposed process, preparation guide, expandable FAQs |
| `#/recognition` | Reserved press, awards and client-reflection layouts without invented endorsements |
| `#/contact` | Real card contact details, validated project enquiry, review/edit state, email-draft handoff, FAQs |

Main navigation intentionally stays at six choices. Recognition is available in the footer and Studio page. No filters are shown for a three-study collection.

## Editing content

- `src/data/site.js`: contact information, navigation, services, project studies, process and FAQs.
- `src/pages/`: editorial content and layouts for each page.
- `src/components/Editorial.jsx`: shared images, links, headings, project cards, entrance reveals and invitation.
- `src/editorial.css`: responsive layouts and the extended visual system.
- `src/sections/Hero.jsx`: preserved opening; links and supporting copy adapted for the studio.
- `src/lib/useRoute.js`: hash routes so direct preview links work on the existing static Vite hosting setup.

The older single-page sections and the user's Framer files remain in the workspace; they are not imported into the new page flow. Framer is unchanged. The user subsequently authorized publishing this labelled client presentation to the existing GitHub repository and Vercel project.

## Brand assets

The supplied circular ring and inset disc replace the old W mark in the navigation, menu, opening reveal and footer. The favicon uses the same geometry.

- `public/brand/welcome-woods-logo-outlined.svg`: scalable gold lockup, with text converted to paths; preferred portable master.
- `public/brand/welcome-woods-logo-3600.png`: transparent 3600 × 1620 PNG.
- `public/brand/welcome-woods-logo.svg`: editable text-based SVG.
- `public/brand/welcome-woods-mark.svg`: standalone gold symbol.
- `scripts/export-brand.ps1`: reproducible outlined SVG / PNG export with Windows drawing tools.

These are clean vector recreations from the supplied JPEG, not a claim that the original designer's source file or exact metallic texture has been recovered. Preserve the client's original JPEG. Replace the recreation with the designer's master if supplied later.

## Presentation status and pending content

All reference photography and design-study narratives are placeholders. The eight client-shared preview images have not been promoted into a verified completed-project claim. All project records still need client approval, original photographs, names or private labels, location, scope, area, status/year and image rights. Reference images must be replaced before public launch.

Founder/team slots and recognition cards await verified information. No fabricated names, figures, reviews, awards, property inventory, possession dates, office addresses or registration numbers are displayed in the new page flow. The five cities on the brand card are not asserted to be offices or confirmed service coverage.

Contact details used: Mahiuddin, `welcomewoods786@gmail.com`, `+91 99607 77033`. The enquiry form does not send or persist data: it validates a brief, displays a reviewable draft, and opens the user's email app only when they choose that action. Final mailbox/CRM/WhatsApp integration remains a launch-stage decision.

Search engines are instructed not to index this concept. Production SEO, legal/privacy wording, approved business claims and public hosting remain launch work.

## Validation

Production build succeeds. New and changed implementation files pass lint; existing warnings remain in the unused legacy sections, LocalClock exports and the user's Framer components.

Browser checks cover desktop and 390px mobile layouts, menu navigation, gallery opening/next/close/Escape, service deep links and enquiry preselection, required-field validation, email draft construction, draft editing and FAQs. No message was sent during testing.

Run `npm run dev -- --host 127.0.0.1` for the local presentation, or `npm run build` to rebuild the static output.
