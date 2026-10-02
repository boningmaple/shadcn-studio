---
status: accepted
---

# Ordered categories define the catalog hierarchy

All Registry items use the upstream `registry:component` installation type.
`categories` is exactly `[section, collection]`: the first entry is components,
blocks, charts, or pages; the second is a safe collection slug. The collection
URL is `/<section>/<collection>`, the item link appends `#<name>`, and the Preview
URL is `/preview/<section>/<collection>/<name>`.

Navigation, grouping, search identities, generated routes, and Preview layout
use these categories instead of installation type. Section order remains
Components, Blocks, Charts, Pages. Empty sections and collections are omitted.
Pages retain their full-width Preview; other sections retain centered previews.

This supersedes ADR-0009. The builder passes the authored registry directly to
shadcn, preserves preview height metadata, and publishes identical internal and
public item JSON. There is no custom chart type or export conversion. Individual
file types and explicit installation targets keep their upstream meaning.

ADR-0008's generated route ownership includes the charts directories.
