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
import { SearchPalette } from "@/ui/app/search-palette";
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

  vi.stubGlobal("fetch", (input: RequestInfo | URL, init?: RequestInit) => {
    const url = new URL(String(input), window.location.origin);
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

const rootRoute = createRootRoute({
  component: () => <SearchPalette isOpen onOpenChange={() => {}} />,
});

const renderPalette = () => {
  const router = createRouter({
    history: createMemoryHistory({ initialEntries: ["/"] }),
    routeTree: rootRoute.addChildren([
      createRoute({ getParentRoute: () => rootRoute, path: "/" }),
    ]),
  });

  return render(<RouterProvider router={router as never} />);
};

const searchInput = () => page.getByRole("searchbox");
const hitsList = () => page.getByRole("menu", { name: "Search results" });
const hit = (name: string | RegExp) => page.getByRole("menuitem", { name });

/** Waits past the debounce window, so a settled query has had its chance. */
const afterDebounce = () =>
  new Promise((resolve) => setTimeout(resolve, searchDebounceMs * 2));

const searchesFor = (query: string) =>
  searches.filter((search) => search.query === query);

describe("SearchPalette idle", () => {
  it("lists every Component before anything is typed", async () => {
    await renderPalette();

    await expect.poll(() => searchesFor("").length).toBe(1);
    searchesFor("")[0]!.resolveWith(allComponents);

    await expect.element(hitsList()).toBeInTheDocument();
    for (const component of allComponents) {
      await expect.element(hit(component.componentName)).toBeInTheDocument();
    }
  });

  it("names a Demo Hit with the Component it belongs to", async () => {
    await renderPalette();
    await expect.poll(() => searchesFor("").length).toBe(1);
    searchesFor("")[0]!.resolveWith([demoHit("Card", "Elevated checklist")]);

    await expect
      .element(hit("Elevated checklist, in Card"))
      .toBeInTheDocument();
  });
});

describe("SearchPalette request choreography", () => {
  it("collapses a burst of keystrokes into one request", async () => {
    await renderPalette();
    await expect.poll(() => searchesFor("").length).toBe(1);
    searchesFor("")[0]!.resolveWith(allComponents);

    await userEvent.fill(searchInput(), "card");
    await afterDebounce();

    expect(searches.map((search) => search.query)).toEqual(["", "card"]);
  });

  it("searches on a single character", async () => {
    await renderPalette();
    await expect.poll(() => searchesFor("").length).toBe(1);

    await userEvent.fill(searchInput(), "c");

    await expect.poll(() => searchesFor("c").length).toBe(1);
  });

  it("aborts a request it supersedes", async () => {
    await renderPalette();
    await expect.poll(() => searchesFor("").length).toBe(1);

    await userEvent.fill(searchInput(), "car");
    await expect.poll(() => searchesFor("car").length).toBe(1);

    await userEvent.fill(searchInput(), "card");
    await expect.poll(() => searchesFor("card").length).toBe(1);

    expect(searchesFor("car")[0]!.signal.aborted).toBe(true);
    expect(searchesFor("card")[0]!.signal.aborted).toBe(false);
  });

  it("never paints a superseded response that resolves late", async () => {
    await renderPalette();
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
});

describe("SearchPalette states", () => {
  it("keeps the previous Hits while the next query is in flight", async () => {
    await renderPalette();
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
    await renderPalette();
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
    await renderPalette();
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
});

describe("SearchPalette a11y", () => {
  it("is a dialog with a name", async () => {
    await renderPalette();

    await expect
      .element(page.getByRole("dialog", { name: "Search" }))
      .toBeInTheDocument();
  });

  it("moves focus into the palette on open", async () => {
    await renderPalette();

    await expect.element(searchInput()).toHaveFocus();
  });

  it("conveys how many Hits there are as results change", async () => {
    await renderPalette();
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
