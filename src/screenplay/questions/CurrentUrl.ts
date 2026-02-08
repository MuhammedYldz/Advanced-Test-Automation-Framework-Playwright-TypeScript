import { Question, Actor } from '../core/types';

export class CurrentUrl implements Question<string> {
  static value(): CurrentUrl {
    return new CurrentUrl();
  }

  async answeredBy(actor: Actor): Promise<string> {
    return actor.ability.page.url();
  }
}
