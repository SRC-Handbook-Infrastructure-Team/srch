// tests for the landing, acknowledgmenet, and about pages
import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:5173/srch/");
});

test("tests that all divs are visible on a page", async ({ page }) => {
  await expect(page.locator("div").nth(3)).toBeVisible();
  await expect(page.getByText("Brown SRC Handbook")).toBeVisible();
  await expect(page.getByText("This Handbook is your guide")).toBeVisible();
  await expect(
    page.locator("div").filter({ hasText: "Check out our" }).nth(4)
  ).toBeVisible();
  await expect(page.getByText("Check out our curriculum")).toBeVisible();
  await expect(page.getByText("Explore our focus areas of")).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Privacy Icon Privacy Think" })
  ).toBeVisible();
  await expect(
    page.getByRole("button", {
      name: "Automated Decision Making Icon Automated Decision Making Think critically about",
    })
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Accessibility Icon" })
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Generative AI Icon Generative" })
  ).toBeVisible();
  await expect(
    page.locator("div").filter({ hasText: "Search for ContentFind" }).nth(4)
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Search for Content" })
  ).toBeVisible();
  await expect(page.getByText("Find specific topics, case")).toBeVisible();
  await expect(page.locator(".searchbar-container")).toBeVisible();
  await expect(page.getByText("How to use the HandbookEach")).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "How to use the Handbook" })
  ).toBeVisible();
  await expect(page.getByText("Each section contains a")).toBeVisible();
  await expect(
    page.getByText(
      "Structure your lesson or course with embedded ethical modulesGive students real"
    )
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Learn more Arrow for the" })
  ).toBeVisible();
  await expect(
    page.getByText(
      "Connect with UsFollow us to receive CNTR news and updates!CNTR Website:cntr."
    )
  ).toBeVisible();
  await expect(
    page
      .locator("div")
      .filter({
        hasText:
          "ModulesPrivacyAccessibilityAutomated Decision MakingGenerative AIQuick",
      })
      .nth(2)
  ).toBeVisible();
});

test("ensures that all of the links on the landing page work", async ({
  page,
}) => {
  await page
    .getByRole("button", { name: "Privacy Icon Privacy Think" })
    .click();
  await expect(page.getByText("1.a. - What is Privacy?Last")).toBeVisible();
  await page.getByRole("img", { name: "Socially Responsible" }).nth(1).click();
  await page
    .getByRole("button", {
      name: "Automated Decision Making Icon Automated Decision Making Think critically about",
    })
    .click();
  await expect(
    page.getByText(
      "3.a. - Algorithmic FairnessLast updated on November 5, 2025<"
    )
  ).toBeVisible();
  await page.getByRole("img", { name: "Socially Responsible" }).nth(1).click();
  await page.getByRole("button", { name: "Accessibility Icon" }).click();
  await expect(
    page.getByText(
      "2.a. - What is Accessibility?Last updated on November 5, 2025<"
    )
  ).toBeVisible();
  await page.getByRole("img", { name: "Socially Responsible" }).nth(1).click();
  await page
    .getByRole("button", { name: "Generative AI Icon Generative" })
    .click();
  await expect(
    page.getByRole("heading", { name: "4.a. - Introduction to" })
  ).toBeVisible();
  await page.getByRole("img", { name: "Socially Responsible" }).nth(1).click();
  await page.getByRole("button", { name: "Learn more Arrow for the" }).click();
  await expect(page.getByText("About the SRC Handbook")).toBeVisible();
  await page.getByRole("img", { name: "Socially Responsible" }).click();
  await page.getByRole("button", { name: "About", exact: true }).click();
  await expect(page.getByText("About the SRC Handbook")).toBeVisible();
  await page.getByRole("img", { name: "Socially Responsible" }).click();
  await page.getByRole("button", { name: "Acknowledgements" }).click();
  await expect(
    page.getByRole("img", { name: "Socially Responsible" }).nth(1)
  ).toBeVisible();
  await page.getByRole("img", { name: "Socially Responsible" }).nth(1).click();
  await page.getByRole("button", { name: "Privacy", exact: true }).click();
  await expect(page.getByText("1.a. - What is Privacy?Last")).toBeVisible();
  await page
    .locator("#root > header > .navbar-padding > .chakra-stack.header-hstack")
    .click();
  await page.getByRole("img", { name: "Socially Responsible" }).nth(1).click();
  await page
    .getByRole("button", { name: "Accessibility", exact: true })
    .click();
  await expect(
    page.getByRole("heading", { name: "2.a. - What is Accessibility?" })
  ).toBeVisible();
  await page.getByRole("img", { name: "Socially Responsible" }).nth(1).click();
  await page
    .getByRole("button", { name: "Automated Decision Making", exact: true })
    .click();
  await expect(
    page.getByRole("heading", { name: "3.a. - Algorithmic Fairness" })
  ).toBeVisible();
  await page.getByRole("img", { name: "Socially Responsible" }).nth(1).click();
  await page
    .getByRole("button", { name: "Generative AI", exact: true })
    .click();
  await expect(
    page.getByRole("heading", { name: "4.a. - Introduction to" })
  ).toBeVisible();
  await page.getByRole("img", { name: "Socially Responsible" }).nth(1).click();
  const page1Promise = page.waitForEvent("popup");
  await page
    .getByRole("link", { name: "responsible.cs.brown.edu", exact: true })
    .click();
  const page1 = await page1Promise;
  await page.getByRole("link", { name: "@brown_cntr", exact: true }).click();
  await page.getByText("cntr.brown.edu").click();
  await page.getByRole("link", { name: "Bug Report Form" }).click();
});

test("ensures that elements are visible on the about page", async ({
  page,
}) => {
  await page.getByRole("banner").getByText("About").click();
  await expect(page.getByText("About the SRC HandbookLearn")).toBeVisible();
  await page.locator("div").nth(1).click();
  await expect(page.locator("div").nth(1)).toBeVisible();
  await page
    .locator("#root div")
    .filter({ hasText: "How to use the handbookEach" })
    .click();
  await expect(
    page.locator("#root div").filter({ hasText: "How to use the handbookEach" })
  ).toBeVisible();
  await expect(
    page
      .locator("div")
      .filter({
        hasText:
          "ModulesPrivacyAccessibilityAutomated Decision MakingGenerative AIQuick",
      })
      .nth(2)
  ).toBeVisible();
});

test("tests the links on the about page", async ({ page }) => {
  await page.getByRole("banner").getByText("About").click();
  await expect(
    page.locator("#root div").filter({ hasText: "How to use the handbookEach" })
  ).toBeVisible();
  await page.getByRole("button", { name: "Acknowledgements" }).click();
  await expect(page.getByText("Meet our Team!")).toBeVisible();
  await page.getByRole("img", { name: "Socially Responsible" }).nth(1).click();
  await page.getByRole("button", { name: "About", exact: true }).click();
  await page.getByRole("link", { name: "src_handbook@brown.edu" }).click();
  await page.getByRole("link", { name: "Bug Report Form" }).click();
});
