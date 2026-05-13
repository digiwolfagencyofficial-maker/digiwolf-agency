# Digi Wolf Agency — Booking System: Complete Build

## CRITICAL RULES
- Run ALL work through Claude Code CLI (Claude Pro) — no API calls
- DO NOT use middleware.ts — project uses proxy.ts at /src/proxy.ts
- Deploy at the end with: npx vercel --token vcp_2XuI1R6geXjfnwZKwP5GtFs0hLWROdahiL7GbGLqBspV2eedLF1lTTbi --yes --prod
- Commit after each major task

## CONTEXT — What already exists
- `/src/lib/google-calendar.ts` — Google Calendar utility (already written, DO NOT rewrite)
- `/src/app/api/auth/google/route.ts` — OAuth start (already written)
- `/src/app/api/auth/google/callback/route.ts` — OAuth callback (already written)
- `/src/app/api/admin/bookings/[id]/route.ts` — PATCH status endpoint (already written)
- `/src/app/api/book/route.ts` — booking POST/GET (needs Google Calendar wired in)
- `/src/app/book/page.tsx` — 5-step booking page (exists, needs polish)
- `/src/app/admin/bookings/PageContent.tsx` — admin bookings table (exists)
- `/supabase/migrations/002_booking_schema.sql` — migration SQL (exists)
- Supabase tables: leads, profiles, projects, invoices, files, messages (NO bookings table yet — user must run the migration SQL manually)

---

## TASK 1 — Wire Google Calendar into the booking API

Edit `/src/app/api/book/route.ts`:
- Add `import { createCalendarEvent } from '@/lib/google-calendar'` at top
- In the POST handler, after validating fields and BEFORE inserting to Supabase:
  - Call `const googleEventId = await createCalendarEvent({ name, email, company, service, message, date: preferred_date, time: preferred_time })`
  - Pass `google_event_id: googleEventId || null` into the Supabase insert
- Also add slot conflict check BEFORE insert:
  ```ts
  const { data: existing } = await supabaseAdmin
    .from('bookings').select('id')
    .eq('preferred_date', preferred_date)
    .eq('preferred_time', preferred_time)
    .neq('status', 'cancelled').maybeSingle()
  if (existing) return NextResponse.json({ error: 'This slot was just taken — please choose another.' }, { status: 409 })
  ```
- Return `{ success: true, id: data.id, ref: data.id.slice(0,8).toUpperCase() }`

Commit: `git add -A && git commit -m "feat: wire Google Calendar into booking API"`

---

## TASK 2 — Polish the /book page

Rewrite `/src/app/book/page.tsx` as a beautiful 5-step booking wizard:

**Design:** dark theme (#030712 bg, #0047FF accent), Navbar + Footer, mobile-first, Framer Motion step transitions, progress bar at top

**Step 1 — Service** (4 cards with icon, title, short desc, price):
- Discovery Call — Free 30 min — "Not sure where to start? Let's talk."
- Website Project — from 45,000 CZK — "Agency-level site in 3–6 weeks"  
- Czech S.R.O. Formation — from 25,000 CZK — "Full company setup, we handle everything"
- AI Automation — from 20,000 CZK — "Custom workflows that save 20+ hrs/week"

**Step 2 — Date** (calendar grid):
- Show next 21 days as a 7-col grid (Mon–Sun headers)
- Weekends disabled/greyed
- Past dates disabled
- Selected date highlighted in blue
- On date select: fetch GET /api/book?date=YYYY-MM-DD to load available slots

**Step 3 — Time** (slot buttons):
- Show slots returned from API: 09:00, 10:00, 11:00, 14:00, 15:00, 16:00
- Display as "9:00 AM", "10:00 AM" etc (Prague CET)
- Unavailable slots greyed out
- "No available slots — pick another date" if all taken

**Step 4 — Details** (form):
- Full Name* (required)
- Email* (required, validate format)
- Company (optional)
- Message (optional, textarea)
- "Confirm Booking →" button with loading spinner on submit
- POST to /api/book, handle errors inline

**Step 5 — Confirmed:**
- Large animated checkmark (Framer Motion scale + opacity)
- "Booking Confirmed!" h1
- Reference: `#XXXXXXXX` in large mono font  
- Summary card: service, date (formatted), time, email
- "Add to Google Calendar" button (opens gcal.google.com/calendar/r/eventedit pre-filled URL)
- "Back to Home →" link

Also handle URL param: if `/book?service=sro` pre-select that service and skip to step 2.

Commit: `git add -A && git commit -m "feat: polished 5-step booking wizard"`

---

## TASK 3 — Admin bookings page (full rewrite)

Rewrite `/src/app/admin/bookings/PageContent.tsx`:

```tsx
'use client'
// Fetches from Supabase via supabaseAdmin client
// Table: Ref | Name | Email | Service | Date | Time | Status | Cal | Actions
// Status badges: pending=amber, confirmed=green, cancelled=red/grey
// Actions: "Confirm" (green btn) + "Cancel" (red btn) → call PATCH /api/admin/bookings/[id]
// Cal column: green calendar icon if google_event_id exists, grey dash if not
// Filter tabs: All | Pending | Confirmed | Cancelled
// Sort: newest first (created_at desc)
// Empty state: wolf icon + "No bookings yet — share /book to get started"
// Mobile: horizontal scroll table or card list below md
// Use next/dynamic ssr:false wrapper (same pattern as other admin pages)
```

Commit: `git add -A && git commit -m "feat: admin bookings management panel"`

---

## TASK 4 — Add booking CTAs everywhere

### 4a. Navbar — both `/src/components/Navbar.tsx` AND `/src/components/layout/Navbar.tsx`
Change the "Get Started" button href from `/contact` to `/book`

### 4b. Homepage `/src/app/page.tsx`
- Hero CTAs: keep "Start Your Project →" → /contact AND add "Book a Free Call" → /book as secondary button
- Bottom CTA banner: add `<Link href="/book">Book a Free Discovery Call →</Link>` button

### 4c. Services `/src/app/services/ServicesClient.tsx`
- Each service block: add "Book a Consultation →" link → `/book?service=X` (website/sro/ai/app)
- Bottom CTA: change to link to /book

### 4d. Pricing `/src/app/pricing/PricingClient.tsx`
- Each pricing card CTA button: link to `/book?service=X`

### 4e. Process `/src/app/process/ProcessPageClient.tsx`
- Step 1 (Discovery Call): add "→ Book your free call" link → /book

### 4f. Contact `/src/app/contact/ContactClient.tsx`
- Add prominent `<Link href="/book">Book a Free 30-min Discovery Call →</Link>` button above the form

### 4g. About `/src/app/about/AboutClient.tsx`
- After founder bio paragraph: add "Work with us →" button → /book

### 4h. Footer — both `/src/components/Footer.tsx` AND `/src/components/layout/Footer.tsx`
- Add "Book a Call" link → /book under Company links section

Commit: `git add -A && git commit -m "feat: booking CTAs on all pages - navbar, home, services, pricing, process, contact, about, footer"`

---

## TASK 5 — Admin setup guide page

Create `/src/app/admin/setup/page.tsx` (use next/dynamic ssr:false wrapper):

A clean admin page with 3 sections:

**Section 1: Supabase Setup**
- Status indicator: "✅ Connected" or "⚠️ Run migration"
- Show the SQL from `/supabase/migrations/002_booking_schema.sql` in a code block with Copy button
- Instructions: "Paste into Supabase Dashboard → SQL Editor → Run"

**Section 2: Google Calendar Setup**
- Step-by-step numbered list:
  1. Go to [Google Cloud Console](https://console.cloud.google.com) → Create new project "Digi Wolf Agency"
  2. Enable "Google Calendar API"
  3. Go to APIs & Services → Credentials → Create OAuth 2.0 Client ID (Web Application)
  4. Add Authorized redirect URI: `https://digiwolf-agency.vercel.app/api/auth/google/callback`
  5. Copy Client ID + Secret → add to Vercel env vars: `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_REDIRECT_URI=https://digiwolf-agency.vercel.app/api/auth/google/callback`
  6. Redeploy, then click "Authorize Google Calendar →" button → `/api/auth/google?secret=digiwolf2025`
  7. Copy the refresh token shown → add to Vercel as `GOOGLE_REFRESH_TOKEN` → redeploy
- "Authorize Google Calendar →" button (only if GOOGLE_CLIENT_ID env var is set)
- Status: green "✅ Google Calendar connected" if GOOGLE_REFRESH_TOKEN is set, otherwise grey

**Section 3: Test Booking**
- Simple form: name, email, service dropdown, date, time
- "Test Booking" button → POST /api/book
- Show success/error response

Add "Setup" to admin nav in all admin PageContent files.

Commit: `git add -A && git commit -m "feat: admin setup guide - Supabase + Google Calendar onboarding"`

---

## TASK 6 — Build + Deploy

1. `npm run build` — fix ALL TypeScript/build errors (ignore pre-existing node_modules type errors)
2. `git add -A && git commit -m "fix: final build clean for booking system"`  
3. `git push origin main`
4. `npx vercel --token vcp_2XuI1R6geXjfnwZKwP5GtFs0hLWROdahiL7GbGLqBspV2eedLF1lTTbi --yes --prod 2>&1 | tail -5`

---

## FINAL SUMMARY — Print after deploy:
1. All files created/modified
2. The exact SQL to run in Supabase (paste from migration file)
3. Google Calendar setup steps (concise)
4. All booking URLs
5. Build + deploy status + live URL
