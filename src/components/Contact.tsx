'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ScrollReveal } from './ui/ScrollReveal'

interface ContactProps {
  email: string
  phone: string
  instagramHandles: { handle: string; url: string }[]
}

export function Contact({ email, phone, instagramHandles }: ContactProps) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('sending')

    const form = e.currentTarget
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (res.ok) {
        setStatus('sent')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="relative py-20 md:py-30 bg-charcoal-root grain-overlay">
      {/* White logo watermark */}
      <Image
        src="/brand_assets/cropped/white logo no sun.svg"
        alt=""
        width={300}
        height={400}
        className="watermark-bg right-10 top-1/2 -translate-y-1/2 h-[300px] lg:h-[400px] w-auto hidden md:block"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">
        <ScrollReveal className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl text-burnished-brass mb-4">
            Let&apos;s Work Together
          </h2>
          <p className="text-soft-linen/80 text-base prose-constrained mx-auto">
            Whether you&apos;re looking for a personal sound session, a corporate wellness
            experience, or a collaborative retreat — I&apos;d love to hear from you.
          </p>
        </ScrollReveal>

        <ScrollReveal className="grid md:grid-cols-2 gap-12 md:gap-16">
          {/* Contact Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block font-sans text-xs font-medium uppercase tracking-[0.1em] text-soft-linen/70 mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                autoComplete="name"
                className="form-input w-full bg-transparent border border-stone/40 text-ritual-cream px-4 py-3 font-body text-base rounded-sm placeholder:text-stone/40"
                placeholder="Your name"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block font-sans text-xs font-medium uppercase tracking-[0.1em] text-soft-linen/70 mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                autoComplete="email"
                className="form-input w-full bg-transparent border border-stone/40 text-ritual-cream px-4 py-3 font-body text-base rounded-sm placeholder:text-stone/40"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block font-sans text-xs font-medium uppercase tracking-[0.1em] text-soft-linen/70 mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                className="form-input w-full bg-transparent border border-stone/40 text-ritual-cream px-4 py-3 font-body text-base rounded-sm placeholder:text-stone/40 resize-none"
                placeholder="Tell me about what you're looking for..."
              />
            </div>
            <button
              type="submit"
              disabled={status === 'sending' || status === 'sent'}
              className="btn-primary w-full bg-burnished-brass text-deep-earth font-sans text-sm font-medium uppercase tracking-[0.1em] px-8 py-4 rounded-sm disabled:opacity-60"
            >
              {status === 'idle' && 'Send Message'}
              {status === 'sending' && 'Sending...'}
              {status === 'sent' && 'Sent — thank you!'}
              {status === 'error' && 'Something went wrong — try again'}
            </button>
          </form>

          {/* Contact Details */}
          <div className="flex flex-col justify-center space-y-8">
            <div>
              <p className="font-sans text-xs font-medium uppercase tracking-[0.1em] text-soft-linen/50 mb-2">
                Email
              </p>
              <a
                href={`mailto:${email}`}
                className="nav-link text-ritual-cream font-body text-lg hover:text-burnished-brass transition-colors duration-200"
              >
                {email}
              </a>
            </div>
            <div>
              <p className="font-sans text-xs font-medium uppercase tracking-[0.1em] text-soft-linen/50 mb-2">
                Phone
              </p>
              <a
                href={`tel:${phone.replace(/\s/g, '')}`}
                className="nav-link text-ritual-cream font-body text-lg hover:text-burnished-brass transition-colors duration-200"
              >
                {phone}
              </a>
            </div>
            <div>
              <p className="font-sans text-xs font-medium uppercase tracking-[0.1em] text-soft-linen/50 mb-2">
                Instagram
              </p>
              <div className="space-y-1">
                {instagramHandles.map((ig, i) => (
                  <a
                    key={i}
                    href={ig.url}
                    className={`nav-link block font-body hover:text-burnished-brass transition-colors duration-200 ${
                      i === 0 ? 'text-ritual-cream text-lg' : 'text-soft-linen/60 text-base'
                    }`}
                  >
                    @{ig.handle}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
