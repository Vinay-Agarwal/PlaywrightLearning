const { test, expect } = require("@playwright/test");
const {customTest} = require('../utils/test-base');
const { POManager } = require('../pageobjects/POManager');
const dataSet = JSON.parse(JSON.stringify(require('../utils/placeorderTestData.json')));
//convert JSON to String and then String to Object

for (const data of dataSet) {
    test.only(`Login Test Case ${data.productName}`, async ({ page }) => {
        const poManager = new POManager(page);
        //const userName = "vkkumar1922@gmail.com";
        //const password = "OnePlus@2024";
        //const productName = 'ZARA COAT 3';

        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();
        await loginPage.validLogin(data.userName, data.password);

        const dashboardPage = poManager.getDashboardPage();
        await dashboardPage.searchProductAddCart(data.productName);
        await dashboardPage.navigateToCart();

        const cartPage = poManager.getCartPage();
        await cartPage.VerifyProductIsDisplayed(data.productName);
        await cartPage.Checkout();

        const ordersReviewPage = poManager.getOrdersReviewPage();
        await ordersReviewPage.searchCountryAndSelect("ind", "India");
        const orderId = await ordersReviewPage.SubmitAndGetOrderId();

        console.log(orderId);
        await dashboardPage.navigateToOrders();
        const ordersHistoryPage = poManager.getOrdersHistoryPage();
        await ordersHistoryPage.searchOrderAndSelect(orderId);
        expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
    });
}

customTest('custom fixture test login', async({page,testDataForOrder})=>{
    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(testDataForOrder.userName, testDataForOrder.password);

    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductAddCart(testDataForOrder.productName);
    await dashboardPage.navigateToCart();

    const cartPage = poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(testDataForOrder.productName);
    await cartPage.Checkout();
});