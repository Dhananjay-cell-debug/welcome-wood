import { useEffect } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { prefersReducedMotion } from './pointer'

gsap.registerPlugin(ScrollTrigger)

/* Module-scoped handle. Locking `body { overflow: hidden }` does nothing to a
   smooth-scroll instance — it keeps its own virtual position — so anything
   that needs to freeze or drive the page has to talk to Lenis directly. */
let instance = null

export const getLenis = () => instance

/** Scroll to an element or selector, honouring the smoother when present. */
export function scrollToTarget(target, offset = 0) {
  if (instance) {
    instance.scrollTo(target, { offset, duration: 1.5 })
    return
  }
  const el = typeof target === 'string' ? document.querySelector(target) : target
  el?.scrollIntoView({ behavior: 'smooth' })
}

/**
 * Smooth scrolling, wired so that Lenis and GSAP share a single clock.
 *
 * The usual cause of scroll-jank is two independent rAF loops — one for the
 * smoother, one for the animation library — drifting a frame apart. Driving
 * Lenis from gsap.ticker means position updates and ScrollTrigger evaluation
 * happen in the same frame, in the right order, every time.
 */
export default function useSmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) {
      ScrollTrigger.refresh()
      return
    }

    const lenis = (instance = new Lenis({
      duration: 1.15,
      // Exponential ease-out: quick to respond, long and soft to settle.
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.6,
    }))

    lenis.on('scroll', ScrollTrigger.update)

    const raf = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    // Lenis already integrates its own delta; GSAP's lag smoothing would
    // fight it after a dropped frame.
    gsap.ticker.lagSmoothing(0)

    // Fonts land after first paint and change text height, which invalidates
    // every trigger measured before they arrive.
    document.fonts?.ready.then(() => ScrollTrigger.refresh())

    return () => {
      gsap.ticker.remove(raf)
      lenis.destroy()
      instance = null
    }
  }, [])
}
