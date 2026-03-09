import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("@basestack/flags-react/client", () => ({
  useFeatureFlagModals: vi.fn(),
}));

vi.mock("@/libs/feature-flags/providers", () => ({
  useTheme: vi.fn(),
}));

import { useFeatureFlagModals } from "@basestack/flags-react/client";
import { HeroSection } from "@/components/home/hero-section";
import { useTheme } from "@/libs/feature-flags/providers";

const useFeatureFlagModalsMock = vi.mocked(useFeatureFlagModals);
const useThemeMock = vi.mocked(useTheme);

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
    useThemeMock.mockReturnValue({
      theme: "light",
      toggleTheme: vi.fn(),
    });

    render(<HeroSection />);

    expect(screen.getByRole("button", { name: "Loading..." })).toBeDisabled();
    expect(
      screen.getByRole("switch", { name: "Toggle dark mode" }),
    ).toHaveTextContent("Dark");
  });

  it("opens preview modal when ready", () => {
    const openPreviewModal = vi.fn();
    useFeatureFlagModalsMock.mockReturnValue({
      ready: true,
      error: null,
      openPreviewModal,
      openFeedbackModal: vi.fn(),
    });
    useThemeMock.mockReturnValue({
      theme: "light",
      toggleTheme: vi.fn(),
    });

    render(<HeroSection />);

    const button = screen.getByRole("button", { name: "Feature Preview" });
    fireEvent.click(button);
    expect(openPreviewModal).toHaveBeenCalledTimes(1);
  });

  it("toggles theme when switch is clicked", () => {
    const toggleTheme = vi.fn();
    useFeatureFlagModalsMock.mockReturnValue({
      ready: true,
      error: null,
      openPreviewModal: vi.fn(),
      openFeedbackModal: vi.fn(),
    });
    useThemeMock.mockReturnValue({
      theme: "dark",
      toggleTheme,
    });

    render(<HeroSection />);

    const switchButton = screen.getByRole("switch", {
      name: "Toggle dark mode",
    });
    expect(switchButton).toHaveTextContent("Light");

    fireEvent.click(switchButton);
    expect(toggleTheme).toHaveBeenCalledTimes(1);
  });
});
