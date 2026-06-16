-- ============================================================================
-- 004_crm_schema.sql
-- CRM layer: clients -> projects -> milestones, with Row-Level Security.
--
-- NOTE ON NAMING: a legacy `public.projects` table already exists (from
-- 001_initial_schema.sql) with a different shape and FK dependents
-- (invoices/files/messages). To avoid a collision and protect existing data,
-- these new tables are namespaced with a `crm_` prefix.
--
-- ADMIN MODEL: admin status is read from the existing `public.profiles.role`
-- column (CHECK role IN ('admin','client')). See public.is_admin() below and
-- the "HOW TO MAKE YOURSELF ADMIN" note at the bottom of this file.
--
-- This script is idempotent (safe to re-run).
-- ============================================================================


-- ----------------------------------------------------------------------------
-- Helper: is_admin()
-- Returns true when the current signed-in user has role = 'admin' in profiles.
-- Plain (invoker-rights) function: it relies on the existing profiles SELECT
-- policy ("Users can view own profile") so a user can read their own row.
-- It is NOT marked SECURITY DEFINER on purpose (keeps the public schema safe).
-- Used only from policies on crm_* tables, so there is no RLS recursion.
-- ----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE id = (SELECT auth.uid())
      AND role = 'admin'
  );
$$;


-- ----------------------------------------------------------------------------
-- Table: crm_clients
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.crm_clients (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID REFERENCES auth.users(id) ON DELETE SET NULL,  -- nullable: a CRM client may not have a login yet
  name       TEXT NOT NULL,
  email      TEXT NOT NULL,
  company    TEXT,
  status     TEXT NOT NULL DEFAULT 'lead'
             CHECK (status IN ('lead', 'onboarding', 'active', 'archived')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS crm_clients_user_id_idx ON public.crm_clients (user_id);


-- ----------------------------------------------------------------------------
-- Table: crm_projects
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.crm_projects (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id  UUID NOT NULL REFERENCES public.crm_clients(id) ON DELETE CASCADE,
  name       TEXT NOT NULL,
  type       TEXT,
  status     TEXT NOT NULL DEFAULT 'discovery'
             CHECK (status IN ('discovery', 'design', 'build', 'review', 'live')),
  price      NUMERIC(12, 2),
  currency   TEXT NOT NULL DEFAULT 'CZK',
  due_date   DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS crm_projects_client_id_idx ON public.crm_projects (client_id);


-- ----------------------------------------------------------------------------
-- Table: crm_milestones
-- (status values not specified in the request; sensible defaults chosen below)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.crm_milestones (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES public.crm_projects(id) ON DELETE CASCADE,
  title      TEXT NOT NULL,
  status     TEXT NOT NULL DEFAULT 'pending'
             CHECK (status IN ('pending', 'in_progress', 'done', 'blocked')),
  note       TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS crm_milestones_project_id_idx ON public.crm_milestones (project_id);


-- ============================================================================
-- ROW-LEVEL SECURITY
-- ============================================================================

ALTER TABLE public.crm_clients    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crm_projects   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crm_milestones ENABLE ROW LEVEL SECURITY;


-- ---- crm_clients ----------------------------------------------------------
-- Admin: full access to every row.
DROP POLICY IF EXISTS "crm_clients admin all" ON public.crm_clients;
CREATE POLICY "crm_clients admin all" ON public.crm_clients
  FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- Client: SELECT only their own client record (no insert/update/delete).
DROP POLICY IF EXISTS "crm_clients select own" ON public.crm_clients;
CREATE POLICY "crm_clients select own" ON public.crm_clients
  FOR SELECT
  USING (user_id = (SELECT auth.uid()));


-- ---- crm_projects ---------------------------------------------------------
-- Admin: full access.
DROP POLICY IF EXISTS "crm_projects admin all" ON public.crm_projects;
CREATE POLICY "crm_projects admin all" ON public.crm_projects
  FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- Client: SELECT only projects belonging to their own client record.
DROP POLICY IF EXISTS "crm_projects select own" ON public.crm_projects;
CREATE POLICY "crm_projects select own" ON public.crm_projects
  FOR SELECT
  USING (
    client_id IN (
      SELECT id FROM public.crm_clients
      WHERE user_id = (SELECT auth.uid())
    )
  );


-- ---- crm_milestones -------------------------------------------------------
-- Admin: full access.
DROP POLICY IF EXISTS "crm_milestones admin all" ON public.crm_milestones;
CREATE POLICY "crm_milestones admin all" ON public.crm_milestones
  FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- Client: SELECT only milestones under projects of their own client record.
DROP POLICY IF EXISTS "crm_milestones select own" ON public.crm_milestones;
CREATE POLICY "crm_milestones select own" ON public.crm_milestones
  FOR SELECT
  USING (
    project_id IN (
      SELECT p.id
      FROM public.crm_projects p
      JOIN public.crm_clients c ON c.id = p.client_id
      WHERE c.user_id = (SELECT auth.uid())
    )
  );


-- ============================================================================
-- HOW TO MAKE YOURSELF ADMIN
-- ----------------------------------------------------------------------------
-- Admin is controlled by profiles.role. A `profiles` row is auto-created when
-- you sign up (handle_new_user trigger). After signing up with your email,
-- run ONE of the following in the Supabase SQL Editor:
--
--   -- by email:
--   UPDATE public.profiles
--   SET role = 'admin'
--   WHERE id = (SELECT id FROM auth.users WHERE email = 'you@digiwolf.agency');
--
-- To verify:
--   SELECT id, email, role FROM public.profiles WHERE role = 'admin';
--
-- To link a CRM client to a login (so that signed-in client can SELECT their
-- own rows), set crm_clients.user_id to that auth user's id:
--   UPDATE public.crm_clients
--   SET user_id = (SELECT id FROM auth.users WHERE email = 'client@example.com')
--   WHERE email = 'client@example.com';
-- ============================================================================
