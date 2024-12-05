import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useContext, useEffect, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import db, { modules, trainings, trainingProgress, moduleProgress } from "@/lib/db";
import { AuthContext } from "@/context/AuthProvider";
import { eq, and } from "drizzle-orm";

//   {
//     id: 1,
//     title: "Welding Machine JSA",
//     description: {
//       overview:
//         "A beginner's guide to understanding Job Safety Analysis (JSA) for welding machines, including identifying hazards and safety protocols.",
//       specificInstruction: "Focus on understanding basic safety protocols and how to perform a JSA for welding tasks.",
//       trainingGoals: "Develop foundational knowledge of welding machine safety and the ability to conduct a JSA.",
//     },
//     icon: Flame,
//     recommended: true,
//   },
//   {
//     id: 2,
//     title: "Personal Protective Equipment",
//     description: {
//       overview:
//         "A beginner's guide to understanding Job Safety Analysis (JSA) for welding machines, including identifying hazards and safety protocols.",
//       specificInstruction: "Focus on understanding basic safety protocols and how to perform a JSA for welding tasks.",
//       trainingGoals: "Develop foundational knowledge of welding machine safety and the ability to conduct a JSA.",
//     },
//     icon: HardHat,
//   },
//   {
//     id: 3,
//     title: "Basic Tool Safety",
//     description: {
//       overview:
//         "A beginner's guide to understanding Job Safety Analysis (JSA) for welding machines, including identifying hazards and safety protocols.",
//       specificInstruction: "Focus on understanding basic safety protocols and how to perform a JSA for welding tasks.",
//       trainingGoals: "Develop foundational knowledge of welding machine safety and the ability to conduct a JSA.",
//     },
//     icon: Wrench,
//   },
//   {
//     id: 4,
//     title: "Electrical Safety",
//     description: {
//       overview:
//         "A beginner's guide to understanding Job Safety Analysis (JSA) for welding machines, including identifying hazards and safety protocols.",
//       specificInstruction: "Focus on understanding basic safety protocols and how to perform a JSA for welding tasks.",
//       trainingGoals: "Develop foundational knowledge of welding machine safety and the ability to conduct a JSA.",
//     },
//     icon: Zap,
//   },
// ];

// const trainings = [
//   {
//     id: 1,
//     title: "Introduction to Welding Machine",
//     description: "Job Safety Analysis for welding machine operations",
//     thumbnail: "https://i.ytimg.com/vi/mJTK5-qLUVw/maxresdefault.jpg",
//     duration: 120,
//     created_at: 1678900000,
//     module_id: 1,
//     module_name: "Welding Machine JSA",
//   },
//   {
//     id: 2,
//     title: "Welding Machine Hazard Controls",
//     description: "Job Safety Analysis for welding machine operations",
//     thumbnail:
//       "https://i.ytimg.com/vi/Kz-GTab2O9s/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBSAmk5rwyyZ5wi9TmHn9otnAD8pQ",
//     duration: 150,
//     created_at: 1678910000,
//     module_id: 1,
//     module_name: "Welding Machine JSA",
//   },
//   {
//     id: 3,
//     title: "Emergency Procedures for Welding",
//     description: "Job Safety Analysis for welding machine operations",
//     thumbnail:
//       "https://i.ytimg.com/vi/jTw3xE7V3Dg/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBkJg6_uPyunep_526ax94zTr5f5g",
//     duration: 90,
//     created_at: 1678913600,
//     module_id: 1,
//     module_name: "Welding Machine JSA",
//   },
// ];

export const Route = createFileRoute("/module/$moduleId/")({
  component: Module,
  loader: async () => {
    const moduleData = await db.select().from(modules);
    const trainingData = await db.select().from(trainings);
    const trainingProgressData = await db.select().from(trainingProgress);

    return { modules: moduleData, trainings: trainingData, trainingProgress1: trainingProgressData }; // Combine both results
  },
});

function Module() {
  const { moduleId } = Route.useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { modules, trainings, trainingProgress1 } = Route.useLoaderData();
  const [searchTerm, setSearchTerm] = useState("");

  const trainingByUserId = trainingProgress1.filter((progress) => progress.userId === user.id);
  const selectedModule = modules
    .filter((module) => module.id.toString() == moduleId)
    .map((module) => {
      const description = JSON.parse(module.description); // Parse the JSON description
      const title = JSON.parse(module.title);
      return {
        id: module.id,
        title: module.title,
        topic: title.topic,
        subTopic: title.subTopic,
        overview: description.overview, // Extract the overview
        specificInstruction: description.specificInstruction,
        trainingGoals: description.trainingGoals,
        icon: module.icon,
        recommended: module.recommended,
      };
    });

  const trainingByModule = trainings.filter((selectedModule) => selectedModule.moduleId.toString() == moduleId);

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

  const handleTrainingProgress = async (e: React.MouseEvent, training: any) => {
    e.preventDefault();
    try {
      // Check if it's module 5 and specific training (assuming training id 11)
      const isQuizModule = training.moduleId === 5 && training.id === 11;

      // Upsert Training Progress
      const trainingProgressResult = await upsertTrainingProgress({
        userId: user.id,
        trainingId: training.id,
        status: "in_progress",
        progress: 0, // You can adjust this initial progress
        lastAccessedAt: new Date(),
      });
      console.log("Training Progress Result:", trainingProgressResult);
      // Upsert Module Progress
      const moduleProgressResult = await upsertModuleProgress({
        userId: user.id,
        moduleId: parseInt(moduleId), // from the current page's module ID
        status: "in_progress",
        progress: 0, // You can adjust this initial progress
        lastAccessedAt: new Date(),
      });
      console.log("Module Progress Result:", moduleProgressResult);

      // Navigate based on module and training
      if (isQuizModule) {
        // Navigate to quiz route
        navigate({
          to: "/module/$moduleId/$traningId/quiz",
          params: {
            moduleId: moduleId,
            traningId: training.id.toString(),
          },
        });
      } else {
        // Navigate to regular training route
        navigate({
          to: "/module/$moduleId/$traningId",
          params: {
            moduleId: moduleId,
            traningId: training.id.toString(),
          },
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("Failed to upsert training progress:", error.message);
        // Handle the error appropriately (e.g., show user-friendly message)
      }
    }
  };

  const breadcrumbSegments = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Modules", href: "/module/1" },
    { name: "Welding Machine", href: "/module/1/1" },
  ];
  //console.log(trainingByModule);
  const filteredTrainings = trainingByModule.filter(
    (training) =>
      training.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      training.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4 space-y-6">
      {selectedModule.map((module) => (
        <div key={module.id}>
          <Breadcrumb segments={breadcrumbSegments} className="mb-6">
            <BreadcrumbList>
              {/* Home link */}
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard">Home</BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbSeparator />

              {/* Trainings link */}
              <BreadcrumbItem>
                <BreadcrumbLink href="/module">Modules</BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbSeparator />

              {/* Current page */}
              <BreadcrumbItem>
                <BreadcrumbPage>{module.topic}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <h1 className="text-3xl font-bold">
            {module.topic}: {module.subTopic}
          </h1>
        </div>
      ))}
      <Card>
        <CardHeader>
          <CardTitle>Instructions and Safety Measures</CardTitle>
          <CardDescription>
            Please read through the written instructions and listen to the audio explanation carefully. Both are crucial
            for your understanding and safety during the practical training.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {selectedModule.map((module) => (
            <ScrollArea key={module.id} className="h-[300px] w-full rounded-md border p-4">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">1. Overview</h2>
                <p>{module.overview}</p>

                <h2 className="text-xl font-semibold">2. General Safety Measures</h2>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    Always wear appropriate Personal Protective Equipment (PPE), including welding helmet, gloves, and
                    fire-resistant clothing.
                  </li>
                  <li>Ensure proper ventilation in the welding area to avoid inhaling harmful fumes.</li>
                  <li>Keep a fire extinguisher nearby and know how to use it.</li>
                  <li>Inspect all equipment before use and report any defects immediately.</li>
                </ul>

                <h2 className="text-xl font-semibold">3. Specific Welding Machine Instructions</h2>
                <p>{module.specificInstruction}</p>

                <h2 className="text-xl font-semibold">4. Training Goals</h2>
                <p>By the end of this module, you should be able to:</p>
                <p>{module.trainingGoals}</p>

                <h2 className="text-xl font-semibold">5. Practical Section Preview</h2>
                <p>The practical section will involve:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Equipment inspection and setup</li>
                  <li>Demonstration of proper welding techniques</li>
                  <li>Supervised practice sessions</li>
                  <li>Safety procedure drills</li>
                </ul>
              </div>
            </ScrollArea>
          ))}
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-center">Training Modules</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTrainings.map((training) => {
                // Find the corresponding progress for this training
                const trainingProgressItem = trainingByUserId.find((progress) => progress.trainingId === training.id);
                return (
                  <div key={training.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <img
                      src={training.thumbnail ?? "assets/default-image.jpg"}
                      alt={training.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h2 className="text-xl font-semibold mb-2">{training.title}</h2>
                      <p className="text-gray-600">{training.description}</p>
                    </div>
                    <div className="px-4 py-3 bg-gray-100">
                      <Button
                        variant="link"
                        className="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-700 transition duration-300"
                        onClick={(e) => handleTrainingProgress(e, training)}
                      >
                        {trainingProgressItem?.status === "completed"
                          ? "Completed"
                          : `${training.moduleId === 5 && training.id === 11 ? "Start Quiz" : "Start Training"}`}
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
