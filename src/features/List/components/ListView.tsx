import { useState } from "react";
import { Button } from "@/components/elements/Button";
import { ConfirmModal } from "@/components/elements/ConfirmModal";
import { useListStore } from "../store/listStore";
import { ListEmptyState } from "./itemEmptyState";
import { ListModal } from "./listModal";
import { useListModals } from "../hooks/useListModals";
import { formatDate, dateFormats } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Edit, Plus, Trash2 } from "lucide-react";

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
          <h2 className="text-2xl font-semibold tracking-tight">List Management</h2>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            onClick={() => setConfirmClearOpen(true)}
            disabled={listItems.length === 0}
            aria-label="Clear all items"
            className="cursor-pointer text-red-600 border-red-600 hover:bg-red-600/10 hover:text-red-700"
          >
            Clear all
          </Button>
          <Button onClick={openCreate} aria-label="Create item" 
          className="hover:bg-blue-50 hover:text-blue-600 cursor-pointer">
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
                  <th className="w-[100px] px-4 py-3 font-medium text-muted-foreground text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <AnimatePresence initial={false}>
                  {listItems.map((item) => (
                    <motion.tr
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
                      className="hover:bg-muted/30"
                    >
                      <td className="px-4 py-3 font-medium text-foreground text-left">{item.title}</td>
                      <td className="px-4 py-3 text-muted-foreground text-left">{item.subtitle || "—"}</td>
                      <td className="px-4 py-3 text-muted-foreground text-left">
                        {formatDate(item.createdAt, dateFormats.dateTime)}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-2">
                          <Button size="sm" variant="secondary" aria-label={`Edit ${item.title}`} onClick={() => openEdit(item)} className="hover:bg-zinc-50 cursor-pointer">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="destructive" aria-label={`Delete ${item.title}`} onClick={() => openDelete(item)} className="hover:bg-red-600/10 hover:text-red-700 cursor-pointer">
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </Button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
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
