import type { ReactNode } from 'react'
import { useReveal } from '../hooks/useReveal'

type Props = {
  id: string
  act: string
  title: string
  children: ReactNode
}

export function Scene({ id, act, title, children }: Props) {
  const ref = useReveal<HTMLElement>(0.12)
  return (
    <section id={id} ref={ref} className="scene reveal" aria-labelledby={`${id}-title`}>
      <header className="scene__header">
        <span className="scene__act">{act}</span>
        <h2 id={`${id}-title`} className="scene__title">{title}</h2>
      </header>
      {children}
    </section>
  )
}
