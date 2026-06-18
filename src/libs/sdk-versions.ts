import { readFileSync } from "node:fs";
import { join } from "node:path";

function readInstalledVersion(packageName: string): string {
  const packageJsonPath = join(
    process.cwd(),
    "node_modules",
    packageName,
    "package.json",
  );

  return JSON.parse(readFileSync(packageJsonPath, "utf8")).version as string;
}

export const sdkVersions = {
  flagsReact: readInstalledVersion("@basestack/flags-react"),
  flagsCli: readInstalledVersion("@basestack/flags-cli"),
} as const;
