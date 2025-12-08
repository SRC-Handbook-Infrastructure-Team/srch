import { test, expect } from '@playwright/test';

// replicate the React slugify function (kept for consistency / future use)
function slugify(text = "") {
  return text
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

// Base route for content + sidebar
const INITIAL_URL = 'http://localhost:5173/srch/privacy/whatIsPrivacy';

const rightSidebar = () => 'aside.right-sidebar';
const mainContent = () => 'main.main-content';
const rightResizeHitbox = () => 'div.right-resize-hitbox';

// Small helper to grab the first drawer chip safely
async function getFirstDrawerChip(page) {
  const chip = page.locator('a.srch-drawer-link').first();
  await expect(chip).toBeVisible();
  const termKey = await chip.getAttribute('data-term');
  if (!termKey) throw new Error('Drawer chip has no data-term attribute');
  return { chip, termKey };
}

test.describe('Right sidebar tests in small screen size (overlay mode)', () => {
  test.beforeEach(async ({ page }) => {
    // < 1280 → overlay mode
    await page.setViewportSize({ width: 1000, height: 600 });
    await page.goto(INITIAL_URL);
    await page.waitForSelector('a.srch-drawer-link'); // wait for markdown + chips
  });

  // Test 1 – clicking drawer links opens sidebar
  test('clicking drawer links opens right sidebar and updates URL (overlay mode)', async ({ page }) => {
    await expect(page.locator('html')).toHaveAttribute('data-layout-mode', 'overlay');

    const { chip, termKey } = await getFirstDrawerChip(page);

    // Before click, sidebar should be closed
    await expect(page.locator(rightSidebar())).not.toHaveClass(/open/);

    await chip.click();

    // Right sidebar should slide in and HTML should get right-open class
    await expect(page.locator(rightSidebar())).toHaveClass(/open/);
    await expect(page.locator('html')).toHaveClass(/right-open/);

    // Active chip should have the active class
    await expect(page.locator(`a.srch-drawer-link[data-term="${termKey}"]`))
      .toHaveClass(/srch-drawer-link-active/);

    // URL should now end with /:termKey
    await expect(page).toHaveURL(new RegExp(`/${termKey}/?$`));
  });

  // Test 2 – closing via "X" or re-clicking term closes sidebar and removes slug
  test('closing via "X" or re-clicking the term closes right sidebar and removes slug (overlay mode)', async ({ page }) => {
    const { termKey } = await getFirstDrawerChip(page);
    const chip = page.locator(`a.srch-drawer-link[data-term="${termKey}"]`).first();

    // Open the drawer
    await chip.click();
    await expect(page.locator(rightSidebar())).toHaveClass(/open/);
    await expect(page).toHaveURL(new RegExp(`/${termKey}/?$`));

    // 2a) Close via "X" button
    const closeButton = page.locator('button.right-drawer-close-btn');
    await expect(closeButton).toBeVisible();
    await closeButton.click();

    await expect(page.locator(rightSidebar())).not.toHaveClass(/open/);
    await expect(page.locator('html')).not.toHaveClass(/right-open/);
    await expect(chip).not.toHaveClass(/srch-drawer-link-active/);
    await expect(page).not.toHaveURL(new RegExp(`/${termKey}/?$`));

    // 2b) Re-open, then close by re-clicking the active term
    await chip.click();
    await expect(page.locator(rightSidebar())).toHaveClass(/open/);
    await expect(chip).toHaveClass(/srch-drawer-link-active/);

    // Re-click the same chip → MarkdownRenderer calls onDrawerOpen(null)
    await chip.click();

    await expect(page.locator(rightSidebar())).not.toHaveClass(/open/);
    await expect(page.locator('html')).not.toHaveClass(/right-open/);
    await expect(page).not.toHaveURL(new RegExp(`/${termKey}/?$`));
  });

    // Test 3 – scrolling within the right sidebar
  test('right sidebar is scrollable or configured to scroll (overlay mode)', async ({ page }) => {
    const { chip } = await getFirstDrawerChip(page);
    await chip.click();

    // The actual scroll container is the aside.right-sidebar element
    const scrollContainer = page.locator(rightSidebar());
    await expect(scrollContainer).toHaveClass(/open/);
    await expect(scrollContainer).toBeVisible();

    const metrics = await scrollContainer.evaluate((el) => {
      const before = el.scrollTop;
      const canScroll = el.scrollHeight > el.clientHeight;

      if (canScroll) {
        el.scrollTo(0, el.scrollHeight);
      }

      const after = el.scrollTop;
      const overflowY = window.getComputedStyle(el).overflowY;

      return {
        canScroll,
        scrolled: after > before,
        overflowY,
      };
    });

    if (metrics.canScroll) {
      // When content is taller than the container, scrolling should change scrollTop
      expect(metrics.scrolled).toBeTruthy();
    } else {
      // When content fits, we just assert that overflow-y is not "visible"
      // (i.e., the container is configured to scroll when needed).
      expect(metrics.overflowY).not.toBe('visible');
    }
  });

  // Test 4 – interactions: opening a different term while one is already open
  test('opening a second drawer term updates active chip and keeps sidebar open (overlay mode)', async ({ page }) => {
    const firstChip = page.locator('a.srch-drawer-link').nth(0);
    const secondChip = page.locator('a.srch-drawer-link').nth(1);

    const firstTerm = await firstChip.getAttribute('data-term');
    const secondTerm = await secondChip.getAttribute('data-term');

    if (!firstTerm || !secondTerm) {
      throw new Error('Drawer chips missing data-term attribute');
    }

    // Open first term
    await firstChip.click();
    await expect(page.locator(rightSidebar())).toHaveClass(/open/);
    await expect(firstChip).toHaveClass(/srch-drawer-link-active/);
    await expect(page).toHaveURL(new RegExp(`/${firstTerm}/?$`));

    // Now open second term while sidebar is already open
    await secondChip.click();

    await expect(page.locator(rightSidebar())).toHaveClass(/open/);
    await expect(firstChip).not.toHaveClass(/srch-drawer-link-active/);
    await expect(secondChip).toHaveClass(/srch-drawer-link-active/);
    await expect(page).toHaveURL(new RegExp(`/${secondTerm}/?$`));
  });

  // Test 5 – overlay split-screen behavior: drawer overlays content, does not push main layout
  test('in overlay mode, opening the right sidebar does not change main margins', async ({ page }) => {
    await expect(page.locator('html')).toHaveAttribute('data-layout-mode', 'overlay');

    const main = page.locator(mainContent());

    const marginBefore = await main.evaluate((el) => {
      return window.getComputedStyle(el).marginRight;
    });

    const { chip } = await getFirstDrawerChip(page);
    await chip.click();
    await expect(page.locator(rightSidebar())).toHaveClass(/open/);

    const marginAfter = await main.evaluate((el) => {
      return window.getComputedStyle(el).marginRight;
    });

    // In overlay mode, the drawer should slide over content without pushing it
    expect(marginAfter).toBe(marginBefore);
  });
});

test.describe('Right sidebar tests in full screen size (wide mode)', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 }); // > 1280 → wide
    await page.goto(INITIAL_URL);
    await page.waitForSelector('a.srch-drawer-link');
  });

  // Test 6 – clicking drawer links opens sidebar and pushes main layout
  test('clicking drawer links opens right sidebar and pushes main content (wide mode)', async ({ page }) => {
    await expect(page.locator('html')).toHaveAttribute('data-layout-mode', 'wide');

    const main = page.locator(mainContent());
    const { chip, termKey } = await getFirstDrawerChip(page);

    const marginBefore = await main.evaluate((el) => {
      return window.getComputedStyle(el).marginRight;
    });

    await chip.click();

    await expect(page.locator(rightSidebar())).toHaveClass(/open/);
    await expect(page.locator('html')).toHaveClass(/right-open/);
    await expect(chip).toHaveClass(/srch-drawer-link-active/);
    await expect(page).toHaveURL(new RegExp(`/${termKey}/?$`));

    const marginAfter = await main.evaluate((el) => {
      return window.getComputedStyle(el).marginRight;
    });

    const beforeNumeric = parseFloat(marginBefore || '0');
    const afterNumeric = parseFloat(marginAfter || '0');

    // In wide mode, opening the right drawer should increase the right margin
    expect(afterNumeric).toBeGreaterThan(beforeNumeric);
  });

  // Test 7 – closing via "X" and via re-clicking the term in wide mode
  test('closing via "X" or re-clicking the term collapses right sidebar and resets main margin (wide mode)', async ({ page }) => {
    const main = page.locator(mainContent());
    const { termKey } = await getFirstDrawerChip(page);
    const chip = page.locator(`a.srch-drawer-link[data-term="${termKey}"]`).first();

    const marginInitial = await main.evaluate((el) => {
      return window.getComputedStyle(el).marginRight;
    });

    // Open
    await chip.click();
    await expect(page.locator(rightSidebar())).toHaveClass(/open/);

    const marginOpen = await main.evaluate((el) => {
      return window.getComputedStyle(el).marginRight;
    });

    // Close via X
    const closeButton = page.locator('button.right-drawer-close-btn');
    await closeButton.click();

    await expect(page.locator(rightSidebar())).not.toHaveClass(/open/);
    await expect(page.locator('html')).not.toHaveClass(/right-open/);

    const marginClosed = await main.evaluate((el) => {
      return window.getComputedStyle(el).marginRight;
    });

    const initialNumeric = parseFloat(marginInitial || '0');
    const openNumeric = parseFloat(marginOpen || '0');
    const closedNumeric = parseFloat(marginClosed || '0');

    // When open, margin should be larger than initial
    expect(openNumeric).toBeGreaterThanOrEqual(initialNumeric);

    // When closed again, margin should move back toward initial
    expect(closedNumeric).toBeCloseTo(initialNumeric, 1);

    // Re-open and close by re-clicking the chip
    await chip.click();
    await expect(page.locator(rightSidebar())).toHaveClass(/open/);
    await expect(chip).toHaveClass(/srch-drawer-link-active/);

    await chip.click(); // active → closes

    await expect(page.locator(rightSidebar())).not.toHaveClass(/open/);
    await expect(page.locator('html')).not.toHaveClass(/right-open/);
    await expect(page).not.toHaveURL(new RegExp(`/${termKey}/?$`));
  });

  // Test 8 – resizing the right sidebar via the drag handle
  test('right sidebar width can be resized with the drag handle (wide mode)', async ({ page }) => {
    const { chip } = await getFirstDrawerChip(page);
    await chip.click();
    await expect(page.locator(rightSidebar())).toHaveClass(/open/);

    const drawer = page.locator(rightSidebar());
    const hitbox = page.locator(rightResizeHitbox());

    await expect(hitbox).toBeVisible();

    const initialBox = await drawer.boundingBox();
    if (!initialBox) throw new Error('Right sidebar bounding box not available');

    const hitboxBox = await hitbox.boundingBox();
    if (!hitboxBox) throw new Error('Right resize hitbox bounding box not available');

    const startX = hitboxBox.x + hitboxBox.width / 2;
    const startY = hitboxBox.y + hitboxBox.height / 2;

    // For the right sidebar, dragging left increases width
    await page.mouse.move(startX, startY);
    await page.mouse.down();
    await page.mouse.move(startX - 80, startY);
    await page.mouse.up();

    const resizedBox = await drawer.boundingBox();
    if (!resizedBox) throw new Error('Right sidebar bounding box after resize not available');

    expect(resizedBox.width).toBeGreaterThan(initialBox.width);
  });

  // Test 9 – navigating to another page while drawer is open closes the drawer
  test('navigating to a different section/subsection auto-closes the right sidebar (wide mode)', async ({ page }) => {
    const { chip } = await getFirstDrawerChip(page);

    // Open drawer
    await chip.click();
    await expect(page.locator(rightSidebar())).toHaveClass(/open/);

    // Click a different section header in the left sidebar
    const secondSectionHeader = page
      .locator('aside.left-sidebar .sidebar-section-header')
      .nth(1);

    await expect(secondSectionHeader).toBeVisible();
    await secondSectionHeader.click();

    // Right drawer should auto-close on base-path change
    await expect(page.locator(rightSidebar())).not.toHaveClass(/open/);
    await expect(page.locator('html')).not.toHaveClass(/right-open/);
  });

  // Test 10 – split-screen-specific behavior: resizing screen and returning to wide mode
  test('resizing between wide and overlay modes keeps drawer behavior sane and restores wide layout', async ({ page }) => {
    const main = page.locator(mainContent());
    const { chip } = await getFirstDrawerChip(page);

    // Start in wide mode and open drawer
    await expect(page.locator('html')).toHaveAttribute('data-layout-mode', 'wide');
    await chip.click();
    await expect(page.locator(rightSidebar())).toHaveClass(/open/);

    const wideMarginRight = await main.evaluate((el) => {
      return window.getComputedStyle(el).marginRight;
    });
    const wideNumeric = parseFloat(wideMarginRight || '0');
    expect(wideNumeric).toBeGreaterThan(0);

    // Shrink to overlay width
    await page.setViewportSize({ width: 1000, height: 900 });
    await page.waitForTimeout(100);
    await expect(page.locator('html')).toHaveAttribute('data-layout-mode', 'overlay');

    const overlayMarginRight = await main.evaluate((el) => {
      return window.getComputedStyle(el).marginRight;
    });

    // Grow back to wide
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.waitForTimeout(100);
    await expect(page.locator('html')).toHaveAttribute('data-layout-mode', 'wide');

    const wideAgainMarginRight = await main.evaluate((el) => {
      return window.getComputedStyle(el).marginRight;
    });
    const wideAgainNumeric = parseFloat(wideAgainMarginRight || '0');

    // After coming back to wide with the drawer open, main should again
    // have a non-zero right margin (drawer pushing content)
    expect(wideAgainNumeric).toBeGreaterThan(0);

    // And overlay margin should not be "more pushed" than wide
    const overlayNumeric = parseFloat(overlayMarginRight || '0');
    expect(overlayNumeric).toBeLessThanOrEqual(wideAgainNumeric);
  });
});
