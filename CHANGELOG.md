# Changelog

## 2026-03-19 — UI Polish, Gallery Expansion & Migration Planning

### Added
- **Ken Burns hero** — slow zoom/drift animation on hero image (22s cycle, CSS-only)
- **Explore button chevron** — bobbing downward arrow animation on the hero CTA
- **Testimonial carousel indicators** — dot navigation below the carousel, tracks active card via IntersectionObserver
- **Testimonial nav arrows** — prev/next chevron buttons appear on desktop hover
- **Expanded gallery** — 9 real photos replacing logo placeholders, mixed aspect ratio grid (square + wide), 4-column layout on desktop
- **Offering card stagger** — cards cascade in individually on scroll (100ms delays) via `data-animate-cards`
- **Offering icon hover** — SVG stroke transitions to burnished-brass on card hover
- **Offering category headers** — decorative hairline rules extending from category names
- **Sound wave divider animation** — subtle 6s horizontal drift on all wave SVG dividers
- **Back-to-top button** — floating circle button, appears after scrolling past hero, smooth scrolls to top
- **Mobile tap states** — active state background tint on offering cards for touch feedback
- **New photos** in `brand_assets/pics/`: lakeside gazebo, geodesic dome, bluebells, Shoreditch sauna, bolsters with roses, fairy light venue, retreat hall, B&W dome session, instrument detail, tarot cards, Bracken with gong, Bracken with candles
- **Migration plan** — `docs/plans/2026-03-19-payload-cms-migration.md` (Next.js + Payload CMS v3)
- **Setup tasks** — `docs/plans/2026-03-19-setup-tasks-for-harry.md` (Vercel, Resend, DNS checklist)

### Changed
- **About heading** — "Meet Bracken" replaces the double-header ("Meet Bracken" eyebrow + "About" heading)
- **Offering icons** — scaled from 36px to 48px for better visual weight
- **Offering category titles** — bumped to `text-3xl` on desktop for clearer hierarchy vs card titles
- **Gallery grid** — expanded from 5 slots (3 placeholders) to 9 real photos in a 4-column mixed-ratio layout
- **Footer background** — changed from `bg-charcoal-root` to `bg-deep-earth` for tonal separation from contact section
- **Testimonial dot colour** — inactive dots darkened from `#E8DFD3` to `#C9BDB0` for visibility
- **Phone number** — corrected format from "+44 07596" to "+44 7596"
- **Stagger delays** — extended to support up to 9 children (for gallery grid)

### Removed
- Venue name list below gallery (Shoreditch & Soul, Essaouira Retreat, etc.)
- "Meet Bracken" eyebrow label (consolidated into main heading)

---

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
