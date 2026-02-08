import { Question, Actor } from '../core/types';

export class Text implements Question<string | null> {
  private constructor(private selector: string) {}

  static of(selector: string): Text {
    return new Text(selector);
  }

  async answeredBy(actor: Actor): Promise<string | null> {
    await actor.ability.page.waitForSelector(this.selector);
    return actor.ability.page.textContent(this.selector);
  }
}
