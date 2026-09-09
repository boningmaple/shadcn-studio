/**
 * The theme, applied before the body paints.
 *
 * Stringified and inlined into `<head>`, so it cannot import anything — every
 * value it needs is repeated inline rather than shared with
 * `../types/theme`. Changing a theme name, the storage key or the media query
 * means changing it in both places.
 */
export const themeHydrationScript = (() => {
  function themeHydrationFn() {
    const defaultTheme = "system";

    let theme = defaultTheme;
    try {
      const localStorageTheme = localStorage.getItem("theme");
      if (localStorageTheme !== null && ["system", "light", "dark"].includes(localStorageTheme)) {
        theme = localStorageTheme;
      } else {
        localStorage.setItem("theme", theme);
      }
    } catch {}

    const systemIsDark = matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = theme === "dark" || (theme === "system" && systemIsDark);
    const colorScheme = isDark ? "dark" : "light";

    const root = document.documentElement;
    root.dataset.theme = theme;
    root.classList.toggle("dark", isDark);
    root.style.colorScheme = colorScheme;
  }
  return `(${themeHydrationFn.toString()})();`;
})();
