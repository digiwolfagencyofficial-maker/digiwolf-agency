'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from '@/i18n/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { MessageCircle, X, Send, UserRound, Mail } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { COMPANY } from '@/lib/company'
import { CHAT_MAX_MESSAGE_LENGTH } from '@/lib/chat-config'

type ChatRole = 'user' | 'assistant'

interface ChatMessage {
  id: string
  role: ChatRole
  content: string
}

const MESSENGER_URL = 'https://m.me/972888042568322'

function createId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

function getSessionId(): string {
  if (typeof window === 'undefined') return ''
  const key = 'dw-chat-session'
  let id = sessionStorage.getItem(key)
  if (!id) {
    id = crypto.randomUUID()
    sessionStorage.setItem(key, id)
  }
  return id
}

export default function ChatWidget() {
  const t = useTranslations('chat')
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [sessionId, setSessionId] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    setMessages([{ id: 'welcome', role: 'assistant', content: t('welcomeMessage') }])
  }, [t])

  useEffect(() => {
    setSessionId(getSessionId())
  }, [])

  useEffect(() => {
    if (open) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
      setTimeout(() => inputRef.current?.focus(), 200)
    }
  }, [open, messages, loading])

  const sendMessage = useCallback(async () => {
    const trimmed = input.trim()
    if (!trimmed || loading || !sessionId) return

    if (trimmed.length > CHAT_MAX_MESSAGE_LENGTH) {
      setError(t('errors.messageTooLong', { max: CHAT_MAX_MESSAGE_LENGTH }))
      return
    }

    setError(null)
    setInput('')

    const userMessage: ChatMessage = {
      id: createId(),
      role: 'user',
      content: trimmed,
    }

    const assistantId = createId()
    const history = messages
      .filter((m) => m.id !== 'welcome')
      .map((m) => ({ role: m.role, content: m.content }))

    setMessages((prev) => [
      ...prev,
      userMessage,
      { id: assistantId, role: 'assistant', content: '' },
    ])
    setLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: trimmed,
          sessionId,
          history,
        }),
      })

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as { error?: string } | null
        throw new Error(data?.error || t('errors.generic'))
      }

      const reader = response.body?.getReader()
      if (!reader) throw new Error(t('errors.noStream'))

      const decoder = new TextDecoder()
      let assistantText = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        assistantText += decoder.decode(value, { stream: true })
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId ? { ...m, content: assistantText } : m
          )
        )
      }

      if (!assistantText.trim()) {
        throw new Error(t('errors.noResponse'))
      }
    } catch (err) {
      const message =
        err instanceof Error ? err.message : t('errors.generic')
      setError(message)
      setMessages((prev) => prev.filter((m) => m.id !== assistantId))
    } finally {
      setLoading(false)
    }
  }, [input, loading, messages, sessionId, t])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label={t('aria.dialog')}
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed',
              bottom: 88,
              right: 16,
              left: 16,
              zIndex: 8900,
              maxWidth: 400,
              marginLeft: 'auto',
              marginRight: 0,
              height: 'min(70vh, 520px)',
              display: 'flex',
              flexDirection: 'column',
              background: '#040d1f',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 16,
              boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,71,255,0.1)',
              overflow: 'hidden',
            }}
          >
            {/* Header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 16px',
                borderBottom: '1px solid rgba(255,255,255,0.08)',
                background: 'rgba(0,71,255,0.08)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #0047FF, #3d74ff)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <MessageCircle size={16} color="#fff" />
                </div>
                <div>
                  <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: '#f0f4ff' }}>
                    {t('header.title')}
                  </p>
                  <p style={{ margin: 0, fontSize: 11, color: '#8892b0' }}>
                    {t('header.subtitle')}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={t('aria.closeChat')}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#8892b0',
                  cursor: 'pointer',
                  padding: 6,
                  borderRadius: 8,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div
              style={{
                flex: 1,
                overflowY: 'auto',
                padding: '16px 14px',
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
              }}
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  style={{
                    display: 'flex',
                    justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                  }}
                >
                  <div
                    style={{
                      maxWidth: '85%',
                      padding: '10px 14px',
                      borderRadius: msg.role === 'user' ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
                      background:
                        msg.role === 'user'
                          ? 'linear-gradient(135deg, #0047FF, #3d74ff)'
                          : 'rgba(255,255,255,0.06)',
                      color: '#f0f4ff',
                      fontSize: 14,
                      lineHeight: 1.55,
                      whiteSpace: 'pre-wrap',
                      wordBreak: 'break-word',
                    }}
                  >
                    {msg.content}
                    {loading && msg.role === 'assistant' && msg.content === '' && (
                      <span style={{ opacity: 0.6 }}>{t('thinking')}</span>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Human handoff */}
            <div
              style={{
                padding: '10px 14px',
                borderTop: '1px solid rgba(255,255,255,0.06)',
                display: 'flex',
                flexWrap: 'wrap',
                gap: 8,
                alignItems: 'center',
              }}
            >
              <a
                href={MESSENGER_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '7px 12px',
                  background: 'rgba(0,71,255,0.15)',
                  border: '1px solid rgba(0,71,255,0.35)',
                  borderRadius: 8,
                  color: '#3d74ff',
                  fontSize: 12,
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                <UserRound size={14} />
                {t('handoff.talkToHuman')}
              </a>
              <a
                href={`mailto:${COMPANY.email}`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '7px 12px',
                  background: 'transparent',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 8,
                  color: '#8892b0',
                  fontSize: 12,
                  fontWeight: 500,
                  textDecoration: 'none',
                }}
              >
                <Mail size={14} />
                {COMPANY.email}
              </a>
            </div>

            {/* Error */}
            {error && (
              <div
                style={{
                  padding: '8px 14px',
                  background: 'rgba(239,68,68,0.1)',
                  borderTop: '1px solid rgba(239,68,68,0.2)',
                  color: '#fca5a5',
                  fontSize: 12,
                  lineHeight: 1.5,
                }}
              >
                {error.includes('/contact') ? (
                  <>
                    {error.split('/contact')[0]}
                    <Link href="/contact" style={{ color: '#3d74ff' }}>
                      {t('errors.contactFormLink')}
                    </Link>
                    {error.split('/contact')[1]}
                  </>
                ) : (
                  error
                )}
              </div>
            )}

            {/* Input */}
            <div
              style={{
                padding: '12px 14px',
                borderTop: '1px solid rgba(255,255,255,0.08)',
                display: 'flex',
                gap: 8,
                alignItems: 'flex-end',
              }}
            >
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value.slice(0, CHAT_MAX_MESSAGE_LENGTH))}
                onKeyDown={handleKeyDown}
                placeholder={t('inputPlaceholder')}
                rows={1}
                disabled={loading}
                aria-label={t('aria.messageInput')}
                style={{
                  flex: 1,
                  resize: 'none',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 10,
                  padding: '10px 12px',
                  color: '#f0f4ff',
                  fontSize: 14,
                  lineHeight: 1.4,
                  outline: 'none',
                  fontFamily: 'inherit',
                  maxHeight: 100,
                  overflowY: 'auto',
                }}
              />
              <button
                type="button"
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                aria-label={t('aria.sendMessage')}
                style={{
                  width: 40,
                  height: 40,
                  flexShrink: 0,
                  borderRadius: 10,
                  border: 'none',
                  background:
                    loading || !input.trim()
                      ? 'rgba(0,71,255,0.3)'
                      : 'linear-gradient(135deg, #0047FF, #3d74ff)',
                  color: '#fff',
                  cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: loading || !input.trim() ? 0.6 : 1,
                }}
              >
                <Send size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bubble */}
      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? t('aria.closeChat') : t('aria.openChat')}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          zIndex: 8901,
          width: 56,
          height: 56,
          borderRadius: '50%',
          border: 'none',
          background: open
            ? 'rgba(255,255,255,0.1)'
            : 'linear-gradient(135deg, #0047FF, #3d74ff)',
          color: '#fff',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 32px rgba(0,71,255,0.4)',
        }}
      >
        {open ? <X size={22} /> : <MessageCircle size={24} />}
      </motion.button>
    </>
  )
}
