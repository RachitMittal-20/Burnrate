'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const RADIUS = 54
const CIRCUMFERENCE = 339

function colorForScore(score: number) {
  if (score < 40) return '#ef4444'
  if (score < 70) return '#f97316'
  return '#22c55e'
}

export function ScoreRing({ score }: { score: number }) {
  const [displayed, setDisplayed] = useState(0)

  useEffect(() => {
    const start = Date.now()
    const duration = 1500
    const frame = requestAnimationFrame(function tick() {
      const progress = Math.min(1, (Date.now() - start) / duration)
      setDisplayed(Math.round(progress * score))
      if (progress < 1) requestAnimationFrame(tick)
    })
    return () => cancelAnimationFrame(frame)
  }, [score])

  const color = colorForScore(score)

  return (
    <div
      className="mx-auto max-w-sm rounded-3xl p-10 text-center"
      style={{
        background: 'rgba(255,255,255,0.03)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <div className="relative mx-auto h-45 w-45" style={{ color }}>
        <svg width={180} height={180} viewBox="0 0 120 120" className="-rotate-90" style={{ filter: 'drop-shadow(0 0 20px currentColor)' }}>
          <circle cx={60} cy={60} r={RADIUS} fill="none" className="stroke-zinc-800" strokeWidth={8} />
          <motion.circle
            cx={60}
            cy={60}
            r={RADIUS}
            fill="none"
            stroke={color}
            strokeWidth={8}
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            initial={{ strokeDashoffset: CIRCUMFERENCE }}
            animate={{ strokeDashoffset: CIRCUMFERENCE * (1 - score / 100) }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-5xl font-black text-white">
          {displayed}
        </span>
      </div>
    </div>
  )
}
