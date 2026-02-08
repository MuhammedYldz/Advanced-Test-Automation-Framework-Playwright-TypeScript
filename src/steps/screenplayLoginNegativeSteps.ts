import { Given, When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world';
import { actorFromWorld } from '../screenplay/support/actorFixture';
import { Login } from '../screenplay/tasks/Login';
import { Click } from '../screenplay/interactions/Click';
import { Navigate } from '../screenplay/interactions/Navigate';
import { LOGIN_BUTTON, LOGIN_HEADER, ERROR_MESSAGE } from '../screenplay/ui/LoginUI';
import { Text } from '../screenplay/questions/Text';
import { IsVisible } from '../screenplay/questions/IsVisible';
import { See, Equals, Truthy } from '../screenplay/questions/See';

let actorInstance: ReturnType<typeof actorFromWorld>;

Given('the actor navigates to the login page', async function (this: CustomWorld) {
  actorInstance = actorFromWorld(this, 'Screenplay Tester');
  await actorInstance.attemptsTo(
    Navigate.to('/login')
  );
});

When('the actor logs in with email {string} and password {string}', async function (this: CustomWorld, email: string, pass: string) {
  actorInstance = actorFromWorld(this, 'Screenplay Tester');
  await actorInstance.attemptsTo(
    Login.withCredentials(email, pass)
  );
});

Then('the actor should see the error message {string}', async function (this: CustomWorld, expectedError: string) {
  await actorInstance.should(
    See(Text.of(ERROR_MESSAGE), (actual) => {
        if (!actual) throw new Error(`Expected error message "${expectedError}", but found nothing (null)`);
        if (!actual.includes(expectedError)) throw new Error(`Expected error to contain "${expectedError}", but found "${actual}"`);
    })
  );
});

When('the actor clicks the login button', async function (this: CustomWorld) {
  actorInstance = actorFromWorld(this, 'Screenplay Tester');
  await actorInstance.attemptsTo(
    Click.on(LOGIN_BUTTON)
  );
});

Then('the actor should still see the login header', async function (this: CustomWorld) {
  await actorInstance.should(
    See(IsVisible.of(LOGIN_HEADER), Truthy())
  );
});
