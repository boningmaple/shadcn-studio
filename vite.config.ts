import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig, lazyPlugins } from "vite-plus";
import { playwright } from "vite-plus/test/browser-playwright";

const isTest = process.env.VITEST === "true";

const config = defineConfig({
  fmt: {
    ignorePatterns: [
      "routeTree.gen.ts",
      "registry-sidebar.gen.ts",
      "search-index.gen.json",
      "shiki.bundle.gen.ts",
    ],
    sortImports: true,
    sortPackageJson: true,
  },
  lint: {
    ignorePatterns: ["**/components/ui/*"],
    plugins: ["eslint", "typescript", "unicorn", "oxc", "react", "react-perf", "jsx-a11y"],
    jsPlugins: [{ name: "vite-plus", specifier: "vite-plus/oxlint-plugin" }],
    options: { typeAware: true, typeCheck: true },
    rules: { "vite-plus/prefer-vite-plus-imports": "error" },
  },
  test: {
    testTimeout: 2_000,
    setupFiles: ["./tests/setup.ts"],
    restoreMocks: true,
    projects: [
      {
        extends: true,
        test: {
          name: "unit",
          include: ["src/**/*.node.test.{ts,tsx}"],
          environment: "node",
        },
      },
      {
        extends: true,
        test: {
          name: "browser",
          include: ["src/**/*.browser.test.{ts,tsx}"],
          browser: {
            enabled: true,
            provider: playwright(),
            instances: [{ browser: "chromium" }],
            headless: true,
            screenshotFailures: false,
          },
        },
      },
    ],
  },
  staged: {
    "*": "vp check --fix",
    "{registry.json,registry/vibe-ui/**,scripts/build-registry.ts,src/features/registry/lib/registry-catalog.ts,src/features/registry/types/registry.ts}":
      () => "npm run registry:build",
    // Registry metadata and route-owned search sidecars are the sources for
    // the committed server-side index.
    "{registry.json,src/routes/**/*.search.ts,src/features/registry/lib/registry-catalog.ts,src/features/search/lib/search-index.ts,src/features/search/data/search-index.gen.json,scripts/build-search-index.ts}":
      () => "npm run check:search-index",
    "{package-lock.json,package.json,scripts/generate-shiki-bundle.ts,src/features/registry/generated/shiki.bundle.gen.ts}":
      () => "npm run check:shiki",
  },
  resolve: { tsconfigPaths: true },
  plugins: lazyPlugins(() =>
    // `devtools()` and `nitro()` bundle the app for the server and leave React
    // inlined as CJS, which the test module runner cannot evaluate. But
    // `tanstackStart()` has to stay: `createIsomorphicFn` is a build-time
    // transform, and without it the runtime stub resolves the chain to its
    // `.server()` branch, so `getLocalStorageTheme` would hand the browser
    // `defaultTheme` and the stored-theme tests would fail.
    isTest
      ? [
          tailwindcss(),
          tanstackStart({
            prerender: { crawlLinks: false, enabled: true, failOnError: true },
          }),
          react(),
        ]
      : [
          devtools(),
          nitro(),
          tailwindcss(),
          tanstackStart({
            prerender: { crawlLinks: false, enabled: true, failOnError: true },
          }),
          react(),
        ],
  ),
});

export default config;
