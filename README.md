# Vibe UI

Vibe coding UI for browsing shadcn and Material Design component demos.

## Development

```bash
npm install
npm run dev
```

## Testing

Unit and component tests run in Vitest browser mode through Vite+ against
isolated React components. End-to-end tests live in `e2e/` and run through
Playwright. Both suites drive Chromium.

```bash
npx playwright install chromium
npm run test
npm run test:watch
npm run test:e2e
npm run test:e2e:ui
```

Run one Vitest browser test file:

```bash
npx vp test run src/features/theme-switch/__tests__/theme.browser.test.tsx
```

Filter Vitest browser tests by name:

```bash
npx vp test run -t "keyboard"
```

Open Vitest browser mode in a headed browser:

```bash
npx vp test watch --browser.headless=false
```

Open one Vitest file in headed watch mode:

```bash
npx vp test watch src/features/theme-switch/__tests__/theme.browser.test.tsx --browser.headless=false
```

Run one Playwright test by title:

```bash
npx playwright test -g "syncs across tabs"
```

Open Playwright in a headed browser:

```bash
npx playwright test --headed
```

Vite+ keeps Vitest configuration in the `test` block of `vite.config.ts`.
Import test helpers from `vite-plus/test`, not `vitest`; a lint rule enforces
this. `tests/setup.ts` loads the real stylesheet, which browser tests depend on
when CSS controls accessible visibility.

Playwright starts its own dev server on port **3210**, so a run will not
collide with `npm run dev` on port 3000. An already-running server on 3210 is
reused.

## Build

```bash
npm run build
npm run preview
```

The build regenerates the committed per-demo code artifacts in
`public/generated/` and the Orama search index in
`src/features/search/data/search-index.gen.json` before bundling.

```bash
npm run generate:component-code
npm run generate:search-index
npm run check:search-index
```

Use `npm run generate:search-index` after adding or renaming a demo, and
`npm run check:search-index` to compare the committed search index with the
registry.

## Pushing

```bash
npm run check
```

`vp check` formats, lints, and type checks. The pre-commit hook runs it on
staged files and also verifies generated artifacts.

Run the zero-warning lint gate:

```bash
npm run lint -- --deny-warnings --format=agent
```

```bash
git status
git push
```

## Project Structure

```text
.
|-- AGENTS.md                 # agent workflow notes
|-- CONTEXT.md                # domain context and shared language
|-- README.md                 # project onboarding and workflow commands
|-- components.json           # shadcn registry and alias settings
|-- docs
|   |-- adr                   # architecture decision records
|   |-- agents                # agent-specific operating notes
|   |-- feature-theme-switch  # theme switch feature requirements
|   `-- research              # research notes and source captures
|-- e2e                       # Playwright end-to-end specs
|-- package-lock.json         # locked npm dependency graph
|-- package.json              # scripts, dependencies, and npm engine hints
|-- playwright.config.ts      # end-to-end runner and dev server settings
|-- public
|   `-- generated             # committed per-demo code artifacts
|-- scripts                   # artifact generation and validation scripts
|-- src
|   |-- features
|   |   |-- demo-preview      # demo cards, code dialogs, and preview plumbing
|   |   |-- search            # search endpoint, hooks, data, and Orama index
|   |   |-- theme-switch      # theme persistence, hydration, and controls
|   |   |-- ui-app            # app shell, header, and sidebar
|   |   |-- ui-material-design # Material Design components and demos
|   |   `-- ui-shadcn         # shadcn React Aria component wrappers
|   |-- hooks                 # shared React hooks
|   |-- lib                   # shared utility functions
|   |-- routeTree.gen.ts      # generated TanStack route tree
|   |-- router.tsx            # router setup and SSR query integration
|   |-- routes                # TanStack Router file and server routes
|   `-- styles.css            # Tailwind, shadcn theme tokens, and base styles
|-- tests                     # shared test setup only; tests live beside src
|-- tsconfig.json             # TypeScript compiler configuration
|-- tsr.config.json           # TanStack Router generator configuration
`-- vite.config.ts            # Vite+ app, devtools, and test configuration
```

## Dependencies

### Runtime

- `@base-ui/react`: Accessible base primitives used by low-level component
  wrappers.
- `@fontsource-variable/geist`: Geist variable font assets.
- `@orama/orama`: Search indexing and ranking for component/demo lookup.
- `@orama/plugin-data-persistence`: Build-time Orama index serialization and
  server-side restore support. Keep it on the same version as `@orama/orama`.
- `@shadcn/react`: shadcn React primitives used by the component wrapper layer.
- `@tailwindcss/vite`: Tailwind CSS integration for the Vite build pipeline.
- `@tanstack/react-devtools`: TanStack devtools shell inside the app.
- `@tanstack/react-query`: Query caching for search and other client data.
- `@tanstack/react-query-devtools`: Query cache inspection during development.
- `@tanstack/react-router`: Type-safe file routing.
- `@tanstack/react-router-devtools`: Router inspection during development.
- `@tanstack/react-router-ssr-query`: SSR integration between TanStack Router
  and React Query.
- `@tanstack/react-start`: TanStack Start application framework.
- `class-variance-authority`: Typed component style variants.
- `clsx`: Conditional class name composition.
- `embla-carousel-react`: Carousel behavior for the shadcn carousel wrapper.
- `input-otp`: One-time-password input primitives.
- `lucide-react`: Icon components.
- `next-themes`: Theme context support for shadcn-compatible UI pieces.
- `nitro`: Server build and preview runtime.
- `react`: React UI runtime.
- `react-aria-components`: Accessible React Aria component primitives.
- `react-dom`: React DOM rendering.
- `react-resizable-panels`: Resizable panel primitives.
- `recharts`: Chart primitives for the shadcn chart wrapper.
- `shadcn`: shadcn component tooling and conventions.
- `sonner`: Toast notifications.
- `tailwind-merge`: Conflict-aware Tailwind class merging.
- `tailwind-variants`: Variant class composition for Material Design
  components.
- `tailwindcss`: Utility-first CSS framework.
- `tw-animate-css`: Tailwind animation utilities.
- `use-debounce`: Debounced interaction helpers.
- `zod`: Runtime schemas for route params and feature data.
- `zustand`: Local client state stores.

### Development

- `@axe-core/playwright`: Accessibility checks in Playwright specs.
- `@playwright/test`: End-to-end browser test runner.
- `@tailwindcss/typography`: Typography plugin loaded by `src/styles.css`.
- `@tanstack/devtools-vite`: Vite plugin for TanStack devtools.
- `@tanstack/router-cli`: Route tree generation.
- `@types/node`: Node.js type definitions.
- `@types/react`: React type definitions.
- `@types/react-dom`: React DOM type definitions.
- `@vitejs/plugin-react`: React support for Vite+.
- `@vitest/browser-playwright`: Playwright browser provider for Vitest.
- `msw`: Mock Service Worker for browser tests.
- `shiki`: Syntax highlighting for generated demo code artifacts.
- `typescript`: TypeScript compiler.
- `vite`: Vite+ core package, installed through the npm alias in
  `package.json`.
- `vite-plus`: Vite+ CLI and project tooling.
- `vitest-browser-react`: React render helpers for Vitest browser mode.
