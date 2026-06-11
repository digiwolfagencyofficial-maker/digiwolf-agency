import { Resend } from 'resend'

export interface LeadNotificationData {
  name: string
  email: string
  company?: string | null
  service: string
  budget: string
  message: string
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export async function sendLeadNotification(data: LeadNotificationData): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.warn('RESEND_API_KEY not set — skipping lead notification email')
    return
  }

  const from =
    process.env.RESEND_FROM_EMAIL ?? 'Digi Wolf Agency <notifications@digiwolf.agency>'
  const to = process.env.CONTACT_NOTIFY_EMAIL ?? 'info@digiwolf.agency'
  const timestamp = new Date().toLocaleString('en-GB', { timeZone: 'Europe/Prague' })

  const resend = new Resend(apiKey)

  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: data.email,
    subject: `New lead: ${data.name} — ${data.service}`,
    html: `
      <div style="font-family: Inter, sans-serif; max-width: 600px; color: #1a1a2e;">
        <h2 style="color: #0047FF; margin-bottom: 8px;">New Contact Form Lead</h2>
        <p style="color: #64748b; font-size: 14px; margin-top: 0;">Received ${timestamp} (Prague time)</p>
        <table style="width: 100%; border-collapse: collapse; margin-top: 24px;">
          <tr><td style="padding: 8px 0; color: #64748b; width: 140px;">Name</td><td style="padding: 8px 0; font-weight: 600;">${escapeHtml(data.name)}</td></tr>
          <tr><td style="padding: 8px 0; color: #64748b;">Email</td><td style="padding: 8px 0;"><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></td></tr>
          <tr><td style="padding: 8px 0; color: #64748b;">Company</td><td style="padding: 8px 0;">${escapeHtml(data.company || '—')}</td></tr>
          <tr><td style="padding: 8px 0; color: #64748b;">Service</td><td style="padding: 8px 0; font-weight: 600;">${escapeHtml(data.service)}</td></tr>
          <tr><td style="padding: 8px 0; color: #64748b;">Budget</td><td style="padding: 8px 0;">${escapeHtml(data.budget)}</td></tr>
        </table>
        <div style="margin-top: 24px; padding: 16px; background: #f8fafc; border-radius: 8px; border-left: 4px solid #0047FF;">
          <p style="margin: 0 0 8px; color: #64748b; font-size: 13px; font-weight: 600;">Message</p>
          <p style="margin: 0; white-space: pre-wrap; line-height: 1.6;">${escapeHtml(data.message)}</p>
        </div>
      </div>
    `,
  })

  if (error) {
    console.error('Resend email error:', error)
  }
}
