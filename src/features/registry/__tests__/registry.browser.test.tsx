import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { afterEach, beforeEach, describe, expect, it, vi } from "vite-plus/test";
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
        path: "registry/first-item.tsx",
        target: "@components/first-item.tsx",
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
        path: "registry/second-item.tsx",
        target: "@components/second-item.tsx",
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

beforeEach(() => {
  vi.mocked(highlightCode.highlightRegistryFiles).mockImplementation(async (files) =>
    files.map((file) => ({
      ...file,
      html: `<pre class="shiki"><code>${file.content}</code></pre>`,
    })),
  );
});

afterEach(() => {
  const root = document.documentElement;
  delete root.dataset.theme;
  root.classList.remove("dark");
  root.style.removeProperty("color-scheme");
  localStorage.clear();
  vi.clearAllMocks();
  vi.restoreAllMocks();
});

const explorerFiles: VibeHighlightedRegistryFile[] = [
  {
    content: "export function LoginPage() {}",
    html: '<pre class="shiki"><code>export function LoginPage() {}</code></pre>',
    path: "registry/login-page.tsx",
    target: "@components/vibe-ui/login-page-01/login-page-01.tsx",
    type: "registry:page",
  },
  {
    content: ".login-page { display: grid; }",
    html: '<pre class="shiki"><code>.login-page { display: grid; }</code></pre>',
    path: "registry/login-page.css",
    target: "@components/vibe-ui/login-page-01/login-page-01.css",
    type: "registry:file",
  },
];

it("navigates the Sidebar file tree built from highlighted Registry item files", async () => {
  await page.viewport(1024, 800);
  await render(<CodeExplorer files={explorerFiles} />);

  for (const directory of ["@components", "vibe-ui", "login-page-01"]) {
    await expect
      .element(page.getByRole("button", { exact: true, name: directory }))
      .toHaveAttribute("aria-expanded", "true");
  }

  const source = document.querySelector<HTMLElement>('[aria-label^="Source code for"]')!;
  const scrollToSpy = vi.spyOn(source, "scrollTo");
  await userEvent.click(page.getByRole("button", { name: "login-page-01.css" }));

  await expect.element(page.getByText(".login-page { display: grid; }")).toBeInTheDocument();
  await expect
    .element(page.getByRole("button", { name: "login-page-01.css" }))
    .toHaveAttribute("data-active", "true");
  expect(scrollToSpy).toHaveBeenCalledWith({ left: 0, top: 0 });
});

it("collapses and expands every directory in the Sidebar file tree", async () => {
  await page.viewport(1024, 800);
  await render(<CodeExplorer files={explorerFiles} />);
  const directory = page.getByRole("button", { exact: true, name: "login-page-01" });

  await userEvent.click(directory);
  await expect.element(directory).toHaveAttribute("aria-expanded", "false");

  await userEvent.click(directory);
  await expect.element(directory).toHaveAttribute("aria-expanded", "true");
});

it("keeps deeply nested file rows wide and visibly marks the selected file", async () => {
  await page.viewport(1024, 800);
  await render(<CodeExplorer files={explorerFiles} />);
  const submenus = [...document.querySelectorAll<HTMLElement>('[data-slot="sidebar-menu-sub"]')];
  const rightEdges = submenus.map((submenu) => submenu.getBoundingClientRect().right);

  expect.soft(Math.max(...rightEdges) - Math.min(...rightEdges)).toBeLessThan(1);

  const cssFile = page.getByRole("button", { name: "login-page-01.css" });
  await userEvent.click(cssFile);
  const backgroundColor = getComputedStyle(
    document.querySelector<HTMLElement>('[data-slot="sidebar-menu-button"][data-active="true"]')!,
  ).backgroundColor;

  expect(backgroundColor).not.toBe("rgba(0, 0, 0, 0)");
});

it("uses an independent contained Sidebar instead of a Sheet on mobile", async () => {
  await page.viewport(390, 844);
  await render(<CodeExplorer files={explorerFiles} />);
  const sidebar = page.elementLocator(
    document.querySelector<HTMLElement>('[data-slot="sidebar"][data-layout="contained"]')!,
  );

  await expect.element(sidebar).toHaveAttribute("data-state", "collapsed");
  expect(document.querySelector('[data-slot="sheet-content"]')).toBeNull();

  await userEvent.click(page.getByRole("button", { name: "Toggle file explorer" }));
  await expect.element(sidebar).toHaveAttribute("data-state", "expanded");

  await userEvent.click(page.getByRole("button", { name: "login-page-01.css" }));
  await expect.element(sidebar).toHaveAttribute("data-state", "collapsed");
  await expect.element(page.getByText(".login-page { display: grid; }")).toBeInTheDocument();

  await userEvent.click(page.getByRole("button", { name: "Toggle file explorer" }));
  await expect.element(sidebar).toHaveAttribute("data-state", "expanded");

  await page.viewport(1024, 800);
  await expect.element(sidebar).toHaveAttribute("data-state", "expanded");
  await userEvent.click(page.getByRole("button", { name: "Toggle file explorer" }));
  await expect.element(sidebar).toHaveAttribute("data-state", "collapsed");

  await page.viewport(390, 844);
  await expect.element(sidebar).toHaveAttribute("data-state", "expanded");
});

it("omits the file explorer for a single-file Registry item", async () => {
  await page.viewport(1024, 800);
  await render(<CodeExplorer files={[explorerFiles[0]!]} />);

  expect(document.querySelector('[data-layout="contained"]')).toBeNull();
  expect(document.querySelector('[aria-label="Toggle file explorer"]')).toBeNull();
});

describe("Collection Code previews", () => {
  it("starts highlighting on mount and shows the completed result without a Registry request", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch");
    const highlightSpy = vi.mocked(highlightCode.highlightRegistryFiles);

    await renderCollection();

    await expect.poll(() => highlightSpy.mock.calls.length).toBe(2);
    expect(fetchSpy.mock.calls.some(([input]) => fetchInputUrl(input).includes("/r/"))).toBe(false);

    await userEvent.click(
      itemElement<HTMLButtonElement>("first-item", '[role="tab"]:nth-of-type(2)'),
    );
    const sourceCode = item("first-item").querySelector<HTMLElement>(
      'section[aria-label="Source code for first-item.tsx"]',
    )!;
    expect(sourceCode.firstElementChild?.tagName).toBe("PRE");
    await expect.element(page.elementLocator(sourceCode)).toHaveTextContent("First item source");
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

  it("shows an error after one failed highlighting attempt per item", async () => {
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
      .toHaveTextContent("Unable to display source code.");
    expect(highlightSpy).toHaveBeenCalledTimes(2);
    expect(document.body.textContent).not.toContain("First item source");
    expect(document.body.textContent).not.toContain("Highlighting failed");
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

  it("hides a reset Preview until its replacement frame loads", async () => {
    await page.viewport(390, 844);
    await renderCollection();

    const originalFrame = previewFrame("first-item");
    originalFrame.dispatchEvent(new Event("load"));
    await expect.poll(() => getComputedStyle(originalFrame).opacity).toBe("1");

    await userEvent.click(
      itemElement<HTMLButtonElement>("first-item", 'button[aria-label="Reset preview"]'),
    );

    const replacementFrame = previewFrame("first-item");
    expect(replacementFrame).not.toBe(originalFrame);
    expect(getComputedStyle(replacementFrame).opacity).toBe("0");

    replacementFrame.dispatchEvent(new Event("load"));
    await expect.poll(() => getComputedStyle(replacementFrame).opacity).toBe("1");
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
