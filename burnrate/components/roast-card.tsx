'use client'

import { motion } from 'framer-motion'
import type { RoastItem } from '@/types'

const SEVERITY_STYLES: Record<RoastItem['severity'], string> = {
  critical: 'bg-red-500/20 text-red-400 border border-red-500/30',
  major: 'bg-orange-500/20 text-orange-400 border border-orange-500/30',
  minor: 'bg-zinc-700 text-zinc-400 border border-zinc-600',
}

export function RoastCard({ item, index }: { item: RoastItem; index: number }) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.15 }}
      className="rounded-2xl p-6"
      style={{
        background: 'rgba(255, 255, 255, 0.03)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.05)',
      }}
    >
      <div className="flex items-center justify-between gap-3">
        <span className={`rounded-full px-3 py-1 text-xs font-medium uppercase ${SEVERITY_STYLES[item.severity]}`}>
          {item.severity}
        </span>
        <span className="text-sm text-white/50">{item.section}</span>
        <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-400">{item.principle}</span>
      </div>

      <p className="mt-3 text-base font-medium text-white">{item.problem}</p>

      <div
        className="mt-3 rounded-xl border p-4 backdrop-blur"
        style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.06)' }}
      >
        <p className="mb-1 text-xs font-semibold text-orange-400">💡 Fix</p>
        <p className="text-sm leading-relaxed text-white/70">{item.fix}</p>
      </div>
    </motion.div>
  )
}
