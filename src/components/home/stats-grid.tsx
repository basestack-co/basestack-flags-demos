"use client";

import { useFlag } from "@basestack/flags-react/client";
import { useMemo } from "react";

export function StatsGrid() {
  const { enabled, payload, isLoading } = useFlag<{
    projects: number;
    teams: number;
    tasks: number;
  }>("stats_grid");

  const stats = useMemo(() => {
    if (!enabled) return [];

    const valueOrLoading = (val?: number) => (isLoading ? "—" : (val ?? 0));

    return [
      { label: "Active projects", value: valueOrLoading(payload?.projects) },
      { label: "Teams online", value: valueOrLoading(payload?.teams) },
      { label: "Tasks closed today", value: valueOrLoading(payload?.tasks) },
    ];
  }, [enabled, isLoading, payload]);

  if (!enabled) return null;

  return (
    <section className="grid gap-4 md:grid-cols-3">
      {stats.map((item) => (
        <div
          key={item.label}
          className="panel relative overflow-hidden rounded-2xl p-5"
        >
          <div className="absolute inset-x-0 top-0 h-px bg-accent opacity-50" />
          <p className="text-xs font-medium uppercase tracking-widest text-muted">
            {item.label}
          </p>
          <p className="mt-3 font-mono text-4xl font-semibold tabular-nums">
            {item.value}
          </p>
        </div>
      ))}
    </section>
  );
}
