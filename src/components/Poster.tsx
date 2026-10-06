import type { Project } from '../data/profile'
import { useReveal } from '../hooks/useReveal'

export function Poster({ project, index }: { project: Project; index: number }) {
  const ref = useReveal<HTMLElement>(0.2)
  return (
    <article ref={ref} className={`poster poster--${project.theme} reveal`} style={{ transitionDelay: `${index * 0.12}s` }}>
      <div className="poster__art">
        <span className="poster__genre">{project.genre}</span>
        <h3 className="poster__title">{project.title}</h3>
        <p className="poster__logline">{project.logline}</p>
      </div>
      <div className="poster__body">
        <ul className="poster__highlights">
          {project.highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
        <p className="poster__credits">
          <span>Starring</span> {project.stack.join(' · ')}
        </p>
        <div className="poster__actions">
          {project.live && (
            <a className="btn btn--primary" href={project.live} target="_blank" rel="noreferrer">
              Watch live
            </a>
          )}
          <a className="btn" href={project.source} target="_blank" rel="noreferrer">
            Source
          </a>
        </div>
      </div>
    </article>
  )
}
