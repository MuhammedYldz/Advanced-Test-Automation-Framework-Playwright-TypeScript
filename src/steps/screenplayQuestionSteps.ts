import { Then } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world';
import { actorFromWorld } from '../screenplay/support/actorFixture';
import { IsVisible } from '../screenplay/questions/IsVisible';
import { See, Truthy } from '../screenplay/questions/See';
import { LOGGED_IN_USER } from '../screenplay/ui/LoginUI';

let actorInstance = undefined as ReturnType<typeof actorFromWorld> | undefined;

Then('the actor should verify logged-in indicator using Questions', async function (this: CustomWorld) {
  actorInstance = actorInstance || actorFromWorld(this, 'Screenplay Tester');
  await actorInstance.should(See(IsVisible.of(LOGGED_IN_USER), Truthy()));
});
