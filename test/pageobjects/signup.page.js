const { By, until } = require('selenium-webdriver');

class SignUp {

    constructor(driver) {
        this.driver = driver;
    }

    async loginInformation(email, password, confirmPassword) {
        await this.driver.sleep(10000);
        await this.driver.findElement(By.xpath("//*[text()='Sign Up']")).click();
        console.log("Clicked on SignUp button");
        await this.driver.sleep(10000);
        await this.driver.findElement(By.xpath("//input[@name='email']")).sendKeys(email);
        await this.driver.sleep(2000);
        console.log("Entered email address");
        await this.driver.findElement(By.xpath("//*[@name='password']")).sendKeys(password);
        await this.driver.sleep(2000);
        console.log("Entered password");
        await this.driver.findElement(By.xpath("//*[@name='passwordRepeat']")).sendKeys(confirmPassword);
        await this.driver.sleep(2000);
        console.log("Entered confirm password");
    }

    async patientInformation(firstName, lastName, dob, phoneNumber) {
        await this.driver.findElement(By.css("input[name='firstName']")).sendKeys(firstName);
        await this.driver.sleep(2000);
        await this.driver.findElement(By.css("input[name='lastName']")).sendKeys(lastName);
        await this.driver.sleep(2000);
        await this.driver.findElement(By.css("input[name='dob']")).sendKeys(dob);
        await this.driver.sleep(2000);
        await this.driver.findElement(By.xpath("//div[text()=' Sex Assigned at Birth']/following-sibling::div//input[@placeholder='Select']")).click();
        await this.driver.sleep(8000);
        await this.driver.findElement(By.css("div[x-placement='bottom'] li:nth-child(2) span:nth-child(1)")).click();
        await this.driver.sleep(5000);
        await this.driver.findElement(By.css("input[placeholder='Primary Phone Number']")).sendKeys(phoneNumber);
        await this.driver.sleep(2000);
        await this.driver.findElement(By.xpath("//div[contains(text(),'Medicare')]//following-sibling::div//span[text()='No']")).click();
        await this.driver.sleep(5000);
        await this.driver.findElement(By.xpath("//div[contains(text(),'Race')]/parent::div//following-sibling::div//input")).click();
        await this.driver.sleep(5000);
        await this.driver.findElement(By.xpath("//*[text()='White']")).click();
        await this.driver.sleep(5000);
        await this.driver.findElement(By.xpath("//div[contains(text(),'Ethnicity')]/parent::div//following-sibling::div//input")).click();
        await this.driver.sleep(5000);
        await this.driver.findElement(By.xpath("//*[text()='Hispanic or Latino']")).click();
        await this.driver.sleep(5000);
    }

    async clickSignUp() {
        await this.driver.findElement(By.css("button[type='submit']")).click();
        await this.driver.sleep(10000);
    }

    async acceptPrivacyPolicy() {
        await this.driver.findElement(By.css("button[type='submit']")).click();
        await this.driver.sleep(6000);
        await this.driver.findElement(By.css("button[type='submit']")).click();
        await this.driver.sleep(12000);
        await this.driver.findElement(By.css(".skip-step")).click();
        await this.driver.sleep(10000);
    }

    async verifySignUpSuccessful() {
        await this.driver.wait(until.elementLocated(By.css("a[href='/patient/home']")), 10000);
    }

    async verifySignOut() {
        await this.driver.findElement(By.xpath("//div[@class='user-full-name']//p//img")).click();
        await this.driver.sleep(8000);
        await this.driver.findElement(By.xpath("//a[text()='Signout']")).click();
        await this.driver.sleep(6000);
        await this.driver.findElement(By.css("div.no-account-text>a.reset-password-link")).isDisplayed();
    }
}

module.exports = SignUp;
