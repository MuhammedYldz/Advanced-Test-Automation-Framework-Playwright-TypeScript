import { Performable, Actor } from '../core/types';

export class MockResponse implements Performable {
  private constructor(
    private urlPattern: string,
    private status: number,
    private body: any
  ) {}

  static for(urlPattern: string) {
    return {
      returning: (status: number, body: any) => new MockResponse(urlPattern, status, body)
    };
  }

  async performAs(actor: Actor): Promise<void> {
    const page = actor.ability.page;
    console.log(`Actor "${actor.name}" mocking ${this.urlPattern} with status ${this.status}`);
    
    await page.route(this.urlPattern, async (route) => {
      await route.fulfill({
        status: this.status,
        contentType: 'application/json',
        body: JSON.stringify(this.body),
      });
    });
  }
}
