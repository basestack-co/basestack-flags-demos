import type { ReactElement, ReactNode } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

const { fetchFlagsMock, providersMock, hydrationScriptMock } = vi.hoisted(
  () => ({
    fetchFlagsMock: vi.fn(),
    providersMock: vi.fn((props: { children: ReactNode }) => props.children),
    hydrationScriptMock: vi.fn(() => null),
  }),
);

vi.mock("@/app/globals.css", () => ({}));
vi.mock("./globals.css", () => ({}));

vi.mock("next/font/google", () => ({
  Manrope: () => ({ variable: "--font-manrope" }),
  Fraunces: () => ({ variable: "--font-fraunces" }),
  IBM_Plex_Mono: () => ({ variable: "--font-ibm-plex-mono" }),
}));

vi.mock("@basestack/flags-react/server", () => ({
  fetchFlags: fetchFlagsMock,
  FlagsHydrationScript: hydrationScriptMock,
}));

vi.mock("@/libs/feature-flags/providers", () => ({
  Providers: providersMock,
}));

import RootLayout, { metadata } from "@/app/layout";

describe("RootLayout", () => {
  it("exports metadata", () => {
    expect(metadata.title).toBe("Northstar Workspace Demo");
    expect(metadata.description).toContain("Preview dashboard");
  });

  it("loads flags and renders providers + hydration script", async () => {
    const flags = [{ slug: "one", enabled: true }];
    fetchFlagsMock.mockResolvedValue(flags);

    const element = await RootLayout({ children: <div>Child</div> });
    renderToStaticMarkup(element);

    expect(fetchFlagsMock).toHaveBeenCalledTimes(1);
    expect((element as ReactElement).type).toBe("html");
    expect(providersMock).toHaveBeenCalledWith(
      expect.objectContaining({ initialFlags: flags }),
      undefined,
    );
    expect(hydrationScriptMock).toHaveBeenCalledWith(
      expect.objectContaining({ flags }),
      undefined,
    );
  });
});
