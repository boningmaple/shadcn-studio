import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  RouterProvider,
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { http, HttpResponse } from "msw";
import type React from "react";
import { afterEach, beforeEach, describe, expect, vi } from "vite-plus/test";
import { page, userEvent } from "vite-plus/test/browser/context";
import { render } from "vitest-browser-react";

import { searchContract, type SearchHit } from "../api/search.contract";
import { SearchDialogOpenButton } from "../components/search-dialog-open-button";
import { SearchDialogTrigger } from "../components/search-dialog-trigger";
import { searchDebounceMs } from "../hooks/use-search-query";
import { isApplePlatform } from "../lib/platform";
import { it } from "./test-extend";

const noResultsQuery = "noresultquery";
const mockCardHref = "/mock-card";

const mockQuickLinks = [
  { label: "Mock home", to: "/mock-home" },
  { label: "Mock components", to: "/mock-components" },
] as const;

const componentHit = (
  componentName: string,
  href = `/mock-${componentName.toLowerCase()}`,
): SearchHit => ({
  componentName,
  href,
  kind: "component",
  score: 1,
});

const setOnline = (isOnline: boolean) => {
  Object.defineProperty(navigator, "onLine", {
    configurable: true,
    get: () => isOnline,
  });
  window.dispatchEvent(new Event(isOnline ? "online" : "offline"));
};

const requestUrlFromFetchCall = (fetchCall: Parameters<typeof fetch>) => {
  const [input] = fetchCall;

  if (typeof input === "string") {
    return new URL(input, window.location.origin);
  }

  if (input instanceof URL) {
    return new URL(input.href, window.location.origin);
  }

  return new URL(input.url, window.location.origin);
};

function createTestRouterWithQuery(component: () => React.ReactNode) {
  const queryClient = new QueryClient();

  const rootRoute = createRootRoute({
    shellComponent: ({ children }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    ),
  });

  const componentRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/",
    component,
  });

  const mockHomeRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: mockQuickLinks[0].to,
    component: () => null,
  });

  const mockComponentsRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: mockQuickLinks[1].to,
    component: () => null,
  });

  const mockCardRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: mockCardHref,
    component: () => null,
  });

  rootRoute.addChildren([componentRoute, mockHomeRoute, mockComponentsRoute, mockCardRoute]);

  const testRouter = createRouter({
    history: createMemoryHistory({ initialEntries: ["/"] }),
    routeTree: rootRoute,
  });

  return { testRouter, queryClient };
}

async function renderComponent(component: () => React.ReactNode) {
  const { testRouter, queryClient } = createTestRouterWithQuery(component);
  const screen = await render(<RouterProvider router={testRouter} />);

  return { testRouter, queryClient, screen };
}

const searchDialogOpenButton = () => page.getByRole("button", { name: "Search" });
const searchDialogOpenButtons = () =>
  page.getByRole("button", {
    name: "Search",
    includeHidden: true,
  });
const searchDialog = () => page.getByRole("dialog", { name: "Search" });
const searchDialogOverlay = () =>
  page.elementLocator(document.querySelector<HTMLElement>("[data-slot='dialog-overlay']")!);
const searchInput = () => page.getByRole("searchbox", { name: "Search" });
const searchStatus = () => page.getByRole("status");
const quickLinks = () => page.getByRole("menu", { name: "Quick links" });
const hit = (name: string | RegExp) => page.getByRole("menuitem", { name });
const alert = () => page.getByRole("alert");
const noResults = () => page.getByText(/no results for/i);
const tryAgainButton = () => page.getByRole("button", { name: "Try again" });
const queryError = () => page.getByRole("alert");

const renderSearchDialogTrigger = () =>
  renderComponent(() => <SearchDialogTrigger quickLinks={mockQuickLinks} />);

const openSearchDialog = async () => {
  const rendered = renderSearchDialogTrigger();
  await userEvent.click(searchDialogOpenButton());
  await expect.element(searchDialog()).toBeInTheDocument();
  return rendered;
};

const startMockedSearchTimers = () => {
  vi.useFakeTimers({ toFake: ["setTimeout", "clearTimeout"] });
};

const finishSearchDebounce = async () => {
  await vi.advanceTimersByTimeAsync(searchDebounceMs);
  vi.useRealTimers();
};

const focusSearchTriggerWithTab = async () => {
  await renderSearchDialogTrigger();
  await userEvent.tab();
  await expect.element(searchDialogOpenButton()).toHaveFocus();
};

const expectFocusInsideSearchDialog = async () => {
  await expect
    .poll(() => {
      const dialogElement = document.querySelector<HTMLElement>("[data-slot='dialog']");

      return dialogElement?.contains(document.activeElement);
    })
    .toBe(true);
};

beforeEach(async () => {
  await page.viewport(414, 896);
});

afterEach(() => {
  setOnline(true);
  vi.restoreAllMocks();

  if (vi.isFakeTimers()) {
    vi.clearAllTimers();
    vi.useRealTimers();
  }
});

describe("SearchDialogOpenButton", () => {
  describe("Responsiveness", () => {
    it("mobile - exposes only the icon Search button", async () => {
      await renderComponent(() => <SearchDialogOpenButton onPress={() => {}} />);

      const searchButtons = searchDialogOpenButtons();

      await expect.element(searchButtons).toHaveLength(2);
      await expect.element(searchButtons.nth(0)).toBeVisible();
      await expect.element(searchButtons.nth(0)).toHaveAccessibleName("Search");
      await expect.element(searchButtons.nth(1)).not.toBeVisible();
    });

    it("desktop - exposes the full Search button", async () => {
      await page.viewport(1024, 800);
      await renderComponent(() => <SearchDialogOpenButton onPress={() => {}} />);

      const searchButtons = searchDialogOpenButtons();

      await expect.element(searchButtons).toHaveLength(2);
      await expect.element(searchButtons.nth(0)).not.toBeVisible();
      await expect.element(searchButtons.nth(1)).toBeVisible();
      await expect.element(searchButtons.nth(1)).toHaveAccessibleName("Search");
    });
  });

  describe("Critical paths", () => {
    it("mobile - presses the visible Search button", async () => {
      const onPress = vi.fn();

      await renderComponent(() => <SearchDialogOpenButton onPress={onPress} />);
      await userEvent.click(searchDialogOpenButton());

      expect(onPress).toHaveBeenCalledTimes(1);
    });

    it("desktop - presses the visible Search button", async () => {
      const onPress = vi.fn();

      await page.viewport(1024, 800);
      await renderComponent(() => <SearchDialogOpenButton onPress={onPress} />);
      await userEvent.click(searchDialogOpenButton());

      expect(onPress).toHaveBeenCalledTimes(1);
    });
  });
});

describe("SearchDialogTrigger", () => {
  describe("Critical paths", () => {
    it("opens the dialog from the Search button", async () => {
      await renderSearchDialogTrigger();

      await userEvent.click(searchDialogOpenButton());

      await expect.element(searchDialog()).toBeInTheDocument();
    });

    it("opens the dialog from the platform shortcut", async () => {
      await renderSearchDialogTrigger();
      await expect.element(searchDialogOpenButton()).toBeInTheDocument();
      await new Promise((resolve) => setTimeout(resolve, 0));

      await userEvent.keyboard(isApplePlatform() ? "{Meta>}k{/Meta}" : "{Control>}k{/Control}");

      await expect.element(searchDialog()).toBeInTheDocument();
    });

    it("closes the dialog with Escape", async () => {
      await openSearchDialog();

      await userEvent.keyboard("{Escape}");

      await expect.element(searchDialog()).not.toBeInTheDocument();
    });

    it("desktop - closes the dialog from the overlay", async () => {
      await page.viewport(1024, 800);
      await openSearchDialog();

      await userEvent.click(searchDialogOverlay(), {});

      await expect.element(searchDialog()).not.toBeInTheDocument();
    });
  });
});

describe("SearchDialog", () => {
  describe("Critical paths", () => {
    it("shows supplied quick links before a query", async () => {
      await openSearchDialog();

      await expect.element(searchInput()).toHaveValue("");
      await expect.element(quickLinks()).toBeInTheDocument();
      await expect.element(hit(mockQuickLinks[0].label)).toBeInTheDocument();
      await expect.element(hit(mockQuickLinks[1].label)).toBeInTheDocument();
    });

    it("keeps supplied quick links visible until the first search finishes", async () => {
      await openSearchDialog();
      startMockedSearchTimers();

      await userEvent.keyboard("c");

      await expect.element(searchInput()).toHaveValue("c");
      await expect.element(quickLinks()).toBeInTheDocument();
      await expect.element(searchStatus()).toHaveTextContent("Searching");
      await finishSearchDebounce();
      await expect.element(hit("Combobox")).toBeInTheDocument();
      await expect.element(quickLinks()).not.toBeInTheDocument();
    });

    it("closes from search results without flashing quick links", async () => {
      await openSearchDialog();
      startMockedSearchTimers();
      await userEvent.keyboard("c");
      await finishSearchDebounce();
      await expect.element(hit("Combobox")).toBeInTheDocument();

      await userEvent.keyboard("{Escape}");

      await expect.element(quickLinks(), { timeout: 0 }).not.toBeInTheDocument();
      await expect.element(searchDialog()).not.toBeInTheDocument();
    });

    it("reopens with an empty input and supplied quick links after a search", async () => {
      await openSearchDialog();
      startMockedSearchTimers();
      await userEvent.keyboard("c");
      await finishSearchDebounce();
      await expect.element(hit("Combobox")).toBeInTheDocument();

      await userEvent.keyboard("{Escape}");
      await userEvent.click(searchDialogOpenButton());

      await expect.element(searchInput()).toHaveValue("");
      await expect.element(quickLinks()).toBeInTheDocument();
      await expect.element(hit(mockQuickLinks[0].label)).toBeInTheDocument();
    });

    it("requests only the final debounced query after fast typing", async () => {
      const fetchSpy = vi.spyOn(globalThis, "fetch");

      await openSearchDialog();
      startMockedSearchTimers();
      await userEvent.keyboard("c");
      await expect.element(quickLinks()).toBeInTheDocument();
      await userEvent.keyboard("a");
      await expect.element(quickLinks()).toBeInTheDocument();
      await userEvent.keyboard("r");
      await expect.element(quickLinks()).toBeInTheDocument();
      await userEvent.keyboard("d");
      await expect.element(quickLinks()).toBeInTheDocument();
      await finishSearchDebounce();
      await expect.element(hit("Card")).toBeInTheDocument();

      const requestUrl = requestUrlFromFetchCall(fetchSpy.mock.calls[0]!);
      expect(requestUrl.searchParams.get("q")).toBe("card");
      expect(fetchSpy).toHaveBeenCalledTimes(1);
    });

    it("reuses cached results for the same query", async () => {
      const fetchSpy = vi.spyOn(globalThis, "fetch");

      await openSearchDialog();
      startMockedSearchTimers();
      await userEvent.fill(searchInput(), "card");
      await finishSearchDebounce();
      await expect.element(hit("Card")).toBeInTheDocument();

      await userEvent.keyboard("{Escape}");
      await userEvent.click(searchDialogOpenButton());
      await userEvent.fill(searchInput(), "card");

      await expect.element(hit("Card")).toBeInTheDocument();
      expect(fetchSpy).toHaveBeenCalledTimes(1);
    });

    it("selects a result and closes the dialog", async () => {
      const { testRouter: router } = await openSearchDialog();
      startMockedSearchTimers();
      await userEvent.fill(searchInput(), "card");
      await finishSearchDebounce();

      await userEvent.click(hit("Card"));

      await expect.element(searchDialog()).not.toBeInTheDocument();
      await expect.poll(() => router.state.location.pathname).toBe(mockCardHref);
    });

    it("selects a supplied quick link and closes the dialog", async () => {
      const { testRouter: router } = await openSearchDialog();

      await userEvent.click(hit(mockQuickLinks[0].label));

      await expect.element(searchDialog()).not.toBeInTheDocument();
      await expect.poll(() => router.state.location.pathname).toBe(mockQuickLinks[0].to);
    });
  });

  describe("States and error handling", () => {
    it("marks an overlength query invalid without asking the Server Route", async () => {
      const fetchSpy = vi.spyOn(globalThis, "fetch");
      await openSearchDialog();
      const requestsBeforeInput = fetchSpy.mock.calls.length;

      await userEvent.fill(searchInput(), "x".repeat(201));

      await expect.element(searchInput()).toHaveAttribute("aria-invalid", "true");
      await expect.element(queryError()).toHaveAttribute("role", "alert");
      await expect.element(queryError()).toBeVisible();
      expect(fetchSpy.mock.calls).toHaveLength(requestsBeforeInput);
    });

    it("clears the input error and searches after the query is shortened", async () => {
      await openSearchDialog();
      await userEvent.fill(searchInput(), "x".repeat(201));
      await expect.element(queryError()).toBeVisible();

      startMockedSearchTimers();
      await userEvent.fill(searchInput(), "card");

      await expect.element(searchInput()).not.toHaveAttribute("aria-invalid");
      await expect.element(queryError()).not.toBeInTheDocument();
      await finishSearchDebounce();
      await expect.element(hit("Card")).toBeInTheDocument();
    });

    it("shows the input error for a contracted query-length rejection", async ({ worker }) => {
      worker.use(
        http.get(searchContract.path, () =>
          HttpResponse.json({ error: "search_query_too_long" }, { status: 400 }),
        ),
      );

      await openSearchDialog();
      startMockedSearchTimers();
      await userEvent.fill(searchInput(), "card");
      await finishSearchDebounce();

      await expect.element(searchInput()).toHaveAttribute("aria-invalid", "true");
      await expect.element(queryError()).toBeVisible();
    });

    it("treats a malformed-query rejection as an integration failure", async ({ worker }) => {
      worker.use(
        http.get(searchContract.path, () =>
          HttpResponse.json({ error: "invalid_search_query" }, { status: 400 }),
        ),
      );

      await openSearchDialog();
      startMockedSearchTimers();
      await userEvent.fill(searchInput(), "card");
      await finishSearchDebounce();

      await expect.element(searchInput()).not.toHaveAttribute("aria-invalid");
      await expect.element(alert()).toHaveTextContent(/could not be reached/i);
    });

    it("shows a no-results message for an empty hit list", async () => {
      await openSearchDialog();
      startMockedSearchTimers();

      await userEvent.fill(searchInput(), noResultsQuery);
      await finishSearchDebounce();

      await expect.element(noResults()).toHaveTextContent(noResultsQuery);
    });

    it("shows a retryable alert after a failed search", async ({ worker }) => {
      worker.use(http.get(searchContract.path, () => HttpResponse.json([], { status: 500 })));

      await openSearchDialog();
      startMockedSearchTimers();
      await userEvent.fill(searchInput(), "card");
      await finishSearchDebounce();

      await expect.element(alert()).toHaveTextContent(/could not be reached/i);
      await expect.element(tryAgainButton()).toBeEnabled();
    });

    it("retries a failed query when Try again is pressed", async ({ worker }) => {
      let cardRequests = 0;

      worker.use(
        http.get(searchContract.path, () => {
          cardRequests += 1;

          if (cardRequests === 1) {
            return HttpResponse.json([], { status: 500 });
          }

          return HttpResponse.json([componentHit("Card", mockCardHref)]);
        }),
      );

      await openSearchDialog();
      startMockedSearchTimers();
      await userEvent.fill(searchInput(), "card");
      await finishSearchDebounce();
      await expect.element(alert()).toHaveTextContent(/could not be reached/i);

      startMockedSearchTimers();
      await userEvent.click(tryAgainButton());
      await finishSearchDebounce();

      await expect.element(hit("Card")).toBeInTheDocument();
      await expect.element(alert()).not.toBeInTheDocument();
      expect(cardRequests).toBe(2);
    });

    it("keeps the alert visible and disables retry while retrying", async ({ worker }) => {
      let cardRequests = 0;

      worker.use(
        http.get(searchContract.path, () => {
          cardRequests += 1;

          if (cardRequests === 1) {
            return HttpResponse.json([], { status: 500 });
          }

          return HttpResponse.json([componentHit("Card", mockCardHref)]);
        }),
      );

      await openSearchDialog();
      startMockedSearchTimers();
      await userEvent.fill(searchInput(), "card");
      await finishSearchDebounce();
      await expect.element(alert()).toHaveTextContent(/could not be reached/i);

      startMockedSearchTimers();
      await userEvent.click(tryAgainButton());

      await expect.element(tryAgainButton()).toBeDisabled();
      await expect.element(alert()).toHaveTextContent(/could not be reached/i);
      await expect.element(hit("Card")).not.toBeInTheDocument();
      await finishSearchDebounce();
      await expect.element(hit("Card")).toBeInTheDocument();
    });

    it("shows no-network state without sending a request when no cache exists", async () => {
      const fetchSpy = vi.spyOn(globalThis, "fetch");

      await openSearchDialog();
      setOnline(false);
      await userEvent.fill(searchInput(), "card");

      await expect.element(alert()).toHaveTextContent(/no network/i);
      expect(fetchSpy).not.toHaveBeenCalled();
    });

    it("shows cached hit data while offline", async () => {
      await openSearchDialog();
      startMockedSearchTimers();
      await userEvent.fill(searchInput(), "card");
      await finishSearchDebounce();
      await expect.element(hit("Card")).toBeInTheDocument();

      await userEvent.keyboard("{Escape}");
      await expect.element(searchDialog()).not.toBeInTheDocument();
      setOnline(false);
      await userEvent.click(searchDialogOpenButton());
      await userEvent.fill(searchInput(), "card");

      await expect.element(hit("Card")).toBeInTheDocument();
    });

    it("runs the pending query once the browser comes back online", async () => {
      await openSearchDialog();
      setOnline(false);
      await userEvent.fill(searchInput(), "card");
      await expect.element(alert()).toBeInTheDocument();

      startMockedSearchTimers();
      setOnline(true);
      await finishSearchDebounce();

      await expect.element(hit("Card")).toBeInTheDocument();
      await expect.element(alert()).not.toBeInTheDocument();
    });
  });

  describe("Edge cases", () => {
    it("keeps whitespace-only input local and does not search", async () => {
      const fetchSpy = vi.spyOn(globalThis, "fetch");

      await openSearchDialog();
      await userEvent.fill(searchInput(), "    ");

      await expect.element(searchInput()).toHaveValue("    ");
      await expect.element(quickLinks()).toBeInTheDocument();
      expect(fetchSpy).not.toHaveBeenCalled();
    });

    it("trims the query before requesting results", async () => {
      const fetchSpy = vi.spyOn(globalThis, "fetch");
      const { queryClient } = await openSearchDialog();

      startMockedSearchTimers();
      await userEvent.fill(searchInput(), " card ");
      await finishSearchDebounce();
      await expect.element(hit("Card")).toBeInTheDocument();

      const requestUrl = requestUrlFromFetchCall(fetchSpy.mock.calls[0]!);
      const searchQueryKeys = queryClient
        .getQueryCache()
        .getAll()
        .map((query) => query.queryKey)
        .filter((queryKey) => queryKey[0] === "search");

      expect(requestUrl.searchParams.get("q")).toBe("card");
      expect(searchQueryKeys).toContainEqual(["search", "card"]);
      expect(searchQueryKeys).not.toContainEqual(["search", " card "]);
    });

    it("hides old results when a new search starts after clearing the input", async () => {
      await openSearchDialog();
      startMockedSearchTimers();
      await userEvent.fill(searchInput(), "c");
      await finishSearchDebounce();
      await expect.element(hit("Combobox")).toBeInTheDocument();

      await userEvent.fill(searchInput(), "");
      await expect.element(quickLinks()).toBeInTheDocument();

      startMockedSearchTimers();
      await userEvent.fill(searchInput(), "card");
      await expect.element(quickLinks()).toBeInTheDocument();
      await expect.element(hit("Combobox"), { timeout: 0 }).not.toBeInTheDocument();
      await finishSearchDebounce();
      await expect.element(hit("Card")).toBeInTheDocument();
    });

    it("keeps previous no-results copy while the next query loads", async () => {
      await openSearchDialog();
      startMockedSearchTimers();
      await userEvent.fill(searchInput(), noResultsQuery);
      await finishSearchDebounce();
      await expect.element(noResults()).toBeInTheDocument();

      startMockedSearchTimers();
      await userEvent.fill(searchInput(), "card");
      await expect.element(noResults()).toHaveTextContent(noResultsQuery);
      await finishSearchDebounce();
      await expect.element(hit("Card")).toBeInTheDocument();
      await expect.element(noResults(), { timeout: 0 }).not.toBeInTheDocument();
    });
  });
});

describe("Search - Accessibility", () => {
  it("opens from the focused Search trigger with Enter", async () => {
    await focusSearchTriggerWithTab();

    await userEvent.keyboard("{Enter}");

    await expect.element(searchDialog()).toBeInTheDocument();
  });

  it("opens from the focused Search trigger with Space", async () => {
    await focusSearchTriggerWithTab();

    await userEvent.keyboard(" ");

    await expect.element(searchDialog()).toBeInTheDocument();
  });

  it("moves focus into the searchbox when opened", async () => {
    await renderSearchDialogTrigger();

    await userEvent.click(searchDialogOpenButton());

    await expect.element(searchInput()).toHaveFocus();
  });

  it("moves focus into the searchbox after keyboard open", async () => {
    await focusSearchTriggerWithTab();

    await userEvent.keyboard("{Enter}");

    await expect.element(searchInput()).toHaveFocus();
  });

  it("keeps Tab focus inside the dialog while open", async () => {
    await openSearchDialog();

    await userEvent.tab();
    await expectFocusInsideSearchDialog();

    await userEvent.tab();
    await expectFocusInsideSearchDialog();
  });

  it("keeps Shift+Tab focus inside the dialog while open", async () => {
    await openSearchDialog();

    await userEvent.tab({ shift: true });
    await expectFocusInsideSearchDialog();

    await userEvent.tab({ shift: true });
    await expectFocusInsideSearchDialog();
  });

  it("moves through quick links with ArrowDown and ArrowUp", async () => {
    await openSearchDialog();

    await userEvent.keyboard("{ArrowDown}");
    await expect.element(hit(mockQuickLinks[0].label)).toHaveAttribute("data-focused", "true");

    await userEvent.keyboard("{ArrowDown}");
    await expect.element(hit(mockQuickLinks[1].label)).toHaveAttribute("data-focused", "true");

    await userEvent.keyboard("{ArrowUp}");
    await expect.element(hit(mockQuickLinks[0].label)).toHaveAttribute("data-focused", "true");
  });

  it("opens the focused quick link with Enter", async () => {
    const { testRouter: router } = await openSearchDialog();

    await userEvent.keyboard("{ArrowDown}");
    await expect.element(hit(mockQuickLinks[0].label)).toHaveAttribute("data-focused", "true");
    await userEvent.keyboard("{Enter}");

    await expect.element(searchDialog()).not.toBeInTheDocument();
    await expect.poll(() => router.state.location.pathname).toBe(mockQuickLinks[0].to);
  });

  it("moves through results with ArrowDown and ArrowUp", async () => {
    await openSearchDialog();
    startMockedSearchTimers();
    await userEvent.keyboard("c");
    await finishSearchDebounce();
    await expect.element(hit("Card")).toBeInTheDocument();

    await userEvent.keyboard("{ArrowDown}");
    await expect.element(hit("Card")).toHaveAttribute("data-focused", "true");

    await userEvent.keyboard("{ArrowDown}");
    await expect.element(hit("Calendar")).toHaveAttribute("data-focused", "true");

    await userEvent.keyboard("{ArrowUp}");
    await expect.element(hit("Card")).toHaveAttribute("data-focused", "true");
  });

  it("opens the focused search result with Enter", async () => {
    const { testRouter: router } = await openSearchDialog();
    startMockedSearchTimers();
    await userEvent.keyboard("card");
    await finishSearchDebounce();
    await expect.element(hit("Card")).toBeInTheDocument();

    await userEvent.keyboard("{ArrowDown}");
    await expect.element(hit("Card")).toHaveAttribute("data-focused", "true");
    await userEvent.keyboard("{Enter}");

    await expect.element(searchDialog()).not.toBeInTheDocument();
    await expect.poll(() => router.state.location.pathname).toBe(mockCardHref);
  });

  it("announces loading and final result count", async () => {
    await openSearchDialog();
    startMockedSearchTimers();

    await userEvent.keyboard("card");

    await expect.element(searchStatus()).toHaveTextContent("Searching");
    await finishSearchDebounce();
    await expect.element(searchStatus()).toHaveTextContent("1 result for card");
  });

  it("announces failed search and retry progress", async ({ worker }) => {
    let cardRequests = 0;

    worker.use(
      http.get(searchContract.path, () => {
        cardRequests += 1;

        if (cardRequests === 1) {
          return HttpResponse.json([], { status: 500 });
        }

        return HttpResponse.json([componentHit("Card", mockCardHref)]);
      }),
    );

    await openSearchDialog();
    startMockedSearchTimers();
    await userEvent.keyboard("card");

    await expect.element(searchStatus()).toHaveTextContent("Searching");
    await finishSearchDebounce();
    await expect.element(searchStatus()).toHaveTextContent("The search could not be reached");

    startMockedSearchTimers();
    await userEvent.click(tryAgainButton());

    await expect.element(searchStatus()).toHaveTextContent("Searching");
    await expect.element(tryAgainButton()).toBeDisabled();

    await finishSearchDebounce();
    await expect.element(searchStatus()).toHaveTextContent("1 result for card");
  });

  it("announces offline state", async () => {
    await openSearchDialog();
    setOnline(false);

    await userEvent.keyboard("card");

    await expect.element(searchStatus()).toHaveTextContent("No network");
    await expect.element(alert()).toHaveTextContent(/no network/i);
  });

  it("returns focus to the trigger when Escape closes the dialog", async () => {
    await focusSearchTriggerWithTab();
    await userEvent.keyboard("{Enter}");
    await expect.element(searchInput()).toHaveFocus();

    await userEvent.keyboard("{Escape}");

    await expect.element(searchDialog()).not.toBeInTheDocument();
    await expect.element(searchDialogOpenButton()).toHaveFocus();
  });
});

describe("Search - ARIA snapshots", () => {
  it("mobile - matches the trigger ARIA snapshot", async () => {
    await renderComponent(() => <SearchDialogOpenButton onPress={() => {}} />);

    await expect.element(searchDialogOpenButton()).toMatchAriaInlineSnapshot(`
      - button "Search"
    `);
  });

  it("desktop - matches the trigger ARIA snapshot", async () => {
    await page.viewport(1024, 800);
    await renderComponent(() => <SearchDialogOpenButton onPress={() => {}} />);

    await expect.element(searchDialogOpenButton()).toMatchAriaInlineSnapshot(`
      - button "Search"
    `);
  });

  it("matches the opened palette ARIA snapshot", async () => {
    await openSearchDialog();

    await expect.element(searchDialog()).toMatchAriaInlineSnapshot(`
      - dialog "Search":
        - heading "Search" [level=2]
        - text: Find a Component or a Demo and go straight to it.
        - group:
          - searchbox "Search"
          - group
        - status
        - menu "Quick links":
          - group "Go to":
            - text: Go to
            - menuitem "Mock home"
            - menuitem "Mock components"
    `);
  });

  it("matches the search results ARIA snapshot", async () => {
    await openSearchDialog();
    startMockedSearchTimers();
    await userEvent.fill(searchInput(), "card");
    await finishSearchDebounce();

    await expect.element(searchDialog()).toMatchAriaInlineSnapshot(`
      - dialog "Search":
        - heading "Search" [level=2]
        - text: Find a Component or a Demo and go straight to it.
        - group:
          - searchbox "Search": card
          - group
        - status: 1 result for card
        - menu "Search results":
          - menuitem "Card"
    `);
  });
});
