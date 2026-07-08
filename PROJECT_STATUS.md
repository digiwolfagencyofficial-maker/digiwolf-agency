# Digi Wolf Agency — Project Status

Factual snapshot of the repo as of 2026-07-08. Intended for AI assistants to avoid duplicate work.

**Stack:** Next.js 16 App Router, TypeScript, Tailwind, Supabase (auth + DB), Resend, Cal.com embed, n8n webhooks, OpenRouter (chat). Deploy target: Vercel (`digiwolf.agency`).

**Routing note:** Public marketing pages live under `src/app/[locale]/…` with `next-intl` locales `en` (default), `cs`, `mn`. Auth and dashboards are **not** localized. Request protection uses `src/proxy.ts` (not `middleware.ts`).

---

## 1. Pages & routes

### Public site (localized unless noted)

| Route | Description |
|-------|-------------|
| `/` | Homepage — hero, services preview, CTAs, case-study section. |
| `/services` | Service offerings (website, S.R.O., AI, etc.) with booking links. |
| `/pricing` | Pricing tiers with per-service book links. |
| `/process` | 5-step agency process page. |
| `/about` | Founder/company story. |
| `/contact` | Contact form → `POST /api/contact`. |
| `/book` | Discovery-call page with **Cal.com embed** (`digi-wolf-agency/discovery`). |
| `/work` | Portfolio / “our work” page (site-as-case-study framing). |
| `/case-studies` | Alternate portfolio route (similar intent to `/work`). |
| `/blog` | “Coming soon” placeholder + email notify UI (no backend). |
| `/privacy` | GDPR privacy policy (legal content). |
| `/privacy-policy` | Redirects to `/privacy`. |
| `/terms` | Terms of service. |
| `/cookies` | Cookie policy. |

Locale-prefixed URLs also work (e.g. `/cs/services`, `/mn/book`) per `next-intl` `localePrefix: 'as-needed'`.

### Auth (not localized)

| Route | Description |
|-------|-------------|
| `/login` | Email/password + Google OAuth sign-in; role-based redirect. |
| `/register` | Public self-signup (email/password + Google); creates default `client` profile. |
| `/forgot-password` | Supabase password-reset email flow. |
| `/reset-password` | Password reset handler page. |
| `/auth/callback` | OAuth code exchange → redirect by role. |
| `/auth/confirm` | Email OTP / invite token verification. |
| `/auth/update-password` | Set password after admin invite or recovery link. |
| `/logout` | Clears Supabase session → `/login`. |

### Client dashboard (`/dashboard/*`)

Protected by `src/proxy.ts` (must be signed in). Non-admins redirected away from `/admin`.

| Route | Description |
|-------|-------------|
| `/dashboard` | Client overview — **live** project list via Supabase RLS; invoice/message stats hardcoded to 0. |
| `/dashboard/projects` | **Live** projects from `projects` table (joined to `services`). |
| `/dashboard/invoices` | **UI only** — static empty state (0 CZK); does not call `/api/invoices`. |
| `/dashboard/files` | **UI only** — empty file browser shell; no upload/API. |
| `/dashboard/messages` | **UI only** — empty messaging shell; no realtime/API. |
| `/dashboard/settings` | **Partial** — profile name via `PATCH /api/profile`; password change via Supabase client. |

There is **no** `/client/*` page tree. `proxy.ts` lists `/client` as a protected prefix but no routes exist.

### Admin dashboard (`/admin/*`)

Protected by `src/proxy.ts` + `src/app/admin/layout.tsx` (`requireAdmin()`).

| Route | Description |
|-------|-------------|
| `/admin` | Admin overview — **mock data** (KPIs, leads, projects, activity). |
| `/admin/clients` | **Live** — lists `profiles` (role=client) + their `projects`; add-client form → `POST /api/admin/onboard`. |
| `/admin/projects` | **Mock data** — static project table; “New Project” button non-functional. |
| `/admin/invoices` | **Mock data** — static invoice table + create modal UI only. |
| `/admin/leads` | **Live** — contact-form submissions from `leads` via `GET /api/admin/leads`. |
| `/admin/bookings` | **Live read-only** — bookings from `bookings` via `GET /api/admin/bookings` (Cal.com + legacy rows). No confirm/cancel UI (PATCH API exists but unused in UI). |
| `/admin/analytics` | **Mock data** — charts/KPIs are hardcoded. |
| `/admin/settings` | **Partial** — admin account name/password (same as client settings); “Agency settings” form saves locally only (no API). |
| `/admin/setup` | Onboarding guide — Supabase SQL copy, Google Calendar OAuth steps, test booking form → `POST /api/book`. |

---

## 2. Auth setup

| Item | Detail |
|------|--------|
| **Provider** | Supabase Auth (`@supabase/auth-helpers-nextjs` + `@supabase/supabase-js`). **No** `next-auth` in codebase. |
| **Methods** | Email/password, Google OAuth, password recovery, admin-generated recovery/invite links. |
| **Roles** | Stored on `public.profiles.role`: `'admin'` \| `'client'` (default `'client'` on signup via `handle_new_user` trigger). |
| **Admin assignment** | Manual SQL: `UPDATE profiles SET role = 'admin' WHERE …` (documented in `004_crm_schema.sql`). |
| **Client login** | `/login` → `profiles.role !== 'admin'` → `/dashboard` (or safe `callbackUrl`). |
| **Admin login** | Same `/login` → `role === 'admin'` → `/admin`. `/admin/*` calls `requireAdmin()`; non-admins redirect to `/dashboard`. |
| **Client provisioning (intended)** | Admin **Add Client** → `POST /api/admin/onboard`: creates auth user, upserts profile (`client`), inserts `projects` row, sends Resend welcome email with password link. |
| **Public registration** | `/register` uses `supabase.auth.signUp` — creates generic client accounts **without** a project; separate from admin onboard flow. |
| **Session enforcement** | `src/proxy.ts` for `/dashboard`, `/admin`, `/client`; `requireAdmin()` in admin layout; API helpers `requireAuthApi` / `requireAdminApi` in `src/lib/auth.ts`. |
| **Password flows** | Forgot/reset via Supabase; invite/recovery lands on `/auth/update-password`. |

---

## 3. Database schema (Supabase)

Migrations live in `supabase/migrations/`. **Live DB is source of truth** for column shapes; repo migrations are being brought in line (see security cleanup below).

### Migration files (repo)

| # | File | Status |
|---|------|--------|
| 001 | `001_initial_schema.sql` | Corrected — `projects` uses `user_id` + correct RLS |
| 002 | `002_booking_schema.sql` | Bookings table |
| 003 | `003_calcom_booking_fields.sql`, `003_contact_leads_columns.sql` | Cal.com + leads columns |
| 004 | `004_crm_schema.sql` | CRM tables — never applied to live |
| 005 | `005_profile_contact_fields.sql` | Profile company/phone |
| 006 | `006_n8n_automation_columns.sql` | Project testimonial/delivery columns |
| 007 | `007_security_hardening.sql` | RLS rebuild + RPC lockdown — **applied live** |
| 008 | `008_drop_dead_tables.sql` | Drop 8 unused tables — **applied live** |
| 009 | `009_fix_projects_rls_policy.sql` | Belt-and-suspenders projects RLS fix (`user_id`); idempotent on live |
| 010 | `010_services_redesign.sql` | Reshape `services` to 8 sellable tiers — **applied live 2026-07-08** |

### Live tables (11 — after `008_drop_dead_tables`, applied 2026-07-08)

| Table | Purpose |
|-------|---------|
| `profiles` | Extends `auth.users`: full_name, **role**, company, phone, language, timestamps. RLS: own row read/update; admin full access. |
| `projects` | Client portal rows: `user_id`, `service_id`, `project_status`, pricing/delivery/testimonial columns (006). RLS: `user_id = auth.uid()` for SELECT; admin via `is_admin()`. |
| `services` | Service catalog — **8 sellable tiers, applied live 2026-07-08** (migration 010). Columns: `id`, `slug`, `name`, `description`, `setup_price`, `monthly_price`, `founding_price`, `billing_period`, `category`, `is_custom_price`, `display_order`, `currency`, `active`, `created_at`. Used by onboard + client/admin project views. |

#### `services` catalog (8 rows — migration 010, verified live 2026-07-08 via direct query post-apply)

| slug | name | category | setup_price | monthly_price | founding_price | billing_period |
|------|------|----------|-------------|---------------|----------------|----------------|
| `website-starter` | Website — Starter | website | 19,900 CZK | — | 9,950 CZK | one_time |
| `website-growth` | Website — Growth | website | 49,900 CZK | — | 24,950 CZK | one_time |
| `website-enterprise` | Website — Enterprise | website | custom | — | — | one_time |
| `website-care-plan` | Website Care Plan | website | — | 990 CZK | — | monthly |
| `sro-complete` | S.R.O. Complete | company_formation | 24,900 CZK | — | 19,900 CZK | one_time |
| `registered-address` | Registered Company Address | company_formation | 4,900 CZK | — | — | yearly |
| `ai-auto-reply` | AI Auto-Reply | ai_automation | 14,900 CZK | 1,490 CZK | 7,450 CZK | monthly |
| `ai-automation-pro` | AI Automation Pro | ai_automation | 34,900 CZK | 2,990 CZK | 17,450 CZK | monthly |

Replaced the old 3-row catalog (`web-presence`, `company-formation`, `ai-automation` with flat `price`). The missing `currency` column was added via `ALTER TABLE ... ADD COLUMN IF NOT EXISTS currency` in the same migration. The one flagged pre-migration-safety-check project (`ai-automation` service, user `bolomj.site@gmail.com` / "UB G") was confirmed by the founder as their own test account before this ran — its `projects.service_id` was cleared (set `NULL`) by the migration along with the other test rows, since the old service IDs no longer exist.
| `leads` | Contact form pipeline. Public insert; admin read. |
| `bookings` | Cal.com + legacy booking rows. Extended by migration 003 (Cal.com fields). |
| `invoices` | Billing records (`user_id`, …). RLS hardened in 007; dashboard UI not wired yet. |
| `documents` | File metadata (`user_id`, `file_url`, …). **Kept** — zero app usage today, RLS hardened in 007, planned for file delivery. |
| `messages` | Project/lead messaging (`lead_id`, `sender`, `message`, …). **Kept** — zero rows, RLS hardened in 007, planned feature. Orphan `client_id` column may remain after `clients` drop (no FK). |
| `payments` | Payment records (`user_id`, `stripe_payment_id`, …). **Kept** — zero rows, RLS hardened in 007, planned for Stripe. |
| `chat_logs` | AI chat message logging (`src/lib/chat.ts`). RLS on, no policies (service_role only). |
| `chat_rate_limits` | Per-IP chat rate limiting. RLS on, no policies (service_role only). |

### Dropped dead tables (`008_drop_dead_tables.sql`)

Removed from live — zero rows **and** zero `.from('…')` / `.rpc()` references in `src/`:

`onboarding_tasks`, `onboarding_steps`, `admin_notes`, `clients`, `contacts`, `purchases`, `subscribers`, `newsletter_subscribers`

`CASCADE` removed dependent FKs only (e.g. `messages.client_id → clients.id`); no other table's rows were deleted.

### Never created on live

| Object | Notes |
|--------|-------|
| `crm_clients`, `crm_projects`, `crm_milestones` | Defined in migration 004 only; never applied to live DB. |
| `files` | Migration 001 name; live uses `documents` instead. |

### Security hardening (applied live)

| Migration | What it did |
|-----------|-------------|
| **`007_security_hardening.sql`** | Rebuilt RLS on active tables: admin access requires `profiles.role = 'admin'` (replaces broken `auth.role() = 'authenticated'`). Users restricted to own rows via `user_id` / lead email. Removed dangerous `payments` `USING (true)` policy. |
| **`007` Wave 3 + follow-up** | Locked down legacy RPCs — revoked `EXECUTE` from `PUBLIC`, `anon`, `authenticated`; granted `service_role` only: `admin_get_data`, `admin_get_data_v2`, `admin_delete_record`, `admin_update_status`, `get_client_portal_data`, `get_client_portal_data_v2`. **Zero references in app code.** |
| **`008_drop_dead_tables.sql`** | Dropped 8 unused legacy tables (see above). |
| **`009_fix_projects_rls_policy.sql`** | Ensures `"Users view own projects"` uses `user_id = auth.uid()`; drops stale `"Clients view own projects"` (`client_id`). Renames `client_id → user_id` on old 001-only DBs. Idempotent — live already correct via 007 + `001` correction. |

### Repo migration corrections

| File | Fix |
|------|-----|
| **`001_initial_schema.sql`** | `projects` table + RLS updated: uses `user_id` / `service_id` / `project_status` and policy `"Users view own projects"` (`user_id = auth.uid()`). Removes stale `"Clients view own projects"` (`client_id = auth.uid()`) that would break fresh deploys. Messages policy subquery on `projects` also uses `user_id`. |
| **`009_fix_projects_rls_policy.sql`** | Same projects RLS fix as a standalone migration for DBs that ran old 001 before the correction (008 is unrelated — dead-table cleanup only). |

### Remaining schema drift (non-critical)

- **`invoices` / `files` in 001:** Migration 001 still defines legacy shapes (`client_id`, `files` table); live uses `invoices.user_id` and `documents`. Do not assume 001 matches live for those tables.
- **`chat_*`:** Used in app but not fully captured in repo migrations.
- **`documents`, `messages`, `payments`:** Kept on live for planned features despite zero current app reads/writes.
- **`leads.service_interest` is a dead column:** Never read or written by any app code — the contact pipeline writes `service` (free text) instead. Known, low-priority gap; not a bug to fix now.
- **`bookings.service_id` is never populated:** Cal.com bookings only store a free-text service value from Cal.com's own booking form; nothing in the app resolves it to a `services.id` row. Known, low-priority gap; not a bug to fix now.

---

## 4. External integrations

### Stripe

**Not integrated directly in this app.** No Stripe SDK, env vars, or Stripe-facing API routes here. Mentioned only in marketing copy (`CaseStudies.tsx`, meta descriptions).

Payment handling is planned to live in **n8n**: n8n listens for Stripe payment events and, on success, calls `POST /api/internal/onboard-client` (see n8n table above) to run onboarding and log the paid invoice — this app never talks to Stripe directly.

### Cal.com

| Touchpoint | Behavior |
|------------|----------|
| `/book` (`BookClient.tsx`) | `@calcom/embed-react` inline scheduler. |
| `POST /api/webhooks/calcom` | Verifies `CALCOM_WEBHOOK_SECRET` signature; on `BOOKING_CREATED` upserts into `bookings`; sends Telegram via `notifyTelegram()`. |
| Admin bookings UI | Read-only list of `bookings` rows (primarily Cal.com-sourced). |

### Resend

| Touchpoint | Behavior |
|------------|----------|
| `POST /api/contact` | `sendLeadNotification()` → email to `CONTACT_NOTIFY_EMAIL` (skips if `RESEND_API_KEY` unset). |
| `POST /api/admin/onboard` | `sendClientWelcomeEmail()` → invite/set-password email (throws if Resend missing). |
| Env | `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `CONTACT_NOTIFY_EMAIL`. |

### n8n

| Touchpoint | Behavior |
|------------|----------|
| `POST /api/contact` | `sendLeadToN8n()` → `N8N_LEAD_INTAKE_WEBHOOK_URL` (default `https://automation.digiwolf.agency/webhook/lead-intake`). Payload: name, email, phone, message, service, lang, source. Failures logged only. |
| `src/lib/n8n.ts` | Mapping helpers only; no inbound n8n routes. |
| `POST /api/internal/onboard-client` | **New (inbound).** Shared-secret endpoint (`x-internal-secret` header must match `N8N_INTERNAL_SECRET`) that n8n's Stripe-payment workflow (**WF3**) calls instead of writing to Supabase directly. Runs the same onboarding logic as `/api/admin/onboard` (via `src/lib/onboarding.ts`) and optionally logs a paid `invoices` row. See §5 for request/response shape. |

### Other integrations (not in user list but present)

| Integration | Routes / files | Notes |
|-------------|----------------|-------|
| **Google Calendar API** | `POST /api/book`, `PATCH /api/admin/bookings/[id]`, `/api/auth/google`, `/api/auth/google/callback` | OAuth setup for refresh token; `createCalendarEvent` / `deleteCalendarEvent`. Used by **legacy** `/api/book` wizard, not by Cal.com embed path. |
| **Telegram** | `POST /api/contact`, `POST /api/webhooks/calcom` | Contact: `TELEGRAM_BOT_TOKEN` + `TELEGRAM_CHAT_ID`. Bookings: `TELEGRAM_BOOKING_BOT_TOKEN` + `TELEGRAM_BOOKING_CHAT_ID`. |
| **OpenRouter** | `POST /api/chat` | Model `deepseek/deepseek-v4-flash`; powers site-wide `ChatWidget` on localized layouts. Requires `OPENROUTER_API_KEY`. |

---

## 5. API routes (summary)

| Route | Auth | Purpose |
|-------|------|---------|
| `POST /api/contact` | Public | Validate + insert `leads`; Resend, Telegram, n8n. |
| `POST /api/leads` | Public POST / session GET | Alternate lead insert/list (contact form uses `/api/contact` instead). |
| `GET/POST /api/book` | Public | Legacy slot-based booking + Google Calendar; **not used by `/book` page** (Cal.com used instead). Used by admin setup test form. |
| `POST /api/webhooks/calcom` | Webhook secret | Cal.com → `bookings` + Telegram. |
| `POST /api/chat` | Public (rate limited) | AI chat widget → OpenRouter. |
| `PATCH /api/profile` | Signed-in user | Update own `full_name` only. |
| `GET /api/projects` | Session | List caller's projects. |
| `GET /api/invoices` | Session | List invoices (admin client; dashboard UI doesn't use it). |
| `GET /api/clients` | Session | List client profiles (legacy/generic). |
| `GET/POST /api/admin/onboard` | Admin | List services / create client + project + welcome email. Core logic lives in `src/lib/onboarding.ts` (`onboardClient()`), shared with the internal automation route below. |
| `POST /api/internal/onboard-client` | Shared secret (`x-internal-secret` = `N8N_INTERNAL_SECRET`) | **New.** Automation entry point for n8n **WF3** (Stripe payment → client onboarding). Body: `{ email, full_name, service_slug, amount?, currency? }`. Resolves `service_slug` → `services.id`, calls `onboardClient()`, and — if `amount` is provided — inserts a `status: 'paid'` row into `invoices` (`invoice_number`, `amount`, `currency`, `user_id`). Returns `{ success, userId, projectId }`. Replaces any plan where n8n would write directly to Supabase for onboarding. |
| `GET /api/admin/clients` | Admin | Client list with projects. |
| `GET /api/admin/leads` | Admin | Contact leads (subset of columns). |
| `GET /api/admin/bookings` | Admin | All bookings. |
| `PATCH /api/admin/bookings/[id]` | Admin | Update status; cancels delete Google Calendar event. |
| `POST /api/auth/register` | Public | Server-side user creation (exists; register page uses client SDK instead). |
| `/api/auth/google`, `/api/auth/google/callback` | Setup | Google Calendar OAuth for refresh token. |
| `GET /logout` | Session | Sign out. |

---

## 6. Feature completeness

### Complete (wired to real backend or production flow)

- Public marketing site pages (EN/CS/MN) with shared Navbar/Footer.
- Contact form → Supabase `leads` + Resend + Telegram + n8n.
- `/book` Cal.com scheduling + webhook persistence + admin bookings list.
- Supabase Auth (login, register, Google OAuth, forgot/reset password, logout).
- Role-based routing (client vs admin).
- Admin client onboarding (`/admin/clients` + `/api/admin/onboard` + Resend invite).
- Admin leads inbox (read contact submissions).
- Client dashboard projects (RLS reads from `projects` + `services`).
- Client/admin account settings (name + password).
- AI chat widget (`ChatWidget` + `/api/chat` + rate limit/logging tables).
- Admin setup guide page (SQL copy, Google OAuth instructions, test booking).

### Half-built (UI or API exists; not fully connected)

- **Booking system:** Two parallel paths — Cal.com (active on `/book`) vs legacy `/api/book` + Google Calendar (still in repo, admin setup test only). Admin bookings UI is read-only; PATCH endpoint unused in UI.
- **Client dashboard overview:** Projects live; invoice/message/milestone stats hardcoded.
- **`/api/invoices`, `/api/projects`, `/api/leads`:** APIs exist; most dashboard/admin UIs don't consume them (mock data instead).
- **Admin clients page:** List + onboard works; no edit/archive client actions.
- **Admin leads:** Shows name/email/message/date only — not service/budget/status from DB.
- **`profiles.company` / `phone`:** Column migration (005) exists; settings UI does not expose them; `/api/profile` only updates `full_name`.
- **Public `/register`:** Works for auth but doesn't create projects; overlaps/conflicts with admin-only client intent.
- **CRM tables (`crm_*`):** Never created on live; migration 004 only.

### Stubbed / mock / placeholder

- **Stripe:** Not implemented (marketing references only).
- **Blog:** Coming-soon page; notify form has no API.
- **Admin overview, projects, invoices, analytics:** Hardcoded demo data.
- **Client invoices, files, messages pages:** Styled empty shells, no data layer.
- **Admin agency settings:** Local form state only; values from `src/lib/company.ts`.
- **Prisma:** Listed in `package.json` but no schema or usage in `src/`.
- **`/client` routes:** Referenced in proxy matcher only.

---

## 7. Key env vars (by integration)

| Variable | Integration |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` | Supabase |
| `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `CONTACT_NOTIFY_EMAIL` | Resend |
| `N8N_LEAD_INTAKE_WEBHOOK_URL` | n8n (outbound: lead intake) |
| `N8N_INTERNAL_SECRET` | n8n (inbound: `POST /api/internal/onboard-client` shared-secret auth, WF3 Stripe → onboarding) |
| `CALCOM_WEBHOOK_SECRET` | Cal.com webhooks |
| `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_REDIRECT_URI`, `GOOGLE_REFRESH_TOKEN` | Google Calendar (legacy booking) |
| `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID` | Contact notifications |
| `TELEGRAM_BOOKING_BOT_TOKEN`, `TELEGRAM_BOOKING_CHAT_ID` | Booking notifications |
| `OPENROUTER_API_KEY` | AI chat |
| `NEXT_PUBLIC_SITE_URL` | Auth redirects / logout |

---

## 8. Files an assistant should read first

- `src/proxy.ts` — route protection + i18n
- `src/lib/auth.ts` — role checks
- `supabase/migrations/*.sql` — intended DB shape (compare with `src/types/index.ts` and hooks)
- `src/app/api/contact/route.ts` — lead pipeline
- `src/app/api/webhooks/calcom/route.ts` — booking pipeline
- `src/lib/onboarding.ts` — shared `onboardClient()` logic (user, profile, project, invite, welcome email)
- `src/app/api/admin/onboard/route.ts` — admin-facing client creation (thin wrapper over `onboardClient()`)
- `src/app/api/internal/onboard-client/route.ts` — n8n/Stripe-facing client creation (thin wrapper over `onboardClient()`)
- `src/app/[locale]/book/BookClient.tsx` — current booking UX (Cal.com, not wizard)
