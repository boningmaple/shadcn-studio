# TanStack Query caches search, keyed by the query

The palette's fetching goes through TanStack Query rather than a hand-rolled
`useEffect`, `AbortController` and a ref holding what is currently typed. The
cache key is the query as typed, so an answer can only be painted while the
query that asked for it is still the query on screen.

This is chosen for the race it removes rather than for the caching. The defect
worth designing against is Hits the visitor has already typed past — classically
a slow answer to "car" landing after "card" has been typed. Aborting the
superseded request does not cover it, because a request can resolve before its
abort lands; the previous implementation therefore compared every response
against what was currently typed and dropped mismatches. Keyed storage makes
that comparison unnecessary, and unlike the comparison it cannot be forgotten.

What the key must not be is a debounced copy of the input. That reintroduces the
same defect through a narrower door, and it is the mistake worth naming here
because it looks like the obvious way to debounce a query.

## Consequences

- Retries are off. TanStack Query would otherwise retry a failed query three
  times with backoff, leaving the palette spinning for seconds before admitting
  anything is wrong. VibeUI offers the failure to the visitor as "Try again"
  instead, and that button is the retry. What the failure then looks like, and
  why it has to be latched to survive the retry, is ADR-0006.
- The 150ms debounce is waited out inside the request, never before it.
  TanStack Query has no debounce of its own, and the obvious placement —
  debouncing the value the key is built from — quietly reopens the defect this
  decision exists to close. For those 150ms the key still names the previous
  query, so its answer is painted as though it answered what has since been
  typed, and is then replaced when the real answer lands. react-aria drops its
  focused Hit when the one it was on disappears, so the visitor's Enter lands
  on nothing. The cost of waiting inside the request is a cache entry per
  keystroke; the superseded ones are cancelled before they ask anything, hold
  no data, and are collected on the usual timer.
- `staleTime` mirrors the `Cache-Control` the Server Route already sends, since
  Hits for a query change only on deploy (ADR-0001). Retyping a query answered
  minutes ago paints its Hits rather than flickering through a fresh load — but
  a tab left open across a deploy can show Hits from the previous one for that
  window. Until ADR-0006 this said "reopening the palette", which opened on the
  idle list; it now opens on Quick links and asks nothing.
- `refetchOnWindowFocus` is off. An open palette is being read, and refetching
  underneath it would reorder the list while the visitor is aiming at a Hit.
- The `QueryClient` is created per app instance, never at module scope. One
  module instance serves every request on the server, so a shared client would
  hand one visitor the answers cached for another.
- Counting requests in a test has to account for `StrictMode`. TanStack Start's
  client entry wraps the app in it, so in development every component mounts
  twice and the palette's first query is asked twice. A production build asks
  once. Assert against the change in the count, not its absolute value.
- The key is the query as typed, which is now also the query as _asked_: an
  empty one is never sent (ADR-0006), so the `queryFn` waits out the debounce
  unconditionally rather than skipping it for the idle list.
