import { test, expect } from "@playwright/test";

test("nav bar search", async ({ page }) => {
  await page.goto("http://localhost:5173/srch/");
  await page.locator("svg").nth(4).click();
  await page
    .getByRole("banner")
    .getByRole("textbox", { name: "Search for topics, case" })
    .fill("about");
  await page
    .getByRole("link", { name: "Privacy Section Header Lens 2" })
    .click();
  await page.getByRole("link", { name: "as a gate we can open or" }).click();
  await page
    .getByRole("textbox", { name: "Search for topics, case" })
    .press("ControlOrMeta+a");
  await page
    .getByRole("textbox", { name: "Search for topics, case" })
    .fill("barre");
  await page.getByRole("link", { name: "Privacy Case Study: ..." }).click();
  await page.getByRole("img", { name: "Socially Responsible" }).nth(1).click();
  await page.locator("svg").nth(4).click();
  await page
    .getByRole("banner")
    .getByRole("textbox", { name: "Search for topics, case" })
    .press("ControlOrMeta+a");
  await page
    .getByRole("banner")
    .getByRole("textbox", { name: "Search for topics, case" })
    .fill("barre");
  await page.getByRole("link", { name: "Privacy Case Study: ..." }).click();
  await expect(
    page.getByLabel("Right sidebar drawer").getByText("Barre")
  ).toBeVisible();
  await page.getByRole("img", { name: "Socially Responsible" }).nth(1).click();
  await page.locator("svg").nth(4).click();
  await page
    .getByRole("banner")
    .getByRole("textbox", { name: "Search for topics, case" })
    .fill("india");
  await page.getByRole("link", { name: "Accessibility Equity Case" }).click();
  await page
    .locator(
      "#root > header > .navbar-padding > .chakra-stack.header-hstack > .chakra-stack.right-hstack > div:nth-child(5) > .chakra-icon"
    )
    .click();
  await page
    .getByRole("textbox", { name: "Search for topics, case" })
    .press("ControlOrMeta+a");
  await page
    .getByRole("textbox", { name: "Search for topics, case" })
    .fill("technological acc");
  await page.getByRole("link", { name: "Accessibility Introduction" }).click();
  await expect(
    page.locator("#main").getByText("Technological acc", { exact: true })
  ).toBeVisible();
  await expect(page.getByText("India").nth(2)).toBeHidden();
});

test("landing page search", async ({ page }) => {
  await page.goto("http://localhost:5173/srch/");
  await page.getByRole("textbox", { name: "Search for topics, case" }).click();
  await page
    .getByRole("textbox", { name: "Search for topics, case" })
    .fill("create");
  await page
    .getByRole("link", { name: "Accessibility Disability Case" })
    .first()
    .click();
  await expect(
    page.getByLabel("Right sidebar drawer").getByText("create")
  ).toBeVisible();
});

test("search results page search", async ({ page }) => {
  await page.goto("http://localhost:5173/srch/");
  await page.getByRole("textbox", { name: "Search for topics, case" }).click();
  await page
    .getByRole("textbox", { name: "Search for topics, case" })
    .fill("about");
  await page
    .locator("div")
    .filter({ hasText: /^See full results$/ })
    .first()
    .click();
  await expect(
    page.getByRole("link", { name: "Privacy Section Header Lens 2" }).first()
  ).toBeVisible();
  await page
    .getByRole("textbox", { name: "Search for topics, case" })
    .dblclick();
  await page
    .getByRole("textbox", { name: "Search for topics, case" })
    .dblclick();
  await page
    .getByRole("textbox", { name: "Search for topics, case" })
    .fill("prior");
  await page
    .getByRole("link", {
      name: "Automated Decision Making SafeRent Solutions AI Scoring System ...priority.",
    })
    .click();
  await expect(
    page.locator("div:nth-child(4) > p > mark > mark").first()
  ).toBeVisible();
});
