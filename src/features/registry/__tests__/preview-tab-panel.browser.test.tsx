import { afterEach, beforeEach, describe, expect, it, vi } from "vite-plus/test";
import { page } from "vite-plus/test/browser/context";

import {
  renderPreviewBlock,
  previewFrame,
  previewFrameElement,
  mockPreviewHighlighting,
  cleanupPreview,
  registryItem,
} from "./preview-test-utils";

vi.mock("@/features/registry/lib/highlight-code", { spy: true });

beforeEach(mockPreviewHighlighting);

afterEach(cleanupPreview);

describe("Preview tab panel", () => {
  it("renders the Markdown design prompt and copies its raw source verbatim", async () => {
    const writeText = vi.spyOn(navigator.clipboard, "writeText").mockResolvedValue();
    await page.viewport(390, 844);
    await renderPreviewBlock();
    const frame = previewFrameElement();
    await page.getByRole("tab", { name: "Prompt", exact: true }).click();

    const panel = page.getByRole("tabpanel", { name: "Prompt", exact: true });
    await expect.element(panel).toBeVisible();
    const prompt = panel.element().querySelector(".prose")!;
    await expect.element(panel.getByRole("heading", { name: "Objective" })).toBeVisible();
    await expect
      .element(panel.getByRole("link", { name: "Source" }))
      .toHaveAttribute("href", "https://tanstack.com/markdown");
    await expect.element(panel.getByRole("table")).toBeVisible();
    expect(prompt.querySelector("strong")?.textContent).toBe("button");
    expect(prompt.querySelector("code")?.textContent).toBe("React");
    expect(prompt.querySelector("li")?.textContent).toBe("Support keyboard activation.");
    const headingStyle = getComputedStyle(prompt.querySelector("h1")!);
    const paragraphStyle = getComputedStyle(prompt.querySelector("p")!);
    expect(Number.parseFloat(headingStyle.fontSize)).toBeGreaterThan(
      Number.parseFloat(paragraphStyle.fontSize),
    );
    expect(getComputedStyle(prompt.querySelector("ul")!).listStyleType).toBe("disc");
    expect(prompt.scrollWidth).toBeLessThanOrEqual(prompt.clientWidth);
    await expect
      .element(page.getByRole("toolbar", { name: "Preview controls" }))
      .not.toBeInTheDocument();
    await page.getByRole("button", { name: "Copy prompt", exact: true }).click();
    expect(writeText).toHaveBeenCalledWith(registryItem.meta.prompt);
    await expect.element(panel.getByRole("status")).toHaveTextContent("Copied prompt.");

    await page.getByRole("tab", { name: "Preview", exact: true }).click();
    expect(previewFrameElement()).toBe(frame);
    await expect.element(page.getByRole("toolbar", { name: "Preview controls" })).toBeVisible();
  });

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
