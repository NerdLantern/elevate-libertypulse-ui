'use client'

import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

export function FieldLabel({
  children,
  required,
}: {
  children: React.ReactNode
  required?: boolean
}) {
  return (
    <label className="mb-1.5 block text-[0.65rem] font-semibold uppercase tracking-wider text-muted-foreground">
      {children}
      {required && <span className="ml-0.5 text-pulse-red">*</span>}
    </label>
  )
}

const fieldBase =
  'h-12 w-full rounded-2xl border bg-secondary/50 px-4 text-sm text-foreground shadow-inner outline-none transition-all placeholder:text-muted-foreground/60 focus:border-brand/50 focus:bg-card focus:ring-4 focus:ring-brand/10 border-border'

export function TextField({
  label,
  required,
  ...props
}: {
  label: string
  required?: boolean
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <FieldLabel required={required}>{label}</FieldLabel>
      <input className={fieldBase} {...props} />
    </div>
  )
}

export function SelectField({
  label,
  required,
  options,
  placeholder,
  ...props
}: {
  label: string
  required?: boolean
  options: string[]
  placeholder?: string
} & React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div>
      <FieldLabel required={required}>{label}</FieldLabel>
      <div className="relative">
        <select className={cn(fieldBase, 'appearance-none pr-10')} {...props}>
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      </div>
    </div>
  )
}

export function SectionHeader({
  icon,
  title,
}: {
  icon: React.ReactNode
  title: string
}) {
  return (
    <div className="mb-4 flex items-center gap-2.5">
      <span className="brand-gradient flex size-6 items-center justify-center rounded-lg text-white shadow-sm">
        {icon}
      </span>
      <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-brand">
        {title}
      </h3>
      <span className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
    </div>
  )
}

/** Animated selectable card used for category choices */
export function ChoiceCard({
  selected,
  onClick,
  icon,
  label,
  accent,
}: {
  selected: boolean
  onClick: () => void
  icon: React.ReactNode
  label: string
  accent: { ring: string; bg: string; text: string; dot: string }
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'relative flex items-center gap-2.5 rounded-2xl border px-3.5 py-3 text-left text-sm font-medium transition-all',
        selected
          ? cn('border-transparent ring-2', accent.bg, accent.text, accent.ring)
          : 'border-border bg-secondary/40 text-foreground hover:border-brand/30 hover:bg-secondary',
      )}
    >
      <span
        className={cn(
          'flex size-7 shrink-0 items-center justify-center rounded-lg ring-1 ring-inset',
          selected ? 'bg-card/70 ring-current/20' : 'bg-card ring-border',
        )}
      >
        {icon}
      </span>
      <span className="truncate">{label}</span>
      {selected && (
        <motion.span
          layout
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className={cn('ml-auto size-2 rounded-full', accent.dot)}
        />
      )}
    </button>
  )
}
