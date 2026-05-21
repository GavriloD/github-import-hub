import { useRef, useState, useCallback, useEffect } from 'react'
import { Quarter, QuarterType } from '@/data/timeline-data'
import { KPI_SCENARIOS, colorForKpi, getDisplayValues, type Scenario } from '@/data/kpi-values'

const TYPE_COLORS: Record<QuarterType, string> = {
  launch: '#7eb3d4',
  neutral: '#4a6080',
  milestone: '#c4a96b',
  growth: '#6bbfa0',
  competitor: '#c97a7a',
}

const LANE_MIN_H = 50   // minimum px per lane so variation is always visible
const CHART_H_SINGLE = 130
const PAD = 24

interface TimelineInteractiveProps {
  quarters: Quarter[]
  activeIndex: number
  onActiveChange: (i: number) => void
  kpiLabels: string[]
  startOffset: number
  scenario: Scenario
}

export function TimelineInteractive({
  quarters,
  activeIndex,
  onActiveChange,
  kpiLabels,
  startOffset,
  scenario,
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

  // Build one normalized series per selected KPI, each in its own lane.
  const rawSeries = kpiLabels
    .map((label) => {
      const src = KPI_SCENARIOS[scenario][label]
      if (!src) return null
      const allDisplay = getDisplayValues(src)
      const slice = allDisplay.slice(startOffset, startOffset + n)
      const max = Math.max(...slice)
      const min = Math.min(...slice)
      return { label, color: colorForKpi(label, kpiLabels), values: slice, max, min }
    })
    .filter((s): s is NonNullable<typeof s> => !!s)

  const hasData = rawSeries.length > 0

  // Dynamic chart height: each lane gets at least LANE_MIN_H px
  const CHART_H = Math.max(CHART_H_SINGLE, rawSeries.length * LANE_MIN_H)
  const TRACK_Y = CHART_H + 28
  const DOT_Y = TRACK_Y
  const LABEL_Y = DOT_Y + 22
  const SVG_H = LABEL_Y + 14

  // Assign vertical lane per series so multiple lines don't overlap
  const LANE_PAD = 3
  const laneH = rawSeries.length > 1 ? CHART_H / rawSeries.length : CHART_H
  const series = rawSeries.map((s, idx) => ({
    ...s,
    yTop: rawSeries.length > 1 ? idx * laneH + LANE_PAD : LANE_PAD,
    yBot: rawSeries.length > 1 ? (idx + 1) * laneH - LANE_PAD : CHART_H - LANE_PAD,
  }))

  const activeX = getX(activeIndex)
  const activeQ = quarters[activeIndex]

  // Year separators
  const yearBreaks: number[] = []
  quarters.forEach((q, i) => {
    if (i > 0) {
      const prevYear = parseInt(quarters[i - 1].id.split('-')[1])
      const thisYear = parseInt(q.id.split('-')[1])
      if (thisYear !== prevYear) yearBreaks.push(i)
    }
  })

  const showArea = series.length === 1

  // Lane separator Y positions (between lanes, for multi-series)
  const laneDividers = series.length > 1
    ? series.slice(0, -1).map((_, idx) => (idx + 1) * laneH)
    : []

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
        {/* Chart baseline */}
        <line
          x1={PAD} y1={CHART_H} x2={svgW - PAD} y2={CHART_H}
          stroke="rgba(74,96,128,0.15)" strokeWidth={1}
        />

        {hasData ? (
          <>
            <defs>
              {series.map((s, idx) => (
                <linearGradient key={s.label} id={`sparkGrad-${idx}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={s.color} stopOpacity="0.18" />
                  <stop offset="100%" stopColor={s.color} stopOpacity="0.01" />
                </linearGradient>
              ))}
            </defs>

            {/* Lane dividers */}
            {laneDividers.map((y) => (
              <line
                key={y}
                x1={PAD} y1={y} x2={svgW - PAD} y2={y}
                stroke="rgba(74,96,128,0.12)" strokeWidth={1}
              />
            ))}

            {series.map((s, idx) => (
              <g key={s.label}>
                {showArea && (
                  <path
                    d={buildAreaPath(s.values, s.yTop, s.yBot, s.min, s.max, getX)}
                    fill={`url(#sparkGrad-${idx})`}
                  />
                )}
                <path
                  d={buildLinePath(s.values, s.yTop, s.yBot, s.min, s.max, getX)}
                  fill="none"
                  stroke={s.color}
                  strokeWidth={1.5}
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  opacity={0.9}
                />
              </g>
            ))}
          </>
        ) : (
          <line
            x1={PAD} y1={CHART_H - 4} x2={svgW - PAD} y2={CHART_H - 4}
            stroke="rgba(74,96,128,0.25)"
            strokeWidth={1}
            strokeDasharray="3 5"
          />
        )}

        {/* Active cursor */}
        <line
          x1={activeX} y1={0}
          x2={activeX} y2={TRACK_Y - 6}
          stroke={TYPE_COLORS[activeQ?.type ?? 'neutral']}
          strokeWidth={1}
          strokeOpacity={0.4}
          strokeDasharray="3 3"
        />

        {/* One dot per series at active index */}
        {series.map((s) => (
          <circle
            key={`dot-${s.label}`}
            cx={activeX}
            cy={getYInLane(s.values[activeIndex], s.min, s.max, s.yTop, s.yBot)}
            r={3.5}
            fill={s.color}
            stroke="var(--navy-deep)"
            strokeWidth={1.5}
          />
        ))}

        {/* Track */}
        <line
          x1={PAD} y1={TRACK_Y}
          x2={svgW - PAD} y2={TRACK_Y}
          stroke="rgba(74,96,128,0.2)" strokeWidth={1}
        />

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

        {/* Quarter labels */}
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
            fontSize={11}
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

// Map a value to a Y coordinate within a vertical lane [yTop, yBot]
// Higher value = lower y (higher on screen in SVG coordinate space)
function getYInLane(val: number, min: number, max: number, yTop: number, yBot: number): number {
  if (max === min) return (yTop + yBot) / 2
  const fraction = (val - min) / (max - min)
  return yBot - fraction * (yBot - yTop)
}

function buildLinePath(
  values: number[],
  yTop: number,
  yBot: number,
  min: number,
  max: number,
  getX: (i: number) => number,
): string {
  return values
    .map((v, i) => `${i === 0 ? 'M' : 'L'}${getX(i).toFixed(1)},${getYInLane(v, min, max, yTop, yBot).toFixed(1)}`)
    .join(' ')
}

function buildAreaPath(
  values: number[],
  yTop: number,
  yBot: number,
  min: number,
  max: number,
  getX: (i: number) => number,
): string {
  const line = buildLinePath(values, yTop, yBot, min, max, getX)
  const lastX = getX(values.length - 1).toFixed(1)
  const firstX = getX(0).toFixed(1)
  return `${line} L${lastX},${yBot} L${firstX},${yBot} Z`
}
