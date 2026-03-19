import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  retries: process.env.CI ? 1 : 0,
  use: {
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  webServer: {
    command: 'pnpm e2e:serve',
    url: 'http://127.0.0.1:4321/',
    reuseExistingServer: !process.env.CI,
    timeout: 240000,
  },
  projects: [
    {
      name: 'chromium-root',
      use: { ...devices['Desktop Chrome'], baseURL: 'http://127.0.0.1:4321/' },
    },
    {
      name: 'firefox-root',
      use: { ...devices['Desktop Firefox'], baseURL: 'http://127.0.0.1:4321/' },
    },
    {
      name: 'webkit-root',
      use: { ...devices['Desktop Safari'], baseURL: 'http://127.0.0.1:4321/' },
    },
    {
      name: 'chromium-basepath',
      use: { ...devices['Desktop Chrome'], baseURL: 'http://127.0.0.1:4321/da-studio/' },
    },
    {
      name: 'mobile-smoke',
      use: { ...devices['iPhone 14'], baseURL: 'http://127.0.0.1:4321/' },
    },
    {
      name: 'no-js',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'http://127.0.0.1:4321/',
        javaScriptEnabled: false,
      },
    },
  ],
});
