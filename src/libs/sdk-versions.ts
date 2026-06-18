function requireVersion(name: string, value: string | undefined): string {
  if (!value) {
    throw new Error(
      `Missing ${name}. Run the app via Next.js so build-time env is set.`,
    );
  }

  return value;
}

export const sdkVersions = {
  flagsReact: requireVersion(
    "BASESTACK_FLAGS_REACT_VERSION",
    process.env.BASESTACK_FLAGS_REACT_VERSION,
  ),
  flagsCli: requireVersion(
    "BASESTACK_FLAGS_CLI_VERSION",
    process.env.BASESTACK_FLAGS_CLI_VERSION,
  ),
} as const;
