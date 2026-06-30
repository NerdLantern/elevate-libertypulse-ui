import { cn } from '@/lib/utils'
import type { Category, ProspectStatus } from '@/lib/mock-data'
import { categoryMeta, statusMeta } from '@/lib/ui-meta'
import { CategoryIcon } from './category-icon'

export function CategoryBadge({
  category,
  className,
}: {
  category: Category
  className?: string
}) {
  const meta = categoryMeta[category]
  const label =
    category === 'Manufacturing / Supply Chain' ? 'Manufacturing' : category
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset',
        meta.bg,
        meta.text,
        meta.ring,
        className,
      )}
    >
      <CategoryIcon icon={meta.icon} className="size-3.5" />
      {label}
    </span>
  )
}

export function StatusBadge({
  status,
  className,
}: {
  status: ProspectStatus
  className?: string
}) {
  const meta = statusMeta[status]
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium',
        meta.bg,
        meta.text,
        className,
      )}
    >
      <span className={cn('size-1.5 rounded-full', meta.dot)} />
      {status}
    </span>
  )
}
