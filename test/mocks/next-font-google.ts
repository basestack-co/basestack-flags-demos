type FontReturn = { variable: string };

type FontFactory = (_config: unknown) => FontReturn;

export const Manrope: FontFactory = () => ({ variable: "--font-manrope" });
export const Fraunces: FontFactory = () => ({ variable: "--font-fraunces" });
export const IBM_Plex_Mono: FontFactory = () => ({
  variable: "--font-ibm-plex-mono",
});
