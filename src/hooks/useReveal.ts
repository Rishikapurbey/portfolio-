import { useEffect, useRef } from 'react'

// Adds `is-visible` to the element the first time it scrolls into view.
export function useReveal<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible')
          observer.disconnect()
        }
      },
      { threshold },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return ref
}
