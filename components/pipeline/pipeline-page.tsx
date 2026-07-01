'use client'

import { useMemo, useState } from 'react'
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  closestCorners,
  type DragStartEvent,
  type DragOverEvent,
  type DragEndEvent,
} from '@dnd-kit/core'
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import confetti from 'canvas-confetti'
import { Search, ChevronDown } from 'lucide-react'
import {
  deals as initialDeals,
  STAGES,
  PRODUCTS,
  type Deal,
  type PipelineStage,
} from '@/lib/pipeline'
import { PipelineColumn } from './pipeline-column'
import { PipelineCard } from './pipeline-card'
import { SummaryCards } from './summary-cards'
import { DealDrawer } from './deal-drawer'

type Board = Record<PipelineStage, Deal[]>

function groupDeals(list: Deal[]): Board {
  const board = Object.fromEntries(
    STAGES.map((s) => [s.id, [] as Deal[]]),
  ) as Board
  for (const d of list) board[d.stage].push(d)
  return board
}

export function PipelinePage() {
  const [board, setBoard] = useState<Board>(() => groupDeals(initialDeals))
  const [activeId, setActiveId] = useState<string | null>(null)
  const [query, setQuery] = useState('')
  const [product, setProduct] = useState<'All' | (typeof PRODUCTS)[number]>('All')
  const [editing, setEditing] = useState<Deal | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  const allDeals = useMemo(() => Object.values(board).flat(), [board])

  const activeDeal = activeId
    ? allDeals.find((d) => d.id === activeId) ?? null
    : null

  // Filtered board for rendering
  const filteredBoard = useMemo(() => {
    const q = query.trim().toLowerCase()
    const result = {} as Board
    for (const s of STAGES) {
      result[s.id] = board[s.id].filter((d) => {
        const matchQ =
          !q ||
          d.vendor.toLowerCase().includes(q) ||
          d.location.toLowerCase().includes(q) ||
          d.contact.toLowerCase().includes(q)
        const matchP = product === 'All' || d.product === product
        return matchQ && matchP
      })
    }
    return result
  }, [board, query, product])

  // Summary metrics
  const totalCases = allDeals
    .filter((d) => d.stage !== 'closed-lost')
    .reduce((sum, d) => sum + d.estCases, 0)
  const inProposal = Math.round(
    board.proposal.reduce((sum, d) => sum + d.value, 0) / 1000,
  )
  const won = Math.round(
    board['closed-won'].reduce((sum, d) => sum + d.value, 0) / 1000,
  )

  const findContainer = (id: string): PipelineStage | undefined => {
    if (id in board) return id as PipelineStage
    return STAGES.find((s) => board[s.id].some((d) => d.id === id))?.id
  }

  const fireConfetti = () => {
    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#22c55e', '#3b46e0', '#7c3aed', '#f59e0b'],
      scalar: 0.9,
    })
  }

  function handleDragStart(e: DragStartEvent) {
    setActiveId(String(e.active.id))
  }

  function handleDragOver(e: DragOverEvent) {
    const { active, over } = e
    if (!over) return
    const activeContainer = findContainer(String(active.id))
    const overContainer = findContainer(String(over.id))
    if (
      !activeContainer ||
      !overContainer ||
      activeContainer === overContainer
    )
      return

    setBoard((prev) => {
      const activeItems = prev[activeContainer]
      const overItems = prev[overContainer]
      const activeIndex = activeItems.findIndex((d) => d.id === active.id)
      if (activeIndex < 0) return prev
      const moved = { ...activeItems[activeIndex], stage: overContainer }

      const overIndex = overItems.findIndex((d) => d.id === over.id)
      const insertAt = overIndex >= 0 ? overIndex : overItems.length

      return {
        ...prev,
        [activeContainer]: activeItems.filter((d) => d.id !== active.id),
        [overContainer]: [
          ...overItems.slice(0, insertAt),
          moved,
          ...overItems.slice(insertAt),
        ],
      }
    })
  }

  function handleDragEnd(e: DragEndEvent) {
    const { active, over } = e
    setActiveId(null)
    if (!over) return
    const container = findContainer(String(over.id)) ?? findContainer(String(active.id))
    if (!container) return

    setBoard((prev) => {
      const items = prev[container]
      const oldIndex = items.findIndex((d) => d.id === active.id)
      const newIndex = items.findIndex((d) => d.id === over.id)
      if (oldIndex < 0 || newIndex < 0 || oldIndex === newIndex) return prev
      return { ...prev, [container]: arrayMove(items, oldIndex, newIndex) }
    })

    if (container === 'closed-won') fireConfetti()
  }

  function openDeal(deal: Deal) {
    setEditing(deal)
  }

  function addDeal(stage: PipelineStage) {
    const draft: Deal = {
      id: `new-${Date.now()}`,
      vendor: '',
      product: 'AVANA',
      location: '',
      estCases: 0,
      value: 0,
      probability: stage === 'closed-won' ? 100 : 20,
      stage,
      owner: 'GM',
      contact: '',
      notes: '',
    }
    setEditing(draft)
  }

  function saveDeal(deal: Deal) {
    setBoard((prev) => {
      const exists = Object.values(prev).flat().some((d) => d.id === deal.id)
      // remove from any current container
      const cleaned = Object.fromEntries(
        STAGES.map((s) => [s.id, prev[s.id].filter((d) => d.id !== deal.id)]),
      ) as Board
      cleaned[deal.stage] = [...cleaned[deal.stage], deal]
      if (deal.stage === 'closed-won') {
        const wasWon = prev['closed-won'].some((d) => d.id === deal.id)
        if (!wasWon) setTimeout(fireConfetti, 120)
      }
      void exists
      return cleaned
    })
    setEditing(null)
  }

  function deleteDeal(id: string) {
    setBoard((prev) => {
      const next = Object.fromEntries(
        STAGES.map((s) => [s.id, prev[s.id].filter((d) => d.id !== id)]),
      ) as Board
      return next
    })
    setEditing(null)
  }

  return (
    <div className="flex h-full flex-col">
      {/* Page header */}
      <div className="flex flex-wrap items-center justify-between gap-4 px-6 pt-6 pb-2">
        <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground">
          Pipeline
        </h1>
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search vendors..."
              className="w-56 rounded-full border border-input bg-secondary/50 py-2 pl-9 pr-3 text-sm outline-none transition-all placeholder:text-muted-foreground/60 focus:border-brand/50 focus:bg-card focus:ring-4 focus:ring-brand/10"
            />
          </div>
          <div className="relative">
            <select
              value={product}
              onChange={(e) => setProduct(e.target.value as typeof product)}
              className="appearance-none rounded-full border border-input bg-secondary/50 py-2 pl-4 pr-9 text-sm outline-none transition-all focus:border-brand/50 focus:bg-card focus:ring-4 focus:ring-brand/10"
            >
              <option value="All">All products</option>
              {PRODUCTS.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="px-6 py-3">
        <SummaryCards
          totalCases={totalCases}
          inProposal={inProposal}
          won={won}
        />
      </div>

      {/* Board */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="lp-scroll flex flex-1 gap-4 overflow-x-auto px-6 pb-6 pt-2">
          {STAGES.map((s) => (
            <PipelineColumn
              key={s.id}
              meta={s}
              deals={filteredBoard[s.id]}
              onOpen={openDeal}
              onAdd={addDeal}
            />
          ))}
        </div>

        <DragOverlay dropAnimation={{ duration: 200, easing: 'cubic-bezier(0.22,1,0.36,1)' }}>
          {activeDeal ? <PipelineCard deal={activeDeal} overlay /> : null}
        </DragOverlay>
      </DndContext>

      <DealDrawer
        deal={editing}
        onClose={() => setEditing(null)}
        onSave={saveDeal}
        onDelete={deleteDeal}
      />
    </div>
  )
}
