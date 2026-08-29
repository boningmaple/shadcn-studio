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

Authored Registry items live in `registry/vibe-ui/<item-name>/`. Every item has
one `preview.tsx` used only by VibeUI and one or more installable files declared
in the root `registry.json`.

## Registry

The root `registry.json` is the only authored catalog. The build writes the
public shadcn payloads to the ignored `public/r/` directory:

```bash
npm run registry:build
npx shadcn@latest add https://your-vibeui-host.example/r/button-01.json
```

Registry conventions require every item to:

- use `registry:component`, `registry:block`, or `registry:page`;
- have a unique name, title, description, and exactly one category;
- live under `registry/vibe-ui/<name>/` with exactly one `preview.tsx`;
- install files under `@components/vibe-ui/<name>/`.

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
npm test -- --run
npm run test:watch
npm run test:e2e
```

Before finishing a change:

```bash
npm run check
npm run lint -- --deny-warnings --format=agent
```

The production build regenerates and validates `public/r`, rebuilds the
committed Orama artifact, and bundles the application:

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
|-- registry/vibe-ui            # authored Registry items and Preview fixtures
|-- docs/adr                    # architecture decisions
|-- public/r                    # generated, ignored shadcn payloads
|-- scripts
|   |-- build-search-index.ts   # persists the server-side Orama index
|   |-- check-registry.ts       # validates VibeUI Registry conventions
|   `-- check-search-index.ts   # detects a stale committed search index
`-- src
    |-- components
    |   |-- ui                  # installed shadcn UI primitives
    |   |-- app-header.tsx      # application shell header
    |   `-- app-sidebar.tsx     # application navigation and sidebar rendering
    |-- features
    |   |-- registry            # catalog, Preview, and Code preview behavior
    |   |-- search              # Orama endpoint and search palette
    |   `-- theme-switch        # theme persistence and controls
    |-- routes                  # TanStack application and server routes
    `-- styles.css              # Tailwind theme and base styles
```
