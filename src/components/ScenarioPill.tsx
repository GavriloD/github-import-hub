import type { Scenario } from '@/data/kpi-values'

const SCENARIOS: { id: Scenario; label: string }[] = [
  { id: 'optimistic',   label: 'Optimistic'   },
  { id: 'base',         label: 'Base'         },
  { id: 'conservative', label: 'Conservative' },
]

interface ScenarioPillProps {
  scenario: Scenario
  onScenario: (s: Scenario) => void
}

export function ScenarioPill({ scenario, onScenario }: ScenarioPillProps) {
  return (
    <div style={{
      position: 'fixed',
      right: 12,
      top: '50%',
      transform: 'translateY(-50%)',
      zIndex: 50,
      display: 'flex',
      flexDirection: 'column',
      gap: 3,
      background: 'rgba(13,21,32,0.90)',
      backdropFilter: 'blur(10px)',
      border: '1px solid var(--border-mid)',
      borderRadius: 10,
      padding: '10px 8px 8px',
      minWidth: 130,
    }}>
      {/* Label */}
      <div style={{
        fontFamily: 'var(--font-label)',
        fontSize: 9,
        letterSpacing: '0.14em',
        color: 'var(--text-dim)',
        textAlign: 'center',
        paddingBottom: 8,
        borderBottom: '1px solid rgba(74,96,128,0.2)',
        marginBottom: 4,
      }}>
        SELECT SCENARIO
      </div>

      {SCENARIOS.map((s) => {
        const active = scenario === s.id
        return (
          <button
            key={s.id}
            onClick={() => onScenario(s.id)}
            style={{
              padding: '9px 12px',
              borderRadius: 6,
              border: `1px solid ${active ? 'var(--accent)' : 'transparent'}`,
              background: active ? 'rgba(126,179,212,0.12)' : 'transparent',
              fontFamily: 'var(--font-label)',
              fontSize: 12,
              letterSpacing: '0.06em',
              color: active ? 'var(--accent)' : 'var(--text-muted)',
              textAlign: 'left',
              transition: 'all 0.18s ease',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            {s.label}
          </button>
        )
      })}
    </div>
  )
}
