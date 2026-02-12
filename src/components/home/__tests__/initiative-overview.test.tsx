import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("@basestack/flags-react/client", () => ({
  useFlag: vi.fn(),
}));

import { useFlag } from "@basestack/flags-react/client";
import { InitiativeOverview } from "@/components/home/initiative-overview";

const useFlagMock = vi.mocked(useFlag);

const items = [
  { name: "One", description: "D1", status: "planned", progress: "10%" },
  { name: "Two", description: "D2", status: "active", progress: "20%" },
  { name: "Three", description: "D3", status: "done", progress: "30%" },
];

describe("InitiativeOverview", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("shows one item when feature is disabled", () => {
    useFlagMock.mockReturnValue({
      enabled: false,
      payload: null,
      error: null,
      refresh: vi.fn(),
      isLoading: false,
      openFeedbackModal: vi.fn(),
    });

    render(<InitiativeOverview items={items} />);

    expect(screen.getByText("One")).toBeInTheDocument();
    expect(screen.queryByText("Two")).not.toBeInTheDocument();
    expect(
      screen.queryByText("Give Feedback (Click Here)"),
    ).not.toBeInTheDocument();
  });

  it("shows all top items and opens feedback when enabled", () => {
    const openFeedbackModal = vi.fn();
    useFlagMock.mockReturnValue({
      enabled: true,
      payload: { variant: "x" },
      error: null,
      refresh: vi.fn(),
      isLoading: false,
      openFeedbackModal,
    });

    render(<InitiativeOverview items={items} />);

    expect(screen.getByText("Three")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Give Feedback (Click Here)"));
    expect(openFeedbackModal).toHaveBeenCalledWith({
      featureName: "Initiative Overview",
    });
  });
});
