/** Applies a standalone Preview's explicit URL theme before its body paints. */
export const previewThemeHydrationScript = (() => {
  function previewThemeHydrationFn() {
    const queryTheme = new URLSearchParams(location.search).get("theme");
    const parentTheme =
      window === parent || !parent.document.documentElement.classList.contains("dark")
        ? "light"
        : "dark";
    const theme =
      queryTheme === "dark" || (queryTheme === null && parentTheme === "dark") ? "dark" : "light";

    const root = document.documentElement;
    root.dataset.theme = theme;
    root.classList.toggle("dark", theme === "dark");
    root.style.colorScheme = theme;
  }

  return `(${previewThemeHydrationFn.toString()})();`;
})();
