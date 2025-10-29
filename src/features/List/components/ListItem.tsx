import type { ListItem } from "../types";
import { Button } from "@/components/elements/Button";
import { Edit, Trash2 } from "lucide-react";
import { formatDate, dateFormats } from "@/lib/utils";

interface ListItemProps {
  item: ListItem;
  onEdit: (listItem:ListItem) => void;
  onDelete: (listItem:ListItem) => void;
}

export function ListItem({ item , onEdit, onDelete }: ListItemProps) {

  return (
    <>
      <div className="flex items-center justify-between gap-2 p-3 rounded-xl border bg-card shadow-sm hover:shadow-md transition">
          <div>
        <h3 className="font-semibold text-lg">{item.title}</h3>
       {item.subTitle && <p className="text-muted-foreground text-sm">{item.subTitle}</p>}
        <p className="text-xs text-muted-foreground mt-1">
          {formatDate(item.createdAt, dateFormats.dateTime)}
        </p>
      </div>
      <div className="space-x-2">
        <Button size="sm" variant="secondary" onClick={() => onEdit(item)} className="cursor-pointer">
          <Edit className="w-4 h-4" />
        </Button>
        <Button size="sm" variant="destructive" onClick={() => onDelete(item)} className="cursor-pointer">
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
      </div>
    </>
  );
}
