import { ChannelMix, type ChannelMixItem } from "@/components/home/channel-mix";
import { HeroSection } from "@/components/home/hero-section";
import {
  InitiativeOverview,
  type InitiativeItem,
} from "@/components/home/initiative-overview";
import { PreviewNotes } from "@/components/home/preview-notes";
import { StatsGrid } from "@/components/home/stats-grid";

const initiatives: InitiativeItem[] = [
  {
    name: "Mobile Checkout Refresh",
    description:
      "Redesigning checkout steps to reduce drop-off on mobile devices.",
    status: "in progress",
    progress: "42%",
  },
  {
    name: "Loyalty Program Expansion",
    description: "Preparing new rewards tiers for frequent customers.",
    status: "planned",
    progress: "68%",
  },
  {
    name: "Operations Automation",
    description: "Automating repetitive support tasks across regional teams.",
    status: "on hold",
    progress: "12%",
  },
];

const channelMix: ChannelMixItem[] = [
  { label: "A", traffic: "50%", note: "Organic and direct traffic" },
  { label: "B", traffic: "50%", note: "Paid campaigns and affiliates" },
];

const previewNotes = [
  "This screen is a preview environment, not a live production workspace.",
  "Metrics and statuses are placeholder values for UI demonstration.",
  "Swap this content with your own business scenarios and live data.",
];

export default function Home() {
  return (
    <main className="min-h-screen px-5 py-6 md:px-10 md:py-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <HeroSection />
        <StatsGrid />
        <section className="grid gap-4 lg:grid-cols-[2fr_1fr]">
          <InitiativeOverview items={initiatives} />
          <div className="space-y-4">
            <ChannelMix items={channelMix} />
            <PreviewNotes points={previewNotes} />
          </div>
        </section>
      </div>
    </main>
  );
}
