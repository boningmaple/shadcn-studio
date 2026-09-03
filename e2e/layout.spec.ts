import { expect, test, type Page } from "@playwright/test";

const sidebar = (page: Page) => page.locator('[data-slot="sidebar"]').first();
const workspaceControls = (page: Page) => page.getByRole("toolbar", { name: "Workspace controls" });

async function waitForHydration(page: Page) {
  await expect(page.getByRole("button", { name: /^Theme:/ })).toBeEnabled();
}

test.describe("route-controlled sidebar", () => {
  test("hides the desktop sidebar on the home page", async ({ page }) => {
    await page.goto("/");
    await waitForHydration(page);

    await expect(sidebar(page)).toHaveCount(0);
    await expect(workspaceControls(page)).toHaveCount(0);
  });

  test("keeps the desktop sidebar on registry routes and restores it after navigation", async ({
    page,
  }) => {
    await page.goto("/components/button");
    await waitForHydration(page);

    await expect(sidebar(page)).toBeVisible();
    await expect(workspaceControls(page)).toBeVisible();

    await page.getByRole("link", { name: "Home", exact: true }).click();
    await expect(page).toHaveURL("/");
    await expect(sidebar(page)).toHaveCount(0);
    await expect(workspaceControls(page)).toHaveCount(0);

    await page.getByRole("link", { name: "Components", exact: true }).click();
    await expect(page).toHaveURL("/components");
    await expect(sidebar(page)).toBeVisible();
    await expect(workspaceControls(page)).toBeVisible();
  });

  test("opens the sidebar sheet from the home page below lg", async ({ page }) => {
    await page.setViewportSize({ height: 844, width: 390 });
    await page.goto("/");
    await waitForHydration(page);

    await page.getByRole("button", { name: "Toggle Sidebar" }).click();

    const sidebar = page.getByRole("dialog", { name: "Sidebar" });
    await expect(sidebar).toBeVisible();
    await expect(sidebar.getByRole("link", { name: "Home", exact: true })).toBeVisible();
  });

  test("navigates from a Registry section to a Collection page", async ({ page }) => {
    await page.goto("/components");
    await waitForHydration(page);

    await page.getByRole("button", { name: "Components", exact: true }).click();
    await page.getByRole("link", { name: "Button", exact: true }).click();

    await expect(page).toHaveURL("/components/button");
    await expect(page.getByRole("heading", { name: "Button", exact: true })).toBeVisible();
    await expect(page.getByText("Button 01", { exact: true })).toBeVisible();
    await expect(page.getByText("Button 02", { exact: true })).toBeVisible();
  });
});
