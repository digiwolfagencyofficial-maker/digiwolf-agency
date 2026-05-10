'use client'

export default function ClientMessagesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">Messages</h1>
        <p className="text-gray-400">Communicate directly with your project team.</p>
      </div>

      <div className="bg-[#111111] rounded-xl border border-white/10 p-16 text-center">
        <div className="w-20 h-20 bg-[#f97316]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-10 h-10 text-[#f97316]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </div>
        <h2 className="text-white text-xl font-semibold mb-3">Messaging coming soon</h2>
        <p className="text-gray-400 max-w-md mx-auto leading-relaxed">
          We&apos;re building a real-time messaging system so you can communicate seamlessly 
          with the Digi Wolf team about your projects, revisions, and updates.
        </p>
        <div className="mt-8 inline-flex items-center gap-2 px-4 py-2 bg-[#f97316]/10 border border-[#f97316]/20 rounded-lg">
          <div className="w-2 h-2 rounded-full bg-[#f97316] animate-pulse" />
          <span className="text-[#f97316] text-sm font-medium">Coming Soon</span>
        </div>
      </div>
    </div>
  )
}
