'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, UserRound, Mail, Briefcase, GitBranch } from 'lucide-react'
import {
  CATEGORIES,
  type Category,
  type Contact,
  type ProspectStatus,
} from '@/lib/mock-data'
import { categoryMeta } from '@/lib/ui-meta'
import { CategoryIcon } from '@/components/lp/category-icon'
import {
  TextField,
  SelectField,
  SectionHeader,
  ChoiceCard,
  FieldLabel,
} from './form-fields'
import { StatusSelector } from './status-selector'

interface FormState {
  firstName: string
  lastName: string
  title: string
  email: string
  phone: string
  category: Category
  retailer: string
  status: ProspectStatus
  notes: string
  lastContact: string
  nextMeeting: string
}

const empty: FormState = {
  firstName: '',
  lastName: '',
  title: '',
  email: '',
  phone: '',
  category: 'Retailer',
  retailer: '',
  status: 'Targeted',
  notes: '',
  lastContact: '',
  nextMeeting: '',
}

export function ContactModal({
  open,
  onClose,
  contact,
}: {
  open: boolean
  onClose: () => void
  contact: Contact | null
}) {
  const [form, setForm] = useState<FormState>(empty)

  useEffect(() => {
    if (open) {
      setForm(
        contact
          ? {
              ...empty,
              firstName: contact.firstName,
              lastName: contact.lastName,
              title: contact.title,
              email: contact.email,
              phone: contact.phone ?? '',
              category: contact.category,
              status: contact.status ?? 'Targeted',
              notes: contact.notes ?? '',
            }
          : empty,
      )
    }
  }, [open, contact])

  // Close on Escape
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }))

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="absolute inset-0 bg-navy-deep/55 backdrop-blur-sm"
          />

          {/* Dialog */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={contact ? 'Edit contact' : 'Add contact'}
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ type: 'spring', stiffness: 320, damping: 30 }}
            className="lp-scroll relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl bg-card shadow-2xl shadow-navy-deep/40"
          >
            {/* Header */}
            <div className="brand-gradient relative flex items-center gap-4 px-7 py-6">
              <div className="pointer-events-none absolute inset-0 opacity-30 [background:radial-gradient(120%_120%_at_90%_-20%,white,transparent)]" />
              <div className="relative flex size-12 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/25 backdrop-blur-sm">
                <UserRound className="size-6 text-white" />
              </div>
              <h2 className="relative font-heading text-2xl font-bold text-white">
                {contact ? 'Edit Contact' : 'Add Contact'}
              </h2>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="relative ml-auto flex size-9 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/15 hover:text-white"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Body */}
            <div className="lp-scroll grid flex-1 gap-x-10 gap-y-7 overflow-y-auto px-7 py-7 md:grid-cols-2">
              {/* Identity */}
              <section>
                <SectionHeader
                  icon={<UserRound className="size-3.5" />}
                  title="Identity"
                />
                <div className="grid grid-cols-2 gap-3">
                  <TextField
                    label="First Name"
                    required
                    autoFocus
                    value={form.firstName}
                    onChange={(e) => set('firstName', e.target.value)}
                  />
                  <TextField
                    label="Last Name"
                    required
                    value={form.lastName}
                    onChange={(e) => set('lastName', e.target.value)}
                  />
                </div>
                <div className="mt-3">
                  <TextField
                    label="Title"
                    value={form.title}
                    onChange={(e) => set('title', e.target.value)}
                  />
                </div>
              </section>

              {/* Contact Information */}
              <section>
                <SectionHeader
                  icon={<Mail className="size-3.5" />}
                  title="Contact Information"
                />
                <TextField
                  label="Email"
                  type="email"
                  value={form.email}
                  onChange={(e) => set('email', e.target.value)}
                />
                <div className="mt-3">
                  <TextField
                    label="Phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => set('phone', e.target.value)}
                  />
                </div>
              </section>

              {/* Category & Company */}
              <section>
                <SectionHeader
                  icon={<Briefcase className="size-3.5" />}
                  title="Category & Company"
                />
                <FieldLabel required>Category</FieldLabel>
                <div className="grid grid-cols-2 gap-2.5">
                  {CATEGORIES.map((cat) => {
                    const meta = categoryMeta[cat]
                    return (
                      <ChoiceCard
                        key={cat}
                        selected={form.category === cat}
                        onClick={() => set('category', cat)}
                        accent={meta}
                        icon={
                          <CategoryIcon
                            icon={meta.icon}
                            className={`size-4 ${meta.text}`}
                          />
                        }
                        label={
                          cat === 'Manufacturing / Supply Chain'
                            ? 'Manufacturing / Su...'
                            : cat
                        }
                      />
                    )
                  })}
                </div>
                <div className="mt-3">
                  <SelectField
                    label={`${form.category}`}
                    required
                    placeholder={`Select ${form.category.toLowerCase()}...`}
                    options={[
                      'SGWS',
                      'Whole Foods',
                      'Kroger',
                      'VA Imports',
                      'Lipman',
                      'Breakthru Bev',
                    ]}
                    value={form.retailer}
                    onChange={(e) => set('retailer', e.target.value)}
                  />
                </div>
              </section>

              {/* Pipeline */}
              <section>
                <SectionHeader
                  icon={<GitBranch className="size-3.5" />}
                  title="Pipeline"
                />
                <FieldLabel>Prospect Status</FieldLabel>
                <StatusSelector
                  value={form.status}
                  onChange={(v) => set('status', v)}
                />
                <div className="mt-3">
                  <TextField
                    label="Status Notes"
                    value={form.notes}
                    onChange={(e) => set('notes', e.target.value)}
                  />
                </div>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  <TextField
                    label="Last Contact"
                    type="date"
                    value={form.lastContact}
                    onChange={(e) => set('lastContact', e.target.value)}
                  />
                  <TextField
                    label="Next Meeting"
                    type="date"
                    value={form.nextMeeting}
                    onChange={(e) => set('nextMeeting', e.target.value)}
                  />
                </div>
              </section>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-border bg-secondary/30 px-7 py-4">
              <button
                type="button"
                onClick={onClose}
                className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={onClose}
                className="brand-gradient inline-flex items-center gap-2 rounded-full px-7 py-2.5 text-sm font-bold tracking-wide text-white shadow-lg shadow-brand/30 transition-all hover:shadow-xl hover:shadow-brand/40 active:scale-[0.98]"
              >
                {contact ? 'Save Changes' : 'Save'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
