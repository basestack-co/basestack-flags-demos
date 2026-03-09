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

const statusVariantItems = [
  {
    name: "Launch",
    description: "D4",
    status: "in progress",
    progress: "40%",
  },
  {
    name: "Recovery",
    description: "D5",
    status: "on hold",
    progress: "50%",
  },
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
    expect(screen.queryByRole("button", { name: "Give Feedback" })).toBeNull();
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
    fireEvent.click(screen.getByRole("button", { name: "Give Feedback" }));
    expect(openFeedbackModal).toHaveBeenCalledWith({
      featureName: "Initiative Overview",
      metadata: {
        user_id: "123",
        user_name: "John Doe",
        user_email: "john.doe@example.com",
        user_role: "admin",
        user_organization: "Example Inc.",
        user_organization_id: "123",
        user_organization_name: "Example Inc.",
        user_organization_role: "admin",
        user_organization_email: "admin@example.com",
      },
    });
  });

  it("applies status styling for in-progress and on-hold items", () => {
    useFlagMock.mockReturnValue({
      enabled: true,
      payload: { variant: "x" },
      error: null,
      refresh: vi.fn(),
      isLoading: false,
      openFeedbackModal: vi.fn(),
    });

    render(<InitiativeOverview items={statusVariantItems} />);

    expect(screen.getByText("in progress")).toHaveClass(
      "bg-accent-soft",
      "text-accent",
      "border-accent/20",
    );
    expect(screen.getByText("on hold")).toHaveClass(
      "bg-warning-soft",
      "text-warning",
      "border-warning/20",
    );
  });
});
