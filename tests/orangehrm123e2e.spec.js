import { test, expect } from '@playwright/test';

test.describe('OrangeHRM Full E2E Flow', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/');
  });

  test('Login → My Info → File Upload → API Validation → Logout', async ({ page, request }) => {

    /* ---------- LOGIN ---------- */
    await page.getByPlaceholder('Username').fill('Admin');
    await page.getByPlaceholder('Password').fill('admin123');

    await Promise.all([
      page.waitForNavigation(),
      page.getByRole('button', { name: 'Login' }).click()
    ]);

    await expect(page).toHaveURL(/dashboard/);
    await expect(page.locator('h6')).toHaveText('Dashboard');

    /* ---------- NAVIGATION ---------- */
    await page.getByRole('link', { name: 'My Info' }).click();
    await expect(page).toHaveURL(/pim\/viewPersonalDetails/);

    /* ---------- FORM INTERACTION ---------- */
    await page.locator('input[name="firstName"]').fill('Aditya');
    await page.locator('input[name="lastName"]').fill('Kalbandhe');

    /* ---------- DROPDOWN ---------- */
    await page.locator('.oxd-select-text').first().click();
    await page.getByText('Indian').click();

    /* ---------- FILE UPLOAD ---------- */
    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles('tests/fixtures/profile.png');

    /* ---------- SAVE ---------- */
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByText('Successfully Updated')).toBeVisible();

    /* ---------- ALERT / TOAST VALIDATION ---------- */
    await expect(page.locator('.oxd-toast')).toContainText('Success');

    /* ---------- SCREENSHOT ---------- */
    await page.screenshot({ path: 'screenshots/myinfo.png', fullPage: true });

    /* ---------- API VALIDATION ---------- */
    const apiResponse = await request.get(
      'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/shortcuts'
    );

    expect(apiResponse.status()).toBe(200);

    const apiBody = await apiResponse.json();
    expect(apiBody.data).toBeDefined();

    /* ---------- LOGOUT ---------- */
    await page.locator('.oxd-userdropdown-tab').click();
    await page.getByRole('menuitem', { name: 'Logout' }).click();

    await expect(page).toHaveURL(/auth\/login/);
  });

});