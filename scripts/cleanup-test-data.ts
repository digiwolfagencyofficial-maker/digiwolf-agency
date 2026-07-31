/**
 * scripts/cleanup-test-data.ts
 *
 * Reusable Supabase test/demo data cleanup.
 *
 * Wipes every test/demo row (leads, bookings, projects, invoices, messages,
 * documents, payments, chat logs) while permanently protecting the
 * admin@digiwolf.agency auth user and its profile row. Safe to re-run any
 * time — dry-run is the default, nothing is ever deleted by accident.
 *
 * Usage (run from the repo root):
 *   node scripts/cleanup-test-data.ts                       Dry run (default). Prints a full report, deletes nothing.
 *   node scripts/cleanup-test-data.ts --dry-run=false --yes  Live run. Actually deletes rows + re-verifies afterwards.
 *
 * Or via npm:
 *   npm run cleanup:test-data
 *   npm run cleanup:test-data:live
 *
 * Requires Node.js 22.6+ (uses Node's built-in TypeScript support, no extra
 * dependency needed) and a .env.local (or already-exported env vars) with
 * NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY / SUPABASE_SERVICE_ROLE_KEY.
 */

import { createClient } from '@supabase/supabase-js'
import {
  getPublicSupabaseUrl,
  getServiceRoleKey,
  isSupabaseConfigured,
} from '../src/lib/supabase-env.ts'

// Load .env.local if present. Wrapped in try/catch because this script may
// also run in environments (CI, Vercel) where the vars are already exported
// and no .env.local file exists on disk.
try {
  process.loadEnvFile('.env.local')
} catch {
  // no .env.local on disk — assume env vars are already set
}

const ADMIN_EMAIL = 'admin@digiwolf.agency'
const SAMPLE_SIZE = 5

if (!isSupabaseConfigured()) {
  console.error(
    'Supabase is not configured. Missing one of NEXT_PUBLIC_SUPABASE_URL, ' +
      'NEXT_PUBLIC_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY. Aborting.'
  )
  process.exit(1)
}

// Mirrors the supabaseAdmin client in src/lib/supabase.ts (same env vars,
// same options). We rebuild it here instead of importing that file directly
// because it resolves the "@/..." path alias, which Node's built-in
// TypeScript runner (used to execute this script with plain `node`) does not
// understand outside of Next.js's own build pipeline.
const supabaseAdmin = createClient(getPublicSupabaseUrl(), getServiceRoleKey(), {
  auth: { autoRefreshToken: false, persistSession: false },
})

interface TableSpec {
  table: string
  label: string
  displayColumns: string[]
  /** Column that points at the owning profile (profiles.id). Null = every row in this table is test data (no admin ownership is possible). */
  ownerColumn: string | null
  /** A NOT NULL column, used as a safe "match every row" filter when deleting tables with no ownerColumn (PostgREST requires an explicit filter on delete). */
  idColumn: string
}

// Order matters: this is the FK-safe deletion order (children before parents).
// profiles and auth.users are handled separately, after this list, since they
// are the ultimate parents everything else points at.
const TABLES: TableSpec[] = [
  { table: 'messages', label: 'Messages (client chat threads)', displayColumns: ['id', 'sender', 'message', 'created_at'], ownerColumn: 'client_id', idColumn: 'id' },
  { table: 'invoices', label: 'Invoices', displayColumns: ['id', 'invoice_number', 'amount', 'status', 'created_at'], ownerColumn: 'user_id', idColumn: 'id' },
  { table: 'documents', label: 'Documents (client files)', displayColumns: ['id', 'file_name', 'created_at'], ownerColumn: 'user_id', idColumn: 'id' },
  { table: 'payments', label: 'Payments', displayColumns: ['id', 'package_type', 'amount', 'payment_status', 'created_at'], ownerColumn: 'user_id', idColumn: 'id' },
  { table: 'projects', label: 'Projects', displayColumns: ['id', 'project_status', 'price', 'currency', 'created_at'], ownerColumn: 'user_id', idColumn: 'id' },
  { table: 'bookings', label: 'Bookings', displayColumns: ['id', 'name', 'email', 'status', 'created_at'], ownerColumn: 'user_id', idColumn: 'id' },
  { table: 'leads', label: 'Leads (contact form submissions)', displayColumns: ['id', 'name', 'email', 'status', 'created_at'], ownerColumn: null, idColumn: 'id' },
  { table: 'chat_logs', label: 'Chat widget logs', displayColumns: ['id', 'session_id', 'role', 'created_at'], ownerColumn: null, idColumn: 'id' },
  { table: 'chat_rate_limits', label: 'Chat rate-limit records', displayColumns: ['ip', 'created_at'], ownerColumn: null, idColumn: 'ip' },
]

// profiles is intentionally NOT in TABLES above: its "owner column" is its own
// id (not a foreign key to itself), so it needs slightly different filters.
const PROFILES_SPEC: TableSpec = {
  table: 'profiles',
  label: 'Profiles',
  displayColumns: ['id', 'full_name', 'role', 'company', 'created_at'],
  ownerColumn: 'id',
  idColumn: 'id',
}

function parseArgs() {
  const args = process.argv.slice(2)
  let dryRun = true
  let confirmed = false
  for (const arg of args) {
    if (arg === '--dry-run' || arg === '--dry-run=true') dryRun = true
    else if (arg === '--dry-run=false') dryRun = false
    else if (arg === '--yes' || arg === '-y') confirmed = true
    else if (arg === '--help' || arg === '-h') {
      console.log(
        'Usage: node scripts/cleanup-test-data.ts [--dry-run=false --yes]\n' +
          '  (no args)             Dry run — report only, deletes nothing (default)\n' +
          '  --dry-run=false --yes Live run — actually deletes test/demo rows'
      )
      process.exit(0)
    }
  }
  return { dryRun, confirmed }
}

function formatValue(value: unknown): string {
  if (value === null || value === undefined) return String.raw`—`
  if (typeof value === 'string' && value.length > 60) return value.slice(0, 57) + '...'
  return String(value)
}

function printTableReport(spec: Pick<TableSpec, 'table' | 'label' | 'displayColumns'>, count: number, sample: Record<string, unknown>[]) {
  console.log(`\n[${spec.table}] ${spec.label}`)
  console.log(`  Rows to remove: ${count}`)
  if (sample.length === 0) {
    console.log('  (no rows)')
    return
  }
  console.log(`  Sample (showing ${sample.length} of ${count}):`)
  for (const row of sample) {
    const parts = spec.displayColumns.map((col) => `${col}=${formatValue(row[col])}`)
    console.log(`    - ${parts.join(', ')}`)
  }
}

/** Excludes rows owned by the admin profile. Uses `.or(col.is.null, col.neq.admin)` (not `.neq`) so rows with a NULL owner column are still included — a plain `.neq` would silently hide them. */
function applyAdminExclusion<T>(query: T, ownerColumn: string | null, adminProfileId: string): T {
  if (!ownerColumn) return query
  // @ts-expect-error - PostgrestFilterBuilder methods are chainable but not generically typed here
  return query.or(`${ownerColumn}.is.null,${ownerColumn}.neq.${adminProfileId}`)
}

async function inspectTable(spec: TableSpec, adminProfileId: string) {
  const countQuery = applyAdminExclusion(
    supabaseAdmin.from(spec.table).select('*', { count: 'exact', head: true }),
    spec.ownerColumn,
    adminProfileId
  )
  const { count, error: countError } = await countQuery
  if (countError) throw new Error(`Count failed for ${spec.table}: ${countError.message}`)

  const sampleQuery = applyAdminExclusion(
    supabaseAdmin.from(spec.table).select(spec.displayColumns.join(',')),
    spec.ownerColumn,
    adminProfileId
  )
  const { data, error: sampleError } = await sampleQuery.order('created_at', { ascending: false }).limit(SAMPLE_SIZE)
  if (sampleError) throw new Error(`Sample fetch failed for ${spec.table}: ${sampleError.message}`)

  return { count: count ?? 0, sample: (data ?? []) as unknown as Record<string, unknown>[] }
}

async function deleteTable(spec: TableSpec, adminProfileId: string): Promise<number> {
  let query = supabaseAdmin.from(spec.table).delete({ count: 'exact' })
  if (spec.ownerColumn) {
    query = query.or(`${spec.ownerColumn}.is.null,${spec.ownerColumn}.neq.${adminProfileId}`)
  } else {
    query = query.not(spec.idColumn, 'is', null)
  }
  const { error, count } = await query
  if (error) throw new Error(`Delete failed for ${spec.table}: ${error.message}`)
  return count ?? 0
}

async function listAllAuthUsers(): Promise<{ id: string; email: string | null }[]> {
  const perPage = 200
  let page = 1
  const all: { id: string; email: string | null }[] = []
  for (;;) {
    const { data, error } = await supabaseAdmin.auth.admin.listUsers({ page, perPage })
    if (error) throw new Error(`Failed to list auth users: ${error.message}`)
    all.push(...data.users.map((u) => ({ id: u.id, email: u.email ?? null })))
    if (data.users.length < perPage) break
    page += 1
  }
  return all
}

async function main() {
  const { dryRun, confirmed } = parseArgs()

  console.log('='.repeat(72))
  console.log(dryRun ? 'DRY RUN — no data will be deleted' : 'LIVE RUN — rows WILL be permanently deleted')
  console.log('='.repeat(72))

  const allUsers = await listAllAuthUsers()
  const adminUser = allUsers.find((u) => u.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase())
  if (!adminUser) {
    console.error(
      `Could not find an auth user with email ${ADMIN_EMAIL}. Aborting so we never risk wiping every account.`
    )
    process.exit(1)
  }
  const adminProfileId = adminUser.id
  console.log(`\nProtected admin account: ${ADMIN_EMAIL}  (id: ${adminProfileId})`)

  const nonAdminUsers = allUsers.filter((u) => u.id !== adminProfileId)

  let grandTotal = 0
  for (const spec of TABLES) {
    const { count, sample } = await inspectTable(spec, adminProfileId)
    grandTotal += count
    printTableReport(spec, count, sample)
  }

  const { count: profileCount, sample: profileSample } = await inspectTable(PROFILES_SPEC, adminProfileId)
  grandTotal += profileCount
  printTableReport(PROFILES_SPEC, profileCount, profileSample)

  grandTotal += nonAdminUsers.length
  console.log(`\n[auth.users] Auth accounts (excluding the protected admin)`)
  console.log(`  Rows to remove: ${nonAdminUsers.length}`)
  for (const u of nonAdminUsers) {
    console.log(`    - id=${u.id}, email=${u.email ?? String.raw`—`}`)
  }

  console.log('\n' + '-'.repeat(72))
  console.log(`TOTAL rows/accounts that would be deleted: ${grandTotal}`)
  console.log('-'.repeat(72))

  if (dryRun) {
    console.log('\nDry run complete. Nothing was deleted.')
    console.log('Review the report above, then re-run with --dry-run=false --yes to actually delete.')
    return
  }

  if (!confirmed) {
    console.log('\nRefusing to delete: pass both --dry-run=false AND --yes to actually delete data.')
    process.exit(1)
  }

  console.log('\nDeleting...')
  for (const spec of TABLES) {
    const deleted = await deleteTable(spec, adminProfileId)
    console.log(`  Deleted ${deleted} row(s) from ${spec.table}`)
  }
  const deletedProfiles = await deleteTable(PROFILES_SPEC, adminProfileId)
  console.log(`  Deleted ${deletedProfiles} row(s) from profiles`)

  for (const user of nonAdminUsers) {
    const { error } = await supabaseAdmin.auth.admin.deleteUser(user.id)
    if (error) {
      console.error(`  FAILED to delete auth user ${user.id} (${user.email ?? 'no email'}): ${error.message}`)
    } else {
      console.log(`  Deleted auth user ${user.id} (${user.email ?? 'no email'})`)
    }
  }

  console.log('\nVerifying cleanup...')
  let remaining = 0
  for (const spec of TABLES) {
    const { count } = await inspectTable(spec, adminProfileId)
    remaining += count
    console.log(`  ${spec.table}: ${count} row(s) remaining`)
  }
  const { count: remainingProfiles } = await inspectTable(PROFILES_SPEC, adminProfileId)
  remaining += remainingProfiles
  console.log(`  profiles: ${remainingProfiles} row(s) remaining`)

  const remainingUsers = (await listAllAuthUsers()).filter((u) => u.id !== adminProfileId)
  remaining += remainingUsers.length
  console.log(`  auth.users (non-admin): ${remainingUsers.length} remaining`)

  if (remaining === 0) {
    console.log('\nCleanup verified: 0 rows remain anywhere except the admin@digiwolf.agency account.')
  } else {
    console.error(`\nWARNING: ${remaining} row(s)/account(s) still remain. Review the output above.`)
    process.exit(1)
  }
}

main().catch((err) => {
  console.error('\nCleanup script failed:', err)
  process.exit(1)
})
