import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { prefersReducedMotion } from '../lib/pointer'

const TRACK_SRC = '/audio/ambient-piano.mp3'
const TARGET_VOLUME = 0.34

/**
 * A single note of ambience, opt-in.
 *
 * Browsers block audio with sound until the visitor has actually gestured —
 * a scroll doesn't count, only a click or tap does — so this can never
 * autoplay under the scroll. Instead it arrives last, after the nav has
 * settled, and invites the click with a slow pulse for its first few
 * seconds. One tap after that: the piece fades in underneath the whole
 * scroll and loops, fading out just as gently on pause.
 *
 * The glass pill carries its own dark ground (same recipe as the nav pane),
 * so it stays legible over both photography and beige without needing the
 * nav's depth-sorted theme detection.
 */
export default function MusicPlayer({ revealed, menuOpen }) {
  const rootRef = useRef(null)
  const audioRef = useRef(null)
  const volume = useRef({ v: 0 })
  const [playing, setPlaying] = useState(false)
  const [primed, setPrimed] = useState(false)
  const [invite, setInvite] = useState(true)

  useEffect(() => {
    if (!revealed) return
    if (prefersReducedMotion()) {
      gsap.set(rootRef.current, { opacity: 1, y: 0 })
      return
    }
    const tween = gsap.fromTo(
      rootRef.current,
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out', delay: 2.1 }
    )
    return () => tween.kill()
  }, [revealed])

  // The invite pulse is a first impression only — it stops on its own so it
  // never nags a visitor who has simply chosen to browse in silence.
  useEffect(() => {
    if (!revealed) return
    const t = setTimeout(() => setInvite(false), 9000)
    return () => clearTimeout(t)
  }, [revealed])

  useEffect(() => {
    const audio = audioRef.current
    // Starts silent, always — the fade-in tween is what raises it, and that
    // first tick shouldn't have to race the element's own default of 1.
    if (audio) audio.volume = 0
    return () => {
      audio?.pause()
    }
  }, [])

  const fadeVolume = (target, duration, onComplete) => {
    gsap.to(volume.current, {
      v: target,
      duration,
      ease: 'power2.out',
      overwrite: true,
      onUpdate: () => {
        if (audioRef.current) audioRef.current.volume = volume.current.v
      },
      onComplete,
    })
  }

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return
    setPrimed(true)
    setInvite(false)

    if (playing) {
      fadeVolume(0, 0.7, () => audio.pause())
      setPlaying(false)
      return
    }

    audio
      .play()
      .then(() => fadeVolume(TARGET_VOLUME, 1.7))
      .catch(() => setPlaying(false))
    setPlaying(true)
  }

  const label = playing ? 'SOUND ON' : 'PLAY SOUND'

  return (
    <>
      <audio ref={audioRef} src={TRACK_SRC} loop preload="none" />
      <button
        ref={rootRef}
        type="button"
        onClick={toggle}
        aria-pressed={playing}
        aria-label={playing ? 'Pause the ambient music' : 'Play ambient music'}
        className={`fixed z-[55] flex items-center overflow-hidden opacity-0 pointer-events-auto group transition-shadow duration-500 ${
          invite && !primed ? 'music-invite' : ''
        } ${menuOpen ? 'invisible' : ''}`}
        style={{
          right: 'calc(var(--frame-inset) + 22px)',
          bottom: 'calc(var(--frame-inset) + 22px)',
          height: 46,
          padding: '0 16px',
          borderRadius: 9999,
          background: 'rgba(43, 30, 19, 0.4)',
          border: '1px solid rgba(237, 232, 208, 0.3)',
          backdropFilter: 'blur(14px) saturate(1.3)',
          WebkitBackdropFilter: 'blur(14px) saturate(1.3)',
          boxShadow: '0 6px 24px rgba(20, 12, 6, 0.28)',
        }}
      >
        <span className="flex items-end gap-[3px] h-[15px] shrink-0" aria-hidden="true">
          <span
            className={`eq-bar ${playing ? 'is-playing' : ''}`}
            style={{ animationDelay: '0ms' }}
          />
          <span
            className={`eq-bar ${playing ? 'is-playing' : ''}`}
            style={{ animationDelay: '180ms' }}
          />
          <span
            className={`eq-bar ${playing ? 'is-playing' : ''}`}
            style={{ animationDelay: '90ms' }}
          />
        </span>
        <span
          className={`text-cream/85 text-[9.5px] tracking-wide3 font-light whitespace-nowrap transition-all duration-700 ${
            invite && !primed
              ? 'max-w-[110px] opacity-100 ml-2.5'
              : 'max-w-0 opacity-0 ml-0 group-hover:max-w-[110px] group-hover:opacity-100 group-hover:ml-2.5'
          }`}
        >
          {label}
        </span>
      </button>
    </>
  )
}
