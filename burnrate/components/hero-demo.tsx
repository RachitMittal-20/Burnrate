'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useFireCanvas } from '@/lib/use-fire-canvas'
import { DIALOGUE_SETS, SUCCESS_MESSAGE, pickDialogueSet } from '@/lib/dialogue-sets'
import { AiBubble } from '@/components/ai-bubble'
import { BadSite } from '@/components/bad-site'
import { GoodSite } from '@/components/good-site'
import { TerminalView } from '@/components/terminal-view'

const CYCLE_MS = 16000

export function HeroDemo() {
  const [t, setT] = useState(0)
  const setIndexRef = useRef(0)
  const [setIndex, setSetIndex] = useState(0)
  const wrappedRef = useRef(false)

  useEffect(() => {
    const start = Date.now()
    const interval = setInterval(() => {
      const elapsed = (Date.now() - start) % CYCLE_MS
      if (elapsed < 100 && !wrappedRef.current) {
        wrappedRef.current = true
        const next = pickDialogueSet(setIndexRef.current)
        setIndexRef.current = next
        setSetIndex(next)
      } else if (elapsed > 100) {
        wrappedRef.current = false
      }
      setT(elapsed)
    }, 100)
    return () => clearInterval(interval)
  }, [])

  const badVisible = t < 3000
  const terminalVisible = t >= 3000 && t < 7000
  const fireActive = t >= 7000 && t < 10500
  const canvasVisible = t >= 7000 && t < 11500
  const goodVisible = t >= 11000
  const canvasRef = useFireCanvas(fireActive)

  const dialogue = DIALOGUE_SETS[setIndex]
  const message =
    t >= 11000
      ? SUCCESS_MESSAGE
      : t >= 7000
        ? dialogue[2]
        : t >= 3000
          ? dialogue[1]
          : t >= 500
            ? dialogue[0]
            : null

  return (
    <motion.div
      initial={{ x: 120, opacity: 0 }}
      animate={{ x: 0, opacity: 1, y: [0, -8, 0] }}
      transition={{ x: { duration: 1.5 }, opacity: { duration: 1.5 }, y: { duration: 4, repeat: Infinity, ease: 'easeInOut' } }}
      className="relative h-70 w-105 max-w-full overflow-visible rounded-xl border border-zinc-700 bg-zinc-900 shadow-2xl"
      style={{ transform: 'perspective(1200px) rotateY(-12deg) rotateX(6deg)' }}
    >
      <AiBubble message={message} variant={goodVisible ? 'success' : 'default'} />

      <div className="flex h-8 items-center gap-1.5 rounded-t-xl bg-zinc-800 px-3">
        <span className="h-3 w-3 rounded-full bg-red-500" />
        <span className="h-3 w-3 rounded-full bg-yellow-500" />
        <span className="h-3 w-3 rounded-full bg-green-500" />
        <span
          className={`mx-4 flex h-4 flex-1 items-center rounded bg-zinc-700 px-2 text-[9px] ${
            goodVisible ? 'text-green-400' : 'text-red-400'
          }`}
        >
          {goodVisible ? 'yoursite.com ✓' : 'yoursite.com'}
        </span>
      </div>

      <div className="relative h-[calc(100%-2rem)] overflow-hidden rounded-b-xl">
        <div className="absolute inset-0 h-full transition-opacity duration-500" style={{ opacity: badVisible ? 1 : 0 }}>
          <BadSite />
        </div>

        <div className="absolute inset-0 h-full transition-opacity duration-500" style={{ opacity: terminalVisible ? 1 : 0 }}>
          <TerminalView />
        </div>

        <div className="absolute inset-0 h-full transition-opacity duration-1000" style={{ opacity: goodVisible ? 1 : 0 }}>
          <GoodSite />
        </div>

        <canvas
          ref={canvasRef}
          className="pointer-events-none absolute inset-0 z-10 h-full w-full transition-opacity duration-500"
          style={{ imageRendering: 'pixelated', opacity: canvasVisible ? 1 : 0 }}
        />
      </div>
    </motion.div>
  )
}
