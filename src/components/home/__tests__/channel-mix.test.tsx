import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ChannelMix } from "@/components/home/channel-mix";

describe("ChannelMix", () => {
  it("renders all provided channels", () => {
    render(
      <ChannelMix
        items={[
          { label: "A", traffic: "30%", note: "Organic" },
          { label: "B", traffic: "70%", note: "Paid" },
        ]}
      />,
    );

    expect(screen.getByText("Channel Mix")).toBeInTheDocument();
    expect(screen.getByText("30% traffic share")).toBeInTheDocument();
    expect(screen.getByText("70% traffic share")).toBeInTheDocument();
  });
});
