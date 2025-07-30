const { test, expect } = require("@playwright/test");

test('Login Test Case', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const cardTitle = page.locator('.card-body a');
    const userNameLocator = page.locator('#username');
    const passwordLocator = page.locator('[name=password]')
    const loginBtn = page.locator('#signInBtn');

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    console.log(await page.title());

    await expect(page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy');
    await userNameLocator.fill("vkkumar1992");
    await passwordLocator.fill("rahulshettyacademy");
    await loginBtn.click();

    const errorMessage = await page.locator('[style*="block"]').textContent();

    console.log("Error message after putting wrong credential: " + errorMessage);

    await expect(page.locator('[style*="block"]')).toContainText("Incorrect");

    await userNameLocator.fill("");
    await userNameLocator.fill("rahulshettyacademy");
    await passwordLocator.fill("");
    await passwordLocator.fill("learning");
    await loginBtn.click();

    console.log(await cardTitle.first().textContent());
    console.log(await cardTitle.nth(1).textContent());
    console.log(await cardTitle.last().textContent());
    console.log(await cardTitle.allTextContents());

});

test('page fixture Playwright test', async ({ page }) => {
    const userNameLocator = page.locator('#username');
    const passwordLocator = page.locator('[name=password]')
    const documentLink = page.locator('[href*="documents-request"]')

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    const dropdownLocator = page.locator('select.form-control');
    await dropdownLocator.selectOption("consult");
    await page.locator('.radiotextsty').last().click();
    await page.locator('#okayBtn').click();
    await expect(page.locator('.radiotextsty').last()).toBeChecked();
    await page.locator('[type="checkbox"]').click();
    await expect(page.locator('[type="checkbox"]')).toBeChecked();
    await page.locator('[type="checkbox"]').uncheck();
    console.log(await page.locator('[type="checkbox"]').isChecked());

    await expect(documentLink).toHaveAttribute("class","blinkingText");
    
});

test('Handling child window', async({browser}) =>
{
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    const documentLink = page.locator('[href*="documents-request"]')

    const [newPage] = await Promise.all([
         context.waitForEvent('page'),// will listen for new page
         await documentLink.click(), //This will open a new page so we have to wait for event

    ])

    console.log(await newPage.locator('.red').textContent());

     
});