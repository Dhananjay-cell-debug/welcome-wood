import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import Monogram from './Monogram'
import { prefersReducedMotion } from '../lib/pointer'

const BAND_COUNT = 7

/**
 * The opening. A cream veil holds the stage while the imagery decodes; the
 * mark draws itself on; then the veil parts into vertical bands from the
 * centre outward while the mark flies up into its nav slot.
 *
 * The flight is a hand-rolled FLIP: both rects are measured exactly once,
 * then the whole move runs on transform. No layout is touched mid-flight.
 */
export default function Veil({ revealed, navMarkRef, onFinished }) {
  const rootRef = useRef(null)
  const bandsRef = useRef(null)
  const markRef = useRef(null)
  const pathRef = useRef(null)
  const wordRef = useRef(null)
  const ruleRef = useRef(null)

  // Draw the mark immediately — the wait for imagery is spent showing
  // something considered, not a spinner.
  useEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        pathRef.current,
        { strokeDashoffset: 100 },
        { strokeDashoffset: 0, duration: 1.2, ease: 'power2.inOut' }
      )
      gsap.fromTo(
        ruleRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 1, delay: 0.5, ease: 'power3.inOut' }
      )
      gsap.fromTo(
        wordRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 1, delay: 0.62, ease: 'power2.out' }
      )
    }, rootRef)
    return () => ctx.revert()
  }, [])

  // The parting.
  useEffect(() => {
    if (!revealed) return

    const root = rootRef.current
    const navMark = navMarkRef.current

    if (prefersReducedMotion()) {
      gsap.set(root, { display: 'none' })
      gsap.set(navMark, { opacity: 1 })
      onFinished?.()
      return
    }

    const bands = bandsRef.current.children
    const mark = markRef.current

    // One measurement pass, before anything moves.
    const from = mark.getBoundingClientRect()
    const to = navMark.getBoundingClientRect()
    const scale = to.width / from.width
    const dx = to.left + to.width / 2 - (from.left + from.width / 2)
    const dy = to.top + to.height / 2 - (from.top + from.height / 2)

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(root, { display: 'none' })
        onFinished?.()
      },
    })

    tl.to(wordRef.current, { opacity: 0, y: -8, duration: 0.5, ease: 'power2.in' }, 0)
      .to(ruleRef.current, { scaleX: 0, duration: 0.5, ease: 'power2.in' }, 0)
      .to(
        mark,
        {
          x: dx,
          y: dy,
          scale,
          // Thicken the stroke as the mark shrinks so it lands at exactly
          // the nav mark's weight rather than thinning away to nothing.
          attr: { 'stroke-width': 6 },
          duration: 1.35,
          ease: 'power3.inOut',
        },
        0.18
      )
      .to(
        bands,
        {
          yPercent: -101,
          duration: 1.25,
          ease: 'power3.inOut',
          stagger: { each: 0.075, from: 'center' },
        },
        0.3
      )
      // Hand off to the real nav mark at the exact frame the flight lands.
      .set(navMark, { opacity: 1 }, 1.5)
      .to(mark, { opacity: 0, duration: 0.2, ease: 'none' }, 1.5)

    return () => tl.kill()
  }, [revealed, navMarkRef, onFinished])

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[70] pointer-events-none"
      aria-hidden="true"
    >
      <div ref={bandsRef} className="absolute inset-0">
        {Array.from({ length: BAND_COUNT }).map((_, i) => (
          <div
            key={i}
            className="veil-band absolute top-0 bottom-0"
            style={{
              left: `calc(${(i * 100) / BAND_COUNT}% - 0.5px)`,
              width: `calc(${100 / BAND_COUNT}% + 1px)`,
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <Monogram
            ref={markRef}
            pathRef={pathRef}
            className="w-[96px] h-[96px] sm:w-[120px] sm:h-[120px] text-brown"
            strokeWidth={3}
            stroke="#895129"
          />
          <div
            ref={ruleRef}
            className="mt-5 h-px w-28 bg-beige-deep/50 origin-center"
          />
          <div
            ref={wordRef}
            className="mt-5 font-mark text-[11px] sm:text-xs text-brown/70 tracking-rail pl-[0.42em]"
          >
            WELCOME WOODS
          </div>
        </div>
      </div>
    </div>
  )
}
