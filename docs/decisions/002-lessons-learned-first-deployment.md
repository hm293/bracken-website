# Lessons Learned: First Client Deployment (Bracken — Sacred Sound Sister)

**Date:** 2026-03-20
**Client:** Bracken Roots — Sacred Sound Sister
**Stack:** Next.js 15 + Payload CMS v3 + Neon Postgres + Vercel Blob + Vercel hosting

---

## 1. Infrastructure & Configuration

### Vercel framework preset must match the app
**Problem:** Site was originally deployed as static HTML. When migrated to Next.js + Payload, the Vercel project's framework preset remained "Other". Builds succeeded but all routes returned 404 — Vercel wasn't generating serverless functions or Next.js routing.

**Root cause:** Vercel auto-detects framework on first deploy. If you later change frameworks, it doesn't re-detect.

**Fix:** Set framework to "nextjs" via the Vercel API:
```bash
curl -X PATCH "https://api.vercel.com/v9/projects/{projectId}" \
  -H "Authorization: Bearer {token}" \
  -d '{"framework":"nextjs"}'
```

**Prevention:** For the productised flow, always set `"framework": "nextjs"` explicitly when creating Vercel projects via API. Never rely on auto-detection.

---

### Vercel Blob stores must be created as Public for website media
**Problem:** Created a private blob store. Payload's Vercel Blob plugin defaults to `access: 'public'`. Private stores reject public uploads.

**Fix:** Deleted the private store, created a new public one. Access mode cannot be changed after creation.

**Prevention:** Always create blob stores with public access for client website media. Private is only for sensitive data.

---

### Neon integration creates separate endpoints per Vercel environment
**Problem:** Seeded data into the development database endpoint. Production uses a different Neon endpoint. Gallery images didn't appear on the live site.

**Root cause:** The Neon/Vercel integration sets different `DATABASE_URL` values for Development vs Production environments. They point to different Neon compute endpoints (potentially different branches).

**Fix:** Pull production env vars separately and seed against them:
```bash
vercel env pull .env.production --environment production
npx tsx --env-file=.env.production src/seed.ts
```

**Prevention:** For the productised flow, always seed against the production environment explicitly. Consider a seed script that accepts an `--environment` flag.

---

### Vercel Deployment Protection blocks public access
**Problem:** Site returned 404/401 despite successful builds.

**Fix:** Disable deployment protection for production (Settings → Deployment Protection → Off).

**Prevention:** Disable protection as part of the automated project setup flow.

---

## 2. Payload CMS v3 Specifics

### The importMap.js must be populated for the admin panel to work
**Problem:** Admin panel rendered as a blank black screen. No console errors.

**Root cause:** `src/app/(payload)/admin/importMap.js` contained `export const importMap = {}`. This file tells the admin UI which React components to load (Lexical editor, blob upload handler, etc.). Without them, nothing renders.

**Fix:**
```bash
npx payload generate:importmap
```

**Prevention:** Add `payload generate:importmap` to the build pipeline or pre-deploy script. Verify importMap is not empty as part of CI checks.

---

### No root layout.tsx when using Payload CMS route groups
**Problem:** Added a root `src/app/layout.tsx` that returned bare `children` (no `<html>` tag). This caused Vercel to serve malformed HTML, resulting in 404s.

**Root cause:** Payload CMS v3 uses route groups where each group (`(frontend)` and `(payload)`) has its own root layout with `<html>` and `<body>`. Adding a shared root layout breaks this pattern.

**Prevention:** Never create `src/app/layout.tsx` in a Payload CMS v3 project. Each route group must be an independent root layout.

---

### Local seeding saves wrong media URLs
**Problem:** Running the seed script locally uploaded images to Vercel Blob correctly, but saved Payload's local file-serving paths (`/api/media/file/...`) in the database instead of the blob URLs.

**Root cause:** The Vercel Blob storage plugin intercepts file uploads and stores them in Blob, but the URL field in the database reflects the Payload API path, not the blob URL. On Vercel's infrastructure, the plugin handles the redirect. Locally, it doesn't.

**Fix:** Wrote a script to update all media records with the correct blob URLs.

**Prevention for productised flow:** Either:
- Seed from within Vercel's build environment (e.g., a one-time serverless function), or
- After local seeding, run a URL fixup script that maps `/api/media/file/{filename}` → `https://{store}.public.blob.vercel-storage.com/{filename}`, or
- Build the seed script to upload directly to Vercel Blob via its SDK and set the URL explicitly

---

## 3. Database & Adapter Choice

### Use @payloadcms/db-vercel-postgres (not @payloadcms/db-postgres) on Vercel
**Problem:** Switched to the standard `@payloadcms/db-postgres` adapter. Builds succeeded but Vercel returned 404 on all routes.

**Root cause:** The standard adapter uses `node-postgres` (TCP connections). While it compiles fine, the Vercel deployment pipeline may handle the output differently. The `@payloadcms/db-vercel-postgres` adapter uses `@vercel/postgres` (which wraps `@neondatabase/serverless`) and produces output compatible with Vercel's routing.

**Decision:** Stick with `@payloadcms/db-vercel-postgres` for now. Despite the deprecation warning on `@vercel/postgres`, it works. Revisit when Payload releases a native Neon adapter.

**Logged as:** ADR-001 (project-per-tenant pattern)

---

## 4. CLI Over Dashboard

### Use Vercel CLI and API for everything possible
**Learning:** The Vercel dashboard frequently didn't show the information needed to debug issues. The CLI and API were far more useful:

- `vercel project inspect` — revealed the framework was set to "Other" (the dashboard didn't surface this clearly)
- `vercel env pull` — essential for getting env vars into local dev
- `vercel deploy --prod` — bypasses any dashboard quirks
- Vercel API — only way to programmatically update framework preset
- `vercel blob` commands — manage blob stores without the dashboard

**For productised flow:** Build all client provisioning around CLI/API calls. Zero dashboard interaction required.

### Install Neon CLI for database management
```bash
brew install neonctl
```
Useful for project creation, connection strings, and branch management.

---

## 5. Process & Workflow

### Seed script needs to be environment-aware and idempotent
**Current state:** Running the seed script twice creates duplicate offerings and testimonials. Gallery images were seeded against the wrong database.

**Improvements needed for productised flow:**
1. Check for existing data before inserting (upsert pattern)
2. Accept `--environment` flag (development/production)
3. Handle media URL fixup automatically
4. Log what was created vs skipped

### Dynamic rendering vs static for CMS-driven pages
**Decision:** Switched homepage to `force-dynamic` rendering so CMS changes appear immediately without redeployment.

**Trade-off:** Slightly slower page loads (no CDN cache for HTML), but content updates are instant. For a small client site, this is the right call. For higher-traffic sites, consider ISR (Incremental Static Regeneration) with revalidation.

---

## 6. Checklist: New Client Deployment

Based on this session, here's the full deployment checklist:

### Pre-deploy (automated via scripts)
- [ ] Create Neon project (region closest to client's audience)
- [ ] Create Vercel project with `framework: "nextjs"` explicitly set
- [ ] Create public Vercel Blob store
- [ ] Link Neon project to Vercel project (sets DATABASE_URL)
- [ ] Link Blob store to Vercel project (sets BLOB_READ_WRITE_TOKEN)
- [ ] Generate and set PAYLOAD_SECRET
- [ ] Disable deployment protection for production
- [ ] Generate importMap: `npx payload generate:importmap`

### Deploy
- [ ] Push to GitHub / deploy via CLI
- [ ] Verify framework detected as Next.js in build logs
- [ ] Verify "Created all serverless functions" appears in build logs
- [ ] Verify site loads at .vercel.app URL

### Post-deploy
- [ ] Seed content against **production** environment
- [ ] Fix media URLs if seeded locally
- [ ] Create admin account at /admin
- [ ] Create client's admin account
- [ ] Verify admin panel loads (not blank)
- [ ] Verify all sections render with content
- [ ] Set NEXT_PUBLIC_SERVER_URL once domain is configured
- [ ] Share site URL and admin credentials with client

---

## 7. Technical Debt to Address

1. **Duplicate seed data** — offerings and testimonials were seeded twice in the production DB. Clean up via admin panel or script.
2. **Seed script URL fixup** — needs to be built into the seed flow, not a separate manual step.
3. **Hero and About images still hardcoded** — CMS fields exist but components don't use them yet.
4. **Type casts in page.tsx** — `focalX`/`focalY` use `as unknown as` casts. Will resolve once payload-types.ts is regenerated on next build.
5. **@vercel/postgres deprecation** — monitor for a Payload native Neon adapter.
