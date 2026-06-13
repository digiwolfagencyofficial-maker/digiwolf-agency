# Digi Wolf — Progress

## Done
- Homepage stat counters — real values + scroll animation
- OG/Twitter metadata, sitemap, robots → `https://digiwolf.agency`
- `/pricing` — homepage tiers (15k / 45k / Custom), feature comparison, payment FAQ, contact CTAs
- `/contact` — **live & verified** — form with validation, Supabase `leads` save, Resend notification email; end-to-end tested in production (env vars on Vercel: `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `CONTACT_NOTIFY_EMAIL`)
- `/book` — **live** — Cal.com embed; `/api/webhooks/calcom` saves bookings to Supabase `bookings` table; `CALCOM_WEBHOOK_SECRET` set in `.env.local` and Vercel
- Legal pages — `/privacy`, `/terms`, `/cookies` with GDPR content; cookie consent banner in root layout; footer links on all pages
- Company details sitewide — `src/lib/company.ts` (IČO 243 44 648, Varšavská 715/36, Vinohrady, 120 00 Praha 2) on footers, contact, about, legal pages, admin settings

## Remaining
- `/blog` — content & layout
- `/dashboard` — client portal
- Auth + booking flow — login, admin, Google Calendar verification
