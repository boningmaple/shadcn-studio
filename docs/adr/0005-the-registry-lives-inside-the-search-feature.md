# The registry lives inside the search feature

`src/` is organised feature-first: each of `search`, `theme-switch`,
`demo-preview`, `ui-app`, `ui-shadcn` and `ui-material-design` owns its
components, its data fetching and its tests. The Component and Demo registry
sits at `src/features/search/data/registry.ts`, inside the search feature,
rather than in a shared location above the features.

This was chosen knowing that the registry is not search's alone. It was placed
where the code that indexes it lives, because search is the feature that reads
the most of it — every field, for every entry — and because a shared tier above
the features would have exactly one occupant.

## Consequences

- Features import across into `search/data`, not only downward. The sidebar
  (`ui-app/lib/sidebar-items.ts`), the Demo artifact paths
  (`demo-preview/lib/demo-artifacts.ts`), all 38 route modules and both build
  scripts read the registry from inside the search feature. That edge is
  deliberate; do not read it as search owning the catalogue.
- Deleting or renaming the search feature would strand the whole app. The
  registry would have to move first, and every one of those importers with it.
- A future architecture review will notice the inward edges and suggest
  lifting the registry to `src/data/` or into a catalogue feature of its own.
  That suggestion has already been considered and declined; reopen it only if
  a second feature starts needing the registry as completely as search does.
- ADR-0003 still holds and is unaffected by the location: the registry stays
  metadata-only, because it is imported by the server and a `component:` field
  would drag all 188 Demo components into the server bundle.
