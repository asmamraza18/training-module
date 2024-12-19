import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { QuizItem } from "@/types";
import { DraggableItem } from "./-draggableItem";

interface DroppableColumnProps {
  id: string;
  title: string;
  items: QuizItem[];
}

export function DroppableColumn({ id, title, items }: DroppableColumnProps) {
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <div className="flex flex-col gap-2">
      <div className="font-medium text-center p-2 bg-muted rounded-t-lg">{title}</div>
      <div ref={setNodeRef} className="min-h-[200px] p-4 rounded-lg border-2 border-dashed flex flex-col gap-2">
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          {items.map((item) => (
            <DraggableItem key={item.id} item={item} />
          ))}
        </SortableContext>
      </div>
    </div>
  );
}
