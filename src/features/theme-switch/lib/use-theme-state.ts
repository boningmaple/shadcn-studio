import { useEffect, useState } from "react";

import {
  applyThemeToDocument,
  getResolvedThemeFromDocument,
} from "@/features/theme-switch/lib/apply-theme";
import {
  getLocalStorageTheme,
  setLocalStorageTheme,
} from "@/features/theme-switch/lib/theme-storage";
import {
  darkModeMediaQuery,
  localStorageKey,
  parseTheme,
  themes,
  type ResolvedTheme,
  type Theme,
} from "@/features/theme-switch/types/theme";

/**
 * The preference, and everything that keeps the document agreeing with it.
 *
 * Three things can move the theme: this tab setting it, another tab setting it,
 * and — while the preference is `system` — the OS changing underneath both.
 * All three land here so the document is written from one place.
 */
export function useThemeState(): {
  resolvedTheme: ResolvedTheme;
  theme: Theme;
  setTheme: (theme: Theme) => void;
} {
  const [theme, setTheme] = useState<Theme>(getLocalStorageTheme);
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>(themes.light);

  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key !== localStorageKey || event.storageArea !== localStorage) return;
      setTheme(parseTheme(event.newValue));
    };

    addEventListener("storage", onStorage);
    return () => removeEventListener("storage", onStorage);
  }, []);

  useEffect(() => {
    setLocalStorageTheme(localStorageKey, theme);
    const mediaQuery = matchMedia(darkModeMediaQuery);
    const applyTheme = () => {
      applyThemeToDocument(theme);
      setResolvedTheme(getResolvedThemeFromDocument());
    };

    applyTheme();

    if (theme === themes.system) {
      mediaQuery.addEventListener("change", applyTheme);
      return () => mediaQuery.removeEventListener("change", applyTheme);
    }
  }, [theme]);

  return { resolvedTheme, theme, setTheme };
}
