import { Page } from '@playwright/test';

export interface Ability {
  page: Page;
}

export interface Performable {
  performAs(actor: Actor): Promise<void>;
}

export interface Question<T> {
  answeredBy(actor: Actor): Promise<T>;
}

export class Actor {
  readonly name: string;
  readonly ability: Ability;

  constructor(name: string, ability: Ability) {
    this.name = name;
    this.ability = ability;
  }

  async attemptsTo(...performables: Performable[]): Promise<void> {
    for (const p of performables) {
      await p.performAs(this);
    }
  }

  async should<T>(...questions: Array<{ question: Question<T>; expect: (value: T) => void }>): Promise<void> {
    for (const q of questions) {
      const value = await q.question.answeredBy(this);
      q.expect(value);
    }
  }
}
