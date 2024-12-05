import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Shield, Nfc, BookCheck, HardHat, Search, Wrench } from "lucide-react";
import { useState } from "react";
import { db, modules } from "@/lib/db";

export const Route = createFileRoute("/module/")({
  component: ModuleSelection,
  loader: async () => await db.select().from(modules),
});

export default function ModuleSelection() {
  const navigate = useNavigate({ from: "/module/$moduleId" });
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedModule, setSelectedModule] = useState<number | null>(null);

  const modules = Route.useLoaderData();
  // Map the string icon names to actual components
  const iconMap = {
    Wrench: Wrench,
    Nfc: Nfc,
    Shield: Shield,
    BookCheck: BookCheck,
    HardHat: HardHat,
  };
  type IconName = keyof typeof iconMap;
  const dataModules = modules.map((module) => {
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
      icon: module.icon && (module.icon as IconName) in iconMap ? iconMap[module.icon as IconName] : null,
      recommended: module.recommended,
    };
  });

  const filteredModules = dataModules.filter(
    (module) =>
      module.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      module.overview.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold">Select Training Module</h1>
      <div className="relative ">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground " />
        <Input
          placeholder="Search modules..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-8 bg-white"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredModules.map((module) => (
          <Card
            key={module.id}
            className={cn(
              "cursor-pointer min-h-[150px] transition-all",
              selectedModule === module.id && "ring-2 ring-primary"
            )}
            onClick={() => setSelectedModule(module.id)}
          >
            <CardHeader>
              <CardTitle className="flex text-lg items-center gap-2">
                {module.icon ? <module.icon className="h-5 w-5" /> : null}
                {module.topic}
              </CardTitle>
              <CardTitle className="mb-2">{module.subTopic}</CardTitle>
              <CardDescription>{module.overview}</CardDescription>
            </CardHeader>
            <CardContent>
              {module.recommended === "true" && (
                <Badge variant="secondary" className="mb-2">
                  Recommended
                </Badge>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Button
        className="inline-flex w-full"
        disabled={!selectedModule}
        onClick={() => {
          if (selectedModule) {
            // Navigate to the selected module
            console.log(`Navigating to module ${selectedModule}`);
            // You would typically use a router here, e.g.:
            navigate({ to: `/module/${selectedModule}` });
          }
        }}
      >
        Start Selected Module
      </Button>
    </div>
  );
}
