import { test, expect } from '@playwright/test';

test('Login to OrangeHRM and verify dashboard', async ({ page }) => {

    await page.goto('https://opensource-demo.orangehrmlive.com/');

    // Fill login form
    await page.getByPlaceholder('Username').fill('Admin');
    await page.getByPlaceholder('Password').fill('admin123');

    await page.getByRole('button', { name: 'Login' }).click();

    // Assertion: URL contains dashboard
    await expect(page).toHaveURL(/dashboard/);

    // Assertion: Dashboard heading visible
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();

});


test('Mock employee API', async ({ page }) => {

    await page.route('**/api/v2/dashboard/employees/**', route =>
        route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({ data: [] })
        })
    );

    await page.goto('https://opensource-demo.orangehrmlive.com/');
});