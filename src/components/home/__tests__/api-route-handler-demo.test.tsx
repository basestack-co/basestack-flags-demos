import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ApiRouteHandlerDemo } from "@/components/home/api-route-handler-demo";

describe("ApiRouteHandlerDemo", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("loads and displays successful API payload", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      json: async () => ({
        flag: {
          slug: "stats_grid",
          enabled: true,
          description: "demo",
          payload: { n: 1 },
          createdAt: "2025-01-01T00:00:00.000Z",
          updatedAt: "2025-01-01T00:00:00.000Z",
          expiredAt: null,
        },
        message: "Everything good",
        checkedAt: "2025-01-01T00:00:00.000Z",
      }),
    } as Response);

    render(<ApiRouteHandlerDemo />);
    fireEvent.click(screen.getByText("Load live status"));

    await waitFor(() => {
      expect(screen.getByText("Everything good")).toBeInTheDocument();
    });

    expect(fetchMock).toHaveBeenCalledWith("/api/route-handler-demo", {
      cache: "no-store",
    });
    expect(screen.getByText("stats_grid")).toBeInTheDocument();
    expect(screen.getByText("Visible")).toBeInTheDocument();
  });

  it("shows error for invalid API payload", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      json: async () => ({ message: "missing fields" }),
    } as Response);

    render(<ApiRouteHandlerDemo />);
    fireEvent.click(screen.getByText("Load live status"));

    await waitFor(() => {
      expect(
        screen.getByText("Request failed. Retry in a few seconds."),
      ).toBeInTheDocument();
    });
  });

  it("shows hidden status and empty payload when flag payload is null", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      json: async () => ({
        flag: {
          slug: "stats_grid",
          enabled: false,
          description: "demo",
          payload: null,
          createdAt: "2025-01-01T00:00:00.000Z",
          updatedAt: "2025-01-01T00:00:00.000Z",
          expiredAt: null,
        },
        message: "Now hidden",
        checkedAt: "2025-01-01T00:00:00.000Z",
      }),
    } as Response);

    render(<ApiRouteHandlerDemo />);
    fireEvent.click(screen.getByText("Load live status"));

    await waitFor(() => {
      expect(screen.getByText("Hidden")).toBeInTheDocument();
    });

    expect(screen.getByText("{}", { exact: false })).toBeInTheDocument();
  });

  it("shows error when payload is null", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      json: async () => null,
    } as Response);

    render(<ApiRouteHandlerDemo />);
    fireEvent.click(screen.getByText("Load live status"));

    await waitFor(() => {
      expect(
        screen.getByText("Request failed. Retry in a few seconds."),
      ).toBeInTheDocument();
    });
  });

  it("shows error when request fails", async () => {
    vi.spyOn(globalThis, "fetch").mockRejectedValue(new Error("network"));

    render(<ApiRouteHandlerDemo />);
    fireEvent.click(screen.getByText("Load live status"));

    await waitFor(() => {
      expect(
        screen.getByText("Request failed. Retry in a few seconds."),
      ).toBeInTheDocument();
    });
  });
});
