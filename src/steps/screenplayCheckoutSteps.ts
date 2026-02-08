import { Given, When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world';
import { actorFromWorld } from '../screenplay/support/actorFixture';
import { AddProductToCart } from '../screenplay/tasks/AddProductToCart';
import { PlaceOrder, PaymentData } from '../screenplay/tasks/PlaceOrder';
import { See, Truthy } from '../screenplay/questions/See';
import { IsVisible } from '../screenplay/questions/IsVisible';
import { SUCCESS_MESSAGE } from '../screenplay/ui/CheckoutUI';

let actorInstance: ReturnType<typeof actorFromWorld>;

Given('the actor adds a product to the cart', async function (this: CustomWorld) {
  actorInstance = actorFromWorld(this, 'Screenplay Tester');
  await actorInstance.attemptsTo(
    AddProductToCart.firstItem()
  );
});

When('the actor places an order with valid payment details', async function (this: CustomWorld) {
  actorInstance = actorFromWorld(this, 'Screenplay Tester');
  const paymentData: PaymentData = {
    nameOnCard: 'Test User',
    cardNumber: '4111111111111111',
    cvc: '123',
    expiryMonth: '12',
    expiryYear: '2025'
  };
  await actorInstance.attemptsTo(
    PlaceOrder.withPaymentDetails(paymentData)
  );
});

Then('the order should be placed successfully', async function (this: CustomWorld) {
  await actorInstance.should(
    See(IsVisible.of(SUCCESS_MESSAGE), Truthy())
  );
});
