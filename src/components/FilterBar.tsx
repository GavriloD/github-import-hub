import { useState } from 'react'
import { colorForKpi, MAX_KPI_SELECTION, KPI_OPTIONS } from '@/data/kpi-values'
import { ScenarioPill } from '@/components/ScenarioPill'
import type { Scenario } from '@/data/kpi-values'

interface FilterBarProps {
  selectedKpis: string[]
  onToggleKpi: (k: string) => void
  scenario: Scenario
  onScenario: (s: Scenario) => void
}

export function FilterBar({ selectedKpis, onToggleKpi, scenario, onScenario }: FilterBarProps) {
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
      {/* KPI chips + scenario pill in one row */}
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

        {/* Divider */}
        <div style={{
          flexShrink: 0,
          width: 1,
          height: 20,
          background: 'rgba(74,96,128,0.25)',
          marginLeft: 4,
          marginRight: 4,
        }} />

        {/* Scenario pill inline */}
        <ScenarioPill scenario={scenario} onScenario={onScenario} />
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
