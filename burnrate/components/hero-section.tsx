'use client'

import { motion } from 'framer-motion'
import { UrlInput } from '@/components/url-input'
import { FireParticles } from '@/components/fire-particles'
import { FloatingCards } from '@/components/floating-cards'
import { HeroDemo } from '@/components/hero-demo'
import { fadeUp, stagger } from '@/lib/motion'

const LINE_1 = 'Your landing page'
const LINE_2 = 'is bleeding money.'
const EMBER_WORDS = ['bleeding', 'money.']

type Props = {
  onSubmit: (url: string) => void
  isLoading: boolean
}

function HeadlineLine({ text }: { text: string }) {
  return (
    <>
      {text.split(' ').map((word, i) => {
        const isEmber = EMBER_WORDS.includes(word)
        return (
          <motion.span
            key={i}
            variants={fadeUp}
            className="mr-4 inline-block"
            style={
              isEmber
                ? {
                    backgroundImage: 'linear-gradient(90deg, #ff4d00, #ff8a00)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    color: 'transparent',
                  }
                : undefined
            }
          >
            {word}
          </motion.span>
        )
      })}
    </>
  )
}

export function HeroSection({ onSubmit, isLoading }: Props) {
  return (
    <section className="relative flex min-h-screen flex-col items-center gap-12 px-6 py-24 md:flex-row md:px-16">
      <FireParticles />

      <div className="flex flex-col items-center gap-6 text-center md:w-1/2 md:items-start md:text-left">
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-1.5 text-sm text-white/60 backdrop-blur"
          style={{ background: 'rgba(255,255,255,0.05)' }}
        >
          🔥 AI-Powered Page Auditor
        </motion.span>

        <motion.h1
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="max-w-xl text-6xl font-black leading-none text-white md:text-7xl"
        >
          <div>
            <HeadlineLine text={LINE_1} />
          </div>
          <div>
            <HeadlineLine text={LINE_2} />
          </div>
        </motion.h1>

        <motion.p
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ delay: 0.6 }}
          className="max-w-lg tracking-wide text-white/40 md:text-lg"
        >
          Paste a URL. Get roasted by AI. Rebuild it. Test with 5 real personas.
        </motion.p>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ delay: 0.8 }}
          className="w-full max-w-lg"
        >
          <UrlInput onSubmit={onSubmit} isLoading={isLoading} />
        </motion.div>

        <p className="text-center text-sm text-white/25 md:text-left">
          No signup needed. Your first roast is on us.
        </p>
      </div>

      <div className="relative hidden items-center justify-center md:-mt-4 md:flex md:w-1/2">
        <FloatingCards />
        <HeroDemo />
      </div>
    </section>
  )
}
