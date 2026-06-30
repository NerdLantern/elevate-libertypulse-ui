'use client'

import { motion } from 'framer-motion'
import { Search } from 'lucide-react'
import { cn } from '@/lib/utils'
import { CATEGORIES, STATUSES, type Category, type ProspectStatus } from '@/lib/mock-data'
import { CategoryIcon } from '@/components/lp/category-icon'
import { categoryMeta } from '@/lib/ui-meta'

export type CategoryFilter = Category | 'All'
export type StatusFilter = ProspectStatus | 'Any status'

export function ContactsFilters({
  query,
  onQuery,
  category,
  onCategory,
  status,
  onStatus,
}: {
  query: string
  onQuery: (v: string) => void
  category: CategoryFilter
  onCategory: (v: CategoryFilter) => void
  status: StatusFilter
  onStatus: (v: StatusFilter) => void
}) {
  const categoryOptions: CategoryFilter[] = ['All', ...CATEGORIES]
  const statusOptions: StatusFilter[] = ['Any status', ...STATUSES]

  return (
    <div className="flex flex-col gap-3">
      {/* Search */}
      <div className="group relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-brand" />
        <input
          value={query}
          onChange={(e) => onQuery(e.target.value)}
          placeholder="Search name, title, email..."
          className="h-12 w-full rounded-2xl border border-border bg-secondary/60 pl-11 pr-4 text-sm text-foreground shadow-sm outline-none transition-all placeholder:text-muted-foreground focus:border-brand/40 focus:bg-card focus:ring-4 focus:ring-brand/10"
        />
      </div>

      {/* Filter chips */}
      <div className="flex flex-wrap items-center gap-1.5">
        {categoryOptions.map((opt) => {
          const isActive = category === opt
          const meta = opt !== 'All' ? categoryMeta[opt] : null
          return (
            <Chip key={opt} active={isActive} onClick={() => onCategory(opt)}>
              {meta && <CategoryIcon icon={meta.icon} className="size-3.5" />}
              {opt === 'Manufacturing / Supply Chain' ? 'Manufacturing' : opt}
            </Chip>
          )
        })}

        <span className="mx-1 h-5 w-px bg-border" />

        {statusOptions.map((opt) => (
          <Chip key={opt} active={status === opt} onClick={() => onStatus(opt)}>
            {opt}
          </Chip>
        ))}
      </div>
    </div>
  )
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'relative inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors',
        active ? 'text-white' : 'text-muted-foreground hover:text-foreground',
      )}
    >
      {active && (
        <motion.span
          layoutId={`chip-${children?.toString()}`}
          className="absolute inset-0 rounded-full bg-foreground"
          transition={{ type: 'spring', stiffness: 400, damping: 34 }}
        />
      )}
      <span className="relative flex items-center gap-1.5">{children}</span>
    </button>
  )
}
