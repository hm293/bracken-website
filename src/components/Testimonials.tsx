'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { ScrollReveal } from './ui/ScrollReveal'

interface Testimonial {
  id: string
  quote: string
  attribution: string
  sortOrder: number
}

interface TestimonialsProps {
  testimonials: Testimonial[]
}

export function Testimonials({ testimonials }: TestimonialsProps) {
  const carouselRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const sorted = [...testimonials].sort((a, b) => a.sortOrder - b.sortOrder)

  useEffect(() => {
    const carousel = carouselRef.current
    if (!carousel) return

    const cards = carousel.querySelectorAll('.testimonial-card')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            const index = Array.from(cards).indexOf(entry.target as Element)
            if (index !== -1) setActiveIndex(index)
          }
        })
      },
      { root: carousel, threshold: 0.5 },
    )

    cards.forEach((card) => observer.observe(card))
    return () => observer.disconnect()
  }, [sorted.length])

  const scrollToCard = (index: number) => {
    const carousel = carouselRef.current
    if (!carousel) return
    const cards = carousel.querySelectorAll('.testimonial-card')
    const card = cards[index] as HTMLElement
    if (!card) return
    const scrollLeft = card.offsetLeft - carousel.offsetLeft - 8
    carousel.scrollTo({ left: scrollLeft, behavior: 'smooth' })
  }

  return (
    <section id="testimonials" className="relative py-20 md:py-30 grain-overlay">
      {/* Fern watermark */}
      <Image
        src="/brand_assets/cropped/bracken roots name text with plant.svg"
        alt=""
        width={200}
        height={300}
        className="watermark-bg left-6 top-1/2 -translate-y-1/2 h-[300px] w-auto opacity-[0.06]"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">
        <ScrollReveal className="text-center mb-14">
          <p className="font-sans text-xs font-medium uppercase tracking-[0.15em] text-bracken-taupe mb-4">
            Kind Words
          </p>
          <h2 className="text-4xl md:text-5xl text-deep-earth">Testimonials</h2>
        </ScrollReveal>

        <ScrollReveal className="relative testimonial-wrapper">
          {/* Nav arrows (desktop only) */}
          <button
            onClick={() => activeIndex > 0 && scrollToCard(activeIndex - 1)}
            className="testimonial-nav prev"
            aria-label="Previous testimonial"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#6B5E52" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 2L4 8l6 6" />
            </svg>
          </button>
          <button
            onClick={() => activeIndex < sorted.length - 1 && scrollToCard(activeIndex + 1)}
            className="testimonial-nav next"
            aria-label="Next testimonial"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#6B5E52" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2l6 6-6 6" />
            </svg>
          </button>

          <div
            ref={carouselRef}
            className="testimonial-scroll flex gap-8 overflow-x-auto pb-6 px-2 snap-x snap-mandatory -mx-2"
          >
            {sorted.map((t) => (
              <div
                key={t.id}
                className="testimonial-card flex-shrink-0 w-[85vw] md:w-[45vw] lg:w-[35vw] bg-ritual-cream p-8 md:p-10 rounded-sm shadow-brand border border-soft-linen relative"
              >
                <span
                  className="absolute -top-6 -left-2 font-display text-[100px] leading-none text-soft-linen select-none pointer-events-none"
                  aria-hidden="true"
                >
                  &ldquo;
                </span>
                <Image
                  src="/brand_assets/cropped/brown logo no sun.svg"
                  alt=""
                  width={40}
                  height={40}
                  className="absolute bottom-4 right-4 h-10 w-10 opacity-[0.07] pointer-events-none select-none"
                  aria-hidden="true"
                />
                <blockquote className="relative z-10">
                  <p className="font-body text-stone text-base italic leading-relaxed mb-6">
                    {t.quote}
                  </p>
                  <footer className="font-sans text-xs uppercase tracking-[0.1em] text-bracken-taupe">
                    — {t.attribution}
                  </footer>
                </blockquote>
              </div>
            ))}
          </div>

          {/* Dot indicators */}
          <div className="testimonial-dots" aria-label="Testimonial navigation">
            {sorted.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToCard(i)}
                className={`testimonial-dot ${i === activeIndex ? 'active' : ''}`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
