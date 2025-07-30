const { test, expect } = require("@playwright/test");

test('Login Test Case', async ({ page }) => {
    const products = page.locator('.card-body');
    const productName = 'ZARA COAT 3';
    const loginId = page.locator("#userEmail");
    const loginPassword =  page.locator("#userPassword");
    const loginBtn = page.locator('#login');

    await page.goto("https://rahulshettyacademy.com/client/");
    await loginId.fill("vkkumar1922@gmail.com");
    await loginPassword.fill("OnePlus@2024");
    await loginBtn.click();
    await page.waitForLoadState('networkidle');
    
    const title = await page.locator('.card-body b').allTextContents();
    const countOfProducts = await products.count();
    console.log(countOfProducts);

    for(let i = 0; i< countOfProducts; ++i){
        if(await products.nth(i).locator('b').textContent() === productName){
            await products.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }

    await page.locator("[routerlink*='cart']").click();
    // page.pause();
    page.pause();
});