import { Performable, Actor } from '../core/types';

export class Enter implements Performable {
  private readonly value: string;
  private targetSelector?: string;

  private constructor(value: string) {
    this.value = value;
  }

  static value(val: string): Enter {
    return new Enter(val);
  }

  into(target: string): Enter {
    this.targetSelector = target;
    return this;
  }

  async performAs(actor: Actor): Promise<void> {
    if (!this.targetSelector) {
      throw new Error('Enter.performAs called without target. Use Enter.value(...).into(target)');
    }
    console.log(`Actor "${actor.name}" enters "${this.value}" into ${this.targetSelector}`);
    await actor.ability.page.waitForSelector(this.targetSelector);
    await actor.ability.page.fill(this.targetSelector, this.value);
  }
}
