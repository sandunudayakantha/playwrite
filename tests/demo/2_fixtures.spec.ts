import { test as base, Page, expect } from '@playwright/test';

// Step 1: Define a custom fixture for a logged-in page
const test = base.extend<{ loggedInPage: Page }>({
    loggedInPage: async ({ page }, use) => {
        // This setup code runs before the test
        await page.goto('https://opensource-demo.orangehrmlive.com/');
        await page.getByPlaceholder('Username').fill('Admin');
        await page.getByPlaceholder('Password').fill('admin123');
        await page.getByRole('button', { name: 'Login' }).click();

        // Pass the prepared page to the test
        await use(page);


    },
});

test('Demonstrating Fixtures', async ({ loggedInPage }) => {
    // This test starts ALREADY logged in!
    await expect(loggedInPage).toHaveURL(/dashboard/);

    // Demonstrate that we can immediately interact with the dashboard
    await loggedInPage.getByRole('link', { name: 'Admin' }).click();
    await expect(loggedInPage).toHaveURL(/admin\/viewSystemUsers/);
});
