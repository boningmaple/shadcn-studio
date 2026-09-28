import { afterEach, beforeEach, describe, expect, it, vi } from "vite-plus/test";
import { page, userEvent } from "vite-plus/test/browser/context";

import * as highlightCode from "@/features/registry/lib/highlight-code";

import {
  explorerFiles,
  renderPreviewBlock,
  codeTab,
  previewTab,
  sourceCode,
  codeStatus,
  explorerEntry,
  explorerToggle,
  explorerSidebar,
  explorerSheet,
  containedExplorer,
  explorerSubmenus,
  selectedExplorerEntry,
  cssSource,
  renderCodeExplorer,
  mockPreviewHighlighting,
  cleanupPreview,
  fetchInputUrl,
} from "./preview-test-utils";

vi.mock("@/features/registry/lib/highlight-code", { spy: true });

beforeEach(async () => {
  mockPreviewHighlighting();
  await page.viewport(1024, 800);
});

afterEach(cleanupPreview);

describe("Code tab panel", () => {
  describe("File tree", () => {
    describe("Responsiveness", () => {
      it("uses an independent contained Sidebar instead of a Sheet on mobile", async () => {
        await page.viewport(390, 844);
        await renderCodeExplorer();
        const sidebar = explorerSidebar();

        await expect.element(sidebar).toHaveAttribute("data-state", "collapsed");
        expect(explorerSheet()).toBeNull();

        await userEvent.click(explorerToggle());
        await expect.element(sidebar).toHaveAttribute("data-state", "expanded");

        await userEvent.click(explorerEntry("login-page-01.css"));
        await expect.element(sidebar).toHaveAttribute("data-state", "collapsed");
        await expect.element(cssSource()).toBeInTheDocument();

        await userEvent.click(explorerToggle());
        await expect.element(sidebar).toHaveAttribute("data-state", "expanded");

        await page.viewport(1024, 800);
        await expect.element(sidebar).toHaveAttribute("data-state", "expanded");
        await userEvent.click(explorerToggle());
        await expect.element(sidebar).toHaveAttribute("data-state", "collapsed");

        await page.viewport(390, 844);
        await expect.element(sidebar).toHaveAttribute("data-state", "expanded");
      });
    });

    describe("Critical paths", () => {
      it("navigates the Sidebar file tree built from highlighted Registry item files", async () => {
        await page.viewport(1024, 800);
        await renderCodeExplorer();

        for (const directory of ["@components", "vibe-ui", "login-page-01"]) {
          await expect.element(explorerEntry(directory)).toHaveAttribute("aria-expanded", "true");
        }

        const source = sourceCode().element();
        const scrollToSpy = vi.spyOn(source, "scrollTo");
        await userEvent.click(explorerEntry("login-page-01.css"));

        await expect.element(cssSource()).toBeInTheDocument();
        await expect
          .element(explorerEntry("login-page-01.css"))
          .toHaveAttribute("data-active", "true");
        expect(scrollToSpy).toHaveBeenCalledWith({ left: 0, top: 0 });
      });

      it.each(["@components", "vibe-ui", "login-page-01"])(
        "collapses and expands directory %s",
        async (name) => {
          await page.viewport(1024, 800);
          await renderCodeExplorer();
          const directory = explorerEntry(name);

          await userEvent.click(directory);
          await expect.element(directory).toHaveAttribute("aria-expanded", "false");

          await userEvent.click(directory);
          await expect.element(directory).toHaveAttribute("aria-expanded", "true");
        },
      );
    });

    describe("Edge cases", () => {
      it("keeps deeply nested file rows wide and visibly marks the selected file", async () => {
        await page.viewport(1024, 800);
        await renderCodeExplorer();
        const submenus = explorerSubmenus();
        const rightEdges = submenus.map((submenu) => submenu.getBoundingClientRect().right);

        expect.soft(Math.max(...rightEdges) - Math.min(...rightEdges)).toBeLessThan(1);

        const cssFile = explorerEntry("login-page-01.css");
        await userEvent.click(cssFile);
        const backgroundColor = getComputedStyle(selectedExplorerEntry()).backgroundColor;

        expect(backgroundColor).not.toBe("rgba(0, 0, 0, 0)");
      });

      it("omits the file explorer for a single-file Registry item", async () => {
        await page.viewport(1024, 800);
        await renderCodeExplorer([explorerFiles[0]!]);

        expect(containedExplorer()).toBeNull();
        await expect.element(explorerToggle()).not.toBeInTheDocument();
      });
    });

    describe("Accessibility", () => {
      it("expands directories and selects files using the keyboard", async () => {
        await renderCodeExplorer();
        await userEvent.click(explorerEntry("login-page-01"));
        await expect
          .element(explorerEntry("login-page-01"))
          .toHaveAttribute("aria-expanded", "false");
        await userEvent.keyboard("{Enter}");
        await expect
          .element(explorerEntry("login-page-01"))
          .toHaveAttribute("aria-expanded", "true");
        await expect.element(explorerEntry("login-page-01")).toHaveFocus();
        await userEvent.tab();
        await expect.element(explorerEntry("login-page-01.css")).toHaveFocus();
        await userEvent.keyboard(" ");
        await expect.element(cssSource()).toBeVisible();
        await expect.element(explorerEntry("login-page-01.css")).toHaveFocus();
        await expect
          .element(sourceCode())
          .toHaveAccessibleName("Source code for login-page-01.css");
      });
    });
  });

  describe("Code preview", () => {
    describe("Critical paths", () => {
      it("starts highlighting on mount and shows the completed result without a Registry request", async () => {
        const fetchSpy = vi.spyOn(globalThis, "fetch");
        const highlightSpy = vi.mocked(highlightCode.highlightRegistryFiles);

        await renderPreviewBlock();

        await expect.poll(() => highlightSpy.mock.calls.length).toBe(1);
        expect(fetchSpy.mock.calls.some(([input]) => fetchInputUrl(input).includes("/r/"))).toBe(
          false,
        );

        await userEvent.click(codeTab());
        const source = sourceCode().element();
        expect(source.firstElementChild?.tagName).toBe("PRE");
        await expect.element(sourceCode()).toHaveTextContent("First item source");
      });

      it("retains highlighted code when switching between Preview and Code tabs", async () => {
        const highlightSpy = vi.mocked(highlightCode.highlightRegistryFiles);
        await renderPreviewBlock();
        await userEvent.click(codeTab());
        await expect.element(sourceCode()).toHaveTextContent("First item source");
        await userEvent.click(previewTab());
        await expect.element(codeTab()).toHaveAttribute("aria-selected", "false");
        await userEvent.click(codeTab());
        await expect.element(sourceCode()).toHaveTextContent("First item source");
        expect(highlightSpy).toHaveBeenCalledTimes(1);
      });
    });

    describe("States and error handling", () => {
      it("leaves the code panel empty while background highlighting remains pending", async () => {
        const highlightSpy = vi
          .mocked(highlightCode.highlightRegistryFiles)
          .mockImplementation(() => new Promise(() => undefined));

        await renderPreviewBlock();
        await expect.poll(() => highlightSpy.mock.calls.length).toBe(1);
        await userEvent.click(codeTab());

        await expect.element(codeStatus()).not.toBeInTheDocument();
        await expect.element(sourceCode()).not.toBeInTheDocument();
      });

      it("leaves the code panel empty after one failed highlighting attempt per item", async () => {
        const highlightSpy = vi
          .mocked(highlightCode.highlightRegistryFiles)
          .mockRejectedValue(new Error("Highlighting failed"));

        await renderPreviewBlock();
        await expect.poll(() => highlightSpy.mock.calls.length).toBe(1);
        await userEvent.click(codeTab());

        await expect.element(codeStatus()).not.toBeInTheDocument();
        await expect.element(sourceCode()).not.toBeInTheDocument();
        expect(highlightSpy).toHaveBeenCalledTimes(1);
        expect(document.body.textContent).not.toContain("First item source");
        expect(document.body.textContent).not.toContain("Highlighting failed");
      });
    });

    describe("Accessibility", () => {
      it("opens the Code preview with the keyboard and exposes its source region", async () => {
        await renderPreviewBlock();
        await userEvent.click(previewTab());
        await userEvent.keyboard("{ArrowRight}");
        await expect.element(codeTab()).toHaveFocus();
        await expect.element(codeTab()).toHaveAttribute("aria-selected", "true");
        await expect.element(sourceCode()).toBeVisible();
        await expect.element(sourceCode()).toHaveAccessibleName("Source code for first-item.tsx");
      });
    });
  });
});
