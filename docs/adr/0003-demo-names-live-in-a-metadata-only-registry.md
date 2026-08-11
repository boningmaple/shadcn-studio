# Demo names live in a metadata-only registry

Component and Demo names, routes, and ids move out of the 38 individual route
files into a single registry module that carries metadata only — no `component:`
references. The route files keep their own component imports and read their
labels from the registry, and the search index build reads that same registry,
so there is one source of truth for what exists and what it is called.

## Consequences

- The registry is imported by the server. Adding a `component:` field to it
  would drag all 188 Demo React components into the server bundle, so the
  metadata-only rule is load-bearing rather than stylistic.
- A Demo's name and the component it labels now live in different files, so
  adding a Demo means touching both.
