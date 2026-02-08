import { Question, Actor } from '../core/types';

export class IsVisible implements Question<boolean> {
  private constructor(private selector: string) {}

  static of(selector: string): IsVisible {
    return new IsVisible(selector);
  }

  async answeredBy(actor: Actor): Promise<boolean> {
    return actor.ability.page.isVisible(this.selector);
  }
}
