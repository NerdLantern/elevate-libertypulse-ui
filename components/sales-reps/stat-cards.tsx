'use client'

import { motion } from 'framer-motion'
import { Boxes, Layers, Target } from 'lucide-react'

const cards = [
  {
    icon: Boxes,
    value: '9,167',
    label: 'Case Volumes / Month',
    tone: 'text-pulse-red',
    bg: 'bg-rose-50',
  },
  {
    icon: Layers,
    value: '27,500',
    label: 'Cases per SKU',
    tone: 'text-pulse-red',
    bg: 'bg-rose-50',
  },
] as const

export function StatCards() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {cards.map((c, i) => (
        <motion.div
          key={c.label}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.06, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm"
        >
          <span
            className={`flex size-11 items-center justify-center rounded-xl ${c.bg} ${c.tone}`}
          >
            <c.icon className="size-5" />
          </span>
          <div>
            <p className="font-heading text-2xl font-bold leading-none text-foreground">
              {c.value}
            </p>
            <p className="mt-1.5 text-[0.65rem] font-semibold uppercase tracking-wider text-muted-foreground">
              {c.label}
            </p>
          </div>
        </motion.div>
      ))}

      {/* Quota card */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.12, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="rounded-2xl border border-border bg-card p-5 shadow-sm"
      >
        <div className="flex items-center gap-4">
          <span className="flex size-11 items-center justify-center rounded-xl bg-rose-50 text-pulse-red">
            <Target className="size-5" />
          </span>
          <div className="flex-1">
            <div className="flex items-baseline justify-between">
              <p className="font-heading text-2xl font-bold leading-none text-foreground">
                63%
              </p>
              <span className="text-[0.65rem] font-medium text-muted-foreground">
                0 / 0
              </span>
            </div>
            <p className="mt-1.5 text-[0.65rem] font-semibold uppercase tracking-wider text-muted-foreground">
              Monthly Quota
            </p>
          </div>
        </div>
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-rose-100">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '63%' }}
            transition={{ delay: 0.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="h-full rounded-full bg-pulse-red"
          />
        </div>
      </motion.div>
    </div>
  )
}
