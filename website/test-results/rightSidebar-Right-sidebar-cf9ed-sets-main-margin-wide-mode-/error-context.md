# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: rightSidebar.spec.ts >> Right sidebar tests in full screen size (wide mode) >> closing via "X" or re-clicking the term collapses right sidebar and resets main margin (wide mode)
- Location: src/tests/rightSidebar.spec.ts:286:3

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
  127 |       return {
  128 |         canScroll,
  129 |         scrolled: after > before,
  130 |         overflowY,
  131 |       };
  132 |     });
  133 | 
  134 |     if (metrics.canScroll) {
  135 |       // When content is taller than the container, scrolling should change scrollTop
  136 |       expect(metrics.scrolled).toBeTruthy();
  137 |     } else {
  138 |       // When content fits, we just assert that overflow-y is not "visible"
  139 |       // (i.e., the container is configured to scroll when needed).
  140 |       expect(metrics.overflowY).not.toBe("visible");
  141 |     }
  142 |   });
  143 | 
  144 |   // Test 4 – interactions: opening a different term while one is already open
  145 |   test("opening a second drawer term updates active chip and keeps sidebar open (overlay mode)", async ({
  146 |     page,
  147 |   }) => {
  148 |     const firstChip = page.locator("a.srch-drawer-link").nth(0);
  149 |     const secondChip = page.locator("a.srch-drawer-link").nth(1);
  150 | 
  151 |     const firstTerm = await firstChip.getAttribute("data-term");
  152 |     const secondTerm = await secondChip.getAttribute("data-term");
  153 | 
  154 |     if (!firstTerm || !secondTerm) {
  155 |       throw new Error("Drawer chips missing data-term attribute");
  156 |     }
  157 | 
  158 |     // Open first term
  159 |     await firstChip.click();
  160 |     await expect(page.locator(rightSidebar())).toHaveClass(/open/);
  161 |     await expect(firstChip).toHaveClass(/srch-drawer-link-active/);
  162 |     await expect(page).toHaveURL(new RegExp(`/${firstTerm}/?$`));
  163 | 
  164 |     // Now open second term while sidebar is already open
  165 |     await secondChip.click();
  166 | 
  167 |     await expect(page.locator(rightSidebar())).toHaveClass(/open/);
  168 |     await expect(firstChip).not.toHaveClass(/srch-drawer-link-active/);
  169 |     await expect(secondChip).toHaveClass(/srch-drawer-link-active/);
  170 |     await expect(page).toHaveURL(new RegExp(`/${secondTerm}/?$`));
  171 |   });
  172 | 
  173 |   // Test 5 – overlay split-screen behavior: drawer overlays content, does not push main layout
  174 |   test("in overlay mode, opening the right sidebar does not change main margins", async ({
  175 |     page,
  176 |   }) => {
  177 |     await expect(page.locator("html")).toHaveAttribute(
  178 |       "data-layout-mode",
  179 |       "overlay",
  180 |     );
  181 | 
  182 |     const main = page.locator(mainContent());
  183 | 
  184 |     const marginBefore = await main.evaluate((el) => {
  185 |       return window.getComputedStyle(el).marginRight;
  186 |     });
  187 | 
  188 |     const { chip } = await getFirstDrawerChip(page);
  189 |     await chip.click();
  190 |     await expect(page.locator(rightSidebar())).toHaveClass(/open/);
  191 | 
  192 |     const marginAfter = await main.evaluate((el) => {
  193 |       return window.getComputedStyle(el).marginRight;
  194 |     });
  195 | 
  196 |     // In overlay mode, the drawer should slide over content without pushing it
  197 |     expect(marginAfter).toBe(marginBefore);
  198 |   });
  199 | 
  200 |   test("opening a drawer link preserves main content scroll position (overlay mode)", async ({
  201 |     page,
  202 |   }) => {
  203 |     const main = page.locator(mainContent());
  204 |     const { chip } = await getFirstDrawerChip(page);
  205 | 
  206 |     await main.evaluate((el) => {
  207 |       el.scrollTo({ top: 600, behavior: "auto" });
  208 |     });
  209 | 
  210 |     const scrollBefore = await main.evaluate((el) => el.scrollTop);
  211 |     expect(scrollBefore).toBeGreaterThan(0);
  212 | 
  213 |     await chip.click();
  214 | 
  215 |     await expect(page.locator(rightSidebar())).toHaveClass(/open/);
  216 |     await page.waitForTimeout(450);
  217 | 
  218 |     const scrollAfter = await main.evaluate((el) => el.scrollTop);
  219 |     expect(Math.abs(scrollAfter - scrollBefore)).toBeLessThanOrEqual(2);
  220 |   });
  221 | });
  222 | 
  223 | test.describe("Right sidebar tests in full screen size (wide mode)", () => {
  224 |   test.beforeEach(async ({ page }) => {
  225 |     await page.setViewportSize({ width: 1440, height: 900 }); // > 1280 → wide
  226 |     await page.goto(INITIAL_URL);
> 227 |     await page.waitForSelector("a.srch-drawer-link");
      |                ^ Error: page.waitForSelector: Test timeout of 30000ms exceeded.
  228 |   });
  229 | 
  230 |   // Test 6 – clicking drawer links opens sidebar and pushes main layout
  231 |   test("clicking drawer links opens right sidebar and pushes main content (wide mode)", async ({
  232 |     page,
  233 |   }) => {
  234 |     await expect(page.locator("html")).toHaveAttribute(
  235 |       "data-layout-mode",
  236 |       "wide",
  237 |     );
  238 | 
  239 |     const main = page.locator(mainContent());
  240 |     const { chip, termKey } = await getFirstDrawerChip(page);
  241 | 
  242 |     const marginBefore = await main.evaluate((el) => {
  243 |       return window.getComputedStyle(el).marginRight;
  244 |     });
  245 | 
  246 |     await chip.click();
  247 | 
  248 |     await expect(page.locator(rightSidebar())).toHaveClass(/open/);
  249 |     await expect(page.locator("html")).toHaveClass(/right-open/);
  250 |     await expect(chip).toHaveClass(/srch-drawer-link-active/);
  251 |     await expect(page).toHaveURL(new RegExp(`/${termKey}/?$`));
  252 | 
  253 |     const marginAfter = await main.evaluate((el) => {
  254 |       return window.getComputedStyle(el).marginRight;
  255 |     });
  256 | 
  257 |     const beforeNumeric = parseFloat(marginBefore || "0");
  258 |     const afterNumeric = parseFloat(marginAfter || "0");
  259 | 
  260 |     // In wide mode, opening the right drawer should increase the right margin
  261 |     expect(afterNumeric).toBeGreaterThan(beforeNumeric);
  262 |   });
  263 | 
  264 |   test("opening a drawer link preserves main content scroll position after wide-mode transition", async ({
  265 |     page,
  266 |   }) => {
  267 |     const main = page.locator(mainContent());
  268 |     const { chip } = await getFirstDrawerChip(page);
  269 | 
  270 |     await main.evaluate((el) => {
  271 |       el.scrollTo({ top: 900, behavior: "auto" });
  272 |     });
  273 | 
  274 |     const scrollBefore = await main.evaluate((el) => el.scrollTop);
  275 |     expect(scrollBefore).toBeGreaterThan(0);
  276 | 
  277 |     await chip.click();
  278 |     await expect(page.locator(rightSidebar())).toHaveClass(/open/);
  279 |     await page.waitForTimeout(450);
  280 | 
  281 |     const scrollAfter = await main.evaluate((el) => el.scrollTop);
  282 |     expect(Math.abs(scrollAfter - scrollBefore)).toBeLessThanOrEqual(2);
  283 |   });
  284 | 
  285 |   // Test 7 – closing via "X" and via re-clicking the term in wide mode
  286 |   test('closing via "X" or re-clicking the term collapses right sidebar and resets main margin (wide mode)', async ({
  287 |     page,
  288 |   }) => {
  289 |     const main = page.locator(mainContent());
  290 |     const { termKey } = await getFirstDrawerChip(page);
  291 |     const chip = page
  292 |       .locator(`a.srch-drawer-link[data-term="${termKey}"]`)
  293 |       .first();
  294 | 
  295 |     const marginInitial = await main.evaluate((el) => {
  296 |       return window.getComputedStyle(el).marginRight;
  297 |     });
  298 | 
  299 |     // Open
  300 |     await chip.click();
  301 |     await expect(page.locator(rightSidebar())).toHaveClass(/open/);
  302 | 
  303 |     const marginOpen = await main.evaluate((el) => {
  304 |       return window.getComputedStyle(el).marginRight;
  305 |     });
  306 | 
  307 |     // Close via X
  308 |     const closeButton = page.locator("button.right-drawer-close-btn");
  309 |     await closeButton.click();
  310 | 
  311 |     await expect(page.locator(rightSidebar())).not.toHaveClass(/open/);
  312 |     await expect(page.locator("html")).not.toHaveClass(/right-open/);
  313 | 
  314 |     const marginClosed = await main.evaluate((el) => {
  315 |       return window.getComputedStyle(el).marginRight;
  316 |     });
  317 | 
  318 |     const initialNumeric = parseFloat(marginInitial || "0");
  319 |     const openNumeric = parseFloat(marginOpen || "0");
  320 |     const closedNumeric = parseFloat(marginClosed || "0");
  321 | 
  322 |     // When open, margin should be larger than initial
  323 |     expect(openNumeric).toBeGreaterThanOrEqual(initialNumeric);
  324 | 
  325 |     // When closed again, margin should move back toward initial
  326 |     expect(closedNumeric).toBeCloseTo(initialNumeric, 1);
  327 | 
```