"use client";

import { useFlag } from "@basestack/flags-react/client";

export type InitiativeItem = {
  name: string;
  description: string;
  status: string;
  progress: string;
};

type InitiativeOverviewProps = {
  items: InitiativeItem[];
};

function getStatusStyle(status: string): string {
  switch (status.toLowerCase()) {
    case "in progress":
      return "bg-accent-soft text-accent border-accent/20";
    case "planned":
      return "bg-surface-soft text-muted border-border";
    case "on hold":
      return "bg-warning-soft text-warning border-warning/20";
    default:
      return "bg-surface-soft text-muted border-border";
  }
}

export function InitiativeOverview({ items }: InitiativeOverviewProps) {
  const { enabled, isLoading, openFeedbackModal } = useFlag<{
    variant?: string;
  }>("initiative_overview");

  return (
    <div className="panel rounded-2xl p-6">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="font-display text-2xl">Initiative Overview</h2>
        {enabled && (
          <button
            onClick={() =>
              openFeedbackModal({
                featureName: "Initiative Overview",
                metadata: {
                  user_id: "123",
                  user_name: "John Doe",
                  user_email: "john.doe@example.com",
                  user_role: "admin",
                  user_organization: "Example Inc.",
                  user_organization_id: "123",
                  user_organization_name: "Example Inc.",
                  user_organization_role: "admin",
                  user_organization_email: "admin@example.com",
                },
              })
            }
            disabled={isLoading}
            className="cursor-pointer rounded-lg bg-accent-soft px-3 py-1.5 text-xs font-semibold text-accent transition-opacity hover:opacity-75 disabled:opacity-50"
          >
            Give Feedback
          </button>
        )}
      </div>
      <div className="space-y-3">
        {items
          .map((item) => (
            <article
              key={item.name}
              className="rounded-xl border border-border bg-surface-soft p-4 transition-colors hover:bg-surface"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="font-mono text-sm font-medium">{item.name}</h3>
                <span
                  className={`rounded-md border px-2.5 py-1 text-xs font-medium uppercase tracking-wide ${getStatusStyle(item.status)}`}
                >
                  {item.status}
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {item.description}
              </p>
              <div className="mt-4">
                <div className="mb-1.5 flex items-center justify-between">
                  <p className="text-xs font-medium text-muted">Progress</p>
                  <p className="font-mono text-xs font-semibold text-foreground/80">
                    {item.progress}
                  </p>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-border">
                  <div
                    className="h-full rounded-full bg-accent transition-all"
                    style={{ width: item.progress }}
                  />
                </div>
              </div>
            </article>
          ))
          .filter((_, index) => index < (enabled ? 3 : 1))}
      </div>
    </div>
  );
}
