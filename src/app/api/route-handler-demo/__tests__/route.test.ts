import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("@basestack/flags-react/server", () => ({
  fetchFlag: vi.fn(),
}));

import { fetchFlag } from "@basestack/flags-react/server";
import { GET } from "@/app/api/route-handler-demo/route";

const fetchFlagMock = vi.mocked(fetchFlag);

describe("GET /api/route-handler-demo", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("returns enabled message when flag is enabled", async () => {
    fetchFlagMock.mockResolvedValue({
      slug: "stats_grid",
      enabled: true,
      description: "desc",
      payload: { count: 1 },
      createdAt: new Date("2025-01-01T00:00:00.000Z"),
      updatedAt: new Date("2025-01-02T00:00:00.000Z"),
      expiredAt: null,
    });

    const response = await GET();
    const body = (await response.json()) as {
      message: string;
      checkedAt: string;
    };

    expect(response.status).toBe(200);
    expect(body.message).toBe("Initiative overview is enabled for customers.");
    expect(body.checkedAt).toBeTypeOf("string");
  });

  it("returns disabled message when flag is disabled", async () => {
    fetchFlagMock.mockResolvedValue({
      slug: "stats_grid",
      enabled: false,
      description: "desc",
      payload: null,
      createdAt: new Date("2025-01-01T00:00:00.000Z"),
      updatedAt: new Date("2025-01-02T00:00:00.000Z"),
      expiredAt: new Date("2025-01-03T00:00:00.000Z"),
    });

    const response = await GET();
    const body = (await response.json()) as {
      message: string;
      flag: { expiredAt: string | null };
    };

    expect(response.status).toBe(200);
    expect(body.message).toBe("Initiative overview is currently disabled.");
    expect(body.flag.expiredAt).toBeTruthy();
  });

  it("returns 500 when fetch fails", async () => {
    fetchFlagMock.mockRejectedValue(new Error("boom"));
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    const response = await GET();
    const body = (await response.json()) as { message: string };

    expect(response.status).toBe(500);
    expect(body).toEqual({ message: "Unable to load flag" });
    expect(errorSpy).toHaveBeenCalledWith(
      "Failed to load flag",
      expect.any(Error),
    );

    errorSpy.mockRestore();
  });
});
