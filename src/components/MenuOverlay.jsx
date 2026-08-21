import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { prefersReducedMotion } from '../lib/pointer'
import { getLenis, scrollToTarget } from '../lib/useSmoothScroll'

/* The shape of the finished single-page site. Each entry is a section that
   will be built out; for now they are anchors that scroll to nothing. */
const CHAPTERS = [
  { n: '02', label: 'The Vision', href: '#vision', img: '/ref/ref-living-tall.jpg' },
  { n: '03', label: 'The Residences', href: '#residences', img: '/ref/ref-living-warm.jpg' },
  { n: '04', label: 'Interiors', href: '#interiors', img: '/ref/ref-kitchen.jpg' },
  { n: '05', label: 'Amenities', href: '#amenities', img: '/ref/ref-spa.jpg' },
  { n: '06', label: 'Our Addresses', href: '#location', img: '/ref/ref-terrace.jpg' },
  { n: '07', label: 'Enquire', href: '#enquire', img: '/ref/ref-living-dusk.jpg' },
]

export default function MenuOverlay({ open, onClose }) {
  const rootRef = useRef(null)
  const panelRef = useRef(null)
  const previewRef = useRef(null)
  const [hovered, setHovered] = useState(null)

  /* Open / close. clip-path drives the panel so the reveal is a wipe rather
     than a slide — it echoes the veil without repeating it. */
  useEffect(() => {
    const root = rootRef.current
    const reduced = prefersReducedMotion()

    if (reduced) {
      gsap.set(root, { autoAlpha: open ? 1 : 0 })
      gsap.set(panelRef.current, { clipPath: 'inset(0% 0 0 0)' })
      return
    }

    const items = root.querySelectorAll('[data-menu-item] > span')
    const meta = root.querySelectorAll('[data-menu-meta]')

    if (open) {
      gsap.set(root, { autoAlpha: 1, pointerEvents: 'auto' })
      const tl = gsap.timeline()
      tl.fromTo(
        panelRef.current,
        { clipPath: 'inset(0% 0 100% 0)' },
        { clipPath: 'inset(0% 0 0% 0)', duration: 0.95, ease: 'power4.inOut' },
        0
      )
        .fromTo(
          items,
          { yPercent: 112, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 1, ease: 'power3.out', stagger: 0.055 },
          0.42
        )
        .fromTo(
          meta,
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', stagger: 0.08 },
          0.66
        )
      return () => tl.kill()
    }

    const tl = gsap.timeline({
      onComplete: () => gsap.set(root, { autoAlpha: 0, pointerEvents: 'none' }),
    })
    tl.to(items, { yPercent: -60, opacity: 0, duration: 0.42, ease: 'power2.in', stagger: 0.028 }, 0)
      .to(meta, { opacity: 0, duration: 0.3, ease: 'power2.in' }, 0)
      .to(
        panelRef.current,
        { clipPath: 'inset(100% 0 0% 0)', duration: 0.8, ease: 'power4.inOut' },
        0.22
      )
    return () => tl.kill()
  }, [open])

  // Escape closes; the page behind is frozen while the panel is up.
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    getLenis()?.stop()
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      getLenis()?.start()
    }
  }, [open, onClose])

  /* Close first, then travel — so the reader watches the panel clear and the
     destination arrive, rather than landing behind a panel still animating. */
  const goTo = (e, href) => {
    e.preventDefault()
    onClose()
    setTimeout(() => scrollToTarget(href), 620)
  }

  // Cross-fade the preview plate as the pointer moves down the list.
  useEffect(() => {
    if (prefersReducedMotion()) return
    const el = previewRef.current
    if (!el) return
    gsap.to(el, {
      opacity: hovered === null ? 0 : 1,
      scale: hovered === null ? 1.06 : 1,
      duration: 0.7,
      ease: 'power3.out',
      overwrite: 'auto',
    })
  }, [hovered])

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[65] invisible opacity-0"
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
    >
      <div ref={panelRef} className="absolute inset-0 bg-cream">
        {/* Faint warm wash so the cream never reads as flat paper. */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 90% 70% at 78% 30%, rgba(210,200,162,0.5) 0%, transparent 62%)',
          }}
        />

        <div className="relative h-full flex flex-col justify-center px-9 sm:px-20 lg:px-28">
          <nav className="max-w-[1180px] w-full mx-auto">
            <div
              data-menu-meta
              className="text-brown/45 text-[9.5px] tracking-rail pl-[0.42em] mb-6 sm:mb-9 opacity-0"
            >
              CHAPTERS
            </div>

            <ul>
              {CHAPTERS.map((c, i) => (
                <li key={c.n}>
                  <a
                    href={c.href}
                    data-menu-item
                    onClick={(e) => goTo(e, c.href)}
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(null)}
                    className="mask-line group"
                  >
                    {/* Sized against viewport height as well as width, so the
                        full chapter list always fits without scrolling. */}
                    <span className="flex items-baseline gap-5 sm:gap-8 py-[0.15em]">
                      <em className="not-italic text-brown/45 text-[10px] sm:text-[11px] tracking-wide3 font-light w-6 shrink-0 transition-colors duration-500 group-hover:text-gilt">
                        {c.n}
                      </em>
                      <em className="not-italic font-display font-light text-espresso text-[clamp(1.45rem,min(4.6vw,5vh),3rem)] leading-[1.12] transition-transform duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-3">
                        {c.label}
                      </em>
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <div
              data-menu-meta
              className="mt-9 sm:mt-12 flex flex-wrap gap-x-14 gap-y-5 opacity-0"
            >
              <div>
                <div className="text-brown/40 text-[9px] tracking-wide2 mb-2">ENQUIRIES</div>
                <div className="font-display text-espresso text-lg">hello@welcomewoods.com</div>
              </div>
              <div>
                <div className="text-brown/40 text-[9px] tracking-wide2 mb-2">STATUS</div>
                <div className="font-display italic text-brown text-lg">
                  Concept presentation
                </div>
              </div>
            </div>
          </nav>
        </div>

        {/* Preview plate — desktop only, sits behind the type. */}
        <div className="hidden lg:block absolute right-[8%] top-1/2 -translate-y-1/2 w-[26vw] max-w-[380px] aspect-[3/4] overflow-hidden pointer-events-none">
          <img
            ref={previewRef}
            src={hovered === null ? CHAPTERS[0].img : CHAPTERS[hovered].img}
            alt=""
            className="w-full h-full object-cover opacity-0"
            style={{ willChange: 'transform, opacity' }}
          />
        </div>
      </div>
    </div>
  )
}
