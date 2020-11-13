import { readonlyUser } from '../../helpers/roles';
import { HomePage, SessionTalksPage } from '../../po';

const homePage = new HomePage();
const sutPage = new SessionTalksPage();

fixture('SessionTalks as Readonly user')
  .beforeEach(async t => {
     await t.useRole(readonlyUser);
     await homePage.navigateTo('sessionTalks');
  });

test('we arrive to the right place and we see a table', async t => {
  await t
    .expect(sutPage.header.visible).ok()
    .expect(sutPage.table.visible).ok();
});

test('The table shows at least 1 result and have the right columns', async t => {
  await t
    .expect(sutPage.tableRows.count).gt(0)
    .expect(sutPage.getTableHeaderByName('SessionType').visible).ok()
    .expect(sutPage.getTableHeaderByName('Name').visible).ok()
    .expect(sutPage.getTableHeaderByName('Track').visible).ok()
    .expect(sutPage.getTableHeaderByName('Language').visible).ok()
    .expect(sutPage.getTableHeaderByName('Starts').visible).ok()
    .expect(sutPage.getTableHeaderByName('Ends').visible).ok()
    .expect(sutPage.getTableHeaderByName('Description').visible).ok()
});