import { Selector, t } from 'testcafe';

export class HomePage {
  header = Selector('h1');
  welcomeMessage = Selector('p[translate="main.welcome"]');

  resources = {
    places: Selector('#content ul li a').nth(0),
    sessionTalks: Selector('#content ul li a').nth(1),
    speakers: Selector('#content ul li a').nth(2),
    sponsors: Selector('#content ul li a').nth(3)
  }

  async navigateTo(resource: string) {
    await t.click(this.resources[resource]);
  }
}