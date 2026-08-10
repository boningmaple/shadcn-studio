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
and component test files live in `tests/` (`tests/**/*.test.ts` and `*.test.tsx`)
alongside the shared setup.

```bash
npm run test
```

```bash
npm run test:watch
```

Run a single file or filter by name:

```bash
npx vp test run tests/theme.test.tsx
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
staged files.

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
|   |-- routes               # TanStack Router file routes
|   |-- router.tsx           # router setup
|   |-- routeTree.gen.ts     # generated TanStack route tree
|   |-- styles.css           # Tailwind, shadcn theme tokens, and base styles
|   `-- ui                   # app shell and reusable shadcn UI
|-- tests                    # unit and component tests, and the shared setup
|-- tsconfig.json            # TypeScript compiler configuration
|-- tsr.config.json          # TanStack Router generator configuration
`-- vite.config.ts           # Vite+ app and test configuration
```

## Dependencies

- `@fontsource-variable/geist`: Provides the Geist variable font used by the app.
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
