import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { NextConfig } from "next";

function readInstalledVersion(packageName: string): string {
  const packageJsonPath = join(
    process.cwd(),
    "node_modules",
    packageName,
    "package.json",
  );

  return JSON.parse(readFileSync(packageJsonPath, "utf8")).version as string;
}

const nextConfig: NextConfig = {
  env: {
    BASESTACK_FLAGS_REACT_VERSION: readInstalledVersion(
      "@basestack/flags-react",
    ),
    BASESTACK_FLAGS_CLI_VERSION: readInstalledVersion("@basestack/flags-cli"),
  },
};

export default nextConfig;

// Enable calling `getCloudflareContext()` in `next dev`.
// See https://opennext.js.org/cloudflare/bindings#local-access-to-bindings.
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

initOpenNextCloudflareForDev();
