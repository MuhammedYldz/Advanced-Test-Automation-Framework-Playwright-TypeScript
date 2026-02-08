import { Performable, Actor } from '../core/types';
import { Click } from '../interactions/Click';
import { Hover } from '../interactions/Hover';
import * as ProductUI from '../ui/ProductUI';

export class AddProductToCart implements Performable {
  static firstItem() {
    return new AddProductToCart();
  }

  async performAs(actor: Actor): Promise<void> {
    await actor.attemptsTo(
      Hover.over(ProductUI.FIRST_PRODUCT_VIEW),
      Click.on(ProductUI.OVERLAY_ADD_TO_CART_BUTTON),
      Click.on(ProductUI.MODAL_VIEW_CART)
    );
  }
}
