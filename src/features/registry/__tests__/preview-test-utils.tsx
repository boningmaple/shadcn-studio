import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { vi } from "vite-plus/test";
import { page, userEvent } from "vite-plus/test/browser/context";
import { render } from "vitest-browser-react";

import { CodePanel } from "@/features/registry/components/code-panel";
import { PreviewBlock } from "@/features/registry/components/preview-block";
import * as highlightCode from "@/features/registry/lib/highlight-code";
import { themeDarkMessage, themeLightMessage } from "@/features/registry/lib/preview-frame-message";
import { previewThemeHydrationScript } from "@/features/registry/script/preview-theme-hydration-script";
import type {
  VibeBuiltRegistryItem,
  VibeHighlightedRegistryFile,
} from "@/features/registry/types/registry";
import { ThemeProvider } from "@/features/theme-switch/components/theme-provider";
import { ThemeSwitchButton } from "@/features/theme-switch/components/theme-switch-button";

export const registryItem: VibeBuiltRegistryItem = {
  meta: { height: 120, prompt: "  Create a button.\n\nKeep <details> as plain text.  " },
  categories: ["components", "button"],
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
};

export const explorerFiles: VibeHighlightedRegistryFile[] = [
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

type RenderPreviewBlockOptions = {
  showThemeSwitch?: boolean;
};

export const renderPreviewBlock = (options: RenderPreviewBlockOptions = {}) => {
  const queryClient = new QueryClient();

  return render(
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        {options.showThemeSwitch ? <ThemeSwitchButton /> : null}
        <PreviewBlock item={registryItem} />
      </ThemeProvider>
    </QueryClientProvider>,
  );
};

export const codeTab = () => page.getByRole("tab", { name: "Code" });
export const previewTab = () => page.getByRole("tab", { name: "Preview" });

export const previewFrame = () => page.getByTitle("First item Preview");
export const previewFrameElement = () => previewFrame().element() as HTMLIFrameElement;

export const phonePreviewButton = () => page.getByRole("radio", { name: "Phone preview" });
export const tabletPreviewButton = () => page.getByRole("radio", { name: "Tablet preview" });
export const desktopPreviewButton = () => page.getByRole("radio", { name: "Full-width preview" });
export const previewResizeGroup = () =>
  page.elementLocator(document.querySelector<HTMLElement>('[data-slot="resizable-panel-group"]')!);
export const previewResizeHandle = () => page.getByRole("separator", { includeHidden: true });
export const previewViewportWidth = () => previewFrameElement().getBoundingClientRect().width;
export const previewAvailableWidth = () =>
  previewResizeGroup().element().getBoundingClientRect().width -
  previewResizeHandle().element().getBoundingClientRect().width -
  2;
export const dragPreviewToWidth = async (width: number) => {
  await userEvent.dragAndDrop(previewResizeHandle(), previewResizeGroup(), {
    targetPosition: {
      x: width + 2 + previewResizeHandle().element().getBoundingClientRect().width / 2,
      // Stay on the panel border so the iframe cannot consume pointer events.
      y: 0,
    },
  });
};
export const focusPreviewResizeHandle = () =>
  (previewResizeHandle().element() as HTMLElement).focus();

export const appThemeButton = () => page.getByRole("button", { name: /^Theme:/ });
export const previewThemeButton = () => page.getByRole("button", { name: /^Preview theme:/ });

export const resetPreviewButton = () => page.getByRole("button", { name: "Reset preview" });
export const focusResetPreviewButton = () =>
  (resetPreviewButton().element() as HTMLElement).focus();

export const openPreviewLink = () => page.getByRole("link", { name: "Open in a new tab" });

export const sourceCode = () => page.getByRole("region", { name: /^Source code for/ });
export const codePanel = () => page.getByRole("tabpanel", { name: "Code", exact: true });
export const explorerEntry = (name: string) => page.getByRole("button", { exact: true, name });
export const explorerToggle = () => page.getByRole("button", { name: "Toggle file explorer" });
export const explorerSidebar = () =>
  page.elementLocator(
    document.querySelector<HTMLElement>('[data-slot="sidebar"][data-layout="contained"]')!,
  );
export const explorerSheet = () => document.querySelector('[data-slot="sheet-content"]');
export const containedExplorer = () => document.querySelector('[data-layout="contained"]');
export const explorerSubmenus = () => [
  ...document.querySelectorAll<HTMLElement>('[data-slot="sidebar-menu-sub"]'),
];
export const selectedExplorerEntry = () =>
  document.querySelector<HTMLElement>('[data-slot="sidebar-menu-button"][data-active="true"]')!;
export const cssSource = () => page.getByText(".login-page { display: grid; }");

export const renderCodePanel = (files = explorerFiles) => {
  const item = { ...registryItem, files };
  const queryClient = new QueryClient();
  queryClient.setQueryData(["registry-item-code", item.name, item.files], files);

  return render(
    <QueryClientProvider client={queryClient}>
      <CodePanel item={item} />
    </QueryClientProvider>,
  );
};

export function runPreviewThemeHydrationScript(search: string) {
  const script = document.createElement("script");
  script.textContent = previewThemeHydrationScript.replace(
    "location.search",
    JSON.stringify(search),
  );
  document.head.append(script);
  script.remove();
}

export const mockPreviewHighlighting = () => {
  vi.mocked(highlightCode.highlightRegistryFiles).mockImplementation(async (files) =>
    files.map((file) => ({
      ...file,
      html: `<pre class="shiki"><code>${file.content}</code></pre>`,
    })),
  );
};

export const cleanupPreview = () => {
  const root = document.documentElement;
  delete root.dataset.theme;
  root.classList.remove("dark");
  root.style.removeProperty("color-scheme");
  localStorage.clear();
  vi.clearAllMocks();
  vi.restoreAllMocks();
};

export const fetchInputUrl = (input: RequestInfo | URL) => {
  if (typeof input === "string") return input;
  if (input instanceof URL) return input.href;
  return input.url;
};

export const observePreviewFrameMessages = () => {
  const frame = previewFrameElement();
  const frameWindow = frame.contentWindow!;
  frameWindow.stop();

  const postMessageSpy = vi.spyOn(frameWindow, "postMessage").mockImplementation(() => {});
  return {
    frame,
    postMessageSpy,
    latestRequestedTheme: () => {
      const message = postMessageSpy.mock.calls
        .map(([data]) => data)
        .filter((data) => data === themeLightMessage || data === themeDarkMessage)
        .at(-1);
      if (message === themeLightMessage) return "light";
      if (message === themeDarkMessage) return "dark";
      return undefined;
    },
  };
};
