import { expect, Page } from "@playwright/test";

/**
 * This class represents the login page.
 */
export class LoginPage {
  readonly page: Page;
  readonly pageUrl = "http://localhost:5173/login";

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Redirects to the login page.
   */
  async goto(): Promise<void> {
    await this.page.goto(this.pageUrl);
  }

  /**
   * Types a specific email in the email input.
   * @param email {string} the email to type.
   */
  async typeEmail(email: string): Promise<void> {
    const input = await this.page
      .getByTestId("emailInput")
      .getByTestId("input");
    await input.fill(email);
  }

  /**
   * Types a specific password in the password input.
   * @param password {string} the password to type.
   */
  async typePassword(password: string): Promise<void> {
    const input = await this.page
      .getByTestId("passwordInput")
      .getByTestId("input");
    await input.fill(password);
  }

  /**
   * Clicks on the login button.
   */
  async clickLogin(): Promise<void> {
    const loginButton = await this.page.getByTestId("loginButton");
    await loginButton.click();
  }

  /**
   * Expect the login form to have an error with a specific text.
   */
  async expectLoginError(): Promise<void> {
    const errorMessage = await this.page.getByTestId("loginErrorText");
    await expect(errorMessage).toHaveText(
      "Login fehlgeschlagen! Bitte prüfen Sie Ihre E-Mail und Ihr Passwort.",
    );
  }

  /**
   * Expect url to be the login-page url.
   */
  async expectToBeOnLoginPage(): Promise<void> {
    await expect(this.page).toHaveURL(this.pageUrl);
  }
}
