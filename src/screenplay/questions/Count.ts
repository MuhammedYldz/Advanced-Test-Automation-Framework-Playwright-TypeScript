import { Actor, Question } from '../core/types';

export class Count {
  static of(selector: string): Question<number> {
    return {
      answeredBy: async (actor: Actor) => {
        const page = actor.ability.page;
        return await page.locator(selector).count();
      }
    };
  }
}
