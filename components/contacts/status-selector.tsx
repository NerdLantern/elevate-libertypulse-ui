'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { STATUSES, type ProspectStatus } from '@/lib/mock-data'
import { statusMeta } from '@/lib/ui-meta'

export function StatusSelector({
  value,
  onChange,
}: {
  value: ProspectStatus
  onChange: (v: ProspectStatus) => void
}) {
  return (
    <div className="grid grid-cols-3 gap-1 rounded-2xl border border-border bg-secondary/40 p-1.5">
      {STATUSES.map((s) => {
        const active = value === s
        const meta = statusMeta[s]
        return (
          <button
            key={s}
            type="button"
            onClick={() => onChange(s)}
            className={cn(
              'relative flex items-center justify-center gap-1.5 rounded-xl px-2 py-2 text-xs font-medium transition-colors',
              active ? meta.text : 'text-muted-foreground hover:text-foreground',
            )}
          >
            {active && (
              <motion.span
                layoutId="status-pill"
                className="absolute inset-0 rounded-xl bg-card shadow-sm ring-1 ring-border"
                transition={{ type: 'spring', stiffness: 420, damping: 34 }}
              />
            )}
            <span className={cn('relative size-1.5 rounded-full', meta.dot)} />
            <span className="relative">{s}</span>
          </button>
        )
      })}
    </div>
  )
}
