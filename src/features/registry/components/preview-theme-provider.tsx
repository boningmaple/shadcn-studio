import type { ReactNode } from "react";

import { useThemeState } from "@/features/theme-switch/lib/use-theme-state";

import type { PreviewTheme } from "../types/preview-theme";

/**
 * Makes an isolated Preview document follow either its URL or the app's saved
 * theme without exposing the app-specific theme context to Registry items.
 */
export function PreviewThemeProvider({
  children,
  theme,
}: {
  children: ReactNode;
  theme?: PreviewTheme;
}) {
  return theme ? children : <AppThemePreview>{children}</AppThemePreview>;
}

function AppThemePreview({ children }: { children: ReactNode }) {
  useThemeState();
  return children;
}
