'use client'
import type { Tab } from '../page'

const tabs: { id: Tab; label: string; desc: string }[] = [
  { id: 'companion',  label: 'Study Companion',      desc: 'AI-powered learning bot' },
  { id: 'lecturer',   label: 'Lecturer Dashboard',   desc: 'Comprehension analytics' },
  { id: 'governance', label: 'Governance Dashboard', desc: 'CUE compliance' },
]

export default function NavTabs({
  activeTab,
  setActiveTab,
}: {
  activeTab: Tab
  setActiveTab: (t: Tab) => void
}) {
  return (
    <nav
      className="flex items-center gap-0 px-7 flex-shrink-0"
      style={{ background: '#fff', borderBottom: '1px solid #E2E8F0' }}
    >
      {tabs.map((t) => (
        <button
          key={t.id}
          onClick={() => setActiveTab(t.id)}
          className="flex items-center gap-2 px-5 py-3.5 text-sm font-medium transition-all border-b-2 -mb-px"
          style={{
            color: activeTab === t.id ? '#0F7B69' : '#64748B',
            borderBottomColor: activeTab === t.id ? '#0F7B69' : 'transparent',
            background: 'none',
            cursor: 'pointer',
            border: 'none',
            borderBottom: `2px solid ${activeTab === t.id ? '#0F7B69' : 'transparent'}`,
            outline: 'none',
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{
              background: activeTab === t.id ? '#0F7B69' : '#CBD5E1',
              opacity: activeTab === t.id ? 1 : 0.6,
            }}
          />
          {t.label}
        </button>
      ))}
      <div className="ml-auto hidden md:flex items-center gap-1.5 text-xs" style={{ color: '#94A3B8' }}>
        <span
          className="w-1.5 h-1.5 rounded-full animate-pulse-dot"
          style={{ background: '#0F7B69' }}
        />
        Powered by Anthropic Claude
      </div>
    </nav>
  )
}
