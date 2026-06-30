import { Sparkles } from 'lucide-react'

export function PlaceholderPage({ label }: { label: string }) {
  return (
    <div className="flex h-full flex-col items-center justify-center px-8 text-center">
      <div className="brand-gradient mb-5 flex size-14 items-center justify-center rounded-2xl text-white shadow-lg shadow-brand/30">
        <Sparkles className="size-6" />
      </div>
      <h2 className="font-heading text-2xl font-bold text-foreground">
        {label}
      </h2>
      <p className="mt-2 max-w-sm text-pretty text-sm text-muted-foreground">
        This view is part of the elevated component library. Reuse the shell,
        tables, and modals from Contacts and Sales Reps to build it out.
      </p>
    </div>
  )
}
