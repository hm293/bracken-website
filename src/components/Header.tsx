'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeNav = () => {
    setMobileOpen(false)
    document.body.style.overflow = ''
  }

  const openNav = () => {
    setMobileOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const navLinks = [
    { href: '#about', label: 'About' },
    { href: '#offerings', label: 'Offerings' },
    { href: '#testimonials', label: 'Kind Words' },
    { href: '#gallery', label: 'As Seen At' },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[40] transition-all duration-300 ${scrolled ? 'header-scrolled' : ''}`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between h-18 md:h-22">
        {/* Logo */}
        <a href="#" className="relative z-10 flex items-center gap-3">
          <Image
            src="/brand_assets/cropped/white logo with sun.svg"
            alt="Sacred Sound Sister"
            width={56}
            height={56}
            className="header-logo-white h-12 md:h-14 w-auto transition-opacity duration-300"
          />
          <Image
            src="/brand_assets/cropped/brown logo with sun.svg"
            alt="Sacred Sound Sister"
            width={56}
            height={56}
            className="header-logo-brown h-12 md:h-14 w-auto absolute left-0 opacity-0 transition-opacity duration-300"
          />
          <span className="header-text hidden md:block font-display text-lg font-medium tracking-tight text-deep-earth opacity-0 transition-opacity duration-300">
            Sacred Sound Sister
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="nav-link font-sans text-xs font-medium uppercase tracking-[0.12em] text-stone hover:text-deep-earth"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="btn-primary font-sans text-xs font-medium uppercase tracking-[0.12em] bg-burnished-brass text-ritual-cream px-5 py-2.5 hover:bg-[#a6854f]"
          >
            Get in Touch
          </a>
        </nav>

        {/* Mobile Hamburger */}
        <button
          onClick={openNav}
          className="md:hidden relative z-10 w-11 h-11 flex items-center justify-center"
          aria-label="Open menu"
          aria-expanded={mobileOpen}
        >
          <div className="space-y-1.5">
            <span className="block w-6 h-px bg-deep-earth transition-transform duration-200" />
            <span className="block w-6 h-px bg-deep-earth transition-opacity duration-200" />
            <span className="block w-6 h-px bg-deep-earth transition-transform duration-200" />
          </div>
        </button>
      </div>

      {/* Mobile Nav Drawer */}
      <div
        className={`mobile-nav fixed inset-0 bg-ritual-cream z-[50] flex flex-col items-center justify-center gap-8 ${mobileOpen ? 'open' : ''}`}
        aria-hidden={!mobileOpen}
      >
        <button
          onClick={closeNav}
          className="absolute top-6 right-6 w-11 h-11 flex items-center justify-center"
          aria-label="Close menu"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#2C241E" strokeWidth="1.5">
            <line x1="2" y1="2" x2="18" y2="18" />
            <line x1="18" y1="2" x2="2" y2="18" />
          </svg>
        </button>
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={closeNav}
            className="font-display text-3xl font-light text-deep-earth"
          >
            {link.label}
          </a>
        ))}
        <a
          href="#contact"
          onClick={closeNav}
          className="font-display text-3xl font-light text-burnished-brass"
        >
          Get in Touch
        </a>
      </div>
    </header>
  )
}
