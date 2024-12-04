import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AuthContext } from "@/context/AuthProvider";
import { db, moduleProgress, modules, trainingProgress, trainings, users } from "@/lib/db";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { BarChart, Book, Trophy, Users, Flame, HardHat, Wrench, Zap } from "lucide-react";
import { useContext, useState } from "react";

export const Route = createFileRoute("/dashboard")({
  component: Dashboard,
  loader: async () => {
    const moduleData = await db.select().from(modules);
    const moduleProgressData = await db.select().from(moduleProgress);
    const trainingProgressData = await db.select().from(trainingProgress);
    const trainingData = await db.select().from(trainings);
    const userData = await db.select().from(users);

    return {
      modules: moduleData,
      moduleProgress: moduleProgressData,
      trainingProgress: trainingProgressData,
      trainings: trainingData,
      users: userData,
    }; // Combine both results
  },
});

export default function Dashboard() {
  // Take data from loader
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { modules, moduleProgress, trainingProgress, trainings, users } = Route.useLoaderData();

  // Assuming userById is an array, and you want the first matching user
  const userByIdData = users.find((userid) => userid.id === user.id);
  // Calculate percentage
  const percentageScore = userByIdData ? (userByIdData.quizResult / 15) * 100 : 0;

  //array progress By userId
  const moduleByUserId = moduleProgress.filter((progress) => progress.userId == user.id);
  const trainingByUserId = trainingProgress.filter((progress) => progress.userId == user.id);
  //total learning module
  const totalModules = moduleByUserId.length;
  //total completed module
  const completeModule = moduleByUserId.filter((completed) => completed.status == "completed").length;
  const percentageModule = (completeModule / modules.length) * 100;
  //declace data module
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
      icon: module.icon,
      recommended: module.recommended,
    };
  });
  //array user's module
  const learningModules = dataModules.filter((module) =>
    moduleByUserId.some((progress) => progress.moduleId == module.id)
  );
  console.log(learningModules);
  // Calculate overall progress
  const totalUserProgress = trainingByUserId.reduce((total, training) => total + training.progress, 0);
  const overallProgress = (totalUserProgress / (trainings.length * 100)) * 100;

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold">Welcome to Your Training Dashboard</h1>

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
          {learningModules.length === 0 ? (
            <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100"
                height="100"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="mb-4 text-primary"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
              <h2 className="text-2xl font-bold mb-2">Start Your Learning Journey</h2>
              <p className="text-muted-foreground mb-4">It looks like you haven't started any learning modules yet.</p>
              <Button
                onClick={() => {
                  navigate({ to: "/module" });
                }}
              >
                Explore Modules
              </Button>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold">Your Learning Modules</h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {learningModules.map((module) => {
                  // Find the corresponding progress for this module
                  const moduleProgressItem = moduleByUserId.find((progress) => progress.moduleId === module.id);
                  return (
                    <Card key={module.id}>
                      <CardHeader>
                        <CardTitle className="flex text-lg items-center gap-2">{module.topic}</CardTitle>
                        <CardTitle className="mb-2">{module.subTopic}</CardTitle>
                        <CardDescription>{module.overview}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Link to={`/module/${module.id}`} className="text-primary hover:underline">
                          {moduleProgressItem?.status === "completed" ? "Completed" : "Continue Learning"}
                        </Link>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </>
          )}
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
                  <span className="font-bold">{percentageModule}%</span>
                </div>
                <Progress value={percentageModule} />
                <div className="flex justify-between">
                  <span>Average Quiz Score</span>
                  <span className="font-bold">{percentageScore}%</span>
                </div>
                <Progress value={percentageScore} />
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
                    <Link to="/trainingHandbook" className="text-primary hover:underline">
                      Training Handbook
                    </Link>
                  </li>
                  <li>
                    <Link to="/faq" className="text-primary hover:underline">
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
                    <Link to="/programOverview" className="text-primary hover:underline">
                      Program Overview
                    </Link>
                  </li>
                  <li>
                    <Link to="/learningObjective" className="text-primary hover:underline">
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
