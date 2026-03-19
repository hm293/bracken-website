'use client'

import { useEffect, useRef } from 'react'

type AnimationType = 'animate' | 'animate-stagger' | 'animate-cards'

export function ScrollReveal({
  children,
  type = 'animate',
  className = '',
}: {
  children: React.ReactNode
  type?: AnimationType
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('revealed')
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const attr =
    type === 'animate'
      ? { 'data-animate': '' }
      : type === 'animate-stagger'
        ? { 'data-animate-stagger': '' }
        : { 'data-animate-cards': '' }

  return (
    <div ref={ref} className={className} {...attr}>
      {children}
    </div>
  )
}
