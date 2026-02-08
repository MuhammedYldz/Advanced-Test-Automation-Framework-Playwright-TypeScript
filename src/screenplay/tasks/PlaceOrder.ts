import { Performable, Actor } from '../core/types';
import { Click } from '../interactions/Click';
import { Enter } from '../interactions/Enter';
import * as CartUI from '../ui/CartUI';
import * as CheckoutUI from '../ui/CheckoutUI';

export interface PaymentData {
  nameOnCard: string;
  cardNumber: string;
  cvc: string;
  expiryMonth: string;
  expiryYear: string;
}

export class PlaceOrder implements Performable {
  private constructor(private paymentData: PaymentData) {}

  static withPaymentDetails(paymentData: PaymentData) {
    return new PlaceOrder(paymentData);
  }

  async performAs(actor: Actor): Promise<void> {
    // Cart Page
    await actor.attemptsTo(
      Click.on(CartUI.PROCEED_TO_CHECKOUT_BUTTON)
    );

    // Address/Review Page
    await actor.attemptsTo(
      Enter.value('Order placed via Screenplay').into(CheckoutUI.REVIEW_ORDER_COMMENT),
      Click.on(CheckoutUI.PLACE_ORDER_BUTTON)
    );

    // Payment Page
    await actor.attemptsTo(
      Enter.value(this.paymentData.nameOnCard).into(CheckoutUI.NAME_ON_CARD),
      Enter.value(this.paymentData.cardNumber).into(CheckoutUI.CARD_NUMBER),
      Enter.value(this.paymentData.cvc).into(CheckoutUI.CVC),
      Enter.value(this.paymentData.expiryMonth).into(CheckoutUI.EXPIRY_MONTH),
      Enter.value(this.paymentData.expiryYear).into(CheckoutUI.EXPIRY_YEAR),
      Click.on(CheckoutUI.PAY_BUTTON)
    );
  }
}
