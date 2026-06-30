'use client'

import { useState } from 'react'
import { Plus, LayoutGrid, List } from 'lucide-react'
import { cn } from '@/lib/utils'
import { salesReps } from '@/lib/mock-data'
import { StatCards } from './stat-cards'
import { RepsTable } from './reps-table'

export function SalesRepsPage() {
  const [view, setView] = useState<'list' | 'grid'>('list')

  return (
    <div className="px-8 py-7">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground">
          Sales Reps
        </h1>
        <div className="flex items-center gap-3">
          <div className="flex items-center rounded-full border border-border bg-card p-1 shadow-sm">
            <button
              type="button"
              onClick={() => setView('grid')}
              aria-label="Grid view"
              className={cn(
                'flex size-7 items-center justify-center rounded-full transition-colors',
                view === 'grid'
                  ? 'bg-brand text-white'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              <LayoutGrid className="size-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setView('list')}
              aria-label="List view"
              className={cn(
                'flex size-7 items-center justify-center rounded-full transition-colors',
                view === 'list'
                  ? 'bg-brand text-white'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              <List className="size-3.5" />
            </button>
          </div>
          <button
            type="button"
            className="brand-gradient group inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand/30 transition-all hover:shadow-xl hover:shadow-brand/40 active:scale-[0.98]"
          >
            <Plus className="size-4 transition-transform group-hover:rotate-90" />
            Add Sales Rep
          </button>
        </div>
      </div>

      <div className="mb-6">
        <StatCards />
      </div>

      <RepsTable reps={salesReps} />
    </div>
  )
}
