const { test, expect } = require('@playwright/test');

test.describe('OrangeHRM E2E - Update My Info Flow', () => {

  test('Login → Update Personal Info → Logout', async ({ page }) => {

    // Step 1: Launch Application
    await page.goto('https://opensource-demo.orangehrmlive.com/');

    // Step 2: Login
    await page.locator('input[name="username"]').fill('Admin');
    await page.locator('input[name="password"]').fill('admin123');
    await page.locator('button[type="submit"]').click();

 // Assertion: Dashboard loaded
await expect(
  page.getByRole('heading', { name: 'Dashboard' })
).toBeVisible();

// Navigate to My Info
await page.locator('a[href="/web/index.php/pim/viewMyDetails"]').click();

// Assertion: Personal Details page
await expect(
  page.getByRole('heading', { name: 'Personal Details' })
).toBeVisible();

    // Step 4: Update Personal Information
    await page.locator('input[name="firstName"]').fill('John');
    await page.locator('input[name="middleName"]').fill('QA');
    await page.locator('input[name="lastName"]').fill('Tester');

    // Save
    await page.locator('button:has-text("Save")').first().click();

    // Step 5: Verify success toast
    await expect(
      page.locator('.oxd-toast-content')
    ).toContainText('Successfully Updated');

    // Step 6: Logout
    await page.locator('.oxd-userdropdown-name').click();
    await page.locator('a:has-text("Logout")').click();

    // Assertion: Login page displayed
    await expect(page).toHaveURL(/auth\/login/);
  });

});