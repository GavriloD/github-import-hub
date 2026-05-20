// DUMMY — replace with real numbers when research team delivers
// Each array is one value per quarter (index 0 = Q1 2025 … index 11 = Q4 2027)

export interface KpiSeries {
  values: number[]
  format: (n: number) => string
  unit?: string
}

export const KPI_DUMMY: Record<string, KpiSeries> = {
  Revenue: {
    values: [12, 28, 55, 95, 110, 150, 210, 290, 360, 440, 560, 720],
    format: (n) => `€${n}k`,
  },
  Korisnici: {
    values: [400, 1200, 2800, 5200, 6100, 8400, 11500, 15000, 18000, 22500, 28000, 35000],
    format: (n) => n.toLocaleString('sr-RS'),
  },
  CAC: {
    values: [42, 38, 31, 28, 36, 33, 30, 27, 26, 25, 24, 23],
    format: (n) => `€${n}`,
  },
  LTV: {
    values: [85, 110, 145, 180, 195, 220, 260, 305, 340, 380, 420, 470],
    format: (n) => `€${n}`,
  },
  NPS: {
    values: [42, 48, 55, 60, 58, 62, 65, 68, 70, 71, 73, 74],
    format: (n) => `${n}`,
  },
  'Market Share': {
    values: [0.4, 1.1, 2.3, 4.0, 3.6, 4.8, 6.5, 8.2, 9.5, 11.0, 12.8, 14.5],
    format: (n) => `${n.toFixed(1)}%`,
  },
  Retention: {
    values: [38, 44, 51, 56, 55, 58, 62, 65, 67, 68, 70, 71],
    format: (n) => `${n}%`,
  },
}

// Brand-safe palette: pick colors that are distinguishable but stay within
// the cool / muted spectrum required by BRAND.md (no saturated warms).
export const KPI_COLORS: Record<string, string> = {
  Revenue: '#7eb3d4',        // steel blue (brand accent)
  Korisnici: '#6bbfa0',      // success green
  CAC: '#c97a7a',            // warning red (cost going up = bad)
  LTV: '#c4a96b',            // gold
  NPS: '#9b87c4',            // muted mauve
  'Market Share': '#7a90a8', // slate
  Retention: '#8fb8c9',      // pale steel
}

export const MAX_KPI_SELECTION = 3
