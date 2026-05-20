
const PRESETS = [
  { id: 'y1', label: 'Y1', sub: '2025' },
  { id: 'y2', label: 'Y2', sub: '2026' },
  { id: 'y3', label: 'Y3', sub: '2027' },
  { id: 'all', label: '3Y', sub: 'sve' },
]

export const KPI_OPTIONS = [
  'Revenue',
  'Korisnici',
  'CAC',
  'LTV',
  'NPS',
  'Market Share',
  'Retention',
]

interface FilterBarProps {
  preset: string
  kpi: string
  onPreset: (p: string) => void
  onKpi: (k: string) => void
}

export function FilterBar({ preset, kpi, onPreset, onKpi }: FilterBarProps) {
  return (
    <div style={{ borderBottom: '1px solid var(--border)' }}>
      {/* Presets */}
      <div style={{ display: 'flex', gap: 4, padding: '10px 20px 10px' }}>
        {PRESETS.map((p) => {
          const active = preset === p.id
          return (
            <button
              key={p.id}
              onClick={() => onPreset(p.id)}
              style={{
                flex: 1,
                padding: '7px 4px',
                borderRadius: 6,
                border: `1px solid ${active ? 'var(--accent)' : 'var(--border-mid)'}`,
                background: active ? 'rgba(126,179,212,0.1)' : 'transparent',
                transition: 'all 0.22s ease',
              }}
            >
              <div style={{
                fontFamily: 'var(--font-label)',
                fontSize: 13,
                fontWeight: active ? 500 : 300,
                color: active ? 'var(--accent)' : 'var(--text-muted)',
                letterSpacing: '0.05em',
              }}>
                {p.label}
              </div>
              <div style={{
                fontFamily: 'var(--font-label)',
                fontSize: 9,
                color: active ? 'rgba(126,179,212,0.6)' : 'var(--text-dim)',
                letterSpacing: '0.08em',
                marginTop: 1,
              }}>
                {p.sub}
              </div>
            </button>
          )
        })}
      </div>

      {/* KPI chips */}
      <div style={{
        display: 'flex',
        gap: 6,
        padding: '0 20px 12px',
        overflowX: 'auto',
      }}>
        {KPI_OPTIONS.map((k) => {
          const active = kpi === k
          return (
            <button
              key={k}
              onClick={() => onKpi(k)}
              style={{
                flexShrink: 0,
                padding: '5px 10px',
                borderRadius: 20,
                border: `1px solid ${active ? 'var(--accent)' : 'var(--border-mid)'}`,
                background: active ? 'rgba(126,179,212,0.08)' : 'transparent',
                fontFamily: 'var(--font-label)',
                fontSize: 10,
                letterSpacing: '0.08em',
                color: active ? 'var(--accent)' : 'var(--text-dim)',
                transition: 'all 0.22s ease',
              }}
            >
              {k.toUpperCase()}
            </button>
          )
        })}
      </div>
    </div>
  )
}
