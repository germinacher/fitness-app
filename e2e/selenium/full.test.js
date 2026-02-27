const { Builder, By, until } = require('selenium-webdriver');
require('chromedriver');

(async function fullTest() {
  let driver = await new Builder().forBrowser('chrome').build();

  try {
    // LOGIN
    await driver.get('http://localhost:3000');

    const emailInput = await driver.findElement(By.name('email'));
    await emailInput.clear();
    await emailInput.sendKeys('germinacher@gmail.com');

    const passwordInput = await driver.findElement(By.name('password'));
    await passwordInput.clear();
    await passwordInput.sendKeys('123456');

    await driver.findElement(By.css('.register-button')).click();
    await driver.wait(until.urlContains('/main-menu'), 5000);
    console.log("Login OK");

    // NAVEGAR AL CHATBOT DESDE EL MAIN MENU
    await driver.wait(until.elementLocated(By.css('.menu-button-large')), 5000);

    const menuButtons = await driver.findElements(By.css('.menu-button-large'));
    for (const btn of menuButtons) {
      const text = await btn.getText();
      if (text.includes('Mi entrenador personal')) {
        await btn.click();
        break;
      }
    }

    await driver.wait(until.urlContains('/chatbot'), 5000);
    console.log("Navegó al chatbot");

    // Esperar a que cargue el chatbot y aparezcan las opciones
    await driver.wait(until.elementLocated(By.css('.option-button')), 8000);
    console.log("Chatbot cargado");

    // PREGUNTA 1: días de entrenamiento 
    await clickOptionButton(driver, '4 días');
    console.log("Pregunta 1 respondida");

    // PREGUNTA 2: duración
    await clickOptionButton(driver, '60 minutos');
    console.log("Pregunta 2 respondida");

    // PREGUNTA 3: experiencia
    await clickOptionButton(driver, 'Intermedio');
    console.log("Pregunta 3 respondida");

    // PREGUNTA 4: enfoque 
    await clickOptionButton(driver, 'Balanceada');
    console.log("Pregunta 4 respondida");

    // PREGUNTA 5: peso objetivo 
    await driver.wait(until.elementLocated(By.css('.option-input')), 5000);
    const pesoInput = await driver.findElement(By.css('.option-input'));
    await pesoInput.clear();
    await pesoInput.sendKeys('75');
    await driver.findElement(By.css('.confirm-button')).click();
    console.log("Pregunta 5 respondida");

    // PREGUNTA 6: horario
    await clickOptionButton(driver, 'Mañana');
    console.log("Pregunta 6 respondida");

    // ESPERAR A QUE SE GENERE EL PLAN (puede tardar)
    await driver.wait(until.elementLocated(By.css('.plan-results')), 30000);
    console.log("Plan generado correctamente");

    console.log("Test completo pasado");

  } catch (error) {
    console.error("Test failed:", error);
  } finally {
    await driver.quit();
  }
})();

// Helper: espera a que aparezca un botón con ese texto y lo clickea
async function clickOptionButton(driver, text) {
  // Esperar a que desaparezcan los botones viejos y aparezcan los nuevos
  await driver.sleep(800);
    
  const buttons = await driver.wait(
    until.elementsLocated(By.css('.option-button')),
    5000
  );

  for (const btn of buttons) {
    const btnText = await btn.getText();
    if (btnText.trim() === text) {
      await btn.click();
      return;
    }
  }

  throw new Error(`No se encontró el botón con texto: "${text}"`);
}