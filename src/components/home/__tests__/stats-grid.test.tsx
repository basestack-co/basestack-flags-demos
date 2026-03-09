import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("@basestack/flags-react/client", () => ({
  useFlag: vi.fn(),
}));

import { useFlag } from "@basestack/flags-react/client";
import { StatsGrid } from "@/components/home/stats-grid";

const useFlagMock = vi.mocked(useFlag);

describe("StatsGrid", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("returns null when feature is disabled", () => {
    useFlagMock.mockReturnValue({
      enabled: false,
      payload: null,
      error: null,
      refresh: vi.fn(),
      openFeedbackModal: vi.fn(),
      isLoading: false,
    });

    const { container } = render(<StatsGrid />);

    expect(container).toBeEmptyDOMElement();
  });

  it("shows loading values while data is loading", () => {
    useFlagMock.mockReturnValue({
      enabled: true,
      payload: {},
      error: null,
      refresh: vi.fn(),
      openFeedbackModal: vi.fn(),
      isLoading: true,
    });

    render(<StatsGrid />);

    expect(screen.getAllByText("—")).toHaveLength(3);
  });

  it("renders resolved stats and defaults missing values to zero", () => {
    useFlagMock.mockReturnValue({
      enabled: true,
      payload: { projects: 8, teams: 4 },
      error: null,
      refresh: vi.fn(),
      openFeedbackModal: vi.fn(),
      isLoading: false,
    });

    render(<StatsGrid />);

    expect(screen.getByText("8")).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();
    expect(screen.getByText("0")).toBeInTheDocument();
  });
});
