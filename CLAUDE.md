# Digi Wolf Agency — Full-Stack Completion Brief

## MISSION
You are completing a premium digital agency website for **Digi Wolf Agency s.r.o.** — a real business based in Prague, Czech Republic. The site must be **world-class, fully mobile-optimized, and production-ready** from top to bottom. No placeholders. No demo data. No skipped sections. Everything must be real, polished, and work on any device.

---

## STACK (DO NOT CHANGE)
- **Next.js** — this project uses `proxy.ts` NOT `middleware.ts` (already in `/src/proxy.ts`)
- **React 19 / TypeScript / Tailwind CSS v4**
- **Framer Motion** — for animations
- **Supabase** — backend (URL + keys in `.env.local`)
- **NextAuth** — for auth (`/src/lib/auth.ts`)
- **Deployment:** Vercel (auto-deploy on git push)

> ⚠️ Read `node_modules/next/dist/docs/` if unsure about any Next.js API. This may differ from training data.

---

## DESIGN SYSTEM (MUST BE CONSISTENT EVERYWHERE)
```
Background:      #030712  (deep space black)
Card bg:         #040d1f
Border:          rgba(255,255,255,0.08)
Accent blue:     #0047FF
Accent glow:     rgba(0,71,255,0.15)
Text primary:    #f0f4ff
Text secondary:  #94a3b8
Gradient:        linear-gradient(135deg, #0047FF 0%, #6366f1 100%)
Font:            Inter (already imported)
Border radius:   12px cards, 8px buttons
```

**DO NOT use Tailwind utility classes inside JSX components.** All styling via `style={{}}` inline props or `globals.css`. Tailwind is only for global resets.

---

## LOGO & BRANDING
- Navbar: `<Image src="/digiwolf-icon.png" width={44} height={44} />` + `<span>DIGIWOLF</span>` text
- Footer: `<Image src="/digiwolf-logo.png" width={160} height={168} style={{objectFit:'contain'}} />`
- Founder: **Uuganbayar Ganbaatar** — use this name everywhere (about page, footer, meta tags, OG tags)
- Agency: Digi Wolf Agency s.r.o., Prague, Czech Republic
- Email: digiwolfagencyofficial@gmail.com

---

## WHAT TO BUILD / FIX — FULL CHECKLIST

### 1. NAVBAR — Mobile-First
- [ ] Hamburger menu for mobile (slide-down or drawer, NOT broken layout)
- [ ] Mobile menu shows all nav links: Home, Services, Work, Process, Pricing, About, Contact
- [ ] Active route highlighted in nav
- [ ] Smooth scroll-triggered glass blur effect (backdrop-filter) on scroll
- [ ] CTA button "Get Started" links to /contact
- [ ] Logo links to /
- [ ] Mobile: full-width menu, 48px tap targets

### 2. HOMEPAGE (`/`) — Agency Level Hero
- [ ] Hero: powerful headline — **"We Build Digital Weapons for Ambitious Businesses"** (subheadline: "Web. Apps. AI Automation. Czech Company Formation. All under one roof.")
- [ ] Hero: two CTAs — "Start Your Project →" (links /contact) and "See Our Work" (links /work)
- [ ] Hero: animated background — subtle floating particles or moving gradient mesh (CSS/Framer, no heavy libs)
- [ ] Hero: animated stats bar below headline: **12+ Projects**, **3 Countries**, **100% On-Time Delivery**, **4.9★ Rating**
- [ ] Services preview section: 4 service cards with real SVG icons (no emojis)
  - Web & App Development (code icon)
  - Czech S.R.O. Formation (building/document icon)
  - AI Automation (circuit/brain icon)
  - Full-Stack Web Apps & Mobile (device icon)
- [ ] Featured work: 2-3 case study cards (see /work section for content)
- [ ] Testimonials: 3 real-looking testimonials (use real Central/Eastern European names)
- [ ] CTA section: "Ready to Build Something Great?" → /contact button
- [ ] FAQ accordion: 5–6 common questions (pricing, timeline, what's included, do you work remotely, etc.)
- [ ] ALL sections: entrance animations via Framer Motion (fade-up on scroll, stagger children)

### 3. SERVICES PAGE (`/services`) — Detailed
- [ ] Hero: "What We Build" headline
- [ ] 4 service blocks — each with: icon, title, description (3–4 sentences), what's included list, typical timeline, starting price
  - **Agency Website** — from 15,000 CZK — 3–4 week timeline
  - **Czech S.R.O. Formation** — from 25,000 CZK — fully handled, includes trade license
  - **AI Automation** — from 20,000 CZK — n8n workflows, AI agents, Hermes integration
  - **Web Apps & Mobile** — from 50,000 CZK — React/Next.js + React Native
- [ ] CTA at bottom: "Not sure which service you need? Let's talk." → /contact

### 4. WORK / CASE STUDIES PAGE (`/work`) — Portfolio
- [ ] 3 case study cards (use these — real enough to be credible):
  1. **TechStart Praha** — Web design + Czech S.R.O. formation — "Czech market entry in 30 days"
  2. **NomadConnect** — Full-stack web app — "Community platform for digital nomads in CEE"
  3. **Mongolian Trade Hub** — Agency website + AI chatbot — "Bridging Asian businesses to European markets"
- [ ] Each card: tag chips (e.g. "Next.js", "S.R.O. Formation"), short description, "View Case Study" button
- [ ] Case study detail modal or expand section (no separate page needed)
- [ ] Filter tabs: All / Web / Apps / AI / Formation

### 5. PROCESS PAGE (`/process`) — How We Work
- [ ] Numbered steps (1–6) with icons, title, and description:
  1. Discovery Call — understand your goals, timeline, budget (30 min free)
  2. Proposal & Contract — detailed scope, fixed pricing, signed agreement
  3. Design & Architecture — wireframes, design system, tech stack decision
  4. Build — weekly updates, Slack/Telegram channel, staging previews
  5. QA & Launch — cross-device testing, SEO audit, go-live checklist
  6. Ongoing Support — 30-day warranty, optional maintenance retainer
- [ ] Timeline estimate section: "Most projects ship in 3–8 weeks"
- [ ] Bottom CTA: "Start the process →" → /contact

### 6. PRICING PAGE (`/pricing`) — Clear and Transparent
- [ ] 4 pricing cards:
  - **Starter Website** — 15,000 CZK — 5 pages, mobile optimized, SEO ready, 2 revisions
  - **Czech S.R.O. Formation** — 25,000 CZK — full company setup, trade license, bank account guidance
  - **AI Automation** — 20,000 CZK — 3 automations, n8n + Hermes, training session
  - **Full-Stack App** — from 50,000 CZK — custom scoped, React/Next.js + backend, mobile-ready
- [ ] Toggle: CZK / EUR (1 EUR = 25 CZK — simple JS conversion, no API)
- [ ] "Most Popular" badge on S.R.O. + Website bundle
- [ ] Bundle offer: "Website + S.R.O. Formation — 35,000 CZK (save 5,000 CZK)"
- [ ] FAQ accordion below pricing

### 7. ABOUT PAGE (`/about`) — Real Story
- [ ] Founder section: Uuganbayar Ganbaatar — photo `/public/founder.jpg` (140×140 circular, blue ring glow)
- [ ] Bio: "Mongolian entrepreneur based in Prague. Built Digi Wolf to help ambitious businesses — especially those bridging Asian and European markets — get the digital foundation they deserve."
- [ ] Mission statement: "We don't just build websites. We build the digital infrastructure that lets businesses compete globally."
- [ ] Values: 3 cards — Precision, Transparency, Speed
- [ ] Why Prague: short paragraph about Czech Republic as a gateway to EU markets
- [ ] Languages we work in: English, Czech, Mongolian — flag icons

### 8. CONTACT PAGE (`/contact`) — Conversion Optimized
- [ ] Form: Name, Email, Company (optional), Service interest (dropdown: Website / App / S.R.O. / AI / Other), Budget range (dropdown), Message
- [ ] Form submits to `/api/contact` → Supabase `leads` table (already built)
- [ ] Success toast on submit
- [ ] Right side: contact info block — email, response time ("We reply within 24 hours"), timezone (CET/Prague)
- [ ] Calendly placeholder CTA: "Or book a free 30-min call →" (link: `https://calendly.com/digiwolfagency` — placeholder URL, user will update)
- [ ] Mobile: stack vertically, form full width

### 9. AUTH PAGES — Polish
- [ ] `/login` — clean, centered card, dark theme, logo at top, email+password, "Forgot password?" link, "Don't have an account? Register" link
- [ ] `/register` — same style, full name + email + password + confirm password
- [ ] Both use NextAuth signIn/signUp flow (already wired in `/src/lib/auth.ts`)
- [ ] Validation: show inline errors (required, email format, password min 8 chars)
- [ ] Loading spinner on submit button

### 10. CLIENT DASHBOARD (`/dashboard/*`) — Real Data
- [ ] Layout: sidebar on desktop, bottom nav on mobile (5 items: Overview, Projects, Invoices, Files, Messages)
- [ ] `/dashboard` — overview: greeting ("Good morning, [name]"), 4 stat cards (Active Projects, Pending Invoices, Files Shared, Unread Messages), recent activity feed
- [ ] `/dashboard/projects` — list of projects with status badge (In Progress / Completed / Review), progress bar, start date
- [ ] `/dashboard/invoices` — table: invoice #, amount (CZK), status (Paid/Pending/Overdue), due date, download PDF button (placeholder)
- [ ] `/dashboard/files` — file list with icon by type (PDF, ZIP, PNG), name, size, date, download button
- [ ] `/dashboard/messages` — simple chat-style thread list on left, message view on right (desktop) / full screen (mobile)
- [ ] All pages: use `next/dynamic ssr:false` wrapper pattern (already used in project — follow existing pattern)
- [ ] Data: pull from Supabase via client-side fetch to `/api/*` routes. If no data, show "No projects yet" empty state with icon.

### 11. ADMIN PANEL (`/admin/*`) — Full CRM
- [ ] Layout: sidebar (desktop) / top tabs (mobile)
- [ ] `/admin` — dashboard: KPI cards (Total Leads, Clients, Revenue CZK, Active Projects), simple bar chart (last 6 months leads — static data is fine), recent leads table
- [ ] `/admin/leads` — Kanban board: columns = New / Contacted / Proposal Sent / Won / Lost. Each card: name, email, service, date. Drag handle (visual only — no actual drag required, just nice layout)
- [ ] `/admin/clients` — table: name, email, services, joined date, status. Clicking a row opens slide-out detail panel (already partially built)
- [ ] `/admin/projects` — table: project name, client, status, deadline, budget CZK
- [ ] `/admin/invoices` — table: invoice #, client, amount, status, due date. "Create Invoice" button (form modal, basic fields)
- [ ] `/admin/analytics` — page with: traffic sources placeholder chart, conversion rate, avg project value, top services breakdown
- [ ] `/admin/settings` — form: agency name, email, phone, default currency, notification preferences (checkboxes)
- [ ] All admin pages protected by role check (role === 'admin' from Supabase profiles)

### 12. MISSING PAGES — ADD THESE
- [ ] `/dashboard/settings` — client profile settings: update name, email, password
- [ ] `/forgot-password` — email input, "Send reset link" button, success message
- [ ] `/privacy-policy` — basic GDPR-compliant privacy policy for Czech businesses
- [ ] `/terms` — basic terms of service

### 13. FOOTER — Premium
- [ ] 4 columns: Logo + tagline | Services links | Company links | Contact info
- [ ] Services: Website Design, Czech S.R.O., AI Automation, Web Apps
- [ ] Company: About, Work, Process, Pricing, Contact
- [ ] Contact: email, Prague CZ, languages (EN/CS/MN)
- [ ] Bottom bar: © 2025 Digi Wolf Agency s.r.o. | Privacy Policy | Terms
- [ ] Mobile: stack to 2 columns, then 1 column on small screens

### 14. GLOBAL — Mobile Optimization (CRITICAL)
- [ ] Every page: test at 375px (iPhone SE), 390px (iPhone 14), 768px (iPad)
- [ ] No horizontal overflow on any breakpoint
- [ ] Touch targets: minimum 44×44px
- [ ] Font sizes: no smaller than 14px on mobile
- [ ] Images: use `next/image` with proper `sizes` prop
- [ ] Forms: inputs at least 16px font (prevents iOS zoom)
- [ ] Navigation: hamburger menu tested and smooth
- [ ] Cards: single column on mobile, 2-col on tablet, 3-col on desktop where applicable

### 15. SEO & PERFORMANCE
- [ ] Every page: unique `<title>` and `<meta name="description">`
- [ ] OG tags on every page (og:title, og:description, og:image)
- [ ] Canonical URLs
- [ ] `/sitemap.ts` — update to include all new pages
- [ ] Images: `alt` text on every `<Image>`
- [ ] `robots.ts` — block /admin, /dashboard, /api

### 16. API ROUTES — Complete & Secured
All API routes must:
- Check authentication (use `getServerSession` from NextAuth)
- Return proper HTTP status codes
- Handle errors gracefully

Routes to complete/verify:
- [ ] `POST /api/contact` — save lead to Supabase `leads` table ✓ (already built — verify it works)
- [ ] `GET /api/projects` — return projects for authenticated user
- [ ] `GET /api/invoices` — return invoices for authenticated user
- [ ] `GET /api/files` — return files for authenticated user
- [ ] `GET /api/messages` — return messages for authenticated user
- [ ] `GET /api/leads` — admin only, return all leads
- [ ] `GET /api/clients` — admin only, return all clients
- [ ] `POST /api/leads` — create/update lead status (admin)

### 17. ANIMATIONS — Framer Motion
Apply to all public pages:
- [ ] Hero: fade-in + slide-up on load (0.6s)
- [ ] Section headings: fade-up on scroll (intersection observer)
- [ ] Cards: stagger children fade-up (0.1s delay between each)
- [ ] Stats counters: animate count-up when scrolled into view
- [ ] Navbar: fade-in on load, glass effect on scroll
- [ ] Page transitions: simple fade (layout animation in root layout)
- [ ] Buttons: hover scale 1.02, active scale 0.98

---

## SUPABASE SCHEMA (already live — use these tables)

```sql
-- Tables: profiles, projects, invoices, files, messages, leads
-- All have RLS enabled
-- profiles.role = 'admin' | 'client'
```

**Supabase client** is at `/src/lib/supabase.ts` — use `createClient` from there.

---

## AFTER ALL CHANGES
1. Run `npm run build` and fix ALL TypeScript/build errors
2. Run `git add -A && git commit -m "feat: complete full-stack agency website - mobile optimized, all pages, real data"` 
3. Run `git push origin main`

---

## DO NOT
- Do NOT use placeholder Lorem Ipsum text anywhere
- Do NOT leave `// TODO` comments in the final code
- Do NOT use emoji as icons in production UI — use SVG icons inline
- Do NOT change the Next.js proxy.ts file
- Do NOT install new heavy dependencies (no chart libraries, no icon packs that need npm install) — use inline SVGs
- Do NOT use `any` TypeScript type — be explicit
- Do NOT use Tailwind utility classes inside component JSX (use inline style props)
- Do NOT skip mobile breakpoints

---

## QUALITY BAR
When you're done, this site should look and function like an agency that charges €5,000–€15,000 per project. A potential client landing on it should immediately feel: *"These people are professional, they know what they're doing, I want to work with them."*
