import { describe, expect, it } from "vitest";
import { flagsConfig, flagsWcConfig } from "@/libs/feature-flags/config";

describe("feature flags config", () => {
  it("exposes sdk configuration", () => {
    expect(flagsConfig).toEqual({
      baseURL: "http://localhost:4000/v1",
      projectKey: "cmlgz0k5a0001tz8oejdaqjsv",
      environmentKey: "cmlgz0k5d0003tz8oaatruirp",
    });
  });

  it("exposes modal copy configuration", () => {
    const config = flagsWcConfig("light");

    expect(config.preview.heading).toBe("Feature Preview");
    expect(config.feedback.heading).toBe("Feedback");
  });

  it("applies selected theme to preview and feedback modals", () => {
    const darkConfig = flagsWcConfig("dark");

    expect(darkConfig.preview.theme).toBe("dark");
    expect(darkConfig.feedback.theme).toBe("dark");
  });
});
