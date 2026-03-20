# Deftly — Product Architecture & Roadmap

**Date:** 2026-03-19
**Status:** Planning
**Vision:** A productised website platform where clients self-serve through an onboarding flow, get an auto-generated site from a template, and manage their own content via Payload CMS.

---

## Product Flow

```
1. Client visits deftly.co → picks a template → fills in onboarding form
   (business name, services, contact details, uploads logo + photos)

2. Deftly backend:
   - Creates a tenant record in the shared database
   - Generates a preview using the template + their data
   - Shows a live preview link (e.g. preview.deftly.co/abc123)

3. Client purchases (Stripe):
   - Vercel API creates a new project from the template repo
   - Sets env vars (DATABASE_URI scoped to tenant, PAYLOAD_SECRET, etc.)
   - Triggers first deploy
   - Seeds content from onboarding form data
   - Auto-creates their Payload admin user
   - Sends login credentials via email

4. Client visits their-domain.com → sees their site
   Client visits their-domain.com/admin → edits content via Payload CMS
```

---

## Architecture

### Overview

```
Deftly Platform (deftly.co)
├── Marketing site + onboarding flow
├── Template registry
├── Stripe billing
├── Deployment automation (Vercel API)
├── Cron jobs (analytics, backups, monitoring)
└── Admin dashboard (your view of all clients)

Shared Infrastructure
├── Neon Postgres (shared DB, tenant-scoped)
├── Vercel Blob (shared media storage)
├── Umami (shared analytics, one instance, per-site tracking)
└── Resend (transactional email)

Client Sites (one Vercel project per client)
├── Next.js 15 + Payload CMS v3
├── Template-specific components
├── Tenant-scoped data queries
└── Custom domain + SSL
```

### Templates

Each template is:
- A set of **React components** (layout, sections, visual style)
- A **Payload collection schema** (fields the client can edit)
- A **theme config** (colours, fonts, spacing)
- **Default content** (placeholder text/images for preview)

Templates define both the frontend AND the CMS schema. A plumber's admin panel only shows fields relevant to a trades site — not a testimonial carousel config.

Current templates:
- `wellness-premium` — Bracken's site (Sacred Sound Sister)
- `trades-basic` — TBD, first scalable template for tradespeople

### Database Strategy

**Shared Neon Postgres, tenant-scoped.** Every collection has a `tenantId` field. Payload access control scopes all reads/writes by tenant. One database for all clients.

- At 100 clients: ~1 database, cheap, simple backups
- At 1000+: can shard by region or client tier if needed
- Payload's `@payloadcms/plugin-multi-tenant` handles the scoping

### Why Separate Deploys Per Client (Not One Monolith)

- Templates are structurally different — no shared components between wellness and trades
- Isolation — one client's error doesn't take down others
- Custom domains are simpler per-project
- Performance — each site only bundles its own template code
- Deployment automation via Vercel API makes this painless

---

## Template Structure

### Shared Across All Templates

**Collections:**
- `Users` — Payload auth, admin access
- `Media` — Image uploads with auto-generated sizes
- `FormSubmissions` — Contact form entries (name, email, message, read status)
- `MonthlyReports` — Analytics snapshots (see Add-ons below)
- `ContentBackups` — Nightly JSON snapshots

**Globals:**
- `SiteSettings` — Site name, contact info, social links, footer text

**Components:**
- Contact form with API route
- Header/Footer
- Back to top button
- ScrollReveal animations
- Wave/section dividers

### Template-Specific

**wellness-premium:**
- Offerings collection (title, description, duration, category, icon)
- Testimonials collection (quote, attribution, carousel)
- Gallery collection (image, alt, aspect ratio, grid layout)
- Hero with Ken Burns animation, breathing logo
- About section with watermark

**trades-basic (planned):**
- Services collection (title, description, price range)
- Reviews collection (pulled from Google Business Profile or manual)
- Before/After gallery
- Service area section
- Quote request form (extended FormSubmissions)
- Trust badges / accreditations

---

## Pricing Tiers

| Tier | Includes | Price Model |
|------|----------|-------------|
| **Basic** | Site + hosting + Payload admin + SSL + custom domain | £X/month |
| **Growth** | + Monthly analytics email + SEO monitoring + Uptime alerts + Nightly backups | £X+Y/month |
| **Pro** | + Google Reviews sync + Booking integration + Blog + Custom domain email | £X+Y+Z/month |
| **One-off add-ons** | AI copy generation, extra language, custom design tweaks | Per-item |

---

## Add-Ons & Automated Features

### Monthly Analytics Report
- **How:** Umami REST API → Vercel Cron (1st of month) → query last month's stats → store in `MonthlyReports` collection → email via Resend
- **Data:** Visitors, pageviews, top pages, top referrers, top countries, form submissions count, new vs replied enquiries
- **Client sees:** Email summary + historical reports in Payload admin
- **You see:** Performance across all client sites in your Deftly dashboard
- **Schema:**

```
MonthlyReports
├── month              (date — "2026-02-01")
├── tenantId           (text)
├── visitors           (number)
├── pageviews          (number)
├── topPages           (JSON)
├── topReferrers       (JSON)
├── topCountries       (JSON)
├── formSubmissions    (number)
├── newEnquiries       (number)
├── repliedCount       (number)
├── emailSentAt        (date)
```

### SEO Health Check
- **How:** Run Lighthouse CI programmatically against each site monthly via cron
- **Data:** Performance, accessibility, SEO, best practices scores
- **Value:** Proactive — flag issues like oversized images before the client notices
- **Store in:** `SEOReports` collection alongside monthly analytics

### Uptime Monitoring
- **How:** Cron pings each client site every 5 minutes
- **Alert:** Email client + you if down
- **Report:** Uptime percentage included in monthly report ("99.99% available")
- **Cost:** Essentially free — a lightweight cron function

### Nightly Content Backups
- **How:** Nightly cron dumps all Payload content (offerings, testimonials, settings) to JSON → store in Vercel Blob
- **Retention:** Last 30 days
- **Restore:** One-click restore from admin panel or manual restore by you
- **Value:** Safety net if client accidentally deletes content

### Contact Form Automation
- **Instant notification:** Email to client when someone submits the form
- **Auto-responder:** Email to enquirer ("Thanks, we'll get back to you within 24 hours")
- **Weekly digest:** Cron emails client a summary of unanswered enquiries
- **All via Resend**, triggered by Payload `afterChange` hook + cron

### Google Business Profile Reviews (trades)
- **How:** Google Business Profile API, polled daily
- **Store in:** `Reviews` collection in Payload
- **Render:** Automatically on the site — client never copy-pastes reviews
- **High value for trades** — reviews are their lifeblood

### Booking Integration
- **How:** Config field in Payload where client pastes their Cal.com/Calendly link
- **Render:** "Book Now" section in template
- **Low effort**, high perceived value for service businesses

### Blog / Content Marketing
- **Collection:** `Posts` (title, body rich text, featured image, publish date, slug)
- **Template:** Renders `/blog` and `/blog/[slug]` pages
- **Upsell:** "Content marketing add-on"
- **SEO benefit** for clients who use it

### Custom Domain Email
- **How:** Cloudflare Email Routing (or Resend)
- **What:** `hello@their-domain.com` forwarding to their Gmail
- **Setup:** Automated when client buys domain through you
- **Almost pure margin** — Cloudflare routing is free

### AI Content Generation
- **How:** Claude API called from Payload admin
- **Onboarding:** Auto-generate service descriptions from business type + location + target audience
- **Ongoing:** "Generate blog post" button in admin
- **Context:** Already have the onboarding data to feed the prompt

### Multi-Language
- **How:** Payload's built-in localisation
- **Translation:** Automated via Claude API, stored as locale variants
- **Render:** Site switches based on browser language or toggle
- **Charge per additional language**

### Lead Attribution Dashboard (premium)
- **How:** UTM parameter tracking + referrer attribution on form submissions
- **Value:** "You got 12 enquiries this month: 7 from Google, 3 from Instagram, 2 direct"
- **Gold for trades clients** spending money on ads

---

## Build Phases

### Phase 1: Ship Bracken (now)
- Deploy Sacred Sound Sister to Vercel
- Set up shared Neon Postgres (`deftly-db`) + Vercel Blob (`deftly-media`)
- Bracken gets Payload admin access
- See: `docs/plans/2026-03-19-deploy-bracken-live.md`

### Phase 2: Trades Template
- Build `trades-basic` template
- Forces out the shared vs template-specific boundary
- Services, Reviews, Before/After gallery, Quote form
- Test with a real trades client

### Phase 3: Deftly Platform MVP
- Marketing site at deftly.co
- Template picker + onboarding form
- Preview renderer
- Stripe checkout
- Vercel API integration for automated project creation
- Seed script that populates from onboarding data

### Phase 4: Automated Add-Ons
- Umami analytics + monthly email reports
- Nightly content backups
- Uptime monitoring
- Contact form email automation
- These become the "Growth" tier

### Phase 5: Premium Features
- Google Reviews sync
- Booking integration
- Blog collection + template pages
- Custom domain email
- AI content generation
- These become the "Pro" tier + one-off add-ons

### Phase 6: Scale
- Multi-tenant plugin for shared database
- Deftly admin dashboard (your view of all clients, billing, health)
- Template marketplace (add new templates without rebuilding the platform)
- Client self-serve domain management
- Automated Payload updates across all client sites via Vercel API

---

## Tech Stack Summary

| Layer | Technology |
|-------|-----------|
| Client sites | Next.js 15 + Payload CMS v3 |
| Deftly platform | Next.js (separate app) |
| Database | Neon Serverless Postgres (shared) |
| Media storage | Vercel Blob |
| Hosting | Vercel (one project per client site) |
| Analytics | Umami (self-hosted or Cloud) |
| Email | Resend |
| Payments | Stripe |
| Cron jobs | Vercel Cron Functions |
| AI | Claude API (content generation) |
| DNS/Email routing | Cloudflare |
| Deployment automation | Vercel REST API |
