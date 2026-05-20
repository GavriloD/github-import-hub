const LEGEND = [
  { color: '#7eb3d4', label: 'Launch' },
  { color: '#6bbfa0', label: 'Growth' },
  { color: '#c4a96b', label: 'Milestone' },
  { color: '#c97a7a', label: 'Competitor' },
  { color: '#4a6080', label: 'Razvoj' },
]

export function TypeLegend() {
  return (
    <div style={{
      display: 'flex',
      gap: 14,
      justifyContent: 'center',
      padding: '12px 24px',
      borderTop: '1px solid var(--border)',
    }}>
      {LEGEND.map(({ color, label }) => (
        <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <div style={{ width: 5, height: 5, borderRadius: '50%', background: color }} />
          <span style={{
            fontFamily: 'var(--font-label)',
            fontSize: 9,
            color: 'var(--text-dim)',
            letterSpacing: '0.06em',
          }}>
            {label.toUpperCase()}
          </span>
        </div>
      ))}
    </div>
  )
}
