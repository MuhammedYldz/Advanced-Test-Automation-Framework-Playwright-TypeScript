import { Before, After, BeforeAll, AfterAll, Status, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, request, Browser, BrowserContext, Page, APIRequestContext } from '@playwright/test';
import { CustomWorld } from './world';
import { config } from '../../config/env';

// Set default timeout for steps (e.g., 60 seconds)
setDefaultTimeout(60 * 1000);

let browser: Browser;

// Launch the browser once before all tests
BeforeAll(async function () {
  // Best Practice: Use headless mode for CI/CD, headed for debugging.
  // We can control this via environment variables.
  browser = await chromium.launch({
    headless: process.env.HEADLESS !== 'false',
    slowMo: 0,
  });
});

// Close the browser after all tests
AfterAll(async function () {
  await browser.close();
});

// Create a new context and page for each scenario
Before(async function (this: CustomWorld, scenario) {
  this.context = await browser.newContext({
    baseURL: config.baseUrl,
    viewport: { width: 1280, height: 720 },
    recordVideo: {
      dir: 'test-results/videos',
    },
    ignoreHTTPSErrors: true,
  });
  this.page = await this.context.newPage();

  // Setup User for Happy Path if tagged
  // We only create a user if the scenario needs a valid login.
  // To keep it simple, we can do it for all or check tags.
  // Checking tags is better for performance.
  const tags = scenario.pickle.tags.map(tag => tag.name);
  if (tags.includes('@happy_path')) {
    const apiContext = await request.newContext({
      baseURL: config.baseUrl,
    });

    const timestamp = Date.now();
    this.user = {
      name: `Test User ${timestamp}`,
      email: `testuser_${timestamp}@example.com`,
      password: 'password123',
    };

    // Create User via API
    const response = await apiContext.post('/api/createAccount', {
      form: {
        name: this.user.name,
        email: this.user.email,
        password: this.user.password,
        title: 'Mr',
        birth_date: '10',
        birth_month: '10',
        birth_year: '1990',
        firstname: 'Test',
        lastname: 'User',
        company: 'Test Company',
        address1: '123 Test St',
        address2: 'Apt 4',
        country: 'United States',
        zipcode: '90210',
        state: 'California',
        city: 'Los Angeles',
        mobile_number: '1234567890'
      }
    });
    
    // Check if creation was successful
    const responseBody = await response.text();
    if (response.status() !== 200 && response.status() !== 201) {
        console.error(`Failed to create user: ${responseBody}`);
    }
  }
});

// Cleanup after each scenario
After(async function (this: CustomWorld, scenario) {
  if (scenario.result?.status === Status.FAILED) {
    // Best Practice: Debugging Artifacts
    // If a test fails, I want to know WHY immediately.
    // Attaching a screenshot to the report helps me see exactly what the user saw.
    const screenshotPath = `./test-results/screenshots/${scenario.pickle.name.replace(/\s/g, '_')}.png`;
    await this.page?.screenshot({ path: screenshotPath, fullPage: true });
    this.attach(await this.page!.screenshot(), 'image/png');
  }

  // Teardown: Data Cleanup
  // Good automation citizens clean up after themselves.
  // I use the API to delete the user so I don't clutter the database.
  if (this.user) {
    const apiContext = await request.newContext({
        baseURL: config.baseUrl,
    });
    await apiContext.delete('/api/deleteAccount', {
        form: {
            email: this.user.email,
            password: this.user.password
        }
    });
  }

  await this.page?.close();
  await this.context?.close();
});
