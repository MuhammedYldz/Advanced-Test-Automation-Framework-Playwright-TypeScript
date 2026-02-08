import { When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world';
import { actorFromWorld } from '../screenplay/support/actorFixture';
import { Register, UserRegistrationData } from '../screenplay/tasks/Register';
import { See, Truthy } from '../screenplay/questions/See';
import { IsVisible } from '../screenplay/questions/IsVisible';
import { ACCOUNT_CREATED_HEADER } from '../screenplay/ui/SignUpUI';

When('the actor registers with valid details', async function (this: CustomWorld) {
  const actor = actorFromWorld(this, 'Screenplay Tester');
  const timestamp = Date.now();
  const data: UserRegistrationData = {
    name: `User ${timestamp}`,
    email: `user${timestamp}@example.com`,
    password: 'Password123!',
    firstName: 'Test',
    lastName: 'User',
    address: '123 Test St',
    country: 'United States',
    state: 'NY',
    city: 'New York',
    zipcode: '10001',
    mobile: '1234567890'
  };
  
  // Store user for cleanup if needed (though hooks might handle it if we set this.user)
  this.user = {
      name: data.name,
      email: data.email,
      password: data.password
  };

  await actor.attemptsTo(Register.withData(data));
});

Then('the actor should see the account created message', async function (this: CustomWorld) {
  const actor = actorFromWorld(this, 'Screenplay Tester');
  await actor.should(
    See(IsVisible.of(ACCOUNT_CREATED_HEADER), Truthy())
  );
});
