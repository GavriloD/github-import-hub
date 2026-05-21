import { useState } from 'react'
import { colorForKpi, MAX_KPI_SELECTION, KPI_OPTIONS } from '@/data/kpi-values'

interface FilterBarProps {
  selectedKpis: string[]
  onToggleKpi: (k: string) => void
}

export function FilterBar({ selectedKpis, onToggleKpi }: FilterBarProps) {
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
      {/* KPI chips */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        padding: '10px 20px 12px',
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
                padding: '6px 12px',
                borderRadius: 20,
                border: `1px solid ${active ? color : 'var(--border-mid)'}`,
                background: active ? `${color}1f` : 'transparent',
                fontFamily: 'var(--font-label)',
                fontSize: 12,
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
          fontSize: 16,
          fontWeight: 500,
          color: selectedKpis.length === MAX_KPI_SELECTION ? 'var(--accent)' : 'var(--text-dim)',
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
