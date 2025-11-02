import React from "react";
import { Button } from "@/components/elements/Button";
import { Edit, Trash2 } from "lucide-react";
import { formatDate, dateFormats } from "@/lib/utils";
import type { ListItem as ListItemType } from "../types";

interface ListItemProps {
  item: Readonly<ListItemType>;
  onEdit: (item: ListItemType) => void;
  onDelete: (item: ListItemType) => void;
}

export const ListItem = React.memo(({ item, onEdit, onDelete }: ListItemProps) => {
  return (
    <article className="flex items-center justify-between gap-2 p-3 rounded-xl border bg-card shadow-sm hover:shadow-md transition">
      <div>
        <h3 className="font-semibold text-lg">{item.title}</h3>
        {item.subtitle && (
          <p className="text-muted-foreground text-sm">{item.subtitle}</p>
        )}
        <time
          dateTime={item.createdAt.toString()}
          className="text-xs text-muted-foreground mt-1 block"
        >
          {formatDate(item.createdAt, dateFormats.dateTime)}
        </time>
      </div>

      <div className="flex gap-2">
        <Button
          size="sm"
          variant="secondary"
          aria-label="Edit item"
          onClick={() => onEdit(item)}
        >
          <Edit className="w-4 h-4" />
        </Button>
        <Button
          size="sm"
          variant="destructive"
          aria-label="Delete item"
          onClick={() => onDelete(item)}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </article>
  );
});

ListItem.displayName = "ListItem";
