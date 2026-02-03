import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "../Helper/BasePage";

export const CheckoutTitles = {
    CHECKOUT_YOUR_INFORMATION: "Checkout: Your Information",
    CHECKOUT_OVERVIEW: "Checkout: Overview",
    CHECKOUT_COMPLETE: "Checkout: Complete!"
} as const;

export class CheckoutPage extends BasePage{
    locators: {
        title: Locator;
        firstNameInput: Locator;
        lastNameInput: Locator;
        postalCodeInput: Locator;
        continueButton: Locator;
        checkoutItemByName: (name: string) => Locator;
        complitionHeader: Locator;
        finishButton: Locator;
    };

    assertions: {
        verifyTitleIsVisibleAndCorrect: (title: typeof CheckoutTitles[keyof typeof CheckoutTitles]) => Promise<void>;
        verifyPersonalInformationInputFieldsAreVisibleAndActive: () => Promise<void>;
        verifyItemIsInCheckoutByName: (itemName: string) => Promise<void>;
        verifyOrderCompletion: () => Promise<void>;
    };

    actions: {
        enterPersonalInformation: (firstName: string, lastName: string, postalCode: string) => Promise<void>;
        clickContinueButton: () => Promise<void>;
        clickFinishButton: () => Promise<void>;
    };

    constructor(page: Page) {
        super(page);

        this.locators = {
            title: this.page.getByTestId("title"),
            firstNameInput: this.page.getByTestId("firstName"),
            lastNameInput: this.page.getByTestId("lastName"),
            postalCodeInput: this.page.getByTestId("postalCode"),
            continueButton: this.page.getByTestId("continue"),
            checkoutItemByName: (name: string) => this.page.getByTestId("inventory-item").filter({ has: this.page.getByTestId("inventory-item-name").filter({ hasText: name }) }),
            complitionHeader: this.page.getByTestId("complete-header"),
            finishButton: this.page.getByTestId("finish"),
        };

        this.assertions = {
            verifyTitleIsVisibleAndCorrect: async (title: typeof CheckoutTitles[keyof typeof CheckoutTitles]) => {
                await expect(this.locators.title).toBeVisible();
                await expect(this.locators.title).toHaveText(title);
            },
            verifyPersonalInformationInputFieldsAreVisibleAndActive: async () => {
                await expect(this.locators.firstNameInput).toBeVisible();
                await expect(this.locators.firstNameInput).toBeEnabled();
                await expect(this.locators.lastNameInput).toBeVisible();
                await expect(this.locators.lastNameInput).toBeEnabled();
                await expect(this.locators.postalCodeInput).toBeVisible();
                await expect(this.locators.postalCodeInput).toBeEnabled();
            },
            verifyItemIsInCheckoutByName: async (itemName: string) => {
                const checkoutItem = await this.locators.checkoutItemByName(itemName);
                await expect(checkoutItem).toBeAttached();
                await expect(checkoutItem).toBeVisible();
                await expect(checkoutItem).toBeEnabled();
            },
            verifyOrderCompletion: async () => {
                await expect(this.locators.complitionHeader).toBeVisible();
                await expect(this.locators.complitionHeader).toHaveText("Thank you for your order!");
            },
        };

        this.actions = {
            enterPersonalInformation: async (firstName: string, lastName: string, postalCode: string) => {
                await this.assertions.verifyPersonalInformationInputFieldsAreVisibleAndActive();
                await this.locators.firstNameInput.fill(firstName);
                await this.locators.lastNameInput.fill(lastName);
                await this.locators.postalCodeInput.fill(postalCode);
            },

            clickContinueButton: async () => {
                await this.locators.continueButton.click();
            },
            clickFinishButton: async () => {
                await this.locators.finishButton.click();
            },
        };
    };
};