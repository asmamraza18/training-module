import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { createFileRoute } from "@tanstack/react-router";
import { Flame, HardHat, Search, Wrench, Zap } from "lucide-react";
import { useState } from "react";

const modules = [
  {
    id: 1,
    title: "Welding Machine JSA",
    description: "Job Safety Analysis for welding machine operations",
    icon: Flame,
    recommended: true,
  },
  {
    id: 2,
    title: "Personal Protective Equipment",
    description: "Proper use and maintenance of PPE",
    icon: HardHat,
  },
  {
    id: 3,
    title: "Basic Tool Safety",
    description: "Safe handling of common workshop tools",
    icon: Wrench,
  },
  {
    id: 4,
    title: "Electrical Safety",
    description: "Fundamentals of electrical safety in the workplace",
    icon: Zap,
  },
];

export default function ModuleSelection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedModule, setSelectedModule] = useState<number | null>(null);

  const filteredModules = modules.filter(
    (module) =>
      module.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      module.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold">Select Training Module</h1>

      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search modules..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-8"
        />
      </div>

      <ScrollArea className="h-[400px]">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredModules.map((module) => (
            <Card
              key={module.id}
              className={`cursor-pointer transition-all ${selectedModule === module.id ? "ring-2 ring-primary" : ""}`}
              onClick={() => setSelectedModule(module.id)}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <module.icon className="h-5 w-5" />
                  {module.title}
                </CardTitle>
                <CardDescription>{module.description}</CardDescription>
              </CardHeader>
              <CardContent>
                {module.recommended && (
                  <Badge variant="secondary" className="mb-2">
                    Recommended
                  </Badge>
                )}
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Select Module
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </ScrollArea>

      <Button
        className="w-full"
        disabled={!selectedModule}
        onClick={() => {
          if (selectedModule) {
            // Navigate to the selected module
            console.log(`Navigating to module ${selectedModule}`);
            // You would typically use a router here, e.g.:
            // router.push(`/training/module/${selectedModule}`)
          }
        }}
      >
        Start Selected Module
      </Button>
    </div>
  );
}

export const Route = createFileRoute("/training/module-selection")({
  component: ModuleSelection,
});
