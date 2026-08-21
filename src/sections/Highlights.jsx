import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from '../lib/pointer'

/* Placeholder figures — replace with the real project data before launch. */
const COUNTERS = [
  { value: 48, suffix: '', label: 'Residences in total' },
  { value: 2.4, suffix: ' acres', label: 'Of landscaped ground', decimals: 1 },
  { value: 14, suffix: '', label: 'Floors, no more' },
  { value: 82, suffix: '%', label: 'Open and green space' },
]

const FACTS = [
  ['CONFIGURATIONS', '2, 3 & 4 BHK'],
  ['CARPET AREA', '1,240 – 3,050 sq ft'],
  ['POSSESSION', 'December 2027'],
  ['RERA', 'To be confirmed'],
]

/**
 * The numbers a buyer scans for before they read a single line of prose.
 * Counters run once, on entry, driven by gsap so they share the page ticker.
 */
export default function Highlights() {
  const rootRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!prefersReducedMotion()) {
        gsap.utils.toArray('[data-count]').forEach((el) => {
          const target = parseFloat(el.dataset.count)
          const decimals = parseInt(el.dataset.decimals || '0', 10)
          const obj = { v: 0 }

          gsap.to(obj, {
            v: target,
            duration: 2.1,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
            onUpdate: () => {
              el.textContent = obj.v.toFixed(decimals)
            },
          })
        })

        gsap.fromTo(
          '[data-fact]',
          { y: 26, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.1,
            ease: 'power3.out',
            stagger: 0.08,
            scrollTrigger: { trigger: rootRef.current, start: 'top 78%' },
          }
        )
      }
    }, rootRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      data-nav-theme="light"
      ref={rootRef}
      className="relative bg-cream-deep px-8 sm:px-14 lg:px-20 py-20 sm:py-24"
    >
      <div className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-8">
          {COUNTERS.map((c) => (
            <div key={c.label} data-fact className="text-center lg:text-left">
              <div className="font-display font-light text-espresso text-[clamp(2.4rem,5.6vw,4.2rem)] leading-none">
                <span data-count={c.value} data-decimals={c.decimals || 0}>
                  {prefersReducedMotion() ? c.value : 0}
                </span>
                <span className="text-brown/60 text-[0.3em] align-baseline ml-1.5 tracking-wide3">
                  {c.suffix}
                </span>
              </div>
              <div className="mt-4 text-brown/60 text-[10px] tracking-wide3 uppercase">
                {c.label}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 pt-10 border-t border-beige/50 grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-8">
          {FACTS.map(([k, v]) => (
            <div key={k} data-fact>
              <div className="text-brown/45 text-[9px] tracking-wide2 mb-3">{k}</div>
              <div className="font-display text-espresso text-[17px] sm:text-[19px]">
                {v}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
