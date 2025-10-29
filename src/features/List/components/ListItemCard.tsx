import { useState } from "react";
import type { ListItem } from "../types";
import { Input } from "@/components/elements/Input";
import { Button } from "@/components/elements/Button";

export function ListItemCard({ listItem }: { listItem: ListItem }) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(listItem.title);
  const handleSave = () => {
    setIsEditing(false);
  };
  return (
    <>
      <div className="flex items-center justify-between gap-2 p-3 rounded-xl border bg-card shadow-sm hover:shadow-md transition">
        {isEditing ? (
          <Input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="flex-1 text-sm border p-1 rounded"
            onBlur={handleSave}
            autoFocus
          />
        ) : (
          <>
            <span className="flex-1 text-sm"> {listItem.title}</span>
            <span className="flex-1 text-sm"> {listItem.subTitle}</span>
          </>
        )}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? "Save" : "Edit"}
          </Button>
          <Button variant="destructive" size="sm" onClick={() => {}}>
            Delete
          </Button>
        </div>
      </div>
    </>
  );
}
