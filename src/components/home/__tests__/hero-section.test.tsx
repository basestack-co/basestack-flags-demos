import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("@basestack/flags-react/client", () => ({
  useFeatureFlagModals: vi.fn(),
}));

import { useFeatureFlagModals } from "@basestack/flags-react/client";
import { HeroSection } from "@/components/home/hero-section";

const useFeatureFlagModalsMock = vi.mocked(useFeatureFlagModals);

describe("HeroSection", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders loading state while modals are not ready", () => {
    useFeatureFlagModalsMock.mockReturnValue({
      ready: false,
      error: null,
      openPreviewModal: vi.fn(),
      openFeedbackModal: vi.fn(),
    });

    render(<HeroSection />);

    expect(screen.getByText("Loading...")).toBeDisabled();
  });

  it("opens preview modal when ready", () => {
    const openPreviewModal = vi.fn();
    useFeatureFlagModalsMock.mockReturnValue({
      ready: true,
      error: null,
      openPreviewModal,
      openFeedbackModal: vi.fn(),
    });

    render(<HeroSection />);

    const button = screen.getByText("Feature Preview (Click Here)");
    fireEvent.click(button);
    expect(openPreviewModal).toHaveBeenCalledTimes(1);
  });
});
