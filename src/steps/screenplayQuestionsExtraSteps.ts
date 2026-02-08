import { When, Then, Given } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world';
import { actorFromWorld } from '../screenplay/support/actorFixture';
import { Enter } from '../screenplay/interactions/Enter';
import { Click } from '../screenplay/interactions/Click';
import { Navigate } from '../screenplay/interactions/Navigate';
import { EMAIL_INPUT } from '../screenplay/ui/LoginUI';
import { Attribute } from '../screenplay/questions/Attribute';
import { Count } from '../screenplay/questions/Count';
import { See, Equals } from '../screenplay/questions/See';

let actorInstance: ReturnType<typeof actorFromWorld>;

When('the actor enters {string} into the email field', async function (this: CustomWorld, value: string) {
  actorInstance = actorFromWorld(this, 'Screenplay Tester');
  await actorInstance.attemptsTo(
    Enter.value(value).into(EMAIL_INPUT)
  );
});

Then('the email field type should be {string}', async function (this: CustomWorld, expectedType: string) {
  actorInstance = actorFromWorld(this, 'Screenplay Tester'); // Ensure actor is ready
  await actorInstance.should(
    See(Attribute.of(EMAIL_INPUT, 'data-qa'), Equals<string | null>('login-email'))
  );
  await actorInstance.should(
      See(Attribute.of(EMAIL_INPUT, 'type'), Equals<string | null>(expectedType))
  );
});

Then('the email field should have placeholder {string}', async function (this: CustomWorld, expectedPlaceholder: string) {
  actorInstance = actorFromWorld(this, 'Screenplay Tester');
  await actorInstance.should(
    See(Attribute.of(EMAIL_INPUT, 'placeholder'), Equals<string | null>(expectedPlaceholder))
  );
});

When('the actor searches for {string}', async function (this: CustomWorld, term: string) {
  actorInstance = actorFromWorld(this, 'Screenplay Tester'); // Initialize here!
  const SEARCH_INPUT = '#search_product'; 
  const SEARCH_BUTTON = '#submit_search';
  
  await actorInstance.attemptsTo(
    Enter.value(term).into(SEARCH_INPUT),
    Click.on(SEARCH_BUTTON)
  );
});

Then('the actor should see at least {int} product result', async function (this: CustomWorld, minCount: number) {
  actorInstance = actorFromWorld(this, 'Screenplay Tester');
  const PRODUCT_CARD = '.single-products'; 
  await actorInstance.should(
    See(Count.of(PRODUCT_CARD), (count) => {
        if (count < minCount) throw new Error(`Expected at least ${minCount} products, found ${count}`);
    })
  );
});
