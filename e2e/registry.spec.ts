import AxeBuilder from "@axe-core/playwright";
import { expect, test, type FrameLocator, type Page } from "@playwright/test";

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

async function incrementPreviewWhenHydrated(preview: Page | FrameLocator) {
  // SSR makes the button visible before it hydrates. Retry only
  // while the initial count is visible, and require a real event-driven update.
  await expect
    .poll(async () => {
      const initialButton = preview.getByRole("button", { name: "Get started, 0" });
      if (await initialButton.isVisible()) await initialButton.click();
      return preview.getByRole("button", { name: "Get started, 1" }).isVisible();
    })
    .toBe(true);
}

async function setInitialTheme(page: Page, theme: "light" | "dark") {
  await page.addInitScript((initialTheme) => {
    if (window === window.top) localStorage.setItem("theme", initialTheme);
  }, theme);
}

async function expectNoAxeViolations(page: Page) {
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22a", "wcag22aa"])
    .analyze();
  expect(results.violations).toEqual([]);
}

test.describe("Preview Rendering", () => {
  test("hydrates a standalone Preview without errors", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });
    await page.goto("/preview/components/button/button-01");
    await incrementPreviewWhenHydrated(page);
    await expect(page).toHaveTitle("Button 01 Preview – VibeUI");
    expect(errors).toEqual([]);
  });

  test("keeps page Previews full-width without the component inset", async ({ page }) => {
    await page.goto("/preview/pages/landing-pages/landing-page-01");
    const preview = page.locator("body > div.min-h-svh");
    await expect(preview).toHaveCSS("padding", "0px");
    await expect(preview).toHaveCSS("width", `${page.viewportSize()!.width}px`);
    await expect(page.getByText("Northstar", { exact: true }).first()).toBeVisible();
  });

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
    test(`server-renders ${preview.path} without JavaScript`, async ({ page }) => {
      await abortScriptRequests(page);

      const response = await page.goto(preview.path);

      expect(response?.status()).toBe(200);
      await expect(page).toHaveTitle(preview.title);
      await expect(page.getByText(preview.previewText, { exact: true }).first()).toBeVisible();
    });
  }

  test("renders an interactive Preview and Code preview from real Registry item data", async ({
    page,
  }) => {
    await page.goto("/components/button");
    await waitForHydration(page);

    const item = page.locator("#button-01");
    const preview = page.frameLocator("#button-01 iframe");
    await expect(preview.getByRole("button", { name: "Get started, 0" })).toBeVisible();

    await item.getByRole("tab", { name: "Code" }).click();
    const source = item.getByRole("region", { name: "Source code for button-01.tsx" });
    await expect(source).toBeVisible();
    await expect(source).toContainText("Get started");
  });
});

test.describe("Responsive Previews", () => {
  test("applies Registry item breakpoints from the resized iframe viewport", async ({ page }) => {
    await page.goto("/blocks/hero-section");
    await waitForHydration(page);

    const item = page.locator("#hero-section-01");
    const preview = page.frameLocator("#hero-section-01 iframe");
    const heading = preview.getByRole("heading", {
      name: "A calmer way to build ambitious products",
    });

    await item.getByRole("radio", { name: "Phone preview" }).click();
    await expect.poll(() => heading.evaluate(() => innerWidth)).toBe(320);
    await expect(heading).toHaveCSS("font-size", "48px");

    await item.getByRole("radio", { name: "Tablet preview" }).click();
    await expect.poll(() => heading.evaluate(() => innerWidth)).toBe(640);
    await expect(heading).toHaveCSS("font-size", "60px");
  });
});

test.describe("Preview Theme", () => {
  test("shows the resolved dark app theme before hydration", async ({ page }) => {
    await setInitialTheme(page, "dark");
    await abortScriptRequests(page);
    await page.goto("/components/button");

    const switchButton = page
      .locator("#button-01")
      .getByRole("button", { name: "Preview theme: Dark. Switch to Light." });
    await expect(switchButton).toBeVisible();
    await expect(switchButton).toBeDisabled();
  });

  test("keeps a dark Preview visible after refreshing its Collection page", async ({ page }) => {
    await setInitialTheme(page, "dark");
    await page.goto("/components/button");
    await waitForHydration(page);

    const item = page.locator("#button-01");
    const frame = item.locator("iframe");
    const previewRoot = page.frameLocator("#button-01 iframe").locator("html");
    await expect(frame).toBeVisible();
    await expect(previewRoot).toHaveAttribute("data-theme", "dark");

    await page.reload();
    await waitForHydration(page);
    await expect(frame).toBeVisible();
    await expect(previewRoot).toHaveAttribute("data-theme", "dark");
  });

  test("clears local Preview themes after app changes without resetting Registry item state", async ({
    page,
  }) => {
    await setInitialTheme(page, "light");
    await page.emulateMedia({ colorScheme: "dark" });
    await page.goto("/components/button");
    await waitForHydration(page);

    const item = page.locator("#button-01");
    const preview = page.frameLocator("#button-01 iframe");
    const previewRoot = preview.locator("html");
    await incrementPreviewWhenHydrated(preview);

    await page.getByRole("button", { exact: true, name: "Theme: Light. Switch to Dark." }).click();
    await expect(previewRoot).toHaveAttribute("data-theme", "dark");

    await item.getByRole("button", { name: "Preview theme: Dark. Switch to Light." }).click();
    await expect(previewRoot).toHaveAttribute("data-theme", "light");

    await page.getByRole("button", { exact: true, name: "Theme: Dark. Switch to System." }).click();
    await expect(previewRoot).toHaveAttribute("data-theme", "dark");

    await item.getByRole("button", { name: "Preview theme: Dark. Switch to Light." }).click();
    await expect(previewRoot).toHaveAttribute("data-theme", "light");
    await page.emulateMedia({ colorScheme: "light" });
    await expect(page.locator("html")).not.toHaveClass(/dark/);
    await expect(previewRoot).toHaveAttribute("data-theme", "light");
    await page.emulateMedia({ colorScheme: "dark" });
    await expect(page.locator("html")).toHaveClass(/dark/);
    await expect(previewRoot).toHaveAttribute("data-theme", "dark");
    await expect(preview.getByRole("button", { name: "Get started, 1" })).toBeVisible();
  });

  test("opens a standalone Preview with the effective explicit theme", async ({ page }) => {
    await setInitialTheme(page, "light");
    await page.goto("/components/button");
    await waitForHydration(page);

    const item = page.locator("#button-01");
    await item.getByRole("button", { name: "Preview theme: Light. Switch to Dark." }).click();
    const previewPagePromise = page.waitForEvent("popup");
    await item.getByRole("link", { name: "Open in a new tab" }).click();
    const previewPage = await previewPagePromise;

    await expect(previewPage).toHaveURL("/preview/components/button/button-01?theme=dark");
    await expect(previewPage.getByText("Get started, 0", { exact: true })).toBeVisible();
    await expect(previewPage.locator("html")).toHaveAttribute("data-theme", "dark");

    await page.getByRole("button", { exact: true, name: "Theme: Light. Switch to Dark." }).click();
    await expect(previewPage.locator("html")).toHaveAttribute("data-theme", "dark");
  });

  test("uses the URL theme or light fallback when rendering a standalone Preview", async ({
    page,
  }) => {
    await setInitialTheme(page, "dark");
    await page.emulateMedia({ colorScheme: "light" });
    await abortScriptRequests(page);

    await page.goto("/preview/components/button/button-01?theme=dark");
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    await expect(page.locator("html")).toHaveClass(/dark/);

    await page.goto("/preview/components/button/button-01");
    await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
    await expect(page.locator("html")).not.toHaveClass(/dark/);

    await page.goto("/preview/components/button/button-01?theme=sepia");
    await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
    await expect(page.locator("html")).not.toHaveClass(/dark/);
  });
});

test.describe("Preview Reset", () => {
  test("resets Registry item state without replacing or retheming its Preview document", async ({
    page,
  }) => {
    await page.goto("/components/button");
    await waitForHydration(page);

    const item = page.locator("#button-01");
    const preview = page.frameLocator("#button-01 iframe");
    await preview.locator("html").evaluate(() => {
      Object.assign(window, { __previewDocumentIdentity: "original" });
    });

    await incrementPreviewWhenHydrated(preview);
    await item.getByRole("button", { name: "Preview theme: Light. Switch to Dark." }).click();
    await expect(preview.locator("html")).toHaveAttribute("data-theme", "dark");

    await item.getByRole("button", { name: "Reset preview" }).click();

    await expect(preview.getByRole("button", { name: "Get started, 0" })).toBeVisible();
    await expect(preview.locator("html")).toHaveAttribute("data-theme", "dark");
    await expect
      .poll(() =>
        preview.locator("html").evaluate(() => Reflect.get(window, "__previewDocumentIdentity")),
      )
      .toBe("original");
  });
});

test.describe("Error Handling", () => {
  test("returns not found for an unknown Collection page", async ({ page }) => {
    const response = await page.goto("/components/not-a-category");

    expect(response?.status()).toBe(404);
  });

  test("returns not found for an unknown Preview", async ({ page }) => {
    const response = await page.goto("/preview/components/button/not-an-item");

    expect(response?.status()).toBe(404);
  });

  for (const previewPath of [
    "/preview/charts/button/button-01",
    "/preview/components/table/button-01",
    "/preview/unknown/button/button-01",
  ]) {
    test(`returns not found for mismatched Preview metadata: ${previewPath}`, async ({ page }) => {
      const response = await page.goto(previewPath);
      expect(response?.status()).toBe(404);
      await expect(page.getByRole("button", { name: "Get started, 0" })).toHaveCount(0);
    });
  }
});

test.describe("A11y", () => {
  test("has no detectable accessibility violations in Preview and Code preview states", async ({
    page,
  }) => {
    await page.goto("/components/button");
    await waitForHydration(page);

    await expect(page.frameLocator("#button-01 iframe").getByText("Get started, 0")).toBeVisible();
    await expectNoAxeViolations(page);

    const item = page.locator("#button-01");
    await item.getByRole("tab", { name: "Code" }).click();
    await expect(item.getByRole("region", { name: "Source code for button-01.tsx" })).toBeVisible();
    await expectNoAxeViolations(page);
  });

  test("has no detectable accessibility violations in a standalone Preview", async ({ page }) => {
    await page.goto("/preview/components/button/button-01");
    await expect(page.getByRole("button", { name: "Get started, 0" })).toBeVisible();

    await expectNoAxeViolations(page);
  });
});
