import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  RouterProvider,
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { beforeEach, describe, expect, it } from "vite-plus/test";
import { cdp, page, userEvent } from "vite-plus/test/browser/context";
import { render } from "vitest-browser-react";

import { SidebarProvider } from "@/components/ui/sidebar";
import { ThemeProvider } from "@/features/theme-switch/components/theme-provider";

import { AppHeader } from "../components/app-header";
import { AppSidebar } from "../components/app-sidebar";

const sectionLinks = [
  { label: "Components", to: "/components" },
  { label: "Blocks", to: "/blocks" },
  { label: "Charts", to: "/charts" },
  { label: "Pages", to: "/pages" },
];

async function renderNavigation(surface: "header" | "sidebar", initialPath = "/") {
  const queryClient = new QueryClient();
  const rootRoute = createRootRoute({
    staticData: { ariaLabel: "" },
    shellComponent: (props) => (
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <SidebarProvider cookieName={false}>
            {surface === "header" ? <AppHeader showSidebar={false} /> : <AppSidebar />}
            {props.children}
          </SidebarProvider>
        </ThemeProvider>
      </QueryClientProvider>
    ),
  });
  const homeRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/",
    staticData: { ariaLabel: "Home" },
  });
  const destinationRoutes = [...sectionLinks, { label: "Button", to: "/components/button" }].map(
    (link) =>
      createRoute({
        getParentRoute: () => rootRoute,
        path: link.to,
        staticData: { ariaLabel: link.label },
        component: () => <h1>{link.label}</h1>,
      }),
  );
  const router = createRouter({
    history: createMemoryHistory({ initialEntries: [initialPath] }),
    routeTree: rootRoute.addChildren([homeRoute, ...destinationRoutes]),
  });
  await render(<RouterProvider router={router} />);
  return router;
}

beforeEach(async () => {
  await page.viewport(1440, 900);
});

describe("App navigation", () => {
  it("opens the active section and highlights its exact link on page loads and navigation", async () => {
    const router = await renderNavigation("sidebar", "/components/button");
    const navigation = page.getByRole("navigation", { name: "Registry" });
    const components = navigation.getByRole("button", { name: "Components", exact: true });
    const button = navigation.getByRole("link", { name: "Button", exact: true });
    await expect.element(components).toHaveAttribute("aria-expanded", "true");
    await expect.element(button).toBeVisible();
    await expect.element(button).toHaveAttribute("data-active", "true");
    await expect.element(button).toHaveAttribute("aria-current", "page");
    await expect
      .element(navigation.getByRole("link", { name: "Overview", exact: true }))
      .toHaveAttribute("data-active", "false");

    await userEvent.click(components);
    await expect.element(components).toHaveAttribute("aria-expanded", "false");
    await router.navigate({ to: "/charts" });
    await expect
      .element(navigation.getByRole("button", { name: "Charts", exact: true }))
      .toHaveAttribute("aria-expanded", "true");
    const overview = navigation.getByRole("link", { name: "Overview", exact: true });
    await expect.element(overview).toHaveAttribute("href", "/charts");
    await expect.element(overview).toHaveAttribute("data-active", "true");
    await expect.element(overview).toHaveAttribute("aria-current", "page");
    await router.navigate({ to: "/components" });
    await expect.element(components).toHaveAttribute("aria-expanded", "true");
    await expect.element(button).toHaveAttribute("data-active", "false");
    await userEvent.click(button);
    await expect.element(button).toHaveAttribute("data-active", "true");
    await expect.element(button).toHaveAttribute("aria-current", "page");
  });

  it.each(["header", "sidebar"] as const)(
    "%s search offers Home and every Registry section and navigates to a section",
    async (surface) => {
      const router = await renderNavigation(surface);
      await userEvent.click(page.getByRole("button", { name: "Search", exact: true }));
      const quickLinks = page.getByRole("menu", { name: "Quick links" });
      await expect.element(quickLinks.getByRole("menuitem")).toHaveLength(5);
      for (const label of ["Home", ...sectionLinks.map((link) => link.label)]) {
        await expect
          .element(quickLinks.getByRole("menuitem", { name: label, exact: true }))
          .toBeVisible();
      }
      await userEvent.click(quickLinks.getByRole("menuitem", { name: "Charts", exact: true }));
      await expect.poll(() => router.state.location.pathname).toBe("/charts");
      await expect.element(page.getByRole("dialog", { name: "Search" })).not.toBeInTheDocument();
    },
  );

  it("keeps Search usable as an icon when the sidebar collapses and restores its label", async () => {
    await renderNavigation("sidebar");
    const search = page.getByRole("button", { name: "Search", exact: true });
    const toggle = page.getByRole("button", { name: "Toggle Sidebar", exact: true });
    const label = search.element().querySelector("span")!;
    const expandedWidth = search.element().getBoundingClientRect().width;

    await userEvent.click(toggle);

    await expect.poll(() => search.element().getBoundingClientRect().width).toBe(32);
    await expect.poll(() => getComputedStyle(label).opacity).toBe("0");
    await expect.element(search).toHaveAccessibleName("Search");
    await userEvent.click(search);
    await expect.element(page.getByRole("dialog", { name: "Search" })).toBeVisible();
    await userEvent.keyboard("{Escape}");

    await userEvent.click(toggle);

    await expect.poll(() => search.element().getBoundingClientRect().width).toBe(expandedWidth);
    await expect.poll(() => getComputedStyle(label).opacity).toBe("1");
  });

  it("disables Search button and label transitions when reduced motion is preferred", async () => {
    const session = cdp();
    await session.send("Emulation.setEmulatedMedia", {
      features: [{ name: "prefers-reduced-motion", value: "reduce" }],
    });
    try {
      await renderNavigation("sidebar");
      const search = page.getByRole("button", { name: "Search", exact: true });
      await expect.element(search).toBeVisible();
      const label = search.element().querySelector("span")!;
      expect(window.matchMedia("(prefers-reduced-motion: reduce)").matches).toBe(true);
      expect(getComputedStyle(search.element()).transitionProperty).toBe("none");
      expect(getComputedStyle(label).transitionProperty).toBe("none");
      await userEvent.click(page.getByRole("button", { name: "Toggle Sidebar", exact: true }));
      await expect.poll(() => getComputedStyle(label).opacity).toBe("0");
    } finally {
      await session.send("Emulation.setEmulatedMedia", { features: [] });
    }
  });

  it("renders the section destinations in the primary header navigation", async () => {
    await renderNavigation("header");
    const navigation = page.getByRole("navigation", { name: "Primary" });
    await expect.element(navigation.getByRole("link")).toHaveLength(4);
    for (const link of sectionLinks) {
      await expect
        .element(navigation.getByRole("link", { name: link.label, exact: true }))
        .toHaveAttribute("href", link.to);
    }
  });

  it("keeps section icons, Overview links, and Collection navigation in the sidebar", async () => {
    const router = await renderNavigation("sidebar");
    const navigation = page.getByRole("navigation", { name: "Registry" });
    for (const link of sectionLinks) {
      const section = navigation.getByRole("button", { name: link.label, exact: true });
      await expect.element(section).toBeVisible();
      expect(section.element().querySelectorAll("svg")).toHaveLength(2);
      await userEvent.click(section);
      await expect
        .element(navigation.getByRole("link", { name: "Overview", exact: true }))
        .toHaveAttribute("href", link.to);
      await userEvent.click(section);
    }
    await userEvent.click(navigation.getByRole("button", { name: "Components", exact: true }));
    await userEvent.click(navigation.getByRole("link", { name: "Button", exact: true }));
    await expect.poll(() => router.state.location.pathname).toBe("/components/button");
  });
});
