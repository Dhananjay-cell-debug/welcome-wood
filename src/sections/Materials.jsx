import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from '../lib/pointer'
import useIsDesktop from '../lib/useIsDesktop'

const MATERIALS = [
  {
    n: '01',
    name: 'Honed Marble',
    body: 'Cut from a single block, so the veining runs on across every wall it meets instead of restarting at each joint.',
    img: '/ref/ref-kitchen.jpg',
    pos: 'center 50%',
  },
  {
    n: '02',
    name: 'European Oak',
    body: 'Rift-sawn for a straight, quiet grain. Oiled by hand and left unsealed, so it is allowed to move as timber does.',
    img: '/estate/ww-living-room.jpg',
    pos: 'center 44%',
  },
  {
    n: '03',
    name: 'Unlacquered Brass',
    body: 'It will darken where hands fall most often, and keep that record. We consider this a property of the material, not a fault in it.',
    img: '/ref/ref-staircase.jpg',
    pos: 'center 55%',
  },
  {
    n: '04',
    name: 'Washed Linen',
    body: 'Loose-woven and washed twice before it is hung, so it falls properly from the first day rather than the fiftieth.',
    img: '/ref/ref-bedroom.jpg',
    pos: 'center 40%',
  },
]

function Heading() {
  return (
    <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 mb-10 sm:mb-14">
      <div className="lg:col-span-2">
        <span className="text-brown/60 text-[9.5px] tracking-rail pl-[0.42em]">05</span>
      </div>
      <h2 className="lg:col-span-6 font-display font-light text-espresso text-[clamp(1.85rem,4.6vw,3.4rem)] leading-[1.1]">
        Four materials, <span className="italic text-brown">chosen once.</span>
      </h2>
      <p className="lg:col-span-4 lg:self-end text-muted text-[13.5px] font-light leading-[1.9] max-w-[38ch]">
        The same four run through every residence. Nothing is substituted floor
        by floor, and nothing is upgraded at extra cost.
      </p>
    </div>
  )
}

/* ---- Mobile ---------------------------------------------------------
   A sticky plate paired with a long scrolling index is a desktop idea. On a
   phone the image pins while the text crawls past it and the two never line
   up — which is exactly how it read. Here each material is simply its own
   card: image, numeral, name, rule, text. One complete thing per screen, and
   nothing pinned. */
function MobileStack() {
  const rootRef = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.utils.toArray('[data-mat-card]').forEach((card) => {
        gsap.fromTo(
          card.querySelector('[data-mat-veil]'),
          { scaleY: 1 },
          {
            scaleY: 0,
            duration: 1.3,
            ease: 'power3.inOut',
            scrollTrigger: { trigger: card, start: 'top 86%' },
          }
        )
        gsap.fromTo(
          card.querySelectorAll('[data-mat-copy] > *'),
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.95,
            ease: 'power3.out',
            stagger: 0.07,
            scrollTrigger: { trigger: card, start: 'top 80%' },
          }
        )
      })
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={rootRef} className="space-y-14">
      {MATERIALS.map((m) => (
        <article key={m.n} data-mat-card>
          <div className="relative aspect-[4/5] overflow-hidden bg-beige/40">
            <img
              src={m.img}
              alt={m.name}
              draggable="false"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ objectPosition: m.pos }}
            />
            <div
              data-mat-veil
              className="absolute inset-0 bg-cream-deep origin-bottom"
            />
            <span className="absolute top-4 left-4 text-cream text-[9.5px] tracking-wide3">
              {m.n} / 04
            </span>
          </div>

          <div data-mat-copy className="mt-6">
            <h3 className="font-display font-light text-espresso text-[1.75rem] leading-tight">
              {m.name}
            </h3>
            <span className="block h-px w-14 bg-brown/60 my-4" />
            <p className="text-muted text-[13.5px] font-light leading-[1.9] max-w-[42ch]">
              {m.body}
            </p>
          </div>
        </article>
      ))}
    </div>
  )
}

/* ---- Desktop --------------------------------------------------------
   Here the sticky plate earns its keep: there is room for a tall image to
   hold still while the index moves past it. */
function DesktopSticky() {
  const rootRef = useRef(null)
  const [active, setActive] = useState(0)
  const plateRefs = useRef([])

  useEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.utils.toArray('[data-material]').forEach((el, i) => {
        ScrollTrigger.create({
          trigger: el,
          start: 'top 60%',
          end: 'bottom 60%',
          onToggle: (self) => self.isActive && setActive(i),
        })
      })
    }, rootRef)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (prefersReducedMotion()) return
    plateRefs.current.forEach((el, i) => {
      if (!el) return
      gsap.to(el, {
        opacity: i === active ? 1 : 0,
        scale: i === active ? 1 : 1.05,
        duration: 1.1,
        ease: 'power3.out',
        overwrite: 'auto',
      })
    })
  }, [active])

  return (
    <div ref={rootRef} className="grid lg:grid-cols-12 gap-16 items-start">
      <div className="lg:col-span-7 lg:sticky lg:top-[9vh]">
        <div className="relative h-[80vh] overflow-hidden bg-beige/40">
          {MATERIALS.map((m, i) => (
            <img
              key={m.n}
              ref={(el) => (plateRefs.current[i] = el)}
              src={m.img}
              alt={m.name}
              draggable="false"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ objectPosition: m.pos, opacity: i === 0 ? 1 : 0 }}
            />
          ))}
        </div>

        <div className="mt-5 flex items-center gap-3">
          {MATERIALS.map((m, i) => (
            <span
              key={m.n}
              className={`h-px transition-all duration-700 ease-out ${
                i === active ? 'w-12 bg-brown' : 'w-5 bg-brown/30'
              }`}
            />
          ))}
          <span className="ml-auto text-brown/60 text-[9.5px] tracking-wide2">
            {MATERIALS[active].n} / 04
          </span>
        </div>
      </div>

      <ol className="lg:col-span-5 lg:pt-[8vh] lg:pb-[26vh] space-y-40">
        {MATERIALS.map((m, i) => (
          <li key={m.n} data-material>
            <div
              className={`transition-opacity duration-700 ${
                i === active ? 'opacity-100' : 'opacity-40'
              }`}
            >
              <span className="block text-brown/60 text-[9px] tracking-wide2 mb-4">
                {m.n}
              </span>
              <h3 className="font-display font-light text-espresso text-[clamp(1.7rem,3.2vw,2.6rem)] leading-tight">
                {m.name}
              </h3>
              <span
                className={`block h-px bg-brown/60 my-6 origin-left transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  i === active ? 'scale-x-100' : 'scale-x-0'
                }`}
              />
              <p className="max-w-[36ch] text-muted text-[14.5px] font-light leading-[1.95]">
                {m.body}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}

export default function Materials() {
  const isDesktop = useIsDesktop()

  return (
    <section
      id="interiors"
      data-nav-theme="light"
      className="relative bg-cream-deep px-6 sm:px-14 lg:px-20 pt-20 sm:pt-28 pb-20 sm:pb-28"
    >
      <div className="max-w-[1400px] mx-auto">
        <Heading />
        {isDesktop ? <DesktopSticky /> : <MobileStack />}
      </div>
    </section>
  )
}
