import { expect, test } from "@playwright/test";

for (const path of ["/unknown", "/components/unknown", "/components/button/extra"]) {
  test(`site not-found retains navigation at ${path}`, async ({ page }) => {
    const response = await page.goto(path);
    expect(response?.status()).toBe(404);
    await expect(page.getByRole("heading", { name: "Page not found" })).toBeVisible();
    await expect(page.locator('[data-slot="sidebar"]').first()).toBeVisible();
    await expect(page.getByRole("button", { name: /^Theme:/ })).toBeEnabled();
    await page.getByRole("link", { name: "Go home", exact: true }).click();
    await expect(page).toHaveURL("/");
    await expect(
      page.getByRole("heading", { name: "Build from open, copy-ready UI" }),
    ).toBeVisible();
  });
}

for (const path of ["/preview", "/preview/unknown", "/preview/components/button/missing"]) {
  test(`preview not-found stays outside the site layout at ${path}`, async ({ page }) => {
    const response = await page.goto(path);
    expect(response?.status()).toBe(404);
    await expect(page.getByRole("heading", { name: "Preview not found" })).toBeVisible();
    await expect(page.locator('[data-slot="sidebar"]')).toHaveCount(0);
    await expect(page.getByRole("button", { name: /^Theme:/ })).toHaveCount(0);
    await expect(page.getByRole("toolbar", { name: "Workspace controls" })).toHaveCount(0);
  });
}

test("existing Preview still wins over both catch-all routes", async ({ page }) => {
  const response = await page.goto("/preview/components/button/button-01");
  expect(response?.status()).toBe(200);
  await expect(page.getByRole("button").first()).toBeVisible();
  await expect(page.getByRole("heading", { name: /not found/i })).toHaveCount(0);
  await expect(page.locator('[data-slot="sidebar"]')).toHaveCount(0);
});
