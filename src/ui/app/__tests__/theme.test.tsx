import { afterEach, describe, expect, it, vi } from "vite-plus/test";
import { page, userEvent } from "vite-plus/test/browser/context";
import { render } from "vitest-browser-react";

import { capitalize } from "@/lib/utils";
import {
  ThemeProvider,
  ThemeSwitchButton,
  localStorageKey,
  themes,
  useTheme,
  type Theme,
} from "@/ui/app/theme";

afterEach(() => {
  const root = document.documentElement;
  delete root.dataset.theme;
  root.classList.remove("dark");
  root.style.removeProperty("color-scheme");
  localStorage.clear();
});

const nextTheme = { system: "light", light: "dark", dark: "system" } as const;

const labelFor = (theme: Theme) =>
  `Theme: ${capitalize(theme)}. Switch to ${capitalize(nextTheme[theme])}.`;

const renderThemeSwitch = () =>
  render(
    <ThemeProvider>
      <ThemeSwitchButton />
    </ThemeProvider>,
  );

// The switch renders one stable button whose accessible name changes by theme.
const themeButton = () => page.getByRole("button", { name: /^Theme:/ });

// <html> sits outside the locator engine's reach, so this polls the element
// directly. All three properties are written in one synchronous pass, so
// waiting on `data-theme` is enough to settle the other two.
async function expectTheme(
  expectedTheme: Theme,
  expectedColorScheme: "light" | "dark",
) {
  const root = document.documentElement;
  await expect.poll(() => root).toHaveAttribute("data-theme", expectedTheme);
  expect(root).toHaveStyle({ colorScheme: expectedColorScheme });
  if (expectedColorScheme == "dark") {
    expect(root).toHaveClass("dark");
  }
  expect(localStorage.getItem(localStorageKey)).toBe(expectedTheme);
}

describe("ThemeProvider", () => {
  it("applies default theme (system) on mount when there is not stored theme", async () => {
    await renderThemeSwitch();
    await expectTheme("system", "light");
  });

  it.for(themes)("applies the stored %s theme on mount", async (theme) => {
    localStorage.setItem(localStorageKey, theme);
    await renderThemeSwitch();
    await expectTheme(theme, theme === "dark" ? "dark" : "light");
  });

  it("recovers from a corrupted stored value", async () => {
    localStorage.setItem(localStorageKey, "sepia");
    await renderThemeSwitch();
    await expectTheme("system", "light");
  });
});

describe("ThemeSwitchButton", () => {
  it("cycles the HTML and storage through every theme and refocuses after click", async () => {
    await renderThemeSwitch();

    for (const theme of ["light", "dark", "system"] as const) {
      await userEvent.click(themeButton());
      await expectTheme(theme, theme === "dark" ? "dark" : "light");
      await expect.element(themeButton()).toHaveFocus();
    }
  });

  // The switch keeps one stable button, and explicitly restores focus after
  // activation so the updated label and tooltip stay attached to focus.
  it("works with keyboard", async () => {
    await renderThemeSwitch();

    await userEvent.tab();
    await expect.element(themeButton()).toHaveFocus();

    await userEvent.keyboard("{Enter}");
    await expectTheme("light", "light");
    await expect.element(themeButton()).toHaveFocus();

    await userEvent.keyboard(" ");
    await expectTheme("dark", "dark");
    await expect.element(themeButton()).toHaveFocus();

    await userEvent.keyboard(" ");
    await expectTheme("system", "light");
    await expect.element(themeButton()).toHaveFocus();
  });
});

describe("ThemeSwitchButton - a11y", () => {
  it("renders one button with the current theme label", async () => {
    await renderThemeSwitch();

    for (const theme of themes) {
      await expect.element(themeButton()).toHaveAccessibleName(labelFor(theme));
      await userEvent.click(themeButton());
    }
  });

  it("updates the tooltip text after the switch is focused again", async () => {
    localStorage.setItem(localStorageKey, "dark");
    await renderThemeSwitch();

    await userEvent.hover(themeButton());
    await expect.element(page.getByRole("tooltip")).toBeVisible();
    await expect
      .element(page.getByRole("tooltip"))
      .toHaveTextContent(labelFor("dark"));

    await userEvent.click(themeButton());
    await expectTheme("system", "light");
    await expect.element(themeButton()).toHaveFocus();
    await expect.element(page.getByRole("tooltip")).toBeVisible();
    await expect
      .element(page.getByRole("tooltip"))
      .toHaveTextContent(labelFor("system"));
  });
});

describe("useTheme", () => {
  it("refuses to be used outside a ThemeProvider", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});

    function Orphan() {
      useTheme();
      return null;
    }

    await expect(render(<Orphan />)).rejects.toThrow(
      "useTheme must be used within a ThemeProvider",
    );
  });
});
