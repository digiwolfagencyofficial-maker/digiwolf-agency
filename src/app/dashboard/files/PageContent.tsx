'use client';

export const dynamic = 'force-dynamic';

import { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { useClientProfile } from '@/hooks/useClientProfile';

const clientNav = [
  { icon: '⬡', label: 'Overview', href: '/dashboard' },
  { icon: '📁', label: 'My Projects', href: '/dashboard/projects' },
  { icon: '🧾', label: 'Invoices', href: '/dashboard/invoices' },
  { icon: '📂', label: 'Files', href: '/dashboard/files' },
  { icon: '💬', label: 'Messages', href: '/dashboard/messages', badge: 3 },
  { icon: '⚙️', label: 'Settings', href: '/dashboard/settings' },
];

type FileType = 'pdf' | 'fig' | 'ai' | 'jpg' | 'xlsx' | 'docx' | 'mp4';

interface MockFile {
  name: string;
  size: string;
  date: string;
  type: FileType;
  category: 'Documents' | 'Images' | 'Videos';
}

const mockFiles: MockFile[] = [
  { name: 'brand-guidelines.pdf', size: '2.4 MB', date: '12 May 2024', type: 'pdf', category: 'Documents' },
  { name: 'homepage-mockup.fig', size: '8.1 MB', date: '8 May 2024', type: 'fig', category: 'Documents' },
  { name: 'logo-final.ai', size: '1.2 MB', date: '5 May 2024', type: 'ai', category: 'Images' },
  { name: 'contract-signed.pdf', size: '340 KB', date: '1 Apr 2024', type: 'pdf', category: 'Documents' },
  { name: 'hero-image.jpg', size: '1.8 MB', date: '28 Apr 2024', type: 'jpg', category: 'Images' },
  { name: 'invoice-template.xlsx', size: '89 KB', date: '20 Apr 2024', type: 'xlsx', category: 'Documents' },
  { name: 'project-brief.docx', size: '245 KB', date: '15 Apr 2024', type: 'docx', category: 'Documents' },
  { name: 'demo-video.mp4', size: '42 MB', date: '10 May 2024', type: 'mp4', category: 'Videos' },
];

const fileIcons: Record<FileType, { icon: string; bg: string; color: string }> = {
  pdf: { icon: '📄', bg: 'rgba(239,68,68,0.12)', color: '#ef4444' },
  fig: { icon: '🎨', bg: 'rgba(139,92,246,0.12)', color: '#8b5cf6' },
  ai: { icon: '✏️', bg: 'rgba(251,146,60,0.12)', color: '#fb923c' },
  jpg: { icon: '🖼️', bg: 'rgba(34,197,94,0.12)', color: '#22c55e' },
  xlsx: { icon: '📊', bg: 'rgba(34,197,94,0.12)', color: '#16a34a' },
  docx: { icon: '📝', bg: 'rgba(59,130,246,0.12)', color: '#3b82f6' },
  mp4: { icon: '🎬', bg: 'rgba(251,191,36,0.12)', color: '#fbbf24' },
};

const fileTypeBadge: Record<FileType, { bg: string; color: string }> = {
  pdf: { bg: 'rgba(239,68,68,0.12)', color: '#ef4444' },
  fig: { bg: 'rgba(139,92,246,0.12)', color: '#8b5cf6' },
  ai: { bg: 'rgba(251,146,60,0.12)', color: '#fb923c' },
  jpg: { bg: 'rgba(34,197,94,0.12)', color: '#22c55e' },
  xlsx: { bg: 'rgba(34,197,94,0.12)', color: '#16a34a' },
  docx: { bg: 'rgba(59,130,246,0.12)', color: '#3b82f6' },
  mp4: { bg: 'rgba(251,191,36,0.12)', color: '#fbbf24' },
};

const folderShortcuts = [
  { icon: '📂', label: 'All Files', count: 8 },
  { icon: '🤝', label: 'Shared with Me', count: 3 },
  { icon: '🕐', label: 'Recent', count: 5 },
];

export function FilesPageInner() {
  const { displayName, userInitial } = useClientProfile();
  const [activeFilter, setActiveFilter] = useState('All');
  const [activeFolder, setActiveFolder] = useState('All Files');
  const [isDragOver, setIsDragOver] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [hoveredDownload, setHoveredDownload] = useState<number | null>(null);
  const [hoveredFolder, setHoveredFolder] = useState<number | null>(null);

  const filters = ['All', 'Documents', 'Images', 'Videos'];

  const filtered =
    activeFilter === 'All'
      ? mockFiles
      : mockFiles.filter((f) => f.category === activeFilter);

  return (
    <DashboardLayout
      navItems={clientNav}
      role="client"
      userName={displayName}
      userInitial={userInitial}
    >
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

        {/* File Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '16px',
          }}
        >
          {filtered.map((file, i) => {
            const iconMeta = fileIcons[file.type];
            const badgeMeta = fileTypeBadge[file.type];
            const isHovered = hoveredCard === i;
            const isDownloadHovered = hoveredDownload === i;
            const ext = file.type.toUpperCase();

            return (
              <div
                key={file.name}
                onMouseEnter={() => setHoveredCard(i)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  background: '#040d1f',
                  border: `1px solid ${isHovered ? 'rgba(0,71,255,0.3)' : 'rgba(255,255,255,0.06)'}`,
                  borderRadius: '14px',
                  padding: '20px',
                  transition: 'all 0.25s ease',
                  transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
                  boxShadow: isHovered
                    ? '0 6px 24px rgba(0,71,255,0.1)'
                    : '0 2px 8px rgba(0,0,0,0.2)',
                }}
              >
                {/* File Icon + Badge */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '14px',
                  }}
                >
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '12px',
                      background: iconMeta.bg,
                      border: `1px solid ${iconMeta.color}25`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '22px',
                    }}
                  >
                    {iconMeta.icon}
                  </div>
                  <span
                    style={{
                      padding: '3px 9px',
                      borderRadius: '6px',
                      fontSize: '11px',
                      fontWeight: 700,
                      background: badgeMeta.bg,
                      color: badgeMeta.color,
                      fontFamily: 'monospace',
                      letterSpacing: '0.5px',
                    }}
                  >
                    {ext}
                  </span>
                </div>

                {/* File Name */}
                <p
                  style={{
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#f0f4ff',
                    margin: '0 0 6px 0',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                  title={file.name}
                >
                  {file.name}
                </p>

                {/* Size + Date */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '16px',
                  }}
                >
                  <span style={{ fontSize: '12px', color: '#4a5678' }}>
                    {file.size}
                  </span>
                  <span style={{ fontSize: '12px', color: '#4a5678' }}>
                    {file.date}
                  </span>
                </div>

                {/* Download Button */}
                <button
                  onMouseEnter={() => setHoveredDownload(i)}
                  onMouseLeave={() => setHoveredDownload(null)}
                  style={{
                    width: '100%',
                    padding: '8px',
                    background: isDownloadHovered
                      ? '#0047FF'
                      : 'rgba(0,71,255,0.1)',
                    border: `1px solid ${isDownloadHovered ? '#0047FF' : 'rgba(0,71,255,0.25)'}`,
                    borderRadius: '8px',
                    color: isDownloadHovered ? '#fff' : '#4d8aff',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                  }}
                >
                  <span>⬇</span> Download
                </button>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div
            style={{
              textAlign: 'center',
              padding: '80px 20px',
              color: '#4a5678',
            }}
          >
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>📂</div>
            <p style={{ fontSize: '18px', fontWeight: 600, color: '#6b7a9e' }}>
              No files found
            </p>
            <p style={{ fontSize: '14px' }}>
              No files match the selected filter.
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
