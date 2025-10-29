// src/features/list/components/ListModal.tsx
"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Modal, ModalFooter } from "@/components/elements/Modal";
import type { ListItem } from "../types";
import { useListStore } from "../store/listStore";
import { Input } from "@/components/elements/Input";
import { Button } from "@/components/elements/Button";

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  subtitle: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingItem?: ListItem | null;
}

export const ListModal = ({ open, onOpenChange, editingItem }: Props) => {
  const { addItem, updateItem } = useListStore();

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      subtitle: "",
    },
  });

  // Reset form when modal opens/closes or editingItem changes
  React.useEffect(() => {
    if (open) {
      if (editingItem) {
        form.reset({
          title: editingItem.title,
          subtitle: editingItem.subTitle,
        });
      } else {
        form.reset({
          title: "",
          subtitle: "",
        });
      }
    }
  }, [open, editingItem, form]);

  const handleSubmit = (data: FormData) => {
    if (editingItem) {
      updateItem({
        ...editingItem,
        title: data.title,
        subTitle: data.subtitle || "",
      });
    } else {
      addItem({
        title: data.title,
        subTitle: data.subtitle || "",
      });
    }
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
        <ModalFooter>
          <Button 
            appVariant="ghost" 
            onClick={() => onOpenChange(false)}
            className="border border-gray-500/50 rounded-md"

          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            form="list-item-form"
            appVariant="primary"
            className="border border-gray-800/50 rounded-md"
          >
            {editingItem ? "Update" : "Create"}
          </Button>
        </ModalFooter>
      }
    >
      <form
        id="list-item-form"
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-4"
      >
        <div className="space-y-2">
          <label htmlFor="title" className="text-sm font-medium">
            Title
          </label>
          <Input 
            id="title"
            placeholder="Enter item title" 
            {...form.register("title")} 
            className={form.formState.errors.title ? "border-destructive" : ""}
          />
          {form.formState.errors.title && (
            <p className="text-sm text-destructive">
              {form.formState.errors.title.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="subtitle" className="text-sm font-medium">
            Subtitle
          </label>
          <Input 
            id="subtitle"
            placeholder="Enter item subtitle (optional)" 
            {...form.register("subtitle")} 
          />
        </div>
      </form>
    </Modal>
  );
};
