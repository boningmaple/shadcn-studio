import { afterEach, describe, expect, it, vi } from "vite-plus/test";
import { page, userEvent } from "vite-plus/test/browser/context";
import { render } from "vitest-browser-react";

import { useTheme } from "@/features/theme-switch/components/theme-context";
import { ThemeProvider } from "@/features/theme-switch/components/theme-provider";
import { ThemeSwitchButton } from "@/features/theme-switch/components/theme-switch-button";
import { themeHydrationScript } from "@/features/theme-switch/script/theme-hydration-script";
import {
  darkModeMediaQuery,
  defaultTheme,
  localStorageKey,
  themes,
  type Theme,
} from "@/features/theme-switch/types/theme";
import { capitalize } from "@/lib/utils";

const themeValues = Object.values(themes);
const nextTheme = {
  [themes.system]: themes.light,
  [themes.light]: themes.dark,
  [themes.dark]: themes.system,
} as const;

const labelFor = (theme: Theme) =>
  `Theme: ${capitalize(theme)}. Switch to ${capitalize(nextTheme[theme])}.`;

const themeButton = () => page.getByRole("button", { name: /^Theme:/ });

const renderThemeSwitch = () =>
  render(
    <ThemeProvider>
      <ThemeSwitchButton />
    </ThemeProvider>,
  );

function runThemeHydrationScript() {
  const script = document.createElement("script");
  script.textContent = themeHydrationScript;
  document.head.append(script);
  script.remove();
}

function colorSchemeFor(theme: Theme): "light" | "dark" {
  const isDark =
    theme === themes.dark || (theme === themes.system && matchMedia(darkModeMediaQuery).matches);
  return isDark ? "dark" : "light";
}

async function expectTheme(expectedTheme: Theme, expectedColorScheme: "light" | "dark") {
  const root = document.documentElement;
  await expect.poll(() => root).toHaveAttribute("data-theme", expectedTheme);
  expect(root).toHaveStyle({ colorScheme: expectedColorScheme });
  if (expectedColorScheme == "dark") {
    expect(root).toHaveClass("dark");
  }
  expect(localStorage.getItem(localStorageKey)).toBe(expectedTheme);
}

afterEach(() => {
  vi.restoreAllMocks();
  const root = document.documentElement;
  delete root.dataset.theme;
  root.classList.remove("dark");
  root.style.removeProperty("color-scheme");
  localStorage.clear();
});

describe("themeHydrationScript", () => {
  it.for(themeValues)("applies the stored %s theme", async (theme) => {
    localStorage.setItem(localStorageKey, theme);

    runThemeHydrationScript();

    await expectTheme(theme, colorSchemeFor(theme));
  });

  it.each([
    ["a missing", null],
    ["an invalid", "sepia"],
  ])("replaces %s stored theme with the default", async (_, storedTheme) => {
    if (storedTheme !== null) localStorage.setItem(localStorageKey, storedTheme);

    runThemeHydrationScript();

    await expectTheme(defaultTheme, colorSchemeFor(defaultTheme));
  });

  it.each([false, true])("resolves the system theme when dark mode is %s", async (isDark) => {
    vi.spyOn(window, "matchMedia").mockReturnValue({
      matches: isDark,
      media: darkModeMediaQuery,
    } as MediaQueryList);
    localStorage.setItem(localStorageKey, themes.system);

    runThemeHydrationScript();

    await expectTheme(themes.system, isDark ? "dark" : "light");
  });

  it("still applies the default when storage is inaccessible", async () => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new DOMException("Storage is inaccessible");
    });

    runThemeHydrationScript();

    const root = document.documentElement;
    await expect.poll(() => root).toHaveAttribute("data-theme", defaultTheme);
    expect(root).toHaveStyle({ colorScheme: colorSchemeFor(defaultTheme) });
  });
});

describe("ThemeProvider", () => {
  it("applies default theme (system) on mount when there is not stored theme", async () => {
    await renderThemeSwitch();
    await expectTheme("system", "light");
  });

  it.for(themeValues)("applies the stored %s theme on mount", async (theme) => {
    localStorage.setItem(localStorageKey, theme);
    await renderThemeSwitch();
    await expectTheme(theme, theme === themes.dark ? "dark" : "light");
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

    for (const theme of [themes.light, themes.dark, themes.system]) {
      await userEvent.click(themeButton());
      await expectTheme(theme, theme === themes.dark ? "dark" : "light");
      await expect.element(themeButton()).toHaveFocus();
    }
  });

  // The switch keeps one stable button so focus remains while its label updates.
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

    for (const theme of themeValues) {
      await expect.element(themeButton()).toHaveAccessibleName(labelFor(theme));
      await userEvent.click(themeButton());
    }
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
