# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: leftSidebar.spec.ts >> Sidebar tests in full screen size (wide mode) >> navigates between sections and subsections in wide mode
- Location: src/tests/leftSidebar.spec.ts:197:3

# Error details

```
Error: expect(locator).toHaveCount(expected) failed

Locator:  locator('aside.left-sidebar .sidebar-section-header.is-active')
Expected: 1
Received: 0
Timeout:  5000ms

Call log:
  - Expect "toHaveCount" with timeout 5000ms
  - waiting for locator('aside.left-sidebar .sidebar-section-header.is-active')
    9 × locator resolved to 0 elements
      - unexpected value "0"

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
  101 | 
  102 |     const containersAfterCollapse = page.locator(
  103 |       `${sidebar()} .sidebar-subsection-container`
  104 |     );
  105 |     const countAfterCollapse = await containersAfterCollapse.count();
  106 |     expect(countAfterCollapse).toBe(1);
  107 | 
  108 |     const activeHeader = page.locator(`${sidebar()} .sidebar-section-header.is-active`);
  109 |     await expect(activeHeader).toBeVisible();
  110 |   });
  111 | 
  112 |   // Test 3 – collapsing all does not collapse the current section (small screen)
  113 |   test('"Collapse all" never collapses the active section', async ({ page }) => {
  114 |     const toggle = page.locator(expandCollapseButton());
  115 | 
  116 |     await toggle.click(); // Expand all
  117 | 
  118 |     const containersAfterExpand = page.locator(
  119 |       `${sidebar()} .sidebar-subsection-container`
  120 |     );
  121 |     const countExpanded = await containersAfterExpand.count();
  122 |     expect(countExpanded).toBeGreaterThan(1);
  123 | 
  124 |     await toggle.click(); // Collapse all
  125 | 
  126 |     const containersAfterCollapse = page.locator(
  127 |       `${sidebar()} .sidebar-subsection-container`
  128 |     );
  129 |     const countAfterCollapse = await containersAfterCollapse.count();
  130 |     expect(countAfterCollapse).toBe(1);
  131 | 
  132 |     const activeHeader = page.locator(`${sidebar()} .sidebar-section-header.is-active`);
  133 |     await expect(activeHeader).toBeVisible();
  134 |   });
  135 | 
  136 |   // Test 4 – interactions: navigating then expanding / collapsing (small screen)
  137 |   test('navigating between sections keeps the active section expanded', async ({ page }) => {
  138 |     const firstHeader = page
  139 |       .locator(`${sidebar()} .sidebar-section-header`)
  140 |       .first();
  141 |     const secondHeader = page
  142 |       .locator(`${sidebar()} .sidebar-section-header`)
  143 |       .nth(1);
  144 | 
  145 |     await expect(firstHeader).toHaveClass(/is-active/);
  146 | 
  147 |     // Collapse first via its chevron
  148 |     const firstChevron = firstHeader.locator('svg').first();
  149 |     await firstChevron.click();
  150 | 
  151 |     const firstSubContainer = firstHeader.locator(
  152 |       'xpath=following-sibling::*[contains(@class, "sidebar-subsection-container")]'
  153 |     );
  154 |     await expect(firstSubContainer).toHaveCount(0);
  155 | 
  156 |     // Navigate to second section
  157 |     await secondHeader.click();
  158 |     await expect(secondHeader).toHaveClass(/is-active/);
  159 | 
  160 |     const secondSubContainer = secondHeader.locator(
  161 |       'xpath=following-sibling::*[contains(@class, "sidebar-subsection-container")]'
  162 |     );
  163 |     await expect(secondSubContainer.first()).toBeVisible();
  164 | 
  165 |     // Navigate back to first section – it should auto-expand
  166 |     await firstHeader.click();
  167 |     await expect(firstHeader).toHaveClass(/is-active/);
  168 | 
  169 |     const firstSubContainerAfter = firstHeader.locator(
  170 |       'xpath=following-sibling::*[contains(@class, "sidebar-subsection-container")]'
  171 |     );
  172 |     await expect(firstSubContainerAfter.first()).toBeVisible();
  173 |   });
  174 | 
  175 |   // Test 5 – overlay mode: left sidebar overlays content, not pushing it
  176 |   test('in small screen overlay mode, sidebar overlays content without pushing main layout', async ({ page }) => {
  177 |     await expect(page.locator('html')).toHaveAttribute('data-layout-mode', 'overlay');
  178 | 
  179 |     const marginLeft = await page.evaluate(() => {
  180 |       const el = document.querySelector('main.main-content');
  181 |       if (!el) return null;
  182 |       return window.getComputedStyle(el).marginLeft;
  183 |     });
  184 | 
  185 |     expect(marginLeft === '0px' || marginLeft === '0').toBeTruthy();
  186 |   });
  187 | });
  188 | 
  189 | test.describe('Sidebar tests in full screen size (wide mode)', () => {
  190 |   test.beforeEach(async ({ page }) => {
  191 |     await page.setViewportSize({ width: 1440, height: 900 }); // > 1280 → wide
  192 |     await page.goto(INITIAL_URL);
  193 |     await page.waitForSelector(`${sidebar()} .sidebar-section-header`);
  194 |   });
  195 | 
  196 |   // Test 6 – navigation using sidebar (full screen)
  197 |   test('navigates between sections and subsections in wide mode', async ({ page }) => {
  198 |     await expect(page.locator('html')).toHaveAttribute('data-layout-mode', 'wide');
  199 | 
  200 |     const activeHeader = page.locator(`${sidebar()} .sidebar-section-header.is-active`);
> 201 |     await expect(activeHeader).toHaveCount(1);
      |                                ^ Error: expect(locator).toHaveCount(expected) failed
  202 | 
  203 |     const activeContainer = activeHeader.locator(
  204 |       'xpath=following-sibling::*[contains(@class, "sidebar-subsection-container")]'
  205 |     );
  206 |     const subRows = activeContainer.locator('.sidebar-sub-row');
  207 |     const subCount = await subRows.count();
  208 | 
  209 |     if (subCount > 1) {
  210 |       const secondSub = subRows.nth(1);
  211 |       const link = secondSub.locator('xpath=ancestor::a[1]');
  212 |       const href = await link.getAttribute('href');
  213 | 
  214 |       await secondSub.click();
  215 | 
  216 |       if (href) {
  217 |         const escapedHref = href.replace(/\//g, '\\/');
  218 |         await expect(page).toHaveURL(new RegExp(`${escapedHref}\/?$`));
  219 |       }
  220 | 
  221 |       await expect(page.locator(`${sidebar()} .sidebar-sub-row.is-active`)).toHaveCount(1);
  222 |     }
  223 | 
  224 |     // Now navigate using section header and slugify its title
  225 |     const secondSectionHeader = page
  226 |       .locator(`${sidebar()} .sidebar-section-header`)
  227 |       .nth(1);
  228 | 
  229 |     const titleText = await secondSectionHeader
  230 |       .locator('.sidebar-section-title')
  231 |       .textContent();
  232 |     if (!titleText) throw new Error('Second section header has no text');
  233 | 
  234 |     const noNumber = titleText.replace(/^\s*\d+\.\s*/, '');
  235 |     const sectionSlug = slugify(noNumber);
  236 | 
  237 |     await secondSectionHeader.click();
  238 | 
  239 |     await expect(page).toHaveURL(new RegExp(`/srch/${sectionSlug}/[^/]+/?$`));
  240 |     await expect(secondSectionHeader).toHaveClass(/is-active/);
  241 |   });
  242 | 
  243 |   // Test 7 – expand and collapse all button (full screen)
  244 |   test('expand and collapse all button toggles all sections in wide mode', async ({ page }) => {
  245 |     const toggle = page.locator(expandCollapseButton());
  246 | 
  247 |     await expect(toggle).toHaveText(/expand all/i);
  248 |     await toggle.click();
  249 | 
  250 |     const containersAfterExpand = page.locator(
  251 |       `${sidebar()} .sidebar-subsection-container`
  252 |     );
  253 |     const expandedCount = await containersAfterExpand.count();
  254 |     expect(expandedCount).toBeGreaterThan(1);
  255 | 
  256 |     await expect(toggle).toHaveText(/collapse all/i);
  257 | 
  258 |     await toggle.click();
  259 |     const containersAfterCollapse = page.locator(
  260 |       `${sidebar()} .sidebar-subsection-container`
  261 |     );
  262 |     const collapsedCount = await containersAfterCollapse.count();
  263 |     expect(collapsedCount).toBe(1);
  264 |   });
  265 | 
  266 |   // Test 8 – sidebar is collapsable and expandable via page header toggle (full screen)
  267 |   test('sidebar can be collapsed and expanded via header toggle', async ({ page }) => {
  268 |     await expect(page.locator('html')).toHaveAttribute('data-layout-mode', 'wide');
  269 | 
  270 |     const sidebarLocator = page.locator(sidebar());
  271 |     const toggle = page.locator(headerToggle());
  272 | 
  273 |     // Initially: sidebar is open, toggle says "Collapse sidebar"
  274 |     await expect(sidebarLocator).toHaveClass(/open/);
  275 |     await expect(toggle).toHaveAttribute('aria-label', /collapse sidebar/i);
  276 | 
  277 |     // Collapse via header toggle
  278 |     await toggle.click();
  279 | 
  280 |     // Sidebar should lose the "open" class and toggle label should flip
  281 |     await expect(sidebarLocator).not.toHaveClass(/open/);
  282 |     await expect(toggle).toHaveAttribute('aria-label', /expand sidebar/i);
  283 | 
  284 |     // Expand again
  285 |     await toggle.click();
  286 | 
  287 |     await expect(sidebarLocator).toHaveClass(/open/);
  288 |     await expect(toggle).toHaveAttribute('aria-label', /collapse sidebar/i);
  289 |   });
  290 | 
  291 |   // Test 9 – sidebar is resizable by dragging the resizer (full screen)
  292 |   test('sidebar width can be resized with the drag handle', async ({ page }) => {
  293 |     const sidebarLocator = page.locator(sidebar());
  294 |     const resizer = page.locator(`${sidebar()} .left-resizer`);
  295 | 
  296 |     await sidebarLocator.scrollIntoViewIfNeeded();
  297 |     await expect(sidebarLocator).toHaveClass(/open/);
  298 |     await expect(resizer).toBeVisible();
  299 | 
  300 |     const initialBox = await sidebarLocator.boundingBox();
  301 |     if (!initialBox) throw new Error('Sidebar bounding box not available');
```