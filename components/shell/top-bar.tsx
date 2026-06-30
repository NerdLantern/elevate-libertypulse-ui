'use client'

import { motion } from 'framer-motion'
import { Bell, RefreshCw } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

export function TopBar() {
  const [spinning, setSpinning] = useState(false)

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-end gap-2 border-b border-border/70 bg-background/70 px-6 backdrop-blur-xl">
      <button
        type="button"
        onClick={() => {
          setSpinning(true)
          setTimeout(() => setSpinning(false), 800)
        }}
        className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-medium text-muted-foreground shadow-sm transition-colors hover:text-foreground"
      >
        <RefreshCw className={cn('size-3.5', spinning && 'animate-spin')} />
        Refresh Data
      </button>

      <button
        type="button"
        className="relative inline-flex size-9 items-center justify-center rounded-full border border-border bg-card text-muted-foreground shadow-sm transition-colors hover:text-foreground"
        aria-label="Notifications"
      >
        <Bell className="size-4" />
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -right-0.5 -top-0.5 inline-flex min-w-[18px] items-center justify-center rounded-full bg-pulse-red px-1 text-[0.6rem] font-bold text-white ring-2 ring-background"
        >
          9+
        </motion.span>
      </button>
    </header>
  )
}
