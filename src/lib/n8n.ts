export type N8nLeadService = 'Website' | 'S.R.O.' | 'AI Automation' | 'Other'
export type N8nLeadLang = 'EN' | 'CZ' | 'MN'

export interface N8nLeadIntakePayload {
  name: string
  email: string
  phone: string
  message: string
  service: N8nLeadService
  lang: N8nLeadLang
  source: string
}

const N8N_LEAD_INTAKE_URL =
  process.env.N8N_LEAD_INTAKE_WEBHOOK_URL ?? 'https://automation.digiwolf.agency/webhook/lead-intake'

const SERVICE_TO_N8N: Record<string, N8nLeadService> = {
  'Web Development': 'Website',
  'Czech S.R.O. Formation': 'S.R.O.',
  'AI Automation': 'AI Automation',
  'Website Maintenance': 'Other',
}

export function mapServiceToN8nLead(service: string | undefined | null): N8nLeadService {
  if (!service) return 'Other'
  return SERVICE_TO_N8N[service] ?? 'Other'
}

export function mapLangToN8nLead(lang: string | undefined | null): N8nLeadLang {
  const upper = typeof lang === 'string' ? lang.toUpperCase() : ''
  return upper === 'CZ' || upper === 'MN' ? upper : 'EN'
}

/**
 * Fire-and-forget POST to the n8n lead intake webhook. Never throws — a
 * failure here must never prevent a lead from being saved/shown as submitted.
 */
export async function sendLeadToN8n(payload: N8nLeadIntakePayload): Promise<void> {
  try {
    const response = await fetch(N8N_LEAD_INTAKE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const body = await response.text().catch(() => '')
      console.error('[n8n] Lead intake webhook responded with an error:', response.status, body)
    }
  } catch (error) {
    console.error('[n8n] Lead intake webhook request failed:', error)
  }
}
