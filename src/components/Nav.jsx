import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import Monogram from './Monogram'
import { prefersReducedMotion } from '../lib/pointer'
import { scrollToTarget } from '../lib/useSmoothScroll'

/**
 * Clear glass.
 *
 * The bar carries no colour of its own — only a blur and a hairline. A tinted
 * cream panel read as a solid block sitting on top of the page; this lets
 * whatever is beneath show through and simply softens it.
 *
 * Because the pane is colourless, legibility has to come from the type, so
 * the mark and labels invert against whatever section is currently under the
 * bar (`data-nav-theme` on each section). Depth-ordering matters: a full-bleed
 * dark plate inside an otherwise light section wins over its parent, so the
 * deepest matching element decides.
 */
export default function Nav({ navMarkRef, revealed, menuOpen, onToggleMenu }) {
  const rootRef = useRef(null)
  const paneRef = useRef(null)
  const [onBar, setOnBar] = useState(false)
  const [theme, setTheme] = useState('dark') // 'dark' = bar sits on dark imagery

  useEffect(() => {
    if (!revealed) return
    if (prefersReducedMotion()) {
      gsap.set('[data-nav-item]', { opacity: 1, y: 0 })
      return
    }
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-nav-item]',
        { opacity: 0, y: -12 },
        { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out', delay: 1.5, stagger: 0.1 }
      )
    }, rootRef)
    return () => ctx.revert()
  }, [revealed])

  // The pane appears once the hero is behind us.
  useEffect(() => {
    if (!revealed) return
    const t = ScrollTrigger.create({
      start: () => window.innerHeight * 0.72,
      end: 'max',
      onToggle: (self) => setOnBar(self.isActive),
    })
    return () => t.kill()
  }, [revealed])

  /* Read what is under the bar. Every candidate is tracked with its DOM depth
     so the innermost active one wins — otherwise a light section would keep
     overriding the dark plate bleeding across it. */
  useEffect(() => {
    if (!revealed) return

    const els = [...document.querySelectorAll('[data-nav-theme]')]
    const depth = (el) => {
      let d = 0
      for (let n = el; n; n = n.parentElement) d++
      return d
    }
    const state = new Map(els.map((el) => [el, false]))

    const resolve = () => {
      let best = null
      let bestDepth = -1
      for (const [el, isActive] of state) {
        if (!isActive) continue
        const d = depth(el)
        if (d > bestDepth) {
          bestDepth = d
          best = el
        }
      }
      if (best) setTheme(best.dataset.navTheme)
    }

    const triggers = els.map((el) =>
      ScrollTrigger.create({
        trigger: el,
        start: 'top 52px',
        end: 'bottom 52px',
        onToggle: (self) => {
          state.set(el, self.isActive)
          resolve()
        },
      })
    )

    ScrollTrigger.refresh()
    return () => triggers.forEach((t) => t.kill())
  }, [revealed])

  useEffect(() => {
    const target = onBar && !menuOpen ? 1 : 0
    if (prefersReducedMotion()) {
      gsap.set(paneRef.current, { opacity: target })
      return
    }
    gsap.to(paneRef.current, {
      opacity: target,
      duration: 0.55,
      ease: 'power2.out',
      overwrite: 'auto',
    })
  }, [onBar, menuOpen])

  // The menu panel is beige, so the type must read dark while it is open.
  const light = menuOpen || theme === 'light'

  const ink = light ? 'text-espresso' : 'text-cream'
  const inkSoft = light ? 'text-espresso/80' : 'text-cream/85'
  const rule = light ? 'bg-espresso/80' : 'bg-cream/85'

  // Over the hero the pane is still hidden, so the type carries its own
  // contrast. Nothing is applied on light sections, where it would muddy.
  const shadow = light
    ? undefined
    : { textShadow: '0 1px 14px rgba(24,14,7,0.75), 0 1px 2px rgba(24,14,7,0.45)' }
  const markShadow = light
    ? undefined
    : { filter: 'drop-shadow(0 1px 10px rgba(24,14,7,0.7))' }

  const onHome = (e) => {
    e.preventDefault()
    scrollToTarget('#top')
  }

  return (
    <>
      {/* Glass pane: blur, plus a gradient that fades to nothing at its lower
          edge. A fully colourless pane was invisible over busy photography —
          this keeps the transparency but guarantees the type always has
          something behind it. The gradient follows the theme, so it darkens
          over imagery and lightens over beige, and never reads as a bar. */}
      <div
        ref={paneRef}
        aria-hidden="true"
        className="fixed z-[48] pointer-events-none opacity-0 backdrop-blur-[16px] backdrop-saturate-125"
        style={{
          top: 'var(--frame-inset)',
          left: 'var(--frame-inset)',
          right: 'var(--frame-inset)',
          height: 'calc(var(--frame-inset) + 74px)',
          WebkitMaskImage:
            'linear-gradient(to bottom, #000 0%, #000 46%, rgba(0,0,0,0) 100%)',
          maskImage:
            'linear-gradient(to bottom, #000 0%, #000 46%, rgba(0,0,0,0) 100%)',
        }}
      >
        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            opacity: light ? 0 : 1,
            background:
              'linear-gradient(to bottom, rgba(28,17,9,0.52) 0%, rgba(28,17,9,0.24) 55%, rgba(28,17,9,0) 100%)',
          }}
        />
        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            opacity: light ? 1 : 0,
            background:
              'linear-gradient(to bottom, rgba(237,232,208,0.78) 0%, rgba(237,232,208,0.42) 55%, rgba(237,232,208,0) 100%)',
          }}
        />
      </div>

      <header
        ref={rootRef}
        className="fixed z-50 pointer-events-none"
        style={{
          top: 'calc(var(--frame-inset) + 18px)',
          left: 'calc(var(--frame-inset) + 22px)',
          right: 'calc(var(--frame-inset) + 22px)',
        }}
      >
        <div className="flex items-center justify-between">
          <a
            href="#top"
            onClick={onHome}
            className="pointer-events-auto block"
            aria-label="Welcome Woods — home"
          >
            <Monogram
              ref={navMarkRef}
              className={`w-[32px] h-[32px] sm:w-[36px] sm:h-[36px] opacity-0 transition-colors duration-500 ${ink}`}
              strokeWidth={6}
              style={markShadow}
            />
          </a>

          <div
            data-nav-item
            className={`hidden sm:block font-mark text-[13px] tracking-rail pl-[0.42em] opacity-0 select-none transition-colors duration-500 ${ink}`}
            style={shadow}
          >
            WELCOME WOODS
          </div>

          <button
            data-nav-item
            type="button"
            onClick={onToggleMenu}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="pointer-events-auto group flex items-center gap-3.5 opacity-0"
          >
            <span
              className={`text-[10px] tracking-wide2 font-light transition-colors duration-500 ${inkSoft}`}
              style={shadow}
            >
              {menuOpen ? 'CLOSE' : 'MENU'}
            </span>
            <span className="flex flex-col gap-[5px] w-[22px]">
              <span
                className={`h-px transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${rule} ${
                  menuOpen ? 'translate-y-[3px] rotate-[10deg] w-full' : 'w-full'
                }`}
              />
              <span
                className={`h-px transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${rule} ${
                  menuOpen
                    ? '-translate-y-[3px] -rotate-[10deg] w-full'
                    : 'w-2/3 self-end group-hover:w-full'
                }`}
              />
            </span>
          </button>
        </div>
      </header>
    </>
  )
}
