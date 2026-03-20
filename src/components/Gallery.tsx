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

/*
 * Bento gallery driven by each image's CMS aspectRatio field.
 * Desktop: 6-column grid — wide spans 4 cols (16:9), tall takes 2 cols
 * with a portrait crop (3:4), squares take 2 cols. Paired as:
 *   wide(4) + tall(2) = 6  |  square(2) + square(2) + square(2) = 6
 * Mobile: single column with 4:3 crops so each image breathes.
 */

function getGridClasses(aspectRatio: string): string {
  switch (aspectRatio) {
    case 'wide':
      return 'md:col-span-4 aspect-[4/3] md:aspect-[16/9]'
    case 'tall':
      return 'md:col-span-2 aspect-[4/3] md:aspect-[3/4]'
    default:
      return 'md:col-span-2 aspect-[4/3] md:aspect-square'
  }
}

function getSizes(aspectRatio: string): string {
  switch (aspectRatio) {
    case 'wide':
      return '(max-width: 768px) 100vw, 66vw'
    default:
      return '(max-width: 768px) 100vw, 33vw'
  }
}

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
          className="grid grid-cols-1 md:grid-cols-6 gap-4 md:gap-5"
        >
          {sorted.map((img) => {
            const gridClasses = getGridClasses(img.aspectRatio)

            return (
              <div
                key={img.id}
                className={`gallery-item relative overflow-hidden rounded-lg ${gridClasses}`}
              >
                <Image
                  src={img.image?.url || ''}
                  alt={img.alt}
                  fill
                  className="object-cover transition-all duration-700 ease-out hover:scale-[1.03]"
                  style={{ objectPosition: `${img.focalX}% ${img.focalY}%` }}
                  sizes={getSizes(img.aspectRatio)}
                  loading="lazy"
                />
                {/* Warm tonal overlay to unify colour temperature across images */}
                <div className="absolute inset-0 bg-amber-900/[0.04] mix-blend-multiply pointer-events-none" />
                {/* Subtle vignette for depth */}
                <div className="absolute inset-0 pointer-events-none"
                  style={{ boxShadow: 'inset 0 0 60px rgba(44,36,30,0.08)' }} />
              </div>
            )
          })}
        </ScrollReveal>
      </div>
    </section>
  )
}
