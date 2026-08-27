import { expect, test, type Page } from "@playwright/test";

const largeDemo = (page: Page) => page.locator("#md-button-01");

/**
 * Material's own surface colors, which the Demos reach through `dark:`
 * utilities rather than through the theme's custom properties.
 *
 * `data-demo-theme` flips whether or not those utilities follow it, so a test
 * that only reads the attribute passes against a preview that never repainted.
 * These are the values that separate the two.
 */
const elevatedSurface = {
  dark: "rgb(29, 27, 32)",
  light: "rgb(247, 242, 250)",
};

test("large demos can switch between preview, code, sizes, and local theme", async ({ page }) => {
  await page.goto("/material-design/components/button");
  await expect(page.getByRole("button", { name: /^Theme:/ })).toBeEnabled();

  const demo = largeDemo(page);
  await expect(demo).toHaveAttribute("aria-label", "Material 3 variants");
  await expect(demo).toHaveAttribute("data-view", "preview");

  await demo.getByRole("radio", { name: "Show code" }).click();
  await expect(demo).toHaveAttribute("data-view", "code");
  await expect(demo.locator("pre")).toContainText("export default function MDButtonDemo");

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

test("large demo toolbar hides size controls below desktop", async ({ page }) => {
  await page.setViewportSize({ width: 800, height: 900 });
  await page.goto("/material-design/components/button");
  await expect(page.getByRole("button", { name: /^Theme:/ })).toBeEnabled();

  const demo = largeDemo(page);
  await expect(demo.getByRole("radio", { name: "Show preview" })).toBeVisible();
  await expect(demo.getByRole("radio", { name: "Show code" })).toBeVisible();
  await expect(demo.getByRole("radio", { name: "Mobile preview" })).toBeHidden();
  await expect(demo.getByRole("button", { name: "Switch demo to dark theme" })).toBeVisible();
  await expect(demo.getByRole("button", { name: "Refresh preview" })).toBeVisible();
  await expect(
    demo.getByRole("link", { name: "Open Material 3 variants in a new tab" }),
  ).toBeVisible();
});

test("a demo previewed against the page's own scheme repaints", async ({ page }) => {
  // The document is dark by way of the OS, which is the case that stayed
  // broken longest: the page's `.dark` is an ancestor of the preview, so a
  // `dark:` utility inside a light preview keeps matching unless the stage's
  // `.light` is allowed to end the match.
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("/material-design/components/button");
  await expect(page.getByRole("button", { name: /^Theme:/ })).toBeEnabled();
  await expect(page.locator("html")).toContainClass("dark");

  const demo = largeDemo(page);
  const elevated = demo.getByRole("button", { name: "Elevated" });
  await expect(demo).toHaveAttribute("data-demo-theme", "dark");
  await expect(elevated).toHaveCSS("background-color", elevatedSurface.dark);

  await demo.getByRole("button", { name: "Switch demo to light theme" }).click();
  await expect(demo).toHaveAttribute("data-demo-theme", "light");
  await expect(elevated).toHaveCSS("background-color", elevatedSurface.light);
  // The page around the preview is untouched by the preview's own theme.
  await expect(page.locator("html")).toContainClass("dark");

  await demo.getByRole("button", { name: "Switch demo to dark theme" }).click();
  await expect(demo).toHaveAttribute("data-demo-theme", "dark");
  await expect(elevated).toHaveCSS("background-color", elevatedSurface.dark);
});

test("a standalone preview holds its own scheme against the document's", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("/material-design/components/button/01?theme=light");

  await expect(page.locator("html")).toContainClass("dark");
  await expect(page.getByRole("button", { name: "Elevated" })).toHaveCSS(
    "background-color",
    elevatedSurface.light,
  );
});

test("standalone demo previews render fullscreen", async ({ page }) => {
  await page.goto("/material-design/components/button/01?theme=dark");

  await expect(page.getByLabel("Material 3 variants fullscreen preview")).toBeVisible();
  await expect(page.locator("body")).toContainText("Elevated");
});
