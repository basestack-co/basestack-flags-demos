"use client";

import { useFlag } from "@basestack/flags-react/client";
import { useEffect, useState } from "react";

type PreviewNotesProps = {
  points: string[];
};

export function PreviewNotes({ points }: PreviewNotesProps) {
  const { enabled, isLoading, openFeedbackModal } = useFlag<{
    variant?: string;
  }>("preview_notes");

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !enabled || isLoading) return null;

  return (
    <aside className="panel rounded-2xl p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-muted">
          Preview Notes
        </h2>
        <button
          onClick={() => openFeedbackModal({ featureName: "Preview Notes" })}
          disabled={isLoading}
          className="cursor-pointer text-xs text-accent hover:underline disabled:opacity-50"
        >
          Give Feedback
        </button>
      </div>
      <ul className="space-y-3">
        {points.map((point) => (
          <li
            key={point}
            className="flex items-start gap-2.5 text-sm text-muted"
          >
            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-border" />
            {point}
          </li>
        ))}
      </ul>
    </aside>
  );
}
