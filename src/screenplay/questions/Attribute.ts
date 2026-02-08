import { Actor, Question } from '../core/types';

export class Attribute {
  static of(selector: string, attributeName: string): Question<string | null> {
    return {
      answeredBy: async (actor: Actor) => {
        const page = actor.ability.page;
        return await page.getAttribute(selector, attributeName);
      }
    };
  }
}
