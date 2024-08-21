import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  timeout: 90000,
  projects: [
    // Desktop Browsers
    {
      name: "Chromium",
      use: {
        browserName: "chromium",
        video: "retain-on-failure",
      },
    },
    {
      name: "Firefox",
      use: {
        browserName: "firefox",
        video: "retain-on-failure",
      },
    },
    {
      name: "WebKit",
      use: {
        browserName: "webkit",
        video: "retain-on-failure",
      },
    },
    {
      name: "Edge",
      use: {
        browserName: "chromium",
        channel: "msedge",
        video: "retain-on-failure",
      },
    },
    // Mobile Devices
    {
      name: "iPhone 12 Safari",
      use: {
        ...devices["iPhone 12"],
        browserName: "webkit",
        video: "retain-on-failure",
      },
    },
    {
      name: "iPhone 12 Chrome",
      use: {
        ...devices["iPhone 12"],
        browserName: "chromium",
        video: "retain-on-failure",
      },
    },
    {
      name: "Pixel 5 Chrome",
      use: {
        ...devices["Pixel 5"],
        browserName: "chromium",
        video: "retain-on-failure",
      },
    },
    {
      name: "Galaxy S21 Chrome",
      use: {
        ...devices["Galaxy S21"],
        browserName: "chromium",
        video: "retain-on-failure",
      },
    },
    // Tablets
    {
      name: "iPad Pro 11 Safari",
      use: {
        ...devices["iPad Pro 11"],
        browserName: "webkit",
        video: "retain-on-failure",
      },
    },
    {
      name: "iPad Pro 11 Chrome",
      use: {
        ...devices["iPad Pro 11"],
        browserName: "chromium",
        video: "retain-on-failure",
      },
    },
    {
      name: "Galaxy Tab S7 Chrome",
      use: {
        ...devices["Galaxy Tab S7"],
        browserName: "chromium",
        video: "retain-on-failure",
      },
    },
  ],
  use: {
    headless: true,
  },
});
