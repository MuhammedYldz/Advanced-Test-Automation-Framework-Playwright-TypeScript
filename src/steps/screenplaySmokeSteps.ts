import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';
import { actorFromWorld } from '../screenplay/support/actorFixture';
import { config } from '../../config/env';

let actorInstance: ReturnType<typeof actorFromWorld>;

Given('a Screenplay actor', function (this: CustomWorld) {
  actorInstance = actorFromWorld(this, 'Screenplay Tester');
});

When('the actor navigates to {string}', async function (this: CustomWorld, path: string) {
  await actorInstance.ability.page.goto(path);
});

Then('the current URL should start with the base URL', async function (this: CustomWorld) {
  const url = this.page!.url();
  expect(url.startsWith(config.baseUrl)).toBeTruthy();
});
