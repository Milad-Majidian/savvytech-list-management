import { Button } from "@/components/elements/Button";
import { ConfirmModal } from "@/components/elements/ConfirmModal";
import { useListStore } from "../store/listStore";
import { ListEmptyState } from "./itemEmptyState";
import { ListItem } from "./ListItem";
import { ListModal } from "./listModal";
import { useListModals } from "../hooks/useListModals";

export default function ListView() {
  const { listItems, deleteItem } = useListStore();
  const {
    open, setOpen, editingItem,
    confirmOpen, setConfirmOpen,
    deletingItem, openCreate, openEdit, openDelete, closeConfirm
  } = useListModals();

  const handleConfirmDelete = () => {
    if (deletingItem) {
      deleteItem(deletingItem.id);
      closeConfirm();
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">List Management</h2>
        <Button onClick={openCreate}>Create</Button>
      </div>

      <div className="space-y-3 mt-2">
        {listItems.length ? (
          listItems.map(item => (
            <ListItem key={item.id} item={item} onEdit={openEdit} onDelete={openDelete} />
          ))
        ) : (
          <ListEmptyState />
        )}
      </div>

      <ListModal open={open} onOpenChange={setOpen} editingItem={editingItem} />
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
    </div>
  );
}
