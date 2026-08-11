# Shadcn Studio

A collection of copy-and-paste shadcn components.

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

The build regenerates two committed artifacts before bundling: the per-Demo
code shown in the code dialog, and the search index the `/api/search` route
restores. Regenerate the search index on its own after adding or renaming a
Demo — the pre-commit check fails until you do:

```bash
npm run generate:search-index
```

## Testing

Two suites, both driving a real Chromium. Unit and component tests run against
components mounted in isolation and are fast enough to keep in watch mode;
end-to-end tests drive the whole app against a dev server.

Install the browser once after cloning — both suites need it:

```bash
npx playwright install chromium
```

### Unit and component tests

Vitest browser mode, via Vite+, with `vitest-browser-react` for rendering. Unit
and component test files sit next to the code they cover, under `src/`
(`src/**/*.{test,spec}.{ts,tsx}`). The top-level `tests/` directory holds only
the shared setup.

```bash
npm run test
```

```bash
npm run test:watch
```

Run a single file or filter by name:

```bash
npx vp test run src/ui/app/__tests__/theme.test.tsx
```

```bash
npx vp test run -t "keyboard"
```

Watch the tests happen in a headed browser:

```bash
npx vp test watch --browser.headless=false
```

Configuration is the `test` block in `vite.config.ts` — Vite+ keeps it there
rather than in a separate `vitest.config.ts`. Import test helpers from
`vite-plus/test`, not `vitest`; a lint rule enforces this. `tests/setup.ts`
loads the real stylesheet, which some tests depend on: the theme switch hides
two of its three buttons with CSS, and that is what decides which one reaches
the accessibility tree.

### End-to-end tests

Playwright, in `e2e/`:

```bash
npm run test:e2e
```

```bash
npm run test:e2e:ui
```

Playwright starts its own dev server on port **3210**, so a run will not collide
with `npm run dev` on port 3000. An already-running server on 3210 is reused.

Run one test, or watch it happen in a headed browser:

```bash
npx playwright test -g "syncs across tabs"
```

```bash
npx playwright test --headed
```

### Before pushing

`vp check` formats, lints and type checks; it also runs as a pre-commit hook on
staged files, which additionally verifies the committed search index still
matches the registry.

```bash
npm test && npx playwright test && npx vp check
```

## Project Structure

```text
.
|-- components.json          # shadcn component registry and alias settings
|-- e2e                      # Playwright end-to-end specs
|-- package.json             # app scripts and runtime dependencies
|-- playwright.config.ts     # end-to-end runner and dev server settings
|-- src
|   |-- hooks                # shared React hooks
|   |-- lib                  # shared utility functions
|   |-- registry.ts          # the Components and Demos VibeUI holds
|   |-- routes               # TanStack Router file and server routes
|   |-- router.tsx           # router setup
|   |-- routeTree.gen.ts     # generated TanStack route tree
|   |-- search               # search records, ranking, and the built index
|   |-- styles.css           # Tailwind, shadcn theme tokens, and base styles
|   `-- ui                   # app shell and reusable shadcn UI
|-- scripts                  # build-time code and search index generation
|-- tests                    # shared test setup only; tests live beside src
|-- tsconfig.json            # TypeScript compiler configuration
|-- tsr.config.json          # TanStack Router generator configuration
`-- vite.config.ts           # Vite+ app and test configuration
```

## Dependencies

- `@fontsource-variable/geist`: Provides the Geist variable font used by the app.
- `@orama/orama`: Indexes and ranks the Components and Demos search queries reach.
- `@orama/plugin-data-persistence`: Persists that index at build time and restores it on the server. Pinned to the same exact version as `@orama/orama`; upgrade the two together.
- `@tailwindcss/vite`: Integrates Tailwind CSS with the Vite build pipeline.
- `@tanstack/react-devtools`: Adds TanStack development tooling inside the app.
- `@tanstack/react-router`: Provides type-safe React routing.
- `@tanstack/react-router-devtools`: Adds router inspection tools during development.
- `@tanstack/react-start`: Provides the TanStack Start app framework.
- `class-variance-authority`: Builds typed component style variants.
- `clsx`: Combines conditional class names.
- `lucide-react`: Provides icon components.
- `nitro`: Builds and runs the server output.
- `react`: Provides the React UI runtime.
- `react-aria-components`: Provides accessible UI primitives.
- `react-dom`: Renders React components to the DOM.
- `shadcn`: Provides shadcn component tooling and shared CSS.
- `tailwind-merge`: Merges Tailwind class names without conflicts.
- `tailwindcss`: Provides utility-first styling.
- `tw-animate-css`: Adds animation utilities for Tailwind CSS.
