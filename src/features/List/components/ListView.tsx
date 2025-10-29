import { useListStore } from "../store/listStore";
import { ListEmptyState } from "./itemEmptyState";
import { ListItemCard } from "./ListItemCard";

export default function ListView() {
  const { listItems } = useListStore();

  if (listItems.length === 0) return <ListEmptyState />;

  return (
    <>
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">List Items</h2>

        {listItems.map((listItem) => (
          <ListItemCard key={listItem.id} listItem={listItem} />
        ))}
      </div>
    </>
  );
}
