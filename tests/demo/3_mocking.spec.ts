import { test, expect } from '@playwright/test';

test('Demonstrating Mocking/Network Interception', async ({ page }) => {
    // Step 1: Define the Mock BEFORE the request happens
    await page.route('**/api/v2/dashboard/employees/**', route => {
        console.log('Intercepting API call...');
        return route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({
                data: [
                    {
                        unit: "Modern Testing Division",
                        count: 42
                    }
                ]
            })
        });
    });

    // Step 2: Navigate and Login
    await page.goto('https://opensource-demo.orangehrmlive.com/');
    await page.getByPlaceholder('Username').fill('Admin');
    await page.getByPlaceholder('Password').fill('admin123');

    // Step 3: Trigger the request
    await page.getByRole('button', { name: 'Login' }).click();

    // Step 4: Verify the Mock was used (wait for the response)
    const response = await page.waitForResponse('**/api/v2/dashboard/employees/**');
    const data = await response.json();

    console.log('Mocked Data Received:', data);
    expect(data.data[0].count).toBe(42);
});
