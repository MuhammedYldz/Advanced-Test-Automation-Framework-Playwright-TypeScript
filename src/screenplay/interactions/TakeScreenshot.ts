import { Performable, Actor } from '../core/types';

export class TakeScreenshot implements Performable {
  private constructor(private name: string) {}

  static named(name: string) {
    return new TakeScreenshot(name);
  }

  async performAs(actor: Actor): Promise<void> {
    const page = actor.ability.page;
    const screenshotPath = `test-results/visual/${this.name}.png`;
    
    // Create directory if it doesn't exist (basic node fs check usually needed, but playwright screenshot handles dirs?)
    // Actually Playwright ensures directories exist.
    
    console.log(`Actor "${actor.name}" taking screenshot: ${screenshotPath}`);
    await page.screenshot({ path: screenshotPath, fullPage: true });
    
    // In a real framework, we might attach this to the reporter here.
    // For now, we just save it.
  }
}
