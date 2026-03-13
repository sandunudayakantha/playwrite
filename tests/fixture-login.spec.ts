import { test as base, Page, expect } from '@playwright/test';

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


test('Mock employee API verification', async ({ page }) => {
    let mockHit = false;

    await page.route('**/api/v2/dashboard/employees/**', route => {
        mockHit = true;
        return route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({ data: [] })
        });
    });

    await page.goto('https://opensource-demo.orangehrmlive.com/');

    // Perform Login
    await page.getByPlaceholder('Username').fill('Admin');
    await page.getByPlaceholder('Password').fill('admin123');
    
    // Wait for the response after clicking Login
    const [response] = await Promise.all([
        page.waitForResponse('**/api/v2/dashboard/employees/**'),
        page.getByRole('button', { name: 'Login' }).click(),
    ]);

    // Verify the response from the mock
    const responseBody = await response.json();
    console.log('Mock Hit:', mockHit);
    console.log('Response Body:', responseBody);

    // Assertions to confirm the mock worked
    expect(mockHit).toBe(true);
    expect(response.status()).toBe(200);
    expect(responseBody.data).toHaveLength(0);
});