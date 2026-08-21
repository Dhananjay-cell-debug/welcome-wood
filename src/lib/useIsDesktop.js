import { useEffect, useState } from 'react'

/**
 * True at the `lg` breakpoint and above.
 *
 * Used where mobile and desktop need genuinely different structures rather
 * than the same structure restyled — rendering one or the other in JS keeps a
 * single copy of each image in the DOM, instead of shipping both layouts and
 * hiding one with `display:none` (which some browsers still fetch).
 */
export default function useIsDesktop(query = '(min-width: 1024px)') {
  const [is, setIs] = useState(() =>
    typeof window === 'undefined' ? true : window.matchMedia(query).matches
  )

  useEffect(() => {
    const mq = window.matchMedia(query)
    const on = () => setIs(mq.matches)
    on()
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [query])

  return is
}
