import { describe, expect, it } from "vitest";
import { sdkVersions } from "@/libs/sdk-versions";

describe("sdkVersions", () => {
  it("exposes installed Basestack SDK package versions", () => {
    expect(sdkVersions.flagsReact).toMatch(/^\d+\.\d+\.\d+/);
    expect(sdkVersions.flagsCli).toMatch(/^\d+\.\d+\.\d+/);
  });
});
