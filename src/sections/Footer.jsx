import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import Monogram from '../components/Monogram'
import { prefersReducedMotion } from '../lib/pointer'
import { scrollToTarget } from '../lib/useSmoothScroll'

const LINKS = [
  ['The Vision', '#vision'],
  ['The Residences', '#residences'],
  ['Interiors', '#interiors'],
  ['Amenities', '#amenities'],
  ['Our Addresses', '#location'],
  ['Enquire', '#enquire'],
]

/**
 * A footer, kept short.
 *
 * One row of navigation and contact, the name along the base, one legal line.
 * The oversized closing call-to-action that used to sit above this is gone —
 * the enquiry section is directly overhead, so repeating it at heading scale
 * only made the page taller. Footers are horizontal furniture; this one stays
 * shallow on purpose.
 *
 * The name is SVG text with `textLength`, so it fits its container exactly at
 * any width. A clamped CSS font-size is always a guess about glyph widths and
 * it clipped to "WELCOME WO" on wide screens.
 */
export default function Footer() {
  const rootRef = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-foot]',
        { y: 22, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.07,
          scrollTrigger: { trigger: rootRef.current, start: 'top 88%' },
        }
      )
      gsap.fromTo(
        '[data-wordmark]',
        { yPercent: 34, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.4,
          ease: 'power3.out',
          scrollTrigger: { trigger: '[data-wordmark]', start: 'top 98%' },
        }
      )
    }, rootRef)
    return () => ctx.revert()
  }, [])

  const go = (e, href) => {
    e.preventDefault()
    scrollToTarget(href)
  }

  return (
    <footer
      ref={rootRef}
      data-nav-theme="dark"
      className="relative bg-brown overflow-hidden"
    >
      <div className="px-6 sm:px-14 lg:px-20 pt-12 sm:pt-14">
        <div className="max-w-[1400px] mx-auto">
          {/* One row: mark, links, contact */}
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-8 items-start pb-10 border-b border-cream/20">
            <div data-foot className="lg:col-span-3 flex items-center gap-4">
              <Monogram className="w-[30px] h-[30px] text-cream shrink-0" strokeWidth={6} />
              <span className="font-mark text-cream text-[12px] tracking-rail pl-[0.42em] leading-none">
                WELCOME WOODS
              </span>
            </div>

            <nav data-foot className="lg:col-span-6">
              <ul className="flex flex-wrap gap-x-7 gap-y-2.5">
                {LINKS.map(([label, href]) => (
                  <li key={label}>
                    <a
                      href={href}
                      onClick={(e) => go(e, href)}
                      className="text-cream/70 text-[12.5px] font-light transition-colors duration-400 hover:text-cream"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div data-foot className="lg:col-span-3 lg:text-right">
              <a
                href="mailto:hello@welcomewoods.com"
                className="block font-display text-cream text-[15.5px] hover:text-sand transition-colors duration-400"
              >
                hello@welcomewoods.com
              </a>
              <a
                href="tel:+910000000000"
                className="mt-1 block font-display text-cream/70 text-[15.5px] hover:text-sand transition-colors duration-400"
              >
                +91 00000 00000
              </a>
            </div>
          </div>

          {/* The name along the base */}
          <div className="overflow-hidden pt-6">
            <svg
              data-wordmark
              aria-hidden="true"
              viewBox="0 0 1000 96"
              className="w-full h-auto block select-none text-cream"
            >
              <text
                x="0"
                y="80"
                textLength="1000"
                lengthAdjust="spacing"
                fontSize="96"
                className="font-mark"
                fill="currentColor"
                fillOpacity="0.16"
              >
                WELCOME WOODS
              </text>
            </svg>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 py-5 border-t border-cream/15">
            <span className="text-cream/45 text-[10px] tracking-wide3">
              © {new Date().getFullYear()} WELCOME WOODS
            </span>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 sm:text-right">
              <span className="text-cream/45 text-[10px] tracking-wide3">
                CONCEPT PRESENTATION · PLACEHOLDER CONTENT
              </span>
              <span className="text-cream/35 text-[10px] tracking-wide3">
                MUSIC — "GYMNOPÉDIE NO. 1" BY KEVIN MACLEOD, CC BY 4.0
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
