import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { afterEach, describe, expect, it, vi } from "vite-plus/test";
import { page, userEvent } from "vite-plus/test/browser/context";
import { render } from "vitest-browser-react";

import { PreviewThemeProvider } from "@/features/registry/components/preview-theme-provider";
import { CodeExplorer } from "@/features/registry/components/registry-code-panel";
import { RegistryCollectionPage } from "@/features/registry/components/registry-collection-page";
import * as highlightCode from "@/features/registry/lib/highlight-code";
import type {
  VibeBuiltRegistryItem,
  VibeHighlightedRegistryFile,
} from "@/features/registry/types/registry";
import { ThemeProvider } from "@/features/theme-switch/components/theme-provider";
import { ThemeSwitchButton } from "@/features/theme-switch/components/theme-switch-button";
import { localStorageKey } from "@/features/theme-switch/types/theme";

vi.mock("@/features/registry/lib/highlight-code", { spy: true });

const collectionItems: VibeBuiltRegistryItem[] = [
  {
    categories: ["button"],
    description: "The first Preview.",
    files: [
      {
        content: "First item source",
        path: "registry/first-item.txt",
        type: "registry:component",
      },
    ],
    name: "first-item",
    title: "First item",
    type: "registry:component",
  },
  {
    categories: ["button"],
    description: "The second Preview.",
    files: [
      {
        content: "Second item source",
        path: "registry/second-item.txt",
        type: "registry:component",
      },
    ],
    name: "second-item",
    title: "Second item",
    type: "registry:component",
  },
];

const renderCollection = () => {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <ThemeSwitchButton />
        <RegistryCollectionPage
          description="A test Collection page."
          items={collectionItems}
          title="Test collection"
        />
      </ThemeProvider>
    </QueryClientProvider>,
  );
};

const item = (name: string) => document.getElementById(name)!;
const itemElement = <ElementType extends Element>(name: string, selector: string) =>
  page.elementLocator(item(name).querySelector<ElementType>(selector)!);
const themeSwitch = (name: string) =>
  itemElement<HTMLButtonElement>(name, '[data-slot="collection-preview-theme"]');
const previewFrame = (name: string) => item(name).querySelector<HTMLIFrameElement>("iframe")!;
const fetchInputUrl = (input: RequestInfo | URL) => {
  if (typeof input === "string") return input;
  if (input instanceof URL) return input.href;
  return input.url;
};

afterEach(() => {
  const root = document.documentElement;
  delete root.dataset.theme;
  root.classList.remove("dark");
  root.style.removeProperty("color-scheme");
  localStorage.clear();
  vi.clearAllMocks();
  vi.restoreAllMocks();
});

it("navigates textual files and keeps plain source usable when highlighting fails", async () => {
  await page.viewport(1024, 800);
  const files: VibeHighlightedRegistryFile[] = [
    {
      content: "export function LoginPage() {}",
      path: "registry/login-page.tsx",
      target: "@components/vibe-ui/login-page-01/login-page-01.tsx",
      type: "registry:page",
    },
    {
      content: ".login-page { display: grid; }",
      path: "registry/login-page.css",
      target: "@components/vibe-ui/login-page-01/login-page-01.css",
      type: "registry:file",
    },
  ];

  await render(<CodeExplorer files={files} highlightingFailed />);

  await expect.element(page.getByText(/Syntax highlighting is unavailable/)).toBeInTheDocument();
  const cssLabel = [...document.querySelectorAll("span")].find(
    (element) => element.textContent === "login-page-01.css",
  )!;
  await userEvent.click(page.elementLocator(cssLabel.closest<HTMLElement>('[role="row"]')!));
  await userEvent.keyboard("{Enter}");
  await expect.element(page.getByText(".login-page { display: grid; }")).toBeInTheDocument();
});

describe("Collection Code previews", () => {
  it("starts highlighting on mount and shows the completed result without a Registry request", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch");
    const highlightSpy = vi
      .mocked(highlightCode.highlightRegistryFiles)
      .mockImplementation(async (files) => [...files]);

    await renderCollection();

    await expect.poll(() => highlightSpy.mock.calls.length).toBe(2);
    expect(fetchSpy.mock.calls.some(([input]) => fetchInputUrl(input).includes("/r/"))).toBe(false);

    await userEvent.click(
      itemElement<HTMLButtonElement>("first-item", '[role="tab"]:nth-of-type(2)'),
    );
    await expect.element(page.getByText("First item source")).toBeInTheDocument();
  });

  it("shows loading while background highlighting remains pending", async () => {
    vi.mocked(highlightCode.highlightRegistryFiles).mockImplementation(
      () => new Promise(() => undefined),
    );

    await renderCollection();
    await userEvent.click(
      itemElement<HTMLButtonElement>("first-item", '[role="tab"]:nth-of-type(2)'),
    );

    await expect
      .element(itemElement<HTMLOutputElement>("first-item", "output"))
      .toHaveTextContent("Loading code");
  });

  it("falls back to raw source after one failed highlighting attempt per item", async () => {
    const highlightSpy = vi
      .mocked(highlightCode.highlightRegistryFiles)
      .mockRejectedValue(new Error("Highlighting failed"));

    await renderCollection();
    await expect.poll(() => highlightSpy.mock.calls.length).toBe(2);
    await userEvent.click(
      itemElement<HTMLButtonElement>("first-item", '[role="tab"]:nth-of-type(2)'),
    );

    await expect
      .element(itemElement<HTMLOutputElement>("first-item", "output"))
      .toHaveTextContent("Syntax highlighting is unavailable");
    await expect.element(page.getByText("First item source")).toBeInTheDocument();
    expect(highlightSpy).toHaveBeenCalledTimes(2);
    expect(document.body.textContent).not.toContain("Try again");
  });
});

describe("Registry item Preview themes", () => {
  it("renders canonical, lazy, accessibly named Preview frames", async () => {
    await renderCollection();

    await expect
      .element(itemElement<HTMLIFrameElement>("first-item", "iframe"))
      .toHaveAttribute("src", "/preview/components/button/first-item");
    await expect
      .element(itemElement<HTMLIFrameElement>("first-item", "iframe"))
      .toHaveAttribute("loading", "lazy");
    await expect
      .element(itemElement<HTMLIFrameElement>("first-item", "iframe"))
      .toHaveAttribute("title", "First item Preview");
  });

  it("follows the app theme until each Preview switches independently", async () => {
    await renderCollection();

    const firstSwitch = themeSwitch("first-item");
    const secondSwitch = themeSwitch("second-item");
    await expect.element(firstSwitch).toBeEnabled();
    await expect.element(firstSwitch).toHaveAccessibleName("Preview theme: Light. Switch to Dark.");
    await expect
      .element(secondSwitch)
      .toHaveAccessibleName("Preview theme: Light. Switch to Dark.");

    document.documentElement.classList.add("dark");
    await expect.element(firstSwitch).toHaveAccessibleName("Preview theme: Dark. Switch to Light.");
    await expect
      .element(secondSwitch)
      .toHaveAccessibleName("Preview theme: Dark. Switch to Light.");

    await userEvent.click(firstSwitch);
    await expect.element(firstSwitch).toHaveAccessibleName("Preview theme: Light. Switch to Dark.");
    await expect
      .element(secondSwitch)
      .toHaveAccessibleName("Preview theme: Dark. Switch to Light.");

    document.documentElement.classList.remove("dark");
    await expect.element(firstSwitch).toHaveAccessibleName("Preview theme: Light. Switch to Dark.");
    await expect
      .element(secondSwitch)
      .toHaveAccessibleName("Preview theme: Light. Switch to Dark.");

    document.documentElement.classList.add("dark");
    await expect.element(firstSwitch).toHaveAccessibleName("Preview theme: Light. Switch to Dark.");
    await expect
      .element(secondSwitch)
      .toHaveAccessibleName("Preview theme: Dark. Switch to Light.");
  });

  it("exposes the current theme and supports keyboard switching", async () => {
    await renderCollection();

    const switchButton = themeSwitch("first-item");
    await expect.element(switchButton).toBeEnabled();
    await expect
      .element(switchButton)
      .toHaveAccessibleName("Preview theme: Light. Switch to Dark.");
    await userEvent.click(switchButton);

    const darkSwitch = themeSwitch("first-item");
    await expect.element(darkSwitch).toHaveAccessibleName("Preview theme: Dark. Switch to Light.");
    await expect.element(darkSwitch).toHaveFocus();
    await userEvent.keyboard(" ");

    await expect
      .element(themeSwitch("first-item"))
      .toHaveAccessibleName("Preview theme: Light. Switch to Dark.");
    await expect.element(themeSwitch("first-item")).toHaveFocus();
  });

  it("returns every Preview to the app theme when the app theme changes", async () => {
    localStorage.setItem(localStorageKey, "light");
    await renderCollection();

    await userEvent.click(themeSwitch("first-item"));
    expect(previewFrame("first-item").getAttribute("src")).toBe(
      "/preview/components/button/first-item?theme=dark",
    );

    await userEvent.click(
      page.getByRole("button", { exact: true, name: "Theme: Light. Switch to Dark." }),
    );

    await expect
      .element(itemElement<HTMLIFrameElement>("first-item", "iframe"))
      .toHaveAttribute("src", "/preview/components/button/first-item");
    await expect
      .element(themeSwitch("first-item"))
      .toHaveAccessibleName("Preview theme: Dark. Switch to Light.");
  });

  it("preserves the Preview theme when resetting item state", async () => {
    await page.viewport(1024, 800);
    await renderCollection();

    const originalFrame = previewFrame("first-item");
    await userEvent.click(
      itemElement<HTMLButtonElement>("first-item", 'button[aria-label="Phone preview"]'),
    );
    await userEvent.click(themeSwitch("first-item"));
    await userEvent.click(
      itemElement<HTMLButtonElement>("first-item", 'button[aria-label="Reset preview"]'),
    );

    expect(previewFrame("first-item")).not.toBe(originalFrame);
    expect(previewFrame("first-item").getAttribute("src")).toBe(
      "/preview/components/button/first-item?theme=dark",
    );
    await expect
      .element(itemElement<HTMLButtonElement>("first-item", 'button[aria-label="Phone preview"]'))
      .toHaveAttribute("aria-checked", "true");
    await expect
      .element(themeSwitch("first-item"))
      .toHaveAccessibleName("Preview theme: Dark. Switch to Light.");
    await expect
      .element(itemElement<HTMLAnchorElement>("first-item", 'a[aria-label="Open preview in tab"]'))
      .toHaveAttribute("href", "/preview/components/button/first-item?theme=dark");
  });
});

describe("PreviewThemeProvider", () => {
  it("follows stored app theme changes when the URL has no override", async () => {
    localStorage.setItem(localStorageKey, "light");
    await render(<PreviewThemeProvider>Preview</PreviewThemeProvider>);

    await expect.poll(() => document.documentElement).toHaveAttribute("data-theme", "light");

    localStorage.setItem(localStorageKey, "dark");
    dispatchEvent(
      new StorageEvent("storage", {
        key: localStorageKey,
        newValue: "dark",
        storageArea: localStorage,
      }),
    );

    await expect.poll(() => document.documentElement).toHaveAttribute("data-theme", "dark");
  });

  it("leaves the hydrated URL theme pinned and reads storage after the override is removed", async () => {
    const root = document.documentElement;
    root.dataset.theme = "dark";
    root.classList.add("dark");
    root.style.colorScheme = "dark";
    localStorage.setItem(localStorageKey, "light");
    const preview = await render(<PreviewThemeProvider theme="dark">Preview</PreviewThemeProvider>);

    await expect.poll(() => document.documentElement).toHaveAttribute("data-theme", "dark");

    localStorage.setItem(localStorageKey, "light");
    dispatchEvent(
      new StorageEvent("storage", {
        key: localStorageKey,
        newValue: "light",
        storageArea: localStorage,
      }),
    );
    await expect.poll(() => document.documentElement).toHaveAttribute("data-theme", "dark");

    await preview.rerender(<PreviewThemeProvider>Preview</PreviewThemeProvider>);
    await expect.poll(() => document.documentElement).toHaveAttribute("data-theme", "light");
  });
});
