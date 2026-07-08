import { createClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const key = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!url || !key) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local')
  process.exit(1)
}

const supabase = createClient(url, key)

async function fetchLatest(table, columns) {
  const { data, error } = await supabase
    .from(table)
    .select(columns)
    .order('created_at', { ascending: false })
    .limit(3)

  if (error) throw new Error(`${table}: ${error.message}`)
  return data ?? []
}

try {
  const [leads, bookings] = await Promise.all([
    fetchLatest('leads', 'name, email, service, source, status, created_at'),
    fetchLatest('bookings', 'name, email, event_time, status, created_at'),
  ])

  console.log('=== 3 Newest Leads ===')
  console.log(JSON.stringify(leads, null, 2))

  console.log('\n=== 3 Newest Bookings ===')
  console.log(JSON.stringify(bookings, null, 2))
} catch (err) {
  console.error('Error:', err.message)
  process.exit(1)
}
