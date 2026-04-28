'use client'
import { useState, useEffect, useRef } from 'react'

const PROGRAMMES = {
  bcom: {
    name: 'Bachelor of Commerce (BCom)',
    school: 'Strathmore Business School',
    score: 78,
    compliance: [
      { title: 'Instructional hours', value: '1,820 hrs', standard: 'CUE minimum: 1,680 hrs (Business/Arts)', verdict: 'pass' as const },
      { title: 'Staff:student ratio', value: '1 : 28', standard: 'CUE recommended: ≤ 1:20 (Business)', verdict: 'warn' as const },
      { title: 'Credit load', value: '480 credits', standard: 'CUE standard: 480–540 credits (4-yr degree)', verdict: 'pass' as const },
      { title: 'Core unit coverage', value: '94%', standard: 'CUE minimum: 80% core units mapped', verdict: 'pass' as const },
      { title: 'KNQF L7 mapping', value: '61%', standard: 'Required: ≥ 80% outcomes mapped to KNQF L7', verdict: 'fail' as const },
      { title: 'Assessment spread', value: '72 / 28', standard: 'CUE: ≥ 60% continuous, ≤ 40% exam-only', verdict: 'pass' as const },
    ],
    knqf: { mapped: 61, partial: 18, unmapped: 21 },
    knqfBreakdown: [
      { label: 'Knowledge & understanding', pct: 82, status: 'pass' },
      { label: 'Applied skills', pct: 65, status: 'warn' },
      { label: 'Communication & literacy', pct: 58, status: 'warn' },
      { label: 'Critical thinking & analysis', pct: 40, status: 'fail' },
    ],
    checklist: [
      { ok: 'pass', text: 'Programme specification document — uploaded and current (v4.2, Jan 2026)' },
      { ok: 'pass', text: 'Instructional hours log — 1,820 hrs verified above CUE minimum' },
      { ok: 'pass', text: 'Assessment policy — 72/28 continuous/exam split, within CUE parameters' },
      { ok: 'pass', text: 'Academic staff qualifications — 91% hold postgraduate qualifications' },
      { ok: 'pass', text: 'Student feedback mechanism — SETs conducted Sem 1 & 2, archived' },
      { ok: 'fail', text: 'KNQF outcome mapping — 39% of outcomes unmapped. Required for Level 7 certification.' },
      { ok: 'warn', text: 'Staff:student ratio — currently 1:28, above CUE recommended 1:20. Mitigation plan needed.' },
      { ok: 'warn', text: 'Work-integrated learning — internship credit documentation incomplete for 22% of final-year students.' },
    ],
  },
  bsc: {
    name: 'BSc Computer Science',
    school: 'School of Computing & Engineering Sciences',
    score: 85,
    compliance: [
      { title: 'Instructional hours', value: '2,310 hrs', standard: 'CUE minimum: 2,240 hrs (Applied Sciences)', verdict: 'pass' as const },
      { title: 'Staff:student ratio', value: '1 : 18', standard: 'CUE recommended: ≤ 1:20 (Sciences)', verdict: 'pass' as const },
      { title: 'Credit load', value: '520 credits', standard: 'CUE standard: 480–540 credits (4-yr degree)', verdict: 'pass' as const },
      { title: 'Core unit coverage', value: '97%', standard: 'CUE minimum: 80% core units mapped', verdict: 'pass' as const },
      { title: 'KNQF L7 mapping', value: '74%', standard: 'Required: ≥ 80% outcomes mapped to KNQF L7', verdict: 'warn' as const },
      { title: 'Assessment spread', value: '68 / 32', standard: 'CUE: ≥ 60% continuous, ≤ 40% exam-only', verdict: 'pass' as const },
    ],
    knqf: { mapped: 74, partial: 14, unmapped: 12 },
    knqfBreakdown: [
      { label: 'Knowledge & understanding', pct: 90, status: 'pass' },
      { label: 'Applied skills', pct: 82, status: 'pass' },
      { label: 'Communication & literacy', pct: 68, status: 'warn' },
      { label: 'Critical thinking & analysis', pct: 65, status: 'warn' },
    ],
    checklist: [
      { ok: 'pass', text: 'Programme specification document — uploaded and current (v6.1, Feb 2026)' },
      { ok: 'pass', text: 'Instructional hours log — 2,310 hrs exceeds CUE minimum of 2,240 hrs' },
      { ok: 'pass', text: 'Assessment policy — project-based components properly documented' },
      { ok: 'pass', text: 'Academic staff qualifications — 96% hold postgraduate qualifications' },
      { ok: 'pass', text: 'Student feedback mechanism — SET completion rate 88%' },
      { ok: 'pass', text: 'Industry attachment — 94% of Year 3 students completed industrial attachment' },
      { ok: 'warn', text: 'KNQF outcome mapping — 26% of outcomes partially mapped. Complete by June 2026.' },
      { ok: 'warn', text: 'Accreditation renewal — IEET accreditation due for renewal Aug 2026. Documentation in progress.' },
    ],
  },
  llb: {
    name: 'LLB (Bachelor of Laws)',
    school: 'Strathmore Law School',
    score: 69,
    compliance: [
      { title: 'Instructional hours', value: '1,560 hrs', standard: 'CUE minimum: 1,680 hrs (Arts/Humanities)', verdict: 'fail' as const },
      { title: 'Staff:student ratio', value: '1 : 31', standard: 'CUE recommended: ≤ 1:20 (Humanities)', verdict: 'fail' as const },
      { title: 'Credit load', value: '470 credits', standard: 'CUE standard: 480–540 credits (4-yr degree)', verdict: 'warn' as const },
      { title: 'Core unit coverage', value: '88%', standard: 'CUE minimum: 80% core units mapped', verdict: 'pass' as const },
      { title: 'KNQF L7 mapping', value: '52%', standard: 'Required: ≥ 80% outcomes mapped to KNQF L7', verdict: 'fail' as const },
      { title: 'Assessment spread', value: '60 / 40', standard: 'CUE: ≥ 60% continuous, ≤ 40% exam-only', verdict: 'pass' as const },
    ],
    knqf: { mapped: 52, partial: 22, unmapped: 26 },
    knqfBreakdown: [
      { label: 'Knowledge & understanding', pct: 72, status: 'warn' },
      { label: 'Applied skills', pct: 55, status: 'warn' },
      { label: 'Communication & literacy', pct: 61, status: 'warn' },
      { label: 'Critical thinking & analysis', pct: 38, status: 'fail' },
    ],
    checklist: [
      { ok: 'pass', text: 'Programme specification document — current (v3.0, Nov 2025)' },
      { ok: 'fail', text: 'Instructional hours — 1,560 hrs falls below CUE minimum of 1,680 hrs. Remediation required.' },
      { ok: 'warn', text: 'Credit load — 470 credits is below the 480 minimum. Review unit credit allocation.' },
      { ok: 'pass', text: 'Assessment policy — moot court and clinical programme adequately documented' },
      { ok: 'fail', text: 'Staff:student ratio — 1:31 significantly above recommended 1:20. Priority hire needed.' },
      { ok: 'fail', text: 'KNQF outcome mapping — 48% of outcomes unmapped. Immediate action required before CUE review.' },
      { ok: 'warn', text: 'Student feedback mechanism — SET completion rate 62%, below university target of 75%.' },
      { ok: 'warn', text: 'Clinical legal education — student supervision log incomplete for 35% of placements.' },
    ],
  },
}

type ProgrammeKey = keyof typeof PROGRAMMES
type Verdict = 'pass' | 'warn' | 'fail'

const verdictConfig: Record<Verdict, { bar: string; text: string; bg: string; label: string }> = {
  pass: { bar: '#16A34A', text: '#16A34A', bg: '#DCFCE7', label: '✓ Compliant' },
  warn: { bar: '#F59E0B', text: '#92400E', bg: '#FEF3C7', label: '⚠ Action needed' },
  fail: { bar: '#EF4444', text: '#EF4444', bg: '#FEE2E2', label: '✗ Non-compliant' },
}

const checkConfig: Record<string, { icon: string; iconBg: string; iconColor: string }> = {
  pass: { icon: '✓', iconBg: '#DCFCE7', iconColor: '#16A34A' },
  warn: { icon: '!', iconBg: '#FEF3C7', iconColor: '#92400E' },
  fail: { icon: '✗', iconBg: '#FEE2E2', iconColor: '#EF4444' },
}

export default function GovernanceDashboard() {
  const [prog, setProg] = useState<ProgrammeKey>('bcom')
  const data = PROGRAMMES[prog]
  const gaugeRef = useRef<HTMLCanvasElement>(null)
  const gaugeInstance = useRef<any>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    import('chart.js/auto').then(({ default: Chart }) => {
      if (!gaugeRef.current) return
      if (gaugeInstance.current) gaugeInstance.current.destroy()
      const score = data.score
      const color = score >= 80 ? '#16A34A' : score >= 70 ? '#F59E0B' : '#EF4444'
      gaugeInstance.current = new Chart(gaugeRef.current, {
        type: 'doughnut',
        data: {
          datasets: [{
            data: [score, 100 - score],
            backgroundColor: [color, '#F1F5F9'],
            borderWidth: 0,
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          cutout: '72%',
          plugins: { legend: { display: false }, tooltip: { enabled: false } },
          animation: { duration: 600 },
        },
      })
    })
    return () => { if (gaugeInstance.current) gaugeInstance.current.destroy() }
  }, [prog, data.score])

  const scoreColor = data.score >= 80 ? '#16A34A' : data.score >= 70 ? '#F59E0B' : '#EF4444'
  const passCount = data.checklist.filter(c => c.ok === 'pass').length

  return (
    <div className="overflow-y-auto h-full p-6" style={{ background: '#F8FAFC' }}>
      <div className="max-w-7xl mx-auto flex flex-col gap-5">

        {/* Programme selector + score */}
        <div className="rounded-xl p-5" style={{ background: '#fff', border: '1px solid #E2E8F0' }}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-lg font-semibold" style={{ color: '#0F172A' }}>
                CUE Compliance Health Check
              </h1>
              <p className="text-sm mt-0.5" style={{ color: '#64748B' }}>{data.school} · 2025/26 cohort</p>
            </div>
            <div className="flex items-center gap-4 flex-wrap">
              <select
                value={prog}
                onChange={e => setProg(e.target.value as ProgrammeKey)}
                className="text-sm px-3 py-2 rounded-lg outline-none"
                style={{
                  border: '1px solid #E2E8F0',
                  color: '#0F172A',
                  background: '#F8FAFC',
                  fontFamily: 'DM Sans, sans-serif',
                  cursor: 'pointer',
                }}
              >
                <option value="bcom">BCom — Strathmore Business School</option>
                <option value="bsc">BSc Computer Science — SCES</option>
                <option value="llb">LLB Law — Strathmore Law School</option>
              </select>
              <div className="flex items-center gap-3">
                <div className="text-center">
                  <div className="text-3xl font-bold leading-none" style={{ color: scoreColor }}>
                    {data.score}
                  </div>
                  <div className="text-xs font-semibold uppercase tracking-wider mt-1" style={{ color: '#94A3B8' }}>
                    Compliance score
                  </div>
                </div>
                <div style={{ width: '64px', height: '64px' }}>
                  <canvas
                    ref={gaugeRef}
                    role="img"
                    aria-label={`Compliance gauge: ${data.score}%`}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Compliance cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {data.compliance.map(c => {
            const cfg = verdictConfig[c.verdict]
            return (
              <div
                key={c.title}
                className="rounded-xl p-4 relative overflow-hidden"
                style={{ background: '#fff', border: '1px solid #E2E8F0' }}
              >
                <div
                  className="absolute top-0 left-0 right-0 h-1 rounded-t-xl"
                  style={{ background: cfg.bar }}
                />
                <div className="mt-2">
                  <p className="text-xs font-medium" style={{ color: '#64748B' }}>{c.title}</p>
                  <p className="text-xl font-bold mt-1 leading-tight" style={{ color: '#0F172A' }}>{c.value}</p>
                  <p className="text-xs mt-1 leading-relaxed" style={{ color: '#94A3B8' }}>{c.standard}</p>
                  <span
                    className="inline-block mt-2 text-xs font-semibold px-2 py-0.5 rounded-md"
                    style={{ background: cfg.bg, color: cfg.text }}
                  >
                    {cfg.label}
                  </span>
                </div>
              </div>
            )
          })}
        </div>

        {/* KNQF + Checklist */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

          {/* KNQF Mapping */}
          <div className="rounded-xl p-5" style={{ background: '#fff', border: '1px solid #E2E8F0' }}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-sm font-semibold" style={{ color: '#0F172A' }}>KNQF competency mapping</h2>
                <p className="text-xs mt-0.5" style={{ color: '#64748B' }}>Learning outcomes mapped to KNQF Level 7 (Bachelor's)</p>
              </div>
              <span
                className="text-xs font-semibold px-2.5 py-1 rounded-md"
                style={{
                  background: data.knqf.mapped >= 80 ? '#DCFCE7' : data.knqf.mapped >= 65 ? '#FEF3C7' : '#FEE2E2',
                  color: data.knqf.mapped >= 80 ? '#16A34A' : data.knqf.mapped >= 65 ? '#92400E' : '#EF4444',
                }}
              >
                {data.knqf.mapped >= 80 ? 'On track' : data.knqf.mapped >= 65 ? 'Near threshold' : 'Action required'}
              </span>
            </div>

            {/* Stacked bar */}
            <div className="mb-1 text-xs font-medium flex justify-between" style={{ color: '#64748B' }}>
              <span>Outcome mapping overview</span>
            </div>
            <div className="flex h-7 rounded-lg overflow-hidden mb-3">
              <div
                className="flex items-center justify-center text-xs font-semibold text-white"
                style={{ width: `${data.knqf.mapped}%`, background: '#16A34A' }}
              >
                {data.knqf.mapped}%
              </div>
              <div
                className="flex items-center justify-center text-xs font-semibold"
                style={{ width: `${data.knqf.partial}%`, background: '#F59E0B', color: '#fff', fontSize: '10px' }}
              >
                {data.knqf.partial}%
              </div>
              <div
                className="flex items-center justify-center text-xs"
                style={{ width: `${data.knqf.unmapped}%`, background: '#E2E8F0', color: '#64748B', fontSize: '10px' }}
              >
                {data.knqf.unmapped}%
              </div>
            </div>
            <div className="flex gap-4 text-xs mb-4" style={{ color: '#94A3B8' }}>
              {[['#16A34A','Mapped'],['#F59E0B','Partial'],['#E2E8F0','Unmapped']].map(([bg, label]) => (
                <span key={label} className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm inline-block" style={{ background: bg }} />
                  {label}
                </span>
              ))}
            </div>

            {/* Breakdown */}
            <div className="flex flex-col gap-2">
              {data.knqfBreakdown.map(b => (
                <div
                  key={b.label}
                  className="flex items-center justify-between text-xs px-3 py-2 rounded-lg"
                  style={{ background: '#F8FAFC' }}
                >
                  <span style={{ color: '#475569' }}>{b.label}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-1.5 rounded-full" style={{ background: '#E2E8F0' }}>
                      <div
                        className="h-1.5 rounded-full"
                        style={{
                          width: `${b.pct}%`,
                          background: b.status === 'pass' ? '#16A34A' : b.status === 'warn' ? '#F59E0B' : '#EF4444',
                        }}
                      />
                    </div>
                    <span
                      className="font-semibold w-8 text-right"
                      style={{
                        color: b.status === 'pass' ? '#16A34A' : b.status === 'warn' ? '#92400E' : '#EF4444',
                      }}
                    >
                      {b.pct}%
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div
              className="mt-4 p-3 rounded-lg text-xs leading-relaxed"
              style={{
                background: data.knqf.mapped >= 80 ? '#DCFCE7' : data.knqf.mapped >= 65 ? '#FEF3C7' : '#FEE2E2',
                color: data.knqf.mapped >= 80 ? '#16A34A' : data.knqf.mapped >= 65 ? '#92400E' : '#EF4444',
              }}
            >
              {data.knqf.mapped >= 80
                ? '✓ KNQF mapping meets the 80% threshold required for Level 7 certification.'
                : `✗ ${data.knqf.unmapped}% of learning outcomes require KNQF mapping before next CUE programme review. Use the Curriculum Builder to complete.`}
            </div>
          </div>

          {/* Accreditation readiness checklist */}
          <div className="rounded-xl p-5" style={{ background: '#fff', border: '1px solid #E2E8F0' }}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-sm font-semibold" style={{ color: '#0F172A' }}>Accreditation readiness</h2>
                <p className="text-xs mt-0.5" style={{ color: '#64748B' }}>CUE programme review preparation checklist</p>
              </div>
              <span
                className="text-xs font-semibold px-2.5 py-1 rounded-md"
                style={{
                  background: passCount >= 7 ? '#DCFCE7' : passCount >= 5 ? '#FEF3C7' : '#FEE2E2',
                  color: passCount >= 7 ? '#16A34A' : passCount >= 5 ? '#92400E' : '#EF4444',
                }}
              >
                {passCount} of {data.checklist.length} ready
              </span>
            </div>
            <div className="flex flex-col gap-2">
              {data.checklist.map((item, i) => {
                const cfg = checkConfig[item.ok]
                return (
                  <div
                    key={i}
                    className="flex gap-3 items-start px-3 py-2.5 rounded-lg"
                    style={{ background: '#F8FAFC' }}
                  >
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5"
                      style={{ background: cfg.iconBg, color: cfg.iconColor }}
                    >
                      {cfg.icon}
                    </div>
                    <p className="text-xs leading-relaxed" style={{ color: '#475569' }}>
                      {item.text}
                    </p>
                  </div>
                )
              })}
            </div>

            {/* Regulatory references */}
            <div
              className="mt-4 p-3 rounded-lg text-xs"
              style={{ background: '#F8FAFC', border: '1px solid #E2E8F0' }}
            >
              <p className="font-semibold mb-1" style={{ color: '#0F172A' }}>Regulatory framework</p>
              <div className="flex flex-col gap-0.5" style={{ color: '#64748B' }}>
                <span>• Universities Act No. 42 of 2012</span>
                <span>• Universities Regulations 2014 (LN 76)</span>
                <span>• CUE Standards & Guidelines 2014</span>
                <span>• KNQF Act No. 22 of 2014</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
