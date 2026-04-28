'use client'
import { useEffect, useRef } from 'react'

const HEAT_DATA = [
  { topic: 'Depreciation', pct: 63, level: 5 },
  { topic: 'Accruals & prepayments', pct: 47, level: 4 },
  { topic: 'Trial balance errors', pct: 41, level: 4 },
  { topic: 'Income statement', pct: 35, level: 3 },
  { topic: 'Cash flow statement', pct: 31, level: 3 },
  { topic: 'Double-entry rules', pct: 22, level: 2 },
  { topic: 'Ledger posting', pct: 18, level: 2 },
  { topic: 'Accounting equation', pct: 11, level: 1 },
]

const AT_RISK = [
  { id: 'STR-2023-0412', lastActive: '6 days ago', engagement: 18, topic: 'Depreciation', status: 'Critical' },
  { id: 'STR-2023-0887', lastActive: '4 days ago', engagement: 24, topic: 'Accruals', status: 'Critical' },
  { id: 'STR-2023-1104', lastActive: '3 days ago', engagement: 32, topic: 'Trial balance', status: 'At risk' },
  { id: 'STR-2023-0234', lastActive: '2 days ago', engagement: 37, topic: 'Cash flow', status: 'At risk' },
  { id: 'STR-2023-0558', lastActive: 'Yesterday',  engagement: 39, topic: 'Double-entry', status: 'At risk' },
]

const BRIEF = [
  { rank: 1, topic: 'Depreciation methods', desc: '63% confusion — straight-line vs reducing balance. 38 students asked similar variants this week.', time: '20 min' },
  { rank: 2, topic: 'Accruals & prepayments', desc: 'Timing confusion between recognition and cash. Top misconception: all expenses = cash outflow.', time: '15 min' },
  { rank: 3, topic: 'Trial balance errors', desc: 'Students struggling to locate omission errors. Worked example strongly recommended.', time: '10 min' },
  { rank: 4, topic: 'Open Q&A buffer', desc: 'Reserve for emerging questions from the first three segments.', time: '15 min' },
]

export default function LecturerDashboard() {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<any>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    import('chart.js/auto').then(({ default: Chart }) => {
      if (!chartRef.current) return
      if (chartInstance.current) chartInstance.current.destroy()
      chartInstance.current = new Chart(chartRef.current, {
        type: 'line',
        data: {
          labels: ['Wk 1','Wk 2','Wk 3','Wk 4','Wk 5','Wk 6','Wk 7','Wk 8'],
          datasets: [{
            label: 'Comprehension %',
            data: [55, 58, 61, 67, 72, 68, 65, 64],
            borderColor: '#0F7B69',
            backgroundColor: 'rgba(15,123,105,0.08)',
            borderWidth: 2.5,
            pointBackgroundColor: '#0F7B69',
            pointRadius: 5,
            pointHoverRadius: 7,
            tension: 0.4,
            fill: true,
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              backgroundColor: '#0D1B2A',
              titleColor: '#fff',
              bodyColor: '#94A3B8',
              padding: 10,
              callbacks: { label: (ctx: any) => ` ${ctx.parsed.y}% comprehension` },
            },
          },
          scales: {
            x: {
              ticks: { color: '#94A3B8', font: { size: 11, family: 'DM Sans' } },
              grid: { color: 'rgba(0,0,0,0.05)' },
            },
            y: {
              min: 40, max: 85,
              ticks: { color: '#94A3B8', font: { size: 11, family: 'DM Sans' }, callback: (v: any) => v + '%' },
              grid: { color: 'rgba(0,0,0,0.05)' },
            },
          },
        },
      })
    })
    return () => { if (chartInstance.current) chartInstance.current.destroy() }
  }, [])

  const heatClass: Record<number, string> = { 5: 'heat-5', 4: 'heat-4', 3: 'heat-3', 2: 'heat-2', 1: 'heat-1' }

  return (
    <div className="overflow-y-auto h-full p-6" style={{ background: '#F8FAFC' }}>
      <div className="max-w-7xl mx-auto flex flex-col gap-5">

        {/* Header row */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold" style={{ color: '#0F172A' }}>
              Lecturer Dashboard
            </h1>
            <p className="text-sm mt-0.5" style={{ color: '#64748B' }}>
              Financial Accounting SBS 201 · Prof. Mwangi · Week 8 of 14
            </p>
          </div>
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium"
            style={{ background: '#fff', border: '1px solid #E2E8F0', color: '#64748B' }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#F59E0B' }} />
            Last updated: today 07:45 AM
          </div>
        </div>

        {/* Metric cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Active students', value: '214', sub: 'of 247 enrolled', delta: '↑ 18 this week', up: true },
            { label: 'Avg comprehension', value: '64%', sub: 'Across all topics', delta: '↓ 3% from last week', up: false },
            { label: 'At-risk students', value: '12', sub: '< 40% engagement', delta: '↑ 4 flagged this week', up: false, alert: true },
            { label: 'Top confusion topic', value: 'Depreciation', sub: '63% confusion rate', delta: '⚠ Needs tutorial focus', up: false, warn: true },
          ].map(m => (
            <div
              key={m.label}
              className="rounded-xl p-5"
              style={{ background: '#fff', border: '1px solid #E2E8F0' }}
            >
              <p className="text-xs font-medium uppercase tracking-wider mb-2" style={{ color: '#94A3B8' }}>
                {m.label}
              </p>
              <p
                className="font-semibold leading-none mb-1"
                style={{
                  fontSize: m.value.length > 6 ? '16px' : '26px',
                  color: m.alert ? '#EF4444' : '#0F172A',
                }}
              >
                {m.value}
              </p>
              <p className="text-xs" style={{ color: '#94A3B8' }}>{m.sub}</p>
              <p
                className="text-xs font-medium mt-2"
                style={{ color: m.up ? '#16A34A' : m.warn ? '#F59E0B' : m.alert ? '#EF4444' : '#EF4444' }}
              >
                {m.delta}
              </p>
            </div>
          ))}
        </div>

        {/* Heatmap + Session Brief */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
          {/* Heatmap */}
          <div className="lg:col-span-3 rounded-xl p-5" style={{ background: '#fff', border: '1px solid #E2E8F0' }}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-sm font-semibold" style={{ color: '#0F172A' }}>Topic comprehension map</h2>
                <p className="text-xs mt-0.5" style={{ color: '#64748B' }}>Week 8 — 214 student interactions analysed</p>
              </div>
              <span
                className="text-xs font-semibold px-2.5 py-1 rounded-md"
                style={{ background: '#FEF3C7', color: '#92400E' }}
              >
                ⚠ 3 topics need attention
              </span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {HEAT_DATA.map(h => (
                <div
                  key={h.topic}
                  className={`p-3 rounded-lg cursor-pointer transition-transform hover:scale-105 ${heatClass[h.level]}`}
                >
                  <div className="text-xs font-medium mb-1 leading-tight">{h.topic}</div>
                  <div className="text-xl font-bold">{h.pct}%</div>
                  <div className="text-xs opacity-70">confusion</div>
                </div>
              ))}
            </div>
            <div className="flex gap-4 mt-4 text-xs" style={{ color: '#94A3B8' }}>
              {[['#FEE2E2','High confusion'],['#FEF3C7','Moderate'],['#D1FAE5','Low']].map(([bg, label]) => (
                <span key={label} className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm inline-block" style={{ background: bg }} />
                  {label}
                </span>
              ))}
            </div>
          </div>

          {/* Session Brief */}
          <div className="lg:col-span-2 rounded-xl p-5" style={{ background: '#fff', border: '1px solid #E2E8F0' }}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-sm font-semibold" style={{ color: '#0F172A' }}>Tutorial session brief</h2>
                <p className="text-xs mt-0.5" style={{ color: '#64748B' }}>Auto-generated · Thu 9 May · Tutorial 08</p>
              </div>
              <span
                className="text-xs font-semibold px-2.5 py-1 rounded-md"
                style={{ background: '#E6F5F2', color: '#0F7B69' }}
              >
                AI-generated
              </span>
            </div>
            <div className="flex flex-col gap-0">
              {BRIEF.map((b, i) => (
                <div
                  key={b.rank}
                  className="flex gap-3 py-3"
                  style={{ borderTop: i > 0 ? '1px solid #F1F5F9' : 'none' }}
                >
                  <span className="text-xs font-bold w-5 flex-shrink-0 mt-0.5" style={{ color: '#CBD5E1' }}>
                    #{b.rank}
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-medium" style={{ color: '#0F172A' }}>{b.topic}</p>
                    <p className="text-xs mt-0.5 leading-relaxed" style={{ color: '#64748B' }}>{b.desc}</p>
                  </div>
                  <span
                    className="text-xs font-semibold px-2 py-0.5 rounded-md flex-shrink-0 h-fit mt-0.5"
                    style={{ background: '#E6F5F2', color: '#0F7B69' }}
                  >
                    {b.time}
                  </span>
                </div>
              ))}
            </div>
            <div
              className="mt-3 p-3 rounded-lg text-xs"
              style={{ background: '#E6F5F2', color: '#0F7B69' }}
            >
              ✦ Total: 60 min · Time allocation based on interaction data
            </div>
          </div>
        </div>

        {/* At-risk + Trend chart */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
          {/* At-risk table */}
          <div className="lg:col-span-3 rounded-xl p-5" style={{ background: '#fff', border: '1px solid #E2E8F0' }}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-sm font-semibold" style={{ color: '#0F172A' }}>At-risk student flags</h2>
                <p className="text-xs mt-0.5" style={{ color: '#64748B' }}>Below engagement threshold — Week 8. All data anonymised.</p>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-md" style={{ background: '#FEE2E2', color: '#EF4444' }}>
                12 students
              </span>
            </div>
            <table className="w-full text-xs">
              <thead>
                <tr>
                  {['Student ID','Last active','Engagement','Weak topic','Status'].map(h => (
                    <th
                      key={h}
                      className="text-left pb-2.5 font-semibold uppercase tracking-wide"
                      style={{ color: '#94A3B8', letterSpacing: '0.5px', fontSize: '10px' }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {AT_RISK.map((s, i) => (
                  <tr
                    key={s.id}
                    style={{ borderTop: '1px solid #F8FAFC' }}
                    onMouseEnter={e => (e.currentTarget.style.background = '#F8FAFC')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                  >
                    <td className="py-2.5 font-mono" style={{ color: '#64748B', fontSize: '11px' }}>{s.id}</td>
                    <td className="py-2.5" style={{ color: '#475569' }}>{s.lastActive}</td>
                    <td className="py-2.5">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 rounded-full" style={{ background: '#F1F5F9' }}>
                          <div
                            className="h-1.5 rounded-full"
                            style={{
                              width: `${s.engagement}%`,
                              background: s.engagement < 30 ? '#EF4444' : '#F59E0B',
                            }}
                          />
                        </div>
                        <span style={{ color: '#475569' }}>{s.engagement}%</span>
                      </div>
                    </td>
                    <td className="py-2.5" style={{ color: '#475569' }}>{s.topic}</td>
                    <td className="py-2.5">
                      <span
                        className="px-2 py-0.5 rounded-md font-semibold"
                        style={{
                          background: s.status === 'Critical' ? '#FEE2E2' : '#FEF3C7',
                          color: s.status === 'Critical' ? '#EF4444' : '#92400E',
                          fontSize: '10px',
                        }}
                      >
                        {s.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="text-xs mt-3" style={{ color: '#94A3B8' }}>+ 7 more students · GDPR-compliant anonymisation applied</p>
          </div>

          {/* Trend chart */}
          <div className="lg:col-span-2 rounded-xl p-5" style={{ background: '#fff', border: '1px solid #E2E8F0' }}>
            <div className="mb-4">
              <h2 className="text-sm font-semibold" style={{ color: '#0F172A' }}>Weekly comprehension trend</h2>
              <p className="text-xs mt-0.5" style={{ color: '#64748B' }}>SBS 201 · Weeks 1–8</p>
            </div>
            <div style={{ position: 'relative', height: '180px' }}>
              <canvas
                ref={chartRef}
                role="img"
                aria-label="Line chart: comprehension rises from 55% in week 1 to 72% in week 5, then dips to 64% in week 8"
              />
            </div>
            <div
              className="mt-4 p-3 rounded-lg text-xs leading-relaxed"
              style={{ background: '#FEF3C7', color: '#92400E' }}
            >
              ⚠ Dip in Weeks 6–8 correlates with introduction of depreciation unit. Consider additional worked examples in Tutorial 09.
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
