# VibeUI

A component exploration app. Users browse copy-and-paste UI components, view
each one's variations, and read the source that produces them.

## Language

**VibeUI**:
The product itself — the app a user opens and browses.
_Avoid_: Shadcn Studio (the repository and npm package name only, never the product)

## Catalog

**Component**:
A catalog entry for one piece of UI, such as Button, with its own page.
_Avoid_: catalog entry, page, widget

**Demo**:
A single self-contained illustration of one [[Component]]'s usage, shown as one
card on that Component's page.
_Avoid_: example, variant, sample

**Demo artifact**:
Everything one [[Demo]] is filed under — its source module, its generated code
JSON, its card's anchor, and its full-page preview — all keyed by the anchor id
the registry derives for it, such as `md-button-01`.
_Avoid_: asset, artefact, generated file

## Search

**Search record**:
One findable thing in VibeUI — either a Component or a Demo.
_Avoid_: document, doc, entry

**Hit**:
A Search record that a query matched, carrying the score that orders it.
_Avoid_: result, match

**Quick link**:
A fixed destination the search palette offers before anything is typed, taken
from the app's own navigation rather than from the index.
_Avoid_: shortcut, nav item, suggestion
