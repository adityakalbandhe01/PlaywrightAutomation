const { test, expect } = require('@playwright/test');

test('BFSI E2E Flow - Login → Create Account → Deposit → Logout', async ({ page }) => {

  // Step 1: Launch Application
  await page.goto('https://demo.guru99.com/V4/');
  await expect(page).toHaveTitle(/Guru99 Bank/);

  // Step 2: Login
  await page.fill('input[name="uid"]', 'mngr123456');     // use valid demo id
  await page.fill('input[name="password"]', 'password123'); // use valid demo pwd
  await page.click('input[name="btnLogin"]');

  await expect(page.locator('text=Manager Id')).toBeVisible();

  // Step 3: Navigate to New Account
  await page.click('text=New Account');

  await page.fill('input[name="cusid"]', '12345'); 
  await page.selectOption('select[name="selaccount"]', 'Savings');
  await page.fill('input[name="inideposit"]', '5000');

  await page.click('input[name="button2"]');

  await expect(page.locator('text=Account Generated Successfully')).toBeVisible();

  // Capture Account Number dynamically
  const accountNo = await page.locator('td:has-text("Account ID") + td').textContent();

  // Step 4: Deposit Money
  await page.click('text=Deposit');

  await page.fill('input[name="accountno"]', accountNo.trim());
  await page.fill('input[name="ammount"]', '2000');
  await page.fill('input[name="desc"]', 'Test Deposit');

  await page.click('input[name="AccSubmit"]');

  await expect(page.locator('text=Transaction details of Deposit')).toBeVisible();

  // Step 5: Logout
  await page.click('text=Log out');

  page.on('dialog', async dialog => {
    await dialog.accept();
  });

});