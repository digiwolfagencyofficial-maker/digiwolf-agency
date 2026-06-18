-- ============================================================================
-- 004_clients_projects_milestones.sql
-- CRM schema: clients → projects → milestones
-- Admin via profiles.role = 'admin'
-- ============================================================================

-- ---------------------------------------------------------------------------
-- 1. Helper functions
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
$$;

CREATE OR REPLACE FUNCTION public.owns_client(client_uuid uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.clients
    WHERE id = client_uuid AND user_id = auth.uid()
  );
$$;

-- ---------------------------------------------------------------------------
-- 2. Rename legacy portal projects (preserves invoices/files/messages FKs)
-- ---------------------------------------------------------------------------
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.tables
    WHERE table_schema = 'public' AND table_name = 'projects'
  ) AND NOT EXISTS (
    SELECT 1 FROM information_schema.tables
    WHERE table_schema = 'public' AND table_name = 'portal_projects'
  ) THEN
    ALTER TABLE public.projects RENAME TO portal_projects;
  END IF;
END $$;

-- Re-apply RLS on renamed table (policy names are table-scoped; recreate cleanly)
ALTER TABLE public.portal_projects ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Clients view own projects" ON public.portal_projects;
DROP POLICY IF EXISTS "Admin full access projects" ON public.portal_projects;

CREATE POLICY "Clients view own portal projects"
  ON public.portal_projects FOR SELECT
  USING (client_id = auth.uid());

CREATE POLICY "Admin full access portal projects"
  ON public.portal_projects FOR ALL
  USING (public.is_admin());

-- ---------------------------------------------------------------------------
-- 3. clients
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.clients (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  name       text NOT NULL,
  email      text NOT NULL,
  company    text,
  status     text NOT NULL DEFAULT 'lead'
               CHECK (status IN ('lead', 'onboarding', 'active', 'archived')),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS clients_user_id_idx ON public.clients(user_id);
CREATE INDEX IF NOT EXISTS clients_email_idx   ON public.clients(email);

ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Clients select own row"   ON public.clients;
DROP POLICY IF EXISTS "Admin full access clients" ON public.clients;

CREATE POLICY "Clients select own row"
  ON public.clients FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Admin full access clients"
  ON public.clients FOR ALL
  USING (public.is_admin());

-- ---------------------------------------------------------------------------
-- 4. projects (new CRM model)
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.projects (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id  uuid NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
  name       text NOT NULL,
  type       text,
  status     text NOT NULL DEFAULT 'discovery'
               CHECK (status IN ('discovery', 'design', 'build', 'review', 'live')),
  price      numeric(12, 2),
  currency   text NOT NULL DEFAULT 'CZK',
  due_date   date,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS projects_client_id_idx ON public.projects(client_id);

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Clients select own projects" ON public.projects;
DROP POLICY IF EXISTS "Admin full access projects"  ON public.projects;

CREATE POLICY "Clients select own projects"
  ON public.projects FOR SELECT
  USING (public.owns_client(client_id));

CREATE POLICY "Admin full access projects"
  ON public.projects FOR ALL
  USING (public.is_admin());

-- ---------------------------------------------------------------------------
-- 5. milestones
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.milestones (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  title      text NOT NULL,
  status     text NOT NULL DEFAULT 'pending',
  note       text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS milestones_project_id_idx ON public.milestones(project_id);

ALTER TABLE public.milestones ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Clients select own milestones" ON public.milestones;
DROP POLICY IF EXISTS "Admin full access milestones"  ON public.milestones;

CREATE POLICY "Clients select own milestones"
  ON public.milestones FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.projects p
      WHERE p.id = milestones.project_id
        AND public.owns_client(p.client_id)
    )
  );

CREATE POLICY "Admin full access milestones"
  ON public.milestones FOR ALL
  USING (public.is_admin());

-- ---------------------------------------------------------------------------
-- 6. Tighten leads + bookings to admin-only (keep public INSERT)
-- ---------------------------------------------------------------------------

-- leads: admin-only read/update/delete; public insert unchanged
DROP POLICY IF EXISTS "Admin full access leads" ON public.leads;
CREATE POLICY "Admin full access leads"
  ON public.leads FOR ALL
  USING (public.is_admin());
-- "Anyone can insert lead" policy from 003_contact_leads_columns.sql remains

-- bookings: replace loose authenticated policies
DROP POLICY IF EXISTS "Admin can read all" ON public.bookings;
DROP POLICY IF EXISTS "Admin can update"   ON public.bookings;

CREATE POLICY "Admin select bookings"
  ON public.bookings FOR SELECT
  USING (public.is_admin());

CREATE POLICY "Admin update bookings"
  ON public.bookings FOR UPDATE
  USING (public.is_admin());

CREATE POLICY "Admin delete bookings"
  ON public.bookings FOR DELETE
  USING (public.is_admin());
-- "Anyone can insert" policy from 002_booking_schema.sql remains
