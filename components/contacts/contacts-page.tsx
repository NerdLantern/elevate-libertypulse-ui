'use client'

import { useMemo, useState } from 'react'
import { Plus } from 'lucide-react'
import { contacts as allContacts, type Contact } from '@/lib/mock-data'
import {
  ContactsFilters,
  type CategoryFilter,
  type StatusFilter,
} from './contacts-filters'
import { ContactsTable } from './contacts-table'
import { ContactModal } from './contact-modal'

export function ContactsPage() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<CategoryFilter>('All')
  const [status, setStatus] = useState<StatusFilter>('Any status')

  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<Contact | null>(null)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return allContacts.filter((c) => {
      if (category !== 'All' && c.category !== category) return false
      if (status !== 'Any status' && c.status !== status) return false
      if (!q) return true
      return (
        `${c.firstName} ${c.lastName}`.toLowerCase().includes(q) ||
        c.title.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.company.toLowerCase().includes(q)
      )
    })
  }, [query, category, status])

  function openAdd() {
    setEditing(null)
    setModalOpen(true)
  }
  function openEdit(c: Contact) {
    setEditing(c)
    setModalOpen(true)
  }

  return (
    <div className="px-8 py-7">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground">
            Contacts
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {filtered.length} of {allContacts.length} contacts
          </p>
        </div>
        <button
          type="button"
          onClick={openAdd}
          className="brand-gradient group inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand/30 transition-all hover:shadow-xl hover:shadow-brand/40 active:scale-[0.98]"
        >
          <Plus className="size-4 transition-transform group-hover:rotate-90" />
          Add Contact
        </button>
      </div>

      {/* Filters */}
      <div className="mb-5">
        <ContactsFilters
          query={query}
          onQuery={setQuery}
          category={category}
          onCategory={setCategory}
          status={status}
          onStatus={setStatus}
        />
      </div>

      {/* Table */}
      <ContactsTable contacts={filtered} onEdit={openEdit} />

      <ContactModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        contact={editing}
      />
    </div>
  )
}
