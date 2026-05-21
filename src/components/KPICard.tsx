import { useEffect, useState } from 'react'
import { Quarter, QuarterType } from '@/data/timeline-data'
import { KPI_SCENARIOS, colorForKpi, getDisplayValues, type Scenario } from '@/data/kpi-values'

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
  scenario: Scenario
}

interface ReadResult {
  cumulative: string
  quarterly: string | null   // null if series is not cumulative (e.g. NPS)
  delta: string | null
  deltaType: 'up' | 'down' | 'base'
}

function readValue(label: string, globalIndex: number, scenario: Scenario): ReadResult | null {
  const src = KPI_SCENARIOS[scenario][label]
  if (!src) return null
  const display = getDisplayValues(src)
  const v = display[globalIndex]
  if (v == null) return null
  const prev = globalIndex > 0 ? display[globalIndex - 1] : null
  let delta: string | null = null
  let deltaType: 'up' | 'down' | 'base' = 'base'
  if (prev != null && prev !== 0) {
    const pct = ((v - prev) / Math.abs(prev)) * 100
    if (Math.abs(pct) >= 0.5) {
      const up = pct > 0
      deltaType = up ? 'up' : 'down'
      delta = `${up ? '+' : ''}${pct.toFixed(0)}%`
    }
  }
  // Per-quarter value (only meaningful for cumulative series)
  const quarterly = src.cumulative ? src.format(src.values[globalIndex]) : null
  return { cumulative: src.format(v), quarterly, delta, deltaType }
}

export function KPICard({ quarter, globalIndex, kpiLabels, scenario }: KPICardProps) {
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
          <SingleKpi label={kpiLabels[0]} globalIndex={globalIndex} selected={kpiLabels} scenario={scenario} />
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {kpiLabels.map((label) => (
              <KpiRow key={label} label={label} globalIndex={globalIndex} selected={kpiLabels} scenario={scenario} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function SingleKpi({ label, globalIndex, selected, scenario }: { label: string; globalIndex: number; selected: string[]; scenario: Scenario }) {
  const data = readValue(label, globalIndex, scenario)
  const color = colorForKpi(label, selected)
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
        <div style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 48,
          fontWeight: 300,
          lineHeight: 1,
          color: data ? 'var(--text)' : 'var(--text-dim)',
          letterSpacing: '-0.01em',
        }}>
          {data?.quarterly ?? data?.cumulative ?? '—'}
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

      {/* Sub-row: label + cumulative if applicable */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        marginTop: 8,
      }}>
        <span style={{
          display: 'flex', alignItems: 'center', gap: 6,
          fontFamily: 'var(--font-label)',
          fontSize: 11,
          color: 'var(--text-dim)',
          letterSpacing: '0.1em',
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: color }} />
          {label.toUpperCase()}
        </span>
        {data?.quarterly && (
          <>
            <span style={{ color: 'rgba(74,96,128,0.4)', fontSize: 10 }}>·</span>
            <span style={{ fontFamily: 'var(--font-label)', fontSize: 10, color: 'var(--text-dim)', letterSpacing: '0.08em' }}>
              CUMULATIVE
            </span>
            <span style={{ fontFamily: 'var(--font-label)', fontSize: 11, color: 'var(--text-muted)', letterSpacing: '0.04em' }}>
              {data.cumulative}
            </span>
          </>
        )}
      </div>
    </div>
  )
}

function KpiRow({ label, globalIndex, selected, scenario }: { label: string; globalIndex: number; selected: string[]; scenario: Scenario }) {
  const data = readValue(label, globalIndex, scenario)
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
        fontSize: 11,
        letterSpacing: '0.1em',
        color: 'var(--text-muted)',
        minWidth: 90,
      }}>
        {label.toUpperCase()}
      </span>

      <span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'baseline', gap: 8 }}>
        {/* Cumulative value (dimmer, smaller) */}
        {data?.quarterly && (
          <span style={{
            display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 1,
          }}>
            <span style={{
              fontFamily: 'var(--font-label)',
              fontSize: 9,
              color: 'var(--text-dim)',
              letterSpacing: '0.1em',
            }}>
              CUMULATIVE
            </span>
            <span style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 13,
              fontWeight: 300,
              color: 'var(--text-dim)',
              letterSpacing: '-0.01em',
            }}>
              {data.cumulative}
            </span>
          </span>
        )}

        {/* This quarter value (main) */}
        <span style={{
          display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 1,
        }}>
          {data?.quarterly && (
            <span style={{
              fontFamily: 'var(--font-label)',
              fontSize: 9,
              color: 'var(--text-dim)',
              letterSpacing: '0.1em',
            }}>
              THIS Q
            </span>
          )}
          <span style={{
            display: 'flex', alignItems: 'baseline', gap: 6,
          }}>
            <span style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 22,
              fontWeight: 300,
              color: 'var(--text)',
              letterSpacing: '-0.01em',
            }}>
              {data?.quarterly ?? data?.cumulative ?? '—'}
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
        </span>
      </span>
    </div>
  )
}
