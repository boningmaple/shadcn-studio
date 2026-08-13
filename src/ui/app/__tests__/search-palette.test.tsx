import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  RouterProvider,
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vite-plus/test";
import { page, userEvent } from "vite-plus/test/browser/context";
import { render } from "vitest-browser-react";

import type { Hit } from "@/search/hits";
import {
  SearchTrigger,
  searchDialogTitle,
  searchTriggerLabel,
} from "@/ui/app/search-palette";
import { searchDebounceMs } from "@/ui/app/use-search";

/**
 * One pending search, held open so a test can decide when — and in what order
 * — it answers. The choreography this palette exists to get right is entirely
 * about timing, so nothing here resolves on its own.
 */
type PendingSearch = {
  fail: () => void;
  query: string;
  resolveWith: (hits: Hit[]) => void;
  signal: AbortSignal;
};

let searches: PendingSearch[] = [];

const componentHit = (componentName: string): Hit => ({
  componentName,
  href: `/material-design/components/${componentName.toLowerCase()}`,
  kind: "component",
  score: 1,
});

const demoHit = (componentName: string, demoName: string): Hit => ({
  componentName,
  demoName,
  href: `/material-design/components/${componentName.toLowerCase()}#demo`,
  kind: "demo",
  score: 1,
});

const allComponents = ["Avatar", "Button", "Card"].map(componentHit);

beforeEach(() => {
  searches = [];

  // Typed to what the palette actually passes: a URL string and a signal.
  vi.stubGlobal("fetch", (input: string, init?: RequestInit) => {
    const url = new URL(input, window.location.origin);
    const signal = init?.signal ?? new AbortController().signal;

    return new Promise<Response>((resolve, reject) => {
      const respond = (body: string, status: number) =>
        resolve(
          new Response(body, {
            headers: { "content-type": "application/json" },
            status,
          }),
        );

      signal.addEventListener("abort", () =>
        reject(new DOMException("Aborted", "AbortError")),
      );

      searches.push({
        fail: () => respond("", 500),
        query: url.searchParams.get("q") ?? "",
        resolveWith: (hits) => respond(JSON.stringify(hits), 200),
        signal,
      });
    });
  });
});

afterEach(() => {
  vi.unstubAllGlobals();
});

const renderTrigger = () => {
  // One cache per test. A client shared across tests would answer the next
  // test's first query from the previous one's Hits, and the request these
  // tests count would never be made.
  const queryClient = new QueryClient();

  const rootRoute = createRootRoute({
    component: () => (
      <QueryClientProvider client={queryClient}>
        <SearchTrigger />
      </QueryClientProvider>
    ),
  });

  const router = createRouter({
    history: createMemoryHistory({ initialEntries: ["/"] }),
    routeTree: rootRoute.addChildren([
      createRoute({ getParentRoute: () => rootRoute, path: "/" }),
    ]),
  });

  return render(<RouterProvider router={router as never} />);
};

const palette = () => page.getByRole("dialog", { name: searchDialogTitle });
const searchTrigger = () =>
  page.getByRole("button", { name: searchTriggerLabel });
const searchInput = () => page.getByRole("searchbox");
const hitsList = () => page.getByRole("menu", { name: "Search results" });
const hit = (name: string | RegExp) => page.getByRole("menuitem", { name });

/** Opens the palette the way a visitor does, from the header. */
const openPalette = async () => {
  const screen = renderTrigger();

  await userEvent.click(searchTrigger());
  await expect.element(palette()).toBeInTheDocument();

  return screen;
};

/** Waits past the debounce window, so a settled query has had its chance. */
const afterDebounce = () =>
  new Promise((resolve) => setTimeout(resolve, searchDebounceMs * 2));

const searchesFor = (query: string) =>
  searches.filter((search) => search.query === query);

describe("SearchPalette idle", () => {
  it("lists every Component before anything is typed", async () => {
    await openPalette();

    await expect.poll(() => searchesFor("").length).toBe(1);
    searchesFor("")[0]!.resolveWith(allComponents);

    await expect.element(hitsList()).toBeInTheDocument();
    for (const component of allComponents) {
      await expect.element(hit(component.componentName)).toBeInTheDocument();
    }
  });

  it("names a Demo Hit with the Component it belongs to", async () => {
    await openPalette();
    await expect.poll(() => searchesFor("").length).toBe(1);
    searchesFor("")[0]!.resolveWith([demoHit("Card", "Elevated checklist")]);

    await expect
      .element(hit("Elevated checklist, in Card"))
      .toBeInTheDocument();
  });

  it("asks nothing until it is opened", async () => {
    await renderTrigger();

    await afterDebounce();

    expect(searches).toHaveLength(0);
  });
});

describe("SearchPalette request choreography", () => {
  it("collapses a burst of keystrokes into one request", async () => {
    await openPalette();
    await expect.poll(() => searchesFor("").length).toBe(1);
    searchesFor("")[0]!.resolveWith(allComponents);

    await userEvent.fill(searchInput(), "card");
    await afterDebounce();

    expect(searches.map((search) => search.query)).toEqual(["", "card"]);
  });

  it("searches on a single character", async () => {
    await openPalette();
    await expect.poll(() => searchesFor("").length).toBe(1);

    await userEvent.fill(searchInput(), "c");

    await expect.poll(() => searchesFor("c").length).toBe(1);
  });

  it("aborts a request it supersedes", async () => {
    await openPalette();
    await expect.poll(() => searchesFor("").length).toBe(1);

    await userEvent.fill(searchInput(), "car");
    await expect.poll(() => searchesFor("car").length).toBe(1);

    await userEvent.fill(searchInput(), "card");
    await expect.poll(() => searchesFor("card").length).toBe(1);

    await expect.poll(() => searchesFor("car")[0]!.signal.aborted).toBe(true);
    expect(searchesFor("card")[0]!.signal.aborted).toBe(false);
  });

  it("gives up on the idle list the moment the visitor types", async () => {
    await openPalette();
    await expect.poll(() => searchesFor("").length).toBe(1);

    // Typed while the idle list is still in flight, and answered inside the
    // debounce window — the moment a debounced key would still have been "",
    // painting the idle list as though it answered "button". Two lists in
    // ~150ms costs more than a flicker: react-aria drops its focused Hit when
    // the one it was on disappears, leaving Enter nothing to land on.
    await userEvent.fill(searchInput(), "button");
    searchesFor("")[0]!.resolveWith(allComponents);

    await afterDebounce();

    await expect.element(hit("Avatar")).not.toBeInTheDocument();
    expect(searchesFor("")[0]!.signal.aborted).toBe(true);
  });

  it("never paints a superseded response that resolves late", async () => {
    await openPalette();
    await expect.poll(() => searchesFor("").length).toBe(1);
    searchesFor("")[0]!.resolveWith(allComponents);
    await expect.element(hit("Avatar")).toBeInTheDocument();

    await userEvent.fill(searchInput(), "car");
    await expect.poll(() => searchesFor("car").length).toBe(1);

    await userEvent.fill(searchInput(), "card");
    await expect.poll(() => searchesFor("card").length).toBe(1);

    // The newer query answers first, then the one it superseded resolves —
    // the case an abort alone does not cover.
    searchesFor("card")[0]!.resolveWith([componentHit("Card")]);
    await expect.element(hit("Card")).toBeInTheDocument();

    searchesFor("car")[0]!.resolveWith([componentHit("Carousel")]);
    await afterDebounce();

    await expect.element(hit("Card")).toBeInTheDocument();
    await expect.element(hit("Carousel")).not.toBeInTheDocument();
  });

  it("reopens on the Hits it already has, without asking again", async () => {
    await openPalette();
    await expect.poll(() => searchesFor("").length).toBe(1);
    searchesFor("")[0]!.resolveWith(allComponents);
    await expect.element(hit("Avatar")).toBeInTheDocument();

    await userEvent.keyboard("{Escape}");
    await expect.element(palette()).not.toBeInTheDocument();

    await userEvent.click(searchTrigger());

    await expect.element(hit("Avatar")).toBeInTheDocument();
    await afterDebounce();
    expect(searchesFor("")).toHaveLength(1);
  });
});

describe("SearchPalette states", () => {
  it("keeps the previous Hits while the next query is in flight", async () => {
    await openPalette();
    await expect.poll(() => searchesFor("").length).toBe(1);
    searchesFor("")[0]!.resolveWith(allComponents);
    await expect.element(hit("Avatar")).toBeInTheDocument();

    await userEvent.fill(searchInput(), "card");
    await expect.poll(() => searchesFor("card").length).toBe(1);

    // Still the old list, not a blank one, while the new query loads.
    await expect.element(hit("Avatar")).toBeInTheDocument();
    await expect
      .element(page.getByRole("status"))
      .toHaveTextContent(/searching/i);

    searchesFor("card")[0]!.resolveWith([componentHit("Card")]);
    await expect.element(hit("Avatar")).not.toBeInTheDocument();
  });

  it("says plainly when a query matches nothing, and names it", async () => {
    await openPalette();
    await expect.poll(() => searchesFor("").length).toBe(1);
    searchesFor("")[0]!.resolveWith(allComponents);

    await userEvent.fill(searchInput(), "stroopwafel");
    await expect.poll(() => searchesFor("stroopwafel").length).toBe(1);
    searchesFor("stroopwafel")[0]!.resolveWith([]);

    await expect
      .element(page.getByText(/no results for/i))
      .toHaveTextContent("stroopwafel");
  });

  it("offers a retry that re-runs the current query after a failure", async () => {
    await openPalette();
    await expect.poll(() => searchesFor("").length).toBe(1);
    searchesFor("")[0]!.resolveWith(allComponents);

    await userEvent.fill(searchInput(), "card");
    await expect.poll(() => searchesFor("card").length).toBe(1);
    searchesFor("card")[0]!.fail();

    const alert = page.getByRole("alert");
    await expect.element(alert).toBeInTheDocument();

    await userEvent.click(page.getByRole("button", { name: "Try again" }));

    await expect.poll(() => searchesFor("card").length).toBe(2);
    searchesFor("card")[1]!.resolveWith([componentHit("Card")]);

    await expect.element(hit("Card")).toBeInTheDocument();
    await expect.element(alert).not.toBeInTheDocument();
  });

  it("says so once, rather than retrying a failure behind the visitor", async () => {
    await openPalette();
    await expect.poll(() => searchesFor("").length).toBe(1);
    searchesFor("")[0]!.fail();

    await expect.element(page.getByRole("alert")).toBeInTheDocument();
    await afterDebounce();

    expect(searchesFor("")).toHaveLength(1);
  });
});

describe("SearchPalette a11y", () => {
  it("is a dialog with a name", async () => {
    await openPalette();

    await expect.element(palette()).toBeInTheDocument();
  });

  it("moves focus into the palette on open", async () => {
    await openPalette();

    await expect.element(searchInput()).toHaveFocus();
  });

  it("conveys how many Hits there are as results change", async () => {
    await openPalette();
    await expect.poll(() => searchesFor("").length).toBe(1);
    searchesFor("")[0]!.resolveWith(allComponents);

    const status = page.getByRole("status");
    await expect.element(status).toHaveTextContent("3 results");

    await userEvent.fill(searchInput(), "card");
    await expect.poll(() => searchesFor("card").length).toBe(1);
    searchesFor("card")[0]!.resolveWith([componentHit("Card")]);

    await expect.element(status).toHaveTextContent("1 result for card");
  });
});

describe("SearchPalette navigation", () => {
  it("closes once a Hit has been chosen", async () => {
    await openPalette();
    await expect.poll(() => searchesFor("").length).toBe(1);
    // The one route this memory router has, so choosing it navigates rather
    // than landing on a route the test tree does not define.
    searchesFor("")[0]!.resolveWith([{ ...componentHit("Card"), href: "/" }]);

    await userEvent.click(hit("Card"));

    await expect.element(palette()).not.toBeInTheDocument();
  });
});
