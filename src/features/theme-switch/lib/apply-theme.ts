import {
  darkModeMediaQuery,
  themes,
  type ResolvedTheme,
  type Theme,
} from "@/features/theme-switch/types/theme";

export function resolveTheme(theme: Theme, systemIsDark: boolean): ResolvedTheme {
  return theme === themes.dark || (theme === themes.system && systemIsDark)
    ? themes.dark
    : themes.light;
}

export function getResolvedThemeFromDocument(): ResolvedTheme {
  return document.documentElement.classList.contains("dark") ? themes.dark : themes.light;
}

export function applyResolvedThemeToDocument(theme: ResolvedTheme) {
  const root = document.documentElement;
  root.dataset.theme = theme;
  root.classList.toggle("dark", theme === themes.dark);
  root.style.colorScheme = theme;
}

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
  const resolvedTheme = resolveTheme(theme, systemIsDark);

  const root = document.documentElement;
  root.dataset.theme = theme;
  root.classList.toggle("dark", resolvedTheme === themes.dark);
  root.style.colorScheme = resolvedTheme;
}
