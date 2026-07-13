'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

type Props = {
  onSubmit: (url: string) => void
  isLoading: boolean
}

const PLACEHOLDERS = [
  'https://yoursite.com',
  'https://example-startup.com',
  'https://my-saas-product.com',
]

function isValidUrl(value: string) {
  try {
    const url = new URL(value)
    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch {
    return false
  }
}

export function UrlInput({ onSubmit, isLoading }: Props) {
  const [value, setValue] = useState('')
  const [error, setError] = useState(false)
  const [placeholderIndex, setPlaceholderIndex] = useState(0)
  const [isBursting, setIsBursting] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((i) => (i + 1) % PLACEHOLDERS.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!isValidUrl(value)) {
      setError(true)
      return
    }
    setError(false)
    setIsBursting(true)
    setTimeout(() => setIsBursting(false), 300)
    onSubmit(value)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto w-full max-w-lg rounded-2xl border border-white/8 p-6 backdrop-blur-xl"
      style={{ background: 'rgba(255,255,255,0.03)' }}
    >
      <input
        value={value}
        onChange={(e) => {
          setValue(e.target.value)
          setError(false)
        }}
        placeholder={PLACEHOLDERS[placeholderIndex]}
        className={`w-full rounded-xl border px-5 py-4 text-base text-white outline-none placeholder:text-white/25 ${
          error ? 'border-red-500/40 ring-1 ring-red-500/40' : 'border-white/10 focus:border-orange-500/30 focus:ring-1 focus:ring-orange-500/40'
        }`}
        style={{ background: 'rgba(255,255,255,0.05)' }}
      />

      <motion.button
        type="submit"
        disabled={isLoading}
        animate={isBursting ? { scale: [1, 1.05, 0.98, 1] } : { scale: 1 }}
        whileHover={{ boxShadow: '0 0 40px rgba(255,77,0,0.6)' }}
        initial={{ boxShadow: '0 0 0px rgba(255,77,0,0)' }}
        transition={{ duration: 0.3 }}
        className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl py-4 text-base font-semibold text-white disabled:opacity-70"
        style={{ background: 'linear-gradient(135deg, #ff4d00, #ff8a00)' }}
      >
        {isLoading ? (
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
        ) : (
          'Roast it 🔥'
        )}
      </motion.button>
      {error && <p className="mt-2 text-sm text-red-400">Enter a valid URL, starting with http:// or https://</p>}
    </form>
  )
}
