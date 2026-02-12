"use client";

import { useFlag } from "@basestack/flags-react/client";

type PreviewNotesProps = {
  points: string[];
};

export function PreviewNotes({ points }: PreviewNotesProps) {
  const { enabled, isLoading, openFeedbackModal } = useFlag<{
    variant?: string;
  }>("preview_notes");

  if (!enabled || isLoading) return null;

  return (
    <aside className="panel rounded-2xl p-6">
      <div className="mb-5 flex items-center justify-between">
        <button
          onClick={() => openFeedbackModal({ featureName: "Preview Notes" })}
          disabled={isLoading}
          className="rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold text-accent"
        >
          Give Feedback (Click Here)
        </button>{" "}
      </div>
      <h2 className="font-display text-2xl">Preview Notes</h2>
      <ul className="mt-4 space-y-2 text-sm text-foreground/80">
        {points.map((point) => (
          <li key={point} className="rounded-lg bg-surface-soft p-3">
            {point}
          </li>
        ))}
      </ul>
    </aside>
  );
}
