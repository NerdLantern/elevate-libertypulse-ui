'use client'

import { motion } from 'framer-motion'
import { MoreHorizontal } from 'lucide-react'
import type { SalesRep } from '@/lib/mock-data'
import { QuotaBar } from './quota-bar'
import { RepAvatar } from './rep-avatar'

const cols =
  'grid grid-cols-[1.7fr_1fr_0.7fr_1.7fr_0.9fr_0.9fr_0.7fr_0.9fr_0.7fr_0.8fr_0.9fr_0.5fr] items-center gap-3'

export function RepsTable({ reps }: { reps: SalesRep[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <div
        className={`${cols} border-b border-border bg-secondary/40 px-5 py-3 text-[0.6rem] font-semibold uppercase tracking-wider text-muted-foreground`}
      >
        <span>Rep</span>
        <span>Title</span>
        <span>Product</span>
        <span>Quota</span>
        <span>YTD Sales</span>
        <span>Status</span>
        <span className="text-center">Vendors</span>
        <span>Pipeline</span>
        <span className="text-center">Won 30d</span>
        <span className="text-center">Win Rate</span>
        <span className="text-center">Avg Pulse</span>
        <span className="text-right">Actions</span>
      </div>

      <div>
        {reps.map((r, i) => (
          <motion.div
            key={r.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.35 }}
            className={`${cols} border-b border-border/60 px-5 py-4 text-sm transition-colors last:border-0 hover:bg-secondary/50`}
          >
            <div className="flex items-center gap-2 min-w-0">
              <RepAvatar name={r.name} rank={r.rank} index={i} />
              <span className="truncate font-semibold text-foreground">
                {r.name}
              </span>
            </div>

            <span className="truncate text-muted-foreground">{r.title}</span>
            <span className="text-muted-foreground">{r.product}</span>

            <div className="pr-3">
              <QuotaBar value={r.quota} delay={i * 0.05} />
            </div>

            <span className="font-medium text-foreground">{r.ytdSales}</span>

            <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
              <span className="size-1.5 rounded-full bg-emerald-500" />
              Active
            </span>

            <span className="text-center text-muted-foreground">{r.vendors}</span>
            <span className="font-medium text-foreground">{r.pipeline}</span>
            <span className="text-center text-muted-foreground">{r.won30d}</span>
            <span className="text-center text-muted-foreground">{r.winRate}%</span>

            <div className="flex justify-center">
              <span className="inline-flex min-w-[2.25rem] items-center justify-center rounded-full bg-brand/10 px-2 py-0.5 text-xs font-bold text-brand">
                {r.avgPulse}
              </span>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                aria-label="Actions"
                className="flex size-7 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                <MoreHorizontal className="size-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
