'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/navbar'
import { PersonaCard } from '@/components/persona-card'
import type { PersonaVerdict } from '@/types'

const LOADING_MESSAGES = [
  'Gathering your focus group... 🎭',
  'Briefing the skeptical CTO...',
  'Waking up the impulsive early adopter...',
  "Everyone's taking their seats...",
]

function LoadingScreen() {
  const [messageIndex, setMessageIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((i) => (i + 1) % LOADING_MESSAGES.length)
    }, 1400)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6">
      <svg width={64} height={64} viewBox="0 0 64 64" className="animate-spin">
        <defs>
          <linearGradient id="spinner-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff4d00" />
            <stop offset="100%" stopColor="#ff8a00" />
          </linearGradient>
        </defs>
        <circle cx={32} cy={32} r={26} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth={6} />
        <circle
          cx={32}
          cy={32}
          r={26}
          fill="none"
          stroke="url(#spinner-gradient)"
          strokeWidth={6}
          strokeLinecap="round"
          strokeDasharray={163}
          strokeDashoffset={110}
        />
      </svg>
      <p className="text-lg text-white/60">{LOADING_MESSAGES[messageIndex]}</p>
    </div>
  )
}

function SummaryFooter({ personas, originalUrl }: { personas: PersonaVerdict[]; originalUrl: string | null }) {
  const convertCount = personas.filter((p) => p.wouldConvert).length
  const ratio = convertCount / personas.length

  function handleDownload() {
    const html = sessionStorage.getItem('rebuiltHtml') ?? ''
    const blob = new Blob([html], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'rebuilt-page.html'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: (personas.length * 600) / 1000 + 0.8, duration: 0.5 }}
      className="mx-auto mt-16 max-w-lg rounded-2xl border border-zinc-800 bg-zinc-900/60 p-8 text-center backdrop-blur"
    >
      <p className="text-xl font-bold text-white">{convertCount}/{personas.length} personas would convert</p>
      <div className="mt-4 h-3 overflow-hidden rounded-full bg-zinc-900">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${ratio * 100}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="h-full bg-linear-to-r from-red-500 to-green-500"
        />
      </div>

      <div className="mt-6 flex items-center justify-center gap-4">
        {originalUrl && (
          <a
            href={`/roast?url=${encodeURIComponent(originalUrl)}`}
            className="rounded-xl px-6 py-3 font-semibold text-white"
            style={{ background: 'linear-gradient(135deg, #ff4d00, #ff8a00)' }}
          >
            Re-roast the rebuild →
          </a>
        )}
        <button
          onClick={handleDownload}
          className="rounded-xl border border-zinc-700 bg-zinc-800 px-6 py-3 text-white"
        >
          Download HTML
        </button>
      </div>
    </motion.div>
  )
}

export default function FocusGroupPage() {
  const [rebuiltHtml, setRebuiltHtml] = useState<string | null>(null)
  const [originalUrl, setOriginalUrl] = useState<string | null>(null)
  const [personas, setPersonas] = useState<PersonaVerdict[] | null>(null)
  const [notFound, setNotFound] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    const html = sessionStorage.getItem('rebuiltHtml')
    setOriginalUrl(sessionStorage.getItem('originalUrl'))
    if (!html) {
      setNotFound(true)
      return
    }
    setRebuiltHtml(html)

    async function run() {
      try {
        const res = await fetch('/api/focus-group', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ pageHtml: html }),
        })
        if (!res.ok) throw new Error('focus_group_failed')
        const data: PersonaVerdict[] = await res.json()
        setPersonas(data)
      } catch {
        setError(true)
      }
    }
    run()
  }, [])

  if (notFound) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 text-center">
        <p className="text-lg text-white/60">No page to test yet.</p>
        <a href="/" className="text-orange-400 underline">Back to home</a>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 text-center">
        <p className="text-lg text-white/60">Something went wrong assembling the focus group.</p>
        <a href="/" className="text-orange-400 underline">Try another URL</a>
      </div>
    )
  }

  if (!rebuiltHtml || !personas) {
    return <LoadingScreen />
  }

  return (
    <div className="relative min-h-screen">
      <Navbar />
      <div className="mx-auto max-w-4xl px-6 pb-24 pt-32">
        <h1 className="mb-12 text-center text-3xl font-bold text-white">Your Focus Group Reacts</h1>

        <div className="flex flex-col gap-10">
          {personas.map((persona, i) => (
            <PersonaCard key={i} persona={persona} index={i} />
          ))}
        </div>

        <SummaryFooter personas={personas} originalUrl={originalUrl} />
      </div>
    </div>
  )
}
