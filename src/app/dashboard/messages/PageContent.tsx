'use client';

export const dynamic = 'force-dynamic';

import { useState, useRef, useEffect } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

const clientNav = [
  { icon: '⬡', label: 'Overview', href: '/dashboard' },
  { icon: '📁', label: 'My Projects', href: '/dashboard/projects' },
  { icon: '🧾', label: 'Invoices', href: '/dashboard/invoices' },
  { icon: '📂', label: 'Files', href: '/dashboard/files' },
  { icon: '💬', label: 'Messages', href: '/dashboard/messages', badge: 3 },
  { icon: '⚙️', label: 'Settings', href: '/dashboard/settings' },
];

interface Message {
  id: number;
  sender: 'me' | 'agent';
  text: string;
  time: string;
}

interface Conversation {
  id: number;
  name: string;
  role: string;
  avatar: string;
  avatarBg: string;
  online: boolean;
  lastMessage: string;
  time: string;
  unread: number;
  messages: Message[];
}

const conversations: Conversation[] = [
  {
    id: 1,
    name: 'Tomáš Krejčí',
    role: 'Project Manager',
    avatar: 'TK',
    avatarBg: '#0047FF',
    online: true,
    lastMessage: 'I sent you the updated mockups for review.',
    time: '10:42',
    unread: 2,
    messages: [
      {
        id: 1,
        sender: 'agent',
        text: 'Good morning Martin! Hope you had a good weekend. I\'ve uploaded the updated homepage mockups to the Files section — please check them when you get a chance.',
        time: '09:15',
      },
      {
        id: 2,
        sender: 'me',
        text: 'Morning Tomáš! Just had a look — the hero section looks fantastic. Love the new layout. But can we tweak the CTA button color? The current orange feels slightly off-brand.',
        time: '09:28',
      },
      {
        id: 3,
        sender: 'agent',
        text: 'Absolutely, we can adjust that. Should we go with a deeper blue to match your brand guidelines, or would you prefer a gradient treatment? I can prepare 2–3 options by end of day.',
        time: '09:31',
      },
      {
        id: 4,
        sender: 'me',
        text: 'Yes, let\'s go with 2–3 options. I\'d like to see at least one with the gradient. Also — where are we on the timeline? We\'re aiming for end of June, correct?',
        time: '09:45',
      },
      {
        id: 5,
        sender: 'agent',
        text: 'That\'s correct — deadline is 30 June. We\'re currently at 65% completion. The product listing pages and checkout flow are the remaining big chunks. We\'re on track, but I\'d like to lock in the designs by next Friday at the latest.',
        time: '10:12',
      },
      {
        id: 6,
        sender: 'agent',
        text: 'I sent you the updated mockups for review. Also flagged the three sections we still need your content for — especially the "About Us" block. Can you send that over by Wednesday?',
        time: '10:42',
      },
    ],
  },
  {
    id: 2,
    name: 'Jana Marková',
    role: 'SEO Specialist',
    avatar: 'JM',
    avatarBg: '#7c3aed',
    online: false,
    lastMessage: 'The keyword report is ready for download.',
    time: 'Yesterday',
    unread: 1,
    messages: [
      {
        id: 1,
        sender: 'agent',
        text: 'Hi Martin, I\'ve completed the initial keyword research for your SEO strategy. The report covers 120 target keywords across 6 category clusters.',
        time: '14:00',
      },
      {
        id: 2,
        sender: 'me',
        text: 'Great, thanks Jana! Are any of these keywords actively targeted by our competitors?',
        time: '14:22',
      },
      {
        id: 3,
        sender: 'agent',
        text: 'Yes — about 40% overlap with RetailPro\'s current strategy. I\'ve highlighted the gaps where we can rank faster with less competition. The keyword report is ready for download.',
        time: '14:35',
      },
    ],
  },
  {
    id: 3,
    name: 'Support Team',
    role: 'DigiWolf Support',
    avatar: '🐺',
    avatarBg: '#0891b2',
    online: true,
    lastMessage: 'Your ticket #TKT-882 has been resolved.',
    time: 'Mon',
    unread: 0,
    messages: [
      {
        id: 1,
        sender: 'me',
        text: 'Hi, I\'m having trouble accessing the invoice from March. It\'s not appearing in my portal.',
        time: '11:00',
      },
      {
        id: 2,
        sender: 'agent',
        text: 'Hello Martin! Thank you for reaching out. We\'ve opened ticket #TKT-882 for this. Our team is looking into the issue — you should regain access within 1 hour.',
        time: '11:08',
      },
      {
        id: 3,
        sender: 'agent',
        text: 'Your ticket #TKT-882 has been resolved. The invoice is now accessible under your Invoices section. Please let us know if you need anything else!',
        time: '11:52',
      },
    ],
  },
];

export function MessagesPageInner() {
  const [selectedId, setSelectedId] = useState(1);
  const [messageInput, setMessageInput] = useState('');
  const [localMessages, setLocalMessages] = useState<Record<number, Message[]>>(
    Object.fromEntries(conversations.map((c) => [c.id, c.messages]))
  );
  const [hoveredSend, setHoveredSend] = useState(false);
  const [hoveredConv, setHoveredConv] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const selected = conversations.find((c) => c.id === selectedId)!;
  const messages = localMessages[selectedId] || [];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [selectedId, messages.length]);

  const handleSend = () => {
    if (!messageInput.trim()) return;
    const newMsg: Message = {
      id: Date.now(),
      sender: 'me',
      text: messageInput.trim(),
      time: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
    };
    setLocalMessages((prev) => ({
      ...prev,
      [selectedId]: [...(prev[selectedId] || []), newMsg],
    }));
    setMessageInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <DashboardLayout
      nav={clientNav}
      role="client"
      userName="Martin Novák"
      userInitial="M"
    >
      {/* Two-panel messaging layout */}
      <div
        style={{
          display: 'flex',
          height: 'calc(100vh - 64px)',
          overflow: 'hidden',
        }}
      >
        {/* LEFT PANEL — Conversation List */}
        <div
          style={{
            width: '300px',
            flexShrink: 0,
            borderRight: '1px solid rgba(255,255,255,0.06)',
            display: 'flex',
            flexDirection: 'column',
            background: '#040d1f',
          }}
        >
          {/* Panel Header */}
          <div
            style={{
              padding: '20px 16px 14px',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <h2
              style={{
                fontSize: '18px',
                fontWeight: 700,
                color: '#f0f4ff',
                margin: '0 0 12px 0',
              }}
            >
              Messages
            </h2>
            {/* Search */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '10px',
                padding: '8px 12px',
              }}
            >
              <span style={{ fontSize: '14px', color: '#4a5678' }}>🔍</span>
              <input
                type="text"
                placeholder="Search conversations..."
                style={{
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: '#c8d4f0',
                  fontSize: '13px',
                  width: '100%',
                }}
              />
            </div>
          </div>

          {/* Conversation List */}
          <div style={{ overflowY: 'auto', flex: 1 }}>
            {conversations.map((conv) => {
              const isSelected = selectedId === conv.id;
              const isHovered = hoveredConv === conv.id;
              return (
                <div
                  key={conv.id}
                  onClick={() => setSelectedId(conv.id)}
                  onMouseEnter={() => setHoveredConv(conv.id)}
                  onMouseLeave={() => setHoveredConv(null)}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                    padding: '14px 16px',
                    cursor: 'pointer',
                    background: isSelected
                      ? 'rgba(0,71,255,0.1)'
                      : isHovered
                      ? 'rgba(255,255,255,0.03)'
                      : 'transparent',
                    borderLeft: `3px solid ${isSelected ? '#0047FF' : 'transparent'}`,
                    transition: 'all 0.15s ease',
                  }}
                >
                  {/* Avatar */}
                  <div style={{ position: 'relative', flexShrink: 0 }}>
                    <div
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        background: conv.avatarBg,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: conv.id === 3 ? '18px' : '13px',
                        fontWeight: 700,
                        color: '#fff',
                      }}
                    >
                      {conv.avatar}
                    </div>
                    {conv.online && (
                      <div
                        style={{
                          position: 'absolute',
                          bottom: '1px',
                          right: '1px',
                          width: '10px',
                          height: '10px',
                          borderRadius: '50%',
                          background: '#22c55e',
                          border: '2px solid #040d1f',
                        }}
                      />
                    )}
                  </div>

                  {/* Content */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        marginBottom: '3px',
                      }}
                    >
                      <span
                        style={{
                          fontSize: '14px',
                          fontWeight: isSelected ? 700 : 500,
                          color: '#f0f4ff',
                        }}
                      >
                        {conv.name}
                      </span>
                      <span style={{ fontSize: '11px', color: '#4a5678' }}>
                        {conv.time}
                      </span>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <p
                        style={{
                          fontSize: '12px',
                          color: '#4a5678',
                          margin: 0,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          maxWidth: '170px',
                        }}
                      >
                        {conv.lastMessage}
                      </p>
                      {conv.unread > 0 && (
                        <span
                          style={{
                            minWidth: '18px',
                            height: '18px',
                            borderRadius: '9px',
                            background: '#0047FF',
                            color: '#fff',
                            fontSize: '10px',
                            fontWeight: 700,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '0 4px',
                            flexShrink: 0,
                          }}
                        >
                          {conv.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT PANEL — Chat Area */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            background: '#030712',
            minWidth: 0,
          }}
        >
          {/* Chat Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              padding: '16px 24px',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              background: '#040d1f',
            }}
          >
            <div style={{ position: 'relative' }}>
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  background: selected.avatarBg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: selected.id === 3 ? '20px' : '14px',
                  fontWeight: 700,
                  color: '#fff',
                }}
              >
                {selected.avatar}
              </div>
              {selected.online && (
                <div
                  style={{
                    position: 'absolute',
                    bottom: '1px',
                    right: '1px',
                    width: '11px',
                    height: '11px',
                    borderRadius: '50%',
                    background: '#22c55e',
                    border: '2px solid #040d1f',
                  }}
                />
              )}
            </div>
            <div>
              <p
                style={{
                  fontSize: '16px',
                  fontWeight: 700,
                  color: '#f0f4ff',
                  margin: '0 0 2px 0',
                }}
              >
                {selected.name}
              </p>
              <p style={{ fontSize: '12px', color: '#4a5678', margin: 0 }}>
                {selected.role} •{' '}
                <span style={{ color: selected.online ? '#22c55e' : '#4a5678' }}>
                  {selected.online ? '● Online' : '○ Offline'}
                </span>
              </p>
            </div>
          </div>

          {/* Messages Area */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            {messages.map((msg) => {
              const isMe = msg.sender === 'me';
              return (
                <div
                  key={msg.id}
                  style={{
                    display: 'flex',
                    flexDirection: isMe ? 'row-reverse' : 'row',
                    alignItems: 'flex-end',
                    gap: '10px',
                  }}
                >
                  {/* Agent avatar */}
                  {!isMe && (
                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: selected.avatarBg,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: selected.id === 3 ? '14px' : '11px',
                        fontWeight: 700,
                        color: '#fff',
                        flexShrink: 0,
                      }}
                    >
                      {selected.avatar}
                    </div>
                  )}
                  <div
                    style={{
                      maxWidth: '65%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: isMe ? 'flex-end' : 'flex-start',
                      gap: '4px',
                    }}
                  >
                    <div
                      style={{
                        background: isMe
                          ? '#0047FF'
                          : 'rgba(255,255,255,0.06)',
                        padding: '12px 16px',
                        borderRadius: isMe
                          ? '18px 18px 4px 18px'
                          : '18px 18px 18px 4px',
                        fontSize: '14px',
                        lineHeight: '1.55',
                        color: isMe ? '#fff' : '#c8d4f0',
                        boxShadow: isMe
                          ? '0 2px 12px rgba(0,71,255,0.3)'
                          : 'none',
                      }}
                    >
                      {msg.text}
                    </div>
                    <span style={{ fontSize: '11px', color: '#4a5678' }}>
                      {msg.time}
                    </span>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div
            style={{
              padding: '16px 24px',
              borderTop: '1px solid rgba(255,255,255,0.06)',
              background: '#040d1f',
              display: 'flex',
              gap: '12px',
              alignItems: 'center',
            }}
          >
            {/* Attachment */}
            <button
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.08)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '16px',
                flexShrink: 0,
                color: '#6b7a9e',
              }}
              title="Attach file"
            >
              📎
            </button>

            {/* Input */}
            <div
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
                padding: '10px 16px',
              }}
            >
              <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a message..."
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: '#f0f4ff',
                  fontSize: '14px',
                }}
              />
            </div>

            {/* Send Button */}
            <button
              onClick={handleSend}
              onMouseEnter={() => setHoveredSend(true)}
              onMouseLeave={() => setHoveredSend(false)}
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                background: hoveredSend ? '#1a5fff' : '#0047FF',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px',
                flexShrink: 0,
                boxShadow: '0 2px 10px rgba(0,71,255,0.4)',
                transition: 'all 0.2s ease',
                transform: hoveredSend ? 'scale(1.05)' : 'scale(1)',
              }}
              title="Send message"
            >
              ➤
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
