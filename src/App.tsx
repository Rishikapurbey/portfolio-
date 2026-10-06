import { useEffect, useState, type ReactNode } from 'react'
import { about, contacts, education, experience, openSource, profile, projects, skills } from './data/profile'
import { useReveal } from './hooks/useReveal'
import { Board } from './components/Board'

const SECTIONS = [
  { id: 'ch-opening', move: '1. e4', name: 'The Opening' },
  { id: 'ch-development', move: '2. Nf3', name: 'Development' },
  { id: 'ch-castle', move: '3. O-O', name: 'Castled' },
  { id: 'ch-middlegame', move: '4. Rd1', name: 'Middlegame' },
  { id: 'ch-pieces', move: '5. Qe2', name: 'The Pieces' },
  { id: 'ch-record', move: '6. Bb3', name: 'Game Record' },
  { id: 'ch-endgame', move: '7. ?', name: 'Your Move' },
]

const PIECE_FOR_GROUP = ['♛︎', '♜︎', '♝︎']

function Section({ index, children }: { index: number; children: ReactNode }) {
  const ref = useReveal<HTMLElement>(0.15)
  const s = SECTIONS[index]
  return (
    <section id={s.id} ref={ref} className="ch-section ch-reveal" aria-labelledby={`${s.id}-t`}>
      <p className="ch-move">{s.move}</p>
      <h2 id={`${s.id}-t`}>{s.name}</h2>
      {children}
    </section>
  )
}

export default function App() {
  const [current, setCurrent] = useState(SECTIONS[0].id)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setCurrent(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <div className="ch">
      <header className="ch-hero">
        <div className="ch-hero__text">
          <p className="ch-eyebrow">White to move</p>
          <h1>{profile.name}</h1>
          <p className="ch-hero__role">{profile.role} · {experience[0].company} · {profile.location}</p>
          <p className="ch-hero__tagline">
            Every move <em>considered</em>. {profile.tagline}
          </p>
          <div className="ch-hero__actions">
            <a className="ch-btn" href="#ch-opening">Start the game ↓</a>
            <a className="ch-btn ch-btn--ghost" href="#ch-record">Résumé</a>
          </div>
        </div>
        <Board />
      </header>

      <div className="ch-layout">
        <aside className="ch-scoresheet" aria-label="Sections">
          <p className="ch-scoresheet__title">Score sheet</p>
          <ol>
            {SECTIONS.map((s) => (
              <li key={s.id} className={s.id === current ? 'is-current' : ''}>
                <a href={`#${s.id}`}>
                  <span>{s.move}</span>
                  {s.name}
                </a>
              </li>
            ))}
          </ol>
        </aside>

        <main className="ch-main">
          <Section index={0}>
            <div className="ch-opening">
              <div className="ch-prose">
                {about.paragraphs.map((p) => <p key={p}>{p}</p>)}
              </div>
              <figure className="ch-portrait">
                <img src={profile.photo} alt={profile.name} width={694} height={880} loading="lazy" />
                <figcaption>♔&#xFE0E; The player</figcaption>
              </figure>
            </div>
            <p className="ch-annotation">
              <span>!!</span> {education.degree}, {education.school}, {education.year} · CGPA {education.cgpa}.
            </p>
          </Section>

          <Section index={1}>
            <div className="ch-projects">
              {projects.map((p) => (
                <article key={p.title} className={`ch-project ch-project--${p.theme}`}>
                  <span className="ch-project__piece" aria-hidden="true">{p.theme === 'emerald' ? '♞︎' : '♝︎'}</span>
                  <p className="ch-eyebrow">{p.genre}</p>
                  <h3>{p.title}</h3>
                  <p>{p.logline}</p>
                  <ul>
                    {p.highlights.map((h) => <li key={h}>{h}</li>)}
                  </ul>
                  <p className="ch-project__stack">{p.stack.join(' · ')}</p>
                  <div className="ch-project__links">
                    {p.live && <a className="ch-btn" href={p.live} target="_blank" rel="noreferrer">Play it live</a>}
                    <a className="ch-btn ch-btn--ghost" href={p.source} target="_blank" rel="noreferrer">Source</a>
                  </div>
                </article>
              ))}
            </div>
          </Section>

          <Section index={2}>
            <ol className="ch-timeline">
              {experience.map((r) => (
                <li key={r.title}>
                  <span className="ch-timeline__period">{r.period}</span>
                  <strong>{r.title}</strong>
                  <span>{r.company}</span>
                </li>
              ))}
            </ol>
          </Section>

          <Section index={3}>
            <div className="ch-stats">
              {openSource.stats.map((s) => (
                <div key={s.label}>
                  <strong>{s.value}</strong>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
            <h3 className="ch-subhead">Notable contributions</h3>
            <div className="ch-highlights">
              {openSource.highlights.map((h) => (
                <a key={h.pr} className="ch-highlight" href={h.pr} target="_blank" rel="noreferrer">
                  <span className="ch-highlight__kind">{h.kind}</span>
                  <p>{h.text}</p>
                  <span className="ch-highlight__ref">{h.project} #{h.pr.split('/').pop()} ↗</span>
                </a>
              ))}
            </div>
            <h3 className="ch-subhead">Merged PRs by project</h3>
            <ul className="ch-repos">
              {openSource.repos.map((r) => (
                <li key={r.name}>
                  <span>{r.name}</span>
                  <span className="ch-repos__pips" aria-label={`${r.prs} pull requests`}>
                    {Array.from({ length: r.prs }, (_, i) => <i key={i} />)}
                  </span>
                  <b>{r.prs}</b>
                </li>
              ))}
            </ul>
            <p className="ch-annotation"><span>+</span> {openSource.remainder}</p>
          </Section>

          <Section index={4}>
            <div className="ch-pieces">
              {skills.map((s, i) => (
                <div key={s.group} className="ch-piece-card">
                  <span aria-hidden="true">{PIECE_FOR_GROUP[i]}</span>
                  <h3>{s.group}</h3>
                  <p>{s.items.join(', ')}</p>
                </div>
              ))}
            </div>
            <p className="ch-annotation"><span>♟</span> Off the board: {about.offScreen.join(', ')}.</p>
          </Section>

          <Section index={5}>
            <div className="ch-record">
              <div className="ch-record__sheet" aria-hidden="true">
                <span className="ch-record__name">{profile.name}</span>
                <span className="ch-record__role">{profile.role}</span>
                {Array.from({ length: 9 }, (_, i) => <i key={i} />)}
              </div>
              <div className="ch-record__text">
                <p>The full game, move by move: experience, projects, education and achievements on one page.</p>
                {profile.resume ? (
                  <div className="ch-project__links">
                    <a className="ch-btn" href={profile.resume} download>Download résumé (PDF)</a>
                    <a className="ch-btn ch-btn--ghost" href={profile.resume} target="_blank" rel="noreferrer">View in browser</a>
                  </div>
                ) : (
                  <span className="ch-btn ch-btn--disabled" aria-disabled="true">Résumé PDF coming soon</span>
                )}
              </div>
            </div>
          </Section>

          <Section index={6}>
            <p className="ch-endgame">The board is set. It’s your move.</p>
            <ul className="ch-contacts">
              {contacts.map((c) => (
                <li key={c.label}>
                  <a href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
                    <span className="ch-contacts__label">{c.label}</span>
                    <span className="ch-contacts__value">{c.value}</span>
                    <span className="ch-contacts__arrow" aria-hidden="true">→</span>
                  </a>
                </li>
              ))}
            </ul>
          </Section>
        </main>
      </div>

      <footer className="ch-footer">1–0 · {profile.name}</footer>
    </div>
  )
}
