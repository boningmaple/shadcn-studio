import { beforeEach, describe, expect, it } from "vite-plus/test";
import { page, userEvent } from "vite-plus/test/browser/context";
import { render } from "vitest-browser-react";

import ChartMap02 from "@/registry/vibe-ui/chart-map-02/chart-map-02";

const acre = () => page.getByRole("button", { name: /^Acre:/ });
const amazonas = () => page.getByRole("button", { name: /^Amazonas:/ });
const saoPaulo = () => page.getByRole("button", { name: /^São Paulo:/ });
const close = () => page.getByRole("button", { name: /^Close .* results/ });
const clickAcre = () => userEvent.click(acre().element().querySelector("rect")!);

describe("Brazil election Registry item", () => {
  beforeEach(async () => {
    await page.viewport(1000, 1600);
  });
  it("previews only without selection and dismisses with Escape or empty space", async () => {
    const screen = await render(<ChartMap02 />);
    await userEvent.hover(amazonas());
    await expect.element(page.getByRole("tooltip")).toBeVisible();
    await expect.element(page.getByText("Amazonas", { exact: true })).toBeVisible();
    expect(document.querySelector('path[stroke="#111111"]')).toBeNull();
    await expect.element(close()).not.toBeInTheDocument();
    await clickAcre();
    await userEvent.hover(saoPaulo());
    await expect.element(acre()).toHaveAttribute("aria-pressed", "true");
    await expect.element(page.getByText("Acre", { exact: true })).toBeVisible();
    await expect.element(page.getByText("Amazonas", { exact: true })).not.toBeInTheDocument();
    await expect.element(close()).toBeVisible();
    await userEvent.keyboard("{Escape}");
    await expect.element(acre()).toHaveAttribute("aria-pressed", "false");
    await expect.element(close()).not.toBeInTheDocument();
    await userEvent.unhover(saoPaulo());
    await userEvent.hover(amazonas());
    await expect.element(page.getByRole("tooltip")).toBeVisible();
    await clickAcre();
    await page
      .getByRole("group", { name: /Brazil first-round/ })
      .click({ position: { x: 4, y: 4 } });
    await expect.element(acre()).toHaveAttribute("aria-pressed", "false");
    await expect.element(close()).not.toBeInTheDocument();
    await screen.unmount();
  });

  it("tracks the pointer immediately in preview and freezes its anchor after selection", async () => {
    const screen = await render(<ChartMap02 />);
    const label = amazonas().element().querySelector("text")!;
    await userEvent.hover(label, { position: { x: 3, y: 8 } });
    const firstLeft = page.getByRole("tooltip").element().style.left;
    await userEvent.hover(label, { position: { x: 13, y: 8 } });
    await expect.poll(() => page.getByRole("tooltip").element().style.left).not.toBe(firstLeft);
    expect(page.getByRole("tooltip").element().style.transitionProperty).not.toContain("left");
    await userEvent.click(label, { position: { x: 13, y: 8 } });
    const selectedCard = page.getByRole("group", { name: "Amazonas results", exact: true });
    const selectedLeft = selectedCard.element().style.left;
    await userEvent.hover(saoPaulo());
    expect(selectedCard.element().style.left).toBe(selectedLeft);
    await expect.element(amazonas()).toHaveAttribute("aria-pressed", "true");
    expect(document.querySelectorAll('path[style*="brightness(1.08)"]')).toHaveLength(1);
    await screen.unmount();
  });

  it("visits every state and its Close button with Tab, then clears on leaving", async () => {
    const screen = await render(<ChartMap02 />);
    const buttons = page
      .getByRole("button", { name: /leads with|Tied result|No valid votes/ })
      .elements();
    expect(buttons).toHaveLength(27);
    buttons[0].focus();
    for (const button of buttons) {
      expect(document.activeElement).toBe(button);
      await expect.element(button).toHaveAttribute("aria-pressed", "true");
      await userEvent.tab();
      await expect.element(close()).toHaveFocus();
      await expect.element(button).toHaveAttribute("aria-pressed", "true");
      await userEvent.tab();
    }
    await expect.element(close()).not.toBeInTheDocument();
    expect(document.querySelector('path[stroke="#111111"]')).toBeNull();
    await screen.unmount();
  });

  it("supports reverse Tab and closes without reopening the selected state", async () => {
    const screen = await render(<ChartMap02 />);
    acre().element().focus();
    await userEvent.tab();
    await expect.element(close()).toHaveFocus();
    await userEvent.tab({ shift: true });
    await expect.element(acre()).toHaveFocus();
    await userEvent.tab();
    await userEvent.keyboard("{Enter}");
    await expect.element(close()).not.toBeInTheDocument();
    await expect.element(acre()).toHaveAttribute("aria-pressed", "false");
    expect(document.activeElement).not.toBe(acre().element());
    await screen.unmount();
  });
});
