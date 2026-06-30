'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import {
  ShieldCheck,
  LayoutGrid,
  Users,
  Contact,
  Briefcase,
  Building2,
  Store,
  Target,
  GitBranch,
  Map,
  Calendar,
  Box,
  LogOut,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { navItems, type NavId } from '@/lib/mock-data'

const iconMap = {
  shield: ShieldCheck,
  grid: LayoutGrid,
  users: Users,
  contact: Contact,
  briefcase: Briefcase,
  building: Building2,
  store: Store,
  target: Target,
  'git-branch': GitBranch,
  map: Map,
  calendar: Calendar,
  box: Box,
} as const

const stats = [
  { value: '87', label: 'Leads' },
  { value: '14', label: 'Meetings' },
  { value: '93%', label: 'Follow-up' },
]

export function AppSidebar({
  active,
  onNavigate,
}: {
  active: NavId
  onNavigate: (id: NavId) => void
}) {
  return (
    <aside className="navy-gradient relative flex h-full w-[248px] shrink-0 flex-col overflow-hidden text-sidebar-foreground">
      {/* ambient glow */}
      <div className="pointer-events-none absolute -top-24 left-1/2 size-64 -translate-x-1/2 rounded-full bg-brand/30 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 size-48 rounded-full bg-brand-purple/20 blur-3xl" />

      {/* Brand */}
      <div className="relative px-6 pt-7 pb-5 text-center">
        <h1 className="font-heading text-xl font-extrabold tracking-[0.25em] text-white">
          LIBERTY
        </h1>
        <p className="-mt-0.5 text-[0.6rem] font-semibold tracking-[0.5em] text-white/55">
          PULSE
        </p>
      </div>

      {/* Avatar */}
      <div className="relative flex flex-col items-center pb-4">
        <div className="relative">
          <motion.div
            aria-hidden
            className="absolute inset-0 rounded-full bg-gradient-to-tr from-brand to-brand-purple blur-md"
            animate={{ opacity: [0.5, 0.85, 0.5] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <div className="relative rounded-full p-[2px] bg-gradient-to-tr from-brand via-sky-400 to-brand-purple">
            <Image
              src="/avatars/gus.png"
              alt="Gus"
              width={96}
              height={96}
              className="size-[88px] rounded-full object-cover ring-2 ring-navy-deep"
            />
          </div>
        </div>
        <p className="mt-3 font-heading text-lg font-bold text-white">Gus</p>

        {/* Stat pills */}
        <div className="mt-3 flex gap-2 px-5">
          {stats.map((s) => (
            <div
              key={s.label}
              className="flex flex-1 flex-col items-center rounded-xl border border-white/10 bg-white/[0.06] px-2 py-1.5 backdrop-blur-sm"
            >
              <span className="text-sm font-bold leading-none text-white">
                {s.value}
              </span>
              <span className="mt-1 text-[0.55rem] font-medium uppercase tracking-wider text-white/55">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Nav */}
      <nav className="lp-scroll relative mt-2 flex-1 space-y-1 overflow-y-auto px-3 pb-4">
        {navItems.map((item, i) => {
          const Icon = iconMap[item.icon]
          const isActive = item.id === active
          return (
            <motion.button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.id)}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.03 * i, duration: 0.3 }}
              className={cn(
                'group relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
                isActive
                  ? 'text-white'
                  : 'text-white/65 hover:bg-white/[0.06] hover:text-white',
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="sidebar-active"
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-pulse-red/90 to-pulse-red/60 shadow-[0_8px_24px_-6px] shadow-pulse-red/60"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
              <Icon className="relative size-[18px]" strokeWidth={2} />
              <span className="relative">{item.label}</span>
            </motion.button>
          )
        })}
      </nav>

      {/* Logout */}
      <div className="relative border-t border-white/10 p-3">
        <button
          type="button"
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm font-medium text-white/80 transition-colors hover:bg-white/[0.1] hover:text-white"
        >
          <LogOut className="size-4" />
          Log out
        </button>
      </div>
    </aside>
  )
}
