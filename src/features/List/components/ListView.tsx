import { Button } from "@/components/elements/Button";
import { useListStore } from "../store/listStore";
import { ListEmptyState } from "./itemEmptyState";
import { ListItem } from "./ListItem";
import { ListModal } from "./listModal";
import { useState } from "react";

export default function ListView() {
  const { listItems } = useListStore();
  const [open, setOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setOpen(true);
  };

  const handleCreate = () => {
    setEditingItem(null);
    setOpen(true);
  };

  return (
    <>
      <div className="p-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">List Management</h2>
          <Button onClick={handleCreate}>Create</Button>
        </div>

        <div className="space-y-3 mt-2">
          {listItems.length ? (
            listItems.map((item) => (
              <ListItem key={item.id} item={item} onEdit={handleEdit} />
            ))
          ) : (
            <ListEmptyState />
          )}
        </div>

        <ListModal
          open={open}
          onOpenChange={setOpen}
          editingItem={editingItem}
        />
      </div>
    </>
  );
}
