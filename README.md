# Digi Wolf Agency

Full-stack agency website for **Digi Wolf Agency s.r.o.** — Web development, Czech S.R.O. formation, and AI automation for the Mongolian diaspora in Central & Eastern Europe.

## Tech Stack

- **Framework**: Next.js 14 (App Router, TypeScript)
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL + Auth + Storage)
- **Auth**: NextAuth.js v5 (beta)
- **UI**: Radix UI + Framer Motion + Lucide Icons
- **Forms**: React Hook Form + Zod
- **Email**: Resend
- **i18n**: next-intl (EN / CS / MN)

## Project Structure

```
src/
  app/
    (public)/        - Marketing site (homepage, services, contact)
    (auth)/          - Login, register pages
    (dashboard)/     - Client & admin portals
    api/             - API routes (leads, auth)
  components/
    ui/              - Reusable UI components
    public/          - Marketing site components
    dashboard/       - Dashboard components
  lib/
    supabase.ts      - Supabase client
    auth.ts          - NextAuth configuration
    utils.ts         - Utility functions
  types/
    index.ts         - TypeScript types
supabase/
  migrations/        - SQL migration files
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

Required variables:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL`

### 3. Apply database schema

Run the migration in the Supabase Dashboard SQL editor:

```
supabase/migrations/001_initial_schema.sql
```

Or use the Supabase CLI:
```bash
supabase db push
```

### 4. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Database Schema

| Table | Description |
|-------|-------------|
| `profiles` | User profiles (extends Supabase auth.users) |
| `projects` | Client projects with status tracking |
| `invoices` | Invoices with line items |
| `files` | Project documents and files |
| `messages` | Project-scoped messaging |
| `leads` | Contact form submissions |

## Deployment

Recommended: **Vercel**

1. Push to GitHub
2. Import repo in Vercel
3. Add environment variables
4. Deploy

## Phases

- [x] **Phase 1**: Scaffold, Supabase schema, auth setup
- [ ] **Phase 2**: Full Variant C homepage design
- [ ] **Phase 3**: Client portal (projects, invoices, files, messages)
- [ ] **Phase 4**: Admin dashboard
- [ ] **Phase 5**: Trilingual support (EN/CS/MN)
- [ ] **Phase 6**: AI automation features

## Agency Info

- **Location**: Prague, Czech Republic
- **Target market**: Mongolian diaspora in Central & Eastern Europe
- **Services**: Web dev, Czech S.R.O. formation, AI automation
- **Languages**: English, Czech, Mongolian

---

&copy; 2024 Digi Wolf Agency s.r.o.
