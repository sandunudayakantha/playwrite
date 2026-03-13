import { test, expect } from '@playwright/test';

test('Demonstrating Mocking/Network Interception', async ({ page }) => {

    // Step 1: Mock the API before it is called
    await page.route('**/api/v2/dashboard/employees/**', async route => {
        console.log('Mock API intercepted');

        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({
                data: [
                    {
                        unit: "Modern Testing Division",
                        count: 42,
                        hours: 8
                    }
                ]
            })
        });
    });

    // Step 2: Open OrangeHRM login page
    await page.goto('https://opensource-demo.orangehrmlive.com/');

    // Step 3: Login using correct locators
    await page.locator('input[name="username"]').fill('Admin');
    await page.locator('input[name="password"]').fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();

    // Step 4: Wait for mocked API response
    const response = await page.waitForResponse('**/api/v2/dashboard/employees/**');

    // Step 5: Validate mocked data
    const data = await response.json();

    console.log('Mocked API Data:', data);

    await expect(data.data[0].count).toBe(42);
});