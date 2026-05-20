import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { DATA } from "@/data/timeline-data";
import { FilterBar } from "@/components/FilterBar";
import { KPICard } from "@/components/KPICard";
import { TimelineInteractive } from "@/components/TimelineInteractive";
import { TypeLegend } from "@/components/TypeLegend";
import { FocusHook } from "@/components/FocusHook";

export const Route = createFileRoute("/")({
  component: NuroLabDashboard,
});

const PRESET_RANGES: Record<string, [number, number]> = {
  y1: [0, 3],
  y2: [4, 7],
  y3: [8, 11],
  all: [0, 11],
};

function NuroLabDashboard() {
  const [preset, setPreset] = useState("all");
  const [kpi, setKpi] = useState("Revenue");
  const [activeIndexInView, setActiveIndexInView] = useState(0);

  const [start, end] = PRESET_RANGES[preset];
  const visibleQuarters = useMemo(
    () => DATA.quarters.slice(start, end + 1),
    [start, end]
  );

  const safeIndex = Math.min(activeIndexInView, visibleQuarters.length - 1);
  const activeQuarter = visibleQuarters[safeIndex];

  function handlePreset(p: string) {
    setPreset(p);
    setActiveIndexInView(0);
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
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 6,
              border: "1px solid rgba(126,179,212,0.25)",
              background: "rgba(126,179,212,0.06)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "var(--font-serif)",
              fontSize: 14,
              fontWeight: 500,
              color: "var(--nl-accent)",
            }}
          >
            N
          </div>
          <span
            style={{
              fontFamily: "var(--font-label)",
              fontSize: 11,
              letterSpacing: "0.18em",
              color: "var(--text-muted)",
            }}
          >
            NUROLAB
          </span>
        </div>

        <div style={{ textAlign: "right" }}>
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
          <div
            style={{
              fontFamily: "var(--font-label)",
              fontSize: 8,
              color: "var(--text-dim)",
              letterSpacing: "0.12em",
              marginTop: 1,
            }}
          >
            2025 — 2027
          </div>
        </div>
      </div>

      {/* ── Filter bar ── */}
      <div className="area-filters">
        <FilterBar
          preset={preset}
          kpi={kpi}
          onPreset={handlePreset}
          onKpi={setKpi}
        />
      </div>

      {/* ── KPI Display ── */}
      <div
        className="area-kpi"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        {activeQuarter && <KPICard quarter={activeQuarter} kpiLabel={kpi} />}
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
            kpiLabel={kpi}
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
          justifyContent: "center",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-label)",
            fontSize: 8,
            color: "var(--text-dim)",
            letterSpacing: "0.15em",
          }}
        >
          BCA SEE SUMMER TOURNAMENT 2026
        </span>
      </div>

      <FocusHook />
    </main>
  );
}
