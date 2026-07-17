'use client'

import { useState } from 'react'

type Props = {
  onRefine: (instruction: string) => void
  isLoading: boolean
}

const SUGGESTIONS = ['Bigger headline', 'Different color scheme', 'Add more testimonials', 'Simplify layout']

export function RefineBox({ onRefine, isLoading }: Props) {
  const [value, setValue] = useState('')

  function submit() {
    if (!value.trim() || isLoading) return
    onRefine(value)
    setValue('')
  }

  return (
    <div className="mx-auto mt-6 max-w-2xl rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
      <p className="mb-2 text-sm font-medium text-white/70">🔧 Want changes?</p>
      <div className="flex gap-2">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && submit()}
          placeholder="e.g. make the CTA button green, increase headline size..."
          className="flex-1 rounded-xl border border-zinc-700 bg-zinc-900/80 px-4 py-3 text-sm text-white placeholder:text-white/30"
        />
        <button
          onClick={submit}
          disabled={!value.trim() || isLoading}
          className="flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white disabled:opacity-50"
          style={{ background: 'linear-gradient(135deg, #ff4d00, #ff8a00)' }}
        >
          {isLoading ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
              Applying...
            </>
          ) : (
            'Apply ✨'
          )}
        </button>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {SUGGESTIONS.map((suggestion) => (
          <button
            key={suggestion}
            onClick={() => setValue(suggestion)}
            className="rounded-full border border-zinc-700 bg-zinc-800/50 px-3 py-1.5 text-xs text-white/60 transition-colors hover:border-orange-500/40 hover:text-white"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  )
}
