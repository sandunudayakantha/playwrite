import { test, expect } from '@playwright/test';

test('Demonstrating Reporting and BDD Steps', async ({ page }) => {

    await test.step('Given I am on the OrangeHRM login page', async () => {
        await page.goto('https://opensource-demo.orangehrmlive.com/');
        await expect(page).toHaveTitle(/OrangeHRM/);
    });

    await test.step('When I enter valid credentials and click login', async () => {
        await page.getByPlaceholder('Username').fill('Admin');
        await page.getByPlaceholder('Password').fill('admin123');
        await page.getByRole('button', { name: 'Login' }).click();
    });

    await test.step('Then I should be redirected to the Dashboard', async () => {
        await expect(page).toHaveURL(/dashboard/);
        const dashboardHeading = page.getByRole('heading', { name: 'Dashboard' });
        await expect(dashboardHeading).toBeVisible();
    });

    await test.step('And I should see the user profile picture', async () => {
        const profileImg = page.locator('.oxd-userdropdown-img');
        await expect(profileImg).toBeVisible();
    });


});
