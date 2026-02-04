import { test, expect } from '@playwright/test';

// replicate the React slugify function
function slugify(text = "") {
  return text
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

// your app runs here:
const INITIAL_URL = 'http://localhost:5173/srch/privacy/whatIsPrivacy';

const sidebar = () => 'aside.left-sidebar';
const mainContent = () => 'main.main-content';
const expandCollapseButton = () => 'button.sidebar-toggle';
const headerToggle = () => 'button.header-toggle';

test.describe('Sidebar tests in small screen size (overlay mode)', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1000, height: 800 }); // < 1280 → overlay
    await page.goto(INITIAL_URL);
    // Wait until left sidebar actually renders
    await page.waitForSelector(`${sidebar()} .sidebar-section-header`);
  });

  // Test 1 – navigation using the sidebar (small screen)
  test('navigates between subsections and sections using the left sidebar', async ({ page }) => {
    await expect(page.locator('html')).toHaveAttribute('data-layout-mode', 'overlay');

    // There should be exactly one active subsection row for current route
    const activeSubRows = page.locator(`${sidebar()} .sidebar-sub-row.is-active`);
    await expect(activeSubRows).toHaveCount(1);

    // Grab a different subsection under the same section (if it exists)
    const subRows = page.locator(`${sidebar()} .sidebar-sub-row`);
    const totalSubRows = await subRows.count();

    if (totalSubRows > 1) {
      const secondSub = subRows.nth(1);
      const link = secondSub.locator('xpath=ancestor::a[1]');
      const href = await link.getAttribute('href');

      await secondSub.click();

      if (href) {
        // href is something like "/privacy/someSubsection"
        const escapedHref = href.replace(/\//g, '\\/');
        await expect(page).toHaveURL(new RegExp(`${escapedHref}\/?$`));
      }

      await expect(page.locator(`${sidebar()} .sidebar-sub-row.is-active`)).toHaveCount(1);
    }

    // Now click a different section header by reading its text and slugifying
    const secondSectionHeader = page
      .locator(`${sidebar()} .sidebar-section-header`)
      .nth(1); // second section in the list (order is deterministic in your app)

    const titleText = await secondSectionHeader
      .locator('.sidebar-section-title')
      .textContent();

    if (!titleText) throw new Error('Second section header has no text');

    // Remove numeric prefix like "2. "
    const noNumber = titleText.replace(/^\s*\d+\.\s*/, '');
    const sectionSlug = slugify(noNumber); // e.g. "accessibility"

    await secondSectionHeader.click();

    // URL should now contain the slugified section segment after /srch/
    await expect(page).toHaveURL(new RegExp(`/srch/${sectionSlug}/[^/]+/?$`));

    // The active section header should now be that “second” one
    await expect(secondSectionHeader).toHaveClass(/is-active/);
  });

  // Test 2 – expand and collapse all button (small screen)
  test('expand and collapse all button toggles all sections', async ({ page }) => {
    const toggle = page.locator(expandCollapseButton());

    await expect(toggle).toHaveText(/expand all/i);
    await expect(toggle).toHaveAttribute('aria-pressed', 'false');

    await toggle.click();

    const containersAfterExpand = page.locator(
      `${sidebar()} .sidebar-subsection-container`
    );
    const countExpanded = await containersAfterExpand.count();
    expect(countExpanded).toBeGreaterThan(1);

    await expect(toggle).toHaveText(/collapse all/i);
    await expect(toggle).toHaveAttribute('aria-pressed', 'true');

    await toggle.click();

    const containersAfterCollapse = page.locator(
      `${sidebar()} .sidebar-subsection-container`
    );
    const countAfterCollapse = await containersAfterCollapse.count();
    expect(countAfterCollapse).toBe(1);

    const activeHeader = page.locator(`${sidebar()} .sidebar-section-header.is-active`);
    await expect(activeHeader).toBeVisible();
  });

  // Test 3 – collapsing all does not collapse the current section (small screen)
  test('"Collapse all" never collapses the active section', async ({ page }) => {
    const toggle = page.locator(expandCollapseButton());

    await toggle.click(); // Expand all

    const containersAfterExpand = page.locator(
      `${sidebar()} .sidebar-subsection-container`
    );
    const countExpanded = await containersAfterExpand.count();
    expect(countExpanded).toBeGreaterThan(1);

    await toggle.click(); // Collapse all

    const containersAfterCollapse = page.locator(
      `${sidebar()} .sidebar-subsection-container`
    );
    const countAfterCollapse = await containersAfterCollapse.count();
    expect(countAfterCollapse).toBe(1);

    const activeHeader = page.locator(`${sidebar()} .sidebar-section-header.is-active`);
    await expect(activeHeader).toBeVisible();
  });

  // Test 4 – interactions: navigating then expanding / collapsing (small screen)
  test('navigating between sections keeps the active section expanded', async ({ page }) => {
    const firstHeader = page
      .locator(`${sidebar()} .sidebar-section-header`)
      .first();
    const secondHeader = page
      .locator(`${sidebar()} .sidebar-section-header`)
      .nth(1);

    await expect(firstHeader).toHaveClass(/is-active/);

    // Collapse first via its chevron
    const firstChevron = firstHeader.locator('svg').first();
    await firstChevron.click();

    const firstSubContainer = firstHeader.locator(
      'xpath=following-sibling::*[contains(@class, "sidebar-subsection-container")]'
    );
    await expect(firstSubContainer).toHaveCount(0);

    // Navigate to second section
    await secondHeader.click();
    await expect(secondHeader).toHaveClass(/is-active/);

    const secondSubContainer = secondHeader.locator(
      'xpath=following-sibling::*[contains(@class, "sidebar-subsection-container")]'
    );
    await expect(secondSubContainer.first()).toBeVisible();

    // Navigate back to first section – it should auto-expand
    await firstHeader.click();
    await expect(firstHeader).toHaveClass(/is-active/);

    const firstSubContainerAfter = firstHeader.locator(
      'xpath=following-sibling::*[contains(@class, "sidebar-subsection-container")]'
    );
    await expect(firstSubContainerAfter.first()).toBeVisible();
  });

  // Test 5 – overlay mode: left sidebar overlays content, not pushing it
  test('in small screen overlay mode, sidebar overlays content without pushing main layout', async ({ page }) => {
    await expect(page.locator('html')).toHaveAttribute('data-layout-mode', 'overlay');

    const marginLeft = await page.evaluate(() => {
      const el = document.querySelector('main.main-content');
      if (!el) return null;
      return window.getComputedStyle(el).marginLeft;
    });

    expect(marginLeft === '0px' || marginLeft === '0').toBeTruthy();
  });
});

test.describe('Sidebar tests in full screen size (wide mode)', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 }); // > 1280 → wide
    await page.goto(INITIAL_URL);
    await page.waitForSelector(`${sidebar()} .sidebar-section-header`);
  });

  // Test 6 – navigation using sidebar (full screen)
  test('navigates between sections and subsections in wide mode', async ({ page }) => {
    await expect(page.locator('html')).toHaveAttribute('data-layout-mode', 'wide');

    const activeHeader = page.locator(`${sidebar()} .sidebar-section-header.is-active`);
    await expect(activeHeader).toHaveCount(1);

    const activeContainer = activeHeader.locator(
      'xpath=following-sibling::*[contains(@class, "sidebar-subsection-container")]'
    );
    const subRows = activeContainer.locator('.sidebar-sub-row');
    const subCount = await subRows.count();

    if (subCount > 1) {
      const secondSub = subRows.nth(1);
      const link = secondSub.locator('xpath=ancestor::a[1]');
      const href = await link.getAttribute('href');

      await secondSub.click();

      if (href) {
        const escapedHref = href.replace(/\//g, '\\/');
        await expect(page).toHaveURL(new RegExp(`${escapedHref}\/?$`));
      }

      await expect(page.locator(`${sidebar()} .sidebar-sub-row.is-active`)).toHaveCount(1);
    }

    // Now navigate using section header and slugify its title
    const secondSectionHeader = page
      .locator(`${sidebar()} .sidebar-section-header`)
      .nth(1);

    const titleText = await secondSectionHeader
      .locator('.sidebar-section-title')
      .textContent();
    if (!titleText) throw new Error('Second section header has no text');

    const noNumber = titleText.replace(/^\s*\d+\.\s*/, '');
    const sectionSlug = slugify(noNumber);

    await secondSectionHeader.click();

    await expect(page).toHaveURL(new RegExp(`/srch/${sectionSlug}/[^/]+/?$`));
    await expect(secondSectionHeader).toHaveClass(/is-active/);
  });

  // Test 7 – expand and collapse all button (full screen)
  test('expand and collapse all button toggles all sections in wide mode', async ({ page }) => {
    const toggle = page.locator(expandCollapseButton());

    await expect(toggle).toHaveText(/expand all/i);
    await toggle.click();

    const containersAfterExpand = page.locator(
      `${sidebar()} .sidebar-subsection-container`
    );
    const expandedCount = await containersAfterExpand.count();
    expect(expandedCount).toBeGreaterThan(1);

    await expect(toggle).toHaveText(/collapse all/i);

    await toggle.click();
    const containersAfterCollapse = page.locator(
      `${sidebar()} .sidebar-subsection-container`
    );
    const collapsedCount = await containersAfterCollapse.count();
    expect(collapsedCount).toBe(1);
  });

  // Test 8 – sidebar is collapsable and expandable via page header toggle (full screen)
  test('sidebar can be collapsed and expanded via header toggle', async ({ page }) => {
    await expect(page.locator('html')).toHaveAttribute('data-layout-mode', 'wide');

    const sidebarLocator = page.locator(sidebar());
    const toggle = page.locator(headerToggle());

    // Initially: sidebar is open, toggle says "Collapse sidebar"
    await expect(sidebarLocator).toHaveClass(/open/);
    await expect(toggle).toHaveAttribute('aria-label', /collapse sidebar/i);

    // Collapse via header toggle
    await toggle.click();

    // Sidebar should lose the "open" class and toggle label should flip
    await expect(sidebarLocator).not.toHaveClass(/open/);
    await expect(toggle).toHaveAttribute('aria-label', /expand sidebar/i);

    // Expand again
    await toggle.click();

    await expect(sidebarLocator).toHaveClass(/open/);
    await expect(toggle).toHaveAttribute('aria-label', /collapse sidebar/i);
  });

  // Test 9 – sidebar is resizable by dragging the resizer (full screen)
  test('sidebar width can be resized with the drag handle', async ({ page }) => {
    const sidebarLocator = page.locator(sidebar());
    const resizer = page.locator(`${sidebar()} .left-resizer`);

    await sidebarLocator.scrollIntoViewIfNeeded();
    await expect(sidebarLocator).toHaveClass(/open/);
    await expect(resizer).toBeVisible();

    const initialBox = await sidebarLocator.boundingBox();
    if (!initialBox) throw new Error('Sidebar bounding box not available');

    const resizerBox = await resizer.boundingBox();
    if (!resizerBox) throw new Error('Resizer bounding box not available');

    const startX = resizerBox.x + resizerBox.width / 2;
    const startY = resizerBox.y + resizerBox.height / 2;

    await page.mouse.move(startX, startY);
    await page.mouse.down();
    await page.mouse.move(startX + 80, startY); // drag to the right
    await page.mouse.up();

    const resizedBox = await sidebarLocator.boundingBox();
    if (!resizedBox) throw new Error('Sidebar bounding box after resize not available');

    expect(resizedBox.width).toBeGreaterThan(initialBox.width);
  });

    // Test 10 – split-screen-specific behavior: resize to overlay and back to wide
  test('switching between wide and overlay modes updates layout mode and keeps a non-zero margin in wide layout', async ({ page }) => {
    const main = page.locator(mainContent());

    // Start wide
    await expect(page.locator('html')).toHaveAttribute('data-layout-mode', 'wide');
    const wideMarginLeft = await main.evaluate((el) => {
      return window.getComputedStyle(el).marginLeft;
    });

    // Shrink to overlay width
    await page.setViewportSize({ width: 1000, height: 900 });
    await page.waitForTimeout(100);

    await expect(page.locator('html')).toHaveAttribute('data-layout-mode', 'overlay');
    const overlayMarginLeft = await main.evaluate((el) => {
      return window.getComputedStyle(el).marginLeft;
    });

    // Grow back to wide
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.waitForTimeout(100);

    await expect(page.locator('html')).toHaveAttribute('data-layout-mode', 'wide');
    const wideAgainMarginLeft = await main.evaluate((el) => {
      return window.getComputedStyle(el).marginLeft;
    });

    const wideNumeric = parseFloat(wideAgainMarginLeft || '0');
    const overlayNumeric = parseFloat(overlayMarginLeft || '0');

    // In overlay mode we expect the margin to be smaller or zero
    expect(overlayNumeric).toBeLessThanOrEqual(wideNumeric);

    // In wide mode we just care that it's non-zero (sidebar is pushing content)
    expect(wideNumeric).toBeGreaterThan(0);
  });

});
