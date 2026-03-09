"use client";

import { useFeatureFlagModals } from "@basestack/flags-react/client";
import { useTheme } from "@/libs/feature-flags/providers";

export function HeroSection() {
  const { ready, openPreviewModal } = useFeatureFlagModals();
  const { theme, toggleTheme } = useTheme();
  const isDarkTheme = theme === "dark";

  return (
    <header className="panel rounded-2xl p-6 md:p-8">
      <div className="flex flex-wrap items-start justify-between gap-6">
        <div className="min-w-0 flex-1">
          <div className="mb-3 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <p className="text-xs font-semibold uppercase tracking-widest text-accent">
              Northstar Workspace
            </p>
          </div>
          <h1 className="font-display text-3xl leading-tight md:text-5xl">
            Product Operations Dashboard
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted md:text-base">
            A focused control center for tracking initiatives, performance, and
            cross-team execution in one place.
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2 pt-1">
          <button
            type="button"
            role="switch"
            aria-checked={isDarkTheme}
            aria-label="Toggle dark mode"
            onClick={toggleTheme}
            className="flex h-9 cursor-pointer items-center gap-2 rounded-lg border border-border bg-surface-soft px-3 text-sm font-medium text-foreground/70 transition-colors hover:border-foreground/20 hover:text-foreground"
          >
            <span className="text-base leading-none">
              {isDarkTheme ? "☀" : "☾"}
            </span>
            <span>{isDarkTheme ? "Light" : "Dark"}</span>
          </button>

          <button
            onClick={openPreviewModal}
            disabled={!ready}
            className="flex h-9 cursor-pointer items-center gap-2 rounded-lg border border-warning/40 bg-warning-soft px-3 text-sm font-medium text-warning transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {ready && (
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-warning opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-warning" />
              </span>
            )}
            <span>{ready ? "Feature Preview" : "Loading..."}</span>
          </button>
        </div>
      </div>

      <div className="demo-grid mt-6 rounded-xl border border-border/50 bg-surface-soft px-4 py-3">
        <p className="font-mono text-xs text-muted">
          Preview build — demonstrating layout and feature flag interactions.
        </p>
      </div>
    </header>
  );
}
