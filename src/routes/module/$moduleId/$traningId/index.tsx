import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import React, { useState, useRef, useContext } from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { CheckCircle, PlayCircle, Info } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import db, { trainings, moduleProgress, trainingProgress } from "@/lib/db";
import { eq, and, inArray, sql } from "drizzle-orm";
import { AuthContext } from "@/context/AuthProvider";
import { toast } from "sonner";

export const Route = createFileRoute("/module/$moduleId/$traningId/")({
  component: Training,
  loader: async () => {
    const moduleProgressData = await db.select().from(moduleProgress);
    const trainingData = await db.select().from(trainings);

    return { moduleProgress1: moduleProgressData, trainings1: trainingData }; // Combine both results
  },
});

function Training() {
  const { traningId } = Route.useParams();
  const { trainings1 } = Route.useLoaderData();
  const { user } = useContext(AuthContext);
  const selectedTraining = trainings1.filter((training) => training.id.toString() == traningId);
  const navigate = useNavigate();

  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [hasWatched, setHasWatched] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  const breadcrumbSegments = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Modules", href: "/module/1" },
    { name: "Welding Machine", href: "/module/1/1" },
  ];

  const videoRef = useRef<HTMLVideoElement>(null);

  const videoUrl = `/assets/trainingVideo/${traningId}.mp4`;

  const handleVideoProgress = () => {
    if (videoRef.current) {
      const percentage = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(Math.round(percentage));
    }
  };

  const handleVideoEnd = () => {
    setHasWatched(true);
    setProgress(100);
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

  const upsertModuleProgress = async (userId: number, moduleId: number) => {
    try {
      // 1. Find all trainings for this module
      const moduleTrainings = await db
        .select({ id: trainings.id })
        .from(trainings)
        .where(eq(trainings.moduleId, moduleId));

      // 2. Check if training progress exists for all trainings
      const trainingProgressCount = await db
        .select({ count: sql<number>`COUNT(*)` })
        .from(trainingProgress)
        .where(
          and(
            eq(trainingProgress.userId, userId),
            inArray(
              trainingProgress.trainingId,
              moduleTrainings.map((t) => t.id)
            )
          )
        )
        .get();

      // 3. Check if the number of training progresses matches total trainings in the module
      const allTrainingsHaveProgress = trainingProgressCount?.count === moduleTrainings.length;

      // 4. If all trainings have progress, check if they are completed
      let allTrainingsCompleted = false;
      if (allTrainingsHaveProgress) {
        const trainingProgresses = await db
          .select({ status: trainingProgress.status })
          .from(trainingProgress)
          .where(
            and(
              eq(trainingProgress.userId, userId),
              inArray(
                trainingProgress.trainingId,
                moduleTrainings.map((t) => t.id)
              )
            )
          );

        allTrainingsCompleted = trainingProgresses.every((tp) => tp.status === "completed");
      }

      // 5. If all trainings are completed, update module progress
      if (allTrainingsCompleted) {
        await db
          .update(moduleProgress)
          .set({
            status: "completed",
            progress: 100,
            completedAt: new Date(),
          })
          .where(and(eq(moduleProgress.userId, userId), eq(moduleProgress.moduleId, moduleId)));

        toast.success("Module Completed!", {
          description: "You completed this Module",
          duration: 3000,
          position: "top-right",
          icon: "👏",
        });
        console.log(`Module ${moduleId} completed for user ${userId}`);
      }

      return allTrainingsCompleted;
    } catch (error) {
      console.error("Error updating module progress:", error);
      throw error;
    }
  };

  const handleConfirmCompletion = async (e: any, trainingId: number) => {
    if (hasWatched) {
      setIsCompleted(true);
      e.preventDefault();
      try {
        // Upsert Training Progress
        const trainingProgressResult = await upsertTrainingProgress({
          userId: user.id,
          trainingId: trainingId,
          status: "completed",
          progress: 100,
          lastAccessedAt: new Date(),
        });
        console.log("Training Progress Result:", trainingProgressResult);

        // Find the module for this training
        const training = await db
          .select({ moduleId: trainings.moduleId })
          .from(trainings)
          .where(eq(trainings.id, trainingId))
          .get();

        // If a module is found, check and update module progress
        if (training?.moduleId) {
          await upsertModuleProgress(user.id, training.moduleId);
        }
        // Optionally, navigate to the training page
        navigate({ to: "/dashboard" });
      } catch (error) {
        if (error instanceof Error) {
          console.error("Failed to upsert training progress:", error.message);
          // Handle the error appropriately (e.g., show user-friendly message)
        }
      }
    } else {
      alert("Please watch the entire video before confirming completion.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {selectedTraining.map((training) => (
        <Breadcrumb key={training.id} segments={breadcrumbSegments} className="mb-6">
          <BreadcrumbList>
            {/* Home link */}
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Home</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator />

            {/* Trainings link */}
            <BreadcrumbItem>
              <BreadcrumbLink href="/module/1">Module</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator />

            {/* Current page */}
            <BreadcrumbItem>
              <BreadcrumbPage>{training.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      ))}
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          <div className="aspect-w-16 aspect-h-9 mb-4">
            <video
              ref={videoRef}
              className="w-full h-full rounded-lg shadow-lg"
              controls
              onTimeUpdate={handleVideoProgress}
              onEnded={handleVideoEnd}
            >
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          {selectedTraining.map((training) => (
            <Card key={training.id} className="mt-4">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Info className="mr-2 text-blue-500" />
                  Topic Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <h3 className="font-semibold mb-2">Key Points:</h3>
                <ul className="list-disc pl-5">
                  {training.additionalInfo
                    ?.split("- ")
                    .filter((point) => point.trim() !== "")
                    .map((point, index) => (
                      <li key={index} className="mb-2">
                        {point.trim()}
                      </li>
                    ))}
                </ul>
                <h3 className="font-semibold mt-4 mb-2">Information Figure:</h3>
                <p>{training.imageInfo}</p>
                <img
                  src={`/assets/trainingImages/${training.id}.png`}
                  alt={`${training.title} Training Image`}
                  className="mt-4 w-full max-w-md rounded-lg shadow-md"
                />
              </CardContent>
            </Card>
          ))}
        </div>
        {selectedTraining.map((training) => (
          <div key={training.id} className="lg:w-1/3 bg-white p-6 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold mb-4">{training.title}</h1>
            <p className="text-gray-600 mb-4">{training.description}</p>
            <div className="mb-4">
              <h2 className="text-lg font-semibold mb-2">Video Progress</h2>
              <Progress value={progress} className="w-full" />
              <p className="text-sm text-gray-500 mt-1">{progress}% completed</p>
            </div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <PlayCircle className="text-blue-500 mr-2" />
                <span className="text-sm text-gray-600">{training.duration} minutes</span>
              </div>
              <div className="flex items-center">
                {isCompleted ? (
                  <CheckCircle className="text-green-500 mr-2" />
                ) : (
                  <div className="w-4 h-4 rounded-full bg-yellow-500 mr-2"></div>
                )}
                <span className="text-sm text-gray-600">{isCompleted ? "Completed" : "In Progress"}</span>
              </div>
            </div>
            <Button onClick={(e) => handleConfirmCompletion(e, training.id)} disabled={isCompleted} className="w-full">
              {isCompleted ? "Completed" : "Mark as Completed"}
            </Button>
            {!hasWatched && !isCompleted && (
              <p className="text-red-500 mt-2 text-sm">Please watch the entire video before marking as completed.</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
