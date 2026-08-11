# Orama ranks, and react-aria's Autocomplete filter is disabled

The command palette reuses the existing `Command` and `CommandDialog` primitives
for their chrome, keyboard navigation, and focus management, but passes
`filter={() => true}` so that react-aria's `Autocomplete` performs no filtering
of its own. Orama has already matched, scored, and ordered the hits on the
server.

## Consequences

- The `filter` prop looks redundant and is not. `Autocomplete` otherwise
  defaults to `useFilter({ sensitivity: "base" })`, a plain substring match, and
  leaving it active would silently discard exactly the typo-tolerant and stemmed
  hits that Orama was adopted to provide. Removing the override would read as a
  cleanup and would be a regression.
- Ordering belongs to Orama's scores. The palette renders hits in the order it
  receives them and must not re-sort them.
