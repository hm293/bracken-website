import Image from 'next/image'
import { ScrollReveal } from './ui/ScrollReveal'

interface AboutProps {
  heading: string
  bodyHtml: string
  imageUrl?: string
  imageAlt?: string
}

export function About({ heading, bodyHtml, imageUrl, imageAlt }: AboutProps) {
  return (
    <section id="about" className="relative py-20 md:py-30 overflow-hidden grain-overlay">
      {/* Radial glow */}
      <div
        className="absolute top-1/2 left-1/4 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(184,151,106,0.06) 0%, transparent 70%)',
        }}
      />

      {/* Yoga woman watermark */}
      <Image
        src="/brand_assets/cropped/yoga women with logo.svg"
        alt=""
        width={400}
        height={600}
        className="watermark-bg hidden md:block right-0 bottom-0 h-[500px] lg:h-[600px] w-auto"
        aria-hidden="true"
      />

      <ScrollReveal className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 lg:gap-22 items-center">
          {/* Text */}
          <div>
            <h2 className="text-4xl md:text-5xl text-deep-earth mb-8">{heading}</h2>
            <div
              className="prose-constrained space-y-5 text-stone text-base md:text-[17px]"
              dangerouslySetInnerHTML={{ __html: bodyHtml }}
            />
          </div>

          {/* Image */}
          <div className="relative md:-mr-10 lg:-mr-16">
            <div className="image-treated aspect-[3/4] rounded-sm overflow-hidden">
              <Image
                src={imageUrl || '/brand_assets/bracken-bowls.jpg'}
                alt={imageAlt || 'Bracken Roots with crystal singing bowls and gongs'}
                fill
                className="object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  )
}
