import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AuthContext } from "@/context/AuthProvider";
import { db, users } from "@/lib/db";
import { createFileRoute, Link } from "@tanstack/react-router";
import { BarChart, Book, Trophy, Users, Flame, HardHat, Wrench, Zap } from "lucide-react";
import { useContext } from "react";

const moduleProgress = [
  {
    id: 1,
    user_id: 4, // Links to a specific user in the Users table
    module_id: 1, // Links to the "Getting Started with Programming" module
    status: "in_progress", // Indicates the user is currently working on this module
    progress: 50.0, // 50% progress made
    started_at: 1698304800, // Timestamp for when the module was started
    completed_at: null, // Not yet completed
    last_accessed_at: 1698312000, // Timestamp for the last time this module was accessed
  },
  {
    id: 2,
    user_id: 4,
    module_id: 2,
    status: "completed",
    progress: 100.0,
    started_at: 1698290400,
    completed_at: 1698316800,
    last_accessed_at: 1698316800,
  },
];

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

export const Route = createFileRoute("/dashboard")({
  component: Dashboard,
  loader: async () => await db.select().from(users),
});

export default function Dashboard() {
  // Loader will run on page load
  // Take data from loader
  const { user } = useContext(AuthContext);
  //array progress By userId
  const moduleByUserId = moduleProgress.filter((progress) => progress.user_id == user.id);
  //total learning module
  const totalModules = moduleByUserId.length;
  //total completed module
  const completeModule = moduleByUserId.filter((completed) => completed.status == "completed").length;
  //array user's module
  const learningModules = modules.filter((module) =>
    moduleByUserId.some((progress) => progress.module_id === module.id)
  );

  // Map modules to include progress from moduleProgress
  const modulesWithProgress = modules.map((module) => {
    const progressEntry = moduleByUserId.find((progress) => progress.module_id === module.id);
    return {
      ...module,
      progress: progressEntry ? progressEntry.progress : 0, // Default to 0 if no entry
    };
  });

  // Calculate overall progress
  const overallProgress = modulesWithProgress.reduce((total, module) => total + module.progress, 0) / modules.length;

  const userData = Route.useLoaderData();
  //console.log(moduleByUserId);
  // user the loader data to display data

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold">Welcome to Your Training Dashboard</h1>

      <div>
        {/* {userData.map((user) => (
          <div key={user.id}>hello{user.name}</div>
        ))} */}
        {user?.name}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Modules</CardTitle>
            <Book className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalModules}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Modules</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completeModule}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overallProgress.toFixed()}%</div>
            <Progress value={overallProgress} className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Trainee Rank</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24 / 100</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="modules" className="space-y-4">
        <TabsList>
          <TabsTrigger value="modules">Learning Modules</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>
        <TabsContent value="modules" className="space-y-4">
          <h2 className="text-2xl font-bold">Your Learning Modules</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {learningModules.map((module) => (
              <Card key={module.id}>
                <CardHeader>
                  <CardTitle>{module.title}</CardTitle>
                  <CardDescription>{module.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link to={`/module/${module.id}`} className="text-primary hover:underline">
                    Continue Learning
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="performance" className="space-y-4">
          <h2 className="text-2xl font-bold">Your Performance</h2>
          <Card>
            <CardHeader>
              <CardTitle>Performance Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Module Completion Rate</span>
                  <span className="font-bold">75%</span>
                </div>
                <Progress value={75} />
                <div className="flex justify-between">
                  <span>Average Quiz Score</span>
                  <span className="font-bold">82%</span>
                </div>
                <Progress value={82} />
                <div className="flex justify-between">
                  <span>Engagement Score</span>
                  <span className="font-bold">90%</span>
                </div>
                <Progress value={90} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="resources" className="space-y-4">
          <h2 className="text-2xl font-bold">Training Resources</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Instructional Materials</CardTitle>
                <CardDescription>Access supplementary learning materials</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2">
                  <li>
                    <Link href="/resources/handbook" className="text-primary hover:underline">
                      Training Handbook
                    </Link>
                  </li>
                  <li>
                    <Link href="/resources/glossary" className="text-primary hover:underline">
                      Glossary of Terms
                    </Link>
                  </li>
                  <li>
                    <Link href="/resources/faq" className="text-primary hover:underline">
                      Frequently Asked Questions
                    </Link>
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Program Information</CardTitle>
                <CardDescription>Learn more about your training program</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2">
                  <li>
                    <Link href="/program/overview" className="text-primary hover:underline">
                      Program Overview
                    </Link>
                  </li>
                  <li>
                    <Link href="/program/schedule" className="text-primary hover:underline">
                      Training Schedule
                    </Link>
                  </li>
                  <li>
                    <Link href="/program/objectives" className="text-primary hover:underline">
                      Learning Objectives
                    </Link>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
