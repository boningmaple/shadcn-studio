import { expect, test, type Page } from "@playwright/test";

const largeDemo = (page: Page) => page.locator("#md-button-01");

test("large demos can switch between preview, code, sizes, and local theme", async ({
  page,
}) => {
  await page.goto("/material-design/components/button");
  await expect(page.getByRole("button", { name: /^Theme:/ })).toBeEnabled();

  const demo = largeDemo(page);
  await expect(demo).toHaveAttribute("aria-label", "Material 3 variants");
  await expect(demo).toHaveAttribute("data-view", "preview");

  await demo.getByRole("radio", { name: "Show code" }).click();
  await expect(demo).toHaveAttribute("data-view", "code");
  await expect(demo.locator("pre")).toContainText(
    "export default function MDButtonDemo",
  );

  await demo.getByRole("radio", { name: "Mobile preview" }).click();
  await expect(demo).toHaveAttribute("data-view", "preview");
  await expect(demo).toHaveAttribute("data-preview-size", "mobile");

  await demo.getByRole("button", { name: "Switch demo to dark theme" }).click();
  await expect(demo).toHaveAttribute("data-demo-theme", "dark");
  await expect(page.locator("html")).not.toContainClass("dark");

  const standaloneLink = demo.getByRole("link", {
    name: "Open Material 3 variants in a new tab",
  });
  await expect(standaloneLink).toHaveAttribute("target", "_blank");
  await expect(standaloneLink).toHaveAttribute(
    "href",
    /\/material-design\/components\/button\/01\?theme=dark$/,
  );
});

test("large demo toolbar hides size controls below desktop", async ({
  page,
}) => {
  await page.setViewportSize({ width: 800, height: 900 });
  await page.goto("/material-design/components/button");
  await expect(page.getByRole("button", { name: /^Theme:/ })).toBeEnabled();

  const demo = largeDemo(page);
  await expect(demo.getByRole("radio", { name: "Show preview" })).toBeVisible();
  await expect(demo.getByRole("radio", { name: "Show code" })).toBeVisible();
  await expect(
    demo.getByRole("radio", { name: "Mobile preview" }),
  ).toBeHidden();
  await expect(
    demo.getByRole("button", { name: "Switch demo to dark theme" }),
  ).toBeVisible();
  await expect(
    demo.getByRole("button", { name: "Refresh preview" }),
  ).toBeVisible();
  await expect(
    demo.getByRole("link", { name: "Open Material 3 variants in a new tab" }),
  ).toBeVisible();
});

test("standalone demo previews render fullscreen", async ({ page }) => {
  await page.goto("/material-design/components/button/01?theme=dark");

  await expect(
    page.getByLabel("Material 3 variants fullscreen preview"),
  ).toBeVisible();
  await expect(page.locator("body")).toContainText("Elevated");
});
