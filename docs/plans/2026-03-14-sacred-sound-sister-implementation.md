# Sacred Sound Sister - Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a CMS-powered portfolio website for Sacred Sound Sister using Payload CMS 3.x on Vercel, with custom blocks, collections, and the earthy warm brand design system.

**Architecture:** Payload CMS installed into a Next.js 15 App Router project, using the `with-vercel-website` template as a base. Custom blocks render the portfolio sections (Hero, About, Offerings, Testimonials, Gallery, Contact). Custom collections store testimonials, offerings, and events. Bracken self-manages content via the Payload admin panel.

**Tech Stack:** Payload CMS 3.x, Next.js 15 (App Router), TailwindCSS v4, Neon Postgres, Vercel Blob, Google Fonts (Cormorant Garamond, Lora, Raleway)

**Brand Guidelines:** `docs/plans/2026-03-14-sacred-sound-sister-brand-guidelines.md`

---

## Phase 1: Project Scaffolding

### Task 1: Create project from Payload template

**Files:**
- Create: entire project scaffold in `C:\dev\Websites\bracks-website\`

**Step 1: Scaffold the project**

```bash
cd C:\dev\Websites
npx create-payload-app@latest bracks-website --template with-vercel-website
```

Select Postgres as the database adapter when prompted. If the directory already exists, scaffold into a temp directory and move files across, preserving the `docs/` folder.

**Step 2: Verify scaffold**

```bash
cd bracks-website
ls src/blocks src/collections src/heros
```

Expected: Block directories (ArchiveBlock, Banner, CallToAction, Code, Content, Form, MediaBlock, RelatedPosts), collection files (Pages, Posts, Users, Categories.ts, Media.ts), and hero directories (HighImpact, MediumImpact, LowImpact).

**Step 3: Install dependencies**

```bash
npm install
```

**Step 4: Commit**

```bash
git init
git add -A
git commit -m "chore: scaffold from Payload with-vercel-website template"
```

---

### Task 2: Configure environment variables

**Files:**
- Create: `.env` (from `.env.example`)

**Step 1: Set up environment file**

Copy `.env.example` to `.env` and fill in:

```env
# Database - Neon Postgres (get from neon.tech dashboard)
POSTGRES_URL=postgresql://...@...neon.tech/...?sslmode=require

# Payload
PAYLOAD_SECRET=<generate-random-64-char-string>

# Vercel Blob (will be auto-set on Vercel, use placeholder locally)
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_...

# Preview
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
```

**Step 2: Verify dev server starts**

```bash
npm run dev
```

Expected: Server starts at http://localhost:3000. Payload admin at http://localhost:3000/admin. You'll be prompted to create a first user.

**Step 3: Create admin user and verify**

Navigate to http://localhost:3000/admin, create an admin account. Verify you can access the dashboard.

**Step 4: Commit**

```bash
git add .env.example
git commit -m "chore: configure environment variables"
```

Note: Never commit `.env` - ensure it's in `.gitignore`.

---

## Phase 2: Brand Theme

### Task 3: Replace colour palette with Sacred Sound Sister tokens

**Files:**
- Modify: `src/app/(frontend)/globals.css`

**Step 1: Replace CSS custom properties**

In `globals.css`, replace the `:root` light theme variables with the Sacred Sound Sister palette. The template uses oklch, but we'll use hex values converted to oklch for consistency with Tailwind v4.

Replace the `:root` block:

```css
:root {
  /* Sacred Sound Sister - Light Theme (primary and only theme) */
  --background: #FAF7F2;           /* Ritual Cream */
  --foreground: #2C241E;           /* Deep Earth */
  --card: #F0E8DC;                 /* Warm Sand */
  --card-foreground: #2C241E;      /* Deep Earth */
  --popover: #FAF7F2;              /* Ritual Cream */
  --popover-foreground: #2C241E;   /* Deep Earth */
  --primary: #9B8B7A;              /* Bracken Taupe */
  --primary-foreground: #FAF7F2;   /* Ritual Cream */
  --secondary: #F0E8DC;            /* Warm Sand */
  --secondary-foreground: #3D3228; /* Charcoal Root */
  --muted: #E8DFD3;               /* Soft Linen */
  --muted-foreground: #6B5E52;     /* Stone */
  --accent: #B8976A;               /* Burnished Brass */
  --accent-foreground: #FAF7F2;    /* Ritual Cream */
  --destructive: #9B3B3B;          /* Warm red, on-brand */
  --border: #E8DFD3;               /* Soft Linen */
  --input: #E8DFD3;                /* Soft Linen */
  --ring: #B8976A;                 /* Burnished Brass */
  --radius: 0.5rem;

  /* Additional brand tokens */
  --stone: #6B5E52;
  --charcoal-root: #3D3228;
  --burnished-brass: #B8976A;
  --bracken-taupe: #9B8B7A;
  --warm-sand: #F0E8DC;
  --ritual-cream: #FAF7F2;
  --soft-linen: #E8DFD3;
  --deep-earth: #2C241E;
}
```

Remove or simplify the `[data-theme='dark']` block - Sacred Sound Sister is a single (light) theme. Keep a minimal dark variant that matches the footer section using Charcoal Root:

```css
[data-theme='dark'] {
  --background: #3D3228;
  --foreground: #FAF7F2;
  --card: #2C241E;
  --card-foreground: #F0E8DC;
  --primary: #B8976A;
  --primary-foreground: #2C241E;
  --secondary: #3D3228;
  --secondary-foreground: #E8DFD3;
  --muted: #2C241E;
  --muted-foreground: #9B8B7A;
  --accent: #B8976A;
  --accent-foreground: #2C241E;
  --border: #6B5E52;
  --input: #6B5E52;
  --ring: #B8976A;
}
```

**Step 2: Verify colours render**

```bash
npm run dev
```

Navigate to http://localhost:3000. Verify backgrounds, text, and card colours match the brand palette.

**Step 3: Commit**

```bash
git add src/app/\(frontend\)/globals.css
git commit -m "feat: apply Sacred Sound Sister colour palette"
```

---

### Task 4: Configure typography

**Files:**
- Modify: `src/app/(frontend)/layout.tsx`
- Modify: `src/app/(frontend)/globals.css`
- Modify: `tailwind.config.mjs`

**Step 1: Add Google Fonts to the layout**

In `src/app/(frontend)/layout.tsx`, replace the existing font imports (likely `geist`) with:

```tsx
import { Cormorant_Garamond, Lora, Raleway } from 'next/font/google'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-cormorant',
  display: 'swap',
})

const lora = Lora({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-lora',
  display: 'swap',
})

const raleway = Raleway({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-raleway',
  display: 'swap',
})
```

Apply to the `<body>` tag:

```tsx
<body className={`${cormorant.variable} ${lora.variable} ${raleway.variable}`}>
```

**Step 2: Add font variables to Tailwind config**

In `tailwind.config.mjs`, extend the theme:

```js
theme: {
  extend: {
    fontFamily: {
      display: ['var(--font-cormorant)', 'Georgia', 'serif'],
      body: ['var(--font-lora)', 'Georgia', 'serif'],
      sans: ['var(--font-raleway)', 'system-ui', 'sans-serif'],
    },
  },
}
```

**Step 3: Add typography utilities to globals.css**

```css
/* Typography system */
h1, h2, h3, h4 {
  font-family: var(--font-cormorant), Georgia, serif;
}

h1 {
  font-weight: 300;
  letter-spacing: -0.03em;
  line-height: 1.2;
}

h2 {
  font-weight: 500;
  letter-spacing: -0.02em;
  line-height: 1.3;
}

body, p, li {
  font-family: var(--font-lora), Georgia, serif;
  line-height: 1.7;
}

nav, button, .label, .caption {
  font-family: var(--font-raleway), system-ui, sans-serif;
}
```

**Step 4: Verify typography renders**

```bash
npm run dev
```

Check that headings use Cormorant Garamond, body uses Lora, and navigation uses Raleway.

**Step 5: Commit**

```bash
git add src/app/\(frontend\)/layout.tsx src/app/\(frontend\)/globals.css tailwind.config.mjs
git commit -m "feat: configure Sacred Sound Sister typography system"
```

---

### Task 5: Add grain texture and brand utilities

**Files:**
- Modify: `src/app/(frontend)/globals.css`
- Create: `public/grain.svg`

**Step 1: Create the grain texture SVG**

Create `public/grain.svg`:

```svg
<svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
  <filter id="grain">
    <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/>
    <feColorMatrix type="saturate" values="0"/>
  </filter>
  <rect width="100%" height="100%" filter="url(#grain)" opacity="0.04"/>
</svg>
```

**Step 2: Add brand utility classes to globals.css**

```css
/* Grain texture overlay */
.grain-overlay::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url('/grain.svg');
  background-repeat: repeat;
  opacity: 0.04;
  pointer-events: none;
  z-index: 1;
}

/* Brand shadows - colour-tinted, never grey */
.shadow-brand-sm {
  box-shadow: 0 1px 3px rgba(155, 139, 122, 0.08), 0 1px 2px rgba(155, 139, 122, 0.06);
}

.shadow-brand {
  box-shadow: 0 4px 12px rgba(155, 139, 122, 0.1), 0 2px 4px rgba(155, 139, 122, 0.06);
}

.shadow-brand-lg {
  box-shadow: 0 10px 30px rgba(155, 139, 122, 0.12), 0 4px 8px rgba(155, 139, 122, 0.08);
}

/* Section gradient transition */
.section-gradient {
  background: linear-gradient(180deg, var(--ritual-cream) 0%, var(--warm-sand) 100%);
}

/* Divider */
.divider-linen {
  border-top: 1px solid var(--soft-linen);
}

/* Max line length for readability */
.prose-constrained {
  max-width: 70ch;
}
```

**Step 3: Verify grain texture**

```bash
npm run dev
```

Add `grain-overlay` class to a section temporarily and confirm the subtle noise texture appears.

**Step 4: Commit**

```bash
git add public/grain.svg src/app/\(frontend\)/globals.css
git commit -m "feat: add grain texture, brand shadows, and utility classes"
```

---

## Phase 3: Custom Collections

### Task 6: Create Testimonials collection

**Files:**
- Create: `src/collections/Testimonials.ts`
- Modify: `src/payload.config.ts`

**Step 1: Define the Testimonials collection**

Create `src/collections/Testimonials.ts`:

```typescript
import type { CollectionConfig } from 'payload'
import { authenticated } from '@/access/authenticated'
import { anyone } from '@/access/anyone'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'quote', 'updatedAt'],
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'quote',
      type: 'textarea',
      required: true,
      admin: {
        description: 'The testimonial text - keep it concise and impactful.',
      },
    },
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        description: 'Name of the person giving the testimonial.',
      },
    },
    {
      name: 'context',
      type: 'text',
      admin: {
        description: 'Optional context, e.g. "Breath & Sound Workshop" or "Corporate Event".',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Featured testimonials appear on the homepage.',
      },
    },
  ],
}
```

**Step 2: Register in payload.config.ts**

Add to the imports and collections array in `src/payload.config.ts`:

```typescript
import { Testimonials } from '@/collections/Testimonials'

// In buildConfig:
collections: [Pages, Posts, Media, Categories, Users, Testimonials],
```

**Step 3: Run migrations and verify**

```bash
npm run dev
```

Navigate to http://localhost:3000/admin. Verify "Testimonials" appears in the sidebar. Create a test testimonial.

**Step 4: Commit**

```bash
git add src/collections/Testimonials.ts src/payload.config.ts
git commit -m "feat: add Testimonials collection"
```

---

### Task 7: Create Offerings collection

**Files:**
- Create: `src/collections/Offerings.ts`
- Modify: `src/payload.config.ts`

**Step 1: Define the Offerings collection**

Create `src/collections/Offerings.ts`:

```typescript
import type { CollectionConfig } from 'payload'
import { authenticated } from '@/access/authenticated'
import { anyone } from '@/access/anyone'

export const Offerings: CollectionConfig = {
  slug: 'offerings',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['title', 'category', 'updatedAt'],
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'duration',
      type: 'text',
      admin: {
        description: 'E.g. "1-1.5 hours", "5 hours", "1-2 days"',
      },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Group Experiences', value: 'group' },
        { label: 'Corporate Wellness', value: 'corporate' },
        { label: 'Individual Sessions', value: 'individual' },
        { label: 'Immersive Rituals & Retreats', value: 'retreats' },
      ],
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'order',
      type: 'number',
      admin: {
        description: 'Display order within category (lower numbers first).',
      },
    },
  ],
}
```

**Step 2: Register in payload.config.ts**

```typescript
import { Offerings } from '@/collections/Offerings'

collections: [Pages, Posts, Media, Categories, Users, Testimonials, Offerings],
```

**Step 3: Verify**

```bash
npm run dev
```

Check "Offerings" appears in admin. Create a test offering.

**Step 4: Commit**

```bash
git add src/collections/Offerings.ts src/payload.config.ts
git commit -m "feat: add Offerings collection"
```

---

### Task 8: Create Events collection

**Files:**
- Create: `src/collections/Events.ts`
- Modify: `src/payload.config.ts`

**Step 1: Define the Events collection**

Create `src/collections/Events.ts`:

```typescript
import type { CollectionConfig } from 'payload'
import { authenticated } from '@/access/authenticated'
import { anyone } from '@/access/anyone'

export const Events: CollectionConfig = {
  slug: 'events',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'venue', 'date', 'updatedAt'],
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        description: 'Event name, e.g. "Saunaverse Festival" or "Bingham Riverhouse Workshop"',
      },
    },
    {
      name: 'venue',
      type: 'text',
    },
    {
      name: 'date',
      type: 'date',
      admin: {
        description: 'When the event took place.',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Optional venue/brand logo for the "As Seen At" section.',
      },
    },
  ],
}
```

**Step 2: Register in payload.config.ts**

```typescript
import { Events } from '@/collections/Events'

collections: [Pages, Posts, Media, Categories, Users, Testimonials, Offerings, Events],
```

**Step 3: Verify**

```bash
npm run dev
```

Check "Events" appears in admin.

**Step 4: Commit**

```bash
git add src/collections/Events.ts src/payload.config.ts
git commit -m "feat: add Events collection"
```

---

### Task 9: Remove unused collections and simplify

**Files:**
- Delete: `src/collections/Posts/` (directory)
- Delete: `src/collections/Categories.ts`
- Modify: `src/payload.config.ts`
- Modify: `src/plugins/index.ts` (remove search plugin indexing Posts)

**Step 1: Remove Posts and Categories**

Sacred Sound Sister is a portfolio site - no blog needed. Remove the Posts collection directory and Categories.ts. Update `payload.config.ts` to remove them from the collections array and remove their imports.

**Step 2: Clean up plugins**

In `src/plugins/index.ts`, remove the search plugin's Posts indexing and the nestedDocs plugin (was for Categories). Keep: redirects, seo, formBuilder.

**Step 3: Remove related blocks**

Delete `src/blocks/ArchiveBlock/`, `src/blocks/RelatedPosts/`, `src/blocks/Code/`, and `src/blocks/Banner/`. These are blog-specific blocks not needed for the portfolio site.

**Step 4: Update RenderBlocks.tsx**

Remove references to deleted blocks from `src/blocks/RenderBlocks.tsx`.

**Step 5: Update Pages collection**

In `src/collections/Pages/index.ts`, remove ArchiveBlock and any blog-related blocks from the `layout.blocks` array.

**Step 6: Verify**

```bash
npm run dev
```

Admin should show: Pages, Media, Users, Testimonials, Offerings, Events. No errors in console.

**Step 7: Commit**

```bash
git add -A
git commit -m "chore: remove unused blog collections and blocks"
```

---

## Phase 4: Custom Blocks

### Task 10: Create Hero block (full-viewport with parallax)

**Files:**
- Create: `src/blocks/HeroBlock/config.ts`
- Create: `src/blocks/HeroBlock/Component.tsx`
- Modify: `src/blocks/RenderBlocks.tsx`
- Modify: `src/collections/Pages/index.ts`

**Step 1: Define the Hero block config**

Create `src/blocks/HeroBlock/config.ts`:

```typescript
import type { Block } from 'payload'

export const HeroBlock: Block = {
  slug: 'heroBlock',
  interfaceName: 'HeroBlockType',
  labels: { singular: 'Hero', plural: 'Heroes' },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: 'Sacred Sound Sister',
    },
    {
      name: 'tagline',
      type: 'text',
      defaultValue: 'Rest is the medicine',
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'ctaLabel',
      type: 'text',
      defaultValue: 'Explore',
      admin: {
        description: 'Call-to-action button text. Leave empty to show scroll indicator instead.',
      },
    },
  ],
}
```

**Step 2: Create the Hero block component**

Create `src/blocks/HeroBlock/Component.tsx`:

```tsx
'use client'

import React from 'react'
import Image from 'next/image'
import type { Media } from '@/payload-types'

interface HeroBlockProps {
  heading: string
  tagline?: string
  backgroundImage: Media
  ctaLabel?: string
}

export const HeroBlockComponent: React.FC<HeroBlockProps> = ({
  heading,
  tagline,
  backgroundImage,
  ctaLabel,
}) => {
  const scrollToContent = () => {
    const nextSection = document.querySelector('[data-block]:nth-child(2)')
    nextSection?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative h-screen w-full overflow-hidden grain-overlay">
      {/* Background image with parallax */}
      {backgroundImage && typeof backgroundImage !== 'string' && (
        <Image
          src={backgroundImage.url || ''}
          alt={backgroundImage.alt || heading}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      )}

      {/* Gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--charcoal-root)]/70 via-[var(--charcoal-root)]/20 to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-end pb-24 text-center">
        <h1 className="font-display text-5xl font-light tracking-tight text-[var(--ritual-cream)] md:text-7xl lg:text-8xl">
          {heading}
        </h1>
        {tagline && (
          <p className="mt-4 font-sans text-sm font-medium uppercase tracking-[0.15em] text-[var(--soft-linen)]">
            {tagline}
          </p>
        )}
        {ctaLabel && (
          <button
            onClick={scrollToContent}
            className="mt-10 font-sans text-sm font-medium uppercase tracking-[0.08em] text-[var(--ritual-cream)] border border-[var(--ritual-cream)]/30 px-8 py-3 transition-all duration-300 hover:bg-[var(--ritual-cream)]/10 hover:border-[var(--ritual-cream)]/60 focus-visible:outline-2 focus-visible:outline-[var(--burnished-brass)]"
          >
            {ctaLabel}
          </button>
        )}
      </div>
    </section>
  )
}
```

**Step 3: Register in RenderBlocks.tsx**

Add the import and mapping:

```typescript
import { HeroBlockComponent } from '@/blocks/HeroBlock/Component'

const blockComponents = {
  // ...existing blocks
  heroBlock: HeroBlockComponent,
}
```

**Step 4: Add to Pages collection**

In `src/collections/Pages/index.ts`, import and add `HeroBlock` to the `layout.blocks` array.

**Step 5: Verify**

```bash
npm run dev
```

In admin, edit the home page. Add a "Hero" block. Upload an image, set heading/tagline. Verify it renders full-viewport on the frontend.

**Step 6: Commit**

```bash
git add src/blocks/HeroBlock/ src/blocks/RenderBlocks.tsx src/collections/Pages/index.ts
git commit -m "feat: add Hero block with full-viewport layout"
```

---

### Task 11: Create About block

**Files:**
- Create: `src/blocks/AboutBlock/config.ts`
- Create: `src/blocks/AboutBlock/Component.tsx`
- Modify: `src/blocks/RenderBlocks.tsx`
- Modify: `src/collections/Pages/index.ts`

**Step 1: Define config**

Create `src/blocks/AboutBlock/config.ts`:

```typescript
import type { Block } from 'payload'
import { lexicalEditor, HeadingFeature, FixedToolbarFeature, InlineToolbarFeature } from '@payloadcms/richtext-lexical'

export const AboutBlock: Block = {
  slug: 'aboutBlock',
  interfaceName: 'AboutBlockType',
  labels: { singular: 'About Section', plural: 'About Sections' },
  fields: [
    {
      name: 'sectionLabel',
      type: 'text',
      defaultValue: 'Meet Bracken',
      admin: { description: 'Small label above the heading.' },
    },
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'About',
    },
    {
      name: 'body',
      type: 'richText',
      required: true,
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h3', 'h4'] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ],
      }),
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'imagePosition',
      type: 'select',
      defaultValue: 'right',
      options: [
        { label: 'Image Left', value: 'left' },
        { label: 'Image Right', value: 'right' },
      ],
    },
  ],
}
```

**Step 2: Create component**

Create `src/blocks/AboutBlock/Component.tsx` - a two-column layout with image and rich text, the triquetra as a subtle watermark. Image position is configurable. Mobile stacks vertically.

**Step 3: Register in RenderBlocks and Pages collection**

Same pattern as Task 10.

**Step 4: Verify and commit**

```bash
git add src/blocks/AboutBlock/ src/blocks/RenderBlocks.tsx src/collections/Pages/index.ts
git commit -m "feat: add About block with image and rich text layout"
```

---

### Task 12: Create Offerings Grid block

**Files:**
- Create: `src/blocks/OfferingsBlock/config.ts`
- Create: `src/blocks/OfferingsBlock/Component.tsx`
- Modify: `src/blocks/RenderBlocks.tsx`
- Modify: `src/collections/Pages/index.ts`

**Step 1: Define config**

The Offerings block pulls from the Offerings collection and groups by category.

```typescript
import type { Block } from 'payload'

export const OfferingsBlock: Block = {
  slug: 'offeringsBlock',
  interfaceName: 'OfferingsBlockType',
  labels: { singular: 'Offerings Grid', plural: 'Offerings Grids' },
  fields: [
    {
      name: 'sectionLabel',
      type: 'text',
      defaultValue: 'Offerings',
    },
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'Sound Experiences',
    },
    {
      name: 'description',
      type: 'textarea',
      defaultValue: 'All sessions can be adapted to create bespoke experiences tailored to your group.',
    },
    {
      name: 'offerings',
      type: 'relationship',
      relationTo: 'offerings',
      hasMany: true,
      admin: {
        description: 'Select which offerings to display. Leave empty to show all.',
      },
    },
  ],
}
```

**Step 2: Create component**

Card grid grouped by category (Group, Corporate, Individual, Retreats). Each card shows title, description, duration. Warm Sand background cards with brand shadows. On mobile, cards stack single-column.

**Step 3: Register and verify**

Same pattern. Add offerings in admin, verify they render grouped by category.

**Step 4: Commit**

```bash
git add src/blocks/OfferingsBlock/ src/blocks/RenderBlocks.tsx src/collections/Pages/index.ts
git commit -m "feat: add Offerings Grid block with category grouping"
```

---

### Task 13: Create Testimonials Carousel block

**Files:**
- Create: `src/blocks/TestimonialsBlock/config.ts`
- Create: `src/blocks/TestimonialsBlock/Component.tsx`
- Modify: `src/blocks/RenderBlocks.tsx`
- Modify: `src/collections/Pages/index.ts`

**Step 1: Define config**

```typescript
import type { Block } from 'payload'

export const TestimonialsBlock: Block = {
  slug: 'testimonialsBlock',
  interfaceName: 'TestimonialsBlockType',
  labels: { singular: 'Testimonials', plural: 'Testimonials' },
  fields: [
    {
      name: 'sectionLabel',
      type: 'text',
      defaultValue: 'Kind Words',
    },
    {
      name: 'testimonials',
      type: 'relationship',
      relationTo: 'testimonials',
      hasMany: true,
      admin: {
        description: 'Select testimonials to display. Leave empty to show all featured.',
      },
    },
  ],
}
```

**Step 2: Create component**

Horizontal scroll or fade carousel on Warm Sand background. Large quote marks in Bracken Taupe. Quote text in Lora italic. Attribution in Raleway. CSS-only scroll snap for simplicity (no JS carousel library). Triquetra as section accent.

Touch targets: navigation dots/arrows minimum 44px. `prefers-reduced-motion` disables auto-advance.

**Step 3: Register and verify**

Add testimonials in admin, add block to home page, verify rendering.

**Step 4: Commit**

```bash
git add src/blocks/TestimonialsBlock/ src/blocks/RenderBlocks.tsx src/collections/Pages/index.ts
git commit -m "feat: add Testimonials carousel block"
```

---

### Task 14: Create Gallery / As Seen At block

**Files:**
- Create: `src/blocks/GalleryBlock/config.ts`
- Create: `src/blocks/GalleryBlock/Component.tsx`
- Modify: `src/blocks/RenderBlocks.tsx`
- Modify: `src/collections/Pages/index.ts`

**Step 1: Define config**

```typescript
import type { Block } from 'payload'

export const GalleryBlock: Block = {
  slug: 'galleryBlock',
  interfaceName: 'GalleryBlockType',
  labels: { singular: 'Gallery / As Seen At', plural: 'Galleries' },
  fields: [
    {
      name: 'sectionLabel',
      type: 'text',
      defaultValue: 'As Seen At',
    },
    {
      name: 'events',
      type: 'relationship',
      relationTo: 'events',
      hasMany: true,
      admin: {
        description: 'Select events/venues to display.',
      },
    },
    {
      name: 'images',
      type: 'array',
      admin: {
        description: 'Additional gallery photos not tied to a specific event.',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
  ],
}
```

**Step 2: Create component**

Two sections: a photo grid (masonry-style with CSS columns) and a row of venue/brand names or logos. Photos get the gradient overlay treatment from the brand guidelines. Venue names in Raleway uppercase with generous letter-spacing.

**Step 3: Register and verify**

**Step 4: Commit**

```bash
git add src/blocks/GalleryBlock/ src/blocks/RenderBlocks.tsx src/collections/Pages/index.ts
git commit -m "feat: add Gallery / As Seen At block"
```

---

### Task 15: Create Contact block

**Files:**
- Create: `src/blocks/ContactBlock/config.ts`
- Create: `src/blocks/ContactBlock/Component.tsx`
- Modify: `src/blocks/RenderBlocks.tsx`
- Modify: `src/collections/Pages/index.ts`

**Step 1: Define config**

```typescript
import type { Block } from 'payload'

export const ContactBlock: Block = {
  slug: 'contactBlock',
  interfaceName: 'ContactBlockType',
  labels: { singular: 'Contact Section', plural: 'Contact Sections' },
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: "Let's Work Together",
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'email',
      type: 'email',
      defaultValue: 'Bracken.roots7@gmail.com',
    },
    {
      name: 'phone',
      type: 'text',
      defaultValue: '+44 07596 086607',
    },
    {
      name: 'instagramHandle',
      type: 'text',
      defaultValue: '@sacred.sound.sister',
    },
    {
      name: 'secondaryInstagram',
      type: 'text',
      defaultValue: '@brackenroots',
    },
    {
      name: 'showContactForm',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
}
```

**Step 2: Create component**

Two-column layout: contact form (name, email, message) on the left, direct contact details on the right. Form submits via Payload's form-builder plugin or a simple API route that sends an email. Triquetra as closing ornament. Charcoal Root background with light text for visual weight at page bottom.

Form accessibility: visible labels (not placeholder-only), error messages below fields, loading state on submit button, success feedback.

**Step 3: Register and verify**

**Step 4: Commit**

```bash
git add src/blocks/ContactBlock/ src/blocks/RenderBlocks.tsx src/collections/Pages/index.ts
git commit -m "feat: add Contact block with form and details"
```

---

## Phase 5: Header & Footer

### Task 16: Customize Header

**Files:**
- Modify: `src/Header/Component.client.tsx`
- Modify: `src/Header/Nav/index.tsx` (or equivalent)
- Create: `src/components/Logo/SacredSoundSisterLogo.tsx`
- Add: `public/logo.png` (triquetra logo asset)

**Step 1: Add logo component**

Create a logo component that renders the triquetra. Use the existing `IMG_1954.png` (convert to SVG if available, otherwise use the PNG with Next.js Image).

**Step 2: Customize header styling**

Modify the header client component:
- Sticky positioning with `backdrop-blur-md` on scroll
- Background transitions from transparent (at top) to `var(--ritual-cream)/95` (on scroll)
- Logo (triquetra) on the left
- Navigation links on the right: About, Offerings, Testimonials, Contact
- Raleway font, medium weight, uppercase, generous letter-spacing
- Hamburger menu on mobile with slide-in drawer
- Active section highlighted with Burnished Brass underline

**Step 3: Verify**

Test sticky behaviour, blur effect, mobile hamburger, and active link highlighting.

**Step 4: Commit**

```bash
git add src/Header/ src/components/Logo/ public/logo.png
git commit -m "feat: customize header with triquetra logo and brand styling"
```

---

### Task 17: Customize Footer

**Files:**
- Modify: `src/Footer/Component.tsx`

**Step 1: Restyle footer**

- Charcoal Root (`#3D3228`) background with Ritual Cream text
- Triquetra logo centred
- Contact details: email, phone, Instagram handles
- Simple copyright line
- Remove theme toggle (single-theme site)
- Grain texture overlay for consistency

**Step 2: Verify and commit**

```bash
git add src/Footer/
git commit -m "feat: customize footer with brand styling and contact info"
```

---

## Phase 6: Brand Assets & Seed Data

### Task 18: Organise brand assets

**Files:**
- Create: `src/endpoints/seed/assets/` (copy brand images here)
- Rename existing images to descriptive names

**Step 1: Copy and rename brand assets**

```
IMG_1954.png     → logo-triquetra.png
IMG_1963.JPG     → bracken-flute-singing-bowls.jpg
IMG_1964.JPG     → bracken-crystal-bowls-gongs.jpg
IMG_1965.JPG     → bracken-playing-bowls-candles.jpg
```

**Step 2: Create favicon**

Generate a simplified triquetra favicon from the logo at 32x32 and 16x16.

**Step 3: Add Open Graph image**

Create a 1200x630 OG image using the logo on a Ritual Cream background.

**Step 4: Commit**

```bash
git add public/favicon.ico public/og-image.jpg src/endpoints/seed/assets/
git commit -m "feat: organise brand assets and add favicon/OG image"
```

---

### Task 19: Write seed script with initial content

**Files:**
- Modify: `src/endpoints/seed/index.ts`
- Create: `src/endpoints/seed/home-page.ts`
- Create: `src/endpoints/seed/testimonials.ts`
- Create: `src/endpoints/seed/offerings.ts`
- Create: `src/endpoints/seed/events.ts`

**Step 1: Create seed data files**

**testimonials.ts** - Seed the 5 testimonials from the brand guidelines:
1. Kate Luke - "My experience in this session..."
2. Louise Rowley - "Holly's breathwork was beautiful..."
3. Anonymous - "Bracken works with sound with such reverence..."
4. Anonymous - "I participated in one of Bracken's soundbaths..."
5. Anonymous - "Bracken's sound bath was incredible..."

**offerings.ts** - Seed all offerings from the PDF portfolio:
- Group: Sacred Sound Journey, Sound Bath & Song, Sound Bath & Sharing Circle, Sauna Sound Rituals
- Corporate: Nervous System Reset, Nature Connection Sound Retreat
- Individual: Bespoke 1:1 Sound Healing
- Retreats: Sound Sanctuary Day Retreat, Sound Bath & Moon Ceremony

**events.ts** - Seed past events:
- Shoreditch & Soul, Essaouira Retreat, Saunaverse Festival, Bingham Riverhouse, EmbodayFest Hackney, Battle Retreat, Richmond Retreat, etc.

**home-page.ts** - Seed the home page with blocks in order:
1. Hero block (heading: "Sacred Sound Sister", tagline: "Rest is the medicine")
2. About block (Bracken's bio from PDF)
3. Offerings block (all offerings)
4. Testimonials block (all featured)
5. Gallery block (all events)
6. Contact block (default details)

**Step 2: Update seed/index.ts**

Modify the main seed function to call the new seed files instead of the template defaults.

**Step 3: Run seed**

```bash
npm run dev
# Then trigger seed from admin or API
```

**Step 4: Verify**

Full home page renders with all sections populated.

**Step 5: Commit**

```bash
git add src/endpoints/seed/
git commit -m "feat: seed initial content from brand portfolio"
```

---

## Phase 7: Motion, Interactions & Visual Depth

### Task 20: Create motion system and scroll reveal utility

**Files:**
- Create: `src/components/ScrollReveal/index.tsx`
- Modify: `src/app/(frontend)/globals.css`

**Step 1: Add motion tokens to globals.css**

```css
:root {
  --duration-reveal: 600ms;
  --duration-hero: 500ms;
  --duration-stagger: 300ms;
  --duration-stagger-list: 80ms;
  --duration-hover: 200ms;
  --easing-settle: cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
```

**Step 2: Add scroll reveal CSS**

```css
[data-animate] {
  opacity: 0;
  transform: translateY(24px);
}

[data-animate].revealed {
  opacity: 1;
  transform: translateY(0);
  transition: opacity var(--duration-reveal) var(--easing-settle),
              transform var(--duration-reveal) var(--easing-settle);
}

[data-animate-stagger].revealed > * {
  opacity: 1;
  transform: translateY(0);
  transition: opacity var(--duration-reveal) var(--easing-settle),
              transform var(--duration-reveal) var(--easing-settle);
}

[data-animate-stagger] > * {
  opacity: 0;
  transform: translateY(16px);
}

[data-animate-stagger].revealed > *:nth-child(1) { transition-delay: 0ms; }
[data-animate-stagger].revealed > *:nth-child(2) { transition-delay: 80ms; }
[data-animate-stagger].revealed > *:nth-child(3) { transition-delay: 160ms; }
[data-animate-stagger].revealed > *:nth-child(4) { transition-delay: 240ms; }
[data-animate-stagger].revealed > *:nth-child(5) { transition-delay: 320ms; }
[data-animate-stagger].revealed > *:nth-child(6) { transition-delay: 400ms; }

@media (prefers-reduced-motion: reduce) {
  [data-animate],
  [data-animate-stagger] > * {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
```

**Step 3: Create ScrollReveal component**

Create `src/components/ScrollReveal/index.tsx` - a lightweight wrapper that uses Intersection Observer to add the `.revealed` class when elements enter the viewport. Accepts `stagger` boolean prop.

```tsx
'use client'

import { useEffect, useRef } from 'react'

interface ScrollRevealProps {
  children: React.ReactNode
  stagger?: boolean
  className?: string
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({ children, stagger, className }) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Respect reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('revealed')
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('revealed')
          observer.unobserve(el)
        }
      },
      { threshold: 0.15 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      data-animate={stagger ? undefined : ''}
      data-animate-stagger={stagger ? '' : undefined}
      className={className}
    >
      {children}
    </div>
  )
}
```

**Step 4: Verify**

Wrap a section in `<ScrollReveal>`, scroll to it, confirm the fade-up animation triggers. Test with `prefers-reduced-motion` enabled in browser dev tools.

**Step 5: Commit**

```bash
git add src/components/ScrollReveal/ src/app/\(frontend\)/globals.css
git commit -m "feat: add scroll reveal motion system with reduced-motion support"
```

---

### Task 21: Add hero load sequence animation

**Files:**
- Modify: `src/blocks/HeroBlock/Component.tsx`

**Step 1: Add staggered entrance animation to hero**

The hero uses a CSS animation sequence, not Intersection Observer (it's always visible on load):

```css
@keyframes heroFadeUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero-heading {
  opacity: 0;
  animation: heroFadeUp 500ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 600ms forwards;
}

.hero-tagline {
  opacity: 0;
  animation: heroFadeUp 500ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 900ms forwards;
}

.hero-cta {
  opacity: 0;
  animation: heroFadeUp 500ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 1200ms forwards;
}

@media (prefers-reduced-motion: reduce) {
  .hero-heading, .hero-tagline, .hero-cta {
    opacity: 1;
    animation: none;
  }
}
```

Apply these classes to the hero heading, tagline, and CTA elements.

**Step 2: Verify**

Hard refresh the page. Confirm: image appears first, then heading fades up, then tagline, then CTA - like a slow breath.

**Step 3: Commit**

```bash
git add src/blocks/HeroBlock/ src/app/\(frontend\)/globals.css
git commit -m "feat: add hero staggered load sequence animation"
```

---

### Task 22: Add interactive states to all clickable elements

**Files:**
- Modify: `src/app/(frontend)/globals.css`
- Modify: Various block components and Header/Footer

**Step 1: Add global interactive state styles**

```css
/* Navigation link underline slide */
.nav-link {
  position: relative;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 1px;
  background: var(--bracken-taupe);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 200ms ease-out;
}

.nav-link:hover::after {
  transform: scaleX(1);
}

.nav-link:active {
  opacity: 0.8;
}

/* CTA button states */
.btn-primary {
  transition: box-shadow 200ms ease-out, transform 200ms ease-out;
}

.btn-primary:hover {
  box-shadow: 0 4px 20px rgba(184, 151, 106, 0.25);
}

.btn-primary:active {
  transform: scale(0.98);
}

/* Card lift */
.card-interactive {
  transition: transform 200ms ease-out, box-shadow 200ms ease-out;
}

.card-interactive:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 30px rgba(155, 139, 122, 0.12), 0 4px 8px rgba(155, 139, 122, 0.08);
}

.card-interactive:active {
  transform: translateY(-2px);
}

/* Universal focus-visible */
.btn-primary:focus-visible,
.nav-link:focus-visible,
.card-interactive:focus-visible,
a:focus-visible,
button:focus-visible,
input:focus-visible,
textarea:focus-visible {
  outline: 2px solid var(--burnished-brass);
  outline-offset: 4px;
}

/* Form input states */
input:hover, textarea:hover {
  border-color: var(--stone);
}

input:focus, textarea:focus {
  border-color: var(--burnished-brass);
  box-shadow: 0 0 0 3px rgba(184, 151, 106, 0.15);
}
```

**Step 2: Apply classes to all block components**

Go through each block component and apply: `nav-link` to header links, `btn-primary` to CTA buttons, `card-interactive` to offering cards and any clickable cards.

**Step 3: Verify**

Tab through every interactive element. Verify hover, focus-visible (Burnished Brass ring), and active states on: nav links, CTA buttons, offering cards, testimonial nav, footer links, form inputs, submit button.

**Step 4: Commit**

```bash
git add -A
git commit -m "feat: add hover, focus-visible, and active states to all interactive elements"
```

---

### Task 23: Add image treatment, sound wave dividers, and depth layers

**Files:**
- Create: `src/components/SoundWaveDivider/index.tsx`
- Create: `src/components/ImageWithTreatment/index.tsx`
- Modify: `src/app/(frontend)/globals.css`
- Modify: Various block components

**Step 1: Create sound wave divider component**

```tsx
export const SoundWaveDivider: React.FC<{ className?: string }> = ({ className }) => (
  <div className={className}>
    <svg viewBox="0 0 1440 24" preserveAspectRatio="none" className="w-full h-6">
      <path
        d="M0,12 C120,4 240,20 360,12 C480,4 600,20 720,12 C840,4 960,20 1080,12 C1200,4 1320,20 1440,12"
        stroke="var(--soft-linen)"
        fill="none"
        strokeWidth="1"
      />
    </svg>
  </div>
)
```

**Step 2: Create image treatment component**

A wrapper that adds the gradient overlay + `mix-blend-multiply` colour treatment:

```tsx
import Image from 'next/image'

interface ImageWithTreatmentProps {
  src: string
  alt: string
  fill?: boolean
  className?: string
  priority?: boolean
  intensity?: 'light' | 'medium' | 'strong'
}

export const ImageWithTreatment: React.FC<ImageWithTreatmentProps> = ({
  src, alt, fill, className, priority, intensity = 'medium'
}) => {
  const gradientOpacity = intensity === 'light' ? '40' : intensity === 'strong' ? '70' : '60'

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image src={src} alt={alt} fill={fill} priority={priority} className="object-cover" />
      {/* Gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-t from-[var(--charcoal-root)]/${gradientOpacity} via-transparent to-transparent`} />
      {/* Warm colour treatment */}
      <div className="absolute inset-0 bg-[var(--bracken-taupe)] mix-blend-multiply opacity-[0.08]" />
    </div>
  )
}
```

**Step 3: Add depth/layering CSS and radial gradient glows**

```css
/* Surface depth layers */
.surface-base { background: var(--ritual-cream); }
.surface-elevated { background: var(--warm-sand); box-shadow: 0 1px 3px rgba(155, 139, 122, 0.08); }
.surface-floating { background: var(--ritual-cream); box-shadow: 0 10px 30px rgba(155, 139, 122, 0.12); }

/* Radial gradient accent glow */
.glow-brass::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 30%;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(184, 151, 106, 0.06) 0%, transparent 70%);
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: 0;
}

/* Z-index scale */
:root {
  --z-base: 0;
  --z-grain: 1;
  --z-content: 10;
  --z-header: 40;
  --z-nav-drawer: 50;
  --z-modal: 100;
}
```

**Step 4: Integrate into blocks**

- Replace `<Image>` with `<ImageWithTreatment>` in Hero, About, and Gallery blocks
- Add `<SoundWaveDivider>` between sections in RenderBlocks.tsx
- Apply `surface-elevated` to testimonial section and offering cards
- Apply `surface-floating` to mobile nav drawer
- Add `glow-brass` to About section wrapper
- Apply z-index tokens to header, grain overlay, nav drawer

**Step 5: Verify**

Check that images have the warm tonal treatment, sound wave dividers render between sections, cards feel elevated from the background, and the radial glow is visible but subtle in the About section.

**Step 6: Commit**

```bash
git add src/components/SoundWaveDivider/ src/components/ImageWithTreatment/ src/app/\(frontend\)/globals.css src/blocks/
git commit -m "feat: add image treatment, sound wave dividers, surface depth, and radial glow"
```

---

### Task 24: Add spatial composition - grid-breaking moments

**Files:**
- Modify: `src/blocks/AboutBlock/Component.tsx`
- Modify: `src/blocks/TestimonialsBlock/Component.tsx`

**Step 1: About section - overlapping image**

In the About block component, make the image extend ~60px beyond its column:

```tsx
{/* Image extends beyond column */}
<div className="relative md:-mr-16 lg:-mr-24">
  <ImageWithTreatment
    src={image.url}
    alt={image.alt || 'Bracken Roots'}
    fill
    className="aspect-[3/4] rounded-sm"
    intensity="light"
  />
</div>
```

The negative margin creates the overlap. On mobile (`< md`), it bleeds to screen edge with `mx-0` and no rounding.

**Step 2: Testimonials - oversized quotation marks**

```tsx
<div className="relative">
  {/* Decorative quote mark - overflows container */}
  <span
    className="absolute -top-8 -left-4 font-display text-[120px] leading-none text-[var(--soft-linen)] select-none pointer-events-none"
    aria-hidden="true"
  >
    &ldquo;
  </span>
  <blockquote className="relative z-10 font-body text-lg italic text-[var(--deep-earth)]">
    {quote}
  </blockquote>
</div>
```

**Step 3: Verify**

Check that the About image breaks the grid boundary on desktop but remains clean on mobile. Confirm the quotation marks extend outside the quote container without causing horizontal scroll.

**Step 4: Commit**

```bash
git add src/blocks/AboutBlock/ src/blocks/TestimonialsBlock/
git commit -m "feat: add grid-breaking spatial composition to About and Testimonials"
```

---

## Phase 8: Final Polish & Deploy

### Task 25: Accessibility and responsive pass

**Files:**
- Various block components

**Step 1: Accessibility checklist**

Run through each block:
- [ ] All images have descriptive alt text
- [ ] All contrast ratios meet WCAG AA (4.5:1)
- [ ] Focus-visible states on every interactive element (Burnished Brass outline)
- [ ] Hover and active states on every interactive element
- [ ] Skip-to-content link in layout
- [ ] Semantic heading hierarchy (h1 in Hero, h2 in sections, h3 in cards)
- [ ] Touch targets minimum 44px with 8px minimum spacing between targets
- [ ] `prefers-reduced-motion` disables all animations (scroll reveals, hero sequence, parallax)
- [ ] Form labels visible (not placeholder-only)
- [ ] Form errors appear below each field with recovery guidance
- [ ] Form submit button shows loading spinner during async
- [ ] Form success state shows brief visual confirmation
- [ ] `autocomplete` attributes on name/email fields
- [ ] Keyboard navigable throughout (tab order matches visual order)
- [ ] `aria-label` on icon-only elements (hamburger menu, social links)
- [ ] No horizontal scroll at any breakpoint
- [ ] Grid-breaking elements (About image, quote marks) don't cause overflow

**Step 2: Responsive check**

Test at all breakpoints: 375px, 768px, 1024px, 1440px.
- Hero text readable on mobile
- Offerings cards stack on mobile, 2-col on tablet, 4-col on desktop
- Navigation hamburger works on mobile
- About section image bleeds to screen edge on mobile, overlaps grid on desktop
- Images don't overflow viewport
- Line lengths stay within 65-75 characters
- Sound wave dividers scale properly
- Grain texture doesn't cause performance issues on mobile

**Step 3: Commit**

```bash
git add -A
git commit -m "fix: accessibility and responsive polish"
```

---

### Task 26: Performance optimisation

**Files:**
- Modify: `src/app/(frontend)/layout.tsx`
- Modify: various components

**Step 1: Preloading**

- Preload Cormorant Garamond (display font) in layout head
- Hero image gets `priority` prop on Next.js Image component
- All below-fold images use `loading="lazy"`

**Step 2: Image optimisation**

- Verify Next.js Image component is used everywhere (not `<img>`)
- Confirm responsive `sizes` prop is set correctly
- Verify Vercel Blob storage adapter has `clientUploads: true`

**Step 3: Bundle check**

```bash
npm run build
```

Review output for any large chunks. Ensure no unnecessary client-side JavaScript.

**Step 4: Commit**

```bash
git add -A
git commit -m "perf: optimise font loading, images, and bundle size"
```

---

### Task 27: Deploy to Vercel

**Step 1: Push to GitHub**

```bash
git remote add origin <github-repo-url>
git push -u origin main
```

**Step 2: Connect to Vercel**

- Import project in Vercel dashboard
- Add Neon Postgres integration (sets `POSTGRES_URL`)
- Add Vercel Blob storage (sets `BLOB_READ_WRITE_TOKEN`)
- Set environment variables: `PAYLOAD_SECRET`, `CRON_SECRET`, `NEXT_PUBLIC_SERVER_URL`

**Step 3: Deploy and verify**

- Verify build succeeds
- Run database migrations (should happen automatically in build)
- Navigate to live URL
- Create admin user at `/admin`
- Run seed script
- Verify all sections render correctly
- Test on mobile device

**Step 4: Verify Bracken can edit**

- Log into admin panel
- Edit a testimonial
- Upload a new image
- Add a new offering
- Reorder blocks on the home page
- Use Live Preview to see changes

---

## Summary

| Phase | Tasks | Estimated Commits |
|-------|-------|-------------------|
| 1. Scaffolding | Tasks 1-2 | 2 |
| 2. Brand Theme | Tasks 3-5 | 3 |
| 3. Collections | Tasks 6-9 | 4 |
| 4. Custom Blocks | Tasks 10-15 | 6 |
| 5. Header & Footer | Tasks 16-17 | 2 |
| 6. Assets & Seed | Tasks 18-19 | 2 |
| 7. Motion, Interactions & Visual Depth | Tasks 20-24 | 5 |
| 8. Final Polish & Deploy | Tasks 25-27 | 3 |
| **Total** | **27 tasks** | **~27 commits** |

**Critical path:** Phase 1 → Phase 2 → Phase 3 → Phase 4 → Phase 5 → Phase 6 → Phase 7 → Phase 8

Phases 3 and 4 have internal parallelism (collections can be built independently, blocks can be built independently). Phase 7 (motion/interactions) can partially overlap with Phase 6 (seed data) as they touch different files.

---

*Reference: Brand guidelines at `docs/plans/2026-03-14-sacred-sound-sister-brand-guidelines.md`*
