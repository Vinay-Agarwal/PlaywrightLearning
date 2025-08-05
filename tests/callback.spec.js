import {test, expect} from '@playwright/test';
import { addAbortSignal } from 'stream';

test('Playwright Special locator test', async ({page})=>{

    page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Female");
    await page.getByPlaceholder("Password").fill("password");
    await page.getByRole("button", {name:'Submit'}).click();
    await page.getByText("Success! The Form has been submitted successfully!.");
    await page.getByRole("link",{name:'Shop'}).click();
    await page.locator("app-card").filter({hasText:"Nokia Edge"}).getByRole("button").click();

});