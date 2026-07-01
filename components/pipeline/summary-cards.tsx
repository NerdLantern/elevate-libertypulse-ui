'use client'

import { motion } from 'framer-motion'
import { Package, FileText, Trophy } from 'lucide-react'
import { cn } from '@/lib/utils'
import { AnimatedNumber } from '@/components/lp/animated-number'

interface SummaryStat {
  label: string
  value: number
  prefix?: string
  suffix?: string
  icon: typeof Package
  iconWrap: string
  accent?: string
}

export function SummaryCards({
  totalCases,
  inProposal,
  won,
}: {
  totalCases: number
  inProposal: number
  won: number
}) {
  const stats: SummaryStat[] = [
    {
      label: 'Total Cases',
      value: totalCases,
      icon: Package,
      iconWrap: 'bg-brand/10 text-brand',
    },
    {
      label: 'In Proposal',
      value: inProposal,
      prefix: '$',
      suffix: 'K',
      icon: FileText,
      iconWrap: 'bg-rose-500/10 text-rose-600',
    },
    {
      label: 'Won',
      value: won,
      prefix: '$',
      suffix: 'K',
      icon: Trophy,
      iconWrap: 'bg-emerald-500/10 text-emerald-600',
      accent: 'text-emerald-600',
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {stats.map((s, i) => {
        const Icon = s.icon
        return (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, type: 'spring', stiffness: 260, damping: 24 }}
            className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 shadow-sm"
          >
            <span
              className={cn(
                'flex size-11 items-center justify-center rounded-xl',
                s.iconWrap,
              )}
            >
              <Icon className="size-5" />
            </span>
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                {s.label}
              </div>
              <AnimatedNumber
                value={s.value}
                prefix={s.prefix}
                suffix={s.suffix}
                className={cn(
                  'font-heading text-3xl font-bold text-foreground',
                  s.accent,
                )}
              />
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
