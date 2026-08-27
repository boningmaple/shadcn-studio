import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

import { getComponent } from "../src/features/search/data/registry";
import { appQuickLinks } from "../src/features/ui-app/data/app-sidebar-data";

const card = getComponent("card");

const searchButton = (page: Page) => page.getByRole("button", { name: "Search" });
const searchDialog = (page: Page) => page.getByRole("dialog", { name: "Search" });
const searchDialogContent = (page: Page) => page.locator('[data-slot="dialog-content"]');
const searchInput = (page: Page) => page.getByRole("searchbox", { name: "Search" });
const themeButton = (page: Page) => page.getByRole("button", { name: /^Theme:/ });
const result = (page: Page, name: string | RegExp) =>
  page.getByRole("menuitem", { exact: typeof name === "string", name });

async function visitHome(page: Page) {
  await page.goto("/");
  await expect(themeButton(page)).toBeEnabled();
}

async function openSearch(page: Page) {
  await expect(searchButton(page)).toBeEnabled();
  await searchButton(page).click();
  await expect(searchDialog(page)).toBeVisible();
  await expect(searchDialogContent(page)).not.toHaveAttribute("data-entering", /.*/);
}

async function pressSearchShortcut(page: Page) {
  const isApplePlatform = await page.evaluate(() =>
    /mac|iphone|ipad|ipod/i.test(navigator.userAgent),
  );
  await page.keyboard.press(`${isApplePlatform ? "Meta" : "Control"}+K`);
}

async function expectNoAxeViolations(page: Page) {
  const { violations } = await new AxeBuilder({ page }).include("header").analyze();
  expect(violations).toEqual([]);
}

test("search has no axe violations when closed or open", async ({ page }) => {
  await visitHome(page);
  await expect(searchButton(page)).toBeEnabled();
  await expectNoAxeViolations(page);

  await openSearch(page);
  const { violations } = await new AxeBuilder({ page }).include('[role="dialog"]').analyze();
  expect(violations).toEqual([]);
});

test("quick links use the real app destinations", async ({ page }) => {
  const firstQuickLink = appQuickLinks[0];
  if (firstQuickLink == null) {
    throw new Error("Expected at least one app quick link.");
  }

  await visitHome(page);

  await openSearch(page);
  for (const quickLink of appQuickLinks) {
    await expect(result(page, quickLink.label)).toBeVisible();
  }

  await result(page, firstQuickLink.label).click();

  await expect(page).toHaveURL(firstQuickLink.to);
});

test("search result navigates through the real search index", async ({ page }) => {
  await visitHome(page);

  await openSearch(page);
  await searchInput(page).fill("card");
  await expect(result(page, card.name)).toBeVisible();
  await result(page, card.name).click();

  await expect(page).toHaveURL(card.href);
  await expect(page.getByRole("heading", { level: 1, name: card.name })).toBeVisible();
});

test("platform shortcut opens search", async ({ page }) => {
  await visitHome(page);

  await pressSearchShortcut(page);

  await expect(searchDialog(page)).toBeVisible();
});
