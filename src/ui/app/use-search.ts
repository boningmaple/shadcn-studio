import * as React from "react";

import { hitsSchema, searchRequestUrl, type Hit } from "@/search/hits";

/**
 * Long enough that a burst of typing is one request, short enough that the
 * list does not feel like it lags behind the keyboard.
 */
export const searchDebounceMs = 150;

export type SearchStatus = "loading" | "ready" | "failed";

export type SearchState = {
  /**
   * What is on screen. Kept from the previous query while a new one is in
   * flight: blanking the list at a 150ms debounce reads as flicker.
   */
  hits: Hit[];
  /** The query `hits` came from, so a message can name it. */
  query: string;
  status: SearchStatus;
};

const initialState: SearchState = {
  hits: [],
  query: "",
  status: "loading",
};

/**
 * Runs one search per settled query and guards against every way a stale one
 * can win.
 *
 * Aborting a superseded request is not enough on its own: it can resolve
 * before its abort lands, painting Hits for a query the visitor has already
 * typed past. So each response is checked against what is currently typed and
 * dropped if it no longer matches — the defect most likely to ship unnoticed
 * and be very hard to reproduce afterwards.
 */
export function useSearch(query: string): {
  retry: () => void;
  search: SearchState;
} {
  const settledQuery = useDebounced(query, searchDebounceMs);
  const [attempt, setAttempt] = React.useState(0);
  const [search, setSearch] = React.useState(initialState);

  // What the visitor has typed right now, readable from a promise that
  // resolves long after the render it was started in.
  const typedQuery = React.useRef(query);
  React.useEffect(() => {
    typedQuery.current = query;
  });

  React.useEffect(() => {
    const controller = new AbortController();
    setSearch((previous) => ({ ...previous, status: "loading" }));

    const run = async () => {
      try {
        const response = await fetch(searchRequestUrl(settledQuery), {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Search failed with status ${response.status}`);
        }

        const hits = hitsSchema.parse(await response.json());

        if (typedQuery.current !== settledQuery) {
          return;
        }

        setSearch({ hits, query: settledQuery, status: "ready" });
      } catch {
        if (controller.signal.aborted || typedQuery.current !== settledQuery) {
          return;
        }

        setSearch((previous) => ({ ...previous, status: "failed" }));
      }
    };

    void run();

    return () => controller.abort();
  }, [attempt, settledQuery]);

  const retry = React.useCallback(() => setAttempt((count) => count + 1), []);

  return { retry, search };
}

/**
 * The value once it stops changing. Equal to the input on the first render, so
 * opening the palette fetches the idle list without waiting out a debounce.
 */
function useDebounced(value: string, delayMs: number): string {
  const [debounced, setDebounced] = React.useState(value);

  React.useEffect(() => {
    if (value === debounced) {
      return;
    }

    const timeout = window.setTimeout(() => setDebounced(value), delayMs);

    return () => window.clearTimeout(timeout);
  }, [debounced, delayMs, value]);

  return debounced;
}
