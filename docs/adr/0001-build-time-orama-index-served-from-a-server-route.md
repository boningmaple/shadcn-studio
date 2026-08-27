# Build-time Orama index, served from a Server Route

VibeUI search runs Orama JS on the server. A build step indexes every Component
and Demo and persists the index to JSON with `@orama/plugin-data-persistence`;
a TanStack Start Server Route restores that index at boot and answers
`GET /api/search?q=`. We chose this over Orama Cloud, because a ~226-record
corpus sits far below the size where hosted search pays for itself, and over
shipping the index to the browser, which would put the whole catalogue in the
client bundle.

## Consequences

- Search requires the network. This contradicts the precedent set by the theme
  preference feature, whose `NFR-TS-005` requires it to work offline. The
  palette will not function offline, and that is deliberate — do not "restore
  consistency" by moving the index client-side without revisiting this decision.
  What it does instead is say so: an offline visitor gets "No network" and a
  way to try anyway, rather than a failed request (ADR-0006).
- `@orama/plugin-data-persistence` cannot serialize functions. The default
  English tokenizer is reconstructed correctly on `restore`, but a custom
  tokenizer, stemmer, or stop-word list would be silently lost and would change
  search results (oramasearch/orama#695). Adding language configuration means
  abandoning persistence, not merely configuring it.
- The plugin pins `@orama/orama` to an exact version — both are on 3.1.18.
  Upgrade them together.
- The Nitro preset is `node-server`, a long-lived process, so the index is
  restored once per boot. A serverless preset would restore it on every cold
  start. That is survivable at this corpus size, but it is the point at which
  this decision should be re-examined.
