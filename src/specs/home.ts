import { placesAdmin, readonlyUser } from '../helpers/roles';
import { HomePage } from '../po/home.po';
import { HeaderSection } from '../po/shared/header.po';

const header = new HeaderSection();
const sutPage = new HomePage();

fixture('Home as Readonly user')
  .beforeEach(async t => await t.useRole(readonlyUser));

test('Header with welcome message appears', async t => {
  await t
    .expect(sutPage.header.exists).ok()
    .expect(sutPage.welcomeMessage.exists).ok()
    .expect(sutPage.welcomeMessage.textContent).contains('Use this Web Portal');
});

test('There is a link for each specific resource', async t => {
  await t
    .expect(sutPage.resources.places.visible).ok()
    .expect(sutPage.resources.sessionTalks.visible).ok()
    .expect(sutPage.resources.speakers.visible).ok()
    .expect(sutPage.resources.sponsors.visible).ok();
});

test('The header shows the correct values for the current role', async t => {
  await t
    // .expect(header.languageSelect.textContent).contains('???')
    .expect(header.name.textContent).eql('demo')
    .expect(header.role.textContent).eql('readonly')
    .expect(header.logoutButton.visible).ok()
    .expect(header.loginButton.visible).notOk()
});

test('The different resources shows up', async t => {
  await t
    .expect(sutPage.resources.places.exists).ok()
    .expect(sutPage.resources.sessionTalks.exists).ok()
    .expect(sutPage.resources.speakers.exists).ok()
    .expect(sutPage.resources.sponsors.exists).ok();
});

fixture('Spanish HomePage as Readonly user')
  .beforeEach(async t => {
    await t
      .useRole(readonlyUser)
      .click(header.languageSelect)
      .click(header.languageOptions.withText('Español'))
  });

test('Page shows up in Spanish', async t => {
  await t.expect(sutPage.welcomeMessage.textContent).contains('Use este portal web');
});

fixture('Home as placesadmin user')
  .beforeEach(async t => await t.useRole(placesAdmin));

test('Only places shows up', async t => {
  await t
    .expect(sutPage.resources.places.visible).ok()
    .expect(sutPage.resources.sessionTalks.visible).notOk()
    .expect(sutPage.resources.speakers.visible).notOk()
    .expect(sutPage.resources.sponsors.visible).notOk();
});

test('Header shows the correct role', async t => {
  await t
    .expect(header.name.textContent).eql('placesadmin')
    .expect(header.role.textContent).eql('placesonly');
});