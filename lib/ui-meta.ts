import type { Category, ProspectStatus } from './mock-data'

export interface CategoryMeta {
  icon: 'store' | 'truck' | 'handshake' | 'factory'
  /** tailwind text color class */
  text: string
  /** soft background class */
  bg: string
  /** ring/border class */
  ring: string
  /** solid dot color */
  dot: string
}

export const categoryMeta: Record<Category, CategoryMeta> = {
  Retailer: {
    icon: 'store',
    text: 'text-emerald-600',
    bg: 'bg-emerald-50',
    ring: 'ring-emerald-200',
    dot: 'bg-emerald-500',
  },
  Distributor: {
    icon: 'truck',
    text: 'text-blue-600',
    bg: 'bg-blue-50',
    ring: 'ring-blue-200',
    dot: 'bg-blue-500',
  },
  Broker: {
    icon: 'handshake',
    text: 'text-amber-600',
    bg: 'bg-amber-50',
    ring: 'ring-amber-200',
    dot: 'bg-amber-500',
  },
  'Manufacturing / Supply Chain': {
    icon: 'factory',
    text: 'text-violet-600',
    bg: 'bg-violet-50',
    ring: 'ring-violet-200',
    dot: 'bg-violet-500',
  },
}

export interface StatusMeta {
  text: string
  bg: string
  dot: string
}

export const statusMeta: Record<ProspectStatus, StatusMeta> = {
  Targeted: { text: 'text-amber-700', bg: 'bg-amber-50', dot: 'bg-amber-500' },
  Contacted: { text: 'text-blue-700', bg: 'bg-blue-50', dot: 'bg-blue-500' },
  'Meeting Set': {
    text: 'text-indigo-700',
    bg: 'bg-indigo-50',
    dot: 'bg-indigo-500',
  },
  Proposal: {
    text: 'text-violet-700',
    bg: 'bg-violet-50',
    dot: 'bg-violet-500',
  },
  Won: { text: 'text-emerald-700', bg: 'bg-emerald-50', dot: 'bg-emerald-500' },
  Lost: { text: 'text-rose-700', bg: 'bg-rose-50', dot: 'bg-rose-500' },
}
