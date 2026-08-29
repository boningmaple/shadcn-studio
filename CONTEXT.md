# VibeUI

A component exploration app. Users browse copy-and-paste UI components, view
each one's variations, and read the source that produces them.

## Language

**VibeUI**:
The product itself — the app a user opens and browses.
_Avoid_: Shadcn Studio (the repository and npm package name only, never the product)

## Catalog

**Registry item**:
A free, open-source component, block, template, or page that VibeUI publishes
for installation through its shadcn registry.
_Avoid_: Demo, Demo artifact, catalog entry

**UI primitive**:
A foundational shadcn UI component used to build Registry items. UI primitives
are not Registry items merely because VibeUI uses them internally.
_Avoid_: Registry item, catalog component

**Collection page**:
A page that groups related Registry items sharing a type and category, such as
the Button page containing `button-01` and `button-02`.
_Avoid_: category route, listing route, page route

**Section page**:
A top-level catalog page that lists Collection pages of one Registry item type,
such as Components, Blocks, or Pages.
_Avoid_: index route, type route

**Preview**:
An interactive rendering of a Registry item inside VibeUI.
_Avoid_: Demo, example

**Code preview**:
A browsable view of the files a Registry item installs.
_Avoid_: Demo artifact, generated code

## Search

**Search record**:
One findable destination in VibeUI, such as a Registry item, Collection page,
or ordinary application page.
_Avoid_: document, doc, entry

**Hit**:
A Search record that a query matched, carrying the score that orders it.
_Avoid_: result, match

**Quick link**:
A fixed destination the search palette offers before anything is typed, taken
from the app's own navigation rather than from the index.
_Avoid_: shortcut, nav item, suggestion
