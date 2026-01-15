import { Page, Locator } from '@playwright/test';

/**
 * Best Practice: Page Object Model (POM) Base Class
 * 
 * I learned that duplicating code is the enemy of maintenance.
 * This class holds methods shared by ALL pages (like clicking, typing, checking visibility).
 * If I ever need to change how "clicking" works (e.g., adding a global log), I only change it here.
 */
export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigate to a URL
   * @param path relative path or full URL
   */
  async navigateTo(path: string = '/') {
    await this.page.goto(path);
  }

  /**
   * Wrapper for filling input fields
   * 
   * Humble Learning:
   * Playwright actually "Auto-waits" for elements to be visible and editable before filling.
   * So strictly speaking, `waitForSelector` isn't always needed! 
   * However, I keep these wrappers so I can easily add `console.log('Filled ${selector}')` 
   * for debugging later without touching every test file.
   */
  async fillInput(selector: string, value: string) {
    await this.page.waitForSelector(selector);
    await this.page.fill(selector, value);
  }

  /**
   * Wrapper for clicking elements
   */
  async clickElement(selector: string) {
    await this.page.waitForSelector(selector);
    await this.page.click(selector);
  }

  /**
   * Get text content of an element
   */
  async getText(selector: string): Promise<string | null> {
    await this.page.waitForSelector(selector);
    return await this.page.textContent(selector);
  }

  /**
   * Check if element is visible
   */
  async isVisible(selector: string): Promise<boolean> {
    return await this.page.isVisible(selector);
  }
}
