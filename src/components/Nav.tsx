import { useEffect, useState } from 'react'

const LINKS = [
  { href: '#about', label: 'About' },
  { href: '#work', label: 'Work' },
  { href: '#experience', label: 'Experience' },
  { href: '#open-source', label: 'Open source' },
  { href: '#contact', label: 'Contact' },
]

export function Nav() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? window.scrollY / max : 0)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <nav className="nav" aria-label="Sections">
      <a className="nav__mark" href="#top" aria-label="Back to top">RP</a>
      <ul className="nav__links">
        {LINKS.map((l) => (
          <li key={l.href}>
            <a href={l.href}>{l.label}</a>
          </li>
        ))}
      </ul>
      <div className="nav__reel" aria-hidden="true">
        <div className="nav__reel-fill" style={{ transform: `scaleX(${progress})` }} />
      </div>
    </nav>
  )
}
