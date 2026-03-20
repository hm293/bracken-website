import Image from 'next/image'
import { ScrollReveal } from './ui/ScrollReveal'

interface GalleryImage {
  id: string
  alt: string
  aspectRatio: 'square' | 'wide' | 'tall'
  focalX: number
  focalY: number
  sortOrder: number
  image: {
    url?: string
    alt?: string
  }
}

interface GalleryProps {
  images: GalleryImage[]
}

// Grid pattern: 3 columns on desktop with mixed sizes
// Row 1: wide (col-span-2), tall (row-span-2)
// Row 2: square, square
// Row 3: square, wide (col-span-2)
// This creates a dynamic bento-style layout that showcases photos larger

export function Gallery({ images }: GalleryProps) {
  const sorted = [...images].sort((a, b) => a.sortOrder - b.sortOrder)

  return (
    <section id="gallery" className="relative py-20 md:py-30 bg-warm-sand grain-overlay">
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">
        <ScrollReveal className="text-center mb-14">
          <p className="font-sans text-xs font-medium uppercase tracking-[0.15em] text-bracken-taupe mb-4">
            As Seen At
          </p>
          <h2 className="text-4xl md:text-5xl text-deep-earth">Past Events &amp; Residencies</h2>
        </ScrollReveal>

        <ScrollReveal
          type="animate-stagger"
          className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5"
        >
          {sorted.map((img, i) => {
            // Bento layout pattern: first image wide, every 5th image wide
            const isFeature = i === 0 || i === 5
            const isTall = i === 2 || i === 7

            let className = 'aspect-square'
            if (isFeature) className = 'md:col-span-2 aspect-[16/9]'
            if (isTall) className = 'md:row-span-2 aspect-square md:aspect-auto md:h-full'

            return (
              <div
                key={img.id}
                className={`relative overflow-hidden rounded-sm ${className}`}
              >
                <Image
                  src={img.image?.url || ''}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  style={{ objectPosition: `${img.focalX}% ${img.focalY}%` }}
                  sizes={isFeature ? '(max-width: 768px) 100vw, 66vw' : '(max-width: 768px) 50vw, 33vw'}
                  loading="lazy"
                />
              </div>
            )
          })}
        </ScrollReveal>
      </div>
    </section>
  )
}
