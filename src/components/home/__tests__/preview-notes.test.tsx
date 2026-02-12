import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("@basestack/flags-react/client", () => ({
  useFlag: vi.fn(),
}));

import { useFlag } from "@basestack/flags-react/client";
import { PreviewNotes } from "@/components/home/preview-notes";

const useFlagMock = vi.mocked(useFlag);

describe("PreviewNotes", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("does not render while loading or disabled", () => {
    useFlagMock.mockReturnValue({
      enabled: false,
      payload: null,
      error: null,
      refresh: vi.fn(),
      isLoading: true,
      openFeedbackModal: vi.fn(),
    });

    const { container } = render(<PreviewNotes points={["a"]} />);

    expect(container).toBeEmptyDOMElement();
  });

  it("renders notes and sends feedback event", () => {
    const openFeedbackModal = vi.fn();
    useFlagMock.mockReturnValue({
      enabled: true,
      payload: { variant: "x" },
      error: null,
      refresh: vi.fn(),
      isLoading: false,
      openFeedbackModal,
    });

    render(<PreviewNotes points={["First", "Second"]} />);

    expect(screen.getByText("Preview Notes")).toBeInTheDocument();
    expect(screen.getByText("First")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Give Feedback (Click Here)"));
    expect(openFeedbackModal).toHaveBeenCalledWith({
      featureName: "Preview Notes",
    });
  });
});
