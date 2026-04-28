'use client'
export default function Header() {
  return (
    <header
      className="flex items-center justify-between px-7 h-14 flex-shrink-0"
      style={{ background: '#0D1B2A' }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-semibold text-white"
          style={{ background: '#0F7B69' }}
        >
          CA
        </div>
        <span className="text-white font-semibold text-base tracking-tight">
          Curriculum<span style={{ color: '#0F7B69' }}>AI</span>
        </span>
      </div>

      {/* Centre — Strathmore branding */}
      <div className="flex items-center gap-3">
        <div
          className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg"
          style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
        >
          {/* Strathmore shield SVG mark */}
          <svg width="18" height="18" viewBox="0 0 32 32" fill="none">
            <path d="M16 2L4 8v10c0 7 6 11 12 12 6-1 12-5 12-12V8L16 2z" fill="#1a3a6b" stroke="#c8a84b" strokeWidth="1.5"/>
            <path d="M16 6L8 10v8c0 5 4 8 8 8.5 4-.5 8-3.5 8-8.5V10L16 6z" fill="#1e4080"/>
            <text x="16" y="22" textAnchor="middle" fill="#c8a84b" fontSize="10" fontWeight="700" fontFamily="serif">SU</text>
          </svg>
          <span className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.8)' }}>
            Strathmore University
          </span>
        </div>
        <span
          className="text-xs font-medium px-2.5 py-1 rounded-full"
          style={{
            background: 'rgba(15,123,105,0.25)',
            border: '1px solid rgba(15,123,105,0.5)',
            color: '#6EE7D0',
            letterSpacing: '0.5px',
          }}
        >
          PILOT — SEM 2 2025/26
        </span>
      </div>

      {/* Right — user */}
      <div
        className="flex items-center gap-2 px-3 py-1.5 rounded-full"
        style={{ background: 'rgba(255,255,255,0.08)' }}
      >
        <div
          className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold text-white"
          style={{ background: '#0F7B69' }}
        >
          SK
        </div>
        <span className="text-xs hidden sm:inline" style={{ color: 'rgba(255,255,255,0.7)' }}>
          Sara Kamau
        </span>
      </div>
    </header>
  )
}
