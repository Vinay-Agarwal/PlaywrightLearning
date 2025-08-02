class LoginPage{
    constructor(page){
        this.page = page;
        this.signInButton = page.locator('#login');
        this.password = page.locator("#userPassword");
        this.userName = page.locator("#userEmail");
    }

    async validLogin(username, password){
        await this.userName.fill(username);
        await this.password.fill(password);
        await this.signInButton.click();
        await this.page.waitForLoadState('networkidle');
    }

    async goTo(){
        await this.page.goto("https://rahulshettyacademy.com/client/");
    }

}

module.exports = {LoginPage};