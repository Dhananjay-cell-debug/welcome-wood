import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from '../lib/pointer'

/* Placeholder project data — replace with surveyed, RERA-verified figures. */
const ADDRESSES = [
  {
    n: '01',
    city: 'Whitefield',
    locality: 'Bengaluru East',
    status: 'Under construction',
    tone: 'building',
    config: '2, 3 & 4 BHK',
    area: '1,240 – 3,050 sq ft',
    possession: 'December 2027',
    progress: 62,
    img: '/ref/ref-terrace.jpg',
    pos: 'center 45%',
    line: 'Built around a courtyard, so every home faces inward to quiet.',
    nearby: [
      ['International school', '4 min'],
      ['Metro station', '7 min'],
      ['Multi-speciality hospital', '9 min'],
      ['Airport', '34 min'],
    ],
  },
  {
    n: '02',
    city: 'Sarjapur',
    locality: 'Bengaluru South-East',
    status: 'New launch',
    tone: 'launch',
    config: '3 & 4 BHK',
    area: '1,780 – 2,610 sq ft',
    possession: 'March 2029',
    progress: 12,
    img: '/ref/ref-living-dusk.jpg',
    pos: 'center 52%',
    line: 'The largest of the three sites, and the only one with a lake edge.',
    nearby: [
      ['International school', '6 min'],
      ['Tech park', '11 min'],
      ['Multi-speciality hospital', '14 min'],
      ['Airport', '52 min'],
    ],
  },
  {
    n: '03',
    city: 'Hebbal',
    locality: 'Bengaluru North',
    status: 'Ready to move',
    tone: 'ready',
    config: '2 & 3 BHK',
    area: '1,240 – 2,140 sq ft',
    possession: 'Completed',
    progress: 100,
    img: '/ref/ref-living-warm.jpg',
    pos: 'center 50%',
    line: 'Finished, occupied, and the closest of the three to the airport.',
    nearby: [
      ['International school', '5 min'],
      ['Metro station', '3 min'],
      ['Multi-speciality hospital', '8 min'],
      ['Airport', '21 min'],
    ],
  },
]

const TONE = {
  ready: 'bg-cream text-brown',
  building: 'bg-cream/20 text-cream ring-1 ring-inset ring-cream/35',
  launch: 'bg-transparent text-cream/85 ring-1 ring-inset ring-cream/30',
}

/**
 * Where the company builds.
 *
 * Pick a site on the rail; the photograph and every figure beside it answer
 * for that site. The panel is deliberately plain — image left, facts right,
 * one column each. Earlier passes tried a drawn drive-time dial and a survey
 * grid behind the panel; both were decoration standing in for structure, and
 * both are gone. The information here is what a buyer came for, so it is set
 * as a clean table and nothing competes with it.
 */
export default function Addresses() {
  const rootRef = useRef(null)
  const [active, setActive] = useState(0)
  const plateRefs = useRef([])
  const barRef = useRef(null)

  const current = ADDRESSES[active]

  useEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-addr-row]',
        { y: 26, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.09,
          scrollTrigger: { trigger: '[data-addr-list]', start: 'top 85%' },
        }
      )
    }, rootRef)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const reduced = prefersReducedMotion()
    plateRefs.current.forEach((el, i) => {
      if (!el) return
      const on = i === active
      if (reduced) return gsap.set(el, { opacity: on ? 1 : 0 })
      gsap.to(el, {
        opacity: on ? 1 : 0,
        scale: on ? 1 : 1.05,
        duration: 0.9,
        ease: 'power3.out',
        overwrite: 'auto',
      })
    })

    if (barRef.current) {
      const to = ADDRESSES[active].progress / 100
      if (reduced) gsap.set(barRef.current, { scaleX: to })
      else
        gsap.fromTo(
          barRef.current,
          { scaleX: 0 },
          { scaleX: to, duration: 1.2, ease: 'power3.inOut', overwrite: 'auto' }
        )
    }
  }, [active])

  return (
    <section
      id="location"
      ref={rootRef}
      data-nav-theme="dark"
      className="relative bg-brown px-6 sm:px-14 lg:px-20 py-20 sm:py-28"
    >
      <div className="max-w-[1400px] mx-auto">
        {/* ---- Opening ------------------------------------------------- */}
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 mb-12 sm:mb-16">
          <div className="lg:col-span-2">
            <span className="text-cream/55 text-[9.5px] tracking-rail pl-[0.42em]">07</span>
          </div>
          <h2 className="lg:col-span-7 font-display font-light text-cream text-[clamp(1.85rem,4.2vw,3.3rem)] leading-[1.12] max-w-[20ch]">
            We only build where we would{' '}
            <span className="italic text-sand">live ourselves.</span>
          </h2>
          <p className="lg:col-span-3 lg:self-end text-cream/65 text-[13px] font-light leading-[1.9]">
            Three sites are open. Choose one to see its stage, its sizes and
            what sits within a short drive.
          </p>
        </div>

        {/* ---- Site rail ---------------------------------------------- */}
        <div data-addr-list className="border-y border-cream/20">
          <div className="grid sm:grid-cols-3">
            {ADDRESSES.map((a, i) => {
              const on = i === active
              return (
                <button
                  key={a.n}
                  data-addr-row
                  type="button"
                  onClick={() => setActive(i)}
                  aria-pressed={on}
                  className={`group relative text-left px-1 sm:px-6 py-5 sm:py-6 transition-colors duration-500 border-cream/20 sm:border-l first:sm:border-l-0 border-b sm:border-b-0 last:border-b-0 ${
                    on ? 'bg-cream/[0.07]' : 'hover:bg-cream/[0.035]'
                  }`}
                >
                  <span className="flex items-baseline gap-3">
                    <span
                      className={`text-[9.5px] tracking-wide3 transition-colors duration-500 ${
                        on ? 'text-sand' : 'text-cream/40'
                      }`}
                    >
                      {a.n}
                    </span>
                    <span
                      className={`font-display font-light leading-none text-[clamp(1.35rem,2.5vw,1.95rem)] transition-colors duration-500 ${
                        on ? 'text-cream' : 'text-cream/55 group-hover:text-cream/80'
                      }`}
                    >
                      {a.city}
                    </span>
                  </span>
                  <span className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2">
                    <span className="text-cream/45 text-[11px] font-light">
                      {a.locality}
                    </span>
                    <span
                      className={`inline-block px-2.5 py-1 text-[8.5px] tracking-wide3 uppercase ${TONE[a.tone]}`}
                    >
                      {a.status}
                    </span>
                  </span>
                  <span
                    className={`absolute left-0 right-0 -bottom-px h-px bg-sand origin-left transition-transform duration-500 ${
                      on ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                </button>
              )
            })}
          </div>
        </div>

        {/* ---- Chosen site: photograph left, everything else right ----- */}
        <div className="mt-10 sm:mt-14 grid lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          <div className="lg:col-span-7">
            <div className="relative h-[40vh] lg:h-[60vh] overflow-hidden bg-brown-deep">
              {ADDRESSES.map((a, i) => (
                <img
                  key={a.n}
                  ref={(el) => (plateRefs.current[i] = el)}
                  src={a.img}
                  alt={`Welcome Woods ${a.city}`}
                  draggable="false"
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ objectPosition: a.pos, opacity: i === 0 ? 1 : 0 }}
                />
              ))}
              <div className="absolute inset-0 ring-1 ring-inset ring-cream/15 pointer-events-none" />
            </div>
            <p className="mt-5 font-display italic text-sand/85 text-[clamp(1rem,1.8vw,1.35rem)] leading-snug max-w-[42ch]">
              {current.line}
            </p>
          </div>

          {/* All the detail, on the right, as one legible column */}
          <div className="lg:col-span-5">
            <dl className="border-t border-cream/20">
              {[
                ['Homes', current.config],
                ['Sizes', current.area],
                ['Possession', current.possession],
              ].map(([k, v]) => (
                <div
                  key={k}
                  className="flex items-baseline justify-between gap-6 py-4 border-b border-cream/15"
                >
                  <dt className="text-cream/50 text-[10px] tracking-wide3 uppercase">
                    {k}
                  </dt>
                  <dd className="font-display text-cream text-[16px] sm:text-[17px] text-right">
                    {v}
                  </dd>
                </div>
              ))}

              <div className="py-4 border-b border-cream/15">
                <div className="flex items-baseline justify-between gap-6 mb-3">
                  <dt className="text-cream/50 text-[10px] tracking-wide3 uppercase">
                    Built
                  </dt>
                  <dd className="font-display text-cream text-[16px] sm:text-[17px]">
                    {current.progress}%
                  </dd>
                </div>
                <span className="block h-px w-full bg-cream/20 overflow-hidden">
                  <span
                    ref={barRef}
                    className="block h-full w-full bg-sand origin-left"
                    style={{ transform: 'scaleX(0)' }}
                  />
                </span>
              </div>
            </dl>

            <div className="mt-8">
              <div className="text-cream/50 text-[10px] tracking-wide3 uppercase mb-1">
                Within reach
              </div>
              {current.nearby.map(([place, time]) => (
                <div
                  key={place}
                  className="flex items-baseline justify-between gap-6 py-3 border-b border-cream/15"
                >
                  <span className="text-cream/80 text-[13px] font-light">
                    {place}
                  </span>
                  <span className="font-display italic text-sand text-[15px] whitespace-nowrap">
                    {time}
                  </span>
                </div>
              ))}
            </div>

            <p className="mt-6 text-cream/40 text-[10.5px] font-light leading-relaxed">
              Localities, drive times and completion figures are indicative
              placeholders.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
