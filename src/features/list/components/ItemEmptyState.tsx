
import { ClipboardList } from "lucide-react";

export function ListEmptyState() {
  return (
    <div className="py-12 text-center">
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-muted/40 text-muted-foreground ring-1 ring-border shadow-sm">
        <ClipboardList className="h-8 w-8" aria-hidden="true" />
      </div>
      <p className="text-sm text-muted-foreground">
        No items yet. Start by adding your first one!
      </p>
    </div>
  )
}
