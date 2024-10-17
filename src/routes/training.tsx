import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/training")({
  component: () => (
    <div>
      <h1 className="text-2xl font-bold">Module Selection</h1>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold text-center">
            Training Dashboard
          </CardTitle>
          <CardDescription className="text-center">
            Welcome to your training dashboard
          </CardDescription>
        </CardHeader>
      </Card>
      <Outlet />
    </div>
  ),
});
