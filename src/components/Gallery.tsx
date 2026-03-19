import Image from 'next/image'
import { ScrollReveal } from './ui/ScrollReveal'

interface GalleryImage {
  id: string
  alt: string
  aspectRatio: 'square' | 'wide' | 'tall'
  sortOrder: number
  image: {
    url?: string
    alt?: string
  }
}

interface GalleryProps {
  images: GalleryImage[]
}

// The gallery uses a specific grid pattern from the original site:
// Row 1: square, wide (col-span-2), square
// Row 2: wide (col-span-2), square, square
// Row 3: square, wide (col-span-2), square
// This creates a visually interesting masonry-like layout
const gridPattern = [
  'square', 'wide', 'square',
  'wide', 'square', 'square',
  'square', 'wide', 'square',
]

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
          className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"
        >
          {sorted.map((img, i) => {
            const pattern = gridPattern[i % gridPattern.length]
            const isWide = pattern === 'wide'
            return (
              <div
                key={img.id}
                className={`image-treated aspect-square rounded-sm overflow-hidden ${
                  isWide ? 'md:col-span-2 md:aspect-[2/1]' : ''
                }`}
              >
                <Image
                  src={img.image?.url || ''}
                  alt={img.alt}
                  fill
                  className="object-cover"
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
