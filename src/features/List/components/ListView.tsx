import { useState } from "react";
import { Button } from "@/components/elements/Button";
import { ConfirmModal } from "@/components/elements/ConfirmModal";
import { useListStore } from "../store/listStore";
import { useListModals } from "../hooks/useListModals";
import { formatDate, dateFormats } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Edit, Trash2, ListChecks } from "lucide-react";
import { ListModal } from "./listModal";
import { ListEmptyState } from "./itemEmptyState";

export default function ListView() {
  const { listItems, deleteItem, clearAll } = useListStore();
  const {
    open, setOpen, editingItem,
    confirmOpen, setConfirmOpen,
    deletingItem, openCreate, openEdit, openDelete, closeConfirm
  } = useListModals();
  const [confirmClearOpen, setConfirmClearOpen] = useState(false);

  const handleConfirmDelete = () => {
    if (deletingItem) {
      deleteItem(deletingItem.id);
      closeConfirm();
    }
  };

  return (
    <div className="p-4">
      {/* Header */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-left">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-muted text-muted-foreground">
              <ListChecks className="h-6 w-6" aria-hidden="true" />
            </span>
            <h2 className="text-2xl font-semibold tracking-tight text-muted-foreground">List Management</h2>
          </div>
        </div>
        <div className="flex items-center gap-2">
            <Button
            variant="secondary"
            onClick={() => setConfirmClearOpen(true)}
            disabled={listItems.length === 0}
            aria-label="Clear all items"
            className="bg-gray-50 text-red-600 hover:bg-red-50 cursor-pointer"
            >
            Clear all
            </Button>
            <Button onClick={openCreate} aria-label="Create item" 
            className="bg-gray-50 text-black hover:bg-blue-100 duration-200 cursor-pointer">
            Create
            </Button>
        </div>
      </div>

      {/* Table */}
      {listItems.length > 0 ? (
        <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
          <div className="relative">
            <table className="w-full min-w-[720px] text-sm">
              <thead className="bg-muted/50">
                <tr className="text-left text-gray-400 border-b border-gray-200 dark:border-gray-700">
                  <th className="px-4 py-3 font-medium text-muted-foreground text-left">Title</th>
                  <th className="px-4 py-3 font-medium text-muted-foreground text-left">Subtitle</th>
                  <th className="px-4 py-3 font-medium text-muted-foreground text-left">Created</th>
                  <th className="px-4 py-3 font-medium text-muted-foreground text-left">Updated</th>
                  <th className="w-[120px] px-4 py-3 font-medium text-muted-foreground text-center">Actions</th>
                </tr>
              </thead>
              <motion.tbody layout className="divide-y">
                <AnimatePresence initial={false} mode="popLayout">
                  {listItems.map((item) => (
                    <motion.tr
                      key={item.id}
                      layout="position"
                      initial={{ opacity: 0, y: 8, backgroundColor: 'hsl(var(--accent) / 0.06)' }}
                      animate={{ opacity: 1, y: 0, backgroundColor: 'transparent' }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{
                        opacity: { duration: 0.18 },
                        y: { duration: 0.22, ease: [0.2, 0.8, 0.2, 1] },
                        backgroundColor: { duration: 0.6, ease: 'easeOut' },
                        layout: { duration: 0.22 }
                      }}
                      className="hover:bg-muted/30"
                    >
                      <td className="px-4 py-3 font-medium text-foreground text-left">{item.title}</td>
                      <td className="px-4 py-3 text-muted-foreground text-left">{item.subtitle || "—"}</td>
                      <td className="px-4 py-3 text-muted-foreground text-left">
                        {formatDate(item.createdAt, dateFormats.dateTime)}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground text-left">
                        {item.updatedAt ? formatDate(item.updatedAt, dateFormats.dateTime) : "—"}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-2">
                          <Button size="sm" variant="secondary" aria-label={`Edit ${item.title}`} onClick={() => openEdit(item)} className="cursor-pointer">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="destructive" aria-label={`Delete ${item.title}`} onClick={() => openDelete(item)} className="cursor-pointer">
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </Button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </motion.tbody>
            </table>
          </div>
        </div>
      ) : (
        <ListEmptyState />
      )}

      {/* Create/Edit Modal */}
      <ListModal open={open} onOpenChange={setOpen} editingItem={editingItem} />

      {/* Delete Item Confirm */}
      <ConfirmModal
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="Delete Item"
        description={`Are you sure you want to delete "${deletingItem?.title}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        variant="destructive"
        onConfirm={handleConfirmDelete}
      />

      {/* Clear All Confirm */}
      <ConfirmModal
        open={confirmClearOpen}
        onOpenChange={setConfirmClearOpen}
        title="Clear all items"
        description="This will remove all items from your list. This action cannot be undone."
        confirmText="Clear all"
        cancelText="Cancel"
        variant="destructive"
        onConfirm={() => { clearAll(); setConfirmClearOpen(false); }}
      />
    </div>
  );
}
