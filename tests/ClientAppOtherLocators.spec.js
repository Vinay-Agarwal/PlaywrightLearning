const { test, expect } = require("@playwright/test");

test('Login Test Case', async ({ page }) => {
    const products = page.locator('.card-body');
    const productName = 'ZARA COAT 3';
    const loginId = page.getByPlaceholder("email@example.com");
    const loginPassword = page.getByPlaceholder("enter your passsword");
    const loginBtn = page.getByRole("button",{name:'login'});

    await page.goto("https://rahulshettyacademy.com/client/");
    await loginId.fill("vkkumar1922@gmail.com");
    await loginPassword.fill("OnePlus@2024");
    await loginBtn.click();
    await page.waitForLoadState('networkidle');
    await page.locator('.card-body b').first().waitFor();

    await page.locator('.card-body').filter({hasText:productName})
    .getByRole("button",{name:' Add To Cart'}).click();
    await page.getByRole("listitem").getByRole('button',{name:"Cart"}).click();
    await page.locator('div li').first().waitFor();
    await expect(page.getByText(productName)).toBeVisible();
    await page.getByRole("button", { name: "Checkout" }).click();
    await page.getByPlaceholder("Select Country").pressSequentially("ind");
    await page.getByRole("button", { name: "India" }).nth(1).click();
    await page.getByText("PLACE ORDER").click();

    await expect(page.getByText("Thankyou for the order.")).toBeVisible();
});