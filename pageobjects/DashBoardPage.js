class DashBoardPage {
    constructor(page) {
        this.page = page;
        this.products = page.locator('.card-body');
        this.productsText = page.locator('.card-body b');
        this.cart = page.locator("[routerlink*='cart']");
        this.list = page.locator('div li');

    }

    async searchProductAddCart(productName) {
        const title = await this.productsText.allTextContents();
        const countOfProducts = await this.products.count();
        console.log(countOfProducts);

        for (let i = 0; i < countOfProducts; ++i) {
            if (await this.products.nth(i).locator('b').textContent() === productName) {
                await this.products.nth(i).locator("text= Add To Cart").click();
                break;
            }
        }
    }

    async navigateToCart(){
        await this.cart.click();
        await this.list.first().waitFor();
    }

}

module.exports = {DashBoardPage};