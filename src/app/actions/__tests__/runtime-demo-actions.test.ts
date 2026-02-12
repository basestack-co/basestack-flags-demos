import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("@basestack/flags-react/server", () => ({
  fetchFlag: vi.fn(),
}));

import { fetchFlag } from "@basestack/flags-react/server";
import {
  getHeaderFlagAction,
  runHeaderPolicyAction,
  type ServerActionDemoState,
} from "@/app/actions/runtime-demo-actions";
import { flagsConfig } from "@/libs/feature-flags/config";

const fetchFlagMock = vi.mocked(fetchFlag);

const prevState: ServerActionDemoState = {
  status: "idle",
  message: "",
  surface: "",
  checkedAt: null,
  flag: null,
};

describe("runtime demo actions", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("loads header flag with default slug", async () => {
    const flag = {
      slug: "header",
      enabled: true,
      description: "desc",
      payload: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      expiredAt: null,
    };
    fetchFlagMock.mockResolvedValue(flag);

    const result = await getHeaderFlagAction();

    expect(fetchFlagMock).toHaveBeenCalledWith("header", flagsConfig);
    expect(result).toBe(flag);
  });

  it("returns success with mapped flag and defaults for blank form data", async () => {
    fetchFlagMock.mockResolvedValue({
      slug: "header",
      enabled: false,
      description: "hidden",
      payload: undefined,
      createdAt: new Date("2025-01-01T00:00:00.000Z"),
      updatedAt: new Date("2025-01-02T00:00:00.000Z"),
      expiredAt: null,
    });

    const formData = new FormData();
    formData.set("surface", "   ");
    formData.set("flagSlug", "   ");

    const result = await runHeaderPolicyAction(prevState, formData);

    expect(fetchFlagMock).toHaveBeenCalledWith("header", flagsConfig);
    expect(result.status).toBe("success");
    expect(result.message).toBe("header is hidden on Homepage.");
    expect(result.surface).toBe("Homepage");
    expect(result.checkedAt).not.toBeNull();
    expect(result.flag).toEqual(
      expect.objectContaining({
        slug: "header",
        enabled: false,
        payload: null,
        expiredAt: null,
      }),
    );
  });

  it("preserves provided fields and maps non-null expiration", async () => {
    const expiredAt = new Date("2025-02-01T00:00:00.000Z");
    fetchFlagMock.mockResolvedValue({
      slug: "custom",
      enabled: true,
      description: "visible",
      payload: { variant: "A" },
      createdAt: new Date("2025-01-01T00:00:00.000Z"),
      updatedAt: new Date("2025-01-02T00:00:00.000Z"),
      expiredAt,
    });

    const formData = new FormData();
    formData.set("surface", "Checkout");
    formData.set("flagSlug", "custom");

    const result = await runHeaderPolicyAction(prevState, formData);

    expect(fetchFlagMock).toHaveBeenCalledWith("custom", flagsConfig);
    expect(result.message).toBe("custom is visible on Checkout.");
    expect(result.flag?.expiredAt).toBe(expiredAt);
  });

  it("returns a safe error response when fetch fails", async () => {
    fetchFlagMock.mockRejectedValue(new Error("network"));

    const formData = new FormData();
    formData.set("surface", "Search Results");

    const result = await runHeaderPolicyAction(prevState, formData);

    expect(result).toEqual({
      status: "error",
      message: "Unable to load release rule. Please try again.",
      surface: "Search Results",
      checkedAt: null,
      flag: null,
    });
  });

  it("uses nullish defaults when form fields are absent", async () => {
    fetchFlagMock.mockResolvedValue({
      slug: "header",
      enabled: true,
      description: "visible",
      payload: { a: 1 },
      createdAt: new Date("2025-01-01T00:00:00.000Z"),
      updatedAt: new Date("2025-01-02T00:00:00.000Z"),
      expiredAt: null,
    });

    const result = await runHeaderPolicyAction(prevState, new FormData());

    expect(fetchFlagMock).toHaveBeenCalledWith("header", flagsConfig);
    expect(result.surface).toBe("Homepage");
    expect(result.message).toBe("header is visible on Homepage.");
  });
});
