'use client'

import { motion, AnimatePresence } from 'framer-motion'

type Props = {
  message: string | null
  variant: 'default' | 'success'
}

export function AiBubble({ message, variant }: Props) {
  return (
    <div className="absolute -right-4 -top-10 z-20">
      <AnimatePresence mode="wait">
        {message && (
          <motion.div
            key={message}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.25 }}
            className={`max-w-[220px] rounded-2xl p-3 text-sm shadow-xl ${
              variant === 'success' ? 'bg-zinc-900 text-white' : 'bg-white text-zinc-900'
            }`}
            style={variant === 'success' ? { border: '1.5px solid transparent', backgroundImage: 'linear-gradient(#18181b,#18181b), linear-gradient(135deg,#ff4d00,#ff8a00)', backgroundOrigin: 'border-box', backgroundClip: 'padding-box, border-box' } : undefined}
          >
            {message}
            <span
              className={`absolute -bottom-1.5 left-6 h-3 w-3 rotate-45 ${
                variant === 'success' ? 'bg-zinc-900' : 'bg-white'
              }`}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
