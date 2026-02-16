import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";

const flagsProviderMock = vi.fn();
const modalsProviderMock = vi.fn();

vi.mock("@basestack/flags-react/client", () => ({
  FlagsProvider: (props: {
    children: ReactNode;
    config: unknown;
    initialFlags?: unknown[];
    preload: boolean;
  }) => {
    flagsProviderMock(props);
    return <div data-testid="flags-provider">{props.children}</div>;
  },
  FeatureFlagModalsProvider: (props: {
    children: ReactNode;
    config: unknown;
    onError: (error: unknown) => void;
  }) => {
    modalsProviderMock(props);
    return <div data-testid="modals-provider">{props.children}</div>;
  },
}));

import { Providers, useTheme } from "@/libs/feature-flags/providers";

function ThemeProbe() {
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <span data-testid="theme-value">{theme}</span>
      <button type="button" onClick={toggleTheme}>
        toggle
      </button>
    </>
  );
}

function ThemeProbeOutsideProvider() {
  useTheme();
  return null;
}

describe("Providers", () => {
  afterEach(() => {
    vi.clearAllMocks();
    document.documentElement.removeAttribute("data-theme");
  });

  it("uses preload when initial flags are missing", () => {
    render(
      <Providers>
        <span>child</span>
      </Providers>,
    );

    expect(screen.getByText("child")).toBeInTheDocument();
    expect(flagsProviderMock).toHaveBeenCalledWith(
      expect.objectContaining({ preload: true }),
    );
    expect(modalsProviderMock).toHaveBeenCalledWith(
      expect.objectContaining({
        config: expect.objectContaining({
          preview: expect.objectContaining({ theme: "light" }),
          feedback: expect.objectContaining({ theme: "light" }),
        }),
      }),
    );
  });

  it("disables preload when initial flags are provided", () => {
    render(
      <Providers initialFlags={[{ slug: "x" } as never]}>
        <span>child</span>
      </Providers>,
    );

    expect(flagsProviderMock).toHaveBeenCalledWith(
      expect.objectContaining({ preload: false }),
    );
  });

  it("wires modal provider error handler", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});

    render(
      <Providers>
        <span>child</span>
      </Providers>,
    );

    const onError = modalsProviderMock.mock.calls[0]?.[0]?.onError as (
      error: unknown,
    ) => void;
    onError(new Error("boom"));

    expect(spy).toHaveBeenCalledWith("[FeatureFlagModals]", expect.any(Error));
    spy.mockRestore();
  });

  it("toggles theme state and keeps modal config in sync", async () => {
    render(
      <Providers>
        <ThemeProbe />
      </Providers>,
    );

    await waitFor(() =>
      expect(document.documentElement.getAttribute("data-theme")).toBe("light"),
    );
    expect(screen.getByTestId("theme-value")).toHaveTextContent("light");

    fireEvent.click(screen.getByRole("button", { name: "toggle" }));

    await waitFor(() =>
      expect(document.documentElement.getAttribute("data-theme")).toBe("dark"),
    );
    expect(screen.getByTestId("theme-value")).toHaveTextContent("dark");
    expect(modalsProviderMock).toHaveBeenLastCalledWith(
      expect.objectContaining({
        config: expect.objectContaining({
          preview: expect.objectContaining({ theme: "dark" }),
          feedback: expect.objectContaining({ theme: "dark" }),
        }),
      }),
    );

    fireEvent.click(screen.getByRole("button", { name: "toggle" }));

    await waitFor(() =>
      expect(document.documentElement.getAttribute("data-theme")).toBe("light"),
    );
    expect(screen.getByTestId("theme-value")).toHaveTextContent("light");
    expect(modalsProviderMock).toHaveBeenLastCalledWith(
      expect.objectContaining({
        config: expect.objectContaining({
          preview: expect.objectContaining({ theme: "light" }),
          feedback: expect.objectContaining({ theme: "light" }),
        }),
      }),
    );
  });

  it("throws when useTheme is called outside Providers", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});

    expect(() => render(<ThemeProbeOutsideProvider />)).toThrow(
      "useTheme must be used within Providers",
    );

    spy.mockRestore();
  });
});
