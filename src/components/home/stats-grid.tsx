"use client";

import { useFlag } from "@basestack/flags-react/client";
import { useMemo } from "react";

export function StatsGrid() {
  const { enabled, payload, isLoading } = useFlag<{
    projects: number;
    teams: number;
    tasks: number;
  }>("stats_grid");

  const valueOrLoading = (val?: number) =>
    isLoading ? "Loading..." : (val ?? 0);

  const stats = [
    { label: "Active projects", value: valueOrLoading(payload?.projects) },
    { label: "Teams online", value: valueOrLoading(payload?.teams) },
    { label: "Tasks closed today", value: valueOrLoading(payload?.tasks) },
  ];

  return (
    <section className="grid gap-4 md:grid-cols-3">
      {stats.map((item) => (
        <div key={item.label} className="panel rounded-2xl p-5">
          <p className="text-xs uppercase tracking-[0.12em] text-foreground/70">
            {item.label}
          </p>
          <p className="mt-2 text-3xl font-semibold">{item.value}</p>
        </div>
      ))}
    </section>
  );
}
