import type { LucideIcon } from 'lucide-react'
import {
  Crosshair,
  PhoneCall,
  CalendarClock,
  FileText,
  Trophy,
  XCircle,
} from 'lucide-react'

export type PipelineStage =
  | 'prospect'
  | 'contacted'
  | 'meeting'
  | 'proposal'
  | 'closed-won'
  | 'closed-lost'

export interface Deal {
  id: string
  vendor: string
  product: string
  location: string
  estCases: number
  value: number
  /** win probability 0-100 */
  probability: number
  stage: PipelineStage
  /** owner initials for the avatar chip */
  owner: string
  contact: string
  notes: string
}

export interface StageMeta {
  id: PipelineStage
  label: string
  icon: LucideIcon
  /** header label + accent text color */
  accent: string
  /** solid dot / progress fill */
  solid: string
  /** soft column tint (top-down gradient) */
  tint: string
  /** ring color when a card is dragged over */
  overRing: string
  /** count chip bg */
  chipBg: string
  chipText: string
  emptyLabel: string
}

export const STAGES: StageMeta[] = [
  {
    id: 'prospect',
    label: 'Prospect',
    icon: Crosshair,
    accent: 'text-blue-600',
    solid: 'bg-blue-500',
    tint: 'from-blue-500/[0.07]',
    overRing: 'ring-blue-400/60',
    chipBg: 'bg-blue-100',
    chipText: 'text-blue-700',
    emptyLabel: 'No prospects yet',
  },
  {
    id: 'contacted',
    label: 'Contacted',
    icon: PhoneCall,
    accent: 'text-sky-600',
    solid: 'bg-sky-500',
    tint: 'from-sky-500/[0.07]',
    overRing: 'ring-sky-400/60',
    chipBg: 'bg-sky-100',
    chipText: 'text-sky-700',
    emptyLabel: 'No contacted vendors',
  },
  {
    id: 'meeting',
    label: 'Meeting',
    icon: CalendarClock,
    accent: 'text-indigo-600',
    solid: 'bg-indigo-500',
    tint: 'from-indigo-500/[0.07]',
    overRing: 'ring-indigo-400/60',
    chipBg: 'bg-indigo-100',
    chipText: 'text-indigo-700',
    emptyLabel: 'No meetings scheduled',
  },
  {
    id: 'proposal',
    label: 'Proposal',
    icon: FileText,
    accent: 'text-rose-600',
    solid: 'bg-rose-500',
    tint: 'from-rose-500/[0.07]',
    overRing: 'ring-rose-400/60',
    chipBg: 'bg-rose-100',
    chipText: 'text-rose-700',
    emptyLabel: 'No proposals out',
  },
  {
    id: 'closed-won',
    label: 'Closed-Won',
    icon: Trophy,
    accent: 'text-emerald-600',
    solid: 'bg-emerald-500',
    tint: 'from-emerald-500/[0.09]',
    overRing: 'ring-emerald-400/70',
    chipBg: 'bg-emerald-100',
    chipText: 'text-emerald-700',
    emptyLabel: 'No closed-won deals yet',
  },
  {
    id: 'closed-lost',
    label: 'Closed-Lost',
    icon: XCircle,
    accent: 'text-slate-500',
    solid: 'bg-slate-400',
    tint: 'from-slate-500/[0.06]',
    overRing: 'ring-slate-400/60',
    chipBg: 'bg-slate-100',
    chipText: 'text-slate-600',
    emptyLabel: 'No closed-lost deals',
  },
]

export const stageMap: Record<PipelineStage, StageMeta> = STAGES.reduce(
  (acc, s) => {
    acc[s.id] = s
    return acc
  },
  {} as Record<PipelineStage, StageMeta>,
)

export const PRODUCTS = ['AVANA', 'Liberty Reserve', 'Both'] as const

export const deals: Deal[] = [
  { id: 'd1', vendor: 'Target', product: 'AVANA', location: 'National', estCases: 35, value: 42000, probability: 30, stage: 'prospect', owner: 'GM', contact: 'Sara Lin', notes: 'Warm intro via category buyer.' },
  { id: 'd2', vendor: 'Balls Foods', product: 'AVANA', location: 'MO', estCases: 35, value: 21000, probability: 25, stage: 'prospect', owner: 'GM', contact: 'Rob Ellis', notes: '' },
  { id: 'd3', vendor: 'Liquor Barn', product: 'AVANA', location: 'KY', estCases: 35, value: 18500, probability: 20, stage: 'prospect', owner: 'DY', contact: 'Megan Cole', notes: '' },
  { id: 'd4', vendor: 'ABC Liquor', product: 'Both', location: 'FL', estCases: 40, value: 56000, probability: 35, stage: 'prospect', owner: 'DY', contact: 'Frank Ruiz', notes: 'State-run, long lead time.' },
  { id: 'd5', vendor: 'Harris Teeter', product: 'AVANA', location: 'VA', estCases: 35, value: 33000, probability: 45, stage: 'contacted', owner: 'GM', contact: 'Dana Price', notes: 'Follow up after Q1 reset.' },
  { id: 'd6', vendor: 'Shoprite', product: 'Liberty Reserve', location: 'LA', estCases: 35, value: 27500, probability: 40, stage: 'contacted', owner: 'DY', contact: 'Ken Blake', notes: '' },
  { id: 'd7', vendor: 'Sprouts', product: 'AVANA', location: 'National', estCases: 35, value: 61000, probability: 55, stage: 'meeting', owner: 'GM', contact: 'Priya Shah', notes: 'Deck sent, meeting Thursday.' },
  { id: 'd8', vendor: 'Total Wine', product: 'Both', location: 'National', estCases: 60, value: 98000, probability: 60, stage: 'meeting', owner: 'DY', contact: 'Marcus Webb', notes: 'Buyer very engaged.' },
  { id: 'd9', vendor: 'Kroger', product: 'AVANA', location: 'National', estCases: 80, value: 142000, probability: 70, stage: 'proposal', owner: 'GM', contact: 'Jay Huffman', notes: 'Pricing under review.' },
  { id: 'd10', vendor: 'Publix', product: 'Liberty Reserve', location: 'FL', estCases: 48, value: 72000, probability: 65, stage: 'proposal', owner: 'DY', contact: 'Alicia Ford', notes: 'Awaiting legal sign-off.' },
  { id: 'd11', vendor: 'Whole Foods', product: 'AVANA', location: 'National', estCases: 55, value: 88000, probability: 100, stage: 'closed-won', owner: 'GM', contact: 'Caitlin Burdick', notes: 'Launching in 320 stores.' },
  { id: 'd12', vendor: 'Meijer', product: 'Both', location: 'MI', estCases: 44, value: 63000, probability: 100, stage: 'closed-won', owner: 'DY', contact: 'Tom Reyes', notes: '' },
  { id: 'd13', vendor: 'Costco', product: 'AVANA', location: 'National', estCases: 120, value: 210000, probability: 0, stage: 'closed-lost', owner: 'GM', contact: 'Lena Ortiz', notes: 'Lost on margin requirements.' },
]

export function formatCurrency(value: number): string {
  if (value >= 1000) return `$${Math.round(value / 1000)}K`
  return `$${value}`
}
