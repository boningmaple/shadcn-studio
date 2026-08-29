---
status: superseded by ADR-0007
---

# The search palette is a state machine

`SearchQueryResultList` picks what the palette shows with one ordered run of
early returns, and that order is the design rather than an accident of how the
branches were written:

1. **Quick links** — nothing has been typed. The palette offers the app's own
   destinations and asks the Server Route nothing at all. This wins over
   everything, being offline included: the links need neither a network nor an
   answer.
2. **No network** — no answer to _this_ query and no connection to get one. This
   outranks the Hits of the query before it, since showing them under a newly
   typed query says the palette answered something it never asked. It does not
   outrank an answer to the query on screen, which may well be cached from
   before the connection went — or fetched by a "Try again" that reached past a
   `navigator.onLine` saying otherwise.
3. **Failure** — the attempt for the query on screen did not arrive, or a retry
   of it is in flight. Carries a "Try again". Deliberately _below_ no network:
   the two share one retry, and a failed attempt made with no connection is
   still no network, so a press here must not change the message under the
   visitor's hand.
4. **Quick links again** — the first query of the page load, with no answer of
   any kind to hold. The links the palette opened on stay up, so the body never
   collapses to the input and springs back when the answer lands.
5. **No results** — the answer in hand is an empty array.
6. **Hits** — the answer in hand has Hits.

No branch paints an empty body. Whatever the palette last had to say stays on
screen until the next answer replaces it: 5 and 6 hold the previous query's
answer while the next one is in flight, and 4 holds the Quick links until the
first answer of the page load arrives. That is why
the no-results copy names `answer.query` and never the input: held across the
next keystroke, it says which query it is about and claims nothing about the one
still in flight.

`answer.query === query` is what separates 2 and 3 from the rest: every
answer carries the query it answered, so "is this about what is on screen?" is a
comparison rather than an inference from `isPlaceholderData`. It ends the retry
latch too — a retry that works has an answer, so the alert never flashes on its
way to the Hits.

Holding the links at 4 costs the keyboard path, and that is a known, accepted
trade. `useAutocomplete`'s `focusFirstItem` defers to the next collection mount
only when no collection is mounted; with the links' menu on screen it fires at
them instead, so the Hits arrive with nothing focused and Enter lands nowhere
until an arrow key is pressed. The e2e suite's "keyboard alone reaches a
Component page" fails on exactly this. Rendering the held links outside the
collection — plain rows rather than a menu — is what buys both, if the keyboard
path is ever wanted back.

The spinner rides alongside all of them, from `isFetching`, so it appears
through the debounce as well as the request. It is `aria-hidden`, so the
`role="status"` line beside it is the only account of any of this that reaches a
visitor who is not watching.

## Consequences

- An empty query is no longer a search. `findHits("")` answers with no Hits and
  the Server Route is never asked, where it used to answer with every Component
  as an idle list. Reopening the palette therefore lands on the Quick links
  rather than on that list — the caching ADR-0004 describes survives as
  "retyping a query does not re-ask it", which is what the suites now assert.
- The Quick links are `appQuickLinks`, read by the palette straight from the
  app's navigation, so adding one is an edit to `app-sidebar-data.ts` and
  nothing else. The cost is that the search feature now imports `ui-app` while
  `ui-app` imports the registry from search — no cycle, but the two features do
  know about each other, and the unit suite asserts against the real Home link
  rather than a fixture.
- Being offline is read from `navigator.onLine`, not inferred from a failed
  fetch, so the palette can say which of the two went wrong. It is also only
  ever a hint: `navigator.onLine` reports a machine with a network it cannot
  use — a captive portal — as online, and reports Wi-Fi that is up but useless
  as online too. Every offline state therefore keeps a working "Try again".
- `networkMode` is `"always"` rather than the default. The default parks a
  query as `paused` while the browser says it is offline, and a paused query
  cannot be started by `refetch` — the one moment the visitor is explicitly
  asking for an attempt is the one moment they would not get one.
- Coming back online refetches on its own, because `enabled` flips with the
  connection and the query left behind is stale. The button is for the case the
  browser is wrong, not for the ordinary one.
- Pressing "Try again" is latched until the attempt settles.
  `keepPreviousData` reports the retry of a failed query as a success — a failed
  query holds no data, so starting a fetch resets its status to pending, and
  pending is when placeholder data applies. Without the latch, the press would
  drop the message and flash the Hits of the query before it, as though the
  retry had already succeeded.
- The palette opens on an empty input every time. Its query lives in
  `SearchDialog`, which is mounted whether or not the dialog is open, so closing
  is what clears it — an effect on `isOpen`, since Escape, the outside click and
  choosing a Hit all arrive by different routes.
