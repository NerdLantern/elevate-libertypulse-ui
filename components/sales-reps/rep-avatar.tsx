import { Trophy } from 'lucide-react'
import { cn } from '@/lib/utils'

const gradients = [
  'from-brand to-brand-purple',
  'from-sky-500 to-brand',
  'from-emerald-500 to-teal-600',
  'from-amber-500 to-orange-600',
  'from-rose-500 to-pink-600',
  'from-violet-500 to-brand-purple',
]

const medal: Record<number, string> = {
  1: 'text-amber-400',
  2: 'text-slate-400',
  3: 'text-orange-400',
}

export function RepAvatar({
  name,
  rank,
  index,
}: {
  name: string
  rank: number
  index: number
}) {
  const initials = name
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')

  return (
    <div className="flex items-center gap-2.5">
      <span className="flex w-6 justify-center">
        {rank <= 3 ? (
          <Trophy className={cn('size-4', medal[rank])} fill="currentColor" />
        ) : (
          <span className="flex size-5 items-center justify-center rounded-full bg-secondary text-[0.65rem] font-bold text-muted-foreground">
            {rank}
          </span>
        )}
      </span>
      <span
        className={cn(
          'flex size-9 items-center justify-center rounded-full bg-gradient-to-br text-xs font-bold text-white shadow-sm ring-2 ring-card',
          gradients[index % gradients.length],
        )}
      >
        {initials}
      </span>
    </div>
  )
}
