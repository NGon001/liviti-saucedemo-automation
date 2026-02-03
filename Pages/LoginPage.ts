import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "../Helper/BasePage";

// Represents the Login Page and encapsulates its elements and actions (Needs only for saving user data into local storage, use only if you don't have saved session)
export class LoginPage extends BasePage{
    readonly locators: {
        usernameInput: Locator;
        passwordInput: Locator;
        loginButton: Locator;
    };

    readonly assertions: {
        verifyUsernameInputIsVisibleAndActive: () => Promise<void>;
        verifyPasswordInputIsVisibleAndActive: () => Promise<void>;
        verifyLoginButtonIsVisibleAndActive: () => Promise<void>;
    };

    readonly actions: {
        enterUsername: (username: string) => Promise<void>;
        enterPassword: (password: string) => Promise<void>;
        clickLoginButton: () => Promise<void>;
    };

    constructor(page: Page) {
        super(page);

        this.locators = {
            usernameInput: this.page.getByTestId("username"),
            passwordInput: this.page.getByTestId("password"),
            loginButton: this.page.getByTestId("login-button"),
        };

        this.assertions = {
            verifyUsernameInputIsVisibleAndActive: async () => {
                await expect(this.locators.usernameInput).toBeVisible();
                await expect(this.locators.usernameInput).toBeEnabled();
                await expect(this.locators.usernameInput).toHaveAttribute("placeholder", "Username");
            },
            verifyPasswordInputIsVisibleAndActive: async () => {
                await expect(this.locators.passwordInput).toBeVisible();
                await expect(this.locators.passwordInput).toBeEnabled();
                await expect(this.locators.passwordInput).toHaveAttribute("placeholder", "Password");
            },
            verifyLoginButtonIsVisibleAndActive: async () => {
                await expect(this.locators.loginButton).toBeVisible();
                await expect(this.locators.loginButton).toBeEnabled();
            }
        };

        this.actions = {
            enterUsername: async (username: string) => {
                await this.assertions.verifyUsernameInputIsVisibleAndActive();
                await this.locators.usernameInput.fill(username);
            },

            enterPassword: async (password: string) => {
                await this.assertions.verifyPasswordInputIsVisibleAndActive();
                await this.locators.passwordInput.fill(password);
            },

            clickLoginButton: async () => {
                await this.assertions.verifyLoginButtonIsVisibleAndActive();
                await this.locators.loginButton.click();
            },
        };
    };
};