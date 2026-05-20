export type QuarterType = 'launch' | 'neutral' | 'milestone' | 'growth' | 'competitor'
export type DeltaType = 'up' | 'down' | 'base'

export interface KPI {
  label: string
  value: string | null
  delta: string | null
  deltaType: DeltaType
}

export interface CompetitorData {
  profile: string
  resources: string
  marketEntry: string
  impact: string
  benchmark: {
    metric: string
    us: string | null
    them: string | null
  }[]
}

export interface ChartDataPoint {
  date: Date
  value: number
}

export interface Quarter {
  id: string
  label: string
  shortLabel: string
  type: QuarterType
  icon: string
  title: string
  context: string
  kpis: KPI[]
  chartData?: ChartDataPoint[]
  competitor?: CompetitorData
}

export interface TimelineData {
  brand: string
  product: string
  event: string
  totalYears: number
  quarters: Quarter[]
}

export const DATA: TimelineData = {
  brand: "NuroLab",
  product: "ZenFlow",
  event: "BCA SEE Summer Tournament 2026",
  totalYears: 3,
  quarters: [

    // ─── GODINA 1 ───────────────────────────────────────────────

    {
      id: "q1-2025",
      label: "Q1 2025",
      shortLabel: "Q1 '25",
      type: "launch",
      icon: "🚀",
      title: "Lansiranje ZenFlow",
      context: "NuroLab ulazi na srpsko tržište kao prvi cognitive performance suplement. DTC model, primarni kanal YouTube osnivača (240k+). Kategorija praktično ne postoji u mainstream svesti.",
      kpis: [
        { label: "Revenue", value: null, delta: null, deltaType: "base" },
        { label: "Korisnici", value: null, delta: null, deltaType: "base" },
        { label: "CAC", value: null, delta: null, deltaType: "base" },
        { label: "LTV", value: null, delta: null, deltaType: "base" },
      ]
    },

    {
      id: "q2-2025",
      label: "Q2 2025",
      shortLabel: "Q2 '25",
      type: "neutral",
      icon: "📊",
      title: "Optimizacija Akvizicije",
      context: "Testiranje paid akvizicije uz organsku bazu osnivača. Segmentacija korisnika kroz Focus Score tipove. Refinement poruka i kreativa.",
      kpis: [
        { label: "Revenue", value: null, delta: null, deltaType: "up" },
        { label: "Korisnici", value: null, delta: null, deltaType: "up" },
        { label: "CAC", value: null, delta: null, deltaType: "base" },
        { label: "30d Retention", value: null, delta: null, deltaType: "base" },
      ]
    },

    {
      id: "q3-2025",
      label: "Q3 2025",
      shortLabel: "Q3 '25",
      type: "milestone",
      icon: "🏆",
      title: "Breakeven & Kategorijsko Prisustvo",
      context: "Kompanija dostiže breakeven ranije od projektovanog. Medijska pokrivenost kroz podcast i YouTube nastupe učvršćuje NuroLab kao autoritet u kategoriji.",
      kpis: [
        { label: "Revenue", value: null, delta: null, deltaType: "up" },
        { label: "Korisnici", value: null, delta: null, deltaType: "up" },
        { label: "NPS", value: null, delta: null, deltaType: "base" },
        { label: "Market Share", value: null, delta: null, deltaType: "base" },
      ],
      chartData: [
        { date: new Date(2025, 0, 1), value: 0 },
        { date: new Date(2025, 3, 1), value: 0 },
        { date: new Date(2025, 6, 1), value: 0 },
      ]
    },

    {
      id: "q4-2025",
      label: "Q4 2025",
      shortLabel: "Q4 '25",
      type: "growth",
      icon: "📈",
      title: "Skaliranje & Balkan Ekspanzija",
      context: "Ulazak na balkansko tržište — faza 2 distribucije. Bundle i subscription model aktivirani. LTV raste kao signal lojalnosti protokol-based korisnika.",
      kpis: [
        { label: "Revenue", value: null, delta: null, deltaType: "up" },
        { label: "LTV", value: null, delta: null, deltaType: "up" },
        { label: "Subscription Rate", value: null, delta: null, deltaType: "base" },
        { label: "Bundle Rate", value: null, delta: null, deltaType: "base" },
      ]
    },

    // ─── GODINA 2 ───────────────────────────────────────────────

    {
      id: "q1-2026",
      label: "Q1 2026",
      shortLabel: "Q1 '26",
      type: "competitor",
      icon: "⚡",
      title: "Competitor Ulazi u Kategoriju",
      context: "Established igrač lansira direktnu focus liniju. Kategorija dobija legitimitet ali i pritisak na akvizicione kanale.",
      kpis: [
        { label: "Revenue", value: null, delta: null, deltaType: "down" },
        { label: "Market Share", value: null, delta: null, deltaType: "down" },
        { label: "CAC", value: null, delta: null, deltaType: "down" },
        { label: "Retention", value: null, delta: null, deltaType: "up" },
      ],
      competitor: {
        profile: "Established supplements brend sa masovnom distribucijom i marketing budžetom višestruko većim od NuroLab-a.",
        resources: "Široka retail distribucija, established brend awareness u wellness kategoriji, kapacitet za masovne kampanje.",
        marketEntry: "Lansira focus liniju kao ekstenziju postojećeg portfolija, bez izgradnje novog narativa oko kategorije.",
        impact: "CAC raste usled veće konkurencije u paid kanalima. Pioneer prednost i lojalnost baze ostaju NuroLab-ov ključni moat.",
        benchmark: [
          { metric: "NPS Score", us: null, them: null },
          { metric: "30d Retention", us: null, them: null },
          { metric: "Brand Affinity", us: "Visoka", them: "Niska" },
          { metric: "Distribucija", us: "DTC Premium", them: "Masovna Retail" },
          { metric: "Kategorijski narativ", us: "Pioneer", them: "Follower" },
        ]
      }
    },

    {
      id: "q2-2026",
      label: "Q2 2026",
      shortLabel: "Q2 '26",
      type: "growth",
      icon: "💪",
      title: "Community Moat & Diferencijacija",
      context: "Pioneer prednost se pretvara u moat kroz lojalnost zajednice. Brend koji je kreirao kategoriju zadržava autoritet dok masovni igrači tek počinju da grade narativ.",
      kpis: [
        { label: "Revenue", value: null, delta: null, deltaType: "up" },
        { label: "Market Share", value: null, delta: null, deltaType: "up" },
        { label: "Community Size", value: null, delta: null, deltaType: "up" },
        { label: "NPS", value: null, delta: null, deltaType: "up" },
      ]
    },

    {
      id: "q3-2026",
      label: "Q3 2026",
      shortLabel: "Q3 '26",
      type: "neutral",
      icon: "🧪",
      title: "Novi SKU Razvoj",
      context: "Razvoj drugog NuroLab proizvoda na osnovu feedback-a zajednice. Kategorija se širi kroz portfolio.",
      kpis: [
        { label: "Revenue", value: null, delta: null, deltaType: "up" },
        { label: "SKU Portfolio", value: null, delta: null, deltaType: "base" },
        { label: "R&D Cost", value: null, delta: null, deltaType: "base" },
        { label: "Pre-order List", value: null, delta: null, deltaType: "base" },
      ]
    },

    {
      id: "q4-2026",
      label: "Q4 2026",
      shortLabel: "Q4 '26",
      type: "milestone",
      icon: "🌍",
      title: "Regionalni Lider",
      context: "NuroLab etabliran kao kategorijsko ime na Balkanu. Drugi competitor ulazi — validacija tržišnog potencijala koji je NuroLab kreirao.",
      kpis: [
        { label: "Revenue", value: null, delta: null, deltaType: "up" },
        { label: "Market Share", value: null, delta: null, deltaType: "base" },
        { label: "Tržišta", value: null, delta: null, deltaType: "base" },
        { label: "LTV", value: null, delta: null, deltaType: "up" },
      ]
    },

    // ─── GODINA 3 ───────────────────────────────────────────────

    {
      id: "q1-2027",
      label: "Q1 2027",
      shortLabel: "Q1 '27",
      type: "growth",
      icon: "⚗️",
      title: "Portfolio Ekspanzija",
      context: "Lansiranje gummy supplement linije (odvojeni brend). NuroLab ekosistem se širi van ZenFlow-a.",
      kpis: [
        { label: "Total Revenue", value: null, delta: null, deltaType: "up" },
        { label: "ZenFlow Revenue", value: null, delta: null, deltaType: "base" },
        { label: "New Brend Revenue", value: null, delta: null, deltaType: "base" },
        { label: "CAC Blended", value: null, delta: null, deltaType: "base" },
      ]
    },

    {
      id: "q2-2027",
      label: "Q2 2027",
      shortLabel: "Q2 '27",
      type: "neutral",
      icon: "🤝",
      title: "B2B & Korporativni Kanal",
      context: "Pilot program sa firmama — ZenFlow kao korporativni wellness benefit. Novi revenue stream van DTC modela.",
      kpis: [
        { label: "B2B Revenue", value: null, delta: null, deltaType: "base" },
        { label: "Korporativni Klijenti", value: null, delta: null, deltaType: "base" },
        { label: "DTC Revenue", value: null, delta: null, deltaType: "up" },
        { label: "Total Revenue", value: null, delta: null, deltaType: "up" },
      ]
    },

    {
      id: "q3-2027",
      label: "Q3 2027",
      shortLabel: "Q3 '27",
      type: "growth",
      icon: "🚀",
      title: "EU Ekspanzija",
      context: "Pilot za EU tržište — dijaspora i expat zajednice kao entry point. Priprema za sertifikacije i regulatorne zahteve.",
      kpis: [
        { label: "EU Revenue", value: null, delta: null, deltaType: "base" },
        { label: "Total Revenue", value: null, delta: null, deltaType: "up" },
        { label: "Market Coverage", value: null, delta: null, deltaType: "base" },
        { label: "Brand Awareness EU", value: null, delta: null, deltaType: "base" },
      ]
    },

    {
      id: "q4-2027",
      label: "Q4 2027",
      shortLabel: "Q4 '27",
      type: "milestone",
      icon: "🏅",
      title: "3-Godišnji Milestone",
      context: "Pregled ostvarenih KPIja u odnosu na projekcije. NuroLab kao etablirani cognitive performance brend u regionu sa EU prisustvom.",
      kpis: [
        { label: "3Y Revenue", value: null, delta: null, deltaType: "base" },
        { label: "Total Korisnici", value: null, delta: null, deltaType: "base" },
        { label: "Market Share", value: null, delta: null, deltaType: "base" },
        { label: "NPS", value: null, delta: null, deltaType: "base" },
      ],
      chartData: [
        { date: new Date(2025, 0, 1), value: 0 },
        { date: new Date(2025, 3, 1), value: 0 },
        { date: new Date(2025, 6, 1), value: 0 },
        { date: new Date(2025, 9, 1), value: 0 },
        { date: new Date(2026, 0, 1), value: 0 },
        { date: new Date(2026, 3, 1), value: 0 },
        { date: new Date(2026, 6, 1), value: 0 },
        { date: new Date(2026, 9, 1), value: 0 },
        { date: new Date(2027, 0, 1), value: 0 },
        { date: new Date(2027, 3, 1), value: 0 },
        { date: new Date(2027, 6, 1), value: 0 },
        { date: new Date(2027, 9, 1), value: 0 },
      ]
    },
  ]
}
