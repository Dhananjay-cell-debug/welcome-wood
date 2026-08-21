/**
 * A single, page-wide pointer loop.
 *
 * Every parallax / cursor effect on the site subscribes here instead of
 * starting its own requestAnimationFrame. One loop means one write pass per
 * frame, no competing schedulers, and nothing to leak when a component
 * unmounts. The loop parks itself when nobody is listening.
 *
 * Subscribers receive smoothed values only — the raw pointer is never handed
 * out, so no consumer can accidentally animate on an unfiltered signal.
 */

const subscribers = new Set()

const state = {
  // Raw target, written by the pointermove listener.
  targetX: 0,
  targetY: 0,
  // Two independently smoothed followers.
  fastX: 0,
  fastY: 0,
  slowX: 0,
  slowY: 0,
  // Normalised -1..1 from viewport centre, smoothed at the slow rate.
  nx: 0,
  ny: 0,
}

const FAST = 0.19 // cursor — must feel attached to the hand
const SLOW = 0.045 // parallax — must feel like weight

let rafId = null
let seeded = false

function tick() {
  state.fastX += (state.targetX - state.fastX) * FAST
  state.fastY += (state.targetY - state.fastY) * FAST
  state.slowX += (state.targetX - state.slowX) * SLOW
  state.slowY += (state.targetY - state.slowY) * SLOW

  // Viewport size is read from innerWidth/innerHeight, which is a cheap
  // cached value — not a forced layout like getBoundingClientRect would be.
  const halfW = window.innerWidth / 2
  const halfH = window.innerHeight / 2
  state.nx = halfW ? (state.slowX - halfW) / halfW : 0
  state.ny = halfH ? (state.slowY - halfH) / halfH : 0

  for (const fn of subscribers) fn(state)

  rafId = subscribers.size ? requestAnimationFrame(tick) : null
}

function onPointerMove(e) {
  state.targetX = e.clientX
  state.targetY = e.clientY

  // First real sample snaps the followers into place so the cursor never
  // flies in from the top-left corner on the first movement.
  if (!seeded) {
    seeded = true
    state.fastX = state.slowX = e.clientX
    state.fastY = state.slowY = e.clientY
  }
}

export function subscribePointer(fn) {
  if (subscribers.size === 0) {
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    if (rafId === null) rafId = requestAnimationFrame(tick)
  }
  subscribers.add(fn)

  return () => {
    subscribers.delete(fn)
    if (subscribers.size === 0) {
      window.removeEventListener('pointermove', onPointerMove)
      if (rafId !== null) {
        cancelAnimationFrame(rafId)
        rafId = null
      }
    }
  }
}

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export const isFinePointer = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(hover: hover) and (pointer: fine)').matches
