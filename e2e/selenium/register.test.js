const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

const APP_URL = process.env.APP_URL || 'http://localhost:3000';

// Generar email único para no repetir registros
const timestamp = Date.now();
const testEmail = `testuser_${timestamp}@gmail.com`;

(async function registerTest() {
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
    await driver.get(`${APP_URL}/register`);
    await driver.wait(until.elementLocated(By.name('nombre')), 5000);
    console.log("✅ Página de registro cargada");

    // DATOS PERSONALES
    await driver.findElement(By.name('nombre')).sendKeys('Test');
    await driver.findElement(By.name('apellido')).sendKeys('Usuario');
    await driver.findElement(By.name('email')).sendKeys(testEmail);
    await driver.findElement(By.name('password')).sendKeys('123456');
    await driver.findElement(By.name('confirmPassword')).sendKeys('123456');
    console.log("✅ Datos personales completados");

    // DATOS FÍSICOS
    await driver.findElement(By.name('altura')).sendKeys('175');
    await driver.findElement(By.name('peso')).sendKeys('70');
    await driver.findElement(By.name('edad')).sendKeys('25');

    // GÉNERO
    const generoSelect = await driver.findElement(By.name('genero'));
    await generoSelect.findElement(By.css('option[value="Masculino"]')).click();
    console.log("✅ Datos físicos completados");

    // OBJETIVO
    const objetivoSelect = await driver.findElement(By.name('objetivo'));
    await objetivoSelect.findElement(By.css('option[value="Aumentar masa muscular"]')).click();

    // PREFERENCIAS
    const preferenciasSelect = await driver.findElement(By.name('preferencias'));
    await preferenciasSelect.findElement(By.css('option[value="Ninguna"]')).click();
    console.log("✅ Objetivos y preferencias completados");

    // TÉRMINOS Y PRIVACIDAD
    const checkboxes = await driver.findElements(By.css('.terms-checkbox'));
    await checkboxes[0].click();
    await checkboxes[1].click();
    console.log("✅ Términos aceptados");

    // SUBMIT
    await driver.findElement(By.css('.register-button')).click();

    // ESPERAR ALERTA DE ÉXITO
    await driver.wait(until.elementLocated(By.css('.custom-alert-overlay')), 5000);
    console.log("✅ Registro exitoso");

    // CLICKEAR EL BOTÓN ACEPTAR DE LA ALERTA
    await driver.findElement(By.css('.custom-alert-button.confirm')).click();

    // ESPERAR QUE REDIRIJA AL LOGIN
    await driver.wait(until.urlContains('/login'), 5000);
    console.log("✅ Redirigió al login");

    console.log("🎉 Register test pasado");

  } catch (error) {
    console.error("❌ Test failed:", error);
    process.exit(1);
  } finally {
    await driver.quit();
  }
})();