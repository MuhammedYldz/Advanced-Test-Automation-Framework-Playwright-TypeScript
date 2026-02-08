import { Given, When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world';
import { actorFromWorld } from '../screenplay/support/actorFixture';
import { TakeScreenshot } from '../screenplay/interactions/TakeScreenshot';
import { MockResponse } from '../screenplay/interactions/MockResponse';

let actorInstance: ReturnType<typeof actorFromWorld>;

Then('the actor takes a screenshot named {string}', async function (this: CustomWorld, name: string) {
  actorInstance = actorFromWorld(this, 'Screenplay Tester');
  await actorInstance.attemptsTo(
    TakeScreenshot.named(name)
  );
  
  // Attach for reporting
  // Ideally this should be inside the Interaction if we pass the world/reporter to it,
  // but Screenplay usually decouples from test runner specifics. 
  // For now, we do it here or assume the file is enough.
  try {
      const fs = require('fs');
      const screenshotPath = `test-results/visual/${name}.png`;
      if (fs.existsSync(screenshotPath)) {
          this.attach(fs.readFileSync(screenshotPath), 'image/png');
      }
  } catch (e) {
      console.error('Failed to attach screenshot', e);
  }
});

Given('the actor intercepts {string} with status {int} and body {string}', async function (this: CustomWorld, url: string, status: number, bodyStr: string) {
  actorInstance = actorFromWorld(this, 'Screenplay Tester');
  const body = JSON.parse(bodyStr);
  
  await actorInstance.attemptsTo(
    MockResponse.for(url).returning(status, body)
  );
});
