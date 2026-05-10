'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

interface NavItem {
  icon: string
  label: string
  href: string
  badge?: number
}

interface DashboardLayoutProps {
  children: React.ReactNode
  navItems: NavItem[]
  role: 'client' | 'admin'
  userName?: string
  userInitial?: string
}

export default function DashboardLayout({ children, navItems, role, userName = 'User', userInitial = 'U' }: DashboardLayoutProps) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [hoveredNav, setHoveredNav] = useState('')
  const [notifications, setNotifications] = useState(3)

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#030712', color: '#f0f4ff', fontFamily: 'Inter, system-ui, sans-serif' }}>

      {/* Sidebar */}
      <aside style={{
        width: sidebarOpen ? 240 : 68,
        flexShrink: 0,
        background: '#040d1f',
        borderRight: '1px solid #0d1a35',
        display: 'flex', flexDirection: 'column',
        position: 'fixed', top: 0, left: 0, height: '100vh',
        zIndex: 100,
        transition: 'width 0.25s cubic-bezier(0.4,0,0.2,1)',
        overflow: 'hidden',
      }}>
        {/* Logo */}
        <div style={{
          padding: '20px 16px',
          borderBottom: '1px solid #0d1a35',
          display: 'flex', alignItems: 'center', gap: 10,
          minHeight: 72,
        }}>
          <div style={{ flexShrink: 0 }}>
            <Image src="/digiwolf-logo.svg" alt="Digi Wolf Agency" width={sidebarOpen ? 120 : 30} height={sidebarOpen ? 48 : 30} />
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{
              marginLeft: 'auto', flexShrink: 0,
              width: 28, height: 28, borderRadius: 6,
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid #0d1a35',
              color: '#8892b0', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 12, transition: 'all 0.2s',
            }}
          >
            {sidebarOpen ? '←' : '→'}
          </button>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '12px 8px', display: 'flex', flexDirection: 'column', gap: 2, overflowY: 'auto' }}>
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/dashboard' && item.href !== '/admin' && pathname.startsWith(item.href))
            const isHovered = item.label === hoveredNav
            return (
              <Link
                key={item.label}
                href={item.href}
                onMouseEnter={() => setHoveredNav(item.label)}
                onMouseLeave={() => setHoveredNav('')}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '10px 12px', borderRadius: 10,
                  background: isActive ? 'rgba(0,71,255,0.15)' : isHovered ? 'rgba(255,255,255,0.04)' : 'transparent',
                  border: isActive ? '1px solid rgba(0,71,255,0.25)' : '1px solid transparent',
                  color: isActive ? '#4d80ff' : isHovered ? '#f0f4ff' : '#8892b0',
                  textDecoration: 'none',
                  transition: 'all 0.15s',
                  fontSize: 14, fontWeight: isActive ? 600 : 500,
                  position: 'relative',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                }}
              >
                <span style={{ fontSize: 18, flexShrink: 0 }}>{item.icon}</span>
                {sidebarOpen && <span style={{ flex: 1 }}>{item.label}</span>}
                {sidebarOpen && item.badge && (
                  <span style={{
                    background: '#0047FF', color: '#fff',
                    borderRadius: 10, fontSize: 11, fontWeight: 700,
                    padding: '1px 6px', minWidth: 18, textAlign: 'center', flexShrink: 0,
                  }}>{item.badge}</span>
                )}
                {!sidebarOpen && item.badge && (
                  <span style={{
                    position: 'absolute', top: 6, right: 6,
                    width: 8, height: 8, borderRadius: '50%',
                    background: '#0047FF',
                  }} />
                )}
              </Link>
            )
          })}
        </nav>

        {/* User profile */}
        <div style={{
          padding: '14px 12px',
          borderTop: '1px solid #0d1a35',
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
            background: 'linear-gradient(135deg, #0047FF, #3d74ff)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 15, fontWeight: 700, color: '#fff',
          }}>{userInitial}</div>
          {sidebarOpen && (
            <>
              <div style={{ flex: 1, overflow: 'hidden' }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#f0f4ff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{userName}</div>
                <div style={{ fontSize: 11, color: '#8892b0', textTransform: 'capitalize' }}>{role}</div>
              </div>
              <Link href="/login" style={{ fontSize: 16, color: '#8892b0', textDecoration: 'none', flexShrink: 0 }} title="Sign out">⎋</Link>
            </>
          )}
        </div>
      </aside>

      {/* Main */}
      <main style={{
        flex: 1,
        marginLeft: sidebarOpen ? 240 : 68,
        minHeight: '100vh',
        transition: 'margin-left 0.25s cubic-bezier(0.4,0,0.2,1)',
      }}>
        {/* Top bar */}
        <div style={{
          position: 'sticky', top: 0, zIndex: 50,
          background: 'rgba(3,7,18,0.85)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid #0d1a35',
          padding: '0 32px',
          height: 60,
          display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 12,
        }}>
          <div style={{
            background: '#040d1f', border: '1px solid #0d1a35',
            borderRadius: 8, padding: '6px 12px',
            display: 'flex', alignItems: 'center', gap: 8,
            fontSize: 13, color: '#8892b0',
          }}>
            <span>🔍</span>
            <span>Search...</span>
            <span style={{ fontSize: 11, color: '#4a5568', marginLeft: 8 }}>⌘K</span>
          </div>
          <button style={{
            position: 'relative', width: 40, height: 40, borderRadius: 10,
            background: '#040d1f', border: '1px solid #0d1a35',
            cursor: 'pointer', color: '#8892b0', fontSize: 18,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            🔔
            {notifications > 0 && (
              <span style={{
                position: 'absolute', top: 8, right: 8,
                width: 8, height: 8, borderRadius: '50%',
                background: '#0047FF', border: '2px solid #030712',
              }} />
            )}
          </button>
          <div style={{
            width: 36, height: 36, borderRadius: '50%',
            background: 'linear-gradient(135deg, #0047FF, #3d74ff)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 14, fontWeight: 700, color: '#fff', cursor: 'pointer',
          }}>{userInitial}</div>
        </div>

        <div style={{ padding: '32px' }}>
          {children}
        </div>
      </main>
    </div>
  )
}
