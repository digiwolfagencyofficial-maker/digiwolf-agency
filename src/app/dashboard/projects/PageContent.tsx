'use client';

export const dynamic = 'force-dynamic';

import { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

const clientNav = [
  { icon: '⬡', label: 'Overview', href: '/dashboard' },
  { icon: '📁', label: 'My Projects', href: '/dashboard/projects' },
  { icon: '🧾', label: 'Invoices', href: '/dashboard/invoices' },
  { icon: '📂', label: 'Files', href: '/dashboard/files' },
  { icon: '💬', label: 'Messages', href: '/dashboard/messages', badge: 3 },
  { icon: '⚙️', label: 'Settings', href: '/dashboard/settings' },
];

const projects = [
  {
    name: 'E-shop Redesign',
    client: 'TechCorp s.r.o.',
    status: 'In Progress',
    progress: 65,
    start: '1 Apr',
    deadline: '30 Jun',
    budget: '45,000 CZK',
    team: ['T', 'J', 'M'],
  },
  {
    name: 'SEO Strategy',
    client: 'RetailPro',
    status: 'Review',
    progress: 88,
    start: '15 Mar',
    deadline: '15 May',
    budget: '12,000 CZK',
    team: ['J'],
  },
  {
    name: 'Brand Identity',
    client: 'StartUp Czech',
    status: 'Completed',
    progress: 100,
    start: '1 Jan',
    deadline: '28 Feb',
    budget: '28,000 CZK',
    team: ['M', 'K'],
  },
  {
    name: 'AI Automation Setup',
    client: 'Novak Group',
    status: 'In Progress',
    progress: 30,
    start: '1 May',
    deadline: '31 Jul',
    budget: '65,000 CZK',
    team: ['T', 'J'],
  },
];

const statusColors: Record<string, { bg: string; color: string }> = {
  'In Progress': { bg: 'rgba(0,71,255,0.15)', color: '#4d8aff' },
  Review: { bg: 'rgba(251,191,36,0.15)', color: '#fbbf24' },
  Completed: { bg: 'rgba(34,197,94,0.15)', color: '#22c55e' },
};

const progressColors: Record<string, string> = {
  'In Progress': '#0047FF',
  Review: '#fbbf24',
  Completed: '#22c55e',
};

const avatarColors = ['#0047FF', '#7c3aed', '#0891b2', '#b45309', '#be123c'];

export function ProjectsPageInner() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [hoveredBtn, setHoveredBtn] = useState<number | null>(null);

  const filters = ['All', 'In Progress', 'Review', 'Completed'];

  const filtered =
    activeFilter === 'All'
      ? projects
      : projects.filter((p) => p.status === activeFilter);

  return (
    <DashboardLayout
      nav={clientNav}
      role="client"
      userName="Martin Novák"
      userInitial="M"
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
            Track progress, deadlines, and budgets for all your active projects.
          </p>
        </div>

        {/* Filter Tabs */}
        <div
          style={{
            display: 'flex',
            gap: '8px',
            marginBottom: '28px',
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
                padding: '8px 20px',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: activeFilter === f ? 600 : 400,
                background:
                  activeFilter === f ? '#0047FF' : 'transparent',
                color: activeFilter === f ? '#fff' : '#6b7a9e',
                transition: 'all 0.2s ease',
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '20px',
          }}
        >
          {filtered.map((project, i) => {
            const statusStyle = statusColors[project.status];
            const progressColor = progressColors[project.status];
            const isHovered = hoveredCard === i;
            const isBtnHovered = hoveredBtn === i;

            return (
              <div
                key={project.name}
                onMouseEnter={() => setHoveredCard(i)}
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
                    <p style={{ color: '#6b7a9e', fontSize: '13px', margin: 0 }}>
                      {project.client}
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
                    {project.status}
                  </span>
                </div>

                {/* Progress Bar */}
                <div style={{ marginBottom: '20px' }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '8px',
                    }}
                  >
                    <span style={{ fontSize: '13px', color: '#6b7a9e' }}>
                      Progress
                    </span>
                    <span
                      style={{
                        fontSize: '13px',
                        fontWeight: 700,
                        color: progressColor,
                      }}
                    >
                      {project.progress}%
                    </span>
                  </div>
                  <div
                    style={{
                      height: '6px',
                      background: 'rgba(255,255,255,0.07)',
                      borderRadius: '999px',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        height: '100%',
                        width: `${project.progress}%`,
                        background: progressColor,
                        borderRadius: '999px',
                        transition: 'width 0.6s ease',
                        boxShadow:
                          project.progress === 100
                            ? '0 0 8px rgba(34,197,94,0.5)'
                            : `0 0 8px ${progressColor}60`,
                      }}
                    />
                  </div>
                </div>

                {/* Meta Info */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '12px',
                    marginBottom: '20px',
                  }}
                >
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
                      Start Date
                    </p>
                    <p
                      style={{
                        fontSize: '14px',
                        color: '#c8d4f0',
                        margin: 0,
                        fontWeight: 500,
                      }}
                    >
                      {project.start}
                    </p>
                  </div>
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
                      Deadline
                    </p>
                    <p
                      style={{
                        fontSize: '14px',
                        color: '#c8d4f0',
                        margin: 0,
                        fontWeight: 500,
                      }}
                    >
                      {project.deadline}
                    </p>
                  </div>
                </div>

                {/* Budget */}
                <div
                  style={{
                    background: 'rgba(0,71,255,0.08)',
                    border: '1px solid rgba(0,71,255,0.15)',
                    borderRadius: '10px',
                    padding: '10px 14px',
                    marginBottom: '20px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <span style={{ fontSize: '13px', color: '#6b7a9e' }}>
                    Budget
                  </span>
                  <span
                    style={{
                      fontSize: '15px',
                      fontWeight: 700,
                      color: '#f0f4ff',
                    }}
                  >
                    {project.budget}
                  </span>
                </div>

                {/* Footer: Team + Button */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div style={{ display: 'flex', gap: '-4px' }}>
                    {project.team.map((initial, idx) => (
                      <div
                        key={idx}
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          background: avatarColors[idx % avatarColors.length],
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '13px',
                          fontWeight: 700,
                          color: '#fff',
                          border: '2px solid #040d1f',
                          marginLeft: idx === 0 ? 0 : '-8px',
                          position: 'relative',
                          zIndex: project.team.length - idx,
                        }}
                      >
                        {initial}
                      </div>
                    ))}
                    <span
                      style={{
                        fontSize: '12px',
                        color: '#4a5678',
                        marginLeft: '10px',
                        alignSelf: 'center',
                      }}
                    >
                      {project.team.length} member{project.team.length > 1 ? 's' : ''}
                    </span>
                  </div>
                  <button
                    onMouseEnter={() => setHoveredBtn(i)}
                    onMouseLeave={() => setHoveredBtn(null)}
                    style={{
                      padding: '8px 18px',
                      background: isBtnHovered ? '#1a5fff' : 'rgba(0,71,255,0.15)',
                      border: '1px solid rgba(0,71,255,0.4)',
                      borderRadius: '8px',
                      color: isBtnHovered ? '#fff' : '#4d8aff',
                      fontSize: '13px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    View Details
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filtered.length === 0 && (
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
              No projects match the selected filter.
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
