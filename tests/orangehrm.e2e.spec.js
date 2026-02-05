const { test, expect } = require('@playwright/test');

test.describe('OrangeHRM E2E Flow', () => {

  test('Login → Admin Search → Logout', async ({ page }) => {

    // 1️⃣ Navigate to OrangeHRM
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    // 2️⃣ Login
    await page.locator('input[name="username"]').fill('Admin');
    await page.locator('input[name="password"]').fill('admin123');
    await page.locator('button[type="submit"]').click();

    // 3️⃣ Verify Dashboard
    await expect(page).toHaveURL(/dashboard/);
    await expect(page.locator('h6')).toHaveText('Dashboard');

    // 4️⃣ Navigate to Admin
    await page.locator('span:has-text("Admin")').click();
    await expect(page).toHaveURL(/admin/);

  // 5️⃣ Search for a user
await page.getByLabel('Username').fill('Admin');
await page.getByRole('button', { name: 'Search' }).click();

    // 6️⃣ Verify search result
    const records = page.locator('.oxd-table-card');
    await expect(records.first()).toBeVisible();

    // 7️⃣ Logout
    await page.locator('.oxd-userdropdown-tab').click();
    await page.locator('a:has-text("Logout")').click();

    // 8️⃣ Verify logout
    await expect(page).toHaveURL(/auth\/login/);
  });

});