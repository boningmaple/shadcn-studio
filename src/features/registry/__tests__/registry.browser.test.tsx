import { useState } from "react";
import { afterEach, describe, expect, it } from "vite-plus/test";
import { page, userEvent } from "vite-plus/test/browser/context";
import { render } from "vitest-browser-react";

import { CodeExplorer } from "@/features/registry/components/registry-code-panel";
import {
  RegistryCollectionPage,
  type RegistryCollectionItem,
} from "@/features/registry/components/registry-collection-page";
import type { VibeHighlightedRegistryFile } from "@/features/registry/types/registry";

function FirstPreview() {
  const [count, setCount] = useState(0);

  return <button onClick={() => setCount((value) => value + 1)}>First count: {count}</button>;
}

function SecondPreview() {
  return <button>Second Preview</button>;
}

const collectionItems: RegistryCollectionItem[] = [
  {
    description: "The first Preview.",
    name: "first-item",
    Preview: FirstPreview,
    previewHref: "/preview/components/button/first-item",
    title: "First item",
  },
  {
    description: "The second Preview.",
    name: "second-item",
    Preview: SecondPreview,
    previewHref: "/preview/components/button/second-item",
    title: "Second item",
  },
];

const renderCollection = () =>
  render(
    <RegistryCollectionPage
      description="A test Collection page."
      items={collectionItems}
      title="Test collection"
    />,
  );

const item = (name: string) => document.getElementById(name)!;
const itemElement = <ElementType extends Element>(name: string, selector: string) =>
  page.elementLocator(item(name).querySelector<ElementType>(selector)!);
const themeBoundary = (name: string) => itemElement(name, '[data-slot="registry-preview-theme"]');
const themeSwitch = (name: string) =>
  itemElement<HTMLButtonElement>(name, 'button[aria-label^="Preview theme:"]');

afterEach(() => {
  document.documentElement.classList.remove("dark");
});

it("navigates textual files and keeps plain source usable when highlighting fails", async () => {
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
  await userEvent.click(page.getByRole("button", { name: "login-page-01.css" }));
  await expect.element(page.getByText(".login-page { display: grid; }")).toBeInTheDocument();
});

describe("Registry item Preview themes", () => {
  it("follows the app theme until each Preview switches independently", async () => {
    await renderCollection();

    const firstSwitch = themeSwitch("first-item");
    await expect.element(firstSwitch).toBeEnabled();
    await expect.element(firstSwitch).toHaveAccessibleName("Preview theme: Light. Switch to Dark.");
    await expect.element(themeBoundary("first-item")).toHaveAttribute("data-theme", "light");
    await expect.element(themeBoundary("second-item")).toHaveAttribute("data-theme", "light");

    document.documentElement.classList.add("dark");
    await expect.element(themeBoundary("first-item")).toHaveAttribute("data-theme", "dark");
    await expect.element(themeBoundary("second-item")).toHaveAttribute("data-theme", "dark");

    await userEvent.click(firstSwitch);
    await expect.element(themeBoundary("first-item")).toHaveAttribute("data-theme", "light");
    await expect.element(themeBoundary("first-item")).toHaveStyle({ colorScheme: "light" });
    await expect.element(themeBoundary("second-item")).toHaveAttribute("data-theme", "dark");

    document.documentElement.classList.remove("dark");
    await expect.element(themeBoundary("first-item")).toHaveAttribute("data-theme", "light");
    await expect.element(themeBoundary("second-item")).toHaveAttribute("data-theme", "light");

    document.documentElement.classList.add("dark");
    await expect.element(themeBoundary("first-item")).toHaveAttribute("data-theme", "light");
    await expect.element(themeBoundary("second-item")).toHaveAttribute("data-theme", "dark");
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

  it("preserves the Preview theme when resetting item state", async () => {
    await renderCollection();

    await userEvent.click(page.getByRole("button", { name: "First count: 0" }));
    await userEvent.click(themeSwitch("first-item"));
    await userEvent.click(
      itemElement<HTMLButtonElement>("first-item", 'button[aria-label="Reset preview"]'),
    );

    await expect.element(page.getByRole("button", { name: "First count: 0" })).toBeInTheDocument();
    await expect.element(themeBoundary("first-item")).toHaveAttribute("data-theme", "dark");
    await expect
      .element(itemElement<HTMLAnchorElement>("first-item", 'a[aria-label="Open preview in tab"]'))
      .toHaveAttribute("href", "/preview/components/button/first-item?theme=dark");
  });
});
