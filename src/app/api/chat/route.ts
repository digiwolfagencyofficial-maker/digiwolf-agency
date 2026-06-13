import { NextRequest } from 'next/server'
import { CHAT_MAX_MESSAGE_LENGTH, CHAT_SYSTEM_PROMPT } from '@/lib/chat-config'
import {
  checkChatRateLimit,
  getClientIp,
  logChatMessage,
  recordChatRateLimit,
} from '@/lib/chat'

const OPENROUTER_MODEL = 'deepseek/deepseek-v4-flash'
const MAX_HISTORY_MESSAGES = 20

type ChatRole = 'user' | 'assistant'

interface HistoryMessage {
  role: ChatRole
  content: string
}

function jsonError(message: string, status: number) {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}

export async function POST(request: NextRequest) {
  try {
    if (!process.env.OPENROUTER_API_KEY) {
      return jsonError(
        'Our chat assistant is temporarily unavailable. Please use the contact form or email info@digiwolf.agency.',
        503
      )
    }

    const body = await request.json()
    const message = typeof body.message === 'string' ? body.message.trim() : ''
    const sessionId = typeof body.sessionId === 'string' ? body.sessionId.trim() : ''
    const history: HistoryMessage[] = Array.isArray(body.history)
      ? body.history
          .filter(
            (item: unknown): item is HistoryMessage =>
              typeof item === 'object' &&
              item !== null &&
              'role' in item &&
              'content' in item &&
              ((item as HistoryMessage).role === 'user' ||
                (item as HistoryMessage).role === 'assistant') &&
              typeof (item as HistoryMessage).content === 'string'
          )
          .slice(-MAX_HISTORY_MESSAGES)
      : []

    if (!sessionId) {
      return jsonError('Invalid session. Please refresh the page and try again.', 400)
    }

    if (!message) {
      return jsonError('Please enter a message.', 400)
    }

    if (message.length > CHAT_MAX_MESSAGE_LENGTH) {
      return jsonError(`Messages must be ${CHAT_MAX_MESSAGE_LENGTH} characters or fewer.`, 400)
    }

    const ip = getClientIp(
      request.headers.get('x-forwarded-for'),
      request.headers.get('x-real-ip')
    )

    const { allowed } = await checkChatRateLimit(ip)
    if (!allowed) {
      return jsonError(
        'You have reached the message limit for now. Please try again in an hour, book a free call at /book, or use our contact form at /contact.',
        429
      )
    }

    await recordChatRateLimit(ip)
    await logChatMessage(sessionId, 'user', message)

    const openRouterMessages = [
      { role: 'system' as const, content: CHAT_SYSTEM_PROMPT },
      ...history.map((item) => ({ role: item.role, content: item.content })),
      { role: 'user' as const, content: message },
    ]

    const openRouterRes = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || 'https://digiwolf.agency',
        'X-Title': 'Digi Wolf Agency',
      },
      body: JSON.stringify({
        model: OPENROUTER_MODEL,
        messages: openRouterMessages,
        stream: true,
      }),
    })

    if (!openRouterRes.ok || !openRouterRes.body) {
      const errText = await openRouterRes.text().catch(() => 'Unknown error')
      console.error('OpenRouter error:', openRouterRes.status, errText)
      return jsonError(
        'Sorry, I could not respond right now. Please try again later or contact us at info@digiwolf.agency.',
        502
      )
    }

    const encoder = new TextEncoder()
    let fullAssistantContent = ''

    const stream = new ReadableStream({
      async start(controller) {
        const reader = openRouterRes.body!.getReader()
        const decoder = new TextDecoder()
        let buffer = ''

        try {
          while (true) {
            const { done, value } = await reader.read()
            if (done) break

            buffer += decoder.decode(value, { stream: true })
            const lines = buffer.split('\n')
            buffer = lines.pop() ?? ''

            for (const line of lines) {
              const trimmed = line.trim()
              if (!trimmed.startsWith('data:')) continue

              const data = trimmed.slice(5).trim()
              if (!data || data === '[DONE]') continue

              try {
                const parsed = JSON.parse(data) as {
                  choices?: Array<{ delta?: { content?: string } }>
                }
                const content = parsed.choices?.[0]?.delta?.content
                if (content) {
                  fullAssistantContent += content
                  controller.enqueue(encoder.encode(content))
                }
              } catch {
                // Skip malformed SSE chunks
              }
            }
          }

          if (fullAssistantContent) {
            await logChatMessage(sessionId, 'assistant', fullAssistantContent)
          }

          controller.close()
        } catch (error) {
          console.error('Chat stream error:', error)
          controller.error(error)
        }
      },
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache, no-transform',
        Connection: 'keep-alive',
      },
    })
  } catch (error) {
    console.error('Chat API error:', error)
    return jsonError(
      'Something went wrong. Please try again later or use our contact form at /contact.',
      500
    )
  }
}
