---
status: accepted
---

# Shadcn registry drives the catalog and server-side search

VibeUI authors its public Registry items once in the root `registry.json` and
uses that metadata to derive Collection pages, server-owned navigation, and the
build-time Orama index. Ordinary searchable routes contribute co-located
metadata sidecars. Search remains server-side and preserves its TanStack Query
state machine, while `public/r` is generated and uncommitted so the shadcn CLI
can install an item. The same validated build output is committed under
`src/features/registry/data/items` so application routes and public installation
URLs cannot drift.

Registry item JSON is also the source for Collection metadata and Code previews.
Each generated Collection route eagerly imports the complete built items in its
category and derives Preview URLs at runtime. Every mounted Registry item starts
browser-side highlighting through TanStack Query, so the Code panel is prepared
in the background without fetching `/r`. A committed, fine-grained Shiki bundle
contains only the languages and themes VibeUI supports. Raw source remains the
copy value and the fallback for unknown file types or highlighting failures.
This deliberately favors one simple, eager data flow over per-item payload
isolation.
