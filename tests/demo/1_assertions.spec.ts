import { test, expect } from '@playwright/test';

test('Demonstrating Assertions', async ({ page }) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/');

    // 1. URL Assertion
    await expect(page).toHaveURL(/login/);

    // 2. Title Assertion
    await expect(page).toHaveTitle(/OrangeHRM/);

    // 3. Visibility Assertion
    const loginButton = page.getByRole('button', { name: 'Login' });
    await expect(loginButton).toBeVisible();

    // 4. Attribute Assertion
    await expect(page.getByPlaceholder('Username')).toHaveAttribute('name', 'username');

    // Perform login to show a state change assertion
    await page.getByPlaceholder('Username').fill('Admin');
    await page.getByPlaceholder('Password').fill('admin123');
    await loginButton.click();

    // 5. Post-action Assertion
    await expect(page).toHaveURL(/dashboard/);
});
