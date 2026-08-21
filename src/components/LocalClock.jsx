import { useEffect, useRef } from 'react'

/**
 * The visitor's own wall clock, live.
 *
 * Whatever country the page is opened from, this reads their local time —
 * `Intl` resolves the zone from the device, so no lookup and no network call.
 * The hero's argument is about light through the day, and showing the reader
 * their actual hour is what connects that idea to them rather than to a
 * stock caption.
 *
 * The time is written straight to the DOM from an interval rather than held
 * in state: a `setState` every second would re-render the entire hero, slide
 * engine and all, once per tick for two glyphs of text.
 */

export function phaseFor(hour) {
  if (hour >= 5 && hour < 8) return 'FIRST LIGHT'
  if (hour >= 8 && hour < 12) return 'MORNING'
  if (hour >= 12 && hour < 16) return 'FULL AFTERNOON'
  if (hour >= 16 && hour < 19) return 'GOLDEN HOUR'
  if (hour >= 19 && hour < 21) return 'LAST LIGHT'
  return 'AFTER DARK'
}

/** Which frame best matches the hour the visitor is actually in. */
export function slideForHour(hour) {
  if (hour >= 5 && hour < 11) return 0 // first light
  if (hour >= 11 && hour < 17) return 1 // full afternoon
  return 2 // dusk and after dark
}

export default function LocalClock({ className = '', phaseClassName = '' }) {
  const hhRef = useRef(null)
  const mmRef = useRef(null)
  const phaseRef = useRef(null)
  const zoneRef = useRef(null)

  useEffect(() => {
    const pad = (n) => String(n).padStart(2, '0')

    const write = () => {
      const now = new Date()
      const h = now.getHours()
      if (hhRef.current) hhRef.current.textContent = pad(h)
      if (mmRef.current) mmRef.current.textContent = pad(now.getMinutes())
      if (phaseRef.current) phaseRef.current.textContent = phaseFor(h)
    }

    write()

    if (zoneRef.current) {
      const zone = Intl.DateTimeFormat().resolvedOptions().timeZone || ''
      // "Asia/Kolkata" -> "KOLKATA"
      zoneRef.current.textContent = (zone.split('/').pop() || zone)
        .replace(/_/g, ' ')
        .toUpperCase()
    }

    // Tick on the second so the minute rolls over exactly when it should.
    const id = setInterval(write, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className={className}>
      <div className="flex items-baseline justify-end gap-[0.14em] tabular-nums">
        <span ref={hhRef}>--</span>
        {/* The blink is what tells the reader this is their clock, live,
            and not a caption printed under a photograph. */}
        <span className="animate-blink px-[0.06em] opacity-80">:</span>
        <span ref={mmRef}>--</span>
      </div>
      <div className={phaseClassName}>
        <span ref={phaseRef}>—</span>
        <span className="opacity-45"> · </span>
        <span ref={zoneRef} className="opacity-70" />
      </div>
    </div>
  )
}
