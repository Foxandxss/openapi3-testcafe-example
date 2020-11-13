import { readonlyUser } from '../../helpers/roles';
import { HomePage, PlaceDetailPage, PlacesPage } from '../../po';

const homePage = new HomePage();
const placesPage = new PlacesPage();
const sutPage = new PlaceDetailPage();

fixture('Place view page as Readonly user')
  .beforeEach(async t => {
    await t.useRole(readonlyUser);
    await homePage.navigateTo('places');
    await t.click(placesPage.getRowName(0))
  });

test('place details shows up with the right data and disabled inputs', async t => {
  await t
    .expect(sutPage.header.textContent).contains('Place')
    .expect(sutPage.nameInput.value).eql('Giralda')
    .expect(sutPage.nameInput.getAttribute('readonly')).ok()
    .expect(sutPage.cityInput.value).eql('Sevilla')
    .expect(sutPage.cityInput.getAttribute('readonly')).ok()
    .expect(sutPage.latitudeInput.value).contains('37.3861')
    .expect(sutPage.latitudeInput.getAttribute('disabled')).ok()
    .expect(sutPage.longitudeInput.value).contains('-5.9926')
    .expect(sutPage.longitudeInput.getAttribute('disabled')).ok()
    .expect(sutPage.zipCodeInput.value).eql('41001')
    .expect(sutPage.zipCodeInput.getAttribute('readonly')).ok()
    .expect(sutPage.addressInput.value).eql('C/ de los Palacetines s/n.')
    .expect(sutPage.addressInput.getAttribute('readonly')).ok()
    .expect(sutPage.image.getAttribute('src')).ok();
});

test('To see the location, there is a modal screen', async t => {
  await t
    .expect(sutPage.positionModal.visible).notOk()
    .click(sutPage.mapButton)
    .expect(sutPage.positionModal.visible).ok()
    .click(sutPage.closeModalButton)
    .expect(sutPage.positionModal.visible).notOk();
});

test('can delete', async t => {
  await t
    .click(sutPage.confirmDeleteButton)
    .expect(sutPage.header.textContent).contains('Delete Place')
    .click(sutPage.deleteButton)
    .expect(sutPage.errorArea.visible).ok();
});