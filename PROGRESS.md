# Digi Wolf — Progress

## Done
- Homepage hero repositioned for Czech newcomers (EN/CZ/MN) — business-start messaging, newcomer differentiators, no vanity stats
- Homepage hero stats replaced with founder-led differentiators (EN/CZ/MN) — no vanity metrics or 24h claim in hero strip
- OG/Twitter metadata, sitemap, robots → `https://digiwolf.agency`
- `/pricing` — homepage tiers (15k / 45k / Custom), feature comparison, payment FAQ, contact CTAs
- `/contact` — **live & verified** — form with validation, Supabase `leads` save, Resend notification email; end-to-end tested in production (env vars on Vercel: `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `CONTACT_NOTIFY_EMAIL`)
- `/book` — **live** — Cal.com embed; `/api/webhooks/calcom` saves bookings to Supabase `bookings` table; `CALCOM_WEBHOOK_SECRET` set in `.env.local` and Vercel
- Legal pages — `/privacy`, `/terms`, `/cookies` with GDPR content; cookie consent banner in root layout; footer links on all pages
- Company details sitewide — `src/lib/company.ts` (IČO 243 44 648, Varšavská 715/36, Vinohrady, 120 00 Praha 2) on footers, contact, about, legal pages, admin settings
- **Services simplified** (EN/CZ/MN) — 3 core offerings + on-demand maintenance note → `/contact`:
  1. Complete Website Development (flagship)
  2. AI Automation
  3. Czech S.R.O. Formation (Mongolian-audience copy)
- **Removed:** SEO & Growth, Brand Identity — homepage, `/services`, footer, contact form, pricing add-ons, chat config, meta, Terms (all locales). Pricing add-ons section removed entirely.
- **Reminder:** Delete unused legacy file `src/components/sections/Services.tsx` when ready.

- Auth pages redesign + forgot-password flow — premium split-screen `/login` & `/register`, new `/forgot-password` (now wired to `supabase.auth.resetPasswordForEmail`) and `/reset-password` (recovery session → new password with confirm + strength meter → redirect to login with success toast). Shared UI kit in `src/components/auth/AuthShell.tsx`. Fake testimonial ("Martin Novák / TechStart Praha") and invented stats ("47+/98%/6 days") removed and replaced with honest differentiators (Founder-led, Trilingual EN·CZ·MN, Source code yours, 24h response). "Forgot password?" link added on login; password show/hide, inline validation, friendly Supabase error mapping, Terms+Privacy consent checkbox on register.
  - **Action needed (no code):** In Supabase → Authentication → URL Configuration → Redirect URLs, add `https://digiwolf.agency/reset-password` (and `http://localhost:3000/reset-password` for local). Email delivery uses the existing Supabase + Resend setup.
  - Note: restored the committed `src/app/favicon.ico`; a corrupt local copy (invalid ICO) had been crashing every page with a 500. `proxy.ts` updated to exempt `/reset-password` from locale routing.

## Remaining
- `/blog` — content & layout
- `/dashboard` — client portal
- Auth + booking flow — login, admin, Google Calendar verification
