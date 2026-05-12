# Digi Wolf Agency — Repository Audit

**Date:** 12 May 2026  
**Auditor:** Claude Code CLI

---

## 1. All Routes (Pages)

### Existing Routes (confirmed by `npm run build`)

| Route | Type | File |
|-------|------|------|
| `/` | Static | `src/app/page.tsx` |
| `/about` | Static | `src/app/about/page.tsx` |
| `/admin` | Static | `src/app/admin/page.tsx` |
| `/admin/analytics` | Static | `src/app/admin/analytics/page.tsx` |
| `/admin/clients` | Static | `src/app/admin/clients/page.tsx` |
| `/admin/invoices` | Static | `src/app/admin/invoices/page.tsx` |
| `/admin/leads` | Static | `src/app/admin/leads/page.tsx` |
| `/admin/projects` | Static | `src/app/admin/projects/page.tsx` |
| `/admin/settings` | Static | `src/app/admin/settings/page.tsx` |
| `/api/auth/[...nextauth]` | Dynamic | `src/app/api/auth/[...nextauth]/route.ts` |
| `/api/clients` | Dynamic | `src/app/api/clients/route.ts` |
| `/api/contact` | Dynamic | `src/app/api/contact/route.ts` |
| `/api/invoices` | Dynamic | `src/app/api/invoices/route.ts` |
| `/api/leads` | Dynamic | `src/app/api/leads/route.ts` |
| `/api/projects` | Dynamic | `src/app/api/projects/route.ts` |
| `/case-studies` | Static | `src/app/case-studies/page.tsx` |
| `/contact` | Static | `src/app/contact/page.tsx` |
| `/dashboard` | Static | `src/app/dashboard/page.tsx` |
| `/dashboard/files` | Static | `src/app/dashboard/files/page.tsx` |
| `/dashboard/invoices` | Static | `src/app/dashboard/invoices/page.tsx` |
| `/dashboard/messages` | Static | `src/app/dashboard/messages/page.tsx` |
| `/dashboard/projects` | Static | `src/app/dashboard/projects/page.tsx` |
| `/dashboard/settings` | Static | `src/app/dashboard/settings/page.tsx` |
| `/forgot-password` | Static | `src/app/forgot-password/page.tsx` |
| `/login` | Static | `src/app/login/page.tsx` |
| `/pricing` | Static | `src/app/pricing/page.tsx` |
| `/privacy-policy` | Static | `src/app/privacy-policy/page.tsx` |
| `/process` | Static | `src/app/process/page.tsx` |
| `/register` | Static | `src/app/register/page.tsx` |
| `/services` | Static | `src/app/services/page.tsx` |
| `/sitemap.xml` | Static | `src/app/sitemap.ts` |
| `/terms` | Static | `src/app/terms/page.tsx` |
| `/work` | Static | `src/app/work/page.tsx` |

### Missing Routes (needed by tasks)

| Route | Required By | Status |
|-------|------------|--------|
| `/blog` | Task 6c | MISSING — to create |
| `/privacy` | Task 6b + 6e banner | MISSING — exists as `/privacy-policy` |
| `/cookies` | Task 6b + 6e banner | MISSING — to create |

---

## 2. Broken Sections / Issues

### Dual Navbar/Footer Components
- **Problem:** Two parallel sets of Navbar/Footer exist:
  - `src/components/Navbar.tsx` (used by most pages, has Case Studies link, uses `digiwolf-logo.svg` in mobile overlay)
  - `src/components/layout/Navbar.tsx` (has Work/Process links, Framer Motion ready)
  - `src/components/Footer.tsx` (root)
  - `src/components/layout/Footer.tsx` (layout — more complete)
- **Impact:** Inconsistent navigation links across pages; homepage uses root Navbar (no Work/Process), services page same.
- **Action needed:** Consolidate to one Navbar, one Footer.

### Login Page
- Uses `signIn` from `next-auth/react` (credentials + Google).
- Shows `/digiwolf-logo.svg` in both left panel and mobile form header — SVG exists in `/public/`.
- Functional but "Forgot password?" links to `href="#"` (no page).
- `/forgot-password/page.tsx` exists — link should point there.

### Footer Social Links
- Footer (`src/components/layout/Footer.tsx`) has Email, LinkedIn, Facebook icons (inline SVG).
- Task 6a requires replacing with Lucide `Linkedin`, `Twitter`, `Instagram` icons with correct URLs.

### Missing Packages
- `@radix-ui/react-accordion` — required for Task 6f FAQ — **NOT installed**
- `react-cookie-consent` — required for Task 6e banner — **NOT installed**

### Stats Section (Homepage)
- Stats array: `{ value: 6, suffix: ' days', label: 'Avg. Delivery' }` — should be **7 days** per brief.
- Counter animation works correctly (IntersectionObserver on `<span>` ref).

---

## 3. Pricing Inconsistencies

| Location | Service | Price Shown |
|----------|---------|------------|
| `src/app/page.tsx` — Services section | Agency Websites | `from 15,000 CZK` ← **WRONG** |
| `src/app/page.tsx` — Pricing section | Starter plan | `15,000 CZK` (Starter tier — may be intentional) |
| `src/app/page.tsx` — Pricing section | Growth plan | `45,000 CZK` |
| `src/app/services/ServicesClient.tsx` | Web Development | `from 45,000 CZK` ✓ |

**Correct value per brief:** `45,000 CZK` — homepage Services section card must be updated.

---

## 4. Image Assets in `/public/`

| File | Purpose | Used |
|------|---------|------|
| `digiwolf-icon.png` | Square wolf mark | Navbar (both Navbar files) |
| `digiwolf-logo.png` | Full lockup (landscape) | Footer layout component |
| `digiwolf-logo.svg` | SVG version of full logo | Login page, old Navbar mobile overlay |
| `favicon.svg` | Browser tab icon | Not referenced in layout.tsx (no `<link rel="icon">`) |
| `founder.jpg` | Founder photo | About page |
| `wolf-logo.svg` | Alternate wolf SVG | Unknown — appears unused |
| `file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg` | Next.js defaults | Unused |
| `robots.txt` | SEO robots | Auto-served |

**Note:** `favicon.ico` does not exist in `/public/` — there is `favicon.svg`. A `src/app/favicon.ico` exists (app directory). The root layout.tsx does not explicitly set a favicon `<link>` tag; it relies on Next.js convention of `src/app/favicon.ico`.

---

## 5. TypeScript / Build Status

**Result: ✅ BUILD PASSES — No TypeScript errors**

```
✓ Compiled successfully in 7.6s
✓ Generating static pages (35/35)
```

No TypeScript type errors detected. Build is clean.

---

## 6. Additional Notes

- **Proxy file:** `src/proxy.ts` exists as required (no `middleware.ts`).
- **Auth:** `src/lib/auth.ts` and `src/lib/supabase.ts` both present.
- **Tailwind v4:** PostCSS config in `postcss.config.mjs` — `@tailwindcss/postcss` installed.
- **Framer Motion:** v12.38.0 installed.
- **Lucide React:** v1.14.0 installed.
- **`@radix-ui/react-accordion`:** NOT in package.json — needs install.
- **`react-cookie-consent`:** NOT in package.json — needs install.
- **Homepage FAQ:** Uses custom accordion (inline, no library) — 5 questions; task requires Radix Accordion with 6 specific questions.
- **`src/components/sections/FAQ.tsx`:** Separate FAQ component used in older layout; homepage page.tsx has its own inline FAQ.
