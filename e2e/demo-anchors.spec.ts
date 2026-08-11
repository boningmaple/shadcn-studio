import { expect, test, type Page } from "@playwright/test";

import { components, demoAnchorId, getComponent } from "../src/registry";

const button = getComponent("button");
const targetDemo = button.demos[6];
const targetAnchorId = demoAnchorId(button, targetDemo);

/** The sticky app header, which a Demo must be scrolled clear of. */
const headerHeight = 56;

const demoCard = (page: Page, anchorId: string) => page.locator(`#${anchorId}`);

test("a Demo fragment scrolls to that Demo and marks it", async ({ page }) => {
  await page.goto(`${button.href}#${targetAnchorId}`);

  const card = demoCard(page, targetAnchorId);
  await expect(card).toHaveAttribute("aria-label", targetDemo.name);
  await expect(card).toBeInViewport();

  // The page itself scrolled, and far enough that the sticky header is not
  // covering the card the visitor was sent to.
  expect(await page.evaluate(() => window.scrollY)).toBeGreaterThan(0);
  const top = await card.evaluate((node) => node.getBoundingClientRect().top);
  expect(top).toBeGreaterThanOrEqual(headerHeight);

  // Marked on arrival, and not sticky.
  await expect(card).toHaveAttribute("data-marked", "true");
  await expect(card).toHaveAttribute("data-marked", "false", { timeout: 6000 });
});

test("a Demo's anchor is the id its code artifact is filed under", async ({
  page,
}) => {
  // One identifier across the source filename, the generated code artifact and
  // the page anchor, so a Demo can be traced through the system without a
  // lookup table.
  await page.goto(`${button.href}#${targetAnchorId}`);

  await expect(demoCard(page, targetAnchorId)).toBeAttached();

  const artifact = await page.request.get(`/generated/${targetAnchorId}.json`);
  expect(artifact.ok()).toBe(true);
});

test("a fragment matching no Demo leaves the page at the top", async ({
  page,
}) => {
  const pageErrors: Error[] = [];
  page.on("pageerror", (error) => pageErrors.push(error));

  await page.goto(`${button.href}#md-button-99`);

  await expect(
    page.getByRole("heading", { level: 1, name: button.name }),
  ).toBeVisible();
  expect(await page.evaluate(() => window.scrollY)).toBe(0);
  expect(pageErrors).toEqual([]);
});

test("every Component page carries its own title and description", async ({
  page,
}) => {
  // Route metadata is the one thing the registry does not own, so it is the
  // one thing a mechanical rewrite of the route modules can drop unnoticed.
  for (const component of components) {
    await page.goto(component.href);

    await expect(page).toHaveTitle(new RegExp(`^${component.name} `));
    await expect(page.locator('head meta[name="description"]')).toHaveAttribute(
      "content",
      /\S/,
    );
  }
});

test("every Component page anchors every one of its Demos", async ({
  page,
}) => {
  // A spot check across the catalogue rather than all 38 pages: enough to
  // catch a page that stopped emitting anchors at all.
  for (const component of [components[0], components[5], components[20]]) {
    await page.goto(component.href);

    const anchorIds = await page
      .locator("article[aria-label]")
      .evaluateAll((nodes) => nodes.map((node) => node.id));

    expect(anchorIds).toEqual(
      component.demos.map((demo) => demoAnchorId(component, demo)),
    );
  }
});
