import { supabaseAdmin } from '@/lib/supabase'
import { CHAT_RATE_LIMIT_PER_HOUR } from '@/lib/chat-config'

export function getClientIp(forwardedFor: string | null, realIp: string | null): string {
  if (forwardedFor) {
    const first = forwardedFor.split(',')[0]?.trim()
    if (first) return first.slice(0, 64)
  }
  if (realIp) return realIp.slice(0, 64)
  return 'unknown'
}

export async function checkChatRateLimit(ip: string): Promise<{ allowed: boolean; remaining: number }> {
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString()

  const { count, error } = await supabaseAdmin
    .from('chat_rate_limits')
    .select('*', { count: 'exact', head: true })
    .eq('ip', ip)
    .gte('created_at', oneHourAgo)

  if (error) {
    console.error('Chat rate limit check failed:', error)
    return { allowed: true, remaining: CHAT_RATE_LIMIT_PER_HOUR }
  }

  const used = count ?? 0
  return {
    allowed: used < CHAT_RATE_LIMIT_PER_HOUR,
    remaining: Math.max(0, CHAT_RATE_LIMIT_PER_HOUR - used),
  }
}

export async function recordChatRateLimit(ip: string): Promise<void> {
  const { error } = await supabaseAdmin.from('chat_rate_limits').insert({ ip })

  if (error) {
    console.error('Chat rate limit insert failed:', error)
  }

  const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
  await supabaseAdmin.from('chat_rate_limits').delete().lt('created_at', oneDayAgo)
}

export async function logChatMessage(
  sessionId: string,
  role: 'user' | 'assistant',
  content: string
): Promise<void> {
  const { error } = await supabaseAdmin.from('chat_logs').insert({
    session_id: sessionId,
    role,
    content,
  })

  if (error) {
    console.error('Chat log insert failed:', error)
  }
}
