import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createFileRoute, Link } from "@tanstack/react-router";
import { BarChart, Book, Trophy, Users } from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  component: Dashboard,
});

export default function Dashboard() {
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
            <div className="text-2xl font-bold">12</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Completed Modules
            </CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Overall Progress
            </CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">33%</div>
            <Progress value={33} className="mt-2" />
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
            {[
              "Introduction to Training",
              "Core Concepts",
              "Advanced Techniques",
              "Practical Applications",
            ].map((module, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{module}</CardTitle>
                  <CardDescription>Module {index + 1}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link
                    to={`/module/${index + 1}`}
                    className="text-primary hover:underline"
                  >
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
                <CardDescription>
                  Access supplementary learning materials
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2">
                  <li>
                    <Link
                      href="/resources/handbook"
                      className="text-primary hover:underline"
                    >
                      Training Handbook
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/resources/glossary"
                      className="text-primary hover:underline"
                    >
                      Glossary of Terms
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/resources/faq"
                      className="text-primary hover:underline"
                    >
                      Frequently Asked Questions
                    </Link>
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Program Information</CardTitle>
                <CardDescription>
                  Learn more about your training program
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2">
                  <li>
                    <Link
                      href="/program/overview"
                      className="text-primary hover:underline"
                    >
                      Program Overview
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/program/schedule"
                      className="text-primary hover:underline"
                    >
                      Training Schedule
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/program/objectives"
                      className="text-primary hover:underline"
                    >
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
