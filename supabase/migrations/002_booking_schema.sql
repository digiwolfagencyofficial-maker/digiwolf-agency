create table bookings (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  company text,
  service text not null, -- 'website' | 'sro' | 'ai' | 'app' | 'general'
  message text,
  preferred_date date not null,
  preferred_time text not null, -- '09:00' | '10:00' | '11:00' | '14:00' | '15:00' | '16:00'
  status text default 'pending', -- 'pending' | 'confirmed' | 'cancelled'
  google_event_id text,
  created_at timestamptz default now(),
  updated_at timestamptz
);
alter table bookings enable row level security;
create policy "Anyone can insert" on bookings for insert with check (true);
create policy "Admin can read all" on bookings for select using (auth.role() = 'authenticated');
create policy "Admin can update" on bookings for update using (auth.role() = 'authenticated');
