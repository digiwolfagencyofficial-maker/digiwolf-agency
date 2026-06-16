'use client';

export const dynamic = 'force-dynamic';

import { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { useClientProjects } from '@/hooks/useClientProjects';
import {
  formatProjectStatus,
  formatProjectTimestamp,
  getStatusStyle,
} from '@/lib/project-display';

const clientNav = [
  { icon: '⬡', label: 'Overview', href: '/dashboard' },
  { icon: '📁', label: 'My Projects', href: '/dashboard/projects' },
  { icon: '🧾', label: 'Invoices', href: '/dashboard/invoices' },
  { icon: '📂', label: 'Files', href: '/dashboard/files' },
  { icon: '💬', label: 'Messages', href: '/dashboard/messages', badge: 3 },
  { icon: '⚙️', label: 'Settings', href: '/dashboard/settings' },
];

export function ProjectsPageInner() {
  const { projects, loading, error, displayName, userInitial } = useClientProjects();
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <DashboardLayout
      navItems={clientNav}
      role="client"
      userName={displayName}
      userInitial={userInitial}
    >
      <div style={{ padding: '32px', maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <h1
            style={{
              fontSize: '28px',
              fontWeight: 700,
              color: '#f0f4ff',
              margin: 0,
              letterSpacing: '-0.5px',
            }}
          >
            My Projects
          </h1>
          <p style={{ color: '#6b7a9e', marginTop: '6px', fontSize: '15px' }}>
            All your projects with us and their current status.
          </p>
        </div>

        {loading && (
          <div style={{ textAlign: 'center', padding: '80px 20px', color: '#6b7a9e', fontSize: '15px' }}>
            Loading projects…
          </div>
        )}

        {!loading && error && (
          <div style={{ textAlign: 'center', padding: '80px 20px', color: '#f87171', fontSize: '15px' }}>
            {error}
          </div>
        )}

        {!loading && !error && projects.length > 0 && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '20px',
          }}
        >
          {projects.map((project) => {
            const statusStyle = getStatusStyle(project.project_status);
            const isHovered = hoveredCard === project.id;

            return (
              <div
                key={project.id}
                onMouseEnter={() => setHoveredCard(project.id)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  background: '#040d1f',
                  border: `1px solid ${isHovered ? 'rgba(0,71,255,0.4)' : 'rgba(255,255,255,0.06)'}`,
                  borderRadius: '16px',
                  padding: '24px',
                  transition: 'all 0.25s ease',
                  boxShadow: isHovered
                    ? '0 8px 32px rgba(0,71,255,0.12)'
                    : '0 2px 8px rgba(0,0,0,0.3)',
                  transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
                }}
              >
                {/* Card Header */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '16px',
                  }}
                >
                  <div>
                    <h3
                      style={{
                        fontSize: '17px',
                        fontWeight: 700,
                        color: '#f0f4ff',
                        margin: '0 0 4px 0',
                      }}
                    >
                      {project.name}
                    </h3>
                    <p style={{ fontSize: '12px', color: '#4a5678', margin: 0, fontFamily: 'monospace' }}>
                      #{project.id.slice(0, 8).toUpperCase()}
                    </p>
                  </div>
                  <span
                    style={{
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: 600,
                      background: statusStyle.bg,
                      color: statusStyle.color,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {formatProjectStatus(project.project_status)}
                  </span>
                </div>

                {/* Created */}
                <div
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    borderRadius: '10px',
                    padding: '10px 12px',
                  }}
                >
                  <p
                    style={{
                      fontSize: '11px',
                      color: '#4a5678',
                      margin: '0 0 3px 0',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                    }}
                  >
                    Created
                  </p>
                  <p
                    style={{
                      fontSize: '14px',
                      color: '#c8d4f0',
                      margin: 0,
                      fontWeight: 500,
                    }}
                  >
                    {formatProjectTimestamp(project.created_at)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        )}

        {/* Empty State */}
        {!loading && !error && projects.length === 0 && (
          <div
            style={{
              textAlign: 'center',
              padding: '80px 20px',
              color: '#4a5678',
            }}
          >
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>📁</div>
            <p style={{ fontSize: '18px', fontWeight: 600, color: '#6b7a9e' }}>
              No projects found
            </p>
            <p style={{ fontSize: '14px' }}>
              Your agency will add projects here as work begins.
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
