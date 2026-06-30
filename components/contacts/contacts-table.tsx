'use client'

import { motion } from 'framer-motion'
import { Pencil, Mail } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Contact } from '@/lib/mock-data'
import { categoryMeta } from '@/lib/ui-meta'
import { CategoryBadge, StatusBadge } from '@/components/lp/badges'

export function ContactsTable({
  contacts,
  onEdit,
}: {
  contacts: Contact[]
  onEdit: (c: Contact) => void
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      {/* Header */}
      <div className="grid grid-cols-[1.4fr_1.3fr_1fr_1.1fr_0.8fr_1.4fr_0.8fr] gap-4 border-b border-border bg-secondary/40 px-5 py-3 text-[0.65rem] font-semibold uppercase tracking-wider text-muted-foreground">
        <span>Name</span>
        <span>Title</span>
        <span>Category</span>
        <span>Company</span>
        <span>Status</span>
        <span>Email</span>
        <span className="text-right">Last Contact</span>
      </div>

      {/* Rows */}
      <div>
        {contacts.length === 0 ? (
          <div className="px-5 py-16 text-center text-sm text-muted-foreground">
            No contacts match your filters.
          </div>
        ) : (
          contacts.map((c, i) => {
            const meta = categoryMeta[c.category]
            return (
              <motion.button
                key={c.id}
                type="button"
                onClick={() => onEdit(c)}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(i * 0.018, 0.4), duration: 0.3 }}
                className="group grid w-full grid-cols-[1.4fr_1.3fr_1fr_1.1fr_0.8fr_1.4fr_0.8fr] items-center gap-4 border-b border-border/60 px-5 py-3 text-left text-sm transition-colors last:border-0 hover:bg-secondary/50"
              >
                {/* Name */}
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className={cn('size-2 shrink-0 rounded-full', meta.dot)} />
                  <span className="truncate font-semibold text-foreground">
                    {c.firstName} {c.lastName}
                  </span>
                </div>

                <span className="truncate text-muted-foreground">{c.title}</span>

                <div className="min-w-0">
                  <CategoryBadge category={c.category} />
                </div>

                <div className="flex min-w-0 items-center gap-1.5">
                  <span className="truncate font-medium text-foreground">
                    {c.company}
                  </span>
                  {c.companyScope && (
                    <span className="shrink-0 rounded bg-brand/10 px-1.5 py-0.5 text-[0.6rem] font-bold tracking-wide text-brand">
                      {c.companyScope}
                    </span>
                  )}
                </div>

                <div className="min-w-0">
                  {c.status ? (
                    <StatusBadge status={c.status} />
                  ) : (
                    <span className="text-muted-foreground">—</span>
                  )}
                </div>

                <a
                  href={`mailto:${c.email}`}
                  onClick={(e) => e.stopPropagation()}
                  className="flex min-w-0 items-center gap-1.5 truncate text-brand transition-colors hover:text-brand-purple"
                >
                  <Mail className="size-3.5 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
                  <span className="truncate">{c.email}</span>
                </a>

                <div className="flex items-center justify-end gap-2">
                  <span className="text-muted-foreground">
                    {c.lastContact ?? '—'}
                  </span>
                  <span className="flex size-7 items-center justify-center rounded-lg text-muted-foreground opacity-0 transition-all group-hover:opacity-100 group-hover:bg-brand/10 group-hover:text-brand">
                    <Pencil className="size-3.5" />
                  </span>
                </div>
              </motion.button>
            )
          })
        )}
      </div>
    </div>
  )
}
