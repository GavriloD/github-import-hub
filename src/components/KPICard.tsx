import { useEffect, useState } from 'react'
import { Quarter, QuarterType } from '@/data/timeline-data'
import { KPI_DUMMY, colorForKpi } from '@/data/kpi-values'

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
  globalIndex: number
  kpiLabels: string[]
}

function readValue(label: string, globalIndex: number): { value: string; delta: string | null; deltaType: 'up' | 'down' | 'base' } | null {
  const src = KPI_DUMMY[label]
  if (!src) return null
  const v = src.values[globalIndex]
  if (v == null) return null
  const prev = globalIndex > 0 ? src.values[globalIndex - 1] : null
  let delta: string | null = null
  let deltaType: 'up' | 'down' | 'base' = 'base'
  if (prev != null && prev !== 0) {
    const pct = ((v - prev) / Math.abs(prev)) * 100
    if (Math.abs(pct) >= 0.5) {
      // For CAC, lower is better → invert color semantics
      const isCost = label === 'CAC'
      const up = pct > 0
      deltaType = isCost ? (up ? 'down' : 'up') : (up ? 'up' : 'down')
      delta = `${up ? '+' : ''}${pct.toFixed(0)}%`
    }
  }
  return { value: src.format(v), delta, deltaType }
}

export function KPICard({ quarter, globalIndex, kpiLabels }: KPICardProps) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    setVisible(false)
    const t = setTimeout(() => setVisible(true), 80)
    return () => clearTimeout(t)
  }, [quarter.id, kpiLabels.join('|')])

  const typeColor = TYPE_COLORS[quarter.type]
  const isSingle = kpiLabels.length === 1

  return (
    <div style={{
      padding: '20px 24px 18px',
      minHeight: 120,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    }}>
      {/* Period + type badge */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
        <span style={{
          fontFamily: 'var(--font-label)',
          fontSize: 11,
          color: 'var(--text-dim)',
          letterSpacing: '0.1em',
        }}>
          {quarter.label}
        </span>
        <span style={{
          fontFamily: 'var(--font-label)',
          fontSize: 10,
          letterSpacing: '0.12em',
          color: typeColor,
          border: `1px solid ${typeColor}33`,
          padding: '2px 7px',
          borderRadius: 3,
          background: `${typeColor}0d`,
        }}>
          {TYPE_LABELS[quarter.type]}
        </span>
      </div>

      <div style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.22s ease' }}>
        {isSingle ? (
          <SingleKpi label={kpiLabels[0]} globalIndex={globalIndex} selected={kpiLabels} />
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {kpiLabels.map((label) => (
              <KpiRow key={label} label={label} globalIndex={globalIndex} selected={kpiLabels} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function SingleKpi({ label, globalIndex, selected }: { label: string; globalIndex: number; selected: string[] }) {
  const data = readValue(label, globalIndex)
  const color = colorForKpi(label, selected)
  return (
    <div>
      <div style={{
        display: 'flex', alignItems: 'baseline', gap: 12,
      }}>
        <div style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 48,
          fontWeight: 300,
          lineHeight: 1,
          color: data ? 'var(--text)' : 'var(--text-dim)',
          letterSpacing: '-0.01em',
        }}>
          {data?.value ?? '—'}
        </div>
        {data?.delta && (
          <span style={{
            fontFamily: 'var(--font-label)',
            fontSize: 13,
            color: data.deltaType === 'up' ? '#6bbfa0' : data.deltaType === 'down' ? '#c97a7a' : 'var(--text-dim)',
          }}>
            {data.deltaType === 'up' ? '↑' : data.deltaType === 'down' ? '↓' : '·'} {data.delta}
          </span>
        )}
      </div>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 6,
        fontFamily: 'var(--font-label)',
        fontSize: 10,
        color: 'var(--text-dim)',
        letterSpacing: '0.1em',
        marginTop: 8,
      }}>
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: color }} />
        {label.toUpperCase()}
      </div>
    </div>
  )
}

function KpiRow({ label, globalIndex, selected }: { label: string; globalIndex: number; selected: string[] }) {
  const data = readValue(label, globalIndex)
  const color = colorForKpi(label, selected)
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      paddingBottom: 6,
      borderBottom: '1px dashed rgba(74,96,128,0.18)',
    }}>
      <span style={{ width: 7, height: 7, borderRadius: '50%', background: color, flexShrink: 0 }} />
      <span style={{
        fontFamily: 'var(--font-label)',
        fontSize: 10,
        letterSpacing: '0.1em',
        color: 'var(--text-muted)',
        minWidth: 90,
      }}>
        {label.toUpperCase()}
      </span>
      <span style={{
        marginLeft: 'auto',
        display: 'flex', alignItems: 'baseline', gap: 8,
      }}>
        <span style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 22,
          fontWeight: 300,
          color: 'var(--text)',
          letterSpacing: '-0.01em',
        }}>
          {data?.value ?? '—'}
        </span>
        {data?.delta && (
          <span style={{
            fontFamily: 'var(--font-label)',
            fontSize: 11,
            color: data.deltaType === 'up' ? '#6bbfa0' : data.deltaType === 'down' ? '#c97a7a' : 'var(--text-dim)',
            minWidth: 44,
            textAlign: 'right',
          }}>
            {data.deltaType === 'up' ? '↑' : data.deltaType === 'down' ? '↓' : '·'} {data.delta}
          </span>
        )}
      </span>
    </div>
  )
}
