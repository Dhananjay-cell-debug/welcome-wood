import { useEffect, useRef } from 'react'
import gsap from 'gsap'

/**
 * A 1px frame inset from the viewport edge, drawn outward from the corners.
 * It is the quietest element on the page and does more for the "bespoke"
 * read than anything loud would.
 *
 * Each edge is scaled along its own axis, so the draw-on is pure transform.
 */
export default function HairlineFrame({ revealed }) {
  const rootRef = useRef(null)

  useEffect(() => {
    if (!revealed) return
    const edges = rootRef.current.querySelectorAll('.frame-edge')

    const tween = gsap.fromTo(
      edges,
      { scaleX: (i) => (i < 2 ? 0 : 1), scaleY: (i) => (i < 2 ? 1 : 0) },
      {
        scaleX: 1,
        scaleY: 1,
        duration: 1.5,
        ease: 'power3.inOut',
        delay: 0.55,
        stagger: 0.06,
      }
    )

    return () => tween.kill()
  }, [revealed])

  return (
    <div ref={rootRef} aria-hidden="true">
      {/* Horizontals — scaled on X, anchored at opposite ends. */}
      <div
        className="frame-edge"
        style={{
          top: 'var(--frame-inset)',
          left: 'var(--frame-inset)',
          right: 'var(--frame-inset)',
          height: 1,
          transformOrigin: 'left center',
        }}
      />
      <div
        className="frame-edge"
        style={{
          bottom: 'var(--frame-inset)',
          left: 'var(--frame-inset)',
          right: 'var(--frame-inset)',
          height: 1,
          transformOrigin: 'right center',
        }}
      />
      {/* Verticals — scaled on Y. */}
      <div
        className="frame-edge"
        style={{
          left: 'var(--frame-inset)',
          top: 'var(--frame-inset)',
          bottom: 'var(--frame-inset)',
          width: 1,
          transformOrigin: 'center top',
        }}
      />
      <div
        className="frame-edge"
        style={{
          right: 'var(--frame-inset)',
          top: 'var(--frame-inset)',
          bottom: 'var(--frame-inset)',
          width: 1,
          transformOrigin: 'center bottom',
        }}
      />
    </div>
  )
}
