-- 009_fix_projects_rls_policy.sql
-- Corrects migration 001's stale "Clients view own projects" policy, which
-- referenced client_id even though the live table and app code use user_id.
--
-- Idempotent: safe on production (already fixed by 007) and on fresh installs
-- that picked up the corrected 001.

-- If an old database still has client_id from the original 001, rename it.
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'projects'
      AND column_name = 'client_id'
  ) AND NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'projects'
      AND column_name = 'user_id'
  ) THEN
    ALTER TABLE public.projects RENAME COLUMN client_id TO user_id;
  END IF;
END $$;

-- Remove the broken policy from original 001 (no-op if already dropped by 007).
DROP POLICY IF EXISTS "Clients view own projects" ON public.projects;

-- Recreate the correct policy (drop first so re-runs stay idempotent).
DROP POLICY IF EXISTS "Users view own projects" ON public.projects;

CREATE POLICY "Users view own projects" ON public.projects
  FOR SELECT
  USING (user_id = auth.uid());
