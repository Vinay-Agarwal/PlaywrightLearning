const { test, expect } = require("@playwright/test");
const { LoginPage } = require('../pageobjects/LoginPage');
const { DashBoardPage } = require('../pageobjects/DashBoardPage');
const { POManager } = require('../pageobjects/POManager');

test('Login Test Case', async ({ page }) => {
    const poManager = new POManager(page);
    const userName = "vkkumar1922@gmail.com";
    const password = "OnePlus@2024";
    const productName = 'ZARA COAT 3';

    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(userName, password);

    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductAddCart(productName);
    await dashboardPage.navigateToCart();

    const cartPage = poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(productName);
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