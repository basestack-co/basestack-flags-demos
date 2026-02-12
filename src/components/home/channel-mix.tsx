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
      <h2 className="font-display text-2xl">Channel Mix</h2>
      <div className="mt-4 space-y-3">
        {items.map((item) => (
          <div
            key={item.label}
            className="rounded-xl border border-border bg-surface-soft p-3"
          >
            <p className="font-mono text-xs uppercase tracking-[0.1em]">
              Channel {item.label}
            </p>
            <p className="mt-1 text-sm font-semibold">
              {item.traffic} traffic share
            </p>
            <p className="mt-1 text-xs text-foreground/75">{item.note}</p>
          </div>
        ))}
      </div>
    </aside>
  );
}
