import { defineConfig, devices } from "@playwright/test";

const port = Number(process.env.E2E_PORT ?? 4173);
const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? `http://127.0.0.1:${port}`;
const startServer =
  !process.env.PLAYWRIGHT_BASE_URL && process.env.E2E_NO_SERVER !== "1";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ["list"],
    ["html", { open: "never", outputFolder: "playwright-report" }],
  ],
  timeout: 45_000,
  expect: {
    timeout: 8_000,
  },
  use: {
    baseURL,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "off",
    extraHTTPHeaders: {
      origin: baseURL,
    },
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "mobile-chrome",
      use: { ...devices["Pixel 7"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
  ],
  webServer: startServer
    ? {
        command: `npx next start --hostname 127.0.0.1 --port ${port}`,
        url: baseURL,
        reuseExistingServer: process.env.E2E_REUSE === "1" && !process.env.CI,
        timeout: 120_000,
        stdout: "pipe",
        stderr: "pipe",
        env: {
          ...process.env,
          PORT: String(port),
          INQUIRY_MOCK_DELIVERY: process.env.INQUIRY_MOCK_DELIVERY ?? "sent",
          INQUIRY_FROM_EMAIL:
            process.env.INQUIRY_FROM_EMAIL ||
            "KodRoot <hello@mail.kodroot.com>",
          INQUIRY_TO_EMAIL: process.env.INQUIRY_TO_EMAIL || "hello@kodroot.com",
        },
      }
    : undefined,
});
