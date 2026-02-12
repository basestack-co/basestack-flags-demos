import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/components/home/server-action-demo", () => ({
  ServerActionDemo: () => <div data-testid="server-action-demo" />,
}));

vi.mock("@/components/home/api-route-handler-demo", () => ({
  ApiRouteHandlerDemo: () => <div data-testid="api-route-demo" />,
}));

import { RuntimeDemos } from "@/components/home/runtime-demos";

describe("RuntimeDemos", () => {
  it("renders both runtime sections", () => {
    render(<RuntimeDemos />);

    expect(screen.getByText("Live Toggle Workflows")).toBeInTheDocument();
    expect(screen.getByTestId("server-action-demo")).toBeInTheDocument();
    expect(screen.getByTestId("api-route-demo")).toBeInTheDocument();
  });
});
