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

test("ensures that elements are still visible in split screen view", async ({
  page,
}) => {
  await page.setViewportSize({ width: 668, height: 600 });
  await page.getByRole("button", { name: "Acknowledgements" }).click();
  await expect(page.getByText("Meet our Team!Meet our")).toBeVisible();
  await page.getByText("LeadershipJulia Nettershe/").click();
  await expect(page.getByText("LeadershipJulia Nettershe/")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Leadership" })).toBeVisible();
  await expect(
    page.locator("div").filter({ hasText: "Julia Nettershe/herFaculty" }).nth(2)
  ).toBeVisible();
  await expect(page.getByRole("img", { name: "Emma Huang" })).toBeVisible();
  await expect(page.getByRole("img", { name: "Jiayi Wu" })).toBeVisible();
  await expect(
    page.getByRole("img", { name: "Jo Gasior-Kavishe" })
  ).toBeVisible();
  await expect(page.getByRole("img", { name: "Samdeet Khan" })).toBeVisible();
  await expect(page.getByRole("img", { name: "Julia Netter" })).toBeVisible();
  await expect(
    page.getByRole("img", { name: "Michelle L. Ding" })
  ).toBeVisible();
  await expect(
    page.getByRole("img", { name: "Suresh Venkatasubramanian" })
  ).toBeVisible();
  await expect(page.getByText("Julia Nettershe/her")).toBeVisible();
  await expect(page.getByText("Michelle L. Dingshe/her")).toBeVisible();
  await expect(page.getByText("Suresh Venkatasubramanian")).toBeVisible();
  await expect(page.getByText("Faculty Advisor, Assistant")).toBeVisible();
  await expect(page.getByText("Project Founder and Director")).toBeVisible();
  await expect(page.getByText("Faculty Advisor, Director of")).toBeVisible();
  await expect(page.getByRole("link", { name: "Email Suresh" })).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Michelle L. Ding's website" })
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Michelle L. Ding on LinkedIn" })
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Email Michelle L. Ding" })
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Julia Netter's website" })
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Email Julia Netter" })
  ).toBeVisible();
  await expect(page.getByRole("heading", { name: "AI Team" })).toBeVisible();
  await expect(page.getByRole("img", { name: "Emma Huang" })).toBeVisible();
  await expect(page.getByText("Emma Huangshe/her")).toBeVisible();
  await expect(
    page.getByText("Team Member | Undergraduate").first()
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Email Emma Huang" })
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Emma Huang on LinkedIn" })
  ).toBeVisible();
  await expect(
    page.locator("div").filter({ hasText: "Ethan Schenkerhe/himTeam" }).nth(2)
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Past Members" }).first()
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Privacy Team" })
  ).toBeVisible();
  await expect(page.getByRole("img", { name: "Connor Flick" })).toBeVisible();
  await expect(
    page.getByRole("img", { name: "Doren Hsiao-Wecksler" })
  ).toBeVisible();
  await expect(page.getByRole("img", { name: "Peyton Luiz" })).toBeVisible();
  await expect(page.getByText("Team Member | MPH Student in")).toBeVisible();
  await expect(page.getByText("Privacy Team Lead |")).toBeVisible();
  await expect(
    page.getByText(
      "Team Member | Undergraduate Student in Computational Biology,"
    )
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Email Connor Flick" })
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Connor Flick on LinkedIn" })
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Connor Flick's website" })
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Email Doren Hsiao-Wecksler" })
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Doren Hsiao-Wecksler on" })
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Email Peyton Luiz" })
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Peyton Luiz on LinkedIn" })
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Accessibility Team" })
  ).toBeVisible();
  await expect(
    page.getByRole("img", { name: "Andrew Junwon Lee" })
  ).toBeVisible();
  await expect(page.getByRole("img", { name: "Kalie Minor" })).toBeVisible();
  await expect(
    page.getByRole("img", { name: "Karina LaRubbio" })
  ).toBeVisible();
  await expect(page.getByRole("img", { name: "Tenzin Choezin" })).toBeVisible();
  await expect(page.getByRole("img", { name: "Tiffany Tran" })).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Product Team" })
  ).toBeVisible();
  await expect(page.getByRole("img", { name: "A.J. Shulman" })).toBeVisible();
  await expect(page.getByRole("img", { name: "Aanya Hudda" })).toBeVisible();
  await expect(page.getByRole("img", { name: "Anna Hurd" })).toBeVisible();
  await expect(page.getByRole("img", { name: "Christina Peng" })).toBeVisible();
  await expect(page.getByRole("img", { name: "Sana Saab" })).toBeVisible();
  await expect(page.getByRole("img", { name: "Joe Maffa" })).toBeVisible();
  await expect(page.getByRole("img", { name: "Jasmine Kamara" })).toBeVisible();
  await expect(
    page.locator("div").filter({ hasText: "Huda Abdulrasoolshe/" }).nth(2)
  ).toBeVisible();
  await expect(
    page.getByRole("heading", {
      name: "Additional Contributors — Faculty Advisors",
    })
  ).toBeVisible();
  await expect(
    page.getByRole("heading", {
      name: "Additional Contributors — User Studies",
    })
  ).toBeVisible();
});

test("ensures that elements are visible on the acknoledgements page", async ({
  page,
}) => {
  await page.getByRole("button", { name: "Acknowledgements" }).click();;
  await expect(page.getByText("Meet our Team!")).toBeVisible();
  await expect(page.getByText("Meet our leadership, writers")).toBeVisible();
  await expect(page.getByRole("img", { name: "Julia Netter" })).toBeVisible();
  await expect(
    page.locator("div").filter({ hasText: "Julia Nettershe/herFaculty" }).nth(2)
  ).toBeVisible();
  await expect(page.getByRole("heading", { name: "AI Team" })).toBeVisible();
  await expect(
    page
      .locator("div")
      .filter({ hasText: "Emma Huangshe/herTeam Member" })
      .nth(2)
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Privacy Team" })
  ).toBeVisible();
  await expect(
    page
      .locator("div")
      .filter({ hasText: "Connor Flickhe/himTeam Member" })
      .nth(2)
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Past Members" }).first()
  ).toBeVisible();
  await expect(
    page.locator("div").filter({ hasText: "Ethan Schenkerhe/himTeam" }).nth(2)
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Accessibility Team" })
  ).toBeVisible();
  await expect(
    page
      .locator("div")
      .filter({ hasText: "Andrew Junwon Leehe/himTeam" })
      .nth(2)
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Product Team" })
  ).toBeVisible();
  await expect(
    page.locator("div").filter({ hasText: "A.J. Shulmanhe/himProduct" }).nth(2)
  ).toBeVisible();
  await expect(
    page.getByRole("heading", {
      name: "Additional Contributors — User Studies",
    })
  ).toBeVisible();
  await expect(
    page.getByText(
      "Laura RomigSTA for CSCI1460, CSCI0220Melvin HeSTA for CSCI1430, CSCI1410Nadya"
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

test("ensures that the various links on the acknowledgement pages work", async ({
  page,
}) => {
  await page.getByRole("banner").getByText("Acknowledgements").click();
  await page.getByRole("link", { name: "Email Deborah Hurley" }).click();
  await page.getByRole("link", { name: "Timothy H Edgar on LinkedIn" }).click();
  await page
    .getByRole("link", { name: "Naemi Ditiatkovsky on LinkedIn" })
    .click();
  const page4Promise = page.waitForEvent("popup");
  await page.getByRole("link", { name: "Email Naemi Ditiatkovsky" }).click();
  const page5Promise = page.waitForEvent("popup");
  await page.getByRole("link", { name: "Nadya Tan on LinkedIn" }).click();
  const page5 = await page5Promise;
  const page6Promise = page.waitForEvent("popup");
  await page.getByRole("link", { name: "Email Nadya Tan" }).click();
  await page.getByRole("link", { name: "Melvin He on LinkedIn" }).click();
  await page.getByRole("link", { name: "Email Melvin He" }).click();
  await page.getByRole("link", { name: "Laura Romig on LinkedIn" }).click();
  await page.getByRole("link", { name: "Email Laura Romig" }).click();
  await page
    .getByRole("link", { name: "Huda Abdulrasool on LinkedIn" })
    .click();

  await page.getByRole("link", { name: "Email Huda Abdulrasool" }).click();

  await page.getByRole("link", { name: "Email Jasmine Kamara" }).click();
  const page14Promise = page.waitForEvent("popup");
  await page.getByRole("link", { name: "Jasmine Kamara on LinkedIn" }).click();
  const page14 = await page14Promise;
  const page15Promise = page.waitForEvent("popup");
  await page.getByRole("link", { name: "Jasmine Kamara's website" }).click();
  const page15 = await page15Promise;
  await page.getByRole("link", { name: "Email Joe Maffa" }).click();
  const page17Promise = page.waitForEvent("popup");
  await page.getByRole("link", { name: "Joe Maffa on LinkedIn" }).click();
  const page17 = await page17Promise;
  await page.getByRole("link", { name: "Email Sana Saab" }).click();
  const page19Promise = page.waitForEvent("popup");
  await page.getByRole("link", { name: "Sana Saab on LinkedIn" }).click();
  const page19 = await page19Promise;
  await page.getByRole("link", { name: "Email A.J. Shulman" }).click();

  const page21Promise = page.waitForEvent("popup");
  await page.getByRole("link", { name: "A.J. Shulman on LinkedIn" }).click();
  const page21 = await page21Promise;
  await page.getByRole("link", { name: "Email Aanya Hudda" }).click();
  const page23Promise = page.waitForEvent("popup");
  await page.getByRole("link", { name: "Aanya Hudda on LinkedIn" }).click();
  const page23 = await page23Promise;

  await page.getByRole("link", { name: "Email Anna Hurd" }).click();
  await page.getByRole("link", { name: "Email Christina Peng" }).click();
  const page26Promise = page.waitForEvent("popup");
  await page.getByRole("link", { name: "Christina Peng on LinkedIn" }).click();
  const page26 = await page26Promise;
  const page27Promise = page.waitForEvent("popup");
  await page.getByRole("link", { name: "Karina LaRubbio's website" }).click();
  const page27 = await page27Promise;
  const page28Promise = page.waitForEvent("popup");
  await page.getByRole("link", { name: "Ethan Schenker's website" }).click();
  const page28 = await page28Promise;
  await page
    .locator("div:nth-child(8) > div > .ack-card-icons")
    .first()
    .click();
  const page29Promise = page.waitForEvent("popup");
  await page.getByRole("link", { name: "Connor Flick's website" }).click();
  const page29 = await page29Promise;
  const page30Promise = page.waitForEvent("popup");
  await page.getByRole("link", { name: "Michelle L. Ding's website" }).click();
  const page30 = await page30Promise;
  const page31Promise = page.waitForEvent("popup");
  await page.getByRole("link", { name: "Julia Netter's website" }).click();
  const page31 = await page31Promise;
});
