"use client";

import type { Flag } from "@basestack/flags-react";
import {
  FeatureFlagModalsProvider,
  FlagsProvider,
} from "@basestack/flags-react/client";
import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { ThemeMode } from "./config";
import { flagsConfig, flagsWcConfig } from "./config";

export interface ProvidersProps {
  children: ReactNode;
  initialFlags?: Flag[];
}

interface ThemeContextValue {
  theme: ThemeMode;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within Providers");
  }

  return context;
}

export function Providers({ children, initialFlags }: ProvidersProps) {
  const [theme, setTheme] = useState<ThemeMode>("light");

  const modalConfig = useMemo(() => flagsWcConfig(theme), [theme]);

  const themeContextValue = useMemo(
    () => ({
      theme,
      toggleTheme: () =>
        setTheme((currentTheme) =>
          currentTheme === "light" ? "dark" : "light",
        ),
    }),
    [theme],
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <FlagsProvider
      config={flagsConfig}
      initialFlags={initialFlags}
      preload={!initialFlags?.length}
    >
      <FeatureFlagModalsProvider
        config={modalConfig}
        onError={(err) => console.error("[FeatureFlagModals]", err)}
      >
        <ThemeContext.Provider value={themeContextValue}>
          {children}
        </ThemeContext.Provider>
      </FeatureFlagModalsProvider>
    </FlagsProvider>
  );
}
