import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { QuizItem } from "@/types";

interface DraggableItemProps {
  item: QuizItem;
}

export function DraggableItem({ item }: DraggableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: item.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="p-3 bg-background rounded-lg border cursor-move hover:bg-accent transition-colors"
    >
      {item.content}
    </div>
  );
}
