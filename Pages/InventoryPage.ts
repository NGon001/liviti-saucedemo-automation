import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "../Helper/BasePage";
import { convertHexToRGB } from "../Helper/Tools";

export const InventoryItemColors = {
    ADD_TO_CART_BUTTON_COLOR: "#132322", 
    REMOVE_BUTTON_COLOR: "#e2231a",
} as const;

export class InventoryPage extends BasePage{
    readonly locators: {
        title: Locator;
        inventoryItemByName: (name: string) => Locator;
        inventoryItemDescription: (item: Locator) => Locator;
        inventoryItemAddToCartButton: (item: Locator) => Locator;
        inventoryItemRemoveFromCartButton: (item: Locator) => Locator;
        shoppingCartBadge: Locator;
        shippingCartLink: Locator;
    };

    readonly assertions: {
        verifyTitleIsVisibleAndCorrect: () => Promise<void>;
        verifyInventoryItemAddedToCart: (item: Locator) => Promise<void>;
        verifyInventoryItemAddedToCartButtonActive: (item: Locator) => Promise<void>;
        verifyShoppingCartBadgeIsVisible: () => Promise<void>;
        verifyInventoryItemAddedToCartButtonCollor: (item: Locator, expectedColor: string) => Promise<void>;
        verifyInventoryItemRemoveButtonCollor: (item: Locator, expectedColor: string) => Promise<void>;
    };

    readonly actions: {
        addInventoryItemToCartByName: (name: string) => Promise<void>;
        clickShoppingCartLink: () => Promise<void>;
    };


    constructor(page: Page) {
        super(page);


        this.locators = {
            title: this.page.getByTestId("title"),
            inventoryItemByName: (name: string) => this.page.getByTestId("inventory-item").filter({ has: this.page.getByTestId("inventory-item-name").filter({ hasText: name }) }),
            inventoryItemDescription: (item: Locator) => item.getByTestId("inventory-item-desc"),
            inventoryItemAddToCartButton: (item: Locator) => item.getByRole("button", { name: "Add to cart" }),
            inventoryItemRemoveFromCartButton: (item: Locator) => item.getByRole("button", { name: "Remove" }),
            shoppingCartBadge: this.page.getByTestId("shopping-cart-badge"),
            shippingCartLink: this.page.getByTestId("shopping-cart-link"),
        };

        this.assertions = {
            verifyTitleIsVisibleAndCorrect: async () => {
                await expect(this.locators.title).toBeVisible();
                await expect(this.locators.title).toHaveText("Products");
            },

            verifyInventoryItemAddedToCartButtonActive: async (item: Locator) => {
                const addToCartButton = this.locators.inventoryItemAddToCartButton(item);
                await expect(addToCartButton).toBeAttached();
                await expect(addToCartButton).toBeVisible();
                await expect(addToCartButton).toBeEnabled();
            },

            verifyInventoryItemAddedToCart: async (item: Locator) => {
                const removeButton = this.locators.inventoryItemRemoveFromCartButton(item);
                await expect(removeButton).toBeAttached();
                await expect(removeButton).toBeVisible();
                await expect(removeButton).toBeEnabled();

                await expect(this.locators.inventoryItemAddToCartButton(item)).not.toBeAttached();
            },

            verifyShoppingCartBadgeIsVisible: async () => {
                const shoppingCartBadge = this.locators.shoppingCartBadge
                await expect(shoppingCartBadge).toBeAttached();
                await expect(shoppingCartBadge).toBeVisible();
                await expect(shoppingCartBadge).toBeEnabled();
            },

            verifyInventoryItemAddedToCartButtonCollor: async (item: Locator, expectedColor: string) => {
                const addToCartButton = this.locators.inventoryItemAddToCartButton(item);
                await expect(addToCartButton).toHaveCSS("color", expectedColor);
            },

            verifyInventoryItemRemoveButtonCollor: async (item: Locator, expectedColor: string) => {
                const removeButton = this.locators.inventoryItemRemoveFromCartButton(item);
                await expect(removeButton).toHaveCSS("color", expectedColor);
            }
        };

        this.actions = {
            addInventoryItemToCartByName: async (name: string) => {
                const item = this.locators.inventoryItemByName(name);
                await this.assertions.verifyInventoryItemAddedToCartButtonActive(item);
                await this.assertions.verifyInventoryItemAddedToCartButtonCollor(item, await convertHexToRGB(InventoryItemColors.ADD_TO_CART_BUTTON_COLOR));
                await this.locators.inventoryItemAddToCartButton(item).click();
                await this.assertions.verifyInventoryItemAddedToCart(item);
                await this.assertions.verifyInventoryItemRemoveButtonCollor(item, await convertHexToRGB(InventoryItemColors.REMOVE_BUTTON_COLOR));
                await this.assertions.verifyShoppingCartBadgeIsVisible();
            },
            clickShoppingCartLink: async () => {
                await this.locators.shippingCartLink.click();
            }
        };
    };
};