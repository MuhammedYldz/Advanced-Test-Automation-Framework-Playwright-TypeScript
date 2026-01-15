import { BasePage } from './BasePage';
import { Page } from '@playwright/test';

/**
 * Page Object for Login Page.
 * Contains selectors and methods specific to the login functionality.
 */
export class LoginPage extends BasePage {
  // Selectors - kept private to enforce encapsulation
  private readonly loginHeader = 'h2:has-text("Login to your account")';
  private readonly emailInput = '[data-qa="login-email"]';
  private readonly passwordInput = '[data-qa="login-password"]';
  private readonly loginButton = '[data-qa="login-button"]';
  private readonly errorMessage = '.login-form form p'; // Adjust selector based on actual site
  private readonly logoutButton = 'a[href="/logout"]';
  private readonly loggedInUser = 'li:has-text("Logged in as")';

  constructor(page: Page) {
    super(page);
  }

  async navigateToLoginPage() {
    await this.navigateTo('/login');
  }

  async verifyLoginHeader() {
    return await this.isVisible(this.loginHeader);
  }

  async login(email: string, password: string) {
    await this.enterCredentials(email, password);
    await this.clickLogin();
  }

  async enterCredentials(email: string, password: string) {
    await this.fillInput(this.emailInput, email);
    await this.fillInput(this.passwordInput, password);
  }

  async clickLogin() {
    await this.clickElement(this.loginButton);
  }

  async isUserLoggedIn() {
    return await this.isVisible(this.loggedInUser);
  }

  async getErrorMessage() {
    // Note: The site might handle errors differently, this is a generic implementation
    // We might need to inspect the DOM if we could, but I'll use a generic selector for now
    // or wait for a specific error element.
    // Based on standard practices, we look for visible error text.
    return await this.getText(this.errorMessage);
  }
}
