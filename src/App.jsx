import { useCallback, useEffect, useRef, useState } from 'react'
import Hero from './sections/Hero'
import Manifesto from './sections/Manifesto'
import Highlights from './sections/Highlights'
import Reveal from './sections/Reveal'
import Residences from './sections/Residences'
import Materials from './sections/Materials'
import Amenities from './sections/Amenities'
import Addresses from './sections/Addresses'
import Enquire from './sections/Enquire'
import Footer from './sections/Footer'
import Nav from './components/Nav'
import Veil from './components/Veil'
import MenuOverlay from './components/MenuOverlay'
import HairlineFrame from './components/HairlineFrame'
import CoutureCursor from './components/CoutureCursor'
import MusicPlayer from './components/MusicPlayer'
import useSmoothScroll, { getLenis } from './lib/useSmoothScroll'

/* Decoded before the veil parts — this is what prevents any pop-in. */
const CRITICAL = [
  '/ref/ref-living-tall.jpg',
  '/ref/ref-living-warm.jpg',
  '/ref/ref-living-dusk.jpg',
]

/* The mark still needs time to draw even on a warm cache, so the veil holds
   for at least this long regardless of how fast the imagery lands. */
const MIN_VEIL_MS = 1750

function decode(src) {
  return new Promise((resolve) => {
    const img = new Image()
    img.src = src
    // decode() resolves only once the bitmap is ready to paint, which
    // onload alone does not guarantee.
    const done = () => resolve()
    if (img.decode) img.decode().then(done, done)
    else {
      img.onload = done
      img.onerror = done
    }
  })
}

export default function App() {
  const [revealed, setRevealed] = useState(false)
  const [introDone, setIntroDone] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navMarkRef = useRef(null)

  useSmoothScroll()

  useEffect(() => {
    let cancelled = false
    const started = performance.now()

    Promise.all(CRITICAL.map(decode)).then(() => {
      const waited = performance.now() - started
      const remaining = Math.max(0, MIN_VEIL_MS - waited)
      setTimeout(() => {
        if (!cancelled) setRevealed(true)
      }, remaining)
    })

    // Never strand the visitor behind the veil if a request hangs.
    const failsafe = setTimeout(() => !cancelled && setRevealed(true), 6000)

    return () => {
      cancelled = true
      clearTimeout(failsafe)
    }
  }, [])

  // The page must not scroll while the veil is still up. Both locks are
  // needed: overflow for native scrolling, and Lenis for the virtual kind.
  useEffect(() => {
    const lenis = getLenis()
    if (introDone) {
      document.body.style.overflow = ''
      lenis?.start()
    } else {
      document.body.style.overflow = 'hidden'
      lenis?.stop()
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [introDone])

  const onIntroFinished = useCallback(() => setIntroDone(true), [])
  const toggleMenu = useCallback(() => setMenuOpen((v) => !v), [])
  const closeMenu = useCallback(() => setMenuOpen(false), [])

  return (
    <div id="top" className="relative bg-cream">
      <main>
        {/* The page alternates scale on purpose: a full-bleed opening, a
            page of pure type, one photograph given the whole screen, then
            the spreads. Nothing sits at the same pitch twice in a row. */}
        <Hero revealed={revealed} />
        <Manifesto />
        <Highlights />
        <Reveal />
        <Residences />
        <Materials />
        <Amenities />
        <Addresses />
        <Enquire />
      </main>

      <Footer />

      <Nav
        navMarkRef={navMarkRef}
        revealed={introDone}
        menuOpen={menuOpen}
        onToggleMenu={toggleMenu}
      />

      <MenuOverlay open={menuOpen} onClose={closeMenu} />

      <HairlineFrame revealed={introDone} />

      <MusicPlayer revealed={introDone} menuOpen={menuOpen} />

      <Veil revealed={revealed} navMarkRef={navMarkRef} onFinished={onIntroFinished} />

      <CoutureCursor />
      <div className="grain" />
    </div>
  )
}
