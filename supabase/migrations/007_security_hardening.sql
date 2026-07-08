-- 007_security_hardening.sql
-- Fixes the "any authenticated user = admin" bug found in the Supabase audit.
-- Drops ALL existing policies on the live/active tables (names varied from
-- what was assumed) and recreates them scoped to profiles.role = 'admin',
-- with users restricted to their own rows.

-- === Wave 1: drop every existing policy on the affected tables ===
DO $$
DECLARE
  pol RECORD;
BEGIN
  FOR pol IN
    SELECT schemaname, tablename, policyname
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename IN ('bookings','leads','invoices','documents','messages','payments','purchases','projects')
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON public.%I', pol.policyname, pol.tablename);
  END LOOP;
END $$;

-- === Wave 2: recreate, properly scoped ===

-- BOOKINGS
CREATE POLICY "Admin full access bookings" ON public.bookings FOR ALL
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "Users view own bookings" ON public.bookings FOR SELECT
  USING (user_id = auth.uid());
CREATE POLICY "Anyone can insert booking" ON public.bookings FOR INSERT WITH CHECK (true);

-- LEADS (removes the duplicate open-insert policy too)
CREATE POLICY "Admin full access leads" ON public.leads FOR ALL
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "Anyone can insert lead" ON public.leads FOR INSERT WITH CHECK (true);

-- INVOICES
CREATE POLICY "Admin full access invoices" ON public.invoices FOR ALL
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "Users view own invoices" ON public.invoices FOR SELECT
  USING (user_id = auth.uid());

-- DOCUMENTS
CREATE POLICY "Admin full access documents" ON public.documents FOR ALL
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "Users view own documents" ON public.documents FOR SELECT
  USING (user_id = auth.uid());

-- MESSAGES
-- Note: messages.client_id FK -> clients.id (not auth.users). Match via lead email.
CREATE POLICY "Admin full access messages" ON public.messages FOR ALL
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "Clients view own messages" ON public.messages FOR SELECT
  USING (lead_id IN (SELECT id FROM public.leads WHERE email = auth.email()));

-- PAYMENTS (fixes the USING(true) bypass; n8n/server code uses the
-- service_role key which bypasses RLS entirely by design, so no
-- separate "service role" policy is needed here)
CREATE POLICY "Admin full access payments" ON public.payments FOR ALL
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "Users view own payments" ON public.payments FOR SELECT
  USING (user_id = auth.uid());

-- PURCHASES
CREATE POLICY "Admin full access purchases" ON public.purchases FOR ALL
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "Users view own purchases" ON public.purchases FOR SELECT
  USING (user_id = auth.uid());

-- PROJECTS
-- Live table uses user_id (not migration-001 client_id). App code
-- (useClientProjects, onboard) writes/filters on user_id only.
CREATE POLICY "Admin full access projects" ON public.projects FOR ALL
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "Users view own projects" ON public.projects FOR SELECT
  USING (user_id = auth.uid());

-- === Wave 3: lock down legacy RPC functions ===
-- Verified: no references in src/ — safe to revoke from anon/authenticated.
-- Supabase grants EXECUTE to PUBLIC by default; revoke that, keep service_role.
-- Also revoke direct grants on anon/authenticated (PUBLIC alone is not enough).
REVOKE EXECUTE ON FUNCTION public.admin_get_data(text) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.admin_get_data_v2(text) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.admin_delete_record(text, text, uuid) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.admin_update_status(text, text, uuid, text) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.get_client_portal_data(text) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.get_client_portal_data_v2(text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.admin_get_data(text) TO service_role;
GRANT EXECUTE ON FUNCTION public.admin_get_data_v2(text) TO service_role;
GRANT EXECUTE ON FUNCTION public.admin_delete_record(text, text, uuid) TO service_role;
GRANT EXECUTE ON FUNCTION public.admin_update_status(text, text, uuid, text) TO service_role;
GRANT EXECUTE ON FUNCTION public.get_client_portal_data(text) TO service_role;
GRANT EXECUTE ON FUNCTION public.get_client_portal_data_v2(text) TO service_role;
