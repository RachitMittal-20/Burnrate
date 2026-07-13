'use client'

import { motion } from 'framer-motion'

const LINES = [
  { text: '> Scanning hero section...', color: 'text-green-400' },
  { text: "> CTA found: 'Click Here' 😬", color: 'text-yellow-400' },
  { text: '> Value prop: MISSING ❌', color: 'text-red-400' },
  { text: '> Social proof: NONE ❌', color: 'text-red-400' },
  { text: '> Score: 23/100 💀', color: 'text-red-500 font-bold text-[10px]' },
]

export function TerminalView() {
  return (
    <div className="h-full p-3 font-mono" style={{ background: '#0d1117' }}>
      <p className="mb-2 text-[9px] text-green-400">burnrate@audit:~$ analyzing...</p>
      {LINES.map((line, i) => (
        <motion.p
          key={line.text}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.6, duration: 0.3 }}
          className={`mb-1 text-[8px] leading-relaxed ${line.color}`}
        >
          {line.text}
        </motion.p>
      ))}
    </div>
  )
}
