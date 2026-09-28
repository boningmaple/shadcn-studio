import { afterEach, beforeEach, describe, expect, it, vi } from "vite-plus/test";
import { page } from "vite-plus/test/browser/context";

import {
  renderPreviewBlock,
  previewFrame,
  previewFrameElement,
  mockPreviewHighlighting,
  cleanupPreview,
} from "./preview-test-utils";

vi.mock("@/features/registry/lib/highlight-code", { spy: true });

beforeEach(mockPreviewHighlighting);

afterEach(cleanupPreview);

describe("Preview tab panel", () => {
  it("renders canonical, lazy, accessibly named Preview frames", async () => {
    await renderPreviewBlock();
    const frame = previewFrame();

    await expect.element(frame).toHaveAttribute("src", "/preview/components/button/first-item");
    await expect.element(frame).toHaveAttribute("loading", "lazy");
    await expect.element(frame).toHaveAttribute("title", "First item Preview");
  });

  it("shows the Preview after its iframe loads", async () => {
    await page.viewport(390, 844);
    await renderPreviewBlock();

    await expect.poll(() => getComputedStyle(previewFrameElement()).visibility).toBe("visible");
  });
});
