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

## Search

**Search record**:
One findable thing in VibeUI — either a Component or a Demo.
_Avoid_: document, doc, entry

**Hit**:
A Search record that a query matched, carrying the score that orders it.
_Avoid_: result, match
