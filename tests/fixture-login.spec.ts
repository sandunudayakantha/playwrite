import { test as base, Page } from '@playwright/test';

const test = base.extend<{
    loggedInPage: Page;
}>({
    loggedInPage: async ({ page }, use) => {

        await page.goto('https://opensource-demo.orangehrmlive.com/');
        await page.fill('input[name="username"]', 'Admin');
        await page.fill('input[name="password"]', 'admin123');
        await page.click('button[type="submit"]');

        await use(page);
    },
});

test('Check Admin menu using fixture', async ({ loggedInPage }) => {
    await loggedInPage.getByRole('link', { name: 'Admin' }).click();
});