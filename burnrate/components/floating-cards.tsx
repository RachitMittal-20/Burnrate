'use client'

import { motion } from 'framer-motion'

const CARDS = [
  {
    label: '🔥 Critical',
    text: 'Hero has no clear value proposition',
    className: '-top-12 left-0',
    duration: 3.4,
    delay: 0,
  },
  {
    label: '⚡ Impulsive Early Adopter',
    text: "Where's the signup?! I'm ready NOW",
    className: '-bottom-16 -right-4',
    duration: 3.8,
    delay: 0.6,
  },
  {
    label: '💡 Fix',
    text: 'Rewrite headline to state the outcome',
    className: '-bottom-16 left-8',
    duration: 3.2,
    delay: 1.2,
  },
]

export function FloatingCards() {
  return (
    <div className="pointer-events-none absolute inset-0 z-20 hidden md:block">
      {CARDS.map((card) => (
        <motion.div
          key={card.label}
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: card.duration, delay: card.delay, repeat: Infinity, ease: 'easeInOut' }}
          className={`absolute max-w-40 rounded-xl border border-zinc-800 p-3 text-xs backdrop-blur ${card.className}`}
        >
          <p className="mb-1 font-semibold text-white">{card.label}</p>
          <p className="text-white/50">{card.text}</p>
        </motion.div>
      ))}
    </div>
  )
}
