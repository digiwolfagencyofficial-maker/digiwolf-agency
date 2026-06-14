export type ProfileRole = 'admin' | 'client'

/** Allow only same-origin relative paths (blocks open redirects). */
export function safeCallbackUrl(url: string | null | undefined): string | null {
  if (!url) return null
  if (!url.startsWith('/') || url.startsWith('//')) return null
  return url
}

/** Pick a post-login destination based on role and optional callback. */
export function postLoginRedirect(
  role: ProfileRole | null | undefined,
  callbackUrl: string | null | undefined
): string {
  const safe = safeCallbackUrl(callbackUrl)
  const isAdmin = role === 'admin'

  if (safe) {
    if (safe.startsWith('/admin') && !isAdmin) return '/dashboard'
    return safe
  }

  return isAdmin ? '/admin' : '/dashboard'
}
