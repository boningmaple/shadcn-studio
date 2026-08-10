import { defineConfig, devices } from "@playwright/test";

const port = 3210;
const baseURL = `http://localhost:${port}`;

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL,
    trace: "on-first-retry",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    // A dedicated port so a suite run never collides with `npm run dev`.
    command: `npx vp dev --port ${port}`,
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 12_000,
  },
});
