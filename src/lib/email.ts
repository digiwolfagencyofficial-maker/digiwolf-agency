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

export interface ClientWelcomeData {
  fullName: string
  email: string
  setPasswordUrl: string
}

export async function sendClientWelcomeEmail(data: ClientWelcomeData): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    throw new Error('RESEND_API_KEY not set — cannot send client welcome email')
  }

  const from =
    process.env.RESEND_FROM_EMAIL ?? 'Digi Wolf Agency <notifications@digiwolf.agency>'
  const replyTo = process.env.CONTACT_NOTIFY_EMAIL ?? 'info@digiwolf.agency'

  const resend = new Resend(apiKey)

  const { error } = await resend.emails.send({
    from,
    to: data.email,
    replyTo,
    subject: 'Welcome to Digi Wolf — set your password',
    html: `
      <div style="font-family: Inter, system-ui, sans-serif; max-width: 560px; margin: 0 auto; background: #030712; border-radius: 16px; overflow: hidden; border: 1px solid #0d1a35;">
        <div style="background: linear-gradient(135deg, #020818 0%, #03102a 100%); padding: 36px 40px 28px;">
          <h1 style="color: #f0f4ff; font-size: 22px; font-weight: 800; margin: 0;">Welcome to <span style="color: #0047FF;">Digi Wolf</span></h1>
        </div>
        <div style="padding: 32px 40px 40px; color: #cbd5e1;">
          <p style="font-size: 16px; line-height: 1.6; margin: 0 0 16px;">Hi ${escapeHtml(data.fullName)},</p>
          <p style="font-size: 15px; line-height: 1.7; margin: 0 0 24px; color: #94a3b8;">
            Your client portal is ready. Click the button below to set your password and access your dashboard, where you can track your project from start to finish.
          </p>
          <a href="${data.setPasswordUrl}" style="display: inline-block; background: linear-gradient(135deg, #0047FF, #0066ff); color: #ffffff; text-decoration: none; font-size: 15px; font-weight: 700; padding: 14px 28px; border-radius: 10px;">
            Set your password →
          </a>
          <p style="font-size: 13px; line-height: 1.6; margin: 28px 0 0; color: #64748b;">
            This link is unique to you — please don't share it. If you weren't expecting this email, you can safely ignore it.
          </p>
        </div>
        <div style="padding: 20px 40px; border-top: 1px solid #0d1a35; background: #020818;">
          <p style="font-size: 12px; color: #475569; margin: 0;">Digi Wolf Agency · digiwolf.agency</p>
        </div>
      </div>
    `,
  })

  if (error) {
    console.error('Resend client welcome email error:', error)
    throw new Error('Failed to send welcome email')
  }
}
