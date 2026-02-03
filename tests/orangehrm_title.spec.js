
//@ts-check

const {test, expect} = require('@playwright/test')

test('Validate the page title', async({page})=>{

    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'); 
    await expect(page).toHaveTitle(/OrangeHRM/);


}
)