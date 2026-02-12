import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

const { initiativeOverviewMock, channelMixMock, previewNotesMock } = vi.hoisted(
  () => ({
    initiativeOverviewMock: vi.fn((props: { items: unknown[] }) => (
      <div data-testid="initiative-overview">{props.items.length}</div>
    )),
    channelMixMock: vi.fn((props: { items: unknown[] }) => (
      <div data-testid="channel-mix">{props.items.length}</div>
    )),
    previewNotesMock: vi.fn((props: { points: unknown[] }) => (
      <div data-testid="preview-notes">{props.points.length}</div>
    )),
  }),
);

vi.mock("@/components/home/hero-section", () => ({
  HeroSection: () => <div data-testid="hero" />,
}));

vi.mock("@/components/home/stats-grid", () => ({
  StatsGrid: () => <div data-testid="stats-grid" />,
}));

vi.mock("@/components/home/initiative-overview", () => ({
  InitiativeOverview: initiativeOverviewMock,
}));

vi.mock("@/components/home/channel-mix", () => ({
  ChannelMix: channelMixMock,
}));

vi.mock("@/components/home/preview-notes", () => ({
  PreviewNotes: previewNotesMock,
}));

vi.mock("@/components/home/runtime-demos", () => ({
  RuntimeDemos: () => <div data-testid="runtime-demos" />,
}));

import Home from "@/app/page";

describe("Home page", () => {
  it("renders composed sections and passes seeded props", () => {
    render(<Home />);

    expect(screen.getByTestId("hero")).toBeInTheDocument();
    expect(screen.getByTestId("stats-grid")).toBeInTheDocument();
    expect(screen.getByTestId("runtime-demos")).toBeInTheDocument();
    expect(screen.getByTestId("initiative-overview")).toHaveTextContent("3");
    expect(screen.getByTestId("channel-mix")).toHaveTextContent("2");
    expect(screen.getByTestId("preview-notes")).toHaveTextContent("3");
  });
});
