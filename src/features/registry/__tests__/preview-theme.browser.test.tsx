import { afterEach, beforeEach, describe, expect, it, vi } from "vite-plus/test";
import { page, userEvent } from "vite-plus/test/browser/context";

import { localStorageKey } from "@/features/theme-switch/types/theme";

import {
  renderPreviewBlock,
  previewThemeButton,
  appThemeButton,
  openPreviewLink,
  mockPreviewHighlighting,
  cleanupPreview,
  observePreviewFrameMessages,
} from "./preview-test-utils";

vi.mock("@/features/registry/lib/highlight-code", { spy: true });

beforeEach(async () => {
  mockPreviewHighlighting();
  localStorage.setItem(localStorageKey, "light");
  await page.viewport(1280, 800);
});

afterEach(cleanupPreview);

describe("Preview theme", () => {
  describe("Critical paths", () => {
    it.each(["light", "dark"])("initially follows the stored %s app theme", async (theme) => {
      localStorage.setItem(localStorageKey, theme);
      await renderPreviewBlock({ showThemeSwitch: true });
      await expect
        .element(previewThemeButton())
        .toHaveAccessibleName(
          theme === "light"
            ? "Preview theme: Light. Switch to Dark."
            : "Preview theme: Dark. Switch to Light.",
        );
      await expect
        .element(openPreviewLink())
        .toHaveAttribute("href", `/preview/components/button/first-item?theme=${theme}`);
    });

    it("switches the Preview in both directions without changing the app theme", async () => {
      await renderPreviewBlock({ showThemeSwitch: true });
      const { latestRequestedTheme } = observePreviewFrameMessages();
      await userEvent.click(previewThemeButton());
      await expect.poll(latestRequestedTheme).toBe("dark");
      await expect
        .element(previewThemeButton())
        .toHaveAccessibleName("Preview theme: Dark. Switch to Light.");
      await expect
        .element(openPreviewLink())
        .toHaveAttribute("href", "/preview/components/button/first-item?theme=dark");
      await expect.element(appThemeButton()).toHaveAccessibleName("Theme: Light. Switch to Dark.");
      expect(localStorage.getItem(localStorageKey)).toBe("light");

      await userEvent.click(previewThemeButton());
      await expect.poll(latestRequestedTheme).toBe("light");
      await expect
        .element(previewThemeButton())
        .toHaveAccessibleName("Preview theme: Light. Switch to Dark.");
      await expect
        .element(openPreviewLink())
        .toHaveAttribute("href", "/preview/components/button/first-item?theme=light");
    });
  });

  describe("States and error handling", () => {
    it("clears the Preview override when the app theme changes and resumes following it", async () => {
      await renderPreviewBlock({ showThemeSwitch: true });
      const { latestRequestedTheme } = observePreviewFrameMessages();
      await userEvent.click(previewThemeButton());
      await expect.poll(latestRequestedTheme).toBe("dark");
      // Switch to the same resolved theme as the override, then continue cycling.
      await userEvent.click(appThemeButton());
      await expect.element(appThemeButton()).toHaveAccessibleName("Theme: Dark. Switch to System.");
      await userEvent.click(appThemeButton());
      await expect
        .element(appThemeButton())
        .toHaveAccessibleName("Theme: System. Switch to Light.");
      await userEvent.click(appThemeButton());
      await expect
        .element(previewThemeButton())
        .toHaveAccessibleName("Preview theme: Light. Switch to Dark.");
      await expect.poll(latestRequestedTheme).toBe("light");
      await expect
        .element(openPreviewLink())
        .toHaveAttribute("href", "/preview/components/button/first-item?theme=light");
    });
  });
});

describe("Preview theme - Accessibility", () => {
  it.each(["{Enter}", " "])("supports %j activation and retains focus", async (key) => {
    await renderPreviewBlock({ showThemeSwitch: true });
    await userEvent.click(previewThemeButton());
    await expect.element(previewThemeButton()).toHaveFocus();
    await expect
      .element(previewThemeButton())
      .toHaveAccessibleName("Preview theme: Dark. Switch to Light.");
    await userEvent.keyboard(key);
    await expect
      .element(previewThemeButton())
      .toHaveAccessibleName("Preview theme: Light. Switch to Dark.");
    await expect.element(previewThemeButton()).toHaveFocus();
  });
});
