import { useEffect, useLayoutEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'
import { subscribePointer, prefersReducedMotion } from '../lib/pointer'
import LocalClock, { slideForHour } from '../components/LocalClock'

/* The hero carries the highest-resolution, most beige-toned frames we have.
   The client's own renders are phone-grade, so they are placed further down
   the page where their scale is honest. */
/* The hero is not a slideshow of three different places — it is one home at
   three hours of the same day. The headline holds still; the hour, the phase
   of light and the room change beneath it. That is the whole argument of the
   brand stated in the first ten seconds: a house is not one photograph. */
const SLIDES = [
  { src: '/ref/ref-living-tall.jpg', label: 'The Living Room', pos: 'center 58%' },
  { src: '/ref/ref-living-warm.jpg', label: 'The Stair Hall', pos: 'center 50%' },
  { src: '/ref/ref-living-dusk.jpg', label: 'The Great Room', pos: 'center 52%' },
]

const WIPE_S = 1.4 // length of the clip-path wipe
const CYCLE_S = 5.0 // frame to frame, wipe included

export default function Hero({ revealed }) {
  // Open on the frame that matches the hour the visitor is actually in.
  const [index, setIndex] = useState(() => slideForHour(new Date().getHours()))

  const rootRef = useRef(null)
  const stackRef = useRef(null)
  const layerRefs = useRef([])
  const imgRefs = useRef([])
  const seamRef = useRef(null)
  const fillRef = useRef(null)
  const capRef = useRef(null)
  const contentRef = useRef(null)

  const widthRef = useRef(0)
  const prevIndexRef = useRef(null)
  const timerRef = useRef(null)

  /* Width is measured on resize only — never inside an animation frame. The
     seam needs it to travel in pixels across the wipe. */
  useEffect(() => {
    const el = rootRef.current
    widthRef.current = el.offsetWidth
    const ro = new ResizeObserver(([entry]) => {
      widthRef.current = entry.contentRect.width
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const goTo = useCallback((next) => {
    setIndex((cur) => (next === cur ? cur : next))
  }, [])

  /* The opening frame is staged at mount, not when the veil lifts.
     Previously the first `gsap.set(img, { scale })` ran on the same frame the
     veil began to part, so the picture snapped from 1 to 1.12 in full view of
     the reader — that was the jolt. Staging it behind the closed veil means
     the first thing revealed is already moving at its final speed. */
  useLayoutEffect(() => {
    const layers = layerRefs.current
    const imgs = imgRefs.current
    if (!layers[index] || !imgs[index]) return

    layers.forEach((l, i) =>
      gsap.set(l, {
        zIndex: i === index ? 3 : 1,
        clipPath: 'inset(0 0 0 0)',
      })
    )
    gsap.set(imgs[index], { scale: prefersReducedMotion() ? 1 : 1.12 })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /* ---- The slide engine -------------------------------------------------
     Runs in useLayoutEffect so the incoming layer is clipped and the caption
     is parked below its mask *before* the browser paints — otherwise the new
     frame flashes at full size for one frame. */
  useLayoutEffect(() => {
    if (!revealed) return

    const layers = layerRefs.current
    const imgs = imgRefs.current
    const seam = seamRef.current
    const prev = prevIndexRef.current
    const first = prev === null
    const reduced = prefersReducedMotion()

    /* Scheduled from the START of this frame, not from the end of its
       timeline. The timeline already runs the full cycle (the Ken Burns and
       the progress rule both span it), so waiting for onComplete and *then*
       waiting another cycle made the real interval 13s instead of 5s — which
       is why the frames were not turning over on time. */
    const scheduleNext = () => {
      timerRef.current = gsap.delayedCall(reduced ? 7 : CYCLE_S, () =>
        goTo((index + 1) % SLIDES.length)
      )
    }

    if (reduced) {
      layers.forEach((l, i) =>
        gsap.set(l, { zIndex: i === index ? 2 : 1, clipPath: 'inset(0 0 0 0)', opacity: i === index ? 1 : 0 })
      )
      gsap.set(fillRef.current, { scaleX: 1 })
      prevIndexRef.current = index
      scheduleNext()
      return () => timerRef.current?.kill()
    }

    const layer = layers[index]
    const img = imgs[index]

    // Park the incoming frame off-screen-right behind the clip. On the very
    // first frame nothing is staged here — the mount effect already did it,
    // so there is nothing left to snap.
    if (!first) {
      gsap.set(layer, {
        zIndex: 5,
        clipPath: 'inset(0 0 0 100%)',
        willChange: 'clip-path',
      })
      gsap.set(img, { scale: 1.18, willChange: 'transform' })
    }

    const tl = gsap.timeline()

    // Settle the stack once the wipe itself has cleared, rather than at the
    // end of the whole cycle.
    tl.call(
      () => {
        layers.forEach((l, i) => {
          gsap.set(l, {
            zIndex: i === index ? 2 : 1,
            clipPath: 'inset(0 0 0 0)',
            willChange: 'auto',
          })
        })
      },
      null,
      first ? 0 : WIPE_S
    )

    if (!first) {
      const w = widthRef.current

      tl.to(layer, { clipPath: 'inset(0 0 0 0%)', duration: WIPE_S, ease: 'power3.inOut' }, 0)
        // The luminous seam rides the leading edge of the wipe.
        .fromTo(seam, { x: w, opacity: 0 }, { opacity: 1, duration: 0.28, ease: 'power2.out' }, 0)
        .to(seam, { x: 0, duration: WIPE_S, ease: 'power3.inOut' }, 0)
        .to(seam, { opacity: 0, duration: 0.34, ease: 'power2.in' }, WIPE_S - 0.34)
        // The outgoing frame drifts a touch further in, so the exit has depth.
        .to(imgs[prev], { scale: 1.09, duration: WIPE_S, ease: 'power2.out' }, 0)
    }

    // Ken Burns: one continuous settle across the wipe and the full hold.
    tl.to(img, { scale: 1.02, duration: CYCLE_S, ease: 'none' }, 0)

    // Room caption swap, timed to land as the wipe clears. The clock beside
    // it is never animated — it belongs to the reader, not to the slideshow.
    tl.fromTo(
      capRef.current,
      { yPercent: 110, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 0.9, ease: 'power3.out' },
      first ? 0.9 : WIPE_S * 0.55
    )

    // Hairline progress for the current frame.
    tl.fromTo(fillRef.current, { scaleX: 0 }, { scaleX: 1, duration: CYCLE_S, ease: 'none' }, 0)

    prevIndexRef.current = index
    scheduleNext()

    return () => {
      tl.kill()
      timerRef.current?.kill()
    }
  }, [index, revealed, goTo])

  /* ---- Entrance of the copy --------------------------------------------
     Word-by-word masks with a blur that resolves to sharp — film titling.
     The blur filter is stripped on completion so no element is left with a
     standing compositing cost. */
  useEffect(() => {
    if (!revealed) return
    if (prefersReducedMotion()) {
      gsap.set('[data-reveal]', { clearProps: 'all' })
      return
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.75 })

      tl.fromTo(
        '[data-reveal="eyebrow"]',
        { yPercent: 120, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1.1, ease: 'power3.out' },
        0
      )
        .fromTo(
          '[data-reveal="line"]',
          { yPercent: 112, opacity: 0, filter: 'blur(9px)' },
          {
            yPercent: 0,
            opacity: 1,
            filter: 'blur(0px)',
            duration: 1.5,
            ease: 'power3.out',
            stagger: 0.11,
            onComplete() {
              this.targets().forEach((t) => {
                t.style.filter = ''
                t.style.willChange = 'auto'
              })
            },
          },
          0.16
        )
        .fromTo(
          '[data-reveal="sub"]',
          { y: 22, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out' },
          0.72
        )
        .fromTo(
          '[data-reveal="cta"]',
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: 'power3.out', stagger: 0.09 },
          0.88
        )
        .fromTo(
          '[data-reveal="furniture"]',
          { opacity: 0 },
          { opacity: 1, duration: 1.3, ease: 'power2.out', stagger: 0.08 },
          1.0
        )
    }, rootRef)

    return () => ctx.revert()
  }, [revealed])

  /* ---- Pointer parallax -------------------------------------------------
     Two depths, opposed. Applied to wrappers only — the imagery and the copy
     each keep their own transform channel for GSAP, so nothing is fighting
     over the same style property. */
  useEffect(() => {
    if (!revealed || prefersReducedMotion()) return

    const stack = stackRef.current
    const content = contentRef.current

    return subscribePointer(({ nx, ny }) => {
      stack.style.transform = `translate3d(${nx * 14}px, ${ny * 10}px, 0)`
      content.style.transform = `translate3d(${nx * -9}px, ${ny * -6}px, 0)`
    })
  }, [revealed])

  const current = SLIDES[index]

  return (
    <section
      data-nav-theme="dark"
      ref={rootRef}
      className="relative w-full h-[100svh] min-h-[560px] overflow-hidden bg-espresso"
    >
      {/* ---- Imagery ----------------------------------------------------- */}
      <div
        ref={stackRef}
        className="absolute z-0"
        // Oversized so the parallax translate never exposes an edge.
        style={{ inset: '-26px' }}
      >
        {SLIDES.map((s, i) => (
          <div
            key={s.src}
            ref={(el) => (layerRefs.current[i] = el)}
            className="slide-layer"
            style={{ zIndex: i === 0 ? 2 : 1 }}
          >
            <img
              ref={(el) => (imgRefs.current[i] = el)}
              src={s.src}
              alt={`Welcome Woods — ${s.label}`}
              draggable="false"
              decoding="async"
              style={{ objectPosition: s.pos }}
              fetchPriority={i === 0 ? 'high' : 'low'}
            />
          </div>
        ))}
        <div ref={seamRef} className="wipe-seam" style={{ left: 0 }} />
      </div>

      {/* ---- Grade -------------------------------------------------------
         These renders are bright and near-white, so the copy needs a real
         scrim under it rather than a token darkening. Three stacked layers:
         a vertical ramp for the chrome, a focused pool behind the headline,
         and a warm wash that pulls the imagery onto the brand palette. */}
      {/* A scrim is not a surface. When the dark token became the brand brown,
          these inherited #895129 at ~0.6 combined alpha and the photograph
          disappeared under a flat brown wash. Scrims use a deep warm shadow
          tone at restrained alpha instead — enough to carry cream type, light
          enough that the travertine still reads as travertine. */}
      {/* Darken where the words are, not the whole photograph.
          Washing the entire frame to make type readable costs the image its
          light — and the light is the argument this hero is making. So the
          full-frame ramp is kept very light, and a tight pool does the actual
          legibility work directly under the copy. */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(46,29,15,0.30) 0%, rgba(46,29,15,0.04) 24%, rgba(46,29,15,0.06) 50%, rgba(46,29,15,0.58) 100%)',
        }}
      />
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 46% 34% at 50% 45%, rgba(28,17,9,0.56) 0%, rgba(28,17,9,0.34) 45%, rgba(28,17,9,0.10) 72%, rgba(28,17,9,0) 100%)',
        }}
      />
      {/* Warm cast, now a whisper. Every stop carries an explicit colour: the
          `transparent` keyword resolves to transparent *black*, which under
          soft-light drags the frame toward black instead of fading out. */}
      <div
        className="absolute inset-0 z-10 pointer-events-none mix-blend-soft-light opacity-25"
        style={{
          background:
            'linear-gradient(140deg, rgba(237,232,208,0.9) 0%, rgba(237,232,208,0) 46%, rgba(111,74,46,0) 58%, rgba(111,74,46,0.85) 100%)',
        }}
      />
      <div className="vignette" />

      {/* ---- Copy -------------------------------------------------------- */}
      <div
        ref={contentRef}
        className="relative z-30 h-full flex flex-col items-center justify-center text-center px-8 sm:px-14 pt-28 pb-36 sm:pb-32"
      >
        <div className="mask-line">
          <span
            data-reveal="eyebrow"
            className="block text-cream/90 text-[9.5px] sm:text-[11px] tracking-rail pl-[0.42em] font-light"
            style={{ textShadow: '0 1px 12px rgba(24,14,7,0.6)' }}
          >
            INTERIORS. SPACES. EXPERIENCES.
          </span>
        </div>

        <h1
          className="mt-7 sm:mt-9 font-display font-light text-cream leading-[0.94] tracking-[-0.015em]"
          style={{ textShadow: '0 2px 26px rgba(24,14,7,0.55), 0 1px 3px rgba(24,14,7,0.35)' }}
        >
          <span className="mask-line">
            <span
              data-reveal="line"
              className="block text-[clamp(1.95rem,min(7.8vw,10.5vh),6.6rem)]"
            >
              Quietly made.
            </span>
          </span>
          <span className="mask-line">
            <span
              data-reveal="line"
              className="block italic text-[clamp(1.95rem,min(7.8vw,10.5vh),6.6rem)] text-sand"
            >
              Exceptionally finished.
            </span>
          </span>
        </h1>

        <p
          data-reveal="sub"
          className="mt-8 sm:mt-10 max-w-[34rem] text-cream text-[13.5px] sm:text-[15px] font-light leading-[1.85]"
          style={{ textShadow: '0 1px 16px rgba(24,14,7,0.6)' }}
        >
          Thoughtful spaces, shaped around the way you live.
          From the first idea to the finishing touch.
        </p>

        <div className="mt-11 sm:mt-14 flex flex-col sm:flex-row items-center gap-4 sm:gap-5">
          <a
            href="#/projects"
            data-reveal="cta"
            className="group relative overflow-hidden px-9 py-[15px] bg-cream text-espresso text-[10.5px] tracking-wide2 font-normal transition-colors duration-500 hover:text-cream"
          >
            <span className="relative z-10">EXPLORE THE SPACES</span>
            {/* Fill sweeps up from the base on hover — transform only. */}
            <span className="absolute inset-0 bg-brown-deep origin-bottom scale-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100" />
          </a>

          <a
            href="#/contact"
            data-reveal="cta"
            className="group relative px-9 py-[15px] border border-cream/28 text-cream/85 text-[10.5px] tracking-wide2 font-light transition-colors duration-500 hover:border-cream/70 hover:text-cream"
          >
            START A PROJECT
          </a>
        </div>
      </div>

      {/* ---- Furniture: side rails --------------------------------------- */}
      <div
        data-reveal="furniture"
        className="hidden lg:block absolute z-30 left-[calc(var(--frame-inset)+22px)] top-1/2 -translate-y-1/2 opacity-0"
      >
        <span
          className="block text-cream/45 text-[9.5px] tracking-rail font-light whitespace-nowrap"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
        >
          WELCOME&nbsp;&nbsp;WOODS
        </span>
      </div>

      <div
        data-reveal="furniture"
        className="hidden lg:block absolute z-30 right-[calc(var(--frame-inset)+22px)] top-1/2 -translate-y-1/2 opacity-0"
      >
        <span
          className="block text-cream/35 text-[9.5px] tracking-wide2 font-light whitespace-nowrap"
          style={{ writingMode: 'vertical-rl' }}
        >
          CONCEPT PRESENTATION · PLACEHOLDER IMAGERY
        </span>
      </div>

      {/* ---- Furniture: scroll cue --------------------------------------- */}
      <div
        data-reveal="furniture"
        className="absolute z-30 bottom-[calc(var(--frame-inset)+30px)] left-1/2 -translate-x-1/2 lg:left-[calc(var(--frame-inset)+34px)] lg:translate-x-0 flex flex-col items-center gap-3 opacity-0"
      >
        <span className="text-cream/40 text-[9px] tracking-wide2 font-light hidden lg:block">
          SCROLL
        </span>
        <div className="cue-track">
          <div className="cue-dot" />
        </div>
      </div>

      {/* ---- Furniture: index rail --------------------------------------- */}
      <div
        data-reveal="furniture"
        className="absolute z-30 bottom-[calc(var(--frame-inset)+30px)] right-[calc(var(--frame-inset)+26px)] hidden sm:flex items-end gap-7 opacity-0"
      >
        <div className="text-right">
          {/* The reader's own clock, live and in their own zone. It is what
              makes the three frames read as one day rather than three
              unrelated photographs. */}
          <LocalClock
            className="font-display font-light text-cream text-[clamp(1.7rem,2.6vw,2.4rem)] leading-none tracking-[0.06em]"
            phaseClassName="mt-2 text-sand text-[9px] tracking-wide2 font-sans font-light"
          />
          <div className="mask-line mt-2">
            <span
              ref={capRef}
              className="block font-display italic text-cream/80 text-[16px] leading-none"
            >
              {current.label}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5 pb-1">
          {SLIDES.map((s, i) => (
            <button
              key={s.src}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`View ${s.label}`}
              aria-current={i === index}
              className="group py-3"
            >
              <span
                className={`rail-track block transition-all duration-500 ease-out ${
                  i === index ? 'w-14' : 'w-6 group-hover:w-10'
                }`}
              >
                {i === index && <span ref={fillRef} className="rail-fill" />}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
