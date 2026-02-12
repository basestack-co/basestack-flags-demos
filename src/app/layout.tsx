import type { Metadata } from "next";
import { Fraunces, IBM_Plex_Mono, Manrope } from "next/font/google";
import "./globals.css";
import {
  FlagsHydrationScript,
  fetchFlags,
} from "@basestack/flags-react/server";
import { flagsConfig } from "@/libs/feature-flags/config";
import { Providers } from "@/libs/feature-flags/providers";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  weight: ["400", "500"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Northstar Workspace Demo",
  description: "Preview dashboard for product operations and team execution.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const flags = await fetchFlags(flagsConfig);

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml"></link>
      </head>
      <body
        className={`${manrope.variable} ${fraunces.variable} ${ibmPlexMono.variable} antialiased`}
      >
        <Providers initialFlags={flags}>{children}</Providers>
        <FlagsHydrationScript flags={flags} />
      </body>
    </html>
  );
}
