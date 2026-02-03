import { test as setup } from '../../Helper/Fixtures.ts';
import { getEnv } from '../../Helper/Tools.ts';

setup('auth setup', async ({ loginPage, inventoryPage }) => {
    await loginPage.goto();

    await loginPage.actions.enterUsername(await getEnv("STANDART_USERNAME"));
    await loginPage.actions.enterPassword(await getEnv("STANDART_PASSWORD"));
    await loginPage.actions.clickLoginButton();

    await inventoryPage.assertions.verifyTitleIsVisibleAndCorrect();

    await inventoryPage.storeLoginDataToLocalStorage();
});