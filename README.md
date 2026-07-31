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

## Project Structure

```text
.
|-- components.json          # shadcn component registry and alias settings
|-- package.json             # app scripts and runtime dependencies
|-- src
|   |-- components
|   |   |-- app-sidebar.tsx  # main sidebar navigation for the app shell
|   |   |-- badge            # Material 3 badge component and tests
|   |   |-- button           # button component implementation and tests
|   |   |-- tabs             # tabs component implementation and tests
|   |   |-- toggle-button    # toggle button component implementation and tests
|   |   `-- ui               # reusable shadcn UI
|   |-- demos                # copy-and-paste component examples
|   |-- hooks                # shared React hooks
|   |-- lib                  # shared utility functions
|   |-- routes               # TanStack Router file routes
|   |-- router.tsx           # router setup
|   |-- routeTree.gen.ts     # generated TanStack route tree
|   `-- styles.css           # Tailwind, shadcn theme tokens, and base styles
|-- tsconfig.json            # TypeScript compiler configuration
|-- tsr.config.json          # TanStack Router generator configuration
`-- vite.config.ts           # Vite+ app configuration
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
