const base= require('@playwright/test');

exports.customTest = base.test.extend({
    testDataForOrder: {
        userName: "vkkumar1922@gmail.com",
        password: "OnePlus@2024",
        productName: "ZARA COAT 3"
    }
})