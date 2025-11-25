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
test.describe('Sidebar tests', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/srch/privacy/whatIsPrivacy/');
    });

    test.describe('Drawer links', () => {
        test('clicking adds slug and opens sidebar', async ({ page }) => {
            // pick the second hyperlink with class 'srch-drawer-link'
            const link = page.locator('a.srch-drawer-link').nth(2)

            // get the link text
            const linkText = await link.textContent();
            if (!linkText) throw new Error("Link has no text");

            // compute the slug
            const slug = slugify(linkText);

            // click the link
            await link.click();

            // check the sidebar is visible
            await expect(page.locator('div.drawer-content')).toBeVisible();

            // check that the page URL contains the slug
            await expect(page).toHaveURL(new RegExp(`/${slug}$`));
        });

        test('clicking then exisiting removes slug and collapses sidebar', async ({ page }) => {
            // test code
        });

    });

    test.describe('sidebar content', () => {
        test('is scrollable', async ({ page }) => {
            // test code
        });
    });

    test('resizing the sidebar', async ({ page }) => {
        // test code
    });
})