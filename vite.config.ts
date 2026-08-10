import { defineConfig, lazyPlugins } from "vite-plus";
import { playwright } from "vite-plus/test/browser-playwright";
import { devtools } from "@tanstack/devtools-vite";

import { tanstackStart } from "@tanstack/react-start/plugin/vite";

import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { nitro } from "nitro/vite";

const isTest = process.env.VITEST === "true";

const config = defineConfig({
  staged: {
    "*": "vp check --fix",
  },
  fmt: {
    printWidth: 80,
    ignorePatterns: ["routeTree.gen.ts"],
  },
  lint: {
    jsPlugins: [{ name: "vite-plus", specifier: "vite-plus/oxlint-plugin" }],
    rules: { "vite-plus/prefer-vite-plus-imports": "error" },
    options: { typeAware: true, typeCheck: true },
  },
  test: {
    setupFiles: ["./tests/setup.ts"],
    // Scoped to the component suite so the Playwright specs under `e2e/` are
    // left to `npm run test:e2e`. They import `@playwright/test`, which the
    // browser-mode optimizer would otherwise try to bundle for the browser.
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
    browser: {
      provider: playwright(),
      enabled: true,
      instances: [{ browser: "chromium" }],
      headless: true,
      screenshotFailures: false,
    },
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
      ? [tailwindcss(), tanstackStart(), react()]
      : [devtools(), nitro(), tailwindcss(), tanstackStart(), react()],
  ),
});

export default config;
