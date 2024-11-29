import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { Flame, HardHat, Wrench, Zap } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

const modules = [
  {
    id: 1,
    title: "Welding Machine JSA",
    description: {
      overview:
        "A beginner's guide to understanding Job Safety Analysis (JSA) for welding machines, including identifying hazards and safety protocols.",
      specificInstruction: "Focus on understanding basic safety protocols and how to perform a JSA for welding tasks.",
      trainingGoals: "Develop foundational knowledge of welding machine safety and the ability to conduct a JSA.",
    },
    icon: Flame,
    recommended: true,
  },
  {
    id: 2,
    title: "Personal Protective Equipment",
    description: {
      overview:
        "A beginner's guide to understanding Job Safety Analysis (JSA) for welding machines, including identifying hazards and safety protocols.",
      specificInstruction: "Focus on understanding basic safety protocols and how to perform a JSA for welding tasks.",
      trainingGoals: "Develop foundational knowledge of welding machine safety and the ability to conduct a JSA.",
    },
    icon: HardHat,
  },
  {
    id: 3,
    title: "Basic Tool Safety",
    description: {
      overview:
        "A beginner's guide to understanding Job Safety Analysis (JSA) for welding machines, including identifying hazards and safety protocols.",
      specificInstruction: "Focus on understanding basic safety protocols and how to perform a JSA for welding tasks.",
      trainingGoals: "Develop foundational knowledge of welding machine safety and the ability to conduct a JSA.",
    },
    icon: Wrench,
  },
  {
    id: 4,
    title: "Electrical Safety",
    description: {
      overview:
        "A beginner's guide to understanding Job Safety Analysis (JSA) for welding machines, including identifying hazards and safety protocols.",
      specificInstruction: "Focus on understanding basic safety protocols and how to perform a JSA for welding tasks.",
      trainingGoals: "Develop foundational knowledge of welding machine safety and the ability to conduct a JSA.",
    },
    icon: Zap,
  },
];

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
  {
    id: 2,
    title: "Welding Machine Hazard Controls",
    description: "Job Safety Analysis for welding machine operations",
    thumbnail:
      "https://i.ytimg.com/vi/Kz-GTab2O9s/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBSAmk5rwyyZ5wi9TmHn9otnAD8pQ",
    duration: 150,
    created_at: 1678910000,
    module_id: 1,
    module_name: "Welding Machine JSA",
  },
  {
    id: 3,
    title: "Emergency Procedures for Welding",
    description: "Job Safety Analysis for welding machine operations",
    thumbnail:
      "https://i.ytimg.com/vi/jTw3xE7V3Dg/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBkJg6_uPyunep_526ax94zTr5f5g",
    duration: 90,
    created_at: 1678913600,
    module_id: 1,
    module_name: "Welding Machine JSA",
  },
];

export const Route = createFileRoute("/module/$moduleId/")({
  component: Module,
});

function Module() {
  const { moduleId } = Route.useParams();
  const [hasReadInstructions, setHasReadInstructions] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const selectedModule = modules.filter((module) => module.id.toString() == moduleId);
  const trainingByModule = trainings.filter((selectedModule) => selectedModule.module_id.toString() == moduleId);
  const breadcrumbSegments = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Modules", href: "/module/1" },
    { name: "Welding Machine", href: "/module/1/1" },
  ];
  //console.log(trainingByModule);
  const filteredTrainings = trainingByModule.filter(
    (training) =>
      training.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      training.description.toLowerCase().includes(searchTerm.toLowerCase())
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
                <BreadcrumbPage>{module.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <h1 className="text-3xl font-bold">{module.title}</h1>
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
                <p>{module.description.overview}</p>

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
                <p>{module.description.specificInstruction}</p>

                <h2 className="text-xl font-semibold">4. Training Goals</h2>
                <p>By the end of this module, you should be able to:</p>
                <p>{module.description.specificInstruction}</p>

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

          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              checked={hasReadInstructions}
              onCheckedChange={(checked) => setHasReadInstructions(checked as boolean)}
            />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              I have read and understood the written instructions
            </label>
          </div>

          <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-center">Training Modules</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTrainings.map((training) => (
                <div key={training.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <img src={training.thumbnail} alt={training.title} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h2 className="text-xl font-semibold mb-2">{training.title}</h2>
                    <p className="text-gray-600">{training.description}</p>
                  </div>
                  <div className="px-4 py-3 bg-gray-100">
                    <Button
                      variant="link"
                      asChild
                      className="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-600 transition duration-300"
                    >
                      <Link
                        to="/module/$moduleId/$traningId"
                        params={{
                          moduleId: training.module_name.toString(),
                          traningId: training.id.toString(),
                        }}
                      >
                        Start Training
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
