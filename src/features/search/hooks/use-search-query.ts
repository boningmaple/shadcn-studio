import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";

import { fetchSearchHits } from "@/features/search/api/search-client";
import { searchContract } from "@/features/search/api/search.contract";

export const searchDebounceMs = 150;

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

export function useSearchQuery(query: string, isOnline: boolean, isQueryValid = true) {
  const previousQuery = useRef(query);
  // Empty search is a reset boundary: do not let older Hits leak into the
  // next fresh query after the palette has gone back to quick links.
  const canKeepPreviousData = previousQuery.current !== "";

  useEffect(() => {
    previousQuery.current = query;
  }, [query]);

  return useQuery({
    queryKey: ["search", query],
    queryFn: async ({ signal }) => {
      await waitOut(searchDebounceMs, signal);

      return fetchSearchHits(query, signal);
    },
    // Nothing typed is a navigation jump rather than a search, and an offline
    // browser has nothing to ask. `refetch` ignores this, so "Try again" can
    // still reach past a `navigator.onLine` that is lying.
    enabled: query !== "" && isOnline && isQueryValid,
    // Rather than the default "online", which parks a query as `paused` and
    // leaves "Try again" with nothing to do — the one moment the visitor is
    // asking for an attempt is the one moment they would not get one.
    networkMode: "always",
    placeholderData: canKeepPreviousData ? keepPreviousData : undefined,
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: searchContract.staleTimeMs,
  });
}
