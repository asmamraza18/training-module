import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

export const Route = createFileRoute("/programOverview")({
  component: ProgramOverview,
});

export default function ProgramOverview() {
  return (
    <div className="flex w-full items-center justify-center flex-col">
      <h1 className="text-2xl font-bold">Program Overview</h1>
      <p className="text-justify w-1/3 text-lg mt-5">
        This training module is designed to equip workers, supervisors, and safety officers with the knowledge and
        skills necessary to conduct Job Safety Analysis (JSA) in relation to welding, , and gas cutting operations.
        These tasks are inherently dangerous due to the potential hazards like electrical shock, fire, burns, and
        exposure to hazardous gases. Therefore, proper analysis and risk assessment are critical to ensure worker safety
        and compliance with regulations.
      </p>
    </div>
  );
}
