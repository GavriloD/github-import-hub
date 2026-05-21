import type { Scenario } from '@/data/kpi-values'

const SCENARIOS: { id: Scenario; label: string; sub: string }[] = [
  { id: 'optimistic', label: 'OPT', sub: 'optimistic' },
  { id: 'base',       label: 'BASE', sub: 'base' },
  { id: 'conservative', label: 'CONS', sub: 'conservative' },
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
      gap: 4,
    }}>
      {SCENARIOS.map((s) => {
        const active = scenario === s.id
        return (
          <button
            key={s.id}
            onClick={() => onScenario(s.id)}
            title={s.sub}
            style={{
              padding: '8px 6px',
              borderRadius: 6,
              border: `1px solid ${active ? 'var(--accent)' : 'var(--border-mid)'}`,
              background: active ? 'rgba(126,179,212,0.12)' : 'rgba(13,21,32,0.85)',
              backdropFilter: 'blur(8px)',
              fontFamily: 'var(--font-label)',
              fontSize: 9,
              letterSpacing: '0.1em',
              color: active ? 'var(--accent)' : 'var(--text-dim)',
              writingMode: 'vertical-rl',
              textOrientation: 'mixed',
              transition: 'all 0.2s ease',
              cursor: 'pointer',
              minHeight: 52,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {s.label}
          </button>
        )
      })}
    </div>
  )
}
