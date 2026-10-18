import { expect, test } from "@playwright/test";

const previews = [
  ["area", "01", "Revenue momentum", "Revenue ($k)"],
  ["area", "02", "Where growth comes from", "Services ($k)"],
  ["bar", "01", "Orders on the rise", "Orders"],
  ["bar", "02", "Sales by channel", "Channel"],
  ["composed", "01", "Revenue against target", "Target ($k)"],
  ["composed", "02", "Demand and capacity", "Capacity"],
  ["pie", "01", "Traffic by channel", "Visits"],
  ["pie", "02", "How visitors find you", "Visits"],
  ["radar", "01", "Product health", "June"],
  ["radar", "02", "Closing the experience gap", "March"],
  ["radial", "01", "Quarterly goal", "Progress (%)"],
  ["radial", "02", "Team goal progress", "Progress (%)"],
] as const;

for (const [kind, number, title, tooltipLabel] of previews) {
  test(`renders the ${kind} ${number} Preview with keyboard values on a narrow screen`, async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(`/preview/charts/${kind}/chart-${kind}-${number}`);
    const chart = page.getByRole("img", { name: title, exact: true });
    await expect(chart).toBeVisible();
    await expect(chart.locator("path, rect").first()).toBeVisible();
    // Retry until the real Preview has hydrated and attached keyboard handlers.
    await expect(async () => {
      await chart.focus();
      await chart.press("Home");
      await expect(page.getByRole("status")).toBeVisible();
    }).toPass();
    await expect(page.getByRole("status")).toContainText(tooltipLabel);
    await expect(page.locator("body")).toHaveJSProperty("scrollWidth", 375);
    expect(errors).toEqual([]);
  });
}

test("explores the population map Preview through country selection and keyboard focus", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/preview/charts/map/chart-map-01");
  const selector = page.getByLabel("Country or territory");
  const australia = page.getByRole("button", { name: /^Australia:/ }).last();
  await expect(australia).toBeVisible();
  await expect(async () => {
    await selector.selectOption({ label: "Australia" });
    await expect(australia).toHaveAttribute("aria-pressed", "true");
  }).toPass();
  const brazil = page.getByRole("button", { name: /^Brazil:/ }).last();
  await brazil.focus();
  await brazil.press("Enter");
  await expect(brazil).toHaveAttribute("aria-pressed", "true");
  await expect(selector).toHaveValue("076");
  await expect(
    page.getByRole("region", { name: "A world of people" }).locator('[aria-live="polite"]'),
  ).toContainText("Brazil");
  await expect(page.locator("body")).toHaveJSProperty("scrollWidth", 375);
  expect(errors).toEqual([]);
});
