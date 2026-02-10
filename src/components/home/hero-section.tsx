"use client";

import { useFeatureFlagModals } from "@basestack/flags-react/client";

export function HeroSection() {
  const { ready, openPreviewModal } = useFeatureFlagModals();

  return (
    <header className="panel rounded-2xl p-6 md:p-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Northstar Workspace
          </p>
          <h1 className="font-display mt-2 text-3xl leading-tight md:text-5xl">
            Product Operations Dashboard
          </h1>
        </div>
        <button
          onClick={openPreviewModal}
          disabled={!ready}
          className="cursor-pointer rounded-full border border-warning bg-warning-soft px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-warning"
        >
          {ready ? "Feature Preview (Click Here)" : "Loading..."}
        </button>
      </div>
      <p className="max-w-3xl text-sm leading-7 text-foreground/80 md:text-base">
        A focused control center for tracking initiatives, performance, and
        cross-team execution in one place.
      </p>
      <div className="demo-grid mt-6 rounded-xl border border-border bg-surface-soft p-4">
        <p className="font-mono text-xs text-foreground/80 md:text-sm">
          Preview build: designed to demonstrate layout and interactions before
          connecting real systems.
        </p>
      </div>
    </header>
  );
}
