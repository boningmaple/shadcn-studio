import type { ComponentProps } from "react";
import { toast } from "sonner";
import { afterEach, describe, expect, test, vi } from "vite-plus/test";
import { page, userEvent } from "vite-plus/test/browser/context";
import { render } from "vitest-browser-react";

import { CopyButton } from "@/components/copy-button";

vi.mock("sonner", () => ({ toast: { error: vi.fn() } }));

const content = "The content to copy";
const copyButton = (name = "Copy current content") => page.getByRole("button", { name });
const copyIcon = () => page.elementLocator(document.querySelector<SVGElement>(".lucide-copy")!);
const checkIcon = () => page.elementLocator(document.querySelector<SVGElement>(".lucide-check")!);
const liveStatus = () => page.getByRole("status");
const renderCopyButton = (props: Partial<ComponentProps<typeof CopyButton>> = {}) =>
  render(<CopyButton content={content} {...props} />);

const mockSuccessfulClipboardWrite = () =>
  vi.spyOn(navigator.clipboard, "writeText").mockResolvedValue(undefined);

const mockPendingClipboardWrite = () => {
  let resolveWrite: (() => void) | undefined;
  vi.spyOn(navigator.clipboard, "writeText").mockImplementation(
    () =>
      new Promise<void>((resolve) => {
        resolveWrite = resolve;
      }),
  );

  return () => resolveWrite?.();
};

const mockFailedClipboardWrite = () =>
  vi.spyOn(navigator.clipboard, "writeText").mockRejectedValue(new Error("Clipboard denied"));

const settleClipboardWrite = async () => {
  await Promise.resolve();
  await Promise.resolve();
};

const startCopyStateTimer = () => {
  vi.useFakeTimers({ toFake: ["setTimeout", "clearTimeout"] });
};

afterEach(() => {
  vi.clearAllMocks();
  vi.useRealTimers();
});

describe("CopyButton", () => {
  describe("copying", () => {
    test("writes the provided content to the clipboard when pressed", async () => {
      const writeTextSpy = mockSuccessfulClipboardWrite();
      await renderCopyButton();

      await userEvent.click(copyButton());

      expect(writeTextSpy).toHaveBeenCalledWith(content);
    });

    test("shows the green check icon after the copying succeeds", async () => {
      mockSuccessfulClipboardWrite();
      await renderCopyButton();

      await userEvent.click(copyButton());

      await expect.element(checkIcon()).toHaveClass(/text-green-600/);
      await expect.element(copyButton()).toHaveClass("disabled:opacity-100");
    });
  });

  describe("state timing", () => {
    test("disables the button while the clipboard write is pending", async () => {
      mockPendingClipboardWrite();
      await renderCopyButton();

      await userEvent.click(copyButton());

      await expect.element(copyButton()).toBeDisabled();
    });

    test("disables the button while success feedback is displayed", async () => {
      mockSuccessfulClipboardWrite();
      await renderCopyButton();

      await userEvent.click(copyButton());

      await expect.element(copyButton()).toBeDisabled();
    });

    test("enables the button 1.5 seconds after a successful write", async () => {
      startCopyStateTimer();
      mockSuccessfulClipboardWrite();
      await renderCopyButton();
      await userEvent.click(copyButton());
      await expect.element(checkIcon()).toBeInTheDocument();

      await vi.advanceTimersByTimeAsync(1_500);

      await expect.element(copyButton()).toBeEnabled();
    });

    test("restores the copy icon 1.5 seconds after a successful write", async () => {
      startCopyStateTimer();
      mockSuccessfulClipboardWrite();
      await renderCopyButton();
      await userEvent.click(copyButton());
      await expect.element(checkIcon()).toBeInTheDocument();

      await vi.advanceTimersByTimeAsync(1_500);

      await expect.poll(() => document.querySelector(".lucide-copy") !== null).toBe(true);
    });

    test("clears the success announcement 1.5 seconds after a successful write", async () => {
      startCopyStateTimer();
      mockSuccessfulClipboardWrite();
      await renderCopyButton();
      await userEvent.click(copyButton());
      await expect.element(liveStatus()).toHaveTextContent("Copied current content.");

      await vi.advanceTimersByTimeAsync(1_500);

      await expect.element(liveStatus()).toHaveTextContent("");
    });
  });

  describe("content changes", () => {
    test("clears the success state when the content changes", async () => {
      mockSuccessfulClipboardWrite();
      const rendered = await renderCopyButton();
      await userEvent.click(copyButton());
      await expect.element(checkIcon()).toBeInTheDocument();

      await rendered.rerender(<CopyButton content="Replacement content" />);

      await expect.element(copyIcon()).toBeInTheDocument();
    });

    test("enables the button when the content changes during a pending write", async () => {
      mockPendingClipboardWrite();
      const rendered = await renderCopyButton();
      await userEvent.click(copyButton());

      await rendered.rerender(<CopyButton content="Replacement content" />);

      await expect.element(copyButton()).toBeEnabled();
    });

    test("ignores a stale clipboard completion after the content changes", async () => {
      const finishCopy = mockPendingClipboardWrite();
      const rendered = await renderCopyButton();
      await userEvent.click(copyButton());
      await rendered.rerender(<CopyButton content="Replacement content" />);

      finishCopy();
      await settleClipboardWrite();

      await expect.element(liveStatus()).toHaveTextContent("");
    });
  });

  describe("errors", () => {
    test("shows the default error message when the clipboard write fails", async () => {
      mockFailedClipboardWrite();
      await renderCopyButton();

      await userEvent.click(copyButton());

      await expect
        .poll(() => vi.mocked(toast.error).mock.calls.at(-1)?.[0])
        .toBe("Could not copy current content.");
    });

    test("shows the configured error message when the clipboard write fails", async () => {
      mockFailedClipboardWrite();
      await renderCopyButton({ errorMessage: "Copy failed." });

      await userEvent.click(copyButton());

      await expect.poll(() => vi.mocked(toast.error).mock.calls.at(-1)?.[0]).toBe("Copy failed.");
    });

    test("enables the button after the clipboard write fails", async () => {
      mockFailedClipboardWrite();
      await renderCopyButton();

      await userEvent.click(copyButton());
      await settleClipboardWrite();

      await expect.element(copyButton()).toBeEnabled();
    });

    test("does not announce success when the clipboard write fails", async () => {
      mockFailedClipboardWrite();
      await renderCopyButton();

      await userEvent.click(copyButton());
      await settleClipboardWrite();

      await expect.element(liveStatus()).toHaveTextContent("");
    });
  });

  describe("accessibility", () => {
    test("uses Copy current content as its default accessible name", async () => {
      await renderCopyButton();

      await expect.element(copyButton()).toBeInTheDocument();
    });

    test("uses a configured accessible name", async () => {
      await renderCopyButton({ "aria-label": "Copy token" });

      await expect.element(copyButton("Copy token")).toBeInTheDocument();
    });

    test("announces the default success message through a polite live region", async () => {
      mockSuccessfulClipboardWrite();
      await renderCopyButton();

      await userEvent.click(copyButton());

      await expect.element(liveStatus()).toHaveTextContent("Copied current content.");
    });

    test("announces a configured success message", async () => {
      mockSuccessfulClipboardWrite();
      await renderCopyButton({ successMessage: "Token copied." });

      await userEvent.click(copyButton());

      await expect.element(liveStatus()).toHaveTextContent("Token copied.");
    });
  });
});
