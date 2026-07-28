-- supabase/migrations/011_stripe_selfserve.sql
alter table public.projects
  add column if not exists service_slug text;      -- 'website-starter' etc.

alter table public.invoices
  add column if not exists amount_czk        integer,
  add column if not exists currency          text default 'CZK',
  add column if not exists description        text,
  add column if not exists service_slug       text,
  add column if not exists stripe_session_id  text,
  add column if not exists client_reference   text;   -- EN/CZ/MN

create unique index if not exists invoices_stripe_session_id_key
  on public.invoices (stripe_session_id);
