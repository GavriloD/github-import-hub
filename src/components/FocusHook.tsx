
import { useEffect, useState, useCallback } from 'react'

export function FocusHook() {
  const [show, setShow] = useState(false)
  const [visible, setVisible] = useState(false)

  const reset = useCallback(() => setShow(false), [])

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 18000)
    return () => clearTimeout(timer)
  }, [])

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
      onClick={reset}
      onTouchStart={reset}
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
        fontStyle: 'italic',
        color: 'var(--text)',
        letterSpacing: '-0.01em',
        textAlign: 'center',
        lineHeight: 1.2,
      }}>
        Izgubio si fokus?
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
