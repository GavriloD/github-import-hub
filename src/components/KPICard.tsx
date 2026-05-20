
import { useEffect, useState } from 'react'
import { Quarter, QuarterType } from '@/data/timeline-data'

const TYPE_COLORS: Record<QuarterType, string> = {
  launch: '#7eb3d4',
  neutral: '#7a90a8',
  milestone: '#c4a96b',
  growth: '#6bbfa0',
  competitor: '#c97a7a',
}

const TYPE_LABELS: Record<QuarterType, string> = {
  launch: 'LAUNCH',
  neutral: 'RAZVOJ',
  milestone: 'MILESTONE',
  growth: 'GROWTH',
  competitor: 'COMPETITOR',
}

interface KPICardProps {
  quarter: Quarter
  kpiLabel: string
}

export function KPICard({ quarter, kpiLabel }: KPICardProps) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    setVisible(false)
    const t = setTimeout(() => setVisible(true), 80)
    return () => clearTimeout(t)
  }, [quarter.id, kpiLabel])

  const kpi = quarter.kpis.find(
    (k) => k.label.toLowerCase().includes(kpiLabel.toLowerCase()) ||
           kpiLabel.toLowerCase().includes(k.label.toLowerCase().split(' ')[0])
  ) ?? quarter.kpis[0]

  const color = TYPE_COLORS[quarter.type]

  return (
    <div style={{
      padding: '28px 24px 20px',
      minHeight: 120,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    }}>
      {/* Period + type badge */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
        <span style={{
          fontFamily: 'var(--font-label)',
          fontSize: 10,
          color: 'var(--text-dim)',
          letterSpacing: '0.1em',
        }}>
          {quarter.label}
        </span>
        <span style={{
          fontFamily: 'var(--font-label)',
          fontSize: 9,
          letterSpacing: '0.12em',
          color,
          border: `1px solid ${color}33`,
          padding: '2px 7px',
          borderRadius: 3,
          background: `${color}0d`,
        }}>
          {TYPE_LABELS[quarter.type]}
        </span>
      </div>

      {/* KPI value */}
      <div style={{
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.12s ease',
      }}>
        <div style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 52,
          fontWeight: 300,
          lineHeight: 1,
          color: kpi?.value ? 'var(--text)' : 'var(--text-dim)',
          letterSpacing: '-0.02em',
        }}>
          {kpi?.value ?? '—'}
        </div>
        <div style={{
          fontFamily: 'var(--font-label)',
          fontSize: 10,
          color: 'var(--text-dim)',
          letterSpacing: '0.1em',
          marginTop: 8,
        }}>
          {kpi?.label?.toUpperCase() ?? kpiLabel.toUpperCase()}
        </div>
      </div>

      {/* Delta */}
      {kpi?.delta && (
        <div style={{
          marginTop: 8,
          fontFamily: 'var(--font-label)',
          fontSize: 11,
          color: kpi.deltaType === 'up' ? 'var(--green)' : kpi.deltaType === 'down' ? 'var(--red)' : 'var(--text-dim)',
        }}>
          {kpi.deltaType === 'up' ? '↑' : kpi.deltaType === 'down' ? '↓' : '·'} {kpi.delta}
        </div>
      )}
    </div>
  )
}
