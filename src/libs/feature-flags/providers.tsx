"use client";

import type { Flag } from "@basestack/flags-react";
import {
  FeatureFlagModalsProvider,
  FlagsProvider,
} from "@basestack/flags-react/client";
import type { ReactNode } from "react";
import { flagsConfig, flagsWcConfig } from "./config";

export interface ProvidersProps {
  children: ReactNode;
  initialFlags?: Flag[];
}

export function Providers({ children, initialFlags }: ProvidersProps) {
  return (
    <FlagsProvider
      config={flagsConfig}
      initialFlags={initialFlags}
      preload={!initialFlags?.length}
    >
      <FeatureFlagModalsProvider
        config={flagsWcConfig}
        onError={(err) => console.error("[FeatureFlagModals]", err)}
      >
        {children}
      </FeatureFlagModalsProvider>
    </FlagsProvider>
  );
}
