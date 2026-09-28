import { afterEach, describe, expect, it } from "vite-plus/test";

import { localStorageKey } from "@/features/theme-switch/types/theme";

import { cleanupPreview, runPreviewThemeHydrationScript } from "./preview-test-utils";

afterEach(cleanupPreview);

describe("Preview theme hydration", () => {
  describe("Critical paths", () => {
    it.each(["light", "dark"])("pins an explicit %s query", async (theme) => {
      runPreviewThemeHydrationScript(`?theme=${theme}`);
      await expect.poll(() => document.documentElement).toHaveAttribute("data-theme", theme);
      expect(document.documentElement).toHaveStyle({ colorScheme: theme });
    });
  });

  describe("Edge cases", () => {
    it.each(["", "?theme=sepia"])("uses light for the standalone query %j", async (search) => {
      localStorage.setItem(localStorageKey, "dark");
      runPreviewThemeHydrationScript(search);
      await expect.poll(() => document.documentElement).toHaveAttribute("data-theme", "light");
    });
  });
});
