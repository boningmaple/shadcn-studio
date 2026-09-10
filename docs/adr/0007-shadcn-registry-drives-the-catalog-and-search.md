---
status: accepted
---

# Shadcn registry drives the catalog and server-side search

VibeUI authors its public Registry items once in the root `registry.json` and
uses that metadata to derive Collection pages, server-owned navigation, and the
build-time Orama index. Ordinary searchable routes contribute co-located
metadata sidecars. Search remains server-side and preserves its TanStack Query
state machine, while `public/r` is generated and uncommitted so the shadcn CLI
can install an item without making the complete catalog application state.

Registry item JSON is also the source for Code previews. VibeUI fetches one
item only when its Code tab opens and highlights textual files in the browser.
A committed, fine-grained Shiki bundle is generated at build time with only the
languages and themes VibeUI supports, avoiding a highlighting server request
without shipping Shiki's general-purpose bundles. Raw source remains the copy
value and the fallback for unknown file types. This replaces the separate Demo
registry, generated highlighted-code artifacts, and Material-specific preview
model without moving install payload concerns into the application shell.
