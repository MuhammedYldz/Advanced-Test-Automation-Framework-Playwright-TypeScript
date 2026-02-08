import { Performable, Actor } from '../core/types';

export class Select implements Performable {
  private constructor(private value: string, private selector: string) {}

  static value(value: string) {
    return {
      from: (selector: string) => new Select(value, selector)
    };
  }

  async performAs(actor: Actor): Promise<void> {
    const page = actor.ability.page;
    await page.waitForSelector(this.selector);
    console.log(`Actor "${actor.name}" selects "${this.value}" from ${this.selector}`);
    await page.selectOption(this.selector, this.value);
  }
}
