
import { useEffect, useState, useCallback, useRef } from 'react'

export function FocusHook() {
  const [show, setShow] = useState(false)
  const [visible, setVisible] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const dismiss = useCallback(() => setShow(false), [])

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => setShow(true), 18000)
  }, [])

  useEffect(() => {
    resetTimer()
    const events = ['pointermove', 'pointerdown', 'keydown', 'scroll']
    events.forEach((e) => window.addEventListener(e, resetTimer, { passive: true }))
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
      events.forEach((e) => window.removeEventListener(e, resetTimer))
    }
  }, [resetTimer])

  useEffect(() => {
    if (show) {
      const t = setTimeout(() => setVisible(true), 50)
      return () => clearTimeout(t)
    } else {
      setVisible(false)
    }
  }, [show])

  if (!show) return null

  return (
    <div
      onClick={dismiss}
      onTouchStart={dismiss}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        background: 'rgba(13,21,32,0.97)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 16,
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.6s ease',
        cursor: 'pointer',
      }}
    >
      <div style={{
        width: 1,
        height: 48,
        background: 'linear-gradient(to bottom, transparent, var(--accent))',
        marginBottom: 8,
      }} />
      <div style={{
        fontFamily: 'var(--font-serif)',
        fontSize: 32,
        fontWeight: 300,
        color: 'var(--text)',
        letterSpacing: '-0.01em',
        textAlign: 'center',
        lineHeight: 1.2,
      }}>
        Nestao ti je fokus?
      </div>
      <div style={{
        fontFamily: 'var(--font-label)',
        fontSize: 11,
        color: 'var(--accent)',
        letterSpacing: '0.2em',
        textAlign: 'center',
      }}>
        MOŽDA TI TREBA ZENFLOW
      </div>
      <div style={{
        marginTop: 32,
        fontFamily: 'var(--font-label)',
        fontSize: 9,
        color: 'var(--text-dim)',
        letterSpacing: '0.15em',
      }}>
        TAPNI DA NASTAVIŠ
      </div>
    </div>
  )
}
