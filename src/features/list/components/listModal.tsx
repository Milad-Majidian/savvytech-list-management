"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Modal, ModalFooter } from "@/components/elements/Modal";
import { Input } from "@/components/elements/Input";
import { Button } from "@/components/elements/Button";
import { useListStore } from "../store/listStore";
import { listItemSchema, type ListFormData } from "../schemas";
import type { ListItem } from "../types";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingItem?: ListItem | null;
}

export const ListModal = ({ open, onOpenChange, editingItem }: Props) => {
  const { addItem, updateItem } = useListStore();

  const form = useForm<ListFormData>({
    resolver: zodResolver(listItemSchema),
    defaultValues: { title: "", subtitle: "" },
  });

  useEffect(() => {
    if (open) {
      form.reset({
        title: editingItem?.title ?? "",
        subtitle: editingItem?.subtitle ?? "",
      });
    }
  }, [open, editingItem, form]);

  /**
   * Handles form submission for creating or updating a list item.
   * 
   * @param data - The form data containing title and optional subtitle
   * @description If editingItem exists, updates the existing item with new data.
   * Otherwise, creates a new item. Closes the modal after successful submission.
   */
  const handleSubmit = (data: ListFormData) => {
    const payload = { title: data.title, subtitle: data.subtitle ?? "" };
    editingItem ? updateItem({ ...editingItem, ...payload }) : addItem(payload);
    onOpenChange(false);
  };

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title={editingItem ? "Edit Item" : "Create Item"}
      description={editingItem ? "Update your list item details" : "Create a new list item"}
      size="md"
      footer={
        <ModalFooter className="gap-4">
            <Button 
            appVariant="ghost" 
            onClick={() => onOpenChange(false)}
            className="border border-zinc-200 cursor-pointer text-white"
            >
            Cancel
            </Button>
            <Button 
            type="submit" 
            form="list-item-form"
            className="bg-blue-500 text-primary-foreground hover:bg-blue-600 cursor-pointer"
            >
            {editingItem ? "Update" : "Create"}
            </Button>
        </ModalFooter>
      }
    >
      <form id="list-item-form" onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="title" className="text-sm font-medium">Title</label>
          <Input id="title" placeholder="Enter item title" {...form.register("title")} />
          {form.formState.errors.title && (
            <p className="text-sm text-destructive">{form.formState.errors.title.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="subtitle" className="text-sm font-medium">Subtitle</label>
          <Input id="subtitle" placeholder="Enter item subtitle (optional)" {...form.register("subtitle")} />
        </div>
      </form>
    </Modal>
  );
};
