-- ============================================================================
-- 005_profile_contact_fields.sql
-- Adds optional contact fields to public.profiles so the Account Settings page
-- can store a client's company name and phone number.
--
-- Both columns are nullable text (no fake/default data). Idempotent.
--
-- NOTE: profile writes are admin-only under RLS ("Admins manage all profiles").
-- Non-admins can only SELECT their own row ("Users can view own profile").
-- The app therefore saves these fields through the server-side /api/profile
-- route (service role, scoped to auth.uid(), never touches role).
-- ============================================================================

alter table public.profiles
  add column if not exists company text,
  add column if not exists phone text;
