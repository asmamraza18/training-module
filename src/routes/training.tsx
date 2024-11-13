import data from "../trainings.json";
import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartBarStacked } from "lucide-react";
import db from "@/lib/db";

export const Route = createFileRoute("/training")({
  component: TrainingList,
});

export default function TrainingList() {
  const modules = data.modules;
  const modules_ = db.read();
  console.log(modules_);

  return (
    <div className="px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Module Selection
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {modules.map((module) => (
            <Card className="shadow-md relative">
              <div className="p-4">
                <div className="mb-6">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold ">
                      {module.title}
                    </CardTitle>
                    <CardDescription className="mb-5">
                      {module.description.overview}
                    </CardDescription>
                  </CardHeader>
                  <div className="border border-gray-100 mb-5"></div>
                  <div className="flex flex-col lg:flex-row justify-between mb-4">
                    <div className="text-gray-500 mb-3">
                      <ChartBarStacked className="inline text-lg mb-1 mr-1" />
                      {module.category}
                    </div>
                    <Link
                      to={`/module/${module.id}`}
                      className="h-[36px] bg-black hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-center text-sm"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <Outlet />
    </div>
  );
}
