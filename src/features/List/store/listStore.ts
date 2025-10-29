import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ListItem } from "../types";
import { listServices } from "../services/listServices";

interface ListStore {
  listItems: ListItem[];
  addItem: (item: Omit<ListItem, "id" | "createdAt">) => void;
  updateItem: (item: ListItem) => void;
  deleteItem: (id: string) => void;
  clearAll: () => void;
}

export const useListStore = create<ListStore>()(
  persist(
    (set) => ({
      listItems: [],

      // Add new list item to the store
      addItem: data => {
        const newItem: ListItem = {
          id: crypto.randomUUID(),
          title: data.title,
          subTitle: data.subTitle,
          createdAt: new Date(),
        };
        const updated = listServices.create(newItem);
        set({ listItems: updated });
      },

      // update existing list item
      updateItem: (item: ListItem) => {
        const updated = listServices.update(item);
        set({ listItems: updated });
      },

      // Delete list item by id
      deleteItem: (id: string) => {
        const updated = listServices.delete(id);
        set({ listItems: updated });
      },

      // clear all list items
      clearAll: () => {
        listServices.clearAll();
        set({ listItems: [] });
      }
    }),
    {
      name: "list-storage",
      // Ensure data is loaded from localStorage on initialization
      onRehydrateStorage: () => (state) => {
        if (state) {
          const storedItems = listServices.getAll();
          state.listItems = storedItems;
        }
      },
    }
  )
);
