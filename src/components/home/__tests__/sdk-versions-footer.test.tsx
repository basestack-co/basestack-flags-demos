import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SdkVersionsFooter } from "@/components/home/sdk-versions-footer";
import { sdkVersions } from "@/libs/sdk-versions";

describe("SdkVersionsFooter", () => {
  it("renders deployed SDK package names, versions, and npm links", () => {
    render(<SdkVersionsFooter />);

    expect(screen.getByText("Deployed SDK versions")).toBeInTheDocument();

    const flagsReactLink = screen.getByRole("link", {
      name: new RegExp(`@basestack/flags-react.*v${sdkVersions.flagsReact}`),
    });
    expect(flagsReactLink).toHaveAttribute(
      "href",
      "https://www.npmjs.com/package/@basestack/flags-react",
    );
    expect(flagsReactLink).toHaveAttribute("target", "_blank");
    expect(flagsReactLink).toHaveAttribute("rel", "noopener noreferrer");

    const flagsCliLink = screen.getByRole("link", {
      name: new RegExp(`@basestack/flags-cli.*v${sdkVersions.flagsCli}`),
    });
    expect(flagsCliLink).toHaveAttribute(
      "href",
      "https://www.npmjs.com/package/@basestack/flags-cli",
    );
    expect(flagsCliLink).toHaveAttribute("target", "_blank");
    expect(flagsCliLink).toHaveAttribute("rel", "noopener noreferrer");
  });
});
