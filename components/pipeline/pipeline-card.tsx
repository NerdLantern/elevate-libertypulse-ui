'use client'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { motion } from 'framer-motion'
import { GripVertical, MapPin } from 'lucide-react'
import { cn } from '@/lib/utils'
import { type Deal, stageMap, formatCurrency } from '@/lib/pipeline'

export function PipelineCard({
  deal,
  onOpen,
  overlay = false,
}: {
  deal: Deal
  onOpen?: (deal: Deal) => void
  overlay?: boolean
}) {
  const meta = stageMap[deal.stage]
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: deal.id, data: { stage: deal.stage } })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      layout={!overlay}
      onClick={() => !isDragging && onOpen?.(deal)}
      className={cn(
        'group relative cursor-pointer rounded-2xl border border-border bg-card p-3.5 text-left shadow-sm',
        'transition-shadow hover:shadow-md',
        isDragging && 'opacity-40',
        overlay && 'rotate-[2.5deg] scale-[1.03] shadow-2xl shadow-navy-deep/30',
      )}
      whileHover={overlay ? undefined : { y: -3 }}
      transition={{ type: 'spring', stiffness: 400, damping: 28 }}
    >
      {/* accent rail */}
      <span
        className={cn(
          'absolute inset-y-3 left-0 w-1 rounded-full',
          meta.solid,
          'opacity-70',
        )}
      />

      <div className="flex items-start justify-between gap-2 pl-2">
        <span className="inline-flex items-center rounded-md bg-brand/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-brand ring-1 ring-inset ring-brand/15">
          {deal.product}
        </span>

        <button
          type="button"
          aria-label="Drag deal"
          {...attributes}
          {...listeners}
          onClick={(e) => e.stopPropagation()}
          className="-mr-1 -mt-0.5 cursor-grab touch-none rounded-md p-1 text-muted-foreground/40 opacity-0 transition hover:bg-muted hover:text-muted-foreground group-hover:opacity-100 active:cursor-grabbing"
        >
          <GripVertical className="size-4" />
        </button>
      </div>

      <h4 className="mt-1.5 pl-2 font-heading text-[15px] font-semibold leading-tight text-foreground">
        {deal.vendor}
      </h4>

      <div className="mt-1 flex items-center gap-1 pl-2 text-xs text-muted-foreground">
        <MapPin className="size-3" />
        {deal.location}
      </div>

      {/* probability */}
      <div className="mt-3 pl-2">
        <div className="flex items-center justify-between text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
          <span>Win prob.</span>
          <span className={meta.accent}>{deal.probability}%</span>
        </div>
        <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-muted">
          <motion.div
            className={cn('h-full rounded-full', meta.solid)}
            initial={{ width: 0 }}
            animate={{ width: `${deal.probability}%` }}
            transition={{ type: 'spring', stiffness: 120, damping: 20 }}
          />
        </div>
      </div>

      {/* footer */}
      <div className="mt-3 flex items-center justify-between pl-2">
        <div className="flex items-center gap-1.5">
          <span className="flex size-6 items-center justify-center rounded-full bg-navy text-[10px] font-bold text-white ring-2 ring-card">
            {deal.owner}
          </span>
          <span className="text-xs text-muted-foreground">
            {deal.estCases} cases
          </span>
        </div>
        <span className="font-heading text-sm font-bold text-foreground">
          {formatCurrency(deal.value)}
        </span>
      </div>
    </motion.div>
  )
}
