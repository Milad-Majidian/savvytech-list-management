import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ListItem } from "../types";
import { listServices } from "../services/listServices";

interface ListStore {
  listItems: ListItem[];
  addItem: (item: Omit<ListItem, "id" | "createdAt">) => void;
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


      // Delete list item by id


      // clear all list items

      // clear all list items
      clearAll: () => {
        listServices.clearAll();
        set({ listItems: [] });
      }
    }),
    {
      name: "list-storage",
    }
  )
);
