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
    { path: "/components/button", previewText: "Get started" },
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
});
