# Digi Wolf Agency — Finish & Polish Brief

## IMPORTANT RULES
- All coding via Claude Code CLI only — NO Anthropic API calls, NO API keys in code for dev tasks
- Commit after EACH numbered task below
- Logo files already exist: `/public/digiwolf-icon.png` (square mark) and `/public/digiwolf-logo.png` (full lockup)
- Read `node_modules/next/dist/docs/` if unsure about any Next.js API — this project may differ from training data
- DO NOT use `middleware.ts` — this project uses `proxy.ts` at `/src/proxy.ts`

---

## STACK
- Next.js (see AGENTS.md for version notes), React 19, TypeScript
- Tailwind CSS v4
- Framer Motion
- Supabase (URL + keys in `.env.local`)
- NextAuth (`/src/lib/auth.ts`)
- Lucide React (install if not present: `npm install lucide-react`)
- Radix UI Accordion (install if not present: `npm install @radix-ui/react-accordion`)
- react-cookie-consent (install if not present: `npm install react-cookie-consent`)

---

## TASK 1 — AUDIT (no edits, commit a report only)
Scan the full repo and report:
- All routes (pages) that exist
- Any broken sections (missing components, import errors, undefined vars)
- Pricing inconsistencies across pages
- Image assets in `/public/`
- Any TypeScript errors from `npm run build`

Write the audit findings to `/AUDIT.md` and commit:
```
git add -A && git commit -m "chore: repo audit report"
```

---

## TASK 2 — LOGO SWAP
- **Navbar/Header**: Use `<Image src="/digiwolf-icon.png" width={40} height={40} priority />` + `<span>DIGIWOLF</span>` wordmark text next to it. Remove any old placeholder logo/text.
- **Footer**: Use `<Image src="/digiwolf-logo.png" style={{maxWidth:'200px', width:'100%'}} alt="Digi Wolf Agency" />`
- **Favicon**: Copy `/public/digiwolf-icon.png` as `/public/favicon.ico` (or use next/head to set `<link rel="icon" href="/digiwolf-icon.png" />` in root layout)
- **OG Image metadata**: In root `layout.tsx`, update `openGraph.images` to use `/digiwolf-logo.png`
- Commit: `git add -A && git commit -m "feat: logo swap - icon in navbar, full logo in footer, favicon updated"`

---

## TASK 3 — MOBILE NAV
Add a hamburger menu for screens below `md:` breakpoint:
- **Trigger**: Lucide `Menu` icon (24px) — clicking opens full-screen overlay
- **Overlay**: Dark background (`bg-[#030712]/95 backdrop-blur-md`), full screen, z-50
- **Close**: Lucide `X` icon top-right, also close on ESC key
- **Links**: Home, Services, Work, Process, Pricing, About, Contact — each full-width, large tap targets (py-4 text-xl)
- **CTAs**: "Sign In" (outline) + "Get Started" (filled blue) at bottom of overlay
- **Animation**: Framer Motion `AnimatePresence` — overlay slides down from top or fades in
- **Desktop nav**: unchanged (hamburger hidden at md: and above)
- Test breakpoints: 375px, 768px, 1024px
- Commit: `git add -A && git commit -m "feat: mobile hamburger nav with Framer Motion overlay"`

---

## TASK 4 — FULL RESPONSIVENESS PASS
Go through every page and component. Fix:
- **No horizontal scroll** at 375px — check all sections, grids, hero text
- **Typography scale**: 
  - H1: `text-4xl md:text-6xl lg:text-7xl`
  - H2: `text-3xl md:text-5xl`
  - H3: `text-xl md:text-2xl`
  - Body: `text-base md:text-lg`
- **Grids**: All 3-column grids → `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- **Section padding**: `py-16 md:py-24 lg:py-32`, `px-4 md:px-8 lg:px-0`
- **Buttons**: Stack vertically on mobile (`flex-col sm:flex-row gap-4`)
- **Cards**: Full width on mobile with appropriate padding
- **Images**: All use `next/image` with proper `sizes` prop
- **Forms**: Input font-size minimum 16px (prevents iOS zoom)
- **Touch targets**: Minimum 44×44px for all interactive elements
- Commit: `git add -A && git commit -m "fix: full mobile responsiveness pass - all breakpoints"`

---

## TASK 5 — FIX BROKEN STATS AND PRICING
**Stats fix** — Homepage stats showing "0+", "0%", "0 days", "0 countries":
Replace with Framer Motion scroll-triggered count-up animation to these real values:
- **47** clients served
- **98%** satisfaction rate  
- **7** days avg delivery
- **3** countries served

Use `useInView` from framer-motion + `useEffect` with a counter that increments from 0 to target over 1.5s when the section enters the viewport.

**Pricing fix** — Inconsistency:
- Homepage says "from 15,000 CZK" for websites
- Services page says "from 45,000 CZK"
- **Correct value: 45,000 CZK** — update homepage to match

Commit: `git add -A && git commit -m "fix: animated stats count-up + pricing consistency 45000 CZK"`

---

## TASK 6 — MISSING PAGES AND SECTIONS

### 6a. Footer social icons
Replace placeholder `[L][X][I]` text with Lucide icons:
- `<Linkedin size={20} />` → links to `https://linkedin.com/company/digiwolf-agency`
- `<Twitter size={20} />` → links to `https://twitter.com/digiwolfagency`
- `<Instagram size={20} />` → links to `https://instagram.com/digiwolfagency`
All open in `target="_blank" rel="noopener noreferrer"`

### 6b. Legal pages
Create these 3 pages with GDPR-compliant boilerplate for Czech S.R.O.:

**`/src/app/privacy/page.tsx`** — Privacy Policy
- Company: Digi Wolf Agency s.r.o., Prague, Czech Republic
- Data controller info, what data is collected (name, email, project info), why, how long kept (3 years), user rights (GDPR Art. 15-22), contact: digiwolfagencyofficial@gmail.com
- Last updated: January 2025

**`/src/app/terms/page.tsx`** — Terms of Service
- Service description, payment terms (50% upfront, 50% on delivery), project scope, revisions policy (2 included), intellectual property (client owns final deliverable), limitation of liability, governing law: Czech Republic

**`/src/app/cookies/page.tsx`** — Cookie Policy
- What cookies are used (essential, analytics), how to opt out, link to privacy policy

### 6c. Blog placeholder
**`/src/app/blog/page.tsx`** — "Coming Soon" state:
- Centered layout, wolf icon or logo, heading "Insights & Updates", subtext "We're writing something worth reading. Check back soon.", email signup input (no backend needed — just UI with a "Notify Me" button that shows a success toast)

### 6d. Login page
Check if `/src/app/login/page.tsx` works properly. If broken or missing Supabase auth:
- Build a proper email/password form
- On submit: call Supabase `signInWithPassword({ email, password })`
- On success: redirect to `/dashboard`
- Show inline error if login fails
- Link to `/register` for new accounts

### 6e. Cookie consent banner
Add `react-cookie-consent` banner:
- Dark theme matching site (`#040d1f` background, white text, blue accept button)
- Text: "We use cookies to improve your experience. By continuing, you agree to our Cookie Policy."
- Links: "Cookie Policy" → `/cookies`, "Privacy Policy" → `/privacy`
- Accept button: "Accept All"
- Decline button: "Decline"
- Position: bottom of screen
- Add to root `layout.tsx`

### 6f. FAQ accordion
Replace any broken FAQ with Radix UI Accordion:
- Use `@radix-ui/react-accordion` primitives
- 6 questions:
  1. "How long does a website project take?" → "Most projects take 3–6 weeks from kickoff to launch."
  2. "What's included in Czech S.R.O. formation?" → "Full company registration, trade license, registered address for 1 year, bank account guidance. We handle everything."
  3. "Do you work with international clients?" → "Yes — we work remotely with clients across Europe and beyond. We speak English, Czech, and Mongolian."
  4. "What's your payment structure?" → "50% upfront to begin, 50% on final delivery. We accept bank transfer (CZK/EUR) and Wise."
  5. "Can I update the website myself after launch?" → "Yes. We build on modern platforms and provide a handover guide. Optional maintenance retainers available."
  6. "What AI automation services do you offer?" → "We build n8n workflows, AI agents, chatbots, and Hermes-powered automations for client acquisition, onboarding, and internal ops."
- Smooth open/close animation with chevron rotation

Commit: `git add -A && git commit -m "feat: social icons, legal pages, blog, cookie banner, FAQ accordion, login fix"`

---

## TASK 7 — POLISH — REPLACE EMOJI WITH LUCIDE ICONS
Find and replace ALL emoji used as UI icons throughout the codebase:
- 🌐 → `<Globe size={24} />` (or 32 where larger)
- ⚖️ → `<Scale size={24} />`
- 🤖 → `<Bot size={24} />`
- 📈 → `<TrendingUp size={24} />`
- 🎨 → `<Palette size={24} />`
- 🛡️ → `<Shield size={24} />`
- ✓ or ✅ → `<Check size={20} />`
- 🚀 → `<Rocket size={24} />` (or remove if decorative)
- ⭐ → `<Star size={16} className="fill-current" />`
- Any other emoji used as icons → find the closest Lucide equivalent

Style all Lucide icons: `className="text-white opacity-80"` with a subtle blue glow wrapper:
```tsx
<div style={{
  background: 'rgba(0,71,255,0.12)',
  borderRadius: '10px',
  padding: '10px',
  display: 'inline-flex'
}}>
  <Globe size={24} className="text-blue-400" />
</div>
```

Commit: `git add -A && git commit -m "polish: replace all emoji with Lucide icons"`

---

## TASK 8 — FINAL QA
1. Run `npm run build` — fix ALL TypeScript errors and build warnings
2. Fix any remaining console errors
3. Verify all internal links resolve (no 404s for nav links)
4. Check logo renders crisp (using `next/image` with proper width/height)
5. Verify cookie consent banner appears on first visit
6. Verify FAQ accordion opens/closes smoothly
7. Verify mobile nav opens/closes at 375px
8. Fix any remaining `any` TypeScript types

Final commit:
```
git add -A && git commit -m "fix: final QA pass - build clean, all links verified, mobile tested"
git push origin main
```

---

## AFTER COMPLETION — SUMMARY REPORT
After the final push, write a summary that includes:
1. All changes made per task
2. Any decisions you made (e.g. which Lucide icon chose for what)
3. Any items that still need the user's input (e.g. real social media URLs, Calendly link, etc.)
4. Any packages installed
5. Build status (clean / warnings / errors)

Print this summary clearly at the end.

---

## DO NOT
- Do NOT use `middleware.ts` (project uses `proxy.ts`)
- Do NOT make Anthropic API calls or use API keys for dev tasks
- Do NOT use Lorem Ipsum text
- Do NOT leave TODO comments in final code
- Do NOT install chart libraries or heavy icon packs beyond lucide-react
- Do NOT break existing functionality while refactoring
