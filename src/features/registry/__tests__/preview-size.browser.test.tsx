import { afterEach, beforeEach, describe, expect, it, vi } from "vite-plus/test";
import { page, userEvent } from "vite-plus/test/browser/context";

import {
  renderPreviewBlock,
  phonePreviewButton,
  tabletPreviewButton,
  desktopPreviewButton,
  previewResizeHandle,
  focusPreviewResizeHandle,
  previewViewportWidth,
  previewAvailableWidth,
  dragPreviewToWidth,
  mockPreviewHighlighting,
  cleanupPreview,
} from "./preview-test-utils";

vi.mock("@/features/registry/lib/highlight-code", { spy: true });

beforeEach(async () => {
  mockPreviewHighlighting();
  await page.viewport(1280, 800);
});

afterEach(cleanupPreview);

describe("Preview size", () => {
  describe("Responsiveness", () => {
    it("preserves a fixed preset width and lets desktop follow the container width", async () => {
      await renderPreviewBlock();
      await userEvent.click(tabletPreviewButton());
      await expect.poll(previewViewportWidth).toBeCloseTo(640, 0);
      await page.viewport(1100, 800);
      await expect.poll(previewViewportWidth).toBeCloseTo(640, 0);
      await userEvent.click(desktopPreviewButton());
      await page.viewport(1400, 800);
      await expect.poll(() => previewViewportWidth() - previewAvailableWidth()).toBeCloseTo(0, 0);
    });

    it("hides the resize handle on mobile and fills the available width", async () => {
      await page.viewport(390, 844);
      await renderPreviewBlock();
      await expect.element(previewResizeHandle()).not.toBeVisible();
      await expect.element(phonePreviewButton()).not.toBeInTheDocument();
      await expect.element(tabletPreviewButton()).not.toBeInTheDocument();
      await expect.element(desktopPreviewButton()).not.toBeInTheDocument();
      await expect.poll(() => previewViewportWidth() - previewAvailableWidth()).toBeCloseTo(0, 0);
    });
  });

  describe("Critical paths", () => {
    it("switches the viewport between phone, tablet, and full-width presets", async () => {
      await renderPreviewBlock();
      await expect.element(desktopPreviewButton()).toHaveAttribute("aria-checked", "true");
      await expect.poll(() => previewViewportWidth() - previewAvailableWidth()).toBeCloseTo(0, 0);
      await userEvent.click(phonePreviewButton());
      await expect.poll(previewViewportWidth).toBeCloseTo(320, 0);
      await expect.element(phonePreviewButton()).toHaveAttribute("aria-checked", "true");
      await expect.element(desktopPreviewButton()).toHaveAttribute("aria-checked", "false");
      await userEvent.click(tabletPreviewButton());
      await expect.poll(previewViewportWidth).toBeCloseTo(640, 0);
      await expect.element(tabletPreviewButton()).toHaveAttribute("aria-checked", "true");
      await expect.element(phonePreviewButton()).toHaveAttribute("aria-checked", "false");
      await userEvent.click(desktopPreviewButton());
      await expect.poll(() => previewViewportWidth() - previewAvailableWidth()).toBeCloseTo(0, 0);
      await expect.element(desktopPreviewButton()).toHaveAttribute("aria-checked", "true");
      await expect.element(tabletPreviewButton()).toHaveAttribute("aria-checked", "false");
    });

    it("drags to custom widths, clears the preset, and returns to a preset", async () => {
      await renderPreviewBlock();
      await userEvent.click(tabletPreviewButton());
      await expect.poll(previewViewportWidth).toBeCloseTo(640, 0);
      await dragPreviewToWidth(480);
      await expect.poll(previewViewportWidth).toBeCloseTo(480, 0);
      for (const button of [phonePreviewButton(), tabletPreviewButton(), desktopPreviewButton()]) {
        await expect.element(button).toHaveAttribute("aria-checked", "false");
      }
      await userEvent.click(phonePreviewButton());
      await expect.poll(previewViewportWidth).toBeCloseTo(320, 0);
      await expect.element(phonePreviewButton()).toHaveAttribute("aria-checked", "true");
    });
  });

  describe("Edge cases", () => {
    it("clamps dragging to the minimum panel width and available space", async () => {
      await renderPreviewBlock();
      await userEvent.click(tabletPreviewButton());
      await expect.poll(previewViewportWidth).toBeCloseTo(640, 0);
      await dragPreviewToWidth(100);
      // The 320px minimum panel includes two border pixels.
      await expect.poll(previewViewportWidth).toBeCloseTo(318, 0);
      await dragPreviewToWidth(previewAvailableWidth() + 4);
      await expect.poll(() => previewViewportWidth() - previewAvailableWidth()).toBeCloseTo(0, 0);
    });
  });
});

describe("Preview size - Accessibility", () => {
  it("selects presets using the keyboard", async () => {
    await renderPreviewBlock();
    await userEvent.click(phonePreviewButton());
    await userEvent.tab();
    await expect.element(tabletPreviewButton()).toHaveFocus();
    await userEvent.keyboard(" ");
    await expect.element(tabletPreviewButton()).toHaveAttribute("aria-checked", "true");
    await expect.poll(previewViewportWidth).toBeCloseTo(640, 0);
    await userEvent.tab();
    await expect.element(desktopPreviewButton()).toHaveFocus();
    await userEvent.keyboard("{Enter}");
    await expect.element(desktopPreviewButton()).toHaveAttribute("aria-checked", "true");
    await expect.poll(() => previewViewportWidth() - previewAvailableWidth()).toBeCloseTo(0, 0);
  });

  it("resizes with the keyboard separator and clears the preset", async () => {
    await renderPreviewBlock();
    await userEvent.click(desktopPreviewButton());
    focusPreviewResizeHandle();
    await expect.element(previewResizeHandle()).toHaveFocus();
    const originalWidth = previewViewportWidth();
    await userEvent.keyboard("{ArrowLeft}");
    await expect.poll(previewViewportWidth).toBeLessThan(originalWidth);
    await expect.element(desktopPreviewButton()).toHaveAttribute("aria-checked", "false");
  });
});
