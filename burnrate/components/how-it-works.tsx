'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const STEPS = [
  { icon: '🔗', title: 'Paste your URL', desc: 'Drop in any live landing page.' },
  { icon: '🔥', title: 'Get roasted by AI', desc: 'A brutally honest, section-by-section teardown.' },
  { icon: '🎭', title: 'Meet your focus group', desc: 'Five AI personas react in real time.' },
]

function StepCard({ step, index }: { step: (typeof STEPS)[number]; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const numberDelay = index * 0.3
  const cardDelay = index * 0.3 + 1

  return (
    <div ref={ref} className="relative pt-6">
      <motion.div
        initial={{ x: -40, opacity: 0 }}
        animate={isInView ? { x: 0, opacity: 1 } : { x: -40, opacity: 0 }}
        transition={{ duration: 0.5, delay: numberDelay }}
        className="absolute -left-14 top-0 z-0 flex h-full select-none items-center bg-clip-text text-[160px] font-black leading-none text-transparent"
        style={{ backgroundImage: 'linear-gradient(180deg, rgba(249,115,22,0.6), rgba(217,119,6,0.2))', pointerEvents: 'none' }}
      >
        {index + 1}
      </motion.div>

      <motion.div
        initial={{ x: -40, opacity: 0 }}
        animate={isInView ? { x: 0, opacity: 1 } : { x: -40, opacity: 0 }}
        whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.07)', borderColor: 'rgba(255,77,0,0.25)' }}
        transition={{ duration: 0.5, delay: cardDelay, backgroundColor: { duration: 0.3 }, borderColor: { duration: 0.3 }, scale: { duration: 0.3 } }}
        className="h-50 relative z-10 flex flex-col items-start rounded-2xl border p-8 backdrop-blur-xl"
        style={{
          background: 'rgba(255,255,255,0.04)',
          borderColor: 'rgba(255,255,255,0.08)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
        }}
      >
        <span
          className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl text-xl"
          style={{ background: 'linear-gradient(135deg, #ff4d00, #ff8a00)' }}
        >
          {step.icon}
        </span>
        <h3 className="mb-2 text-xl font-semibold text-white">{step.title}</h3>
        <p className="text-sm leading-relaxed text-white/40">{step.desc}</p>
      </motion.div>
    </div>
  )
}

export function HowItWorks() {
  return (
    <section id="how-it-works" className="mx-auto w-full max-w-5xl px-6 py-40">
      <p
        className="mb-3 bg-clip-text text-center text-sm uppercase tracking-widest text-transparent"
        style={{ backgroundImage: 'linear-gradient(135deg, #ff4d00, #ff8a00)' }}
      >
        How it works
      </p>
      <h2 className="mb-20 text-center text-5xl font-black text-white">Three steps. Zero mercy.</h2>

      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-20 md:grid-cols-3">
        {STEPS.map((step, i) => (
          <StepCard key={step.title} step={step} index={i} />
        ))}
      </div>
    </section>
  )
}
