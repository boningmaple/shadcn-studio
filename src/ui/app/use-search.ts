import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useCallback } from "react";

import { hitsSchema, searchRequestUrl, type Hit } from "@/search/hits";

/**
 * Long enough that a burst of typing is one request, short enough that the
 * list does not feel like it lags behind the keyboard.
 *
 * Waited out inside the request rather than before it, so that the wait ends
 * on the same cancellation that ends the fetch — and so that what is asked for
 * is always what is typed, never a lagging copy of it.
 */
export const searchDebounceMs = 150;

/**
 * How long an answer is trusted without asking again — the window the Server
 * Route's own `Cache-Control` already claims, since Hits for a given query
 * change only on deploy. Long enough that reopening the palette paints the
 * list it had rather than flickering through a fresh load.
 */
export const searchStaleTimeMs = 5 * 60 * 1000;

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

/** Where one query's answer lives in the cache. */
export function searchQueryKey(query: string) {
  return ["search", query] as const;
}

/**
 * Hits and the query that produced them, cached as one value.
 *
 * Pairing them is what lets `SearchState.query` name a query the Hits actually
 * came from, even while the Hits on screen belong to the query before this one.
 */
type SearchAnswer = {
  hits: Hit[];
  query: string;
};

/** Waits out the debounce, or gives up the moment the query is superseded. */
function waitOut(delayMs: number, signal: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(resolve, delayMs);

    signal.addEventListener(
      "abort",
      () => {
        clearTimeout(timeout);
        reject(signal.reason);
      },
      { once: true },
    );
  });
}

async function fetchHits(
  query: string,
  signal: AbortSignal,
): Promise<SearchAnswer> {
  const response = await fetch(searchRequestUrl(query), { signal });

  if (!response.ok) {
    throw new Error(`Search failed with status ${response.status}`);
  }

  return { hits: hitsSchema.parse(await response.json()), query };
}

export function useSearch(query: string): {
  retry: () => void;
  search: SearchState;
} {
  const { data, isError, isFetching, refetch } = useQuery({
    // Reading `signal` is also what arms the cancellation: TanStack Query ends
    // an in-flight query once nothing is watching it, which is precisely what
    // the next keystroke does to this one.
    queryFn: async ({ signal }) => {
      // Nothing to collapse on the query the palette opens with, so the idle
      // list is asked for without waiting a debounce out first.
      if (query !== "") {
        await waitOut(searchDebounceMs, signal);
      }

      return fetchHits(query, signal);
    },
    queryKey: searchQueryKey(query),
    // The previous query's Hits stay on screen until the next ones land.
    placeholderData: keepPreviousData,
    // An open palette is being read. Refetching underneath it would reorder
    // the list while the visitor is aiming at a Hit.
    refetchOnWindowFocus: false,
    // A failure is offered to the visitor as "Try again" rather than retried
    // behind their back, which would leave the palette spinning for seconds
    // before admitting anything was wrong.
    retry: false,
    staleTime: searchStaleTimeMs,
  });

  const retry = useCallback(() => {
    void refetch();
  }, [refetch]);

  return {
    retry,
    search: {
      hits: data?.hits ?? [],
      query: data?.query ?? "",
      // In flight outranks failed, so a retry replaces the alert with the
      // spinner instead of leaving a dead "Try again" under the pointer.
      status: isFetching ? "loading" : isError ? "failed" : "ready",
    },
  };
}
