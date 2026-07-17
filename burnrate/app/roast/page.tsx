'use client'

import { Suspense, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/navbar'
import { ScoreRing } from '@/components/score-ring'
import { RoastCard } from '@/components/roast-card'
import { CompareView } from '@/components/compare-view'
import { RefineBox } from '@/components/refine-box'
import FireflyBg from '@/components/firefly-bg'
import type { PageContent, RoastReport } from '@/types'

const LOADING_MESSAGES = [
  'Fetching your page... 🔍',
  'Reading your copy...',
  'Analyzing your CTAs...',
  'Preparing the roast... 🔥',
  'Almost ready to hurt your feelings...',
]

function LoadingScreen() {
  const [messageIndex, setMessageIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((i) => (i + 1) % LOADING_MESSAGES.length)
    }, 1500)
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

function RoastPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const url = searchParams.get('url')

  const [pageContent, setPageContent] = useState<PageContent | null>(null)
  const [roastReport, setRoastReport] = useState<RoastReport | null>(null)
  const [error, setError] = useState(false)
  const [isRebuilding, setIsRebuilding] = useState(false)
  const [rebuiltHtml, setRebuiltHtml] = useState<string | null>(null)
  const [rebuildError, setRebuildError] = useState<string | null>(null)
  const [isRefining, setIsRefining] = useState(false)

  useEffect(() => {
    if (!url) {
      router.push('/')
      return
    }
    async function run() {
      try {
        const scrapeRes = await fetch('/api/scrape', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url }),
        })
        if (!scrapeRes.ok) throw new Error('scrape_failed')
        const content: PageContent = await scrapeRes.json()
        setPageContent(content)

        const roastRes = await fetch('/api/roast', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ pageContent: content }),
        })
        if (!roastRes.ok) throw new Error('roast_failed')
        const report: RoastReport = await roastRes.json()
        console.log('REPORT:', JSON.stringify(report))
        setRoastReport(report)
      } catch {
        setError(true)
      }
    }
    run()
  }, [url, router])

  async function handleRebuild() {
    if (!pageContent || !roastReport) return
    setIsRebuilding(true)
    setRebuildError(null)
    try {
      const res = await fetch('/api/rebuild', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pageContent, roastReport }),
      })
      if (res.status === 422 || res.status === 429) {
        const { error } = await res.json()
        setRebuildError(error)
        return
      }
      const html = await res.text()
      setRebuiltHtml(html)
    } finally {
      setIsRebuilding(false)
    }
  }

  async function handleRefine(instruction: string) {
    setIsRefining(true)
    try {
      const res = await fetch('/api/refine', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentHtml: rebuiltHtml, instruction }),
      })
      if (!res.ok) throw new Error('refine_failed')
      const newHtml = await res.text()
      setRebuiltHtml(newHtml)
    } catch {
      // silently keep old html, could add a toast later
    } finally {
      setIsRefining(false)
    }
  }

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 text-center">
        <p className="text-lg text-white/60">Something went wrong roasting that page.</p>
        <a href="/" className="text-orange-400 underline">Try another URL</a>
      </div>
    )
  }

  if (!pageContent || !roastReport) {
    return <LoadingScreen />
  }

  const items = roastReport?.items ?? []
  const score = roastReport?.overallScore ?? 0
  const verdict = roastReport?.verdict ?? 'Analysis complete'

  return (
    <div className="relative min-h-screen">
      <FireflyBg />
      <Navbar />
      <div className="mx-auto max-w-4xl px-6 pb-24 pt-32">
        <div className="flex flex-col items-center">
          <ScoreRing score={score} />
          <p className="mx-auto mt-6 max-w-2xl text-center text-2xl font-bold italic text-white/90">
            {verdict}
          </p>
        </div>

        {roastReport && items.length === 0 ? (
          <p className="mt-12 text-center text-white/50">
            Could not parse roast results. Try another URL.
          </p>
        ) : (
          <div className="mt-12 flex flex-col gap-4">
            {items.map((item, i) => (
              <RoastCard key={i} item={item} index={i} />
            ))}
          </div>
        )}

        {!rebuiltHtml && (
          <div className="mt-16 flex flex-col items-center gap-4 text-center">
            <p className="text-lg text-white/60">Ready to see what this page SHOULD look like?</p>
            <motion.button
              whileHover={{ scale: 1.03 }}
              disabled={isRebuilding}
              onClick={handleRebuild}
              className="rounded-xl px-8 py-4 text-lg font-semibold text-white disabled:opacity-70"
              style={{ background: 'linear-gradient(135deg, #ff4d00, #ff8a00)' }}
            >
              {isRebuilding ? (
                <span className="flex items-center gap-2">
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  Rebuilding... 🔥
                </span>
              ) : (
                'Rebuild it 🔥'
              )}
            </motion.button>

            {rebuildError && (
              <div className="mt-4 max-w-md rounded-xl border border-orange-500/30 bg-orange-500/10 p-4 text-sm text-orange-200">
                {rebuildError}
              </div>
            )}
          </div>
        )}

        {rebuiltHtml && <CompareView pageContent={pageContent} rebuiltHtml={rebuiltHtml} />}
        {rebuiltHtml && <RefineBox onRefine={handleRefine} isLoading={isRefining} />}
      </div>
    </div>
  )
}

export default function RoastPage() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <RoastPageContent />
    </Suspense>
  )
}
