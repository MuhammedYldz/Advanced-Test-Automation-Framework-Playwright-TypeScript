import { Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';
import { LOGIN_HEADER } from '../screenplay/ui/LoginUI';

Then('the login header should be visible', async function (this: CustomWorld) {
  const isVisible = await this.page!.isVisible(LOGIN_HEADER);
  expect(isVisible).toBeTruthy();
});
