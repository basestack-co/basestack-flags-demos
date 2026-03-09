export type ChannelMixItem = {
  label: string;
  traffic: string;
  note: string;
};

type ChannelMixProps = {
  items: ChannelMixItem[];
};

export function ChannelMix({ items }: ChannelMixProps) {
  return (
    <aside className="panel rounded-2xl p-6">
      <h2 className="font-display text-xl">Channel Mix</h2>

      <div className="mt-4 flex h-2 overflow-hidden rounded-full">
        <div
          className="h-full bg-accent transition-all"
          style={{ width: "50%" }}
        />
        <div className="h-full flex-1 bg-warning/60" />
      </div>

      <div className="mt-4 space-y-3">
        {items.map((item, index) => (
          <div
            key={item.label}
            className="flex items-center justify-between rounded-lg border border-border bg-surface-soft px-3 py-2.5"
          >
            <div className="flex items-center gap-2.5">
              <span
                className={`h-2 w-2 rounded-full ${index === 0 ? "bg-accent" : "bg-warning/60"}`}
              />
              <div>
                <p className="text-sm font-medium">Channel {item.label}</p>
                <p className="text-xs text-muted">{item.note}</p>
              </div>
            </div>
            <p className="font-mono text-lg font-semibold tabular-nums">
              {item.traffic}
            </p>
          </div>
        ))}
      </div>
    </aside>
  );
}
