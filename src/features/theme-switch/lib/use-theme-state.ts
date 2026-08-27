import { useEffect, useState } from "react";

import { applyThemeToDocument } from "@/features/theme-switch/lib/apply-theme";
import {
  getLocalStorageTheme,
  setLocalStorageTheme,
} from "@/features/theme-switch/lib/theme-storage";
import {
  darkModeMediaQuery,
  localStorageKey,
  parseTheme,
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
  setTheme: (theme: Theme) => void;
  theme: Theme;
} {
  const [theme, setTheme] = useState<Theme>(getLocalStorageTheme);

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
    applyThemeToDocument(theme);

    if (theme === "system") {
      const onChange = () => applyThemeToDocument(theme);
      const mediaQuery = matchMedia(darkModeMediaQuery);
      mediaQuery.addEventListener("change", onChange);
      return () => mediaQuery.removeEventListener("change", onChange);
    }
  }, [theme]);

  return { setTheme, theme };
}
