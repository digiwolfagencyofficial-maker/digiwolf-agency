export interface TelegramNotification {
  title: string
  name: string
  email: string
  service: string
  summary: string
}

function truncate(text: string, max = 300): string {
  const trimmed = text.trim()
  if (trimmed.length <= max) return trimmed
  return `${trimmed.slice(0, max)}…`
}

function formatMessage(data: TelegramNotification): string {
  return [
    data.title,
    '',
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Service: ${data.service}`,
    `Summary: ${truncate(data.summary)}`,
  ].join('\n')
}

export async function notifyTelegram(text: string): Promise<void> {
  const token = process.env.TELEGRAM_BOOKING_BOT_TOKEN
  const chatId = process.env.TELEGRAM_BOOKING_CHAT_ID

  if (!token || !chatId) {
    console.warn('TELEGRAM_BOOKING_BOT_TOKEN or TELEGRAM_BOOKING_CHAT_ID not set — skipping Telegram notification')
    return
  }

  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
      }),
    })

    if (!response.ok) {
      const body = await response.text()
      console.error('Telegram sendMessage failed:', response.status, body)
    }
  } catch (error) {
    console.error('Telegram notification error:', error)
  }
}

export async function sendTelegramNotification(data: TelegramNotification): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!token || !chatId) {
    console.warn('TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not set — skipping Telegram notification')
    return
  }

  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: formatMessage(data),
      }),
    })

    if (!response.ok) {
      const body = await response.text()
      console.error('Telegram sendMessage failed:', response.status, body)
    }
  } catch (error) {
    console.error('Telegram notification error:', error)
  }
}
