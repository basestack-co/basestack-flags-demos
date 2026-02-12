import { ApiRouteHandlerDemo } from "@/components/home/api-route-handler-demo";
import { ServerActionDemo } from "@/components/home/server-action-demo";

export function RuntimeDemos() {
  return (
    <section className="space-y-4">
      <div className="px-1">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          Product Rollout Controls
        </p>
        <h2 className="font-display mt-2 text-3xl md:text-4xl">
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
