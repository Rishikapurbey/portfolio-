import { useEffect, useState } from 'react'
import { profile } from '../data/profile'

const COUNTDOWN = [3, 2, 1]
const TICK_MS = 550
const SEEN_KEY = 'leader-seen'

function shouldPlayLeader() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
  try {
    return sessionStorage.getItem(SEEN_KEY) !== '1'
  } catch {
    return true
  }
}

// Opening titles. On the first visit of a session a short film-leader countdown plays first.
export function Intro() {
  const [count, setCount] = useState<number | null>(() => (shouldPlayLeader() ? 0 : null))

  useEffect(() => {
    if (count === null) return
    const timer = setTimeout(() => {
      setCount((c) => (c === null || c >= COUNTDOWN.length - 1 ? null : c + 1))
    }, TICK_MS)
    return () => clearTimeout(timer)
  }, [count])

  useEffect(() => {
    if (count !== null) return
    try {
      sessionStorage.setItem(SEEN_KEY, '1')
    } catch {
      // Storage can be blocked; the leader just plays again next time.
    }
  }, [count])

  if (count !== null) {
    return (
      <div className="leader" onClick={() => setCount(null)} role="presentation">
        <div className="leader__ring" key={count}>
          <span className="leader__number">{COUNTDOWN[count]}</span>
        </div>
        <span className="leader__skip">Click to skip</span>
      </div>
    )
  }

  const [first, last] = profile.name.toUpperCase().split(' ')

  return (
    <section className="intro" aria-label="Introduction">
      <p className="intro__presents">A portfolio presentation</p>
      <h1 className="intro__name" aria-label={profile.name}>
        {[first, last].map((word, w) => (
          <span key={word} className="intro__word" aria-hidden="true">
            {word.split('').map((letter, i) => (
              <span key={i} className="intro__letter" style={{ animationDelay: `${0.3 + (w * 6 + i) * 0.06}s` }}>
                {letter}
              </span>
            ))}
          </span>
        ))}
      </h1>
      <p className="intro__role">
        {profile.role}
        <span className="intro__dot">·</span>
        Builder
        <span className="intro__dot">·</span>
        Open-source contributor
      </p>
      <p className="intro__tagline">{profile.tagline}</p>
      <a className="intro__cue" href="#about">
        <span>Scroll to begin</span>
        <span className="intro__cue-line" aria-hidden="true" />
      </a>
    </section>
  )
}
