import { describe, expect, it, vi } from "vitest";
import { sdkVersions } from "@/libs/sdk-versions";

describe("sdkVersions", () => {
  it("exposes installed Basestack SDK package versions", () => {
    expect(sdkVersions.flagsReact).toMatch(/^\d+\.\d+\.\d+/);
    expect(sdkVersions.flagsCli).toMatch(/^\d+\.\d+\.\d+/);
  });

  it("throws when build-time version env vars are missing", async () => {
    const reactVersion = process.env.BASESTACK_FLAGS_REACT_VERSION;
    const cliVersion = process.env.BASESTACK_FLAGS_CLI_VERSION;

    delete process.env.BASESTACK_FLAGS_REACT_VERSION;
    delete process.env.BASESTACK_FLAGS_CLI_VERSION;

    vi.resetModules();

    await expect(import("@/libs/sdk-versions")).rejects.toThrow(
      "Missing BASESTACK_FLAGS_REACT_VERSION",
    );

    process.env.BASESTACK_FLAGS_REACT_VERSION = reactVersion;
    process.env.BASESTACK_FLAGS_CLI_VERSION = cliVersion;
    vi.resetModules();
  });
});
