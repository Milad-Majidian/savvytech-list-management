import { useState } from "react";
import type { ListItem } from "../types";

export function useListModals() {
  const [open, setOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ListItem | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deletingItem, setDeletingItem] = useState<ListItem | null>(null);

  const openCreate = () => { setEditingItem(null); setOpen(true); };
  const openEdit = (item: ListItem) => { setEditingItem(item); setOpen(true); };
  const openDelete = (item: ListItem) => { setDeletingItem(item); setConfirmOpen(true); };
  const closeConfirm = () => { setDeletingItem(null); setConfirmOpen(false); };

  return {
    open, setOpen,
    editingItem,
    confirmOpen, setConfirmOpen,
    deletingItem,
    openCreate, openEdit, openDelete, closeConfirm
  };
}
