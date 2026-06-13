-- Cal.com webhook fields on bookings
alter table public.bookings
  add column if not exists name text,
  add column if not exists email text,
  add column if not exists event_time timestamptz,
  add column if not exists event_type text,
  add column if not exists notes text,
  add column if not exists calcom_uid text unique;

-- Compatibility with admin UI + legacy wizard API
alter table public.bookings
  add column if not exists company text,
  add column if not exists service text,
  add column if not exists message text,
  add column if not exists preferred_date date,
  add column if not exists preferred_time text,
  add column if not exists google_event_id text,
  add column if not exists updated_at timestamptz;

-- Service-role inserts bypass RLS; webhook route uses supabaseAdmin.
