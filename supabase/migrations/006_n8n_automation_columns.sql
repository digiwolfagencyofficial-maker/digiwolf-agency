-- Client language for localized emails (WF3/WF4)
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS language text DEFAULT 'EN'
  CHECK (language IN ('EN','CZ','MN'));

-- Project money + delivery + testimonial tracking (WF3/WF4)
ALTER TABLE public.projects
  ADD COLUMN IF NOT EXISTS price numeric,
  ADD COLUMN IF NOT EXISTS currency text DEFAULT 'CZK',
  ADD COLUMN IF NOT EXISTS delivered_at timestamptz,
  ADD COLUMN IF NOT EXISTS testimonial_requested_at timestamptz,
  ADD COLUMN IF NOT EXISTS testimonial_followup_sent_at timestamptz,
  ADD COLUMN IF NOT EXISTS testimonial_received boolean DEFAULT false;
