import { darkModeMediaQuery, type Theme } from "@/features/theme-switch/types/theme";

/**
 * Writes the theme onto `<html>`, where the stylesheet reads it.
 *
 * `data-theme` carries the preference as chosen — including `system` — while
 * the `dark` class and `color-scheme` carry what that resolves to right now.
 * The switch button's labels key off the former; everything visual off the
 * latter.
 */
export function applyThemeToDocument(theme: Theme) {
  const systemIsDark = matchMedia(darkModeMediaQuery).matches;
  const isDark = theme === "dark" || (theme === "system" && systemIsDark);
  const colorScheme = isDark ? "dark" : "light";

  const root = document.documentElement;
  root.dataset.theme = theme;
  root.classList.toggle("dark", isDark);
  root.style.colorScheme = colorScheme;
}
