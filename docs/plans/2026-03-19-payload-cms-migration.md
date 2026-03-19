# Payload CMS Migration Plan

**Date:** 2026-03-19
**Status:** Draft — awaiting approval before execution
**Goal:** Migrate the Sacred Sound Sister static HTML site to Next.js + Payload CMS v3, hosted on Vercel, so Bracken can self-manage content and the architecture can be reused as a productised template.

---

## Architecture Overview

```
Current:  Static HTML (index.html) → Vercel static hosting
Target:   Next.js 15 + Payload CMS v3 + Postgres → Vercel (serverless)
```

**Stack:**
- **Framework:** Next.js 15 (App Router)
- **CMS:** Payload CMS v3 (embedded in Next.js)
- **Database:** Vercel Postgres (or Neon)
- **File Storage:** Vercel Blob (for uploaded images)
- **Email:** Resend (for form submission notifications)
- **Styling:** Tailwind CSS v4 (same design system, ported from CDN to local)
- **Fonts:** Google Fonts (Cormorant Garamond, Lora, Raleway — same as current)

---

## Phase 1: Project Scaffolding

### 1.1 Create Next.js + Payload project
- Use `npx create-payload-app` with the Next.js template
- Configure for Vercel Postgres adapter
- Set up Vercel Blob for media storage

### 1.2 Port the design system
- Move Tailwind config from inline `<script>` to `tailwind.config.ts`
- Port all brand colours, spacing tokens, font families
- Move all custom CSS (grain overlay, shadows, motion system, animations) to `globals.css`
- Ensure Google Fonts are loaded via `next/font`

### 1.3 Set up project structure
```
/app
  /(frontend)
    /page.tsx              — Home page (server component)
    /layout.tsx            — Root layout with fonts, metadata
  /(payload)
    /admin/[[...segments]]  — Payload admin panel
    /api/[...slug]          — Payload API routes
/collections
  /Hero.ts
  /About.ts
  /Offerings.ts
  /Testimonials.ts
  /Gallery.ts
  /SiteSettings.ts (global)
  /FormSubmissions.ts
/components
  /Header.tsx
  /Hero.tsx
  /About.tsx
  /Offerings.tsx
  /Testimonials.tsx
  /Gallery.tsx
  /Contact.tsx
  /Footer.tsx
  /ui/                    — Shared UI (buttons, cards, wave dividers etc.)
/payload.config.ts
```

---

## Phase 2: Payload Collections

### 2.1 Globals (singleton — one per site)

**SiteSettings**
| Field | Type | Purpose |
|-------|------|---------|
| siteName | text | "Sacred Sound Sister" |
| tagline | text | "Rest is the medicine" |
| contactEmail | email | Where form submissions are sent |
| contactPhone | text | Display phone number |
| instagramHandles | array of text | Instagram links |
| heroImage | upload (image) | Hero background photo |
| heroLogo | upload (image) | Logo SVG for hero |
| aboutHeading | text | "Meet Bracken" |
| aboutBody | richText | Bio paragraphs |
| aboutImage | upload (image) | Portrait photo |
| footerText | text | Copyright line |

### 2.2 Collections

**Offerings**
| Field | Type | Purpose |
|-------|------|---------|
| title | text | "Sacred Sound Journey" |
| description | textarea | Card description |
| duration | text | "1–1.5 hours" |
| category | select | Group / Corporate / Individual / Immersive |
| icon | select or code | Which SVG icon to use |
| sortOrder | number | Display order within category |

**Testimonials**
| Field | Type | Purpose |
|-------|------|---------|
| quote | textarea | The testimonial text |
| attribution | text | "— Kate Luke" or "— Anonymous" |
| sortOrder | number | Display order in carousel |

**Gallery**
| Field | Type | Purpose |
|-------|------|---------|
| image | upload (image) | The photo |
| alt | text | Alt text for accessibility |
| aspectRatio | select | square / wide / tall |
| sortOrder | number | Display order in grid |

**FormSubmissions**
| Field | Type | Purpose |
|-------|------|---------|
| name | text | Submitter's name |
| email | email | Submitter's email |
| message | textarea | Their message |
| readStatus | select | new / read / replied |
| createdAt | date | Auto-timestamp |

---

## Phase 3: React Components

### 3.1 Port each HTML section to a React component
Each component receives its data as props from the page-level server component. The page queries Payload at build/request time.

**Components to build:**
1. `Header` — Fixed nav, scroll effect, mobile drawer (client component for interactivity)
2. `Hero` — Ken Burns image, breathing logo, explore button (client component for animations)
3. `WaveDivider` — Reusable animated SVG divider
4. `About` — Two-column grid, watermark
5. `OfferingCategory` — Category header with hairline rule + card grid
6. `OfferingCard` — Individual card with icon, title, description, duration
7. `Testimonials` — Carousel with dots and nav arrows (client component)
8. `Gallery` — Photo grid with mixed aspect ratios
9. `Contact` — Form + contact details (client component for form handling)
10. `Footer` — Logo + copyright
11. `BackToTop` — Floating button (client component)

### 3.2 Preserve all existing behaviour
- Scroll reveal animations (Intersection Observer)
- Card hover/active states
- Testimonial carousel with dot indicators
- Ken Burns hero animation
- Sound wave divider animation
- Mobile nav drawer
- Reduced motion support
- Grain texture overlay
- All brand shadows, focus states

### 3.3 Form submission flow
- Contact form submits to a Next.js API route (`/api/contact`)
- API route creates a FormSubmission document in Payload
- `afterChange` hook on FormSubmissions sends email via Resend to Bracken
- Optional: send confirmation email back to the submitter

---

## Phase 4: Media & Content Migration

### 4.1 Upload all images to Vercel Blob via Payload admin
- Hero image (bracken-flute.jpg)
- About image (bracken-bowls.jpg)
- All 9 gallery photos
- Logo SVGs (all variants)
- Watermark SVGs

### 4.2 Seed initial content
- Create all 8 offerings with correct categories
- Add all 5 testimonials
- Set up SiteSettings global with all current content
- This can be done via admin panel or a seed script

---

## Phase 5: Deployment

### 5.1 Vercel setup
- Connect new repo (or restructure existing)
- Add environment variables (database URL, Resend API key, Payload secret)
- Provision Vercel Postgres database
- Provision Vercel Blob store
- Deploy and verify

### 5.2 Domain
- Point existing domain to the new Vercel deployment
- Verify SSL

---

## Estimated Effort

| Phase | Effort |
|-------|--------|
| 1. Scaffolding & design system | Medium |
| 2. Payload collections | Light |
| 3. React components | Heavy (bulk of the work) |
| 4. Content migration | Light |
| 5. Deployment | Light |

---

## What This Unlocks for Bracken

Once live, Bracken can:
- Log into `/admin` and see a clean dashboard
- **Edit text** — change her bio, update offering descriptions, tweak the tagline
- **Manage photos** — upload new gallery images, reorder them, swap hero/about images
- **Add/remove offerings** — create new ones, archive old ones, reorder
- **Manage testimonials** — add new quotes, remove old ones, reorder
- **View enquiries** — see all form submissions, mark as read/replied
- All without touching code or asking you

---

## What This Unlocks for Your Productised Offering

- Fork the repo for a new client
- Change SiteSettings (name, colours, email, images)
- Deploy to Vercel
- Hand over admin credentials
- Done — each client gets the same polished site with their own content
