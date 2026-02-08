import { Performable, Actor } from '../core/types';

export class Click implements Performable {
  private constructor(private target: string) {}

  static on(target: string): Click {
    return new Click(target);
  }

  async performAs(actor: Actor): Promise<void> {
    console.log(`Actor "${actor.name}" clicks on ${this.target}`);
    await actor.ability.page.waitForSelector(this.target);
    await actor.ability.page.click(this.target);
  }
}
