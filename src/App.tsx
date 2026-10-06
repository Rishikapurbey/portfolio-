import { Intro } from './components/Intro'
import { Nav } from './components/Nav'
import { Poster } from './components/Poster'
import { Scene } from './components/Scene'
import { about, education, experience, openSource, profile, projects, skills } from './data/profile'

export default function App() {
  return (
    <>
      <div className="grain" aria-hidden="true" />
      <div className="vignette" aria-hidden="true" />
      <Nav />

      <main id="top">
        <Intro />

        <Scene id="about" act="Act I" title="The Origin">
          <div className="about">
            <div className="about__text">
              {about.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <aside className="about__card">
              <dl>
                <dt>Education</dt>
                <dd>
                  {education.degree}
                  <span>{education.school} · {education.year}</span>
                </dd>
                <dt>Off screen</dt>
                <dd>{about.offScreen.join(' · ')}</dd>
              </dl>
            </aside>
          </div>
        </Scene>

        <Scene id="work" act="Now showing" title="Selected Work">
          <div className="posters">
            {projects.map((p, i) => (
              <Poster key={p.title} project={p} index={i} />
            ))}
          </div>
        </Scene>

        <Scene id="experience" act="Act II" title="The Journey">
          <ol className="timeline">
            {experience.map((role) => (
              <li key={role.title} className="timeline__item">
                <span className="timeline__period">{role.period}</span>
                <h3 className="timeline__role">{role.title}</h3>
                <p className="timeline__company">{role.company}</p>
              </li>
            ))}
          </ol>
        </Scene>

        <Scene id="open-source" act="Box office" title="Open Source">
          <div className="stats">
            {openSource.stats.map((s) => (
              <div key={s.label} className="stat">
                <span className="stat__value">{s.value}</span>
                <span className="stat__label">{s.label}</span>
              </div>
            ))}
          </div>
          <ul className="repos">
            {openSource.repos.map((r) => (
              <li key={r.name}>
                <span>{r.name}</span>
                <span className="repos__dots" aria-hidden="true" />
                <span>{r.prs} PRs</span>
              </li>
            ))}
            <li className="repos__more">{openSource.remainder}</li>
          </ul>
        </Scene>

        <Scene id="skills" act="Cast & crew" title="The Toolkit">
          <div className="skills">
            {skills.map((s) => (
              <div key={s.group} className="skills__group">
                <h3>{s.group}</h3>
                <ul>
                  {s.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Scene>

        <Scene id="contact" act="Final act" title="Let’s Make Something">
          <div className="contact">
            <p className="contact__lede">
              Open to interesting problems, collaborations and conversations. The fastest way to reach me is email.
            </p>
            <a className="contact__email" href={`mailto:${profile.email}`}>{profile.email}</a>
            <div className="contact__links">
              <a className="btn" href={profile.links.github} target="_blank" rel="noreferrer">GitHub</a>
            </div>
          </div>
        </Scene>
      </main>

      <footer className="footer">
        <span className="footer__end">The End</span>
        <span>Written, directed and built by {profile.name}</span>
      </footer>
    </>
  )
}
