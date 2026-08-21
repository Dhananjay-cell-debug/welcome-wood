import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from '../lib/pointer'

const CONFIGS = ['2 BHK', '3 BHK', '4 BHK', 'Not sure yet']

function Field({ label, children }) {
  return (
    <label data-field className="block group">
      <span className="block text-brown text-[10.5px] tracking-wide3 mb-3 transition-colors duration-400 group-focus-within:text-gilt">
        {label}
      </span>
      {children}
    </label>
  )
}

const inputClass =
  'w-full bg-transparent border-0 border-b border-brown/35 pb-3 text-espresso text-[16px] font-normal ' +
  'placeholder:text-brown/45 focus:outline-none focus:border-brown transition-colors duration-400'

/**
 * The conversion point. Underlined fields on cream, a real configuration
 * picker, and an explicit site-visit option — the two things an enquiry form
 * for a development actually needs to capture.
 */
export default function Enquire() {
  const rootRef = useRef(null)
  const [status, setStatus] = useState('idle') // idle | sending | sent
  const [wantsVisit, setWantsVisit] = useState(true)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-field], [data-enq]',
        { y: 26, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.05,
          ease: 'power3.out',
          stagger: 0.07,
          scrollTrigger: { trigger: rootRef.current, start: 'top 74%' },
        }
      )
    }, rootRef)
    return () => ctx.revert()
  }, [])

  const onSubmit = (e) => {
    e.preventDefault()
    if (status !== 'idle') return
    setStatus('sending')
    // No backend is wired yet — this demonstrates the state transitions only.
    setTimeout(() => setStatus('sent'), 1400)
  }

  return (
    <section
      data-nav-theme="light"
      id="enquire"
      ref={rootRef}
      className="relative overflow-hidden bg-cream-deep px-8 sm:px-14 lg:px-20 py-24 sm:py-32"
    >
      <div className="relative max-w-[1100px] mx-auto grid lg:grid-cols-[0.85fr_1fr] gap-14 lg:gap-24">
        <div>
          <span data-enq className="block text-brown text-[9.5px] tracking-rail pl-[0.42em] mb-5">
            10 — ENQUIRE
          </span>
          <h2
            data-enq
            className="font-display font-light text-espresso text-[clamp(2rem,4.6vw,3.4rem)] leading-[1.1] max-w-[13ch]"
          >
            Come and see it{' '}
            <span className="italic text-brown">in person.</span>
          </h2>
          <p data-enq className="mt-8 max-w-[34ch] text-espresso/85 text-[14px] font-light leading-[1.9]">
            Private viewings are held on weekday mornings and through Saturday.
            Leave your details and we will arrange a time that suits you.
          </p>

          <div data-enq className="mt-12 space-y-5">
            <div>
              <div className="text-brown text-[10.5px] tracking-wide3 mb-2">CALL</div>
              <a
                href="tel:+910000000000"
                className="font-display text-espresso text-lg hover:text-gilt transition-colors duration-400"
              >
                +91 00000 00000
              </a>
            </div>
            <div>
              <div className="text-brown text-[10.5px] tracking-wide3 mb-2">EMAIL</div>
              <a
                href="mailto:hello@welcomewoods.com"
                className="font-display text-espresso text-lg hover:text-gilt transition-colors duration-400"
              >
                hello@welcomewoods.com
              </a>
            </div>
          </div>
        </div>

        <form onSubmit={onSubmit} className="space-y-9">
          <div className="grid sm:grid-cols-2 gap-9">
            <Field label="FULL NAME">
              <input required name="name" className={inputClass} placeholder="Your name" />
            </Field>
            <Field label="PHONE">
              <input
                required
                name="phone"
                type="tel"
                className={inputClass}
                placeholder="+91"
              />
            </Field>
          </div>

          <Field label="EMAIL">
            <input
              required
              name="email"
              type="email"
              className={inputClass}
              placeholder="you@example.com"
            />
          </Field>

          <Field label="CONFIGURATION OF INTEREST">
            <div className="flex flex-wrap gap-2.5 pt-1">
              {CONFIGS.map((c) => (
                <label key={c} className="cursor-pointer">
                  <input type="radio" name="config" value={c} className="peer sr-only" />
                  <span className="block px-5 py-2.5 border border-brown/35 text-muted text-[11.5px] tracking-wide3 transition-all duration-400 hover:border-brown/50 peer-checked:bg-espresso peer-checked:text-cream peer-checked:border-espresso">
                    {c}
                  </span>
                </label>
              ))}
            </div>
          </Field>

          <Field label="MESSAGE">
            <textarea
              name="message"
              rows={3}
              className={`${inputClass} resize-none`}
              placeholder="Anything you would like us to know"
            />
          </Field>

          <button
            type="button"
            onClick={() => setWantsVisit((v) => !v)}
            data-field
            className="flex items-center gap-3.5 group"
            aria-pressed={wantsVisit}
          >
            <span
              className={`relative h-4 w-4 border transition-colors duration-400 ${
                wantsVisit ? 'bg-espresso border-espresso' : 'border-beige'
              }`}
            >
              <svg
                viewBox="0 0 16 16"
                className={`absolute inset-0 transition-opacity duration-300 ${
                  wantsVisit ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <path
                  d="M3.5 8.5 L6.5 11.5 L12.5 4.5"
                  fill="none"
                  stroke="#EDE8D0"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className="text-espresso text-[13.5px] font-light">
              I would like to book a site visit
            </span>
          </button>

          <div data-field className="pt-2">
            <button
              type="submit"
              disabled={status !== 'idle'}
              className="group relative overflow-hidden w-full sm:w-auto px-11 py-[17px] bg-espresso text-cream text-[10.5px] tracking-wide2 disabled:opacity-70 transition-colors duration-500"
            >
              <span className="relative z-10">
                {status === 'idle' && 'SEND ENQUIRY'}
                {status === 'sending' && 'SENDING…'}
                {status === 'sent' && 'THANK YOU — WE WILL BE IN TOUCH'}
              </span>
              {status === 'idle' && (
                <span className="absolute inset-0 bg-gilt origin-bottom scale-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100" />
              )}
            </button>

            <p className="mt-5 text-brown/70 text-[11.5px] font-light leading-relaxed">
              This form is a front-end demonstration and is not yet connected
              to a mailbox or CRM.
            </p>
          </div>
        </form>
      </div>
    </section>
  )
}
