'use client'

import type { ReactNode } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useEffect } from 'react'

const adminLinks = [
  { href: '/admin', label: 'Overview', icon: '📊' },
  { href: '/admin/clients', label: 'Clients', icon: '👥' },
  { href: '/admin/projects', label: 'Projects', icon: '🗂️' },
  { href: '/admin/leads', label: 'Leads', icon: '📋' },
  { href: '/admin/invoices', label: 'Invoices', icon: '🧾' },
]

const clientLinks = [
  { href: '/client', label: 'Overview', icon: '📊' },
  { href: '/client/projects', label: 'Projects', icon: '🗂️' },
  { href: '/client/invoices', label: 'Invoices', icon: '🧾' },
  { href: '/client/files', label: 'Files', icon: '📁' },
  { href: '/client/messages', label: 'Messages', icon: '💬' },
]

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession()
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-gray-400">Loading...</div>
      </div>
    )
  }

  if (!session) return null

  const role = (session.user as any)?.role ?? 'client'
  const isAdmin = role === 'admin'
  const navLinks = isAdmin ? adminLinks : clientLinks

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#111111] border-r border-white/10 flex flex-col fixed h-full">
        {/* Logo */}
        <div className="p-6 border-b border-white/10">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-[#f97316] text-2xl">🐺</span>
            <span className="text-white font-bold text-lg">Digi Wolf</span>
          </Link>
        </div>

        {/* Role badge */}
        <div className="px-6 py-3">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            isAdmin
              ? 'bg-[#f97316]/20 text-[#f97316]'
              : 'bg-blue-500/20 text-blue-400'
          }`}>
            {isAdmin ? 'Admin' : 'Client'}
          </span>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-4 py-2 space-y-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(link.href + '/')
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-[#f97316] text-white'
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <span>{link.icon}</span>
                {link.label}
              </Link>
            )
          })}
        </nav>

        {/* Bottom user */}
        <div className="p-4 border-t border-white/10">
          <div className="text-xs text-gray-500 mb-1 truncate">{session.user?.email}</div>
          <button
            onClick={() => signOut({ callbackUrl: '/login' })}
            className="w-full text-left text-sm text-gray-400 hover:text-red-400 transition-colors py-1"
          >
            Sign out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 ml-64 flex flex-col">
        {/* Top bar */}
        <header className="h-16 bg-[#111111] border-b border-white/10 flex items-center justify-between px-6 sticky top-0 z-10">
          <h2 className="text-white font-semibold capitalize">
            {pathname.split('/').filter(Boolean).pop()?.replace(/-/g, ' ') || 'Dashboard'}
          </h2>
          <div className="flex items-center gap-4">
            <span className="text-gray-400 text-sm hidden sm:block">{session.user?.email}</span>
            <button
              onClick={() => signOut({ callbackUrl: '/login' })}
              className="bg-white/10 hover:bg-red-500/20 text-white hover:text-red-400 text-sm px-4 py-1.5 rounded-lg transition-colors"
            >
              Sign Out
            </button>
          </div>
        </header>

        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
