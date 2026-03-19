# Changelog

## 2026-03-19 — Brand SVG Integration & Visual Polish

### Added
- **Cropped SVG assets** (`brand_assets/cropped/`) — all 6 brand SVGs re-exported with tight viewBox cropping (originals had artwork in corners of 1440x810 canvases)
- **Hero logo mark** — white triquetra with sun, centred above the title with a subtle breathing animation (`subtlePulse`, 4s cycle)
- **Header logo swap** — white logo on the hero (transparent header), crossfades to brown logo + "Sacred Sound Sister" text once scrolled past the hero
- **Offering card icons** — 9 hand-drawn SVG line icons, one per offering:
  - Crystal singing bowl (Sacred Sound Journey)
  - Sound waves (Sound Bath & Song)
  - Circle of people (Sound & Sharing Circle)
  - Flame with base (Sauna Sound Rituals)
  - Brain with calm waves (Nervous System Reset)
  - Fern/leaf (Nature Connection Retreat)
  - Bowl with mallet (Bespoke 1:1 Sound Healing)
  - Sun with rays (Sound Sanctuary Day Retreat)
  - Crescent moon with stars (Sound Bath & Moon Ceremony)
- **Section watermarks** (low opacity background accents):
  - Yoga woman illustration in the About section (desktop only, ~4% opacity)
  - Fern wordmark in the Testimonials section (~6% opacity)
  - White triquetra in the Contact section (desktop only, ~4% opacity)
- **Testimonial card triquetra** — subtle brown triquetra (no sun) in bottom-right corner of each testimonial card (~7% opacity), alongside the existing oversized quotation marks
- **Footer logo** — white triquetra with sun replaces the old filtered PNG
- **Gallery placeholders** — replaced text-based placeholder images with brand-coloured tiles featuring subtle triquetra marks
- **Labs workflow** — `labs.html` for testing changes before promoting to the main site, with floating navigation buttons between labs and main

### Changed
- Header logo switched from `logo-triquetra.png` to cropped `brown logo with sun.svg` (larger, crisper at all sizes)
- Header height adjusted for the more prominent logo

### Files added
- `brand_assets/cropped/*.svg` (6 files)
- `labs.html`
- `index.backup.html` (pre-labs backup of original)
- `CHANGELOG.md`
