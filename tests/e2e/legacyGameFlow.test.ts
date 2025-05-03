import { test, expect } from "@playwright/test";

test("Legacy Game Flow Test", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  await page.getByRole("link", { name: "Original Version" }).click();
  await page.getByRole("button", { name: "Start Game" }).click();

  for (let round = 1; round <= 6; round++) {
    // expect map to be visible
    await expect(
      page
        .locator("div")
        .filter({ hasText: /^To navigate, press the arrow keys\.$/ })
        .nth(1)
    ).toBeVisible();

    await page.waitForTimeout(1000); // map click wait

    await page
      .locator("div")
      .filter({ hasText: /^To navigate, press the arrow keys\.$/ })
      .nth(1)
      .click();

    await page.waitForTimeout(1000); // submit wait

    const submitButton = page.getByRole("button", { name: "Submit" });

    // expect submit button to be visible and enabled
    await expect(submitButton).toBeVisible();
    await expect(submitButton).toBeEnabled();
    await submitButton.click();

    if (round < 6) {
      await page.waitForTimeout(1000); // next round wait
      await page.getByRole("button", { name: "Next Round" }).click();
    } else {
      await page.getByRole("button", { name: "See Score" }).click();
    }
  }

  await page.getByPlaceholder("Enter your username").fill("fake");
  await page
    .getByRole("button", { name: "Submit Score to Leaderboard" })
    .click();

  await expect(page.getByText("Score submitted successfully")).toBeVisible();

  await page.locator(".order-4 > .text-center > .btn").click();
  // expect read more link in info modal to be visible
  await expect(page.getByRole("link", { name: "Read more" })).toBeVisible();
});
