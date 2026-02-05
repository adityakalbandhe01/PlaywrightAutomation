const { test, expect } = require('@playwright/test');

test.describe('OrangeHRM Real Life E2E - Admin Search Flow', () => {

  test('Admin login → Search employee → Logout', async ({ page }) => {

    // Step 1: Navigate to application
    await page.goto('https://opensource-demo.orangehrmlive.com/');
    await expect(page).toHaveTitle(/OrangeHRM/);

    // Step 2: Login
    await page.getByPlaceholder('Username').fill('Admin');
    await page.getByPlaceholder('Password').fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();

    // Step 3: Verify Dashboard
    await expect(
      page.getByRole('heading', { name: 'Dashboard' })
    ).toBeVisible();

    // Step 4: Navigate to Admin module
    await page.getByRole('link', { name: 'Admin' }).click();
    await expect(page).toHaveURL(/admin\/viewSystemUsers/);

    // Step 5: Search for user
    await page.getByLabel('Username').fill('Admin');
    await page.getByRole('button', { name: 'Search' }).click();

    // Step 6: Validate search result
    const rows = page.locator('.oxd-table-body .oxd-table-row');
    await expect(rows).toHaveCount(1);
    await expect(rows.first()).toContainText('Admin');

    // Step 7: Logout
    await page.locator('.oxd-userdropdown-tab').click();
    await page.getByRole('menuitem', { name: 'Logout' }).click();

    // Step 8: Verify logout
    await expect(page).toHaveURL(/auth\/login/);
  });

});