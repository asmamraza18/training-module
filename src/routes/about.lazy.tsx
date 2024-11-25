import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/about")({
  component: () => (
    <div className="flex w-full items-center justify-center flex-col">
      <h1 className="text-2xl font-bold">What is Job Safety Analysis (JSA)?</h1>
      <p className="text-justify w-1/3 text-lg mt-5">
        Job Safety Analysis (JSA) is a systematic process for identifying and preventing hazards associated with a
        specific job. JSA is used to make the workplace safer, by dividing each task in a job process into its component
        steps, identifying potential hazards or risks and then recommending preventive measures to reduce or eliminate
        these hazards.
      </p>
    </div>
  ),
});
