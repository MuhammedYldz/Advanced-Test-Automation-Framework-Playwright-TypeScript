import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';
import { actorFromWorld } from '../screenplay/support/actorFixture';
import { Login } from '../screenplay/tasks/Login';
import { LOGGED_IN_USER } from '../screenplay/ui/LoginUI';
import { config } from '../../config/env';

let actorInstance = undefined as ReturnType<typeof actorFromWorld> | undefined;

When('the actor logs in with valid credentials via Task', async function (this: CustomWorld) {
  actorInstance = actorInstance || actorFromWorld(this, 'Screenplay Tester');
  const email = this.user?.email || config.username;
  const password = this.user?.password || config.password;
  await actorInstance.attemptsTo(Login.withCredentials(email, password));
});

Then('the user should be logged in according to UI', async function (this: CustomWorld) {
  const isLoggedInVisible = await this.page!.isVisible(LOGGED_IN_USER);
  expect(isLoggedInVisible).toBeTruthy();
});
