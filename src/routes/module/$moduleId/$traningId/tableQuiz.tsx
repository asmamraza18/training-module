import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useContext, useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  closestCorners,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { columns, quizItems } from "@/quiz-data";
import { QuizItem } from "@/types";
import { DroppableColumn } from "./-droppableColumn";
import { BookCheck, Check, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { AuthContext } from "@/context/AuthProvider";
import db, { trainingProgress, moduleProgress, users } from "@/lib/db";
import { and, eq } from "drizzle-orm";
export const Route = createFileRoute("/module/$moduleId/$traningId/tableQuiz")({
  component: TableQuiz,
});

// Shuffle function to randomize items while keeping them in their respective columns
const shuffleItems = (items: QuizItem[]): QuizItem[] => {
  // Group items by type
  const itemsByType: { [key: string]: QuizItem[] } = {};
  items.forEach((item) => {
    if (!itemsByType[item.type]) {
      itemsByType[item.type] = [];
    }
    itemsByType[item.type].push(item);
  });

  // Shuffle each group
  Object.keys(itemsByType).forEach((type) => {
    itemsByType[type] = itemsByType[type].sort(() => Math.random() - 0.5);
  });

  // Flatten back into a single array
  return Object.values(itemsByType).flat();
};

function TableQuiz() {
  const { traningId, moduleId } = Route.useParams();
  const { user } = useContext(AuthContext);
  const [items, setItems] = useState<QuizItem[]>(() => shuffleItems(quizItems));
  const [activeId, setActiveId] = useState<string | null>(null);
  const [score, setScore] = useState<number | null>(null);
  const sensors = useSensors(useSensor(PointerSensor));
  const navigate = useNavigate();

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);

      setItems(arrayMove(items, oldIndex, newIndex));
    }

    setActiveId(null);
  };

  const checkAnswers = () => {
    let correctCount = 0;
    const totalQuestions = items.length;

    // Group items by type
    const itemsByType: { [key: string]: QuizItem[] } = {};
    items.forEach((item) => {
      if (!itemsByType[item.type]) {
        itemsByType[item.type] = [];
      }
      itemsByType[item.type].push(item);
    });

    // Check each column
    Object.values(itemsByType).forEach((columnItems) => {
      // Compare each item's position with its stepNumber
      columnItems.forEach((item, index) => {
        // Step numbers are 1-based, index is 0-based
        if (item.stepNumber === index + 1) {
          correctCount++;
        }
      });
    });

    const calculatedScore = (correctCount / totalQuestions) * 100;
    setScore(calculatedScore);
  };

  const resetQuiz = () => {
    setItems(shuffleItems(quizItems));
    setScore(null);
  };

  const insertResultQuiz = async (id: number, quizResult: number) => {
    try {
      // Check if a record already exists
      const existingRecord = await db.select().from(users).where(eq(users.id, id)).get();

      if (existingRecord) {
        //Insert quizResult
        await db
          .update(users)
          .set({
            quizResult: quizResult,
          })
          .where(and(eq(users.id, user.id)))
          .run();
        return { type: "update", id: existingRecord.id };
      }
    } catch (error) {
      console.error("Error in insertResultQuiz:", error);
      throw error;
    }
  };

  const upsertTrainingProgress = async (data: {
    userId: number;
    trainingId: number;
    status?: "not_started" | "in_progress" | "completed";
    progress?: number;
    startedAt?: Date;
    completedAt?: Date;
    lastAccessedAt?: Date;
  }) => {
    try {
      // Check if a record already exists
      const existingRecord = await db
        .select()
        .from(trainingProgress)
        .where(and(eq(trainingProgress.userId, data.userId), eq(trainingProgress.trainingId, data.trainingId)))
        .get();

      if (existingRecord) {
        // If record exists, update it
        await db
          .update(trainingProgress)
          .set({
            status: data.status ?? existingRecord.status,
            progress: data.progress ?? existingRecord.progress,
            startedAt: data.startedAt ?? existingRecord.startedAt,
            completedAt: data.completedAt ?? existingRecord.completedAt,
            lastAccessedAt: data.lastAccessedAt ?? new Date(),
          })
          .where(and(eq(trainingProgress.userId, data.userId), eq(trainingProgress.trainingId, data.trainingId)))
          .run();

        return { type: "update", id: existingRecord.id };
      } else {
        // If no record exists, insert a new one
        const inserted = await db
          .insert(trainingProgress)
          .values({
            userId: data.userId,
            trainingId: data.trainingId,
            status: data.status ?? "not_started",
            progress: data.progress ?? 0,
            startedAt: data.startedAt,
            completedAt: data.completedAt,
            lastAccessedAt: data.lastAccessedAt ?? new Date(),
          })
          .returning(); // Note: Depending on your Drizzle version, you might need to adjust this

        return { type: "insert", id: inserted[0].id };
      }
    } catch (error) {
      console.error("Error in upsertTrainingProgress:", error);
      throw error;
    }
  };

  const upsertModuleProgress = async (data: {
    userId: number;
    moduleId: number;
    status?: "not_started" | "in_progress" | "completed";
    progress?: number;
    startedAt?: Date;
    completedAt?: Date;
    lastAccessedAt?: Date;
  }) => {
    try {
      // Check if a record already exists
      const existingRecord = await db
        .select()
        .from(moduleProgress)
        .where(and(eq(moduleProgress.userId, data.userId), eq(moduleProgress.moduleId, data.moduleId)))
        .get();

      if (existingRecord) {
        // If record exists, update it
        await db
          .update(moduleProgress)
          .set({
            status: data.status ?? existingRecord.status,
            progress: data.progress ?? existingRecord.progress,
            startedAt: data.startedAt ?? existingRecord.startedAt,
            completedAt: data.completedAt ?? existingRecord.completedAt,
            lastAccessedAt: data.lastAccessedAt ?? new Date(),
          })
          .where(and(eq(moduleProgress.userId, data.userId), eq(moduleProgress.moduleId, data.moduleId)))
          .run();

        return { type: "update", id: existingRecord.id };
      } else {
        // If no record exists, insert a new one
        const inserted = await db
          .insert(moduleProgress)
          .values({
            userId: data.userId,
            moduleId: data.moduleId,
            status: data.status ?? "not_started",
            progress: data.progress ?? 0,
            startedAt: data.startedAt,
            completedAt: data.completedAt,
            lastAccessedAt: data.lastAccessedAt ?? new Date(),
          })
          .returning();

        return { type: "insert", id: inserted[0].id };
      }
    } catch (error) {
      console.error("Error in upsertModuleProgress:", error);
      throw error;
    }
  };

  const scoreResult = ((score ?? 0) / 100) * 7.5 + user.quizResult;

  const handleTrainingProgress = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      const quizResult = await insertResultQuiz(
        user.id, // first argument: id
        scoreResult // second argument: quizResult
      );
      console.log("Quiz Result:", quizResult);
      // Upsert Training Progress
      const trainingProgressResult = await upsertTrainingProgress({
        userId: user.id,
        trainingId: parseInt(traningId),
        status: "completed",
        progress: 100, // You can adjust this initial progress
        lastAccessedAt: new Date(),
      });
      console.log("Training Progress Result:", trainingProgressResult);
      // Upsert Module Progress
      const moduleProgressResult = await upsertModuleProgress({
        userId: user.id,
        moduleId: parseInt(moduleId), // from the current page's module ID
        status: "completed",
        progress: 100, // You can adjust this initial progress
        lastAccessedAt: new Date(),
      });
      console.log("Module Progress Result:", moduleProgressResult);

      // Navigate to regular training route
      toast.success("Training Completed!", {
        description: "You completed this training",
        duration: 3000,
        position: "top-right",
        icon: "👏",
      });
      navigate({ to: "/dashboard" });
    } catch (error) {
      if (error instanceof Error) {
        console.error("Failed to upsert training progress:", error.message);
        // Handle the error appropriately (e.g., show user-friendly message)
      }
    }
  };

  return (
    <div className="container mx-auto p-4 ">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Welding Operations Safety Quiz</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <p className="text-muted-foreground">
              Drag and drop the items within each column to sort them in the correct order based on the step numbers.
            </p>
          </div>

          <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <div className="grid grid-cols-4 gap-4">
              {columns.map((column) => (
                <DroppableColumn
                  key={column.id}
                  id={column.id}
                  title={column.title}
                  items={items.filter((item) => item.type === column.id)}
                />
              ))}
            </div>

            <DragOverlay>
              {activeId ? (
                <div className="p-4 rounded-lg bg-background shadow-lg border">
                  {items.find((item) => item.id === activeId)?.content}
                </div>
              ) : null}
            </DragOverlay>
          </DndContext>

          <div className="mt-6 flex items-center gap-4">
            <Button onClick={checkAnswers} className="gap-2">
              <Check className="w-4 h-4" />
              Check Answers
            </Button>
            <Button variant="outline" onClick={resetQuiz} className="gap-2">
              <RefreshCw className="w-4 h-4" />
              Reset Quiz
            </Button>
            {score !== null && <div className="text-lg font-medium">Score: {score.toFixed(0)}%</div>}

            <Button
              //disabled={(score || 0) <= 50}
              onClick={handleTrainingProgress}
              className="relative gap-2 inset-y-0 right-0"
            >
              <BookCheck className="w-4 h-4" />
              Complete Training
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
