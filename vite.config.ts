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
    // Scoped to the component suite so the Playwright specs under `e2e/` are
    // left to `npm run test:e2e`. They import `@playwright/test`, which the
    // browser-mode optimizer would otherwise try to bundle for the browser.
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
    browser: {
      // The `system` theme resolves through `prefers-color-scheme`, so the
      // suite pins it rather than inheriting the developer's OS setting.
      provider: playwright(),
      enabled: true,
      instances: [{ browser: "chromium" }],
      headless: true,
      screenshotFailures: false,
    },
  },
  resolve: { tsconfigPaths: true },
  plugins: lazyPlugins(() =>
    // The full-stack plugins bundle the app for the server and leave React
    // inlined as CJS, which the test module runner cannot evaluate. The test
    // run keeps only React, for JSX, and Tailwind: the component tests assert
    // on the accessible name of the theme switch, and which of its labels
    // reaches the accessibility tree is decided entirely by CSS.
    isTest
      ? [tailwindcss(), react()]
      : [devtools(), nitro(), tailwindcss(), tanstackStart(), react()],
  ),
});

export default config;
