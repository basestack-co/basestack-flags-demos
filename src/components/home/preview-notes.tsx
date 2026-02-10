type PreviewNotesProps = {
  points: string[];
};

export function PreviewNotes({ points }: PreviewNotesProps) {
  return (
    <aside className="panel rounded-2xl p-6">
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
