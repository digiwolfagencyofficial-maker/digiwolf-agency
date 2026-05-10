'use client'

export default function ClientFilesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">Files</h1>
        <p className="text-gray-400">Access and manage your project files.</p>
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
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
        </div>
        <h2 className="text-white text-xl font-semibold mb-3">File sharing coming soon</h2>
        <p className="text-gray-400 max-w-md mx-auto leading-relaxed">
          We&apos;re working on a secure file sharing system so you can exchange project files, 
          assets, and deliverables directly through the dashboard.
        </p>
        <div className="mt-8 inline-flex items-center gap-2 px-4 py-2 bg-[#f97316]/10 border border-[#f97316]/20 rounded-lg">
          <div className="w-2 h-2 rounded-full bg-[#f97316] animate-pulse" />
          <span className="text-[#f97316] text-sm font-medium">Coming Soon</span>
        </div>
      </div>
    </div>
  )
}
