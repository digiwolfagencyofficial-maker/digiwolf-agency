# Digi Wolf Agency — Booking System Brief

## RULES
- NO Anthropic API calls, NO API keys for dev tasks
- Use proxy.ts NOT middleware.ts
- Read node_modules/next/dist/docs/ if unsure about Next.js APIs

## TASK: Build a Free Self-Hosted Booking System

Build a complete booking system using **Supabase** (already in the stack) — no Calendly, no paid third-party services.

### Database (Supabase SQL — write migration file, user will run it)
Write SQL to `/supabase/migrations/002_booking_schema.sql`:
```sql
create table bookings (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  company text,
  service text not null, -- 'website' | 'sro' | 'ai' | 'app' | 'general'
  message text,
  preferred_date date not null,
  preferred_time text not null, -- '09:00' | '10:00' | '11:00' | '14:00' | '15:00' | '16:00'
  status text default 'pending', -- 'pending' | 'confirmed' | 'cancelled'
  created_at timestamptz default now()
);
alter table bookings enable row level security;
create policy "Anyone can insert" on bookings for insert with check (true);
create policy "Admin can read all" on bookings for select using (auth.role() = 'authenticated');
```

### Pages to Create

**1. `/src/app/book/page.tsx`** — Public booking page
- URL: `/book`
- Step 1: Choose service (4 cards: Website, S.R.O. Formation, AI Automation, Discovery Call)
- Step 2: Pick date (next 14 days, exclude weekends, show as calendar grid of date buttons)
- Step 3: Pick time slot (09:00, 10:00, 11:00, 14:00, 15:00, 16:00 — in Prague CET)
- Step 4: Enter details (name, email, company optional, message optional)
- Step 5: Confirmation screen with booking reference (UUID first 8 chars)
- On submit: POST to `/api/book` → save to Supabase `bookings` table
- Design: matches site dark theme (#030712 bg, #0047FF accent), Navbar + Footer included
- Mobile: fully responsive, steps stack vertically

**2. `/src/app/api/book/route.ts`** — API route
- POST: validate required fields, insert into Supabase `bookings` table, return `{ success: true, id: booking.id }`
- GET: return available time slots for a given date (check which slots are already booked, return remaining available ones)
- No auth required for POST (public booking)

**3. `/src/app/admin/bookings/page.tsx`** + `/src/app/admin/bookings/PageContent.tsx`
- Table view: name, email, service, date, time, status badge, created date
- Status badge: pending (yellow), confirmed (green), cancelled (red)
- "Confirm" and "Cancel" buttons per row — update status via Supabase
- Filter by status (All / Pending / Confirmed / Cancelled)
- Sort by date (newest first)
- Use `next/dynamic ssr:false` wrapper pattern (same as other admin pages)

### Update Existing Files

**Contact page** (`/src/app/contact/ContactClient.tsx`):
- Replace the Calendly placeholder line with:
  `<Link href="/book" style={{ color: '#3d74ff', fontWeight: 600 }}>→ Book a free 30-min discovery call</Link>`

**Homepage** (`/src/app/page.tsx`):
- Find the CTA section and add a secondary button: "Book a Free Call" linking to `/book`

**Admin sidebar** (check `/src/components/dashboard/DashboardLayout.tsx` or wherever admin nav is):
- Add "Bookings" link → `/admin/bookings`

### After All Changes
1. Run `npm run build` — fix ALL errors
2. `git add -A && git commit -m "feat: self-hosted booking system - /book page, admin panel, Supabase backend"`
3. `git push origin main`

Print summary of all files created/modified at the end.
