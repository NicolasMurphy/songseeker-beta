import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.getByRole("link", { name: "Original Version" }).click();
  await page.getByRole("button", { name: "Start Game" }).click();
  await page
    .locator("div")
    .filter({ hasText: /^To navigate, press the arrow keys\.$/ })
    .nth(1)
    .click();
  await page.getByRole("button", { name: "Submit" }).click();
  await page.locator("div > .btn").first().click();
  await page.getByRole("button", { name: "✕" }).click();
  await page.getByRole("button", { name: "Next Round" }).click();
  await page
    .locator("div")
    .filter({ hasText: /^To navigate, press the arrow keys\.$/ })
    .nth(1)
    .click();
  await page.getByRole("button", { name: "Submit" }).click();
  await page.getByRole("button", { name: "Next Round" }).click();
  await page
    .locator("div")
    .filter({ hasText: /^To navigate, press the arrow keys\.$/ })
    .nth(1)
    .click();
  await page.getByRole("button", { name: "Submit" }).click();
  await page.getByRole("button", { name: "Next Round" }).click();
  await page
    .locator("div")
    .filter({ hasText: /^To navigate, press the arrow keys\.$/ })
    .nth(1)
    .click();
  await page.getByRole("button", { name: "Submit" }).click();
  await page.getByRole("button", { name: "Next Round" }).click();
  await page
    .locator("div")
    .filter({ hasText: /^To navigate, press the arrow keys\.$/ })
    .nth(1)
    .click();
  await page.getByRole("button", { name: "Submit" }).click();
  await page.getByRole("button", { name: "Next Round" }).click();
  await page
    .locator("div")
    .filter({ hasText: /^To navigate, press the arrow keys\.$/ })
    .nth(1)
    .click();
  await page.getByRole("button", { name: "Submit" }).click();
  await page.getByRole("button", { name: "See Score" }).click();
  await page.getByPlaceholder("Enter your username").click();
  await page.getByPlaceholder("Enter your username").fill("fake");
  await page
    .getByRole("button", { name: "Submit Score to Leaderboard" })
    .click();
  await expect(page.getByText("Score submitted successfully")).toBeVisible();
});
