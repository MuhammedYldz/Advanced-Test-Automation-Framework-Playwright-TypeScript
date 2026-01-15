import { setWorldConstructor, World, IWorldOptions } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page, PlaywrightTestOptions, APIRequestContext } from '@playwright/test';

export interface CustomWorld extends World {
  browser?: Browser;
  context?: BrowserContext;
  page?: Page;
  debug: boolean;
  user?: {
    email: string;
    password: string;
    name: string;
  };
}

export class CustomWorld extends World {
  constructor(options: IWorldOptions) {
    super(options);
    this.debug = false;
  }
}

setWorldConstructor(CustomWorld);
