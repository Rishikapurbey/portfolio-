import { useEffect, useState } from 'react'

type Section = { id: string; move: string; name: string }

// Phone-only score sheet: a floating pill showing the current move that opens the full list.
export function MobileNav({ sections, current }: { sections: Section[]; current: string }) {
  const [open, setOpen] = useState(false)
  const [visible, setVisible] = useState(false)
  const active = sections.find((s) => s.id === current) ?? sections[0]

  useEffect(() => {
    const update = () => setVisible(window.scrollY > window.innerHeight * 0.6)
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <div className={`ch-mnav${visible || open ? ' is-visible' : ''}${open ? ' is-open' : ''}`}>
      <div className="ch-mnav__backdrop" onClick={() => setOpen(false)} aria-hidden="true" />
      <nav id="ch-mnav-sheet" className="ch-mnav__sheet" aria-label="Sections" aria-hidden={!open}>
        <p className="ch-mnav__title">Score sheet</p>
        <ol>
          {sections.map((s) => (
            <li key={s.id} className={s.id === current ? 'is-current' : ''}>
              <a href={`#${s.id}`} tabIndex={open ? 0 : -1} onClick={() => setOpen(false)}>
                <span>{s.move}</span>
                {s.name}
              </a>
            </li>
          ))}
        </ol>
      </nav>
      <button
        type="button"
        className="ch-mnav__pill"
        aria-expanded={open}
        aria-controls="ch-mnav-sheet"
        onClick={() => setOpen((o) => !o)}
      >
        <span className="ch-mnav__piece" aria-hidden="true">♞&#xFE0E;</span>
        <span className="ch-mnav__move">{active.move}</span>
        <span className="ch-mnav__name">{active.name}</span>
        <span className="ch-mnav__chevron" aria-hidden="true">▴</span>
      </button>
    </div>
  )
}
