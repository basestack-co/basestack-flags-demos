import { render, screen } from "@testing-library/react";
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

import { Providers } from "@/libs/feature-flags/providers";

describe("Providers", () => {
  afterEach(() => {
    vi.clearAllMocks();
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
});
