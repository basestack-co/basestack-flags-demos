import { ApiRouteHandlerDemo } from "@/components/home/api-route-handler-demo";
import { ServerActionDemo } from "@/components/home/server-action-demo";

export function RuntimeDemos() {
  return (
    <section className="space-y-5">
      <div className="px-1">
        <div className="mb-2 flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          <p className="text-xs font-semibold uppercase tracking-widest text-accent">
            Product Rollout Controls
          </p>
        </div>
        <h2 className="font-display text-3xl md:text-4xl">
          Live Toggle Workflows
        </h2>
      </div>
      <div className="grid gap-4 xl:grid-cols-2">
        <ServerActionDemo />
        <ApiRouteHandlerDemo />
      </div>
    </section>
  );
}
