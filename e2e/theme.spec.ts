import { expect, test, type Page } from "@playwright/test";

import { localStorageKey, type Theme } from "@/features/theme-switch/types/theme";

const getThemeSwitchButton = (page: Page) => page.getByRole("button", { name: /^Theme:/ });

const expectTheme = async (
  page: Page,
  expectedTheme: Theme,
  expectedColorScheme: "light" | "dark",
) => {
  const root = page.locator("html");
  await expect(root).toHaveAttribute("data-theme", expectedTheme);
  await expect(root).toHaveCSS("color-scheme", expectedColorScheme);
  if (expectedColorScheme == "dark") {
    await expect(root).toContainClass("dark");
  }
  // The only read here with no retry of its own. Polling gives a theme
  // arriving from another tab the same chance to land as the assertions above.
  await expect
    .poll(() => root.evaluate((_, key) => localStorage.getItem(key), localStorageKey))
    .toBe(expectedTheme);
};

/**
 * Theme buttons are server-rendered disabled and only become interactive once
 * React has hydrated. The role locator finds the one button currently exposed
 * by the document's `data-theme`.
 */
async function abortScriptRequest(page: Page) {
  await page.route("**/*", async (route) => {
    if (route.request().resourceType() === "script") {
      await route.abort();
      return;
    }

    await route.continue();
  });
}

test.describe("theme of first screen", () => {
  test("no stored theme before hydration", async ({ page }) => {
    await abortScriptRequest(page);
    await page.goto("/");
    await expectTheme(page, "system", "light");
    await expect(getThemeSwitchButton(page)).toBeDisabled();
  });

  test("no stored theme after hydration", async ({ page }) => {
    await page.goto("/");
    await expect(getThemeSwitchButton(page)).toBeEnabled();
    await expectTheme(page, "system", "light");
  });

  test("stored theme is system before hydration", async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem("theme", "system");
    });
    await abortScriptRequest(page);
    await page.goto("/");
    await expectTheme(page, "system", "light");
    await expect(getThemeSwitchButton(page)).toBeDisabled();
  });

  test("stored theme is system after hydration", async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem("theme", "system");
    });
    await page.goto("/");
    await expect(getThemeSwitchButton(page)).toBeEnabled();
    await expectTheme(page, "system", "light");
  });

  test("stored theme is light before hydration", async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem("theme", "light");
    });
    await abortScriptRequest(page);
    await page.goto("/");
    await expectTheme(page, "light", "light");
    await expect(getThemeSwitchButton(page)).toBeDisabled();
  });

  test("stored theme is light after hydration", async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem("theme", "light");
    });
    await page.goto("/");
    await expect(getThemeSwitchButton(page)).toBeEnabled();
    await expectTheme(page, "light", "light");
  });

  test("stored theme is dark before hydration", async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem("theme", "dark");
    });
    await abortScriptRequest(page);
    await page.goto("/");
    await expectTheme(page, "dark", "dark");
    await expect(getThemeSwitchButton(page)).toBeDisabled();
  });

  test("stored theme is dark after hydration", async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem("theme", "dark");
    });
    await page.goto("/");
    await expect(getThemeSwitchButton(page)).toBeEnabled();
    await expectTheme(page, "dark", "dark");
  });
});

test("switch theme", async ({ page }) => {
  await page.goto("/");

  await getThemeSwitchButton(page).click(); // system -> light
  await expectTheme(page, "light", "light");

  await getThemeSwitchButton(page).click(); // light -> dark
  await expectTheme(page, "dark", "dark");

  await getThemeSwitchButton(page).click(); // dark -> system
  await expectTheme(page, "system", "light");

  await getThemeSwitchButton(page).click(); // system -> light
  await expectTheme(page, "light", "light");
});

test.describe("system theme", () => {
  test("OS theme is light", async ({ page }) => {
    await page.emulateMedia({ colorScheme: "light" });
    await page.goto("/");
    await expect(getThemeSwitchButton(page)).toBeEnabled();
    await expectTheme(page, "system", "light");

    await page.emulateMedia({ colorScheme: "dark" });
    await expectTheme(page, "system", "dark");
  });

  test("OS theme is dark", async ({ page }) => {
    await page.emulateMedia({ colorScheme: "dark" });
    await page.goto("/");
    await expect(getThemeSwitchButton(page)).toBeEnabled();
    await expectTheme(page, "system", "dark");

    await page.emulateMedia({ colorScheme: "light" });
    await expectTheme(page, "system", "light");
  });
});

test("syncs across tabs", async ({ context }) => {
  const first = await context.newPage();
  await first.goto("/");
  await expect(getThemeSwitchButton(first)).toBeEnabled();

  const second = await context.newPage();
  await second.goto("/");
  // Both tabs have to be listening before either one writes. A tab subscribes
  // to `storage` while hydrating, in the same pass that enables its button, so
  // a write sent before this point reaches a tab that is not yet listening —
  // which then writes its own stale theme back over the new one.
  await expect(getThemeSwitchButton(second)).toBeEnabled();

  await getThemeSwitchButton(first).click(); // system -> light
  await expectTheme(second, "light", "light");

  await getThemeSwitchButton(second).click(); // light -> dark
  await expectTheme(second, "dark", "dark");

  await getThemeSwitchButton(first).click(); // dark -> system
  await expectTheme(second, "system", "light");

  await getThemeSwitchButton(second).click(); // system -> light
  await expectTheme(second, "light", "light");
});
