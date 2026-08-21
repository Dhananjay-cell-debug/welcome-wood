import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from '../lib/pointer'
import Monogram from '../components/Monogram'

const STATEMENT =
  'We build a small number of homes each year. Not because we cannot build more, but because the things that make a house worth living in — the joinery, the stone, the way a door closes — cannot be hurried.'

/**
 * The statement illuminates word by word as the section passes through the
 * viewport. Every word is a span whose opacity is scrubbed by scroll
 * position, so reading pace and scroll pace are the same gesture.
 */
export default function Manifesto() {
  const rootRef = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-word]',
        { opacity: 0.14 },
        {
          opacity: 1,
          ease: 'none',
          stagger: 0.6,
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top 74%',
            end: 'bottom 72%',
            scrub: 0.6,
          },
        }
      )

      gsap.fromTo(
        '[data-manifesto-rule]',
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.4,
          ease: 'power3.inOut',
          scrollTrigger: { trigger: rootRef.current, start: 'top 78%' },
        }
      )

      gsap.fromTo(
        '[data-manifesto-eyebrow]',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: rootRef.current, start: 'top 80%' },
        }
      )
    }, rootRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      data-nav-theme="light"
      id="vision"
      ref={rootRef}
      className="relative bg-cream py-24 sm:py-28 lg:py-36 px-8 sm:px-14 overflow-hidden"
    >
      {/* An oversized mark, barely there. It gives the page of pure type a
          ground to sit on without adding anything for the eye to read. */}
      <Monogram
        className="hidden sm:block absolute -right-[6%] top-1/2 -translate-y-1/2 w-[52vw] max-w-[680px] h-auto text-brown/[0.055] pointer-events-none"
        strokeWidth={1.6}
      />

      <div className="relative max-w-[1080px] mx-auto">
        <div className="flex items-center gap-6 mb-10 sm:mb-14">
          <span
            data-manifesto-eyebrow
            className="text-brown/50 text-[9.5px] tracking-rail pl-[0.42em] whitespace-nowrap"
          >
            02 — THE VISION
          </span>
          <span
            data-manifesto-rule
            className="h-px flex-1 bg-beige/60 origin-left"
          />
        </div>

        <p className="font-display font-light text-espresso text-[clamp(1.5rem,3.6vw,3.05rem)] leading-[1.42] tracking-[-0.005em]">
          {STATEMENT.split(' ').map((w, i) => (
            <span key={i} data-word className="inline-block mr-[0.26em]">
              {w}
            </span>
          ))}
        </p>

        <div className="mt-12 sm:mt-14 flex items-center gap-5">
          <span className="h-px w-16 bg-brown/45 shrink-0" />
          <span className="font-display italic text-brown text-lg">
            Welcome Woods
          </span>
        </div>
      </div>
    </section>
  )
}
