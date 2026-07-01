'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, MapPin, Package, DollarSign, TrendingUp, UserRound } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  type Deal,
  type PipelineStage,
  STAGES,
  PRODUCTS,
  stageMap,
  formatCurrency,
} from '@/lib/pipeline'

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
      {children}
    </label>
  )
}

const inputClass =
  'w-full rounded-xl border border-input bg-secondary/40 px-3.5 py-2.5 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground/60 focus:border-brand/50 focus:bg-card focus:ring-4 focus:ring-brand/10'

export function DealDrawer({
  deal,
  onClose,
  onSave,
  onDelete,
}: {
  deal: Deal | null
  onClose: () => void
  onSave: (deal: Deal) => void
  onDelete: (id: string) => void
}) {
  const [form, setForm] = useState<Deal | null>(deal)

  useEffect(() => setForm(deal), [deal])

  useEffect(() => {
    if (!deal) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [deal, onClose])

  const set = <K extends keyof Deal>(key: K, value: Deal[K]) =>
    setForm((f) => (f ? { ...f, [key]: value } : f))

  const meta = form ? stageMap[form.stage] : null

  return (
    <AnimatePresence>
      {deal && form && meta && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-navy-deep/45 backdrop-blur-sm"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Edit deal"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 34 }}
            className="lp-scroll relative flex h-full w-full max-w-md flex-col overflow-y-auto bg-card shadow-2xl"
          >
            {/* Header */}
            <div className="brand-gradient relative flex items-start justify-between gap-3 px-6 py-6">
              <div className="pointer-events-none absolute inset-0 opacity-30 [background:radial-gradient(120%_120%_at_90%_-20%,white,transparent)]" />
              <div className="relative">
                <span className="inline-flex items-center rounded-md bg-white/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white ring-1 ring-inset ring-white/25">
                  {form.product}
                </span>
                <h2 className="mt-2 font-heading text-2xl font-bold text-white">
                  {form.vendor || 'New Deal'}
                </h2>
                <div className="mt-1 flex items-center gap-1 text-sm text-white/80">
                  <MapPin className="size-3.5" />
                  {form.location || '—'}
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="relative flex size-9 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/15 hover:text-white"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Stage picker */}
            <div className="border-b border-border px-6 py-4">
              <Label>Stage</Label>
              <div className="flex flex-wrap gap-1.5">
                {STAGES.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => set('stage', s.id as PipelineStage)}
                    className={cn(
                      'rounded-full px-3 py-1.5 text-xs font-semibold transition-all',
                      form.stage === s.id
                        ? cn(s.chipBg, s.chipText, 'ring-2 ring-inset', s.overRing)
                        : 'bg-secondary text-muted-foreground hover:bg-muted',
                    )}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Fields */}
            <div className="flex flex-col gap-4 px-6 py-5">
              <div>
                <Label>Vendor</Label>
                <input
                  className={inputClass}
                  value={form.vendor}
                  onChange={(e) => set('vendor', e.target.value)}
                  placeholder="Vendor name"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Product</Label>
                  <select
                    className={cn(inputClass, 'appearance-none')}
                    value={form.product}
                    onChange={(e) => set('product', e.target.value)}
                  >
                    {PRODUCTS.map((p) => (
                      <option key={p}>{p}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label>Location</Label>
                  <input
                    className={inputClass}
                    value={form.location}
                    onChange={(e) => set('location', e.target.value)}
                    placeholder="e.g. National"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>
                    <span className="inline-flex items-center gap-1">
                      <Package className="size-3" /> Est. Cases
                    </span>
                  </Label>
                  <input
                    type="number"
                    className={inputClass}
                    value={form.estCases}
                    onChange={(e) => set('estCases', Number(e.target.value))}
                  />
                </div>
                <div>
                  <Label>
                    <span className="inline-flex items-center gap-1">
                      <DollarSign className="size-3" /> Value
                    </span>
                  </Label>
                  <input
                    type="number"
                    className={inputClass}
                    value={form.value}
                    onChange={(e) => set('value', Number(e.target.value))}
                  />
                </div>
              </div>

              {/* Probability slider */}
              <div>
                <Label>
                  <span className="inline-flex items-center gap-1">
                    <TrendingUp className="size-3" /> Win Probability
                  </span>
                </Label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min={0}
                    max={100}
                    step={5}
                    value={form.probability}
                    onChange={(e) => set('probability', Number(e.target.value))}
                    className="lp-range h-2 w-full cursor-pointer appearance-none rounded-full bg-muted"
                    style={{
                      background: `linear-gradient(to right, var(--brand) 0%, var(--brand) ${form.probability}%, var(--muted) ${form.probability}%, var(--muted) 100%)`,
                    }}
                  />
                  <span className="w-12 text-right font-heading text-sm font-bold text-brand">
                    {form.probability}%
                  </span>
                </div>
              </div>

              <div>
                <Label>
                  <span className="inline-flex items-center gap-1">
                    <UserRound className="size-3" /> Primary Contact
                  </span>
                </Label>
                <input
                  className={inputClass}
                  value={form.contact}
                  onChange={(e) => set('contact', e.target.value)}
                  placeholder="Contact name"
                />
              </div>

              <div>
                <Label>Notes</Label>
                <textarea
                  rows={3}
                  className={cn(inputClass, 'resize-none')}
                  value={form.notes}
                  onChange={(e) => set('notes', e.target.value)}
                  placeholder="Add context, next steps..."
                />
              </div>

              <div className="rounded-xl bg-secondary/50 px-4 py-3 text-sm text-muted-foreground">
                Weighted value:{' '}
                <span className="font-heading font-bold text-foreground">
                  {formatCurrency(
                    Math.round((form.value * form.probability) / 100),
                  )}
                </span>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-auto flex items-center justify-between gap-3 border-t border-border bg-secondary/30 px-6 py-4">
              <button
                type="button"
                onClick={() => onDelete(form.id)}
                className="rounded-full px-4 py-2 text-sm font-medium text-rose-600 transition-colors hover:bg-rose-50"
              >
                Delete
              </button>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => onSave(form)}
                  className="brand-gradient inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-bold tracking-wide text-white shadow-lg shadow-brand/30 transition-all hover:shadow-xl hover:shadow-brand/40 active:scale-[0.98]"
                >
                  Save Deal
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
