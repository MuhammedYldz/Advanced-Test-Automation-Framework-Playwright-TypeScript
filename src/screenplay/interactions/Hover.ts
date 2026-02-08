import { Performable, Actor } from '../core/types';

export class Hover implements Performable {
  private constructor(private selector: string) {}

  static over(selector: string) {
    return new Hover(selector);
  }

  async performAs(actor: Actor): Promise<void> {
    const page = actor.ability.page;
    await page.waitForSelector(this.selector);
    console.log(`Actor "${actor.name}" hovers over ${this.selector}`);
    await page.hover(this.selector);
  }
}
