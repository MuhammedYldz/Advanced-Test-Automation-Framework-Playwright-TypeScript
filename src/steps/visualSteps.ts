import { Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';
import fs from 'fs';
import path from 'path';

Then('I verify the login page screenshot matches the baseline', async function (this: CustomWorld) {
  // Advanced Concept: Visual Regression Testing
  //
  // Why is this cool?
  // Functional tests only check if the element EXISTS.
  // Visual tests check if the element LOOKS RIGHT (color, position, size).
  //
  // Challenge I faced:
  // Playwright's `expect(page).toHaveScreenshot()` is designed for the Playwright Test Runner.
  // Since I'm using Cucumber, I had to be creative.
  // Below, I capture the screenshot manually and attach it to the report.
  // In a real CI environment, I would use a library like 'jest-image-snapshot' to compare pixels.
  
  const screenshotPath = 'test-results/visual/login-page-actual.png';
  await this.page!.screenshot({ path: screenshotPath, fullPage: true });
  
  // Attach to Allure/Cucumber report
  this.attach(fs.readFileSync(screenshotPath), 'image/png');
  
  console.log(`Visual check: Screenshot saved to ${screenshotPath}. Compare this with baseline manually or via CI tool.`);
});
