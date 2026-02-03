import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "../Helper/BasePage";

export class CartPage extends BasePage{
    locators: {
        title: Locator;
        cartItemByName: (name: string) => Locator;
        chckoutButton: Locator;
    };

    assertions: {
        verifyTitleIsVisibleAndCorrect: () => Promise<void>;
        verifyItemIsInCartByName: (itemName: string) => Promise<void>;
        verifyCheckoutButtonIsVisibleAndActive: () => Promise<void>;
    };

    actions: {
        clickCheckoutButton: () => Promise<void>;
    };

    constructor(page: Page) {
        super(page);

        this.locators = {
            title: this.page.getByTestId("title"),
            cartItemByName: (name: string) => this.page.getByTestId("inventory-item").filter({ has: this.page.getByTestId("inventory-item-name").filter({ hasText: name }) }),
            chckoutButton: this.page.getByTestId("checkout"),
        };

        this.assertions = {
            verifyTitleIsVisibleAndCorrect: async () => {
                await expect(this.locators.title).toBeVisible();
                await expect(this.locators.title).toHaveText("Your Cart");
            },
            verifyItemIsInCartByName: async (itemName: string) => {
                const cartItem = await this.locators.cartItemByName(itemName);
                await expect(cartItem).toBeAttached();
                await expect(cartItem).toBeVisible();
                await expect(cartItem).toBeEnabled();
            },
            verifyCheckoutButtonIsVisibleAndActive: async () => {
                await expect(this.locators.chckoutButton).toBeVisible();
                await expect(this.locators.chckoutButton).toBeEnabled();
            }
        };

        this.actions = {
            clickCheckoutButton: async () => {
                await this.assertions.verifyCheckoutButtonIsVisibleAndActive();
                await this.locators.chckoutButton.click();
            },
        };
    };
};