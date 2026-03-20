# Deploy Bracken's Site Live

**Date:** 2026-03-19
**Status:** Ready to execute
**Goal:** Get Sacred Sound Sister live on Vercel with Payload CMS admin so Bracken can self-manage content.
**Estimated time:** ~30 minutes

---

## Prerequisites

- GitHub repo pushed with the Payload CMS migration (done)
- Vercel account (free tier is fine)
- Bracken's domain (or use a .vercel.app URL to start)

---

## Step 1: Create the shared database

1. Go to [Vercel Dashboard](https://vercel.com) → Storage → Create
2. Select **Neon Serverless Postgres**
3. Name it `deftly-db` (not client-specific — this is the shared database for all future clients)
4. Region: pick the closest to Bracken's audience (e.g. `eu-west-1` for UK)
5. Copy the `DATABASE_URI` connection string — you'll need it in Step 3

**Why `deftly-db`?** When you scale to multiple clients, they'll share this database with tenant-scoped queries. Starting with the right name avoids a migration later.

---

## Step 2: Create Blob storage

1. Vercel Dashboard → Storage → Create → **Blob**
2. Name it `deftly-media`
3. Copy the `BLOB_READ_WRITE_TOKEN`

This is where images go when Bracken uploads photos through the admin panel.

---

## Step 3: Deploy to Vercel

1. Push the repo to GitHub (if not already)
2. Vercel Dashboard → Add New Project → Import the GitHub repo
3. Framework preset: **Next.js** (should auto-detect)
4. Set these environment variables:

| Variable | Value |
|----------|-------|
| `DATABASE_URI` | Connection string from Step 1 |
| `PAYLOAD_SECRET` | Generate with `openssl rand -hex 32` in terminal |
| `BLOB_READ_WRITE_TOKEN` | Token from Step 2 |
| `NEXT_PUBLIC_SERVER_URL` | `https://your-vercel-url.vercel.app` (update to custom domain later) |

5. Click Deploy
6. First deploy will auto-run Payload's database migration and create all tables

**Verify:** Once deployed, visit the URL — you should see the site with default content (offerings, testimonials etc. all rendered from the hardcoded fallbacks in `page.tsx`).

---

## Step 4: Create your admin account

1. Visit `https://your-url.vercel.app/admin`
2. Payload shows a "Create First User" screen on first visit
3. Create your account (use your email, strong password)
4. You're now logged into the admin panel

---

## Step 5: Enter content

Enter all content through the admin panel. It's a small amount of data:

### Site Settings (Global)
- Site name: "Sacred Sound Sister"
- Tagline: "Rest is the medicine"
- Contact email: Bracken.roots7@gmail.com
- Contact phone: +44 7596 086607
- Instagram handles: @sacred.sound.sister, @brackenroots
- About heading: "Meet Bracken"
- About body: (paste her 3 bio paragraphs)
- Footer text: "© 2026 Sacred Sound Sister. All rights reserved."
- Upload hero image (bracken-flute.jpg)
- Upload about image (bracken-bowls.jpg)

### Offerings (9 items)
Create each offering with title, description, duration, category, icon, sort order. All content is in `index.html` — just copy across.

### Testimonials (5 items)
Create each with quote, attribution, sort order.

### Gallery (9 images)
Upload each photo, set alt text, aspect ratio (square/wide), and sort order. The grid pattern is: square, wide, square, wide, square, square, square, wide, square.

### Verify
After entering content, visit the public site — it should now render CMS content instead of fallbacks.

---

## Step 6: Point Bracken's domain

1. Vercel → Project Settings → Domains → Add domain
2. Enter Bracken's domain (e.g. `sacredsoundsister.com`)
3. Update DNS records as Vercel instructs (usually an A record or CNAME)
4. Vercel auto-provisions SSL
5. Update the `NEXT_PUBLIC_SERVER_URL` env var to `https://sacredsoundsister.com`
6. Redeploy

---

## Step 7: Create Bracken's admin account

1. In Payload admin → Users → Create New
2. Enter Bracken's email and a temporary password
3. Send her the login URL: `https://her-domain.com/admin`
4. She can change her password on first login

---

## What Bracken can now do

- Log into `/admin`
- Edit all text (bio, tagline, offering descriptions, testimonials)
- Upload/swap photos (hero, about, gallery)
- Add/remove/reorder offerings and testimonials
- View contact form submissions
- All without touching code

## What she can't change (by design)

- Layout, colours, fonts, animations
- Section structure and ordering
- Offering categories (Group/Corporate/Individual/Immersive)
- Available icon set

---

## Future: Multi-tenant preparation

When you're ready to add the next client to the shared database:
1. Add a `tenantId` field to all collections
2. Add Payload access control to scope reads/writes by tenant
3. Consider `@payloadcms/plugin-multi-tenant` for this
4. The database, blob store, and infrastructure are already set up to handle it
