# Sacred Sound Sister - Future Enhancements

Tracked ideas and improvements for when assets, content, or time becomes available.

**Rating scale:**
- **Impact:** How much this improves the site for visitors/Bracken (Low / Medium / High)
- **Effort:** Developer time to implement (Low = <1hr / Medium = 1-4hrs / High = 4hrs+)

---

## Hero Section

### Ken Burns Effect on Still Image
Add a slow, cinematic zoom/pan across the hero image using CSS animation. 15-20 second loop, subtle scale from 1.0 to 1.08. Gives the hero a breathing, alive quality without video.
- **Impact:** Medium — subtle but makes the site feel alive immediately
- **Effort:** Low — 15 minutes, CSS-only
- **Status:** Ready to implement
- **Assets needed:** None (works with current image)

### Video Background Hero
Swap the hero still image for a looping background video. Muted autoplay with the same gradient overlay and text on top.
- **Impact:** High — completely changes the first impression, immersive
- **Effort:** Low — 30 minutes once video is provided
- **Status:** Waiting on assets
- **Assets needed from Bracken:**
  - Short loop video (15-30 seconds), MP4 format
  - WebM version for better compression (optional but recommended)
  - Still frame for poster/fallback image
  - Keep under 8-10MB for performance
- **Note:** Consider Ken Burns on mobile, video on desktop only (saves data)

---

## Offerings Section

### Custom Illustrations / Infographics per Offering
Add small hand-drawn style illustrations above each offering card — matching the botanical/organic style from the PDF portfolio. E.g. a singing bowl icon for Sound Journey, a flame for Sauna Rituals, a moon for Moon Ceremony.
- **Impact:** High — transforms the offerings from clean cards to something uniquely hers
- **Effort:** Low — 1 hour once assets are available (drop SVGs into cards)
- **Status:** Waiting on assets
- **Assets needed from Bracken:** Vector illustrations/icons from the original PDF designer. SVG format preferred.
- **Note:** These could also work as decorative elements throughout the site (section dividers, watermarks, background accents)

---

## Gallery / As Seen At

### Expanded Event Photography
Replace placeholder images with real event/session photography. More variety: different venues, group sessions, instrument close-ups, retreat settings, candlelit rooms.
- **Impact:** High — real photos build trust and credibility far more than placeholders
- **Effort:** Low — 30 minutes (drop-in replacement)
- **Status:** Waiting on assets
- **Assets needed from Bracken:** High-res photos from past events

### Venue/Brand Logos
Add actual logos for venues and events (Saunaverse, Bingham Riverhouse, etc.) in a clean row. Monochromatic treatment (like Sahana Sound does with corporate logos).
- **Impact:** High — instant corporate credibility without saying a word
- **Effort:** Low — 1 hour
- **Status:** Waiting on assets
- **Assets needed:** SVG logos from each venue/event partner

---

## Brand Assets Integration

### PDF Illustrations Throughout Site
Integrate the hand-drawn botanical/organic illustrations from the PDF portfolio as:
- Section dividers (alternating with or replacing the sound wave SVGs)
- Background watermarks at low opacity
- Decorative accents near headings
- Offering card icons
- **Impact:** High — ties the site to the existing PDF brand identity, makes it feel crafted
- **Effort:** Medium — 2-3 hours (need to plan placement carefully to avoid clutter)
- **Status:** Waiting on vectors from PDF designer
- **Assets needed:** SVG exports of all illustrations from the portfolio PDF

### SVG Logo Integration
Once the triquetra logo is available as an SVG:
- Replace PNG in header with crisp SVG
- Use as section divider ornament
- Animated subtle rotation on hover in the header
- Watermark behind About and Testimonials sections at 5-8% opacity
- Favicon generation from SVG
- Open Graph image with proper logo
- **Impact:** High — the logo is the brand's strongest visual asset, currently underused
- **Effort:** Low — 1-2 hours
- **Status:** Waiting on SVG from Bracken
- **Assets needed:** Original vector file (.ai, .eps, or .svg)

---

## Content & Copy

### Expanded About Page
Dedicated `/about` page with:
- Extended bio and training background
- Philosophy and approach to sound
- Instruments and their significance
- Photo gallery of Bracken's setup
- **Impact:** Medium — deeper content for interested visitors, good for SEO
- **Effort:** Medium — 2-3 hours (design + content)
- **Status:** Future phase

### Detailed Offerings Pages
Individual pages or expandable sections for each offering with:
- Full description (from PDF portfolio)
- What to expect
- Duration and pricing
- Related testimonials
- Suggested for (individuals, couples, groups, corporate)
- **Impact:** Medium — helps convert curious browsers into enquiries
- **Effort:** Medium — 3-4 hours (template + content for each)
- **Status:** Future phase

---

## Functionality

### Booking System
Integrate booking capability when the business is ready:
- Calendly embed or similar
- Or Payload CMS with custom booking collection
- **Impact:** Medium — depends on business model; currently contact form is sufficient
- **Effort:** Medium — 2-3 hours for Calendly embed, High for custom solution
- **Status:** Not needed yet (portfolio/credibility site for now)

### Contact Form Backend
Currently the form is frontend-only. Needs:
- Email delivery (via Payload form-builder, Formspree, or custom API route)
- Success/error states
- Anti-spam (honeypot field or reCAPTCHA)
- **Impact:** Critical — the site can't launch without this working
- **Effort:** Low — 1 hour with Formspree, 2-3 hours with custom solution
- **Status:** Needs implementation before launch

### Blog / Journal
Sound healing insights, event recaps, seasonal practices:
- Builds SEO
- Gives Bracken a content platform
- Can use Payload's built-in Posts collection
- **Impact:** Medium-High long term — SEO and authority building
- **Effort:** Medium — 3-4 hours for template/structure (content is ongoing)
- **Status:** Future phase

---

## Technical

### CMS Integration (Payload)
Migrate from static HTML to Payload CMS so Bracken can self-manage content. Full plan documented in `docs/plans/2026-03-14-sacred-sound-sister-implementation.md`.
- **Impact:** High — Bracken can update content herself without developer involvement
- **Effort:** High — 2-3 days (well-documented, 27-task implementation plan exists)
- **Status:** Planned for next phase

### SEO Optimisation
- Meta titles and descriptions per section/page
- Open Graph images
- Structured data (LocalBusiness schema)
- Sitemap generation
- **Impact:** High — essential for discoverability, especially local search
- **Effort:** Medium — 2-3 hours
- **Status:** Pre-launch requirement

### Analytics
- Privacy-friendly analytics (Plausible, Fathom, or Vercel Analytics)
- Track: page views, scroll depth, contact form submissions, CTA clicks
- **Impact:** Medium — Bracken needs to understand what's working
- **Effort:** Low — 30 minutes
- **Status:** Pre-launch

---

## Design Polish

### Dark Mode Footer Transition
Smooth gradient transition from the gallery section into the charcoal contact section, rather than a hard cut.
- **Impact:** Low — subtle polish
- **Effort:** Low — 15 minutes

### Parallax Depth
Subtle parallax on the About section image and Gallery photos for additional depth.
- **Impact:** Low-Medium — adds premium feel
- **Effort:** Low — 1 hour (CSS only, with reduced-motion support)

### Testimonial Auto-Advance
Optional slow auto-scroll on the testimonial carousel (pauses on hover/focus, disabled with reduced-motion).
- **Impact:** Low-Medium — ensures visitors see multiple quotes
- **Effort:** Low — 30 minutes

---

## Priority Matrix

### Do first (High impact, Low effort)
1. Contact form backend (Critical — can't launch without it)
2. Ken Burns hero effect (ready now, 15 min)
3. SVG logo integration (as soon as assets arrive)
4. Expanded event photography (as soon as photos arrive)
5. Offering illustrations (as soon as vectors arrive)
6. Analytics setup (30 min)

### Do second (High impact, Medium-High effort)
7. SEO optimisation (pre-launch)
8. Venue/brand logos
9. PDF illustrations throughout site
10. Video background hero (when video is ready)

### Do later (Medium impact, Medium effort)
11. CMS integration (Payload)
12. Detailed offerings pages
13. Expanded about page
14. Blog / journal

### Nice to have (Lower impact)
15. Dark footer transition
16. Parallax depth
17. Testimonial auto-advance
18. Booking system

---

*This document is a living list. Add new ideas as they come up.*
