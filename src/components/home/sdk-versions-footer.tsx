import { sdkVersions } from "@/libs/sdk-versions";

const sdkPackages = [
  {
    name: "@basestack/flags-react",
    version: sdkVersions.flagsReact,
    href: "https://www.npmjs.com/package/@basestack/flags-react",
  },
  {
    name: "@basestack/flags-cli",
    version: sdkVersions.flagsCli,
    href: "https://www.npmjs.com/package/@basestack/flags-cli",
  },
] as const;

export function SdkVersionsFooter() {
  return (
    <footer className="border-t border-border/70 pt-6">
      <p className="font-mono text-xs uppercase tracking-widest text-muted">
        Deployed SDK versions
      </p>
      <ul className="mt-3 flex flex-wrap gap-2">
        {sdkPackages.map((pkg) => (
          <li key={pkg.name}>
            <a
              href={pkg.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface-soft px-3 py-1.5 font-mono text-xs text-foreground/80 transition-colors hover:border-accent/40 hover:text-accent"
            >
              <span>{pkg.name}</span>
              <span className="text-muted">v{pkg.version}</span>
            </a>
          </li>
        ))}
      </ul>
    </footer>
  );
}
