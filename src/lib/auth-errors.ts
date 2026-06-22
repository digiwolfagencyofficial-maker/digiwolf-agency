/**
 * Map raw Supabase auth error messages to friendly, human copy.
 * Falls back to a generic message so we never surface raw internals.
 */
export function friendlyAuthError(message: string | null | undefined): string {
  if (!message) return 'Something went wrong. Please try again.'

  const m = message.toLowerCase()

  if (m.includes('invalid login credentials')) {
    return 'That email and password don’t match. Please try again.'
  }
  if (m.includes('email not confirmed')) {
    return 'Please confirm your email first — check your inbox for the link.'
  }
  if (m.includes('user already registered') || m.includes('already been registered')) {
    return 'An account with this email already exists. Try signing in instead.'
  }
  if (m.includes('rate limit') || m.includes('too many requests')) {
    return 'Too many attempts. Please wait a moment and try again.'
  }
  if (m.includes('password should be at least') || m.includes('password is too short')) {
    return 'Your password is too short. Use at least 8 characters.'
  }
  if (m.includes('same password') || m.includes('different from the old')) {
    return 'Please choose a password different from your current one.'
  }
  if (m.includes('network') || m.includes('failed to fetch')) {
    return 'Network error — check your connection and try again.'
  }
  if (m.includes('expired') || m.includes('invalid') || m.includes('token')) {
    return 'This link is invalid or has expired. Please request a new one.'
  }

  return message
}
