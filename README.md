# VibeUI

VibeUI is a component exploration app for browsing and installing free,
open-source components, blocks, and router-neutral pages built on shadcn UI.

## Development

```bash
npm install
npm run dev
```

`predev` builds and validates the shadcn registry before starting Vite. The
installed shadcn CLI has no watch mode, so rerun the registry build after
editing an item:

```bash
npm run registry:build
```

Authored Registry items live in `registry/vibe-ui/<item-name>/`. Every item
declares `registry/vibe-ui/<item-name>/<item-name>.tsx` as an installable file.
That canonical entry default-exports a component with no required props, which
VibeUI imports from generated Collection routes and renders as an ordinary React
Preview.

## Registry

The root `registry.json` is the only authored catalog. The build writes the
public shadcn payloads to the ignored `public/r/` directory:

```bash
npm run registry:build
npx shadcn@latest add https://your-vibeui-host.example/r/button-01.json
```

Registry conventions require every item to:

- use `registry:component`, `registry:block`, or `registry:page`;
- have a unique route-safe name, title, description, and exactly one route-safe
  category;
- declare `registry/vibe-ui/<name>/<name>.tsx` with a default component export;
- install files under `@components/vibe-ui/<name>/`.

`registry:build` also reads `registry.json` and updates committed generated
TypeScript:

- concrete TanStack route files under `src/routes/_rootLayout/{components,blocks,pages}/`;
- concrete standalone Preview routes under
  `src/routes/preview/{components,blocks,pages}/<category>/<item-name>.tsx`;
- sidebar data in `src/features/registry/data/registry-sidebar.gen.ts`.

Those four route directories and the generated sidebar module are wholly owned
by the Registry builder. It deletes and recreates them on every run, so do not
put handwritten files there. TanStack Start generates `src/routeTree.gen.ts`
when `dev` or `build` starts; `registry:build` does not generate the route tree
by itself.

Generated Collection routes embed each Registry item's canonical Preview route
in an iframe. The parent response contains the iframe and each Preview route
server-renders its own Registry item HTML. No generated catalog JSON is used.

## Search

Search remains server-side. At build time, Orama indexes:

- Registry items from `registry.json`;
- Collection pages derived from Registry item types and categories;
- ordinary application pages declared in co-located `src/routes/*.search.ts`
  metadata sidecars.

The committed index is restored once by the server route. TanStack Query owns
debouncing, request caching, stale-response protection, retry, and offline
behavior in the palette.

```bash
npm run generate:search-index
npm run check:search-index
```

## Testing and quality

Feature unit and browser tests live under `src/features/**/__tests__` and run
through Vite+ and Vitest Browser Mode. The remaining application E2E tests run
through Playwright.

```bash
npx playwright install chromium
npm run test
npm run test:watch
npm run test:e2e
```

Before finishing a change:

```bash
npm run check
npm run lint -- --deny-warnings --format=agent
```

The production build regenerates and validates `public/r`, refreshes generated
Registry routes/sidebar data, rebuilds the committed Orama artifact, bundles the
application, and prerenders the generated static Registry routes:

```bash
npm run build
npm run preview
```

## Project structure

```text
.
|-- CONTEXT.md                  # product glossary
|-- components.json             # shadcn installation aliases
|-- registry.json               # authored public Registry catalog
|-- registry/vibe-ui            # authored Registry items and Preview components
|-- docs/adr                    # architecture decisions
|-- public/r                    # generated, ignored shadcn payloads
|-- scripts
|   |-- build-registry.ts        # validates and builds all Registry outputs
|   |-- build-search-index.ts   # persists the server-side Orama index
|   `-- check-search-index.ts   # detects a stale committed search index
`-- src
    |-- components
    |   |-- ui                  # installed shadcn UI primitives
    |   |-- app-header.tsx      # application shell header
    |   `-- app-sidebar.tsx     # application navigation and sidebar rendering
    |-- features
    |   |-- registry            # generated navigation, Preview, and Code preview behavior
    |   |-- search              # Orama endpoint and search palette
    |   `-- theme-switch        # theme persistence and controls
    |-- routes                  # TanStack application and server routes
    `-- styles.css              # Tailwind theme and base styles
```
