import type { Scenario } from '@/data/kpi-values'

const SCENARIOS: { id: Scenario; label: string; short: string }[] = [
  { id: 'conservative', label: 'Conservative', short: 'CONS' },
  { id: 'base',         label: 'Base',         short: 'BASE' },
  { id: 'optimistic',   label: 'Optimistic',   short: 'OPT'  },
]

interface ScenarioPillProps {
  scenario: Scenario
  onScenario: (s: Scenario) => void
}

export function ScenarioPill({ scenario, onScenario }: ScenarioPillProps) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 4,
    }}>
      {SCENARIOS.map((s) => {
        const active = scenario === s.id
        return (
          <button
            key={s.id}
            onClick={() => onScenario(s.id)}
            style={{
              padding: '5px 10px',
              borderRadius: 6,
              border: `1px solid ${active ? 'var(--accent)' : 'var(--border-mid)'}`,
              background: active ? 'rgba(126,179,212,0.12)' : 'transparent',
              fontFamily: 'var(--font-label)',
              fontSize: 11,
              letterSpacing: '0.08em',
              color: active ? 'var(--accent)' : 'var(--text-dim)',
              transition: 'all 0.18s ease',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            {s.short}
          </button>
        )
      })}
    </div>
  )
}
