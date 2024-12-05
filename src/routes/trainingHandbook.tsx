import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

export const Route = createFileRoute("/trainingHandbook")({
  component: TrainingHandbook,
});

export default function TrainingHandbook() {
  const objectives = [
    "Understand the role of JSA in high-risk activities.",
    "Learn how to break down tasks and identify hazards in welding machines.",
    "Apply control measures to prevent accidents and injuries.",
    "Complete practical assessments to demonstrate your understanding.",
    "Obtain a certification upon successful completion of the course.",
  ];

  return (
    <div className="flex w-full items-center justify-center flex-col">
      <h1 className="text-2xl font-bold">Training Handbook</h1>
      <p className="text-justify w-1/3 text-lg mt-5">
        A Training Handbook is a comprehensive guide designed to support learning and development for employees or
        trainees. It provides essential information, instructions, and guidelines on specific topics, tasks, or job
        roles. The purpose is to ensure consistency, improve knowledge retention, and enhance skills.
      </p>
    </div>
  );
}
