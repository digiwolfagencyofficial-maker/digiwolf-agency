import type { Service } from '@/types'

// The live `services` table exposes a readable `name` column (verified against
// the live schema). `slug` is the fallback if a row somehow has no name.
export function resolveServiceName(service: Service | Service[] | null | undefined): string {
  // PostgREST may return an embedded to-one relation as an object or a 1-item array.
  const row = Array.isArray(service) ? service[0] : service
  if (!row) return 'Project'

  const name = row.name
  if (typeof name === 'string' && name.trim()) return name.trim()

  const slug = row.slug
  if (typeof slug === 'string' && slug.trim()) return slug.trim()

  return 'Project'
}

// Color styling keyed by normalized status, with a neutral fallback so unknown
// `project_status` values from the live DB still render cleanly.
const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
  discovery: { bg: 'rgba(168,85,247,0.15)', color: '#a855f7' },
  design: { bg: 'rgba(0,71,255,0.15)', color: '#4d8aff' },
  development: { bg: 'rgba(0,71,255,0.15)', color: '#4d8aff' },
  build: { bg: 'rgba(0,71,255,0.15)', color: '#4d8aff' },
  in_progress: { bg: 'rgba(0,71,255,0.15)', color: '#4d8aff' },
  active: { bg: 'rgba(0,71,255,0.15)', color: '#4d8aff' },
  review: { bg: 'rgba(251,191,36,0.15)', color: '#fbbf24' },
  pending: { bg: 'rgba(251,191,36,0.15)', color: '#fbbf24' },
  launched: { bg: 'rgba(34,197,94,0.15)', color: '#22c55e' },
  live: { bg: 'rgba(34,197,94,0.15)', color: '#22c55e' },
  completed: { bg: 'rgba(34,197,94,0.15)', color: '#22c55e' },
  done: { bg: 'rgba(34,197,94,0.15)', color: '#22c55e' },
  paused: { bg: 'rgba(136,146,176,0.15)', color: '#8892b0' },
  cancelled: { bg: 'rgba(136,146,176,0.15)', color: '#8892b0' },
}

const NEUTRAL_STYLE = { bg: 'rgba(136,146,176,0.12)', color: '#8892b0' }

function normalizeStatus(status: string): string {
  return status.trim().toLowerCase().replace(/[\s-]+/g, '_')
}

export function getStatusStyle(status: string | null | undefined) {
  if (!status) return NEUTRAL_STYLE
  return STATUS_COLORS[normalizeStatus(status)] ?? NEUTRAL_STYLE
}

// Turn a raw status like "in_progress" into a readable "In Progress".
export function formatProjectStatus(status: string | null | undefined): string {
  if (!status || !status.trim()) return 'Unknown'
  return status
    .trim()
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}

// Treat a project as "active" unless it is in a finished/paused-like state.
const INACTIVE_STATUSES = new Set(['launched', 'live', 'completed', 'done', 'paused', 'cancelled'])

export function isActiveProject(status: string | null | undefined): boolean {
  if (!status) return false
  return !INACTIVE_STATUSES.has(normalizeStatus(status))
}

// Build filter tabs ("All" + the distinct statuses actually present).
export function buildStatusFilters(
  statuses: (string | null | undefined)[]
): { value: string; label: string }[] {
  const seen = new Set<string>()
  const options: { value: string; label: string }[] = [{ value: 'all', label: 'All' }]
  for (const status of statuses) {
    if (!status || !status.trim()) continue
    const value = status.trim()
    if (seen.has(value)) continue
    seen.add(value)
    options.push({ value, label: formatProjectStatus(value) })
  }
  return options
}

export function formatProjectDate(date: string | null): string {
  if (!date) return '—'
  return new Date(date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

// Format a full ISO timestamp (e.g. created_at) for display.
export function formatProjectTimestamp(timestamp: string | null): string {
  if (!timestamp) return '—'
  const d = new Date(timestamp)
  if (Number.isNaN(d.getTime())) return '—'
  return d.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}
