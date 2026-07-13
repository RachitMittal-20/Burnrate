'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const COLORS = ['#ff4d00', '#ff8a00', '#ffcc00']

type Particle = {
  id: number
  left: number
  size: number
  color: string
  duration: number
  delay: number
}

function makeParticles(): Particle[] {
  return Array.from({ length: 20 }, (_, id) => ({
    id,
    left: Math.random() * 100,
    size: Math.random() < 0.5 ? 4 : 8,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    duration: 1.5 + Math.random() * 1.5,
    delay: Math.random() * 2,
  }))
}

export function FireParticles() {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    setParticles(makeParticles())
  }, [])

  if (particles.length === 0) return null

  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.left}%`,
            bottom: 0,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
          }}
          animate={{ y: [0, -120], opacity: [0, 1, 0], scale: [1, 0.3] }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  )
}
