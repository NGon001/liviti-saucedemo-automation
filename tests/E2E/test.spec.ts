import {test} from '../../Helper/Fixtures.ts';
import { CheckoutTitles } from '../../Pages/CheckoutPage.ts';

test.beforeEach(async ({ inventoryPage }) => {
    await inventoryPage.goto("/inventory.html");
});

test('Checkout Flow', async ({ inventoryPage, cartPage, checkoutPage }) => {
    const itemName = "Sauce Labs Backpack";
    await inventoryPage.assertions.verifyTitleIsVisibleAndCorrect();
    await inventoryPage.actions.addInventoryItemToCartByName(itemName);
    await inventoryPage.actions.clickShoppingCartLink();

    await cartPage.assertions.verifyTitleIsVisibleAndCorrect();
    await cartPage.assertions.verifyItemIsInCartByName(itemName);
    await cartPage.actions.clickCheckoutButton();

    await checkoutPage.assertions.verifyTitleIsVisibleAndCorrect(CheckoutTitles.CHECKOUT_YOUR_INFORMATION);
    await checkoutPage.actions.enterPersonalInformation("John", "Doe", "12345");
    await checkoutPage.actions.clickContinueButton();

    await checkoutPage.assertions.verifyTitleIsVisibleAndCorrect(CheckoutTitles.CHECKOUT_OVERVIEW);
    await checkoutPage.assertions.verifyItemIsInCheckoutByName(itemName);
    await checkoutPage.actions.clickFinishButton();

    await checkoutPage.assertions.verifyTitleIsVisibleAndCorrect(CheckoutTitles.CHECKOUT_COMPLETE);
    await checkoutPage.assertions.verifyOrderCompletion();
});