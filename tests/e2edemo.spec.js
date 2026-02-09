const { test, expect } = require('@playwright/test');

test('Demo Web Shop E2E - Stable Logout Fix', async ({ page }) => {

  const email = `testuser_${Date.now()}@mail.com`;

  await page.goto('https://demowebshop.tricentis.com/');

  // Register
  await page.click('a[href="/register"]');
  await page.check('#gender-male');
  await page.fill('#FirstName', 'Test');
  await page.fill('#LastName', 'User');
  await page.fill('#Email', email);
  await page.fill('#Password', 'Test@1234');
  await page.fill('#ConfirmPassword', 'Test@1234');
  await page.click('#register-button');

  await expect(page.locator('.result')).toHaveText('Your registration completed');

  // Logout after registration
  await page.locator('a[href="/logout"]').waitFor();
  await page.click('a[href="/logout"]');

  // Login
  await page.click('a[href="/login"]');
  await page.fill('#Email', email);
  await page.fill('#Password', 'Test@1234');
  await page.click('input[value="Log in"]');

  await expect(page.locator('.account')).toBeVisible();

  // Add to cart
  await page.fill('#small-searchterms', 'Laptop');
  await page.press('#small-searchterms', 'Enter');
  await page.click('.product-box-add-to-cart-button');

  // Wait for notification to disappear
  await page.locator('#bar-notification').waitFor({ state: 'hidden' });

  // Logout (final)
  const logoutLink = page.locator('a[href="/logout"]');
  await expect(logoutLink).toBeVisible();
  await logoutLink.click();

  await expect(page.locator('a[href="/login"]')).toBeVisible();
})