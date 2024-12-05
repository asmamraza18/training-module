import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

export const Route = createFileRoute("/learningObjective")({
  component: LearningObjectives,
});

export default function LearningObjectives() {
  const objectives = [
    "Understand the role of JSA in high-risk activities.",
    "Learn how to break down tasks and identify hazards in welding machines.",
    "Apply control measures to prevent accidents and injuries.",
    "Complete practical assessments to demonstrate your understanding.",
    "Obtain a certification upon successful completion of the course.",
  ];

  return (
    <div className="flex w-full items-center justify-center flex-col">
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Learning Objectives: Job Safety Analysis (Welding Machine)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg mb-4">Upon completion of this module, you will be able to:</p>
          <ul className="space-y-3">
            {objectives.map((objective, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle className="mr-2 h-6 w-6 flex-shrink-0 text-green-500" />
                <span>{objective}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
