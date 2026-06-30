'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { AppSidebar } from './app-sidebar'
import { TopBar } from './top-bar'
import { ContactsPage } from '@/components/contacts/contacts-page'
import { SalesRepsPage } from '@/components/sales-reps/sales-reps-page'
import { PlaceholderPage } from './placeholder-page'
import { navItems, type NavId } from '@/lib/mock-data'

export function AppShell() {
  const [active, setActive] = useState<NavId>('contacts')

  const label = navItems.find((n) => n.id === active)?.label ?? ''

  return (
    <div className="flex h-dvh w-full overflow-hidden bg-background p-2.5 gap-2.5">
      <AppSidebar active={active} onNavigate={setActive} />

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
        <TopBar />
        <main className="lp-scroll flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="h-full"
            >
              {active === 'contacts' ? (
                <ContactsPage />
              ) : active === 'sales-reps' ? (
                <SalesRepsPage />
              ) : (
                <PlaceholderPage label={label} />
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}
