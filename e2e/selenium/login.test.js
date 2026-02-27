const { Builder, By, until } = require('selenium-webdriver');
require('chromedriver');

(async function loginTest() {
  let driver = await new Builder().forBrowser('chrome').build();

  try {
    await driver.get('http://localhost:3000');

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
  } finally {
    await driver.quit();
  }
})();