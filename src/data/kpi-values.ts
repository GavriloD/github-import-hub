// Real KPI data — NuroLab ZenFlow | Q3 2026 – Q4 2028
// Source: NuroLab_KPI.xlsx (3 scenarios × 6 KPIs × 10 quarters)

export type Scenario = 'conservative' | 'base' | 'optimistic'

export interface KpiSeries {
  values: number[]
  format: (n: number) => string
  unit?: string
  cumulative?: boolean
}

/** Returns running totals if series.cumulative === true, otherwise raw values. */
export function getDisplayValues(series: KpiSeries): number[] {
  if (!series.cumulative) return series.values
  return series.values.map((_, i) =>
    series.values.slice(0, i + 1).reduce((a, b) => a + b, 0)
  )
}

const fmt = {
  eur: (n: number) => '€' + n.toLocaleString('de-DE'),
  count: (n: number) => String(n),
  nps: (n: number) => String(n),
}

export const KPI_SCENARIOS: Record<Scenario, Record<string, KpiSeries>> = {
  conservative: {
    Revenue: {
      values: [11400, 20760, 17808, 22766, 24652, 28132, 27760, 34646, 36272, 39980, 41056, 50292],
      format: fmt.eur,
      cumulative: true,
    },
    'Buyers': {
      values: [20, 28, 14, 24, 24, 28, 24, 36, 34, 38, 37, 52],
      format: fmt.count,
      cumulative: true,
    },
    '30d Buyers': {
      values: [40, 56, 29, 48, 47, 55, 48, 72, 67, 76, 74, 103],
      format: fmt.count,
      cumulative: true,
    },
    '90d Buyers': {
      values: [25, 35, 18, 30, 30, 34, 30, 45, 42, 48, 46, 64],
      format: fmt.count,
      cumulative: true,
    },
    '180d Buyers': {
      values: [15, 21, 11, 18, 18, 21, 18, 27, 25, 28, 28, 39],
      format: fmt.count,
      cumulative: true,
    },
    NPS: {
      values: [28, 31, 27, 33, 36, 39, 38, 44, 47, 50, 53, 61],
      format: fmt.nps,
    },
  },
  base: {
    Revenue: {
      values: [34200, 61140, 52944, 68172, 73842, 84430, 83200, 103778, 108736, 119940, 124160, 151390],
      format: fmt.eur,
      cumulative: true,
    },
    'Buyers': {
      values: [60, 82, 43, 72, 71, 83, 72, 107, 101, 114, 112, 155],
      format: fmt.count,
      cumulative: true,
    },
    '30d Buyers': {
      values: [120, 164, 86, 143, 141, 166, 144, 215, 202, 228, 224, 310],
      format: fmt.count,
      cumulative: true,
    },
    '90d Buyers': {
      values: [75, 102, 54, 90, 88, 104, 90, 134, 126, 142, 140, 194],
      format: fmt.count,
      cumulative: true,
    },
    '180d Buyers': {
      values: [45, 62, 32, 54, 53, 62, 54, 81, 76, 86, 84, 116],
      format: fmt.count,
      cumulative: true,
    },
    NPS: {
      values: [30, 35, 33, 41, 44, 49, 52, 60, 63, 68, 72, 80],
      format: fmt.nps,
    },
  },
  optimistic: {
    Revenue: {
      values: [68400, 122394, 105968, 136424, 147764, 168746, 166400, 207556, 217552, 239960, 248400, 302974],
      format: fmt.eur,
      cumulative: true,
    },
    'Buyers': {
      values: [120, 164, 86, 143, 141, 166, 144, 215, 202, 228, 224, 310],
      format: fmt.count,
      cumulative: true,
    },
    '30d Buyers': {
      values: [240, 328, 173, 286, 282, 332, 288, 430, 403, 456, 448, 620],
      format: fmt.count,
      cumulative: true,
    },
    '90d Buyers': {
      values: [150, 205, 108, 179, 176, 207, 180, 268, 252, 285, 280, 388],
      format: fmt.count,
      cumulative: true,
    },
    '180d Buyers': {
      values: [90, 123, 65, 107, 106, 124, 108, 161, 151, 171, 168, 233],
      format: fmt.count,
      cumulative: true,
    },
    NPS: {
      values: [36, 41, 38, 46, 51, 55, 54, 62, 66, 70, 74, 83],
      format: fmt.nps,
    },
  },
}

export const KPI_OPTIONS = ['Revenue', 'Buyers', '30d Buyers', '90d Buyers', '180d Buyers', 'NPS']

// 6 complementary colors — evenly spaced on the hue wheel, tuned for dark navy bg
export const KPI_PALETTE: string[] = [
  '#7eb3d4', // 205° blue      — Revenue
  '#7dd4b0', // 160° mint      — Buyers
  '#d4c47a', //  48° gold      — 30d Buyers
  '#d4896e', //  18° coral     — 90d Buyers
  '#a87dd4', // 270° violet    — 180d Buyers
  '#d47ab0', // 320° rose      — NPS
]

export const MAX_KPI_SELECTION = 6

export function colorForKpi(label: string, selected: string[]): string {
  const idx = selected.indexOf(label)
  if (idx === -1) return 'var(--text-dim)'
  return KPI_PALETTE[idx % KPI_PALETTE.length]
}
