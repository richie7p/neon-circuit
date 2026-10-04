import { defineConfig, devices } from "@playwright/test";
export default defineConfig({
  testDir: "./tests/e2e",
  timeout: 60000,
  workers: 1,
  use: { launchOptions: { args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader"] }, baseURL: "http://127.0.0.1:6323", trace: "retain-on-failure", screenshot: "only-on-failure" },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["Pixel 7"] } },
  ],
  webServer: { command: "npm run preview -- --port 6323", url: "http://127.0.0.1:6323", reuseExistingServer: !process.env.CI, timeout: 120000 },
});
