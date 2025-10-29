import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ListItem } from '../types';


interface ListStore {
    listItems: ListItem[];
    }

export const useListStore = create<ListStore>()(
    persist(
        (set) => ({
            listItems: [], 
        }),
        {
            name: 'list-storage', 
        }
    )
);

