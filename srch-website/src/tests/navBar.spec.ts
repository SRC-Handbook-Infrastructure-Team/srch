import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:5173/srch/");
});

test("every button in the navigation bar works, including the srch logo", async ({
  page,
}) => {
  await page.getByText("About").nth(4).click();
  await expect(page.getByText("About the SRC Handbook")).toBeVisible();
  await page.getByRole("banner").getByText("Acknowledgements").click();
  await expect(page.getByText("Meet our Team!Meet our")).toBeVisible();
  await expect(
    page.locator(
      "header:nth-child(5) > .navbar-padding > .chakra-stack.header-hstack > .chakra-stack.right-hstack > div:nth-child(4) > .chakra-icon > path"
    )
  ).toBeVisible();
  await expect(
    page.locator(
      "header:nth-child(5) > .navbar-padding > .chakra-stack.header-hstack > .chakra-stack.right-hstack > div:nth-child(5) > .chakra-icon > path"
    )
  ).toBeVisible();
  await page
    .locator(
      "header:nth-child(5) > .navbar-padding > .chakra-stack.header-hstack > .chakra-stack.right-hstack > div:nth-child(5) > .chakra-icon"
    )
    .click();
  await page.getByRole("textbox", { name: "Search for topics, case" }).click();
  await page
    .getByRole("textbox", { name: "Search for topics, case" })
    .fill("this works");
});;


test("the navigation bar resizes properly", async ({ page }) => {
    await page.setViewportSize({ width: 668, height: 600});
    await expect(page.locator("svg").nth(5)).toBeVisible();
    await page.locator("path").nth(5).click();
    await expect(
      page
        .locator("div")
        .filter({
          hasText:
            "AboutAcknowledgementsModulesPrivacyAccessibilityAutomated Decision",
        })
        .nth(2)
    ).toBeVisible();

    await page.setViewportSize({width: 1100, height: 600});
    await expect(page.locator('div').filter({ hasText: 'ModulesPrivacyAccessibilityAutomated Decision MakingGenerative' }).nth(2)).toBeVisible();
    await expect(page.getByRole('banner').getByText('Modules')).toBeVisible();
    await expect(page.getByRole('banner').getByText('About')).toBeVisible();
    await expect(page.getByRole('banner').getByText('Acknowledgements')).toBeVisible();
    await expect(page.locator('path').nth(3)).toBeVisible();
    await expect(page.locator('svg').nth(4)).toBeVisible();
});

