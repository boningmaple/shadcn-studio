/**
 * Applies a standalone Preview's optional theme query before its body paints.
 *
 * This runs after the app-wide stored-theme hydration script, so a valid
 * Preview-local query can override that document without changing storage.
 */
export const previewThemeHydrationScript = (() => {
  function previewThemeHydrationFn() {
    const theme = new URLSearchParams(location.search).get("theme");
    if (theme !== "light" && theme !== "dark") return;

    const root = document.documentElement;
    root.dataset.theme = theme;
    root.classList.toggle("dark", theme === "dark");
    root.style.colorScheme = theme;
  }

  return `(${previewThemeHydrationFn.toString()})();`;
})();
