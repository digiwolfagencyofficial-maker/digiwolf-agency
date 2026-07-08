-- 008_drop_dead_tables.sql
-- Drops tables confirmed to have zero rows AND zero code references
-- (verified via full-repo search for .from('table_name') and .rpc() calls).
-- CASCADE removes dependent foreign-key constraints (e.g. messages.client_id,
-- onboarding_tasks.client_id -> clients.id). No other live table's own rows
-- are affected — only the constraint linking to these dead tables is dropped.

DROP TABLE IF EXISTS public.onboarding_tasks CASCADE;
DROP TABLE IF EXISTS public.onboarding_steps CASCADE;
DROP TABLE IF EXISTS public.admin_notes CASCADE;
DROP TABLE IF EXISTS public.clients CASCADE;
DROP TABLE IF EXISTS public.contacts CASCADE;
DROP TABLE IF EXISTS public.purchases CASCADE;
DROP TABLE IF EXISTS public.subscribers CASCADE;
DROP TABLE IF EXISTS public.newsletter_subscribers CASCADE;

-- Not dropped (flagged, not dead — kept despite zero current code references):
-- documents, messages, payments — zero rows, but RLS-hardened in 007 and
-- structurally needed for planned features (file delivery, project
-- messaging, Stripe payment records). Revisit only if explicitly deciding
-- to cut these features.
