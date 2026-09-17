import {
  darkModeMediaQuery,
  defaultTheme,
  localStorageKey,
  themes,
  type Theme,
  type Themes,
} from "@/features/theme-switch/types/theme";

/**
 * The theme hydration script, applied before the body paints.
 *
 * The function is stringified and inlined into `<head>`, so its configuration
 * is serialized into the call rather than captured from this module's scope.
 */
export const themeHydrationScript = (() => {
  function themeHydrationFn(
    themes: Themes,
    defaultTheme: Theme,
    localStorageKey: string,
    darkModeMediaQuery: string,
  ) {
    let theme = defaultTheme;
    try {
      const localStorageTheme = localStorage.getItem(localStorageKey);
      if (
        localStorageTheme !== null &&
        Object.values(themes).includes(localStorageTheme as Theme)
      ) {
        theme = localStorageTheme as Theme;
      } else {
        localStorage.setItem(localStorageKey, theme);
      }
    } catch {}

    const systemIsDark = matchMedia(darkModeMediaQuery).matches;
    const isDark = theme === themes.dark || (theme === themes.system && systemIsDark);
    const colorScheme = isDark ? "dark" : "light";

    const root = document.documentElement;
    root.dataset.theme = theme;
    root.classList.toggle("dark", isDark);
    root.style.colorScheme = colorScheme;
  }

  const args = [themes, defaultTheme, localStorageKey, darkModeMediaQuery]
    .map((value) => JSON.stringify(value))
    .join(",");

  return `(${themeHydrationFn.toString()})(${args});`;
})();
