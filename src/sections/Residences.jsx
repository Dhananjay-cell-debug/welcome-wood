import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from '../lib/pointer'

const RESIDENCES = [
  {
    n: '01',
    name: 'The Court Residence',
    note: 'Held on three sides, and quiet because of it.',
    img: '/ref/ref-staircase.jpg',
    pos: 'center 55%',
    spec: [
      ['Configuration', '2 BHK'],
      ['Carpet area', '1,240 sq ft'],
      ['Levels', '02 — 05'],
      ['Aspect', 'North, inward'],
    ],
  },
  {
    n: '02',
    name: 'The Garden Residence',
    note: 'The only plan that opens straight onto the lawn.',
    img: '/ref/ref-dining.jpg',
    pos: 'center 50%',
    spec: [
      ['Configuration', '3 BHK'],
      ['Carpet area', '1,780 sq ft'],
      ['Levels', 'Ground'],
      ['Aspect', 'East, garden'],
    ],
  },
  {
    n: '03',
    name: 'The Corner Residence',
    note: 'Light on two sides, from morning through to evening.',
    img: '/ref/ref-bedroom.jpg',
    pos: 'center 40%',
    spec: [
      ['Configuration', '3 BHK'],
      ['Carpet area', '2,140 sq ft'],
      ['Levels', '06 — 10'],
      ['Aspect', 'East and south'],
    ],
  },
  {
    n: '04',
    name: 'The Canopy Residence',
    note: 'The last floor. Nothing above it but the sky.',
    img: '/ref/ref-terrace.jpg',
    pos: 'center 45%',
    spec: [
      ['Configuration', '4 BHK'],
      ['Carpet area', '3,050 sq ft'],
      ['Levels', 'Penthouse'],
      ['Aspect', 'Open, three sides'],
    ],
  },
]

/**
 * Four spreads, alternating.
 *
 * Each residence gets a full-height plate that bleeds to the viewport edge —
 * no crop into a card, no caption sitting on the photograph. The text lives in
 * the facing column with a great deal of air around it, so the image and the
 * information each get their own space instead of competing inside one frame.
 */
export default function Residences() {
  const rootRef = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      // Slow counter-drift inside each plate — a full-height photograph that
      // is perfectly still reads as wallpaper.
      gsap.utils.toArray('[data-spread-img]').forEach((img) => {
        gsap.fromTo(
          img,
          { yPercent: -5 },
          {
            yPercent: 5,
            ease: 'none',
            scrollTrigger: {
              trigger: img.closest('[data-spread]'),
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.7,
            },
          }
        )
      })

      gsap.utils.toArray('[data-spread-copy]').forEach((copy) => {
        gsap.fromTo(
          copy.children,
          { y: 34, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.15,
            ease: 'power3.out',
            stagger: 0.08,
            scrollTrigger: { trigger: copy, start: 'top 78%' },
          }
        )
      })

      // A beige curtain drawn off the plate as it arrives.
      gsap.utils.toArray('[data-spread-veil]').forEach((veil) => {
        gsap.fromTo(
          veil,
          { scaleY: 1 },
          {
            scaleY: 0,
            duration: 1.5,
            ease: 'power3.inOut',
            scrollTrigger: {
              trigger: veil.closest('[data-spread]'),
              start: 'top 72%',
            },
          }
        )
      })
    }, rootRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="residences" ref={rootRef} data-nav-theme="light" className="bg-cream">
      {/* ---- Chapter opening ------------------------------------------- */}
      <div className="px-8 sm:px-14 lg:px-20 pt-24 sm:pt-32 pb-12 sm:pb-16">
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-2">
            <span className="text-brown/55 text-[9.5px] tracking-rail pl-[0.42em]">
              04
            </span>
          </div>
          <h2 className="lg:col-span-6 font-display font-light text-espresso text-[clamp(2rem,4.6vw,3.6rem)] leading-[1.1]">
            Four plans.{' '}
            <span className="italic text-brown">No two of them alike.</span>
          </h2>
          <p className="lg:col-span-4 self-end text-muted text-[13.5px] font-light leading-[1.95] max-w-[36ch]">
            Every plan was drawn around a different piece of the site — a
            corner, a garden, a rooftop. None of them is a mirror of another.
          </p>
        </div>
      </div>

      {/* ---- The spreads ------------------------------------------------ */}
      {RESIDENCES.map((r, i) => {
        const flipped = i % 2 === 1
        return (
          <article
            key={r.n}
            data-spread
            className="relative grid lg:grid-cols-12 min-h-[78vh] lg:min-h-[88vh] border-t border-brown/12"
          >
            {/* Plate — bleeds to the viewport edge, never cropped into a card */}
            <div
              className={`relative overflow-hidden h-[58vh] lg:h-auto lg:col-span-7 ${
                flipped ? 'lg:col-start-6' : 'lg:col-start-1'
              }`}
            >
              <img
                data-spread-img
                src={r.img}
                alt={r.name}
                draggable="false"
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-[112%] -top-[6%] object-cover"
                style={{ objectPosition: r.pos }}
              />
              <div
                data-spread-veil
                className="absolute inset-0 bg-cream origin-bottom"
                
              />
            </div>

            {/* Facing column — all the information, none of it on the image */}
            <div
              className={`lg:col-span-5 flex items-center ${
                flipped
                  ? 'lg:col-start-1 lg:row-start-1 lg:pl-20 lg:pr-14'
                  : 'lg:col-start-8 lg:pl-14 lg:pr-20'
              } px-8 sm:px-14 py-16 lg:py-24`}
            >
              <div data-spread-copy className="w-full max-w-[30rem]">
                <div className="font-display font-light text-brown/45 text-[clamp(2.6rem,5vw,4rem)] leading-none">
                  {r.n}
                </div>

                <h3 className="mt-6 font-display font-light text-espresso text-[clamp(1.8rem,3.4vw,2.9rem)] leading-[1.12]">
                  {r.name}
                </h3>

                <div className="mt-8 h-px w-full bg-brown/20" />

                <dl className="mt-8 grid grid-cols-2 gap-y-7 gap-x-6">
                  {r.spec.map(([k, v]) => (
                    <div key={k}>
                      <dt className="text-brown/50 text-[9px] tracking-wide2 uppercase mb-2.5">
                        {k}
                      </dt>
                      <dd className="font-display text-espresso text-[17px] sm:text-[19px]">
                        {v}
                      </dd>
                    </div>
                  ))}
                </dl>

                <p className="mt-10 font-display italic text-brown text-[17px] sm:text-[19px] leading-snug max-w-[26ch]">
                  {r.note}
                </p>
              </div>
            </div>
          </article>
        )
      })}
    </section>
  )
}
