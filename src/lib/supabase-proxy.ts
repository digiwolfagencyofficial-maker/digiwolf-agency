import { createServerClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse, type NextRequest } from 'next/server'
import { getPublicSupabaseAnonKey, getPublicSupabaseUrl } from '@/lib/supabase-env'

export function createSupabaseProxyClient(request: NextRequest) {
  let response = NextResponse.next({ request })

  const supabase = createServerClient(getPublicSupabaseUrl(), getPublicSupabaseAnonKey(), {
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
        response = NextResponse.next({ request })
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options)
        )
      },
    },
  })

  return {
    supabase,
    getResponse: () => response,
    applyCookiesTo(target: NextResponse) {
      for (const cookie of response.cookies.getAll()) {
        target.cookies.set(cookie)
      }
      return target
    },
  }
}
