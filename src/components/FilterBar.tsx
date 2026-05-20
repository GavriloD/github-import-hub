import { useState } from 'react'
import { colorForKpi, MAX_KPI_SELECTION } from '@/data/kpi-values'

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
  selectedKpis: string[]
  onPreset: (p: string) => void
  onToggleKpi: (k: string) => void
}

export function FilterBar({ preset, selectedKpis, onPreset, onToggleKpi }: FilterBarProps) {
  const [shakeKey, setShakeKey] = useState<string | null>(null)

  function handleChipClick(k: string) {
    const isSelected = selectedKpis.includes(k)
    const atLimit = selectedKpis.length >= MAX_KPI_SELECTION
    if (!isSelected && atLimit) {
      setShakeKey(k)
      setTimeout(() => setShakeKey(null), 400)
      return
    }
    onToggleKpi(k)
  }

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
        alignItems: 'center',
        gap: 6,
        padding: '0 20px 12px',
        overflowX: 'auto',
      }}>
        {KPI_OPTIONS.map((k) => {
          const active = selectedKpis.includes(k)
          const color = active ? colorForKpi(k, selectedKpis) : 'var(--text-dim)'
          const shaking = shakeKey === k
          return (
            <button
              key={k}
              onClick={() => handleChipClick(k)}
              style={{
                flexShrink: 0,
                padding: '5px 10px',
                borderRadius: 20,
                border: `1px solid ${active ? color : 'var(--border-mid)'}`,
                background: active ? `${color}1f` : 'transparent',
                fontFamily: 'var(--font-label)',
                fontSize: 10,
                letterSpacing: '0.08em',
                color: active ? color : 'var(--text-dim)',
                transition: 'all 0.22s ease',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                animation: shaking ? 'kpi-shake 0.32s ease' : undefined,
              }}
            >
              {active && (
                <span style={{
                  width: 6, height: 6, borderRadius: '50%',
                  background: color, display: 'inline-block',
                }} />
              )}
              {k.toUpperCase()}
            </button>
          )
        })}

        <span style={{
          marginLeft: 'auto',
          flexShrink: 0,
          fontFamily: 'var(--font-label)',
          fontSize: 9,
          color: 'var(--text-dim)',
          letterSpacing: '0.1em',
          paddingLeft: 8,
        }}>
          {selectedKpis.length} / {MAX_KPI_SELECTION}
        </span>
      </div>

      <style>{`
        @keyframes kpi-shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-3px); }
          75% { transform: translateX(3px); }
        }
      `}</style>
    </div>
  )
}
