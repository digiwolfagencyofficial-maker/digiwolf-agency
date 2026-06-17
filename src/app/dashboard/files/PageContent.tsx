'use client';

export const dynamic = 'force-dynamic';

import { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

const clientNav = [
  { icon: '⬡', label: 'Overview', href: '/dashboard' },
  { icon: '📁', label: 'My Projects', href: '/dashboard/projects' },
  { icon: '🧾', label: 'Invoices', href: '/dashboard/invoices' },
  { icon: '📂', label: 'Files', href: '/dashboard/files' },
  { icon: '💬', label: 'Messages', href: '/dashboard/messages' },
  { icon: '⚙️', label: 'Settings', href: '/dashboard/settings' },
];

const folderShortcuts = [
  { icon: '📂', label: 'All Files', count: 0 },
  { icon: '🤝', label: 'Shared with Me', count: 0 },
  { icon: '🕐', label: 'Recent', count: 0 },
];

export function FilesPageInner() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [activeFolder, setActiveFolder] = useState('All Files');
  const [isDragOver, setIsDragOver] = useState(false);
  const [hoveredFolder, setHoveredFolder] = useState<number | null>(null);

  const filters = ['All', 'Documents', 'Images', 'Videos'];

  return (
    <DashboardLayout navItems={clientNav}>
      <div style={{ padding: '32px', maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '28px' }}>
          <h1
            style={{
              fontSize: '28px',
              fontWeight: 700,
              color: '#f0f4ff',
              margin: 0,
              letterSpacing: '-0.5px',
            }}
          >
            Files & Documents
          </h1>
          <p style={{ color: '#6b7a9e', marginTop: '6px', fontSize: '15px' }}>
            Access, manage, and share your project files in one place.
          </p>
        </div>

        {/* Folder Shortcuts */}
        <div
          style={{
            display: 'flex',
            gap: '12px',
            marginBottom: '28px',
          }}
        >
          {folderShortcuts.map((folder, i) => {
            const isActive = activeFolder === folder.label;
            const isHovered = hoveredFolder === i;
            return (
              <button
                key={folder.label}
                onClick={() => setActiveFolder(folder.label)}
                onMouseEnter={() => setHoveredFolder(i)}
                onMouseLeave={() => setHoveredFolder(null)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '12px 20px',
                  background: isActive
                    ? 'rgba(0,71,255,0.15)'
                    : isHovered
                    ? 'rgba(255,255,255,0.04)'
                    : '#040d1f',
                  border: `1px solid ${isActive ? 'rgba(0,71,255,0.4)' : 'rgba(255,255,255,0.06)'}`,
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                <span style={{ fontSize: '18px' }}>{folder.icon}</span>
                <span
                  style={{
                    fontSize: '14px',
                    fontWeight: isActive ? 600 : 400,
                    color: isActive ? '#4d8aff' : '#c8d4f0',
                  }}
                >
                  {folder.label}
                </span>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    color: isActive ? '#4d8aff' : '#4a5678',
                    background: isActive
                      ? 'rgba(0,71,255,0.2)'
                      : 'rgba(255,255,255,0.06)',
                    padding: '2px 8px',
                    borderRadius: '20px',
                  }}
                >
                  {folder.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Upload Zone */}
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={(e) => { e.preventDefault(); setIsDragOver(false); }}
          style={{
            border: `2px dashed ${isDragOver ? '#0047FF' : 'rgba(255,255,255,0.12)'}`,
            borderRadius: '16px',
            padding: '32px',
            textAlign: 'center',
            marginBottom: '28px',
            background: isDragOver
              ? 'rgba(0,71,255,0.06)'
              : 'rgba(255,255,255,0.02)',
            transition: 'all 0.25s ease',
            cursor: 'pointer',
          }}
        >
          <div
            style={{
              width: '52px',
              height: '52px',
              borderRadius: '14px',
              background: 'rgba(0,71,255,0.12)',
              border: '1px solid rgba(0,71,255,0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              margin: '0 auto 16px auto',
            }}
          >
            ⬆️
          </div>
          <p
            style={{
              fontSize: '16px',
              fontWeight: 600,
              color: isDragOver ? '#4d8aff' : '#c8d4f0',
              margin: '0 0 6px 0',
            }}
          >
            {isDragOver ? 'Drop your files here' : 'Drag & drop files here'}
          </p>
          <p style={{ fontSize: '13px', color: '#4a5678', margin: '0 0 16px 0' }}>
            or click to browse from your computer
          </p>
          <button
            style={{
              padding: '9px 24px',
              background: 'rgba(0,71,255,0.2)',
              border: '1px solid rgba(0,71,255,0.4)',
              borderRadius: '8px',
              color: '#4d8aff',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Click to Upload
          </button>
          <p style={{ fontSize: '12px', color: '#4a5678', marginTop: '12px' }}>
            Supported: PDF, DOCX, XLSX, JPG, PNG, MP4, AI, FIG — Max 100MB
          </p>
        </div>

        {/* Filter Tabs */}
        <div
          style={{
            display: 'flex',
            gap: '8px',
            marginBottom: '24px',
            background: '#040d1f',
            padding: '6px',
            borderRadius: '12px',
            width: 'fit-content',
            border: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              style={{
                padding: '7px 18px',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: activeFilter === f ? 600 : 400,
                background: activeFilter === f ? '#0047FF' : 'transparent',
                color: activeFilter === f ? '#fff' : '#6b7a9e',
                transition: 'all 0.2s ease',
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Empty state */}
        <div
          style={{
            textAlign: 'center',
            padding: '80px 20px',
            color: '#4a5678',
            background: '#040d1f',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '16px',
          }}
        >
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>📂</div>
          <p style={{ fontSize: '18px', fontWeight: 600, color: '#6b7a9e', margin: '0 0 8px 0' }}>
            No files shared yet
          </p>
          <p style={{ fontSize: '14px', margin: 0 }}>
            {activeFilter === 'All'
              ? 'Files from your agency will appear here.'
              : 'No files match the selected filter.'}
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}
