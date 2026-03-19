# Setup Tasks — Things Harry Needs To Do

**Date:** 2026-03-19
**Context:** Tasks that require manual account setup, credentials, or decisions that can't be automated by Claude.

---

## Before Migration

### 1. Vercel Postgres Database
- [ ] Provision a Vercel Postgres database from the Vercel dashboard (Storage tab)
- [ ] Note the connection string — it goes into the `DATABASE_URI` env var
- [ ] Free tier: 256MB storage, should be more than enough

### 2. Vercel Blob Store
- [ ] Create a Vercel Blob store from the Vercel dashboard (Storage tab)
- [ ] This is where Payload stores uploaded images (gallery, hero, about, logos)
- [ ] Note the `BLOB_READ_WRITE_TOKEN` — goes into env vars

### 3. Resend (Email Provider)
- [ ] Create account at resend.com (free tier = 3,000 emails/month)
- [ ] Get API key — goes into `RESEND_API_KEY` env var
- [ ] **Verify a sending domain** (e.g., sacredsoundsister.com or your own domain)
  - This is crucial — without domain verification, emails go to spam
  - Resend gives you DNS records (SPF, DKIM) to add to your domain registrar
  - Alternatively, for testing you can send from Resend's shared domain (onboarding@resend.dev) but this won't work for production
- [ ] Decide the "from" address (e.g., hello@sacredsoundsister.com)

### 4. Payload Secret
- [ ] Generate a random secret string for Payload (used for auth/encryption)
- [ ] `openssl rand -hex 32` in terminal will generate one
- [ ] Goes into `PAYLOAD_SECRET` env var

### 5. Domain & DNS
- [ ] If not already done: register/confirm the domain for the site
- [ ] Once the new Next.js deployment is live, point DNS to Vercel
- [ ] Vercel handles SSL automatically

---

## Environment Variables Summary

These all go into Vercel Project Settings → Environment Variables:

| Variable | Source | Notes |
|----------|--------|-------|
| `DATABASE_URI` | Vercel Postgres | Auto-populated if you link the store to the project |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob | Auto-populated if you link the store to the project |
| `PAYLOAD_SECRET` | Self-generated | `openssl rand -hex 32` |
| `RESEND_API_KEY` | Resend dashboard | Under API Keys |
| `CONTACT_EMAIL` | Bracken's email | bracken.roots7@gmail.com (or make configurable via SiteSettings) |

---

## After Migration

### 6. Seed Content
- [ ] Log into `/admin` with the initial admin account
- [ ] Upload all images (hero, about, gallery, logos)
- [ ] Create all 8 offerings
- [ ] Add all 5 testimonials
- [ ] Fill in SiteSettings (site name, tagline, contact info, Instagram handles)
- [ ] Test the contact form — check email arrives in Bracken's inbox

### 7. Create Bracken's Admin Account
- [ ] Create a separate admin user for Bracken with an "Editor" role
- [ ] She should be able to: manage offerings, testimonials, gallery, view form submissions
- [ ] She should NOT need to: touch site settings, deployment, or technical config
- [ ] Send her login credentials + a short guide on how to use the admin panel

### 8. Test Email Delivery
- [ ] Submit a test form on the live site
- [ ] Confirm email arrives in Bracken's Gmail (not spam)
- [ ] If it hits spam: check domain verification, SPF/DKIM records
- [ ] Consider adding the sending address to Bracken's Gmail contacts to prevent future spam filtering

### 9. For the Productised Template (Future)
- [ ] Document the full client onboarding flow
- [ ] Create a checklist: fork repo → update SiteSettings → provision DB/Blob → set up Resend → deploy → create client admin account
- [ ] Consider making brand colours configurable via SiteSettings global (so each client can have their own palette without code changes)
- [ ] Consider a Stripe integration for paid offerings/bookings (future feature)
