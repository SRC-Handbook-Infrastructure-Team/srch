# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: search.spec.ts >> Viewport: small >> nav bar search
- Location: src/tests/search.spec.ts:12:5

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.fill: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByRole('banner').getByRole('textbox', { name: 'Search for topics, case' })

```

# Page snapshot

```yaml
- generic [ref=e2]:
  - banner:
    - generic [ref=e4]:
      - button "Go to home page" [ref=e5] [cursor=pointer]:
        - img "Socially Responsible Computing Handbook" [ref=e6]
      - generic [ref=e7]:
        - button "Open search" [ref=e8] [cursor=pointer]:
          - img [ref=e9]
        - button "Switch to dark mode" [ref=e12] [cursor=pointer]:
          - img [ref=e13]
        - button "Close menu" [active] [ref=e15] [cursor=pointer]:
          - img [ref=e16]
    - generic [ref=e18]:
      - button "About" [ref=e19] [cursor=pointer]
      - button "Acknowledgments" [ref=e20] [cursor=pointer]
      - button "Modules" [ref=e22] [cursor=pointer]:
        - text: Modules
        - img [ref=e23]
  - generic [ref=e26]:
    - generic [ref=e28]:
      - generic [ref=e29]: Brown SRC Handbook
      - generic [ref=e30]: This Handbook is your guide to integrating ethics, responsibility, and social awareness into computer science teaching. Whether you are an instructor designing a syllabus, a TA leading discussions, or a student exploring what impact your work can have, this site offers curated modules, case studies, discussion prompts, and resource tools.
    - button "Scroll to curriculum" [ref=e31] [cursor=pointer]:
      - img "Scroll" [ref=e32]
    - generic [ref=e33]:
      - generic [ref=e34]:
        - generic [ref=e35]:
          - generic [ref=e36]: Check Out Our Curriculum
          - generic [ref=e37]: Explore our focus areas of socially responsible computing
        - generic [ref=e38]:
          - button "01. Privacy Icon Privacy We live in a new age for privacy. The advent of digital sensors and other technologies allow us to collect increasing amounts and..." [ref=e39] [cursor=pointer]:
            - generic [ref=e41]: "01."
            - img "Privacy Icon" [ref=e44]
            - generic [ref=e45]:
              - generic [ref=e46]: Privacy
              - generic [ref=e47]: We live in a new age for privacy. The advent of digital sensors and other technologies allow us to collect increasing amounts and...
            - img [ref=e48]
          - button "02. Accessibility Icon Accessibility As technology becomes more deeply embedded in how people work, learn, communicate, and access services, questions of who can actua..." [ref=e50] [cursor=pointer]:
            - generic [ref=e52]: "02."
            - img "Accessibility Icon" [ref=e55]
            - generic [ref=e56]:
              - generic [ref=e57]: Accessibility
              - generic [ref=e58]: As technology becomes more deeply embedded in how people work, learn, communicate, and access services, questions of who can actua...
            - img [ref=e59]
          - button "03. Automated Decision Making Icon Automated Decision Making Artificial intelligence now shapes how institutions sort, predict, recommend, classify, and decide. It helps determine who is flag..." [ref=e61] [cursor=pointer]:
            - generic [ref=e63]: "03."
            - img "Automated Decision Making Icon" [ref=e66]
            - generic [ref=e67]:
              - generic [ref=e68]: Automated Decision Making
              - generic [ref=e69]: Artificial intelligence now shapes how institutions sort, predict, recommend, classify, and decide. It helps determine who is flag...
            - img [ref=e70]
          - generic [ref=e72]:
            - img "Coming Soon Icon" [ref=e74]
            - generic [ref=e75]:
              - generic [ref=e76]: And more to come...
              - generic [ref=e77]: The SRCH is constantly doing research and writing primers to expand our content.
      - generic [ref=e79]:
        - generic [ref=e80]:
          - generic [ref=e81]: Search for Content
          - paragraph [ref=e82]: Find specific topics, case studies, and resources quickly
        - generic [ref=e84]:
          - button "Run search" [ref=e85] [cursor=pointer]:
            - img [ref=e86]
          - textbox "Search handbook content" [ref=e90]:
            - /placeholder: Search for topics, case studies, terms...
      - generic [ref=e92]:
        - generic [ref=e93]: How to Use the Handbook
        - generic [ref=e94]:
          - paragraph [ref=e95]: "Each section contains a series of primers that are loosely aligned with learning objectives in the SRC curriculum. Use them to:"
          - generic [ref=e96]:
            - generic [ref=e97]:
              - img "Target Icon" [ref=e98]
              - paragraph [ref=e99]: Structure your lesson or course with embedded ethical modules
            - generic [ref=e100]:
              - img "People Icon" [ref=e101]
              - paragraph [ref=e102]: Give students real examples that connect tech to society
            - generic [ref=e103]:
              - img "Lightbulb Icon" [ref=e104]
              - paragraph [ref=e105]: Foster inclusive, critical thinking in the classroom
            - generic [ref=e106]:
              - img "Book Icon" [ref=e107]
              - paragraph [ref=e108]: Adapt and contribute content so it remains relevant and impactful
        - button "Learn more Arrow for the Learn More Button" [ref=e110] [cursor=pointer]:
          - generic [ref=e111]: Learn more
          - img "Arrow for the Learn More Button" [ref=e112]
      - generic [ref=e114]:
        - generic [ref=e115]:
          - generic [ref=e116]: Connect with Us
          - paragraph [ref=e117]: Follow us to receive CNTR and SRC@Brown CS news and updates!
        - generic [ref=e118]:
          - 'link "CNTR logo CNTR Website: cntr.brown.edu" [ref=e119] [cursor=pointer]':
            - /url: https://cntr.brown.edu/
            - generic [ref=e120]:
              - img "CNTR logo" [ref=e121]
              - paragraph [ref=e122]:
                - text: "CNTR Website:"
                - text: cntr.brown.edu
          - 'link "instagram logo CNTR Instagram: @brown_cntr" [ref=e123] [cursor=pointer]':
            - /url: https://www.instagram.com/brown_cntr/
            - generic [ref=e124]:
              - img "instagram logo" [ref=e125]
              - paragraph [ref=e126]:
                - text: "CNTR Instagram:"
                - text: "@brown_cntr"
          - 'link "CNTR logo SRC@Brown CS Website: responsible.cs.brown.edu" [ref=e127] [cursor=pointer]':
            - /url: https://responsible.cs.brown.edu/
            - generic [ref=e128]:
              - img "CNTR logo" [ref=e129]
              - paragraph [ref=e130]:
                - text: "SRC@Brown CS Website:"
                - text: responsible.cs.brown.edu
  - generic [ref=e134]:
    - img "Socially Responsible Computing Handbook" [ref=e136]
    - generic [ref=e137]:
      - generic [ref=e138]:
        - generic [ref=e139]: Modules
        - generic [ref=e140]:
          - img "Privacy Icon" [ref=e142]
          - button "Privacy" [ref=e143] [cursor=pointer]
        - generic [ref=e144]:
          - img "Accessibility Icon" [ref=e146]
          - button "Accessibility" [ref=e147] [cursor=pointer]
        - generic [ref=e148]:
          - img "Automated Decision Making Icon" [ref=e150]
          - button "Automated Decision Making" [ref=e151] [cursor=pointer]
      - generic [ref=e152]:
        - generic [ref=e153]: Quick Links
        - button "About" [ref=e154] [cursor=pointer]
        - button "Acknowledgments" [ref=e155] [cursor=pointer]
        - generic [ref=e156]:
          - generic [ref=e157]: Have Feedback?
          - paragraph [ref=e158] [cursor=pointer]:
            - text: "Contact:"
            - link "src_handbook@brown.edu" [ref=e159]:
              - /url: mailto:src_handbook@brown.edu
          - paragraph [ref=e160] [cursor=pointer]:
            - link "Bug Report Form" [ref=e161]:
              - /url: https://docs.google.com/forms/d/e/1FAIpQLSex69OXWeME_pnC5IOYB754xsxmu8SH7rdV_LF-k7Q_TefHaA/viewform?usp=dialog
    - paragraph [ref=e162]: © 2026 Brown University. All rights reserved.
```

# Test source

```ts
  1   | import { test, expect } from "@playwright/test";
  2   | 
  3   | const viewports = [
  4   |   { name: "default", config: {} },
  5   |   { name: "small", config: { viewport: { width: 668, height: 600 } } },
  6   | ];
  7   | 
  8   | for (const vp of viewports) {
  9   |   test.describe(`Viewport: ${vp.name}`, () => {
  10  |     test.use(vp.config);
  11  | 
  12  |     test("nav bar search", async ({ page }) => {
  13  |       await page.goto("http://localhost:5173/srch/");
  14  | 
  15  |       // Open nav search bar and search for "about"
  16  |       await page.locator("svg").nth(4).click();
  17  |       await page
  18  |         .getByRole("banner")
  19  |         .getByRole("textbox", { name: "Search for topics, case" })
> 20  |         .fill("about");
      |          ^ Error: locator.fill: Test timeout of 30000ms exceeded.
  21  | 
  22  |       // Click a section level search result (should navigate to Privacy page)
  23  |       await page
  24  |         .getByRole("link", { name: "Privacy Section Header Lens 2" })
  25  |         .click();
  26  | 
  27  |       // Click a drawer/sidebar search result (should open right sidebar with specific term)
  28  |       // Look for a result that contains text "as a gate we can open or" in the snippet
  29  |       await page
  30  |         .getByRole("link", { name: "as a gate we can open or" })
  31  |         .click();
  32  | 
  33  |       // Change search query to "barre" (term found in sidebar)
  34  |       await page
  35  |         .getByRole("textbox", { name: "Search for topics, case" })
  36  |         .press("ControlOrMeta+a");
  37  |       await page
  38  |         .getByRole("textbox", { name: "Search for topics, case" })
  39  |         .fill("barre");
  40  | 
  41  |       // Click the sidebar result from dropdown
  42  |       await page.getByRole("link", { name: "Privacy Case Study: ..." }).click();
  43  | 
  44  |       // Close sidebar by clicking logo/home
  45  |       await page
  46  |         .getByRole("img", { name: "Socially Responsible" })
  47  |         .nth(1)
  48  |         .click();
  49  | 
  50  |       // Open nav search, search for "barre" again
  51  |       await page.locator("svg").nth(4).click();
  52  |       await page
  53  |         .getByRole("banner")
  54  |         .getByRole("textbox", { name: "Search for topics, case" })
  55  |         .press("ControlOrMeta+a");
  56  |       await page
  57  |         .getByRole("banner")
  58  |         .getByRole("textbox", { name: "Search for topics, case" })
  59  |         .fill("barre");
  60  | 
  61  |       // Click case study result and verify drawer opens with "barre" content
  62  |       await page.getByRole("link", { name: "Privacy Case Study: ..." }).click();
  63  |       await expect(
  64  |         page.getByLabel("Right sidebar drawer").getByText("Barre")
  65  |       ).toBeVisible();
  66  | 
  67  |       // Navigate home to close drawer
  68  |       await page
  69  |         .getByRole("img", { name: "Socially Responsible" })
  70  |         .nth(1)
  71  |         .click();
  72  | 
  73  |       // Search for "india" (should find Accessibility equity case study)
  74  |       await page.locator("svg").nth(4).click();
  75  |       await page
  76  |         .getByRole("banner")
  77  |         .getByRole("textbox", { name: "Search for topics, case" })
  78  |         .fill("india");
  79  | 
  80  |       // Click equity case study result containing "India"
  81  |       await page
  82  |         .getByRole("link", { name: "Accessibility Equity Case" })
  83  |         .click();
  84  | 
  85  |       // Open nav search again using CSS selector
  86  |       await page
  87  |         .locator(
  88  |           "#root > header > .navbar-padding > .chakra-stack.header-hstack > .chakra-stack.right-hstack > div:nth-child(5) > .chakra-icon"
  89  |         )
  90  |         .click();
  91  | 
  92  |       // Search for "technological acc" 
  93  |       await page
  94  |         .getByRole("textbox", { name: "Search for topics, case" })
  95  |         .press("ControlOrMeta+a");
  96  |       await page
  97  |         .getByRole("textbox", { name: "Search for topics, case" })
  98  |         .fill("technological acc");
  99  | 
  100 |       // Click result that navigates to Accessibility intro page with anchor
  101 |       await page
  102 |         .getByRole("link", { name: "Accessibility Introduction" })
  103 |         .click();
  104 | 
  105 |       // Verify highlighted text "Technological acc" is visible in main content
  106 |       await expect(
  107 |         page.locator("#main").getByText("Technological acc", { exact: true })
  108 |       ).toBeVisible();
  109 | 
  110 |       // Verify previous search term "India" is NOT visible (drawer closed/content changed)
  111 |       await expect(page.getByText("India").nth(2)).toBeHidden();
  112 |     });
  113 | 
  114 |     test("landing page search", async ({ page }) => {
  115 |       await page.goto("http://localhost:5173/srch/");
  116 |       await page
  117 |         .getByRole("textbox", { name: "Search for topics, case" })
  118 |         .click();
  119 |       await page
  120 |         .getByRole("textbox", { name: "Search for topics, case" })
```