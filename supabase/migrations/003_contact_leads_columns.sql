-- Align leads table with contact form fields
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS company TEXT;
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS budget TEXT;
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS service TEXT;

-- Allow repeat submissions from the same email
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'leads_email_key' AND conrelid = 'public.leads'::regclass
  ) THEN
    ALTER TABLE public.leads DROP CONSTRAINT leads_email_key;
  END IF;
END $$;

-- Public contact form insert policy
DROP POLICY IF EXISTS "Anyone can insert lead" ON public.leads;
CREATE POLICY "Anyone can insert lead" ON public.leads FOR INSERT WITH CHECK (true);
