import { useState, useRef, useEffect } from 'react'
import { colorForKpi, MAX_KPI_SELECTION } from '@/data/kpi-values'

const PRESETS = [
  { id: 'y1', label: 'Y1', sub: '2025' },
  { id: 'y2', label: 'Y2', sub: '2026' },
  { id: 'y3', label: 'Y3', sub: '2027' },
  { id: 'all', label: '3Y', sub: 'sve' },
]

export const KPI_OPTIONS = [
  'Revenue',
  'Korisnici',
  'CAC',
  'LTV',
  'NPS',
  'Market Share',
  'Retention',
]

interface FilterBarProps {
  preset: string
  selectedKpis: string[]
  onPreset: (p: string) => void
  onToggleKpi: (k: string) => void
  onReplaceKpi: (oldKpi: string, newKpi: string) => void
}

export function FilterBar({ preset, selectedKpis, onPreset, onToggleKpi, onReplaceKpi }: FilterBarProps) {
  const [replaceTarget, setReplaceTarget] = useState<string | null>(null)
  const popoverRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!replaceTarget) return
    function onDocClick(e: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setReplaceTarget(null)
      }
    }
    document.addEventListener('mousedown', onDocClick)
    return () => document.removeEventListener('mousedown', onDocClick)
  }, [replaceTarget])

  function handleChipClick(k: string) {
    const isSelected = selectedKpis.includes(k)
    const atLimit = selectedKpis.length >= MAX_KPI_SELECTION
    if (!isSelected && atLimit) {
      setReplaceTarget((cur) => (cur === k ? null : k))
      return
    }
    setReplaceTarget(null)
    onToggleKpi(k)
  }

  function handleReplace(oldKpi: string) {
    if (!replaceTarget) return
    onReplaceKpi(oldKpi, replaceTarget)
    setReplaceTarget(null)
  }

  return (
    <div style={{ borderBottom: '1px solid var(--border)' }}>
      {/* Presets */}
      <div style={{ display: 'flex', gap: 4, padding: '10px 20px 10px' }}>
        {PRESETS.map((p) => {
          const active = preset === p.id
          return (
            <button
              key={p.id}
              onClick={() => onPreset(p.id)}
              style={{
                flex: 1,
                padding: '7px 4px',
                borderRadius: 6,
                border: `1px solid ${active ? 'var(--accent)' : 'var(--border-mid)'}`,
                background: active ? 'rgba(126,179,212,0.1)' : 'transparent',
                transition: 'all 0.22s ease',
              }}
            >
              <div style={{
                fontFamily: 'var(--font-label)',
                fontSize: 15,
                fontWeight: active ? 500 : 300,
                color: active ? 'var(--accent)' : 'var(--text-muted)',
                letterSpacing: '0.05em',
              }}>
                {p.label}
              </div>
              <div style={{
                fontFamily: 'var(--font-label)',
                fontSize: 11,
                color: active ? 'rgba(126,179,212,0.6)' : 'var(--text-dim)',
                letterSpacing: '0.08em',
                marginTop: 1,
              }}>
                {p.sub}
              </div>
            </button>
          )
        })}
      </div>

      {/* KPI chips */}
      <div style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        padding: '0 20px 12px',
        overflowX: 'visible',
      }}>
        {KPI_OPTIONS.map((k) => {
          const active = selectedKpis.includes(k)
          const color = active ? colorForKpi(k, selectedKpis) : 'var(--text-dim)'
          const isReplaceTarget = replaceTarget === k
          return (
            <button
              key={k}
              onClick={() => handleChipClick(k)}
              style={{
                flexShrink: 0,
                padding: '6px 12px',
                borderRadius: 20,
                border: `1px solid ${active ? color : isReplaceTarget ? 'var(--accent)' : 'var(--border-mid)'}`,
                background: active ? `${color}1f` : isReplaceTarget ? 'rgba(126,179,212,0.08)' : 'transparent',
                fontFamily: 'var(--font-label)',
                fontSize: 12,
                letterSpacing: '0.08em',
                color: active ? color : isReplaceTarget ? 'var(--accent)' : 'var(--text-dim)',
                transition: 'all 0.22s ease',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              {active && (
                <span style={{
                  width: 6, height: 6, borderRadius: '50%',
                  background: color, display: 'inline-block',
                }} />
              )}
              {k.toUpperCase()}
            </button>
          )
        })}

        <span style={{
          marginLeft: 'auto',
          flexShrink: 0,
          fontFamily: 'var(--font-label)',
          fontSize: 16,
          fontWeight: 500,
          color: selectedKpis.length === MAX_KPI_SELECTION ? 'var(--accent)' : 'var(--text-dim)',
          letterSpacing: '0.1em',
          paddingLeft: 8,
        }}>
          {selectedKpis.length} / {MAX_KPI_SELECTION}
        </span>

        {replaceTarget && (
          <div
            ref={popoverRef}
            style={{
              position: 'absolute',
              top: '100%',
              left: 20,
              right: 20,
              marginTop: 6,
              background: 'var(--bg)',
              border: '1px solid var(--border-mid)',
              borderRadius: 10,
              boxShadow: '0 12px 32px rgba(0,0,0,0.18)',
              padding: '14px 16px',
              zIndex: 50,
            }}
          >
            <div style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 15,
              fontWeight: 500,
              color: 'var(--text)',
              marginBottom: 4,
            }}>
              Zameni KPI
            </div>
            <div style={{
              fontFamily: 'var(--font-label)',
              fontSize: 11,
              color: 'var(--text-dim)',
              letterSpacing: '0.06em',
              marginBottom: 10,
            }}>
              Dosegnut limit od {MAX_KPI_SELECTION}. Izaberi KPI koji ćeš zameniti sa <strong style={{ color: 'var(--accent)' }}>{replaceTarget.toUpperCase()}</strong>.
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {selectedKpis.map((k) => {
                const color = colorForKpi(k, selectedKpis)
                return (
                  <button
                    key={k}
                    onClick={() => handleReplace(k)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      padding: '8px 10px',
                      borderRadius: 6,
                      border: 'none',
                      background: 'transparent',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'background 0.15s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(126,179,212,0.08)')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    <span style={{
                      width: 8, height: 8, borderRadius: '50%',
                      background: color, flexShrink: 0,
                    }} />
                    <span style={{
                      fontFamily: 'var(--font-label)',
                      fontSize: 13,
                      letterSpacing: '0.05em',
                      color: 'var(--text)',
                      flex: 1,
                    }}>
                      {k}
                    </span>
                    <span style={{
                      fontFamily: 'var(--font-label)',
                      fontSize: 10,
                      color: 'var(--text-dim)',
                      letterSpacing: '0.08em',
                    }}>
                      ZAMENI
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
