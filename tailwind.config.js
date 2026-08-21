/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        /* ---- The two colours the brand is built from -------------------
           beige  #EDE8D0 — the page itself
           brown  #895129 — the mark, the rules, the accents
           Everything else is those two pushed lighter or deeper. Nothing
           here is neutral grey; every tone carries the same warm cast. */

        cream: '#EDE8D0', // page ground
        'cream-deep': '#E3DCC2', // alternating bands
        'cream-light': '#F5F2E6', // raised surfaces, panels

        beige: '#D2C8A2',
        'beige-deep': '#BFB183',
        sand: '#C9A97B', // italic flourishes on dark

        /* BRAND BROWN — grounds, shapes and accents only.
           A touch deeper and less orange than the original #895129, which
           read slightly raw against the beige. This is never used for body
           copy: running paragraphs in a saturated brown looks washed out and
           is hard to read. */
        /* Desaturated toward true brown. #7C4A23 still read orange against
           the beige; pulling saturation down (0.72 → 0.59) keeps the warmth
           but lands it as coffee rather than terracotta. */
        brown: '#6F4A2E',
        'brown-light': '#8C6444',
        'brown-deep': '#553620',

        /* TEXT — deep, warm and readable. Distinct from the brand brown on
           purpose: colour carries the brand, ink carries the words. */
        espresso: '#2B1E13', // headings and emphasis
        muted: '#6A5540', // running body copy

        ink: '#2B1E13',
        gilt: '#9A6134', // single restrained accent
      },
      fontFamily: {
        mark: ['Italiana', 'serif'],
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Jost', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        rail: '0.42em',
        wide2: '0.28em',
        wide3: '0.18em',
      },
    },
  },
  plugins: [],
}
