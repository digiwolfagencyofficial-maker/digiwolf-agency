import { normalizeClientLocale, sendClientWelcomeEmail, type ClientWelcomeLocale } from '@/lib/email'
import { siteUrl } from '@/lib/site-url'
import { supabaseAdmin } from '@/lib/supabase'

export type { ClientWelcomeLocale }
export { normalizeClientLocale }

export interface OnboardClientInput {
  email: string
  fullName: string
  serviceId: string
  /** Defaults to 'en' if missing or not one of en/cs/mn. */
  locale?: ClientWelcomeLocale
}

export interface OnboardClientResult {
  userId?: string
  projectId?: string
  /** True when the email already had an account — nothing new was created. */
  alreadyExists?: boolean
}

/** Result-style error so callers can map to their own HTTP status codes. */
export class OnboardingError extends Error {
  constructor(
    message: string,
    public readonly status: number
  ) {
    super(message)
    this.name = 'OnboardingError'
  }
}

function canonicalSiteUrl() {
  return siteUrl.replace(/\/$/, '')
}

async function rollback(userId: string) {
  await supabaseAdmin.from('projects').delete().eq('user_id', userId)
  await supabaseAdmin.from('profiles').delete().eq('id', userId)
  await supabaseAdmin.auth.admin.deleteUser(userId)
}

/**
 * Core client-onboarding flow shared by the admin "Add Client" UI and the
 * internal n8n/Stripe automation route: creates the auth user, upserts the
 * client profile, creates the project, generates an invite link and sends
 * the branded welcome email via Resend.
 *
 * Caller is responsible for resolving/validating the service beforehand.
 */
export async function onboardClient({
  email,
  fullName,
  serviceId,
  locale,
}: OnboardClientInput): Promise<OnboardClientResult> {
  const resolvedLocale = normalizeClientLocale(locale)

  // Step A — create the auth user (no password; client sets it via invite link).
  const { data: created, error: createError } = await supabaseAdmin.auth.admin.createUser({
    email,
    email_confirm: true,
    user_metadata: { full_name: fullName },
  })

  if (createError || !created?.user) {
    const message = createError?.message ?? 'Failed to create user'
    if (message.toLowerCase().includes('already')) {
      // This email was already onboarded in an earlier call (e.g. a retried
      // Stripe webhook delivery from n8n). Nothing was created in this call,
      // so there's nothing to roll back — report success rather than a 502
      // so the duplicate delivery doesn't look like a failure or trigger a
      // false alert upstream.
      console.warn('[onboarding] createUser: email already exists, treating as already onboarded:', email)
      return { alreadyExists: true }
    }
    console.error('[onboarding] createUser failed:', createError)
    throw new OnboardingError(message, 400)
  }

  const userId = created.user.id

  // Step B — ensure profile exists with correct name and role.
  // handle_new_user() trigger auto-creates a profile on auth.users insert;
  // upsert avoids duplicate-key errors and sets full_name from our form.
  const { error: profileError } = await supabaseAdmin.from('profiles').upsert(
    {
      id: userId,
      full_name: fullName,
      role: 'client',
    },
    { onConflict: 'id' }
  )

  if (profileError) {
    console.error('[onboarding] profile upsert failed:', profileError)
    await supabaseAdmin.from('profiles').delete().eq('id', userId)
    await supabaseAdmin.auth.admin.deleteUser(userId)
    throw new OnboardingError('Failed to create client profile.', 500)
  }

  // Step C — insert the project in the Onboarding state.
  const { data: project, error: projectError } = await supabaseAdmin
    .from('projects')
    .insert({
      user_id: userId,
      service_id: serviceId,
      project_status: 'Onboarding',
    })
    .select('id')
    .single()

  if (projectError || !project) {
    console.error('[onboarding] project insert failed:', projectError)
    await supabaseAdmin.from('profiles').delete().eq('id', userId)
    await supabaseAdmin.auth.admin.deleteUser(userId)
    throw new OnboardingError('Failed to create client project.', 500)
  }

  // Step D — recovery link; redirect straight to update-password (implicit hash flow).
  const baseUrl = canonicalSiteUrl()
  const redirectTo = `${baseUrl}/auth/update-password`
  const { data: linkData, error: linkError } = await supabaseAdmin.auth.admin.generateLink({
    type: 'recovery',
    email,
    options: { redirectTo },
  })

  const actionLink = linkData?.properties?.action_link

  if (linkError || !actionLink) {
    console.error('[onboarding] generateLink failed:', linkError, linkData?.properties)
    await rollback(userId)
    throw new OnboardingError('Failed to generate the invite link.', 500)
  }

  // Step E — send the branded welcome email via Resend.
  try {
    await sendClientWelcomeEmail({ fullName, email, setPasswordUrl: actionLink, locale: resolvedLocale })
  } catch (err) {
    console.error('[onboarding] welcome email failed:', err)
    await rollback(userId)
    throw new OnboardingError(
      'Client created but the welcome email could not be sent. Please try again.',
      502
    )
  }

  return { userId, projectId: project.id }
}
