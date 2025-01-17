// import { test, expect } from "@playwright/test";

// test("New Version Game Flow", async ({ page, browserName }) => {
//   await page.goto("http://localhost:3000/");
//   await page.getByRole("link", { name: "New Version (in progress)" }).click();
//   await page.getByRole("button", { name: "Start Game" }).click();

//   const inputLocator =
//     browserName === "webkit" ? ".css-cp01gg-control" : ".css-1q5atpo-Input";

//   for (let round = 1; round <= 3; round++) {
//     const guesses = [
//       "Afghanistan flag Afghanistan",
//       "Albania flag Albania",
//       "Algeria flag Algeria",
//       "Angola flag Angola",
//       "Argentina flag Argentina",
//     ];

//     for (let i = 0; i < guesses.length; i++) {
//       const guess = guesses[i];

//       await page.getByRole("option", { name: guess }).click();

//       if (!(await page.locator(inputLocator).isVisible())) {
//         console.log(`round ${round}, guess ${i + 1}.`);
//         break;
//       }

//       if (await page.locator(inputLocator).isVisible()) {
//         await page.locator(inputLocator).click();
//       }
//     }

//     if (round < 3) {
//       await page.getByRole("button", { name: "Next Round" }).click();
//     } else {
//       console.log(`Completed final round ${round}.`);
//     }
//   }

//   const finalScoreMessages = [
//     "Ethnomusicology Wizard!!!",
//     "Mr. Worldwide!!",
//     "Musicophile!",
//     "Tune Explorer",
//     "Rhythm Rookie",
//   ];

//   const finalScoreRegex = new RegExp(finalScoreMessages.join("|"), "i");
//   await expect(page.locator(`text=${finalScoreRegex}`)).toBeVisible();
// });
