import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { DATA } from "@/data/timeline-data";
import { FilterBar } from "@/components/FilterBar";
import { KPICard } from "@/components/KPICard";
import { TimelineInteractive } from "@/components/TimelineInteractive";
import { TypeLegend } from "@/components/TypeLegend";
import { FocusHook } from "@/components/FocusHook";
import { ScenarioPill } from "@/components/ScenarioPill";
import type { Scenario } from "@/data/kpi-values";

export const Route = createFileRoute("/")({
  component: NuroLabDashboard,
});

// Q3'26–Q4'28 — 10 quarters total
// y1 = Q3-Q4 2026 (idx 0-1)
// y2 = Q1-Q4 2027 (idx 2-5)
// y3 = Q1-Q4 2028 (idx 6-9)
const PRESET_RANGES: Record<string, [number, number]> = {
  y1: [0, 1],
  y2: [2, 5],
  y3: [6, 9],
  all: [0, 9],
};

function NuroLabDashboard() {
  const [selectedKpis, setSelectedKpis] = useState<string[]>(["Revenue"]);
  const [activeIndexInView, setActiveIndexInView] = useState(0);
  const [scenario, setScenario] = useState<Scenario>("base");

  // Always show full 3Y period
  const [start, end] = PRESET_RANGES["all"];
  const visibleQuarters = useMemo(
    () => DATA.quarters.slice(start, end + 1),
    [start, end]
  );

  const safeIndex = Math.min(activeIndexInView, visibleQuarters.length - 1);
  const activeQuarter = visibleQuarters[safeIndex];
  const globalIndex = start + safeIndex;

  function handleToggleKpi(k: string) {
    setSelectedKpis((prev) =>
      prev.includes(k) ? prev.filter((x) => x !== k) : [...prev, k]
    );
  }

  return (
    <main className="page-root">
      {/* ── Header ── */}
      <div
        className="area-header"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "18px 28px 14px",
          borderBottom: "1px solid var(--border)",
        }}
      >
        {/* NuroLab wordmark */}
        <div
          style={{
            background: "rgba(126,179,212,0.06)",
            border: "1px solid rgba(126,179,212,0.18)",
            borderRadius: 8,
            padding: "6px 14px",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: 16,
              fontWeight: 400,
              color: "var(--text)",
              letterSpacing: "0.02em",
            }}
          >
            NuroLab
          </span>
        </div>

        {/* ZenFlow */}
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: 16,
            fontWeight: 300,
            color: "var(--text)",
            letterSpacing: "0.08em",
          }}
        >
          ZenFlow
        </div>
      </div>

      {/* ── Filter bar ── */}
      <div className="area-filters">
        <FilterBar
          selectedKpis={selectedKpis}
          onToggleKpi={handleToggleKpi}
        />
      </div>

      {/* ── KPI Display ── */}
      <div
        className="area-kpi"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        {activeQuarter && (
          <KPICard
            quarter={activeQuarter}
            globalIndex={globalIndex}
            kpiLabels={selectedKpis}
            scenario={scenario}
          />
        )}
      </div>

      {/* ── Timeline ── */}
      <div
        className="area-timeline"
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          paddingTop: 20,
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div style={{ borderBottom: "1px solid var(--border)" }}>
          <TimelineInteractive
            quarters={visibleQuarters}
            activeIndex={safeIndex}
            onActiveChange={setActiveIndexInView}
            kpiLabels={selectedKpis}
            startOffset={start}
            scenario={scenario}
          />
        </div>
        <TypeLegend />
      </div>

      {/* ── Footer ── */}
      <div
        className="area-footer"
        style={{
          padding: "10px 28px 16px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-label)",
            fontSize: 10,
            color: "var(--text-dim)",
            letterSpacing: "0.15em",
          }}
        >
          BCA SEE SUMMER TOURNAMENT 2026
        </span>
        <a
          href="https://www.linkedin.com/in/gavrilo-dodi%C4%87/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: "var(--font-label)",
            fontSize: 11,
            color: "var(--accent)",
            letterSpacing: "0.12em",
            textDecoration: "underline",
            textUnderlineOffset: "3px",
          }}
        >
          made by gavrilo
        </a>
      </div>

      {/* ── Scenario Pill (floating) ── */}
      <ScenarioPill scenario={scenario} onScenario={setScenario} />

      <FocusHook />
    </main>
  );
}
