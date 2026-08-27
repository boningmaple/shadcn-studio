import type { ReactNode } from "react";

import { ThemeContext } from "@/features/theme-switch/components/theme-context";
import { useThemeState } from "@/features/theme-switch/lib/use-theme-state";

export function ThemeProvider({ children }: { children: ReactNode }) {
  return <ThemeContext value={useThemeState()}>{children}</ThemeContext>;
}
