const { Builder, Browser, By, until } = require("selenium-webdriver");
const config = require('../config/config.json');
const assert = require('assert');
const { describe, it, after } = require('mocha');
const emailUnique = `test.user+js${Math.floor(Math.random() * 999)}@genomemedical.com`;
const SignUp = require('../pageobjects/signup.page');

describe('My Login application', () => {
    let driver;

    it('I should open the main URL and verify the title', async function () {
        this.timeout(0);
        // Initialize the WebDriver instance directly within the test
        // Disable timeout for this test
        driver = await new Builder().forBrowser(Browser.CHROME).build();
        // Navigate to the website
        await driver.manage().window().maximize();
        await driver.get(config.url);
        const title = await driver.getTitle();
        assert.strictEqual(title, 'Genome Medical');

        const ln = new SignUp(driver);
        // Enter Login Information for Signing Up patient
        //await ln.switchToCurrentActiveWindow();
        await ln.loginInformation(emailUnique, config.password, config.confirmpassword);

        // Enter Patient Information for Signing Up patient
        await ln.patientInformation(config.firstName, config.lastName, config.dob, config.phoneNumber);

        // Click on SignUp button
        await ln.clickSignUp();

        // Accept the privacy policy
        await ln.acceptPrivacyPolicy();

        // Verify User is Signed up successfully
        await ln.verifySignUpSuccessful();

        // Sign out Patient and verify signout is successful
        await ln.verifySignOut();
    });

    after(async function () {
        // Close the browser
        if (driver) {
            await driver.quit();
        }
    });
});
