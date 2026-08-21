import { useEffect, useRef } from 'react'
import { subscribePointer, isFinePointer, prefersReducedMotion } from '../lib/pointer'

/**
 * A thin beige ring that trails the pointer, with a hard dot at the true
 * position. The ring lags slightly — that gap is the whole effect.
 *
 * Both elements are written with transform only, from the shared pointer
 * loop, so this costs one composited write per frame and never lays out.
 */
export default function CoutureCursor() {
  const ringRef = useRef(null)
  const dotRef = useRef(null)
  const activeRef = useRef(false)

  useEffect(() => {
    if (!isFinePointer() || prefersReducedMotion()) return

    document.body.classList.add('has-couture-cursor')

    const ring = ringRef.current
    const dot = dotRef.current
    let scale = 1
    let targetScale = 1

    const unsubscribe = subscribePointer((s) => {
      scale += (targetScale - scale) * 0.16
      ring.style.transform = `translate3d(${s.fastX}px, ${s.fastY}px, 0) scale(${scale})`
      dot.style.transform = `translate3d(${s.targetX}px, ${s.targetY}px, 0)`
    })

    // Delegated hover detection: one listener on the document rather than a
    // listener per interactive element.
    const INTERACTIVE = 'a, button, [data-cursor="grow"]'

    const onOver = (e) => {
      const hit = e.target.closest?.(INTERACTIVE)
      if (hit && !activeRef.current) {
        activeRef.current = true
        targetScale = 1.85
        ring.style.borderColor = 'rgba(210, 200, 162, 0.95)'
      }
    }

    const onOut = (e) => {
      const hit = e.target.closest?.(INTERACTIVE)
      if (hit && activeRef.current) {
        activeRef.current = false
        targetScale = 1
        ring.style.borderColor = 'rgba(237, 232, 208, 0.72)'
      }
    }

    document.addEventListener('pointerover', onOver, { passive: true })
    document.addEventListener('pointerout', onOut, { passive: true })

    return () => {
      unsubscribe()
      document.removeEventListener('pointerover', onOver)
      document.removeEventListener('pointerout', onOut)
      document.body.classList.remove('has-couture-cursor')
    }
  }, [])

  return (
    <>
      <div ref={ringRef} className="cursor-ring hidden md:block" />
      <div ref={dotRef} className="cursor-dot hidden md:block" />
    </>
  )
}
