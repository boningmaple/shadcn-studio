import { useState } from "react";
import { afterEach, describe, expect, it, vi } from "vite-plus/test";
import { page, userEvent } from "vite-plus/test/browser/context";
import { render } from "vitest-browser-react";

import { Sidebar, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

const sidebar = () =>
  page.elementLocator(document.querySelector<HTMLElement>('[data-slot="sidebar"]')!);

afterEach(() => {
  document.cookie = "test_sidebar=; path=/; max-age=0";
  document.cookie = "sidebar_state=; path=/; max-age=0";
  vi.restoreAllMocks();
});

describe("SidebarProvider", () => {
  it("writes desktop state using its configured cookie name", async () => {
    await page.viewport(1024, 800);
    await render(
      <SidebarProvider cookieName="test_sidebar" keyboardShortcut={false}>
        <SidebarTrigger />
        <Sidebar layout="contained" mobileSheet={false} />
      </SidebarProvider>,
    );

    await userEvent.click(page.getByRole("button", { name: "Toggle Sidebar" }));

    expect(document.cookie).toContain("test_sidebar=false");
    expect(document.cookie).not.toContain("sidebar_state=");
  });

  it("can disable persistence and its global keyboard shortcut", async () => {
    await page.viewport(1024, 800);
    await render(
      <SidebarProvider cookieName={false} keyboardShortcut={false}>
        <SidebarTrigger />
        <Sidebar layout="contained" mobileSheet={false} />
      </SidebarProvider>,
    );

    await userEvent.keyboard("{Control>}b{/Control}");

    await expect.element(sidebar()).toHaveAttribute("data-state", "expanded");
    expect(document.cookie).not.toContain("sidebar_state=");
  });

  it("supports controlled mobile state", async () => {
    await page.viewport(390, 844);
    const onOpenMobileChange = vi.fn();

    function ControlledSidebar() {
      const [openMobile, setOpenMobile] = useState(false);

      return (
        <SidebarProvider
          keyboardShortcut={false}
          onOpenMobileChange={(open) => {
            onOpenMobileChange(open);
            setOpenMobile(open);
          }}
          openMobile={openMobile}
        >
          <SidebarTrigger />
          <Sidebar layout="contained" mobileSheet={false} />
        </SidebarProvider>
      );
    }

    await render(<ControlledSidebar />);
    await userEvent.click(page.getByRole("button", { name: "Toggle Sidebar" }));

    expect(onOpenMobileChange).toHaveBeenCalledWith(true);
    await expect.element(sidebar()).toHaveAttribute("data-state", "expanded");
  });
});

describe("Sidebar mobile presentation", () => {
  it("keeps the Sheet presentation by default", async () => {
    await page.viewport(390, 844);
    await render(
      <SidebarProvider cookieName={false} keyboardShortcut={false}>
        <SidebarTrigger />
        <Sidebar>Content</Sidebar>
      </SidebarProvider>,
    );

    await userEvent.click(page.getByRole("button", { name: "Toggle Sidebar" }));

    await expect.element(page.getByRole("dialog", { name: "Sidebar" })).toBeInTheDocument();
    expect(document.querySelector('[data-slot="sheet-content"]')).not.toBeNull();
  });
});
