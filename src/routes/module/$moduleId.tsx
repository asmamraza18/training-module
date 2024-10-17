import { createFileRoute } from "@tanstack/react-router";
import WeldingJSAInstructions from "./-WeldingJSAInstructions";

export const Route = createFileRoute("/module/$moduleId")({
  component: Module,
});

function Module() {
  const { moduleId } = Route.useParams();

  return (
    <div>
      {moduleId === "1" ? (
        <WeldingJSAInstructions />
      ) : moduleId === "2" ? (
        <div>
          <h1>Module 2</h1>
          <p>This is the content for module 2</p>
        </div>
      ) : moduleId === "3" ? (
        <div>
          <h1>Module 3</h1>
          <p>This is the content for module 3</p>
        </div>
      ) : (
        <div>
          <h1>Module Not Found</h1>
          <p>Module {moduleId} was not found</p>
        </div>
      )}
    </div>
  );
}
