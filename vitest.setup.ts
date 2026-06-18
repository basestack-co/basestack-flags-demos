import { readFileSync } from "node:fs";
import { join } from "node:path";
import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

function readInstalledVersion(packageName: string): string {
  const packageJsonPath = join(
    process.cwd(),
    "node_modules",
    packageName,
    "package.json",
  );

  return JSON.parse(readFileSync(packageJsonPath, "utf8")).version as string;
}

process.env.BASESTACK_FLAGS_REACT_VERSION ??= readInstalledVersion(
  "@basestack/flags-react",
);
process.env.BASESTACK_FLAGS_CLI_VERSION ??= readInstalledVersion(
  "@basestack/flags-cli",
);

afterEach(() => {
  cleanup();
});
