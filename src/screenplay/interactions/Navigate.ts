import { Performable, Actor } from '../core/types';

export class Navigate implements Performable {
  private constructor(private path: string) {}

  static to(path: string): Navigate {
    return new Navigate(path);
  }

  async performAs(actor: Actor): Promise<void> {
    console.log(`Actor "${actor.name}" navigates to ${this.path}`);
    await actor.ability.page.goto(this.path);
  }
}
