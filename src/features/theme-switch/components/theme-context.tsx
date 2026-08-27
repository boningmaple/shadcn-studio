import { createContext, useContext } from "react";

import type { Theme } from "@/features/theme-switch/types/theme";

type ThemeContextType = {
  setTheme: (theme: Theme) => void;
  theme: Theme;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
}
