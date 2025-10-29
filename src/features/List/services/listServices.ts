import type { ListItem } from "../types";


const STORAGE_KEY = 'list-Items';


export const listServices = {
    getAll:(): ListItem[] => {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    },

    saveAll: (Items: ListItem[]): void => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(Items));
    },

    create: (Item: ListItem): ListItem[] => {
        const listItems = listServices.getAll();
        const updatedListItems = [...listItems, Item];
        listServices.saveAll(updatedListItems);
        return updatedListItems;
    },

    update: (updatedItem: ListItem): ListItem[] => {
        const listItems = listServices.getAll();
        const updatedListItems = listItems.map(item =>
            item.id === updatedItem.id ? updatedItem : item
        );
        listServices.saveAll(updatedListItems);
        return updatedListItems;
    },

    delete: (id: string): ListItem[] => {
        const listItems = listServices.getAll();
        const updatedListItems = listItems.filter(item => item.id !== id);
        listServices.saveAll(updatedListItems);
        return updatedListItems;
    },

    clearAll: (): void => {
        localStorage.removeItem(STORAGE_KEY);
    }
}