export interface PasswordStrength {
  /** 0–4, where 0 is empty/weakest and 4 is strongest. */
  score: 0 | 1 | 2 | 3 | 4
  label: string
  color: string
  /** Meets the minimum policy we enforce before allowing submit. */
  acceptable: boolean
}

/** Minimum length we require everywhere passwords are set. */
export const MIN_PASSWORD_LENGTH = 8

/**
 * Lightweight, dependency-free password strength estimate.
 * Heuristic only — used for UX guidance, not as a security control.
 */
export function getPasswordStrength(password: string): PasswordStrength {
  if (!password) {
    return { score: 0, label: 'Enter a password', color: '#334155', acceptable: false }
  }

  let raw = 0
  if (password.length >= MIN_PASSWORD_LENGTH) raw++
  if (password.length >= 12) raw++
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) raw++
  if (/\d/.test(password)) raw++
  if (/[^A-Za-z0-9]/.test(password)) raw++

  const acceptable = password.length >= MIN_PASSWORD_LENGTH

  // Too short is always "Too short" regardless of character variety.
  if (!acceptable) {
    return { score: 1, label: 'Too short', color: '#ef4444', acceptable: false }
  }

  const score = Math.min(4, Math.max(1, raw)) as 1 | 2 | 3 | 4
  const meta: Record<number, { label: string; color: string }> = {
    1: { label: 'Weak', color: '#ef4444' },
    2: { label: 'Fair', color: '#f59e0b' },
    3: { label: 'Good', color: '#3d74ff' },
    4: { label: 'Strong', color: '#22c55e' },
  }

  return { score, label: meta[score].label, color: meta[score].color, acceptable }
}
