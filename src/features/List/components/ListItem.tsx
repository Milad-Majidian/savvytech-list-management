import type { ListItem } from "../types";
import { Button } from "@/components/elements/Button";
import { Edit } from "lucide-react";

interface ListItemProps {
  item: ListItem;
  onEdit: (listItem:ListItem) => void;
}

export function ListItem({ item , onEdit }: ListItemProps) {

   const format = (date: Date, formatStr: string) => {  
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const hours = String(d.getHours()).padStart(2, "0");
    const minutes = String(d.getMinutes()).padStart(2, "0");

    return formatStr
      .replace("yyyy", String(year))
      .replace("MM", month)
      .replace("dd", day)
      .replace("HH", hours)
      .replace("mm", minutes);
  };

  return (
    <>
      <div className="flex items-center justify-between gap-2 p-3 rounded-xl border bg-card shadow-sm hover:shadow-md transition">
          <div>
        <h3 className="font-semibold text-lg">{item.title}</h3>
       {item.subTitle && <p className="text-muted-foreground text-sm">{item.subTitle}</p>}
        <p className="text-xs text-muted-foreground mt-1">
          {format(item.createdAt, "yyyy-MM-dd HH:mm")}
        </p>
      </div>
      <div className="space-x-2">
        <Button size="sm" variant="secondary" onClick={() => onEdit(item)} className="cursor-pointer">
          <Edit className="w-4 h-4" />
        </Button>
        <Button size="sm" variant="destructive" onClick={() => {}}>
          Delete
        </Button>
      </div>
      </div>
    </>
  );
}
