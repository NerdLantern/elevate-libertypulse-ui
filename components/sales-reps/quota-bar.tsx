'use client'

import { motion } from 'framer-motion'

export function QuotaBar({ value, delay = 0 }: { value: number; delay?: number }) {
  return (
    <div className="relative h-2 w-full rounded-full bg-secondary">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ delay, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="h-full rounded-full bg-[linear-gradient(90deg,var(--brand),#38bdf8_55%,var(--warning))]"
      />
      <motion.span
        initial={{ opacity: 0, scale: 0.8, left: 0 }}
        animate={{ opacity: 1, scale: 1, left: `${value}%` }}
        transition={{ delay: delay + 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground px-2 py-0.5 text-[0.6rem] font-bold text-background shadow-md"
      >
        {value}%
      </motion.span>
    </div>
  )
}
