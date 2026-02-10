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
              openFeedbackModal({ featureName: "Initiative Overview" })
            }
            disabled={isLoading}
            className="rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold text-accent"
          >
            Give Feedback (Click Here)
          </button>
        )}
      </div>
      <div className="space-y-4">
        {items
          .map((item) => (
            <article
              key={item.name}
              className="rounded-xl border border-border bg-surface-soft p-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="font-mono text-sm font-medium">{item.name}</h3>
                <span className="rounded-full border border-border bg-surface px-3 py-1 text-xs uppercase tracking-[0.1em]">
                  {item.status}
                </span>
              </div>
              <p className="mt-2 text-sm text-foreground/80">
                {item.description}
              </p>
              <div className="mt-3">
                <p className="mb-2 text-xs uppercase tracking-[0.1em] text-foreground/70">
                  Progress: {item.progress}
                </p>
                <div className="h-2 rounded-full bg-border">
                  <div
                    className="h-2 rounded-full bg-accent"
                    style={{ width: item.progress }}
                  />
                </div>
              </div>
            </article>
          ))
          .filter((_, index) => index < (enabled ? 2 : 1))}
      </div>
    </div>
  );
}
