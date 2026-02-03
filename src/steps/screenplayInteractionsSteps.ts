import { When } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world';
import { actorFromWorld } from '../screenplay/support/actorFixture';
import { Navigate } from '../screenplay/interactions/Navigate';
import { Enter } from '../screenplay/interactions/Enter';
import { Click } from '../screenplay/interactions/Click';

let actorInstance = undefined as ReturnType<typeof actorFromWorld> | undefined;

// Reuse Given from smoke to create actor; step definition provided there
// Here we focus on the interaction sequence only
When('the actor attempts a basic login sequence', async function (this: CustomWorld) {
  actorInstance = actorInstance || actorFromWorld(this, 'Screenplay Tester');
  const emailSelector = '[data-qa="login-email"]';
  const passwordSelector = '[data-qa="login-password"]';
  const loginButton = '[data-qa="login-button"]';

  await actorInstance.attemptsTo(
    Navigate.to('/login'),
    Enter.value(this.user?.email || 'testuser@example.com').into(emailSelector),
    Enter.value(this.user?.password || 'password123').into(passwordSelector),
    Click.on(loginButton),
  );
});
