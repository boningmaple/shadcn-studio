import { expect, test, type Page } from "@playwright/test";

import { components, demoAnchorId, getComponent } from "../src/registry";
import { searchEndpoint } from "../src/search/hits";
import {
  searchDialogTitle,
  searchTriggerLabel,
} from "../src/ui/app/search-palette";

const button = getComponent("button");
const elevatedDemo = button.demos[2];
const elevatedAnchorId = demoAnchorId(button, elevatedDemo);

const palette = (page: Page) =>
  page.getByRole("dialog", { name: searchDialogTitle });
const searchInput = (page: Page) => page.getByRole("searchbox");
const hits = (page: Page) => page.getByRole("menuitem");
const searchTrigger = (page: Page) =>
  page.getByRole("button", { name: searchTriggerLabel });

/**
 * Waits for the app to become interactive.
 *
 * Both ways into the palette need React: the trigger's press handler and the
 * shortcut's key listener are both attached on mount. A click or keystroke
 * before then is simply lost, so every test here starts from a hydrated page.
 * The theme switch is the app's existing hydration signal — it is
 * server-rendered disabled and only becomes enabled once React has hydrated.
 */
async function goto(page: Page, url: string) {
  await page.goto(url);
  await expect(page.getByRole("button", { name: /^Theme:/ })).toBeEnabled();
}

async function openPalette(page: Page) {
  await searchTrigger(page).click();
  await expect(palette(page)).toBeVisible();
}

/**
 * The palette reads the platform off the user agent, so overriding the user
 * agent is what lets one machine cover both platforms' shortcuts.
 */
const chrome =
  "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151 Safari/537.36";
const macUserAgent = `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) ${chrome}`;
const windowsUserAgent = `Mozilla/5.0 (Windows NT 10.0; Win64; x64) ${chrome}`;

test.describe("the keyboard shortcut", () => {
  test.describe("on a Mac", () => {
    test.use({ userAgent: macUserAgent });

    test("⌘K opens the palette from any page", async ({ page }) => {
      await goto(page, button.href);

      await page.keyboard.press("Meta+k");

      await expect(palette(page)).toBeVisible();
    });

    test("Ctrl+K is left to macOS, which binds it in text fields", async ({
      page,
    }) => {
      await goto(page, "/");

      await page.keyboard.press("Control+k");

      await expect(palette(page)).toBeHidden();
    });
  });

  test.describe("away from macOS", () => {
    test.use({ userAgent: windowsUserAgent });

    test("Ctrl+K opens the palette from any page", async ({ page }) => {
      await goto(page, button.href);

      await page.keyboard.press("Control+k");

      await expect(palette(page)).toBeVisible();
    });
  });
});

test.describe("opening the palette", () => {
  test("the header search trigger is a button, and opens it", async ({
    page,
  }) => {
    await goto(page, "/");

    // The control that used to be a text input silently discarding keystrokes.
    await expect(
      page.getByRole("textbox", { name: searchTriggerLabel }),
    ).toHaveCount(0);
    await openPalette(page);
  });

  test("the small-screen Search button opens the same palette", async ({
    page,
  }) => {
    await page.setViewportSize({ height: 800, width: 500 });
    await goto(page, "/");

    await openPalette(page);
  });

  test("Escape closes it and returns focus to the trigger", async ({
    page,
  }) => {
    await goto(page, "/");
    await openPalette(page);

    await page.keyboard.press("Escape");

    await expect(palette(page)).toBeHidden();
    await expect(searchTrigger(page)).toBeFocused();
  });
});

test.describe("the keyboard hint", () => {
  test.describe("on a Mac", () => {
    test.use({ userAgent: macUserAgent });

    test("shows ⌘", async ({ page }) => {
      await goto(page, "/");

      await expect(searchTrigger(page)).toContainText("⌘");
    });
  });

  test.describe("away from macOS", () => {
    test.use({ userAgent: windowsUserAgent });

    test("shows the key that keyboard actually has", async ({ page }) => {
      await goto(page, "/");

      await expect(searchTrigger(page)).toContainText("Ctrl");
      await expect(searchTrigger(page)).not.toContainText("⌘");
    });
  });
});

test.describe("searching", () => {
  test("lists every Component before anything is typed", async ({ page }) => {
    await goto(page, "/");
    await openPalette(page);

    await expect(hits(page)).toHaveCount(components.length);
    await expect(hits(page).first()).toHaveAccessibleName(components[0]!.name);
  });

  test("typing a Component's name ranks it first", async ({ page }) => {
    await goto(page, "/");
    await openPalette(page);

    await searchInput(page).fill("button");

    await expect(hits(page).first()).toHaveAccessibleName(button.name);
  });

  test("a single-character typo still finds what was meant", async ({
    page,
  }) => {
    await goto(page, "/");
    await openPalette(page);

    await searchInput(page).fill("buton");

    await expect(hits(page).first()).toHaveAccessibleName(button.name);
  });

  test("keyboard alone reaches a Component page", async ({ page }) => {
    await goto(page, "/");
    await openPalette(page);

    await page.keyboard.type("button");
    await expect(hits(page).first()).toHaveAccessibleName(button.name);
    await expect(hits(page).first()).toHaveAttribute("data-focused", "true");

    // Arrow keys move through the Hits, the way every other palette behaves.
    await page.keyboard.press("ArrowDown");
    await expect(hits(page).nth(1)).toHaveAttribute("data-focused", "true");
    await page.keyboard.press("ArrowUp");
    await expect(hits(page).first()).toHaveAttribute("data-focused", "true");

    await page.keyboard.press("Enter");

    await expect(page).toHaveURL(button.href);
    await expect(
      page.getByRole("heading", { level: 1, name: button.name }),
    ).toBeVisible();
  });

  test("a Demo Hit lands on the right card of its Component's page", async ({
    page,
  }) => {
    await goto(page, "/");
    await openPalette(page);

    await searchInput(page).fill(elevatedDemo.name);

    const demoHit = hits(page).first();
    await expect(demoHit).toHaveAccessibleName(
      `${elevatedDemo.name}, in ${button.name}`,
    );
    await demoHit.click();

    await expect(page).toHaveURL(`${button.href}#${elevatedAnchorId}`);
    await expect(palette(page)).toBeHidden();

    const card = page.locator(`#${elevatedAnchorId}`);
    await expect(card).toBeInViewport();
    await expect(card).toHaveAttribute("data-marked", "true");
  });
});

test.describe("reopening the palette", () => {
  test("shows the Hits it already has, without asking again", async ({
    page,
  }) => {
    await goto(page, "/");

    let requests = 0;
    await page.route(`${searchEndpoint}**`, async (route) => {
      requests += 1;
      await route.continue();
    });

    await openPalette(page);
    await expect(hits(page)).toHaveCount(components.length);

    // Counted rather than asserted outright: this suite runs against the dev
    // server, where StrictMode remounts every component once, so the first
    // open asks twice here and once in a production build.
    const askedOnFirstOpen = requests;

    await page.keyboard.press("Escape");
    await expect(palette(page)).toBeHidden();

    await openPalette(page);
    await expect(hits(page)).toHaveCount(components.length);

    // Long enough that a request the reopen had started would have been
    // counted by now — the only way to show one was never made.
    await page.waitForTimeout(500);
    expect(requests).toBe(askedOnFirstOpen);
  });
});

test.describe("when the search cannot be reached", () => {
  test("says so and offers a retry that works", async ({ page }) => {
    await goto(page, "/");

    let shouldFail = true;
    await page.route(`${searchEndpoint}**`, async (route) => {
      if (shouldFail) {
        await route.abort("failed");
        return;
      }

      await route.continue();
    });

    await openPalette(page);

    const failure = page.getByRole("alert");
    await expect(failure).toContainText(/could not be reached/i);

    shouldFail = false;
    await failure.getByRole("button", { name: "Try again" }).click();

    await expect(failure).toBeHidden();
    await expect(hits(page)).toHaveCount(components.length);
  });
});
