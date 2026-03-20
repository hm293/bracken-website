# ADR-001: Neon Project-per-Tenant for Multi-Tenancy

**Date:** 2026-03-20
**Status:** Accepted
**Decision maker:** Harry

## Context

Deftly will serve multiple client websites (starting with Bracken's Sacred Sound Sister site), each running Next.js + Payload CMS v3 backed by Postgres. We needed to decide how to structure database tenancy on Neon.

Vercel Postgres has been fully transitioned to Neon's native integration (Q4 2024–Q1 2025). Neon was acquired by Databricks in May 2025. The `@vercel/postgres` SDK is being deprecated in favour of Neon's native drivers.

## Options Considered

### A. One Neon Project per Tenant (selected)
Each client gets their own Neon project (independent Postgres cluster). A separate catalog database tracks tenant-to-project mappings.

### B. Shared Database, Schema-per-Tenant
One Neon project, one database. Each client gets a Postgres schema namespace.

### C. Shared Database, Row-level Isolation
One database, one schema. All tables include a `tenant_id` column with query-level filtering.

## Decision

**Option A — one Neon project per tenant.**

## Rationale

- **Data isolation:** Complete separation with no risk of cross-tenant leakage. No custom Payload CMS middleware required.
- **Independent scaling:** Each project scales to zero independently. Inactive client sites cost effectively nothing in compute.
- **Operational simplicity per tenant:** Per-client point-in-time restore, clean teardown (delete project), regional placement for compliance.
- **Payload CMS compatibility:** Payload works completely unmodified per tenant — no custom multi-tenancy hooks or row-level filtering needed.
- **Provisioning speed:** New Neon projects create in milliseconds via API, so onboarding a new client is trivial.
- **Cost model:** Neon Scale plan (~$70/mo base) supports 1,000+ projects. Storage at $0.35/GB-month. Inactive tenants incur near-zero compute cost due to scale-to-zero.

Options B and C were rejected because:
- They require custom Payload CMS multi-tenancy logic that doesn't exist today
- Weaker isolation increases risk of data leakage bugs
- Can't independently restore, scale, or tear down a single tenant
- Technical debt that would need unwinding as the platform grows

## Consequences

- Schema migrations must be run across all tenant projects (will automate via CI/CD)
- A catalog/control-plane database is needed to track tenant → Neon project mappings
- Each new client requires provisioning a Neon project (scriptable via Neon API)
