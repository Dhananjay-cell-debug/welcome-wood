import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from '../lib/pointer'

function Caption({ n, name, meta, className = '' }) {
  return (
    <div data-cap className={className}>
      <div className="text-brown/50 text-[9px] tracking-wide2 mb-3">{n}</div>
      <h3 className="font-display font-light text-espresso text-[clamp(1.4rem,2.6vw,2.1rem)] leading-tight">
        {name}
      </h3>
      <p className="mt-3 text-muted text-[12.5px] font-light tracking-wide3">
        {meta}
      </p>
    </div>
  )
}

function Plate({ src, alt, pos = 'center', className = '' }) {
  return (
    <div data-plate className={`relative overflow-hidden bg-beige/30 ${className}`}>
      <img
        src={src}
        alt={alt}
        draggable="false"
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full h-[112%] -top-[6%] object-cover"
        style={{ objectPosition: pos }}
      />
      <div
        data-plate-veil
        className="absolute inset-0 bg-cream origin-bottom"
        
      />
    </div>
  )
}

/**
 * An editorial run rather than a grid of equal tiles.
 *
 * Three different measures — a wide plate, a staggered pair, an offset plate
 * with the text alongside — so the eye moves at a changing pace. Captions sit
 * beneath the photographs, never on top of them.
 */
export default function Amenities() {
  const rootRef = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      gsap.utils.toArray('[data-plate]').forEach((plate) => {
        gsap.fromTo(
          plate.querySelector('[data-plate-veil]'),
          { scaleY: 1 },
          {
            scaleY: 0,
            duration: 1.45,
            ease: 'power3.inOut',
            scrollTrigger: { trigger: plate, start: 'top 82%' },
          }
        )

        gsap.fromTo(
          plate.querySelector('img'),
          { yPercent: -5 },
          {
            yPercent: 5,
            ease: 'none',
            scrollTrigger: {
              trigger: plate,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.7,
            },
          }
        )
      })

      gsap.utils.toArray('[data-cap]').forEach((cap) => {
        gsap.fromTo(
          cap.children,
          { y: 22, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.05,
            ease: 'power3.out',
            stagger: 0.07,
            scrollTrigger: { trigger: cap, start: 'top 90%' },
          }
        )
      })
    }, rootRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="amenities"
      ref={rootRef}
      data-nav-theme="light"
      className="relative bg-cream pt-24 sm:pt-32 pb-24 sm:pb-32"
    >
      <div className="px-8 sm:px-14 lg:px-20">
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-12 gap-8 mb-12 sm:mb-16">
          <div className="lg:col-span-2">
            <span className="text-brown/55 text-[9.5px] tracking-rail pl-[0.42em]">
              06
            </span>
          </div>
          <h2 className="lg:col-span-6 font-display font-light text-espresso text-[clamp(2rem,4.6vw,3.6rem)] leading-[1.1]">
            Rooms you would not{' '}
            <span className="italic text-brown">build for yourself.</span>
          </h2>
          <p className="lg:col-span-4 self-end text-muted text-[13.5px] font-light leading-[1.95] max-w-[36ch]">
            Four shared rooms, each sized for the number of households that
            will actually use it — not for a brochure photograph.
          </p>
        </div>
      </div>

      {/* ---- Measure one: a wide plate, edge to edge -------------------- */}
      <Plate
        src="/ref/ref-spa.jpg"
        alt="The wellness floor"
        pos="center 55%"
        className="h-[62vh] lg:h-[78vh] w-full"
      />
      <div className="px-8 sm:px-14 lg:px-20">
        <div className="max-w-[1400px] mx-auto">
          <Caption
            n="01"
            name="The Wellness Floor"
            meta="Pool · Sauna · Two treatment rooms"
            className="mt-8 max-w-[34ch]"
          />
        </div>
      </div>

      {/* ---- Measure two: a tight pair ---------------------------------
         The earlier version dropped the right-hand plate by 16vh, which on a
         wide screen opened a dead beige field taller than the images. The
         offset is now a fraction of that, and the two plates share a baseline
         band so the pair reads as one object. */}
      <div className="px-8 sm:px-14 lg:px-20 mt-20 sm:mt-24">
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-12 gap-8 lg:gap-10">
          <div className="lg:col-span-6">
            <Plate
              src="/ref/ref-wide.jpg"
              alt="The reading room"
              pos="center 50%"
              className="aspect-[5/4] lg:aspect-[4/3] w-full"
            />
            <Caption
              n="02"
              name="The Reading Room"
              meta="Library · Fireplace · Quiet by agreement"
              className="mt-6"
            />
          </div>

          <div className="lg:col-span-5 lg:col-start-8 lg:mt-[7vh]">
            <Plate
              src="/ref/ref-dining.jpg"
              alt="The long table"
              pos="center 52%"
              className="aspect-[5/4] lg:aspect-[4/5] w-full"
            />
            <Caption
              n="03"
              name="The Long Table"
              meta="Private dining for sixteen"
              className="mt-6"
            />
          </div>
        </div>
      </div>

      {/* ---- Measure three: offset plate, text alongside ---------------- */}
      <div className="px-8 sm:px-14 lg:px-20 mt-20 sm:mt-24">
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-4 order-2 lg:order-1 relative">
            <div className="relative">
              <Caption n="04" name="The Roof Garden" meta="Open to residents, always" />
              <p className="mt-8 text-muted text-[13.5px] font-light leading-[1.95] max-w-[32ch]">
                Planted for the season rather than the photograph, so it
                changes four times a year and is never quite the same garden
                twice.
              </p>
            </div>
          </div>
          <Plate
            src="/ref/ref-terrace.jpg"
            alt="The roof garden"
            pos="center 45%"
            className="lg:col-span-7 lg:col-start-6 order-1 lg:order-2 h-[52vh] lg:h-[72vh] w-full"
          />
        </div>
      </div>
    </section>
  )
}
