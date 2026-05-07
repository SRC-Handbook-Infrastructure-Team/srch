# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: rightSidebar.spec.ts >> Right sidebar tests in small screen size (overlay mode) >> right sidebar is scrollable or configured to scroll (overlay mode)
- Location: src/tests/rightSidebar.spec.ts:105:3

# Error details

```
Test timeout of 30000ms exceeded while running "beforeEach" hook.
```

```
Error: page.waitForSelector: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('a.srch-drawer-link') to be visible

```

# Page snapshot

```yaml
- generic [ref=e2]:
  - banner:
    - generic [ref=e5]:
      - button "Go to home page" [ref=e6] [cursor=pointer]:
        - img "Socially Responsible Computing Handbook" [ref=e7]
      - generic [ref=e8]:
        - button "Modules" [ref=e10] [cursor=pointer]:
          - generic [ref=e11]: Modules
        - button "About" [ref=e12] [cursor=pointer]
        - button "Acknowledgments" [ref=e13] [cursor=pointer]
      - generic [ref=e14]:
        - button "Open search" [ref=e15] [cursor=pointer]:
          - img [ref=e16]
        - button "Switch to dark mode" [ref=e19] [cursor=pointer]:
          - img [ref=e20]
  - generic [ref=e23]:
    - generic [ref=e25]:
      - generic [ref=e26]: Brown SRC Handbook
      - generic [ref=e27]: This Handbook is your guide to integrating ethics, responsibility, and social awareness into computer science teaching. Whether you are an instructor designing a syllabus, a TA leading discussions, or a student exploring what impact your work can have, this site offers curated modules, case studies, discussion prompts, and resource tools.
    - button "Scroll to curriculum" [ref=e28] [cursor=pointer]:
      - img "Scroll" [ref=e29]
    - generic [ref=e30]:
      - generic [ref=e31]:
        - generic [ref=e32]:
          - generic [ref=e33]: Check Out Our Curriculum
          - generic [ref=e34]: Explore our focus areas of socially responsible computing
        - generic [ref=e35]:
          - button "01. Privacy Icon Privacy We live in a new age for privacy. The advent of digital sensors and other technologies allow us to collect increasing amounts and..." [ref=e36] [cursor=pointer]:
            - generic [ref=e38]: "01."
            - img "Privacy Icon" [ref=e41]
            - generic [ref=e42]:
              - generic [ref=e43]: Privacy
              - generic [ref=e44]: We live in a new age for privacy. The advent of digital sensors and other technologies allow us to collect increasing amounts and...
            - img [ref=e45]
          - button "02. Accessibility Icon Accessibility As technology becomes more deeply embedded in how people work, learn, communicate, and access services, questions of who can actua..." [ref=e47] [cursor=pointer]:
            - generic [ref=e49]: "02."
            - img "Accessibility Icon" [ref=e52]
            - generic [ref=e53]:
              - generic [ref=e54]: Accessibility
              - generic [ref=e55]: As technology becomes more deeply embedded in how people work, learn, communicate, and access services, questions of who can actua...
            - img [ref=e56]
          - button "03. Automated Decision Making Icon Automated Decision Making Artificial intelligence now shapes how institutions sort, predict, recommend, classify, and decide. It helps determine who is flag..." [ref=e58] [cursor=pointer]:
            - generic [ref=e60]: "03."
            - img "Automated Decision Making Icon" [ref=e63]
            - generic [ref=e64]:
              - generic [ref=e65]: Automated Decision Making
              - generic [ref=e66]: Artificial intelligence now shapes how institutions sort, predict, recommend, classify, and decide. It helps determine who is flag...
            - img [ref=e67]
          - generic [ref=e69]:
            - img "Coming Soon Icon" [ref=e71]
            - generic [ref=e72]:
              - generic [ref=e73]: And more to come...
              - generic [ref=e74]: The SRCH is constantly doing research and writing primers to expand our content.
      - generic [ref=e76]:
        - generic [ref=e77]:
          - generic [ref=e78]: Search for Content
          - paragraph [ref=e79]: Find specific topics, case studies, and resources quickly
        - generic [ref=e81]:
          - button "Run search" [ref=e82] [cursor=pointer]:
            - img [ref=e83]
          - textbox "Search handbook content" [ref=e87]:
            - /placeholder: Search for topics, case studies, terms...
      - generic [ref=e89]:
        - generic [ref=e90]: How to Use the Handbook
        - generic [ref=e91]:
          - paragraph [ref=e92]: "Each section contains a series of primers that are loosely aligned with learning objectives in the SRC curriculum. Use them to:"
          - generic [ref=e93]:
            - generic [ref=e94]:
              - img "Target Icon" [ref=e95]
              - paragraph [ref=e96]: Structure your lesson or course with embedded ethical modules
            - generic [ref=e97]:
              - img "People Icon" [ref=e98]
              - paragraph [ref=e99]: Give students real examples that connect tech to society
            - generic [ref=e100]:
              - img "Lightbulb Icon" [ref=e101]
              - paragraph [ref=e102]: Foster inclusive, critical thinking in the classroom
            - generic [ref=e103]:
              - img "Book Icon" [ref=e104]
              - paragraph [ref=e105]: Adapt and contribute content so it remains relevant and impactful
        - button "Learn more Arrow for the Learn More Button" [ref=e107] [cursor=pointer]:
          - generic [ref=e108]: Learn more
          - img "Arrow for the Learn More Button" [ref=e109]
      - generic [ref=e111]:
        - generic [ref=e112]:
          - generic [ref=e113]: Connect with Us
          - paragraph [ref=e114]: Follow us to receive CNTR and SRC@Brown CS news and updates!
        - generic [ref=e115]:
          - 'link "CNTR logo CNTR Website: cntr.brown.edu" [ref=e116] [cursor=pointer]':
            - /url: https://cntr.brown.edu/
            - generic [ref=e117]:
              - img "CNTR logo" [ref=e118]
              - paragraph [ref=e119]:
                - text: "CNTR Website:"
                - text: cntr.brown.edu
          - 'link "instagram logo CNTR Instagram: @brown_cntr" [ref=e120] [cursor=pointer]':
            - /url: https://www.instagram.com/brown_cntr/
            - generic [ref=e121]:
              - img "instagram logo" [ref=e122]
              - paragraph [ref=e123]:
                - text: "CNTR Instagram:"
                - text: "@brown_cntr"
          - 'link "CNTR logo SRC@Brown CS Website: responsible.cs.brown.edu" [ref=e124] [cursor=pointer]':
            - /url: https://responsible.cs.brown.edu/
            - generic [ref=e125]:
              - img "CNTR logo" [ref=e126]
              - paragraph [ref=e127]:
                - text: "SRC@Brown CS Website:"
                - text: responsible.cs.brown.edu
  - generic [ref=e131]:
    - generic [ref=e132]:
      - img "Socially Responsible Computing Handbook" [ref=e134]
      - generic [ref=e135]:
        - generic [ref=e136]: Modules
        - generic [ref=e137]:
          - img "Privacy Icon" [ref=e139]
          - button "Privacy" [ref=e140] [cursor=pointer]
        - generic [ref=e141]:
          - img "Accessibility Icon" [ref=e143]
          - button "Accessibility" [ref=e144] [cursor=pointer]
        - generic [ref=e145]:
          - img "Automated Decision Making Icon" [ref=e147]
          - button "Automated Decision Making" [ref=e148] [cursor=pointer]
      - generic [ref=e149]:
        - generic [ref=e150]: Quick Links
        - button "About" [ref=e151] [cursor=pointer]
        - button "Acknowledgments" [ref=e152] [cursor=pointer]
      - generic [ref=e153]:
        - generic [ref=e154]: Have Feedback?
        - paragraph [ref=e155] [cursor=pointer]:
          - text: "Contact:"
          - link "src_handbook@brown.edu" [ref=e156]:
            - /url: mailto:src_handbook@brown.edu
        - paragraph [ref=e157] [cursor=pointer]:
          - link "Bug Report Form" [ref=e158]:
            - /url: https://docs.google.com/forms/d/e/1FAIpQLSex69OXWeME_pnC5IOYB754xsxmu8SH7rdV_LF-k7Q_TefHaA/viewform?usp=dialog
    - paragraph [ref=e159]: © 2026 Brown University. All rights reserved.
```

# Test source

```ts
  1   | import { test, expect } from "@playwright/test";
  2   | 
  3   | // replicate the React slugify function (kept for consistency / future use)
  4   | function slugify(text = "") {
  5   |   return text
  6   |     .toString()
  7   |     .trim()
  8   |     .toLowerCase()
  9   |     .replace(/[^a-z0-9\s-]/g, "")
  10  |     .replace(/\s+/g, "-")
  11  |     .replace(/-+/g, "-");
  12  | }
  13  | 
  14  | // Base route for content + sidebar
  15  | const INITIAL_URL = "http://localhost:5173/srch/privacy/whatIsPrivacy";
  16  | 
  17  | const rightSidebar = () => "aside.right-sidebar";
  18  | const mainContent = () => "main.main-content";
  19  | const rightResizeHitbox = () => "div.right-resize-hitbox";
  20  | 
  21  | // Small helper to grab the first drawer chip safely
  22  | async function getFirstDrawerChip(page) {
  23  |   const chip = page.locator("a.srch-drawer-link").first();
  24  |   await expect(chip).toBeVisible();
  25  |   const termKey = await chip.getAttribute("data-term");
  26  |   if (!termKey) throw new Error("Drawer chip has no data-term attribute");
  27  |   return { chip, termKey };
  28  | }
  29  | 
  30  | test.describe("Right sidebar tests in small screen size (overlay mode)", () => {
  31  |   test.beforeEach(async ({ page }) => {
  32  |     // < 1280 → overlay mode
  33  |     await page.setViewportSize({ width: 1000, height: 600 });
  34  |     await page.goto(INITIAL_URL);
> 35  |     await page.waitForSelector("a.srch-drawer-link"); // wait for markdown + chips
      |                ^ Error: page.waitForSelector: Test timeout of 30000ms exceeded.
  36  |   });
  37  | 
  38  |   // Test 1 – clicking drawer links opens sidebar
  39  |   test("clicking drawer links opens right sidebar and updates URL (overlay mode)", async ({
  40  |     page,
  41  |   }) => {
  42  |     await expect(page.locator("html")).toHaveAttribute(
  43  |       "data-layout-mode",
  44  |       "overlay",
  45  |     );
  46  | 
  47  |     const { chip, termKey } = await getFirstDrawerChip(page);
  48  | 
  49  |     // Before click, sidebar should be closed
  50  |     await expect(page.locator(rightSidebar())).not.toHaveClass(/open/);
  51  | 
  52  |     await chip.click();
  53  | 
  54  |     // Right sidebar should slide in and HTML should get right-open class
  55  |     await expect(page.locator(rightSidebar())).toHaveClass(/open/);
  56  |     await expect(page.locator("html")).toHaveClass(/right-open/);
  57  | 
  58  |     // Active chip should have the active class
  59  |     await expect(
  60  |       page.locator(`a.srch-drawer-link[data-term="${termKey}"]`),
  61  |     ).toHaveClass(/srch-drawer-link-active/);
  62  | 
  63  |     // URL should now end with /:termKey
  64  |     await expect(page).toHaveURL(new RegExp(`/${termKey}/?$`));
  65  |   });
  66  | 
  67  |   // Test 2 – closing via "X" or re-clicking term closes sidebar and removes slug
  68  |   test('closing via "X" or re-clicking the term closes right sidebar and removes slug (overlay mode)', async ({
  69  |     page,
  70  |   }) => {
  71  |     const { termKey } = await getFirstDrawerChip(page);
  72  |     const chip = page
  73  |       .locator(`a.srch-drawer-link[data-term="${termKey}"]`)
  74  |       .first();
  75  | 
  76  |     // Open the drawer
  77  |     await chip.click();
  78  |     await expect(page.locator(rightSidebar())).toHaveClass(/open/);
  79  |     await expect(page).toHaveURL(new RegExp(`/${termKey}/?$`));
  80  | 
  81  |     // 2a) Close via "X" button
  82  |     const closeButton = page.locator("button.right-drawer-close-btn");
  83  |     await expect(closeButton).toBeVisible();
  84  |     await closeButton.click();
  85  | 
  86  |     await expect(page.locator(rightSidebar())).not.toHaveClass(/open/);
  87  |     await expect(page.locator("html")).not.toHaveClass(/right-open/);
  88  |     await expect(chip).not.toHaveClass(/srch-drawer-link-active/);
  89  |     await expect(page).not.toHaveURL(new RegExp(`/${termKey}/?$`));
  90  | 
  91  |     // 2b) Re-open, then close by re-clicking the active term
  92  |     await chip.click();
  93  |     await expect(page.locator(rightSidebar())).toHaveClass(/open/);
  94  |     await expect(chip).toHaveClass(/srch-drawer-link-active/);
  95  | 
  96  |     // Re-click the same chip → MarkdownRenderer calls onDrawerOpen(null)
  97  |     await chip.click();
  98  | 
  99  |     await expect(page.locator(rightSidebar())).not.toHaveClass(/open/);
  100 |     await expect(page.locator("html")).not.toHaveClass(/right-open/);
  101 |     await expect(page).not.toHaveURL(new RegExp(`/${termKey}/?$`));
  102 |   });
  103 | 
  104 |   // Test 3 – scrolling within the right sidebar
  105 |   test("right sidebar is scrollable or configured to scroll (overlay mode)", async ({
  106 |     page,
  107 |   }) => {
  108 |     const { chip } = await getFirstDrawerChip(page);
  109 |     await chip.click();
  110 | 
  111 |     // The actual scroll container is the aside.right-sidebar element
  112 |     const scrollContainer = page.locator(rightSidebar());
  113 |     await expect(scrollContainer).toHaveClass(/open/);
  114 |     await expect(scrollContainer).toBeVisible();
  115 | 
  116 |     const metrics = await scrollContainer.evaluate((el) => {
  117 |       const before = el.scrollTop;
  118 |       const canScroll = el.scrollHeight > el.clientHeight;
  119 | 
  120 |       if (canScroll) {
  121 |         el.scrollTo(0, el.scrollHeight);
  122 |       }
  123 | 
  124 |       const after = el.scrollTop;
  125 |       const overflowY = window.getComputedStyle(el).overflowY;
  126 | 
  127 |       return {
  128 |         canScroll,
  129 |         scrolled: after > before,
  130 |         overflowY,
  131 |       };
  132 |     });
  133 | 
  134 |     if (metrics.canScroll) {
  135 |       // When content is taller than the container, scrolling should change scrollTop
```