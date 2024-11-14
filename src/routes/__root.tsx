import NavigationBar from "@/components/navigation-bar";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: () => (
    <div className="flex h-screen flex-col">
      <div className="p-2 flex gap-2 border items-center justify-center">
        <NavigationBar />
      </div>
      <div className="flex-1 justify-center border flex">
        <Outlet />
      </div>
      <TanStackRouterDevtools />
    </div>
  ),
});
