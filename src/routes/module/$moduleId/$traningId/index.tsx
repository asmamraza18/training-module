import { createFileRoute, Link } from "@tanstack/react-router";
import React, { useState, useRef } from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { CheckCircle, PlayCircle } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

const trainings = [
  {
    id: 1,
    title: "Introduction to Welding Machine",
    description: "Job Safety Analysis for welding machine operations",
    thumbnail: "https://i.ytimg.com/vi/mJTK5-qLUVw/maxresdefault.jpg",
    duration: 120,
    created_at: 1678900000,
    module_id: 1,
    module_name: "Welding Machine JSA",
  },
];
export const Route = createFileRoute("/module/$moduleId/$traningId/")({
  component: Training,
});

function Training() {
  const { traningId } = Route.useParams();
  const selectedTraining = trainings.filter((module) => module.id.toString() == traningId);
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

  const handleConfirmCompletion = () => {
    if (hasWatched) {
      setIsCompleted(true);
    } else {
      alert("Please watch the entire video before confirming completion.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb segments={breadcrumbSegments} className="mb-6">
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
            <BreadcrumbPage>Welding Machine JSA</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
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
        </div>
        {selectedTraining.map((training) => (
          <div key={training.id} className="lg:w-1/3 bg-white p-6 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold mb-4">Introduction to React</h1>
            <p className="text-gray-600 mb-4">
              Learn the basics of React, including components, state, and props. This video covers everything you need
              to know to get started with React development.
            </p>
            <div className="mb-4">
              <h2 className="text-lg font-semibold mb-2">Video Progress</h2>
              <Progress value={progress} className="w-full" />
              <p className="text-sm text-gray-500 mt-1">{progress}% completed</p>
            </div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <PlayCircle className="text-blue-500 mr-2" />
                <span className="text-sm text-gray-600">45 minutes</span>
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
            <Button onClick={handleConfirmCompletion} disabled={isCompleted} className="w-full">
              <Link
                to="/module/$moduleId/$traningId/$quizModuleId"
                params={{
                  moduleId: training.module_id.toString(),
                  traningId: training.id.toString(),
                  quizModuleId: training.id.toString(),
                }}
              >
                {isCompleted ? "Completed" : "Mark as Completed"}
              </Link>
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
