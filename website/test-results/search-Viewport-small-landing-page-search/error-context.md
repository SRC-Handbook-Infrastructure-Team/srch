# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: search.spec.ts >> Viewport: small >> landing page search
- Location: src/tests/search.spec.ts:114:5

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByRole('textbox', { name: 'Search for topics, case' })

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
        - button "Open menu" [ref=e15] [cursor=pointer]:
          - img [ref=e16]
  - generic [ref=e18]:
    - generic [ref=e20]:
      - generic [ref=e21]: Brown SRC Handbook
      - generic [ref=e22]: This Handbook is your guide to integrating ethics, responsibility, and social awareness into computer science teaching. Whether you are an instructor designing a syllabus, a TA leading discussions, or a student exploring what impact your work can have, this site offers curated modules, case studies, discussion prompts, and resource tools.
    - button "Scroll to curriculum" [ref=e23] [cursor=pointer]:
      - img "Scroll" [ref=e24]
    - generic [ref=e25]:
      - generic [ref=e26]:
        - generic [ref=e27]:
          - generic [ref=e28]: Check Out Our Curriculum
          - generic [ref=e29]: Explore our focus areas of socially responsible computing
        - generic [ref=e30]:
          - button "01. Privacy Icon Privacy We live in a new age for privacy. The advent of digital sensors and other technologies allow us to collect increasing amounts and..." [ref=e31] [cursor=pointer]:
            - generic [ref=e33]: "01."
            - img "Privacy Icon" [ref=e36]
            - generic [ref=e37]:
              - generic [ref=e38]: Privacy
              - generic [ref=e39]: We live in a new age for privacy. The advent of digital sensors and other technologies allow us to collect increasing amounts and...
            - img [ref=e40]
          - button "02. Accessibility Icon Accessibility As technology becomes more deeply embedded in how people work, learn, communicate, and access services, questions of who can actua..." [ref=e42] [cursor=pointer]:
            - generic [ref=e44]: "02."
            - img "Accessibility Icon" [ref=e47]
            - generic [ref=e48]:
              - generic [ref=e49]: Accessibility
              - generic [ref=e50]: As technology becomes more deeply embedded in how people work, learn, communicate, and access services, questions of who can actua...
            - img [ref=e51]
          - button "03. Automated Decision Making Icon Automated Decision Making Artificial intelligence now shapes how institutions sort, predict, recommend, classify, and decide. It helps determine who is flag..." [ref=e53] [cursor=pointer]:
            - generic [ref=e55]: "03."
            - img "Automated Decision Making Icon" [ref=e58]
            - generic [ref=e59]:
              - generic [ref=e60]: Automated Decision Making
              - generic [ref=e61]: Artificial intelligence now shapes how institutions sort, predict, recommend, classify, and decide. It helps determine who is flag...
            - img [ref=e62]
          - generic [ref=e64]:
            - img "Coming Soon Icon" [ref=e66]
            - generic [ref=e67]:
              - generic [ref=e68]: And more to come...
              - generic [ref=e69]: The SRCH is constantly doing research and writing primers to expand our content.
      - generic [ref=e71]:
        - generic [ref=e72]:
          - generic [ref=e73]: Search for Content
          - paragraph [ref=e74]: Find specific topics, case studies, and resources quickly
        - generic [ref=e76]:
          - button "Run search" [ref=e77] [cursor=pointer]:
            - img [ref=e78]
          - textbox "Search handbook content" [ref=e82]:
            - /placeholder: Search for topics, case studies, terms...
      - generic [ref=e84]:
        - generic [ref=e85]: How to Use the Handbook
        - generic [ref=e86]:
          - paragraph [ref=e87]: "Each section contains a series of primers that are loosely aligned with learning objectives in the SRC curriculum. Use them to:"
          - generic [ref=e88]:
            - generic [ref=e89]:
              - img "Target Icon" [ref=e90]
              - paragraph [ref=e91]: Structure your lesson or course with embedded ethical modules
            - generic [ref=e92]:
              - img "People Icon" [ref=e93]
              - paragraph [ref=e94]: Give students real examples that connect tech to society
            - generic [ref=e95]:
              - img "Lightbulb Icon" [ref=e96]
              - paragraph [ref=e97]: Foster inclusive, critical thinking in the classroom
            - generic [ref=e98]:
              - img "Book Icon" [ref=e99]
              - paragraph [ref=e100]: Adapt and contribute content so it remains relevant and impactful
        - button "Learn more Arrow for the Learn More Button" [ref=e102] [cursor=pointer]:
          - generic [ref=e103]: Learn more
          - img "Arrow for the Learn More Button" [ref=e104]
      - generic [ref=e106]:
        - generic [ref=e107]:
          - generic [ref=e108]: Connect with Us
          - paragraph [ref=e109]: Follow us to receive CNTR and SRC@Brown CS news and updates!
        - generic [ref=e110]:
          - 'link "CNTR logo CNTR Website: cntr.brown.edu" [ref=e111] [cursor=pointer]':
            - /url: https://cntr.brown.edu/
            - generic [ref=e112]:
              - img "CNTR logo" [ref=e113]
              - paragraph [ref=e114]:
                - text: "CNTR Website:"
                - text: cntr.brown.edu
          - 'link "instagram logo CNTR Instagram: @brown_cntr" [ref=e115] [cursor=pointer]':
            - /url: https://www.instagram.com/brown_cntr/
            - generic [ref=e116]:
              - img "instagram logo" [ref=e117]
              - paragraph [ref=e118]:
                - text: "CNTR Instagram:"
                - text: "@brown_cntr"
          - 'link "CNTR logo SRC@Brown CS Website: responsible.cs.brown.edu" [ref=e119] [cursor=pointer]':
            - /url: https://responsible.cs.brown.edu/
            - generic [ref=e120]:
              - img "CNTR logo" [ref=e121]
              - paragraph [ref=e122]:
                - text: "SRC@Brown CS Website:"
                - text: responsible.cs.brown.edu
  - generic [ref=e126]:
    - img "Socially Responsible Computing Handbook" [ref=e128]
    - generic [ref=e129]:
      - generic [ref=e130]:
        - generic [ref=e131]: Modules
        - generic [ref=e132]:
          - img "Privacy Icon" [ref=e134]
          - button "Privacy" [ref=e135] [cursor=pointer]
        - generic [ref=e136]:
          - img "Accessibility Icon" [ref=e138]
          - button "Accessibility" [ref=e139] [cursor=pointer]
        - generic [ref=e140]:
          - img "Automated Decision Making Icon" [ref=e142]
          - button "Automated Decision Making" [ref=e143] [cursor=pointer]
      - generic [ref=e144]:
        - generic [ref=e145]: Quick Links
        - button "About" [ref=e146] [cursor=pointer]
        - button "Acknowledgments" [ref=e147] [cursor=pointer]
        - generic [ref=e148]:
          - generic [ref=e149]: Have Feedback?
          - paragraph [ref=e150] [cursor=pointer]:
            - text: "Contact:"
            - link "src_handbook@brown.edu" [ref=e151]:
              - /url: mailto:src_handbook@brown.edu
          - paragraph [ref=e152] [cursor=pointer]:
            - link "Bug Report Form" [ref=e153]:
              - /url: https://docs.google.com/forms/d/e/1FAIpQLSex69OXWeME_pnC5IOYB754xsxmu8SH7rdV_LF-k7Q_TefHaA/viewform?usp=dialog
    - paragraph [ref=e154]: © 2026 Brown University. All rights reserved.
```

# Test source

```ts
  18  |         .getByRole("banner")
  19  |         .getByRole("textbox", { name: "Search for topics, case" })
  20  |         .fill("about");
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
> 118 |         .click();
      |          ^ Error: locator.click: Test timeout of 30000ms exceeded.
  119 |       await page
  120 |         .getByRole("textbox", { name: "Search for topics, case" })
  121 |         .fill("create");
  122 |       await page
  123 |         .getByRole("link", { name: "Accessibility Disability Case" })
  124 |         .first()
  125 |         .click();
  126 |       await expect(
  127 |         page.getByLabel("Right sidebar drawer").getByText("create")
  128 |       ).toBeVisible();
  129 |     });
  130 | 
  131 |     test("search results page search", async ({ page }) => {
  132 | 
  133 |       await page.goto("http://localhost:5173/srch/");
  134 | 
  135 |       // Click into landing page search bar
  136 |       await page
  137 |         .getByRole("textbox", { name: "Search for topics, case" })
  138 |         .click();
  139 | 
  140 |       // Search for "about"
  141 |       await page
  142 |         .getByRole("textbox", { name: "Search for topics, case" })
  143 |         .fill("about");
  144 | 
  145 |       // Click "See full results" link to navigate to search results page
  146 |       await page
  147 |         .locator("div")
  148 |         .filter({ hasText: /^See full results$/ })
  149 |         .first()
  150 |         .click();
  151 | 
  152 |       // Verify first search result link is visible on results page
  153 |       await expect(
  154 |         page
  155 |           .getByRole("link", { name: "Privacy Section Header Lens 2" })
  156 |           .first()
  157 |       ).toBeVisible();
  158 | 
  159 |       // Clear search input by double-clicking to select all
  160 |       await page
  161 |         .getByRole("textbox", { name: "Search for topics, case" })
  162 |         .dblclick();
  163 |       await page
  164 |         .getByRole("textbox", { name: "Search for topics, case" })
  165 |         .dblclick();
  166 | 
  167 |       // Change search to "prior" (should find Automated Decision Making content)
  168 |       await page
  169 |         .getByRole("textbox", { name: "Search for topics, case" })
  170 |         .fill("prior");
  171 | 
  172 |       // Click on result containing "priority" in SafeRent Solutions case study
  173 |       await page
  174 |         .getByRole("link", {
  175 |           name: "Automated Decision Making SafeRent Solutions AI Scoring System ...priority.",
  176 |         })
  177 |         .click();
  178 | 
  179 |       // Verify highlighted search term is visible with nested <mark> tags
  180 |       await expect(
  181 |         page.locator("div:nth-child(4) > p > mark > mark").first()
  182 |       ).toBeVisible();
  183 |     });
  184 |   });
  185 | }
  186 | 
```