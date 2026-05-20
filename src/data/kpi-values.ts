// DUMMY — replace with real numbers when research team delivers
// Each array is one value per quarter (index 0 = Q1 2025 … index 11 = Q4 2027)

export interface KpiSeries {
  values: number[]
  format: (n: number) => string
  unit?: string
}

export const KPI_DUMMY: Record<string, KpiSeries> = {
  // Revenue — quarterly in €k
  Revenue: {
    values: [12, 28, 55, 95, 110, 150, 210, 290, 360, 440, 560, 720],
    format: (n) => `€${n}k`,
  },
  // CAC — cost to acquire one customer in €
  CAC: {
    values: [42, 38, 31, 28, 36, 33, 30, 27, 26, 25, 24, 23],
    format: (n) => `€${n}`,
  },
  // 30-day Retention — % who reorder within 30 days
  '30d Retention': {
    values: [31, 38, 44, 49, 47, 51, 55, 58, 60, 62, 64, 66],
    format: (n) => `${n}%`,
  },
  // 90-day Retention — % still active after 90 days
  '90d Retention': {
    values: [18, 24, 31, 37, 35, 39, 44, 48, 51, 53, 56, 58],
    format: (n) => `${n}%`,
  },
  // NPS — Net Promoter Score (0–100)
  NPS: {
    values: [42, 48, 55, 60, 58, 62, 65, 68, 70, 71, 73, 74],
    format: (n) => `${n}`,
  },
}

// 5 complementary, brand-safe colors assigned by selection order.
// 1st clicked KPI = palette[0], 2nd = palette[1], etc.
export const KPI_PALETTE: string[] = [
  '#7eb3d4', // steel blue
  '#c4a96b', // gold
  '#6bbfa0', // sage green
  '#9b87c4', // muted mauve
  '#d49a7e', // soft terracotta
]

export const MAX_KPI_SELECTION = 5

export function colorForKpi(label: string, selected: string[]): string {
  const idx = selected.indexOf(label)
  if (idx === -1) return 'var(--text-dim)'
  return KPI_PALETTE[idx % KPI_PALETTE.length]
}

