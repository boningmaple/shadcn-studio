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

test.describe("Registry item Previews", () => {
  for (const collection of [
    { path: "/components/button", previewText: "Get started, 0" },
    { path: "/blocks/hero-section", previewText: "Ship with confidence" },
    { path: "/pages/landing-pages", previewText: "Northstar" },
  ]) {
    test(`renders ${collection.path} Preview before hydration`, async ({ page }) => {
      await abortScriptRequests(page);

      const response = await page.goto(collection.path);

      expect(response?.status()).toBe(200);
      await expect(page.getByText(collection.previewText, { exact: true }).first()).toBeVisible();
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
    await page.addInitScript(() => localStorage.setItem("theme", "light"));
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
    await expect(previewPage.locator('[data-slot="registry-preview-theme"]')).toHaveAttribute(
      "data-theme",
      "dark",
    );
  });

  test("applies the persisted theme to an isolated Preview", async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem("theme", "dark"));

    await page.goto("/preview/components/button/button-01");

    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    await expect(page.locator('[data-slot="registry-preview-theme"]')).toHaveAttribute(
      "data-theme",
      "dark",
    );
  });

  test("follows the app theme until the Preview theme switch is used", async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem("theme", "light"));
    await page.goto("/components/button");
    await waitForHydration(page);

    const item = page.locator("#button-02");
    const boundary = item.locator('[data-slot="registry-preview-theme"]');

    await page.getByRole("button", { exact: true, name: "Theme: Light. Switch to Dark." }).click();
    await expect(boundary).toHaveAttribute("data-theme", "dark");

    await item.getByRole("button", { name: "Preview theme: Dark. Switch to Light." }).click();
    await page.getByRole("button", { exact: true, name: "Theme: Dark. Switch to System." }).click();
    await page
      .getByRole("button", { exact: true, name: "Theme: System. Switch to Light." })
      .click();
    await page.getByRole("button", { exact: true, name: "Theme: Light. Switch to Dark." }).click();

    await expect(boundary).toHaveAttribute("data-theme", "light");
    await expect(boundary).toHaveCSS("background-color", "oklch(1 0 0)");
    await expect(item.getByRole("button", { name: "Open search ⌘ K" })).toHaveCSS(
      "color",
      "oklch(0.145 0 0)",
    );

    await item.getByRole("button", { name: "Preview theme: Light. Switch to Dark." }).click();
    await page.getByRole("button", { exact: true, name: "Theme: Dark. Switch to System." }).click();
    await page
      .getByRole("button", { exact: true, name: "Theme: System. Switch to Light." })
      .click();

    await expect(boundary).toHaveAttribute("data-theme", "dark");
    await expect(item.getByRole("button", { name: "Open search ⌘ K" })).toHaveCSS(
      "color",
      "oklch(0.985 0 0)",
    );
    await expect(boundary).toHaveCSS("background-color", "oklch(0.145 0 0)");
  });

  test("falls back to the resolved app theme for an invalid Preview theme", async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem("theme", "light"));
    await page.goto("/preview/components/button/button-01?theme=sepia");

    await expect(page.locator('[data-slot="registry-preview-theme"]')).toHaveAttribute(
      "data-theme",
      "light",
    );
  });

  test("loads a Code preview only after its tab opens", async ({ page }) => {
    await page.goto("/components/button");
    await waitForHydration(page);

    const item = page.locator("#button-01");
    await expect(item.locator("pre code")).toHaveCount(0);

    await item.getByRole("tab", { name: "Code" }).click();

    await expect(item.locator("pre code")).toContainText("export default function Button01");
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
