'use client'

import { useDroppable } from '@dnd-kit/core'
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus, Inbox } from 'lucide-react'
import { cn } from '@/lib/utils'
import { type Deal, type StageMeta } from '@/lib/pipeline'
import { AnimatedNumber } from '@/components/lp/animated-number'
import { PipelineCard } from './pipeline-card'

export function PipelineColumn({
  meta,
  deals,
  onOpen,
  onAdd,
}: {
  meta: StageMeta
  deals: Deal[]
  onOpen: (deal: Deal) => void
  onAdd: (stage: StageMeta['id']) => void
}) {
  const { setNodeRef, isOver } = useDroppable({ id: meta.id })
  const Icon = meta.icon
  const estCases = deals.reduce((sum, d) => sum + d.estCases, 0)

  return (
    <div className="flex w-[300px] shrink-0 flex-col">
      {/* Header */}
      <div
        className={cn(
          'relative overflow-hidden rounded-t-2xl border border-b-0 border-border bg-gradient-to-b to-transparent px-4 pb-4 pt-3.5',
          meta.tint,
        )}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className={cn('flex size-6 items-center justify-center rounded-lg bg-card shadow-sm ring-1 ring-border', meta.accent)}>
              <Icon className="size-3.5" />
            </span>
            <span
              className={cn(
                'text-xs font-bold uppercase tracking-wider',
                meta.accent,
              )}
            >
              {meta.label}
            </span>
          </div>
          <motion.span
            key={deals.length}
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 500, damping: 22 }}
            className={cn(
              'flex min-w-6 items-center justify-center rounded-full px-1.5 py-0.5 text-xs font-bold',
              meta.chipBg,
              meta.chipText,
            )}
          >
            {deals.length}
          </motion.span>
        </div>
        <div className="mt-2 font-heading text-3xl font-bold text-foreground">
          <AnimatedNumber value={estCases} />
        </div>
        <div className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
          Est. Cases
        </div>
      </div>

      {/* Drop area */}
      <div
        ref={setNodeRef}
        className={cn(
          'lp-scroll flex max-h-[calc(100dvh-320px)] min-h-[320px] flex-1 flex-col gap-2.5 overflow-y-auto rounded-b-2xl border border-t-0 border-border bg-gradient-to-b to-transparent p-2.5 transition-all',
          meta.tint,
          isOver && cn('ring-2 ring-inset', meta.overRing),
        )}
      >
        <SortableContext
          items={deals.map((d) => d.id)}
          strategy={verticalListSortingStrategy}
        >
          <AnimatePresence mode="popLayout">
            {deals.map((deal) => (
              <PipelineCard key={deal.id} deal={deal} onOpen={onOpen} />
            ))}
          </AnimatePresence>
        </SortableContext>

        {deals.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={cn(
              'flex flex-1 flex-col items-center justify-center gap-2 rounded-xl border border-dashed py-10 text-center transition-colors',
              isOver ? 'border-transparent' : 'border-border',
            )}
          >
            <Inbox className="size-6 text-muted-foreground/40" />
            <p className="text-xs font-medium text-muted-foreground">
              {meta.emptyLabel}
            </p>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground/60">
              Drag to add
            </p>
          </motion.div>
        )}

        <button
          type="button"
          onClick={() => onAdd(meta.id)}
          className="mt-auto flex items-center justify-center gap-1.5 rounded-xl border border-dashed border-border py-2 text-xs font-medium text-muted-foreground transition-all hover:border-brand/40 hover:bg-card hover:text-brand"
        >
          <Plus className="size-3.5" />
          Add deal
        </button>
      </div>
    </div>
  )
}
