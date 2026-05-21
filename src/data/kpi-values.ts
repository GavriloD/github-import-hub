// Real KPI data — NuroLab ZenFlow | Q3 2026 – Q4 2028
// Source: NuroLab_KPI.xlsx (3 scenarios × 5 KPIs × 10 quarters)

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
      values: [13700, 23980, 19464, 25503, 27366, 31306, 30520, 38763, 40136, 44350],
      format: fmt.eur,
      cumulative: true,
    },
    '30d Buyers': {
      values: [50, 70, 36, 60, 59, 69, 60, 90, 84, 95],
      format: fmt.count,
      cumulative: true,
    },
    '90d Buyers': {
      values: [30, 42, 22, 36, 35, 41, 36, 54, 50, 57],
      format: fmt.count,
      cumulative: true,
    },
    '180d Buyers': {
      values: [20, 28, 14, 24, 24, 28, 24, 36, 34, 38],
      format: fmt.count,
      cumulative: true,
    },
    NPS: {
      values: [28, 31, 27, 33, 36, 39, 38, 44, 47, 50],
      format: fmt.nps,
    },
  },
  base: {
    Revenue: {
      values: [41100, 70570, 57912, 76406, 81961, 93975, 91480, 116129, 120328, 133050],
      format: fmt.eur,
      cumulative: true,
    },
    '30d Buyers': {
      values: [150, 205, 108, 179, 176, 208, 180, 268, 252, 285],
      format: fmt.count,
      cumulative: true,
    },
    '90d Buyers': {
      values: [90, 123, 65, 107, 106, 124, 108, 161, 151, 171],
      format: fmt.count,
      cumulative: true,
    },
    '180d Buyers': {
      values: [60, 82, 43, 72, 71, 83, 72, 107, 101, 114],
      format: fmt.count,
      cumulative: true,
    },
    NPS: {
      values: [30, 35, 33, 41, 44, 49, 52, 60, 63, 68],
      format: fmt.nps,
    },
  },
  optimistic: {
    Revenue: {
      values: [82200, 141277, 115904, 152892, 164002, 187813, 182960, 232258, 240736, 266180],
      format: fmt.eur,
      cumulative: true,
    },
    '30d Buyers': {
      values: [300, 410, 216, 358, 353, 414, 360, 537, 504, 570],
      format: fmt.count,
      cumulative: true,
    },
    '90d Buyers': {
      values: [180, 246, 130, 215, 212, 249, 216, 322, 302, 342],
      format: fmt.count,
      cumulative: true,
    },
    '180d Buyers': {
      values: [120, 164, 86, 143, 141, 166, 144, 215, 202, 228],
      format: fmt.count,
      cumulative: true,
    },
    NPS: {
      values: [36, 41, 38, 46, 51, 55, 54, 62, 66, 70],
      format: fmt.nps,
    },
  },
}

export const KPI_OPTIONS = ['Revenue', '30d Buyers', '90d Buyers', '180d Buyers', 'NPS']

// 5 complementary brand-safe colors, assigned by selection order
export const KPI_PALETTE: string[] = [
  '#7eb3d4', // steel blue  — Revenue
  '#6bbfa0', // sage green  — 30d Buyers
  '#c4a96b', // gold        — 90d Buyers
  '#c97a7a', // coral red   — 180d Buyers
  '#a78bd4', // violet      — NPS
]

export const MAX_KPI_SELECTION = 5

export function colorForKpi(label: string, selected: string[]): string {
  const idx = selected.indexOf(label)
  if (idx === -1) return 'var(--text-dim)'
  return KPI_PALETTE[idx % KPI_PALETTE.length]
}
