import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

const previews = [
  { id: "table-01", title: "Customers", column: "Customer" },
  { id: "table-02", title: "Invoices", column: "Invoice" },
  { id: "table-03", title: "Projects", column: "Project" },
  { id: "table-04", title: "Products", column: "Product" },
];

async function expectAccessible(page: Page) {
  const result = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22a", "wcag22aa"])
    .analyze();
  expect(result.violations).toEqual([]);
}

test("discovers the Table Collection page and opens its Registry item source", async ({ page }) => {
  await page.goto("/components");
  await expect(page.getByRole("button", { name: /^Theme:/ })).toBeEnabled();
  await page.getByRole("link", { name: "Table 4 items", exact: true }).first().click();
  await expect(page).toHaveURL("/components/table");
  for (const preview of previews) {
    const item = page.locator(`#${preview.id}`);
    await item.scrollIntoViewIfNeeded();
    await expect(page.frameLocator(`#${preview.id} iframe`).getByRole("grid")).toBeVisible();
    await item.getByRole("tab", { name: "Code", exact: true }).click();
    await expect(
      item.getByRole("region", { name: `Source code for ${preview.id}.tsx` }),
    ).toContainText("@tanstack/react-table");
  }
});

for (const preview of previews) {
  for (const theme of ["light", "dark"] as const) {
    test(`${preview.id} renders an accessible ${theme} Preview at desktop and phone widths`, async ({
      page,
    }) => {
      const errors: string[] = [];
      page.on("pageerror", (error) => errors.push(error.message));
      await page.setViewportSize({ width: 1280, height: 960 });
      await page.goto(`/preview/components/table/${preview.id}?theme=${theme}`);
      await expect(page).toHaveTitle(`Table ${preview.id.slice(-2)} Preview – VibeUI`);
      await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
      const header = page.getByRole("columnheader", { name: preview.column, exact: true });
      // An acknowledged event confirms this standalone Preview has hydrated.
      await expect
        .poll(async () => {
          if ((await header.getAttribute("aria-sort")) !== "ascending") await header.click();
          return header.getAttribute("aria-sort");
        })
        .toBe("ascending");
      await expectAccessible(page);
      await page.screenshot({ path: `/tmp/${preview.id}-${theme}-desktop.png`, fullPage: true });
      if (preview.id === "table-04") {
        await page.getByRole("button", { name: "Columns", exact: true }).click();
        await expect(page.getByRole("dialog", { name: "Visible columns" })).toBeVisible();
        await expect(page.locator('[data-slot="popover-content"]')).not.toHaveAttribute(
          "data-entering",
        );
        await expectAccessible(page);
        await page.keyboard.press("Escape");
        await expect(page.getByRole("dialog", { name: "Visible columns" })).not.toBeVisible();
      }
      await page.setViewportSize({ width: 375, height: 900 });
      await expect(
        page.getByRole("textbox", { name: `Search ${preview.title.toLowerCase()}` }),
      ).toBeVisible();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
        true,
      );
      const scrollArea = page.locator('[data-slot="table-container"]');
      expect(
        await scrollArea.evaluate((element) => element.scrollWidth > element.clientWidth),
      ).toBe(true);
      await expectAccessible(page);
      await page.screenshot({ path: `/tmp/${preview.id}-${theme}-phone.png`, fullPage: true });
      expect(errors).toEqual([]);
    });
  }
}

test("resets table filters and selection through the catalog Preview controls", async ({
  page,
}) => {
  await page.goto("/components/table");
  await expect(page.getByRole("button", { name: /^Theme:/ })).toBeEnabled();
  const item = page.locator("#table-01");
  const preview = page.frameLocator("#table-01 iframe");
  const search = preview.getByRole("textbox", { name: "Search customers" });
  await expect
    .poll(async () => {
      await search.fill("");
      await search.fill("olivia");
      return preview.getByRole("status").filter({ hasText: "of 1 customers" }).count();
    })
    .toBe(1);
  await preview
    .locator("label")
    .filter({ has: preview.getByRole("checkbox", { name: "Select Olivia Rhye", exact: true }) })
    .click();
  await expect(preview.getByRole("status").filter({ hasText: "1 selected" })).toBeVisible();
  await item.getByRole("button", { name: "Reset preview" }).click();
  await expect(search).toHaveValue("");
  await expect(
    preview.getByRole("status").filter({ hasText: "1–5 of 12 customers" }),
  ).not.toContainText("selected");
});
