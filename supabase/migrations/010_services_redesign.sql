-- 010_services_redesign.sql
-- The old 3-row services table (flat `price`) can't represent the real
-- pricing page: 7 tiers/add-ons with one-time, setup+monthly, and yearly
-- billing shapes, plus founding-offer discounts. This reshapes it to one
-- row per real sellable item. Values verified against
-- src/config/founding-offer.ts and messages/en.json (pricing section).

-- Reshape columns
ALTER TABLE public.services RENAME COLUMN price TO setup_price;
ALTER TABLE public.services ALTER COLUMN setup_price DROP NOT NULL;
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS monthly_price numeric;
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS founding_price numeric;
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS billing_period text
  CHECK (billing_period IN ('one_time','yearly','monthly')) DEFAULT 'one_time';
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS category text
  CHECK (category IN ('website','company_formation','ai_automation'));
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS is_custom_price boolean DEFAULT false;
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS display_order integer DEFAULT 0;

-- Clear references from test data before deleting old rows.
-- (Run the safety check in the accompanying Cursor prompt FIRST —
--  confirm these are test rows, not a real paying client, before this runs.)
UPDATE public.projects SET service_id = NULL WHERE service_id IN (SELECT id FROM public.services);
UPDATE public.bookings SET service_id = NULL WHERE service_id IN (SELECT id FROM public.services);

DELETE FROM public.services;

INSERT INTO public.services
  (slug, name, description, setup_price, monthly_price, founding_price, billing_period, category, is_custom_price, display_order, currency, active)
VALUES
  ('website-starter',    'Website — Starter',          'Up to 5-page custom website, mobile-responsive, basic SEO.',                    19900, NULL, 9950,  'one_time', 'website',           false, 1, 'CZK', true),
  ('website-growth',     'Website — Growth',           'Unlimited pages, client dashboard, payments, CRM, AI chatbot.',                 49900, NULL, 24950, 'one_time', 'website',           false, 2, 'CZK', true),
  ('website-enterprise', 'Website — Enterprise',       'Custom AI workflows, multi-language, white-label, SLA, dedicated PM.',          NULL,  NULL, NULL,  'one_time', 'website',           true,  3, 'CZK', true),
  ('website-care-plan',  'Website Care Plan',          'Ongoing hosting, monitoring, and minor edits.',                                 NULL,  990,  NULL,  'monthly',  'website',           false, 4, 'CZK', true),
  ('sro-complete',       'S.R.O. Complete',            'Full Czech company registration, trade license, VAT support.',                  24900, NULL, 19900, 'one_time', 'company_formation', false, 5, 'CZK', true),
  ('registered-address', 'Registered Company Address', 'Legal registered office address in Prague, required by law.',                  4900,  NULL, NULL,  'yearly',   'company_formation', false, 6, 'CZK', true),
  ('ai-auto-reply',      'AI Auto-Reply',              'Facebook Messenger AI replies, 24/7 lead capture and booking flows.',           14900, 1490, 7450,  'monthly',  'ai_automation',     false, 7, 'CZK', true),
  ('ai-automation-pro',  'AI Automation Pro',          'End-to-end workflow automation across CRM, email, and reporting.',              34900, 2990, 17450, 'monthly',  'ai_automation',     false, 8, 'CZK', true);
