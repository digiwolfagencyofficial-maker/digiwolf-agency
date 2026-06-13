# Translation Review Notes — Digi Wolf Agency

Generated: 14 June 2026

## Review status

| File | Status |
|------|--------|
| `en.json` | Source of truth (`_meta.reviewStatus`: `source`) |
| `mn.json` | AI placeholder — **needs native Mongolian review** |
| `cs.json` | AI placeholder — **needs native Czech review** |

## Priority areas for native speaker review

### 1. Legal pages (`legal.privacy`, `legal.terms`, `legal.cookies`)

- GDPR and Czech law terminology must be verified by a Czech-speaking lawyer or compliance reviewer.
- Mongolian legal translations should be checked against how GDPR concepts are commonly expressed in MN business context.
- Confirm formal register: Czech legal pages use formal *vy* tone; adjust if brand prefers *ty* for marketing consistency.

### 2. Marketing tone & CTAs

- Hero headlines, gradient text splits, and CTA buttons (`home`, `services`, `pricing`, `book`, `about`).
- Mongolian: ensure natural phrasing for “digital weapons”, “join the pack”, wolf/pack metaphors — may need cultural adaptation.
- Czech: verify CZK pricing copy and “S.R.O.” / “živnostenský list” terminology for local audience.

### 3. Case studies & testimonials

- Client names and metrics are kept as in source (€, %, company names).
- Review Mongolian/Czech narrative flow in long-form case study paragraphs (`work`, `caseStudies`).

### 4. Contact form & validation

- `contact.validation.*` — error messages should sound natural in each language.
- `contact.services` and `contact.budgets` option labels must match what the API accepts (English enum values in `contact-options.ts` may still be submitted until backend i18n is wired).

### 5. Chat widget (`chat`)

- `welcomeMessage` and error strings — confirm friendly, on-brand tone.
- Verify `errors.contactFormLink` works with any server-side error text that references `/contact`.

### 6. Cookie banner (`cookieBanner`)

- Banner strings live under the `cookieBanner` namespace (used by `CookieBanner.tsx`).
- Legal cookie policy page content is separate under `legal.cookies`.

### 7. Footer & company block

- Labels translated; **values unchanged:** IČO `243 44 648`, address `Varšavská 715/36, Vinohrady, 120 00 Praha 2`.
- `footer.sections.contact.secondaryLocation` — confirm desired secondary office text (currently Prague-focused).

### 8. Meta / SEO (`meta`)

- Title and description length for Google SERP in CS and MN locales.
- Open Graph strings for social sharing.

## Protected literals (do not translate)

- `Digi Wolf Agency s.r.o.`
- IČO: `243 44 648`
- Address: `Varšavská 715/36, Vinohrady, 120 00 Praha 2`
- Email: `info@digiwolf.agency`
- Phone: `+420 296 183 158`
- Product/stack names: Next.js, TypeScript, Supabase, Vercel, Stripe, Cal.com, n8n, etc.
- GDPR article references (Art. 6, Art. 15–22, etc.)

## Source files extracted

- Pages: `src/app/[locale]/page.tsx`, `services/`, `pricing/`, `contact/`, `book/`, `about/`, `process/`, `work/`, `blog/`, `case-studies/`, `privacy/`, `terms/`, `cookies/`
- Components: `Navbar.tsx`, `Footer.tsx`, `ChatWidget.tsx`, `CookieBanner.tsx`
- Lib: `contact-options.ts`, `company.ts`

## Regenerating JSON from locale modules

```bash
node messages/build-json.mjs
node messages/count-keys.mjs
```

Locale source modules live in `messages/locales/{en,mn,cs}.js`.
