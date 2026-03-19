'use client'

import Image from 'next/image'

interface HeroProps {
  heroImageUrl?: string
  heroImageAlt?: string
  siteName: string
  tagline: string
}

export function Hero({ heroImageUrl, heroImageAlt, siteName, tagline }: HeroProps) {
  return (
    <section className="relative h-screen w-full overflow-hidden grain-overlay">
      {/* Background image */}
      <div className="hero-image absolute inset-0 overflow-hidden">
        <div className="image-treated w-full h-full hero-ken-burns">
          {heroImageUrl ? (
            <Image
              src={heroImageUrl}
              alt={heroImageAlt || 'Hero image'}
              fill
              priority
              className="object-cover"
            />
          ) : (
            <Image
              src="/brand_assets/bracken-flute.jpg"
              alt="Bracken Roots playing a wooden flute surrounded by crystal singing bowls, gongs, and candles"
              fill
              priority
              className="object-cover"
            />
          )}
        </div>
      </div>

      {/* Extra gradient for hero readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal-root/70 via-charcoal-root/15 to-transparent z-[4]" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-end pb-16 md:pb-24 text-center px-6">
        {/* Brand logo mark with breathing animation */}
        <div className="hero-heading mb-6">
          <Image
            src="/brand_assets/cropped/white logo with sun.svg"
            alt=""
            width={144}
            height={144}
            className="logo-breathe h-20 md:h-28 lg:h-36 w-auto mx-auto"
            aria-hidden="true"
          />
        </div>
        <h1 className="hero-heading font-display text-5xl md:text-7xl lg:text-[5.5rem] font-light text-ritual-cream">
          {siteName}
        </h1>
        <p className="hero-tagline mt-4 font-sans text-xs md:text-sm font-medium uppercase tracking-[0.18em] text-soft-linen/90">
          {tagline}
        </p>
        <a
          href="#about"
          className="hero-cta mt-10 btn-outline font-sans text-xs font-medium uppercase tracking-[0.1em] text-ritual-cream border border-ritual-cream/30 px-8 py-3.5 flex items-center gap-2"
        >
          Explore
          <svg
            className="chevron-bob"
            width="12"
            height="12"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M2 5l6 6 6-6" />
          </svg>
        </a>
      </div>
    </section>
  )
}
