const stats = [
  { label: "Active projects", value: "12" },
  { label: "Teams online", value: "8 squads" },
  { label: "Tasks closed today", value: "247" },
];

export function StatsGrid() {
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
