import { Store, Truck, Handshake, Factory } from 'lucide-react'
import type { CategoryMeta } from '@/lib/ui-meta'

const map = {
  store: Store,
  truck: Truck,
  handshake: Handshake,
  factory: Factory,
} as const

export function CategoryIcon({
  icon,
  className,
}: {
  icon: CategoryMeta['icon']
  className?: string
}) {
  const Icon = map[icon]
  return <Icon className={className} />
}
