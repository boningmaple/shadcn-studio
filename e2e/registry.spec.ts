import { expect, test, type Page } from "@playwright/test";

async function abortScriptRequests(page: Page) {
  await page.route("**/*", async (route) => {
    if (route.request().resourceType() === "script") {
      await route.abort();
      return;
    }

    await route.continue();
  });
}

async function waitForHydration(page: Page) {
  await expect(page.getByRole("button", { name: /^Theme:/ })).toBeEnabled();
}

async function setInitialTheme(page: Page, theme: "light" | "dark") {
  await page.addInitScript((initialTheme) => {
    if (window === window.top) localStorage.setItem("theme", initialTheme);
  }, theme);
}

test.describe("Registry item Previews", () => {
  for (const collection of [
    { item: "button-01", path: "/components/button", previewText: "Get started, 0" },
    {
      item: "hero-section-01",
      path: "/blocks/hero-section",
      previewText: "Ship with confidence",
    },
    { item: "landing-page-01", path: "/pages/landing-pages", previewText: "Northstar" },
  ]) {
    test(`renders ${collection.path} Preview before hydration`, async ({ page }) => {
      await abortScriptRequests(page);

      const response = await page.goto(collection.path);

      expect(response?.status()).toBe(200);
      await expect(
        page
          .frameLocator(`#${collection.item} iframe`)
          .getByText(collection.previewText, { exact: true })
          .first(),
      ).toBeVisible();
    });
  }

  for (const preview of [
    {
      path: "/preview/components/button/button-01",
      previewText: "Get started, 0",
      title: "Button 01 Preview – VibeUI",
    },
    {
      path: "/preview/blocks/hero-section/hero-section-01",
      previewText: "Ship with confidence",
      title: "Hero Section 01 Preview – VibeUI",
    },
    {
      path: "/preview/pages/landing-pages/landing-page-01",
      previewText: "Northstar",
      title: "Landing Page 01 Preview – VibeUI",
    },
  ]) {
    test(`renders ${preview.path} before hydration`, async ({ page }) => {
      await abortScriptRequests(page);

      const response = await page.goto(preview.path);

      expect(response?.status()).toBe(200);
      await expect(page).toHaveTitle(preview.title);
      await expect(page.getByText(preview.previewText, { exact: true }).first()).toBeVisible();
    });
  }

  test("opens a fresh Registry item Preview in a new tab", async ({ page }) => {
    await setInitialTheme(page, "light");
    await page.goto("/components/button");
    await waitForHydration(page);

    const item = page.locator("#button-01");
    await item.getByRole("button", { name: "Preview theme: Light. Switch to Dark." }).click();
    const previewPagePromise = page.waitForEvent("popup");
    await item.getByRole("link", { name: "Open preview in tab" }).click();
    const previewPage = await previewPagePromise;

    await expect(previewPage).toHaveURL("/preview/components/button/button-01?theme=dark");
    await expect(previewPage).toHaveTitle("Button 01 Preview – VibeUI");
    await expect(previewPage.getByText("Get started, 0", { exact: true })).toBeVisible();
    await expect(previewPage.locator("html")).toHaveAttribute("data-theme", "dark");

    await page.getByRole("button", { exact: true, name: "Theme: Light. Switch to Dark." }).click();
    await page.getByRole("button", { exact: true, name: "Theme: Dark. Switch to System." }).click();
    await page
      .getByRole("button", { exact: true, name: "Theme: System. Switch to Light." })
      .click();

    await expect(previewPage).toHaveURL("/preview/components/button/button-01?theme=dark");
    await expect(previewPage.locator("html")).toHaveAttribute("data-theme", "dark");
  });

  test("applies the persisted theme to an isolated Preview", async ({ page }) => {
    await setInitialTheme(page, "dark");

    await page.goto("/preview/components/button/button-01");

    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  });

  test("applies a Preview theme query before hydration", async ({ page }) => {
    await setInitialTheme(page, "light");
    await abortScriptRequests(page);

    await page.goto("/preview/components/button/button-01?theme=dark");

    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    await expect(page.locator("html")).toHaveClass(/dark/);
  });

  test("follows app theme changes and returns to them after an explicit override", async ({
    page,
  }) => {
    await setInitialTheme(page, "light");
    await page.goto("/components/button");
    await waitForHydration(page);

    const item = page.locator("#button-02");
    const preview = page.frameLocator("#button-02 iframe");
    const previewRoot = preview.locator("html");
    const previewBody = preview.locator("body");

    await page.getByRole("button", { exact: true, name: "Theme: Light. Switch to Dark." }).click();
    await expect(previewRoot).toHaveAttribute("data-theme", "dark");

    await item.getByRole("button", { name: "Preview theme: Dark. Switch to Light." }).click();
    await expect(item.locator("iframe")).toHaveAttribute(
      "src",
      "/preview/components/button/button-02?theme=light",
    );
    await expect(previewRoot).toHaveAttribute("data-theme", "light");
    await expect(previewBody).toHaveCSS("background-color", "oklch(1 0 0)");

    await page.getByRole("button", { exact: true, name: "Theme: Dark. Switch to System." }).click();
    await expect(item.locator("iframe")).toHaveAttribute(
      "src",
      "/preview/components/button/button-02",
    );
    await expect(previewRoot).toHaveAttribute("data-theme", "system");

    await page
      .getByRole("button", { exact: true, name: "Theme: System. Switch to Light." })
      .click();

    await expect(previewRoot).toHaveAttribute("data-theme", "light");
    await expect(preview.getByRole("button", { name: "Open search ⌘ K" })).toHaveCSS(
      "color",
      "oklch(0.145 0 0)",
    );
  });

  test("uses the iframe viewport for responsive Registry item styles", async ({ page }) => {
    await page.goto("/blocks/hero-section");
    await waitForHydration(page);

    const item = page.locator("#hero-section-01");
    const iframe = item.locator("iframe");
    const preview = page.frameLocator("#hero-section-01 iframe");
    const heading = preview.getByRole("heading", {
      name: "A calmer way to build ambitious products",
    });

    await expect(iframe).toHaveAttribute("loading", "lazy");
    await expect(iframe).toHaveAttribute("title", "Hero Section 01 Preview");
    await expect(item.getByRole("radio", { name: "Full-width preview" })).toBeChecked();

    await item.getByRole("radio", { name: "Phone preview" }).click();
    await expect.poll(() => heading.evaluate(() => innerWidth)).toBe(320);
    await expect(heading).toHaveCSS("font-size", "48px");

    await item.getByRole("radio", { name: "Tablet preview" }).click();
    await expect.poll(() => heading.evaluate(() => innerWidth)).toBe(640);
    await expect(heading).toHaveCSS("font-size", "60px");
  });

  test("preserves an iframe across tabs and Reset restores its canonical Preview", async ({
    page,
  }) => {
    await page.goto("/components/button");
    await waitForHydration(page);

    const item = page.locator("#button-01");
    const iframe = item.locator("iframe");
    const preview = page.frameLocator("#button-01 iframe");

    await preview.getByRole("button", { name: "Get started, 0" }).click();
    await expect(preview.getByRole("button", { name: "Get started, 1" })).toBeVisible();

    await item.getByRole("tab", { name: "Code" }).click();
    await expect(iframe).toHaveCount(1);
    await item.getByRole("tab", { name: "Preview" }).click();
    await expect(preview.getByRole("button", { name: "Get started, 1" })).toBeVisible();

    const child = page
      .frames()
      .find((frame) => frame.url().includes("/preview/components/button/button-01"));
    expect(child).toBeDefined();
    await child?.goto("/preview/components/button/button-02");
    await expect(preview.getByRole("button", { name: "Open search ⌘ K" })).toBeVisible();

    await item.getByRole("button", { name: "Reset preview" }).click();
    await expect(preview.getByRole("button", { name: "Get started, 0" })).toBeVisible();
    await expect(iframe).toHaveAttribute("src", "/preview/components/button/button-01");
  });

  test("falls back to the resolved app theme for an invalid Preview theme", async ({ page }) => {
    await setInitialTheme(page, "light");
    await page.goto("/preview/components/button/button-01?theme=sepia");

    await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  });

  test("returns not found for an unknown Collection page", async ({ page }) => {
    const response = await page.goto("/components/not-a-category");

    expect(response?.status()).toBe(404);
  });

  test("returns not found for an unknown Preview", async ({ page }) => {
    const response = await page.goto("/preview/components/button/not-an-item");

    expect(response?.status()).toBe(404);
  });
});
