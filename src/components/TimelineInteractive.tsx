
import { useRef, useState, useCallback, useEffect } from 'react'
import { Quarter, QuarterType } from '@/data/timeline-data'

const TYPE_COLORS: Record<QuarterType, string> = {
  launch: '#7eb3d4',
  neutral: '#4a6080',
  milestone: '#c4a96b',
  growth: '#6bbfa0',
  competitor: '#c97a7a',
}

const CHART_H = 72
const TRACK_Y = CHART_H + 28
const DOT_Y = TRACK_Y
const LABEL_Y = DOT_Y + 22
const SVG_H = LABEL_Y + 14
const PAD = 24

interface TimelineInteractiveProps {
  quarters: Quarter[]
  activeIndex: number
  onActiveChange: (i: number) => void
  kpiLabel: string
}

export function TimelineInteractive({
  quarters,
  activeIndex,
  onActiveChange,
  kpiLabel,
}: TimelineInteractiveProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [svgW, setSvgW] = useState(340)
  const [dragging, setDragging] = useState(false)

  useEffect(() => {
    const ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width
      if (w) setSvgW(w)
    })
    if (svgRef.current) ro.observe(svgRef.current)
    return () => ro.disconnect()
  }, [])

  const n = quarters.length
  const usable = svgW - PAD * 2

  const getX = useCallback((i: number) => PAD + (n <= 1 ? 0 : (i / (n - 1)) * usable), [n, usable])
  const getIndexFrom = useCallback((clientX: number) => {
    if (!svgRef.current) return 0
    const rect = svgRef.current.getBoundingClientRect()
    const x = clientX - rect.left - PAD
    const frac = Math.max(0, Math.min(1, x / usable))
    return Math.round(frac * (n - 1))
  }, [n, usable])

  const onPointerDown = useCallback((e: React.PointerEvent<SVGSVGElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId)
    setDragging(true)
    onActiveChange(getIndexFrom(e.clientX))
  }, [getIndexFrom, onActiveChange])

  const onPointerMove = useCallback((e: React.PointerEvent<SVGSVGElement>) => {
    if (!dragging) return
    onActiveChange(getIndexFrom(e.clientX))
  }, [dragging, getIndexFrom, onActiveChange])

  const onPointerUp = useCallback(() => setDragging(false), [])

  // Build sparkline path from KPI values
  const kpiValues = quarters.map((q) => {
    const match = q.kpis.find(
      (k) => k.label.toLowerCase().includes(kpiLabel.toLowerCase()) ||
             kpiLabel.toLowerCase().includes(k.label.toLowerCase().split(' ')[0])
    )
    const raw = match?.value ?? null
    if (!raw) return null
    const num = parseFloat(raw.replace(/[^0-9.]/g, ''))
    return isNaN(num) ? null : num
  })

  const hasData = kpiValues.some((v) => v !== null)
  const maxVal = hasData ? Math.max(...kpiValues.filter((v): v is number => v !== null)) : 0

  const activeX = getX(activeIndex)
  const activeQ = quarters[activeIndex]

  // Year separators: mark where year changes
  const yearBreaks: number[] = []
  quarters.forEach((q, i) => {
    if (i > 0) {
      const prevYear = parseInt(quarters[i - 1].id.split('-')[1])
      const thisYear = parseInt(q.id.split('-')[1])
      if (thisYear !== prevYear) yearBreaks.push(i)
    }
  })

  return (
    <div style={{ padding: '0 0 4px' }}>
      <svg
        ref={svgRef}
        width="100%"
        height={SVG_H}
        style={{ display: 'block', cursor: dragging ? 'col-resize' : 'pointer', touchAction: 'none' }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        {/* ── Chart area ── */}

        {/* Chart baseline */}
        <line
          x1={PAD} y1={CHART_H} x2={svgW - PAD} y2={CHART_H}
          stroke="rgba(74,96,128,0.15)" strokeWidth={1}
        />

        {hasData ? (
          <>
            {/* Filled area */}
            <defs>
              <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.2" />
                <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.01" />
              </linearGradient>
            </defs>
            <path
              d={buildAreaPath(kpiValues, CHART_H, maxVal, getX, n)}
              fill="url(#sparkGrad)"
            />
            <path
              d={buildLinePath(kpiValues, CHART_H, maxVal, getX, n)}
              fill="none"
              stroke="var(--accent)"
              strokeWidth={1.5}
              strokeLinejoin="round"
            />
          </>
        ) : (
          /* No-data ghost line */
          <>
            <defs>
              <linearGradient id="ghostGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="rgba(74,96,128,0)" />
                <stop offset="30%" stopColor="rgba(74,96,128,0.12)" />
                <stop offset="70%" stopColor="rgba(74,96,128,0.12)" />
                <stop offset="100%" stopColor="rgba(74,96,128,0)" />
              </linearGradient>
            </defs>
            <rect x={PAD} y={CHART_H - 40} width={usable} height={40} fill="url(#ghostGrad)" />
            <line
              x1={PAD} y1={CHART_H - 4} x2={svgW - PAD} y2={CHART_H - 4}
              stroke="rgba(74,96,128,0.25)"
              strokeWidth={1}
              strokeDasharray="3 5"
            />
            {/* Ghost dots on dashed line */}
            {quarters.map((_, i) => (
              <circle key={i} cx={getX(i)} cy={CHART_H - 4} r={2} fill="rgba(74,96,128,0.3)" />
            ))}
          </>
        )}

        {/* Active cursor — vertical line from chart to track */}
        <line
          x1={activeX} y1={0}
          x2={activeX} y2={TRACK_Y - 6}
          stroke={TYPE_COLORS[activeQ?.type ?? 'neutral']}
          strokeWidth={1}
          strokeOpacity={0.4}
          strokeDasharray="3 3"
        />

        {/* Active chart dot */}
        {hasData && (
          <circle
            cx={activeX}
            cy={getChartY(kpiValues[activeIndex], CHART_H, maxVal)}
            r={4}
            fill={TYPE_COLORS[activeQ?.type ?? 'neutral']}
            stroke="var(--navy-deep)"
            strokeWidth={2}
          />
        )}

        {/* ── Track ── */}
        <line
          x1={PAD} y1={TRACK_Y}
          x2={svgW - PAD} y2={TRACK_Y}
          stroke="rgba(74,96,128,0.2)" strokeWidth={1}
        />

        {/* Year break ticks */}
        {yearBreaks.map((bi) => (
          <line
            key={bi}
            x1={getX(bi)} y1={TRACK_Y - 8}
            x2={getX(bi)} y2={TRACK_Y + 8}
            stroke="rgba(74,96,128,0.3)" strokeWidth={1}
          />
        ))}

        {/* Quarter dots */}
        {quarters.map((q, i) => {
          const x = getX(i)
          const isActive = i === activeIndex
          const color = TYPE_COLORS[q.type]
          return (
            <g key={q.id}>
              {isActive && (
                <circle
                  cx={x} cy={DOT_Y} r={10}
                  fill="none"
                  stroke={color}
                  strokeWidth={1}
                  strokeOpacity={0.2}
                />
              )}
              <circle
                cx={x} cy={DOT_Y} r={isActive ? 5 : 3.5}
                fill={isActive ? color : `${color}88`}
                stroke={isActive ? color : 'none'}
                strokeWidth={isActive ? 1.5 : 0}
              />
            </g>
          )
        })}

        {/* Quarter labels — show active + year start dots */}
        {quarters.map((q, i) => {
          const x = getX(i)
          const isActive = i === activeIndex
          const isYearStart = i === 0 || yearBreaks.includes(i)
          if (!isActive && !isYearStart) return null
          const year = q.id.split('-')[1]
          return (
            <text
              key={q.id}
              x={x}
              y={LABEL_Y}
              textAnchor="middle"
              fontSize={9}
              fontFamily="var(--font-label)"
              letterSpacing="0.06em"
              fill={isActive ? TYPE_COLORS[q.type] : 'var(--text-dim)'}
            >
              {isYearStart && !isActive ? year : q.shortLabel}
            </text>
          )
        })}
      </svg>
    </div>
  )
}

function getChartY(val: number | null, chartH: number, maxVal: number): number {
  if (!val || maxVal === 0) return chartH - 4
  const fraction = val / maxVal
  return chartH - fraction * (chartH - 10)
}

function buildLinePath(
  values: (number | null)[],
  chartH: number,
  maxVal: number,
  getX: (i: number) => number,
  n: number
): string {
  const parts: string[] = []
  values.forEach((v, i) => {
    const x = getX(i)
    const y = getChartY(v, chartH, maxVal)
    parts.push(`${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`)
  })
  return parts.join(' ')
}

function buildAreaPath(
  values: (number | null)[],
  chartH: number,
  maxVal: number,
  getX: (i: number) => number,
  n: number
): string {
  const line = buildLinePath(values, chartH, maxVal, getX, n)
  const lastX = getX(n - 1).toFixed(1)
  const firstX = getX(0).toFixed(1)
  return `${line} L${lastX},${chartH} L${firstX},${chartH} Z`
}
