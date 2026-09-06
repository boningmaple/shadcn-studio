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
    await page.goto("/components/button");
    await waitForHydration(page);

    const previewPagePromise = page.waitForEvent("popup");
    await page.locator("#button-01").getByRole("link", { name: "Open preview in tab" }).click();
    const previewPage = await previewPagePromise;

    await expect(previewPage).toHaveURL("/preview/components/button/button-01");
    await expect(previewPage).toHaveTitle("Button 01 Preview – VibeUI");
    await expect(previewPage.getByText("Get started, 0", { exact: true })).toBeVisible();
  });

  test("applies the persisted theme to an isolated Preview", async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem("theme", "dark"));

    await page.goto("/preview/components/button/button-01");

    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
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
