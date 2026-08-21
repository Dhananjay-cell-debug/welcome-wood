import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from '../lib/pointer'

/**
 * One photograph, given the whole screen.
 *
 * It starts as a small plate held in the centre of a beige field and opens to
 * full bleed as you scroll — the image is the event, so nothing is laid over
 * it and nothing competes with it. The caption waits until the frame has
 * finished opening before it appears.
 *
 * The open is a clip-path inset, not a width/height change, so it composites
 * instead of forcing layout on every scroll tick.
 */
export default function Reveal() {
  const rootRef = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.8,
        },
      })

      tl.fromTo(
        '[data-reveal-frame]',
        { clipPath: 'inset(26% 30% 26% 30%)' },
        { clipPath: 'inset(0% 0% 0% 0%)', ease: 'power2.inOut' },
        0
      )
        // Counter-scale: the picture inside settles as the frame opens, so
        // the subject stays roughly the same size while the window grows.
        .fromTo(
          '[data-reveal-img]',
          { scale: 1.42 },
          { scale: 1, ease: 'power2.inOut' },
          0
        )
        .fromTo(
          '[data-reveal-hint]',
          { opacity: 1 },
          { opacity: 0, ease: 'none', duration: 0.25 },
          0
        )
        .fromTo(
          '[data-reveal-caption]',
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, ease: 'power2.out', duration: 0.3 },
          0.62
        )
    }, rootRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={rootRef} data-nav-theme="light" className="relative h-[200vh] bg-cream">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* The plate */}
        <div
          data-reveal-frame
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: 'inset(26% 30% 26% 30%)' }}
        >
          <img
            data-reveal-img
            src="/ref/ref-living-tall.jpg"
            alt="A living room at Welcome Woods"
            draggable="false"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: 'center 58%' }}
          />
        </div>

        {/* Sits on the beige field around the plate, not on the picture. */}
        <div
          data-reveal-hint
          className="absolute inset-x-0 bottom-[14%] flex justify-center pointer-events-none"
        >
          <span className="text-brown/55 text-[9.5px] tracking-rail pl-[0.42em]">
            KEEP SCROLLING
          </span>
        </div>

        <div
          data-reveal-caption
          className="absolute left-8 sm:left-14 lg:left-20 bottom-[8%] opacity-0 pointer-events-none"
        >
          <div className="text-cream/60 text-[9.5px] tracking-wide2 mb-2.5">
            THE LIVING ROOM
          </div>
          <div className="font-display italic text-cream text-[clamp(1.3rem,2.4vw,2rem)]">
            Travertine, oak, and a great deal of nothing.
          </div>
        </div>
      </div>
    </section>
  )
}
