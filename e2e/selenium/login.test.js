const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

const APP_URL = process.env.APP_URL || 'http://localhost:3000';

(async function loginTest() {
  const options = new chrome.Options();
  options.addArguments('--headless');
  options.addArguments('--no-sandbox');
  options.addArguments('--disable-dev-shm-usage');
  options.addArguments('--disable-gpu');

  let driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();

  try {
    await driver.get(APP_URL);

    const emailInput = await driver.findElement(By.name('email'));
    await emailInput.clear();
    await emailInput.sendKeys('germinacher@gmail.com');

    const passwordInput = await driver.findElement(By.name('password'));
    await passwordInput.clear();
    await passwordInput.sendKeys('123456');

    const loginButton = await driver.findElement(By.css('.register-button'));
    await loginButton.click();

    await driver.wait(until.urlContains('/main-menu'), 5000);
    await driver.wait(until.elementLocated(By.css('.main-menu-container')), 5000);

    console.log("Login test passed");
  } catch (error) {
    console.error("Test failed:", error);
    process.exit(1);
  } finally {
    await driver.quit();
  }
})();