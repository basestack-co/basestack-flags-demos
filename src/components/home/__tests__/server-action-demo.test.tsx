import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

const { useActionStateMock } = vi.hoisted(() => ({
  useActionStateMock: vi.fn(),
}));

vi.mock("react", async () => {
  const actual = await vi.importActual<typeof import("react")>("react");
  return {
    ...actual,
    useActionState: useActionStateMock,
  };
});

import { ServerActionDemo } from "@/components/home/server-action-demo";

describe("ServerActionDemo", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders idle content with submit action", () => {
    useActionStateMock.mockReturnValue([
      {
        status: "idle",
        message:
          "Run a policy check to confirm if the campaign header should be shown.",
        surface: "Homepage",
        checkedAt: null,
        flag: null,
      },
      vi.fn(),
      false,
    ]);

    render(<ServerActionDemo />);

    expect(screen.getByText("Campaign Header Control")).toBeInTheDocument();
    expect(screen.getByText("Run policy check")).toBeInTheDocument();
  });

  it("renders resolved flag details and checked timestamp", () => {
    useActionStateMock.mockReturnValue([
      {
        status: "success",
        message: "header is visible on Homepage.",
        surface: "Homepage",
        checkedAt: "2025-01-01T00:00:00.000Z",
        flag: {
          slug: "header",
          enabled: true,
          description: "Header enabled",
          payload: { variant: "a" },
          createdAt: new Date(),
          updatedAt: new Date(),
          expiredAt: null,
        },
      },
      vi.fn(),
      true,
    ]);

    render(<ServerActionDemo />);

    expect(screen.getByText("Checking policy...")).toBeDisabled();
    expect(screen.getByText("header")).toBeInTheDocument();
    expect(screen.getByText("Visible")).toBeInTheDocument();
    expect(screen.getByText(/Checked at/)).toBeInTheDocument();
  });

  it("renders warning color class on error status", () => {
    useActionStateMock.mockReturnValue([
      {
        status: "error",
        message: "Unable to load release rule. Please try again.",
        surface: "Checkout",
        checkedAt: null,
        flag: null,
      },
      vi.fn(),
      false,
    ]);

    render(<ServerActionDemo />);

    expect(
      screen.getByText("Unable to load release rule. Please try again."),
    ).toHaveClass("text-warning");
  });

  it("renders hidden status and empty payload for disabled flags", () => {
    useActionStateMock.mockReturnValue([
      {
        status: "success",
        message: "header is hidden on Checkout.",
        surface: "Checkout",
        checkedAt: "2025-01-01T00:00:00.000Z",
        flag: {
          slug: "header",
          enabled: false,
          description: "Header disabled",
          payload: null,
          createdAt: new Date(),
          updatedAt: new Date(),
          expiredAt: null,
        },
      },
      vi.fn(),
      false,
    ]);

    render(<ServerActionDemo />);

    expect(screen.getByText("Hidden")).toBeInTheDocument();
    expect(screen.getByText("{}", { exact: false })).toBeInTheDocument();
  });
});
