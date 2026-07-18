'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import type { PersonaVerdict } from '@/types'

type Props = {
  persona: PersonaVerdict
  index: number
}

export function PersonaCard({ persona, index }: Props) {
  const [showQuote, setShowQuote] = useState(false)

  useEffect(() => {
    const cardDelay = index * 600
    const timer = setTimeout(() => setShowQuote(true), cardDelay + 300 + 500)
    return () => clearTimeout(timer)
  }, [index])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: (index * 600) / 1000, duration: 0.5 }}
      className={`max-w-2xl ${index % 2 === 0 ? 'ml-0' : 'ml-8'}`}
    >
      <div className="flex items-center gap-3">
        <span className="flex h-14 w-14 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-2xl">
          {persona.avatar}
        </span>
        <span className="text-lg font-semibold text-white">{persona.persona}</span>
        <span
          className={`rounded-full border px-3 py-1 text-xs font-medium ${
            persona.wouldConvert
              ? 'border-green-500/30 bg-green-500/20 text-green-400'
              : 'border-red-500/30 bg-red-500/20 text-red-400'
          }`}
        >
          {persona.wouldConvert ? 'WOULD CONVERT' : 'WOULD BOUNCE'}
        </span>
      </div>

      <div className="mt-3 max-w-lg rounded-2xl rounded-tl-sm border border-zinc-800 bg-zinc-900/80 p-4 backdrop-blur">
        {showQuote ? (
          <p className="text-base italic text-white/90">{persona.quote}</p>
        ) : (
          <div className="flex gap-1.5 py-1">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="h-2 w-2 rounded-full bg-white/40"
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
              />
            ))}
          </div>
        )}
      </div>

      <p className="mt-2 text-sm text-white/50">📍 Bounce point: {persona.bouncePoint}</p>
      <p className="mt-1 text-sm text-orange-400/80">💡 {persona.suggestion}</p>
    </motion.div>
  )
}
