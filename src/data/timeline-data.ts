// NuroLab ZenFlow — Timeline | Q3 2026 – Q2 2029
// Growth triggers from NuroLab_KPI.xlsx

export type QuarterType = 'launch' | 'neutral' | 'milestone' | 'growth' | 'competitor'
export type DeltaType = 'up' | 'down' | 'base'

export interface KPI {
  label: string
  value: string | null
  delta: string | null
  deltaType: DeltaType
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

    // ─── 2026 ────────────────────────────────────────────────────

    {
      id: "q3-2026",
      label: "Q3 2026",
      shortLabel: "Q3 '26",
      type: "launch",
      icon: "🚀",
      title: "Launch",
      context: "NuroLab ZenFlow ulazi na srpsko tržište. DTC model, YouTube kanal osnivača (240k+). Cognitive performance kategorija se kreira od nule.",
      kpis: [
        { label: "Revenue", value: null, delta: null, deltaType: "base" },
        { label: "30d Buyers", value: null, delta: null, deltaType: "base" },
        { label: "90d Buyers", value: null, delta: null, deltaType: "base" },
        { label: "NPS", value: null, delta: null, deltaType: "base" },
      ]
    },

    {
      id: "q4-2026",
      label: "Q4 2026",
      shortLabel: "Q4 '26",
      type: "growth",
      icon: "🎙️",
      title: "Podcast",
      context: "Podcast s lekarom — NPS raste, credibility skok. Organski rast baze kroz authority content. Lojalnost ranih kupaca potvrđena.",
      kpis: [
        { label: "Revenue", value: null, delta: null, deltaType: "up" },
        { label: "30d Buyers", value: null, delta: null, deltaType: "up" },
        { label: "NPS", value: null, delta: null, deltaType: "up" },
        { label: "180d Buyers", value: null, delta: null, deltaType: "base" },
      ]
    },

    // ─── 2027 ────────────────────────────────────────────────────

    {
      id: "q1-2027",
      label: "Q1 2027",
      shortLabel: "Q1 '27",
      type: "competitor",
      icon: "⚡",
      title: "Competitor entry",
      context: "Etablirani brend lansira focus liniju. NPS pada −5. CAC pritisak u paid kanalima. Pioneer lojalnost ostaje NuroLab-ov moat.",
      kpis: [
        { label: "Revenue", value: null, delta: null, deltaType: "down" },
        { label: "30d Buyers", value: null, delta: null, deltaType: "down" },
        { label: "NPS", value: null, delta: null, deltaType: "down" },
        { label: "90d Buyers", value: null, delta: null, deltaType: "down" },
      ]
    },

    {
      id: "q2-2027",
      label: "Q2 2027",
      shortLabel: "Q2 '27",
      type: "milestone",
      icon: "🏆",
      title: "Podcast + Konf. + Comp.",
      context: "Tri okidača istovremeno: podcast epizoda, konferencija + competitor pritisak. NPS odbijanje i rast baze — kategorijska pozicija ojačana.",
      kpis: [
        { label: "Revenue", value: null, delta: null, deltaType: "up" },
        { label: "30d Buyers", value: null, delta: null, deltaType: "up" },
        { label: "NPS", value: null, delta: null, deltaType: "up" },
        { label: "180d Buyers", value: null, delta: null, deltaType: "up" },
      ]
    },

    {
      id: "q3-2027",
      label: "Q3 2027",
      shortLabel: "Q3 '27",
      type: "growth",
      icon: "📈",
      title: "Konf. spillover + Comp.",
      context: "Spillover efekat konferencije nastavlja da vuče — prodaja raste. Competitor prisutan, ali lojalnost 180d baze potvrđuje community moat.",
      kpis: [
        { label: "Revenue", value: null, delta: null, deltaType: "up" },
        { label: "30d Buyers", value: null, delta: null, deltaType: "up" },
        { label: "180d Buyers", value: null, delta: null, deltaType: "up" },
        { label: "NPS", value: null, delta: null, deltaType: "up" },
      ]
    },

    {
      id: "q4-2027",
      label: "Q4 2027",
      shortLabel: "Q4 '27",
      type: "milestone",
      icon: "🎙️",
      title: "Podcast + Comp.",
      context: "Podcast + competitor pritisak — dvostruki signal. Rast uprkos konkurenciji potvrđuje brand strength. Kraj prve pune godine post-launch.",
      kpis: [
        { label: "Revenue", value: null, delta: null, deltaType: "up" },
        { label: "NPS", value: null, delta: null, deltaType: "up" },
        { label: "90d Buyers", value: null, delta: null, deltaType: "up" },
        { label: "180d Buyers", value: null, delta: null, deltaType: "up" },
      ]
    },

    // ─── 2028 ────────────────────────────────────────────────────

    {
      id: "q1-2028",
      label: "Q1 2028",
      shortLabel: "Q1 '28",
      type: "competitor",
      icon: "⚡",
      title: "Competitor",
      context: "Novi competitor talas. Sezonski pad (post-holiday). Čvrstina 180d baze amortizuje udar. Paid CAC pod pritiskom.",
      kpis: [
        { label: "Revenue", value: null, delta: null, deltaType: "down" },
        { label: "30d Buyers", value: null, delta: null, deltaType: "down" },
        { label: "180d Buyers", value: null, delta: null, deltaType: "base" },
        { label: "NPS", value: null, delta: null, deltaType: "base" },
      ]
    },

    {
      id: "q2-2028",
      label: "Q2 2028",
      shortLabel: "Q2 '28",
      type: "milestone",
      icon: "🏆",
      title: "Podcast + Konf. + Comp.",
      context: "Rekordni kvartal. Tri aktivatora u sinergiji — najveći NPS rast u istoriji brenda. Kupci svih paketa rastu. Community flywheel potvrđen.",
      kpis: [
        { label: "Revenue", value: null, delta: null, deltaType: "up" },
        { label: "30d Buyers", value: null, delta: null, deltaType: "up" },
        { label: "NPS", value: null, delta: null, deltaType: "up" },
        { label: "180d Buyers", value: null, delta: null, deltaType: "up" },
      ]
    },

    {
      id: "q3-2028",
      label: "Q3 2028",
      shortLabel: "Q3 '28",
      type: "growth",
      icon: "📈",
      title: "Konf. spillover + Comp.",
      context: "Konferencija spillover + competitor dinamika. Stabilan organski rast. 180d Buyers idu prema 200+ — snažna retention osnova za narednu godinu.",
      kpis: [
        { label: "Revenue", value: null, delta: null, deltaType: "up" },
        { label: "30d Buyers", value: null, delta: null, deltaType: "up" },
        { label: "180d Buyers", value: null, delta: null, deltaType: "up" },
        { label: "NPS", value: null, delta: null, deltaType: "up" },
      ]
    },

    {
      id: "q4-2028",
      label: "Q4 2028",
      shortLabel: "Q4 '28",
      type: "milestone",
      icon: "🏅",
      title: "Podcast + Comp.",
      context: "Završni kvartal 3-godišnjeg plana. Podcast + competitor — NuroLab drži poziciju. Buyer baze na vrhuncu. NPS kumulativno raste od lansiranja.",
      kpis: [
        { label: "Revenue", value: null, delta: null, deltaType: "up" },
        { label: "30d Buyers", value: null, delta: null, deltaType: "up" },
        { label: "90d Buyers", value: null, delta: null, deltaType: "up" },
        { label: "NPS", value: null, delta: null, deltaType: "up" },
      ]
    },

    // ─── 2029 ────────────────────────────────────────────────────

    {
      id: "q1-2029",
      label: "Q1 2029",
      shortLabel: "Q1 '29",
      type: "competitor",
      icon: "⚡",
      title: "Competitor",
      context: "Novi competitor talas u Q1. Sezonski pad amortizovan jakom retention bazom. 180d community drži NPS stabilan.",
      kpis: [
        { label: "Revenue", value: null, delta: null, deltaType: "down" },
        { label: "30d Buyers", value: null, delta: null, deltaType: "down" },
        { label: "180d Buyers", value: null, delta: null, deltaType: "base" },
        { label: "NPS", value: null, delta: null, deltaType: "up" },
      ]
    },

    {
      id: "q2-2029",
      label: "Q2 2029",
      shortLabel: "Q2 '29",
      type: "milestone",
      icon: "🏆",
      title: "Podcast + Konf. + Comp.",
      context: "Tri aktivatora u sinergiji — rekordni kvartal. Konferencija + podcast + competitor pritisak. NPS skok, buyer baza na novom maksimumu.",
      kpis: [
        { label: "Revenue", value: null, delta: null, deltaType: "up" },
        { label: "30d Buyers", value: null, delta: null, deltaType: "up" },
        { label: "NPS", value: null, delta: null, deltaType: "up" },
        { label: "180d Buyers", value: null, delta: null, deltaType: "up" },
      ]
    },

  ]
}
