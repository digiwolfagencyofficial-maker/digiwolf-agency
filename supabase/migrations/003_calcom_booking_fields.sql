-- Cal.com webhook fields on bookings (run in Supabase SQL Editor if not applied via MCP)
alter table bookings
  add column if not exists event_time timestamptz,
  add column if not exists event_type text,
  add column if not exists notes text,
  add column if not exists calcom_uid text unique;

-- Service-role inserts bypass RLS; anon webhook uses service role key from API route.
