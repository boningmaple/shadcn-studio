import { afterEach, beforeEach, describe, expect, it, vi } from "vite-plus/test";
import { userEvent } from "vite-plus/test/browser/context";

import { resetMessage } from "@/features/registry/lib/preview-frame-message";

import {
  renderPreviewBlock,
  observePreviewFrameMessages,
  resetPreviewButton,
  focusResetPreviewButton,
  previewFrameElement,
  mockPreviewHighlighting,
  cleanupPreview,
} from "./preview-test-utils";

vi.mock("@/features/registry/lib/highlight-code", { spy: true });
beforeEach(mockPreviewHighlighting);
afterEach(cleanupPreview);

describe("Preview reset", () => {
  describe("Critical paths", () => {
    it("sends one reset message to its Preview frame when clicked", async () => {
      await renderPreviewBlock();
      const { postMessageSpy } = observePreviewFrameMessages();
      await userEvent.click(resetPreviewButton());
      expect(postMessageSpy).toHaveBeenCalledExactlyOnceWith(resetMessage, location.origin);
    });
  });

  describe("Edge cases", () => {
    it("allows repeated resets without replacing the Preview frame", async () => {
      await renderPreviewBlock();
      const { frame, postMessageSpy } = observePreviewFrameMessages();
      await userEvent.click(resetPreviewButton());
      await userEvent.click(resetPreviewButton());
      expect(postMessageSpy).toHaveBeenCalledTimes(2);
      expect(postMessageSpy).toHaveBeenNthCalledWith(1, resetMessage, location.origin);
      expect(postMessageSpy).toHaveBeenNthCalledWith(2, resetMessage, location.origin);
      expect(previewFrameElement()).toBe(frame);
      expect(frame.getAttribute("src")).toBe("/preview/components/button/first-item");
    });
  });
});

describe("Preview reset - Accessibility", () => {
  it.each(["{Enter}", " "])(
    "supports keyboard activation with %j and retains focus",
    async (key) => {
      await renderPreviewBlock();
      const { postMessageSpy } = observePreviewFrameMessages();
      focusResetPreviewButton();
      await expect.element(resetPreviewButton()).toHaveFocus();
      await expect.element(resetPreviewButton()).toHaveAccessibleName("Reset preview");
      await userEvent.keyboard(key);
      expect(postMessageSpy).toHaveBeenCalledExactlyOnceWith(resetMessage, location.origin);
      await expect.element(resetPreviewButton()).toHaveFocus();
    },
  );
});
