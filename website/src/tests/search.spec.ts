import { test, expect } from "@playwright/test";

const viewports = [
  { name: "default", config: {} },
  { name: "small", config: { viewport: { width: 668, height: 600 } } },
];

for (const vp of viewports) {
  test.describe(`Viewport: ${vp.name}`, () => {
    test.use(vp.config);

    test("nav bar search", async ({ page }) => {
      await page.goto("http://localhost:5173/srch/");

      // Open nav search bar and search for "about"
      await page.locator("svg").nth(4).click();
      await page
        .getByRole("banner")
        .getByRole("textbox", { name: "Search for topics, case" })
        .fill("about");

      // Click a section level search result (should navigate to Privacy page)
      await page
        .getByRole("link", { name: "Privacy Section Header Lens 2" })
        .click();

      // Click a drawer/sidebar search result (should open right sidebar with specific term)
      // Look for a result that contains text "as a gate we can open or" in the snippet
      await page
        .getByRole("link", { name: "as a gate we can open or" })
        .click();

      // Change search query to "barre" (term found in sidebar)
      await page
        .getByRole("textbox", { name: "Search for topics, case" })
        .press("ControlOrMeta+a");
      await page
        .getByRole("textbox", { name: "Search for topics, case" })
        .fill("barre");

      // Click the sidebar result from dropdown
      await page.getByRole("link", { name: "Privacy Case Study: ..." }).click();

      // Close sidebar by clicking logo/home
      await page
        .getByRole("img", { name: "Socially Responsible" })
        .nth(1)
        .click();

      // Open nav search, search for "barre" again
      await page.locator("svg").nth(4).click();
      await page
        .getByRole("banner")
        .getByRole("textbox", { name: "Search for topics, case" })
        .press("ControlOrMeta+a");
      await page
        .getByRole("banner")
        .getByRole("textbox", { name: "Search for topics, case" })
        .fill("barre");

      // Click case study result and verify drawer opens with "barre" content
      await page.getByRole("link", { name: "Privacy Case Study: ..." }).click();
      await expect(
        page.getByLabel("Right sidebar drawer").getByText("Barre")
      ).toBeVisible();

      // Navigate home to close drawer
      await page
        .getByRole("img", { name: "Socially Responsible" })
        .nth(1)
        .click();

      // Search for "india" (should find Accessibility equity case study)
      await page.locator("svg").nth(4).click();
      await page
        .getByRole("banner")
        .getByRole("textbox", { name: "Search for topics, case" })
        .fill("india");

      // Click equity case study result containing "India"
      await page
        .getByRole("link", { name: "Accessibility Equity Case" })
        .click();

      // Open nav search again using CSS selector
      await page
        .locator(
          "#root > header > .navbar-padding > .chakra-stack.header-hstack > .chakra-stack.right-hstack > div:nth-child(5) > .chakra-icon"
        )
        .click();

      // Search for "technological acc" 
      await page
        .getByRole("textbox", { name: "Search for topics, case" })
        .press("ControlOrMeta+a");
      await page
        .getByRole("textbox", { name: "Search for topics, case" })
        .fill("technological acc");

      // Click result that navigates to Accessibility intro page with anchor
      await page
        .getByRole("link", { name: "Accessibility Introduction" })
        .click();

      // Verify highlighted text "Technological acc" is visible in main content
      await expect(
        page.locator("#main").getByText("Technological acc", { exact: true })
      ).toBeVisible();

      // Verify previous search term "India" is NOT visible (drawer closed/content changed)
      await expect(page.getByText("India").nth(2)).toBeHidden();
    });

    test("landing page search", async ({ page }) => {
      await page.goto("http://localhost:5173/srch/");
      await page
        .getByRole("textbox", { name: "Search for topics, case" })
        .click();
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

      // Click into landing page search bar
      await page
        .getByRole("textbox", { name: "Search for topics, case" })
        .click();

      // Search for "about"
      await page
        .getByRole("textbox", { name: "Search for topics, case" })
        .fill("about");

      // Click "See full results" link to navigate to search results page
      await page
        .locator("div")
        .filter({ hasText: /^See full results$/ })
        .first()
        .click();

      // Verify first search result link is visible on results page
      await expect(
        page
          .getByRole("link", { name: "Privacy Section Header Lens 2" })
          .first()
      ).toBeVisible();

      // Clear search input by double-clicking to select all
      await page
        .getByRole("textbox", { name: "Search for topics, case" })
        .dblclick();
      await page
        .getByRole("textbox", { name: "Search for topics, case" })
        .dblclick();

      // Change search to "prior" (should find Automated Decision Making content)
      await page
        .getByRole("textbox", { name: "Search for topics, case" })
        .fill("prior");

      // Click on result containing "priority" in SafeRent Solutions case study
      await page
        .getByRole("link", {
          name: "Automated Decision Making SafeRent Solutions AI Scoring System ...priority.",
        })
        .click();

      // Verify highlighted search term is visible with nested <mark> tags
      await expect(
        page.locator("div:nth-child(4) > p > mark > mark").first()
      ).toBeVisible();
    });
  });
}
