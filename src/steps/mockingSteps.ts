import { Given } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world';

Given('I intercept the login request and simulate a 500 error', async function (this: CustomWorld) {
  // Advanced Concept: Network Mocking
  // 
  // Why mock? 
  // Waiting for the real backend to crash is hard. 
  // By "intercepting" the request, I can force the browser to BELIEVE the server failed.
  // This allows me to test my frontend's error handling (e.g., "Something went wrong" popup) 
  // whenever I want, instantly.
  await this.page!.route('**/verifyLogin', async (route) => {
    await route.fulfill({
      status: 500,
      contentType: 'application/json',
      body: JSON.stringify({ message: 'Internal Server Error' }),
    });
  });
  
  // Navigate to login page AFTER setting up interception
  // Reuse existing navigation logic if available or navigate manually
  await this.page!.goto('/login');
});
