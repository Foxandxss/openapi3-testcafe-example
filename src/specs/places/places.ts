import { RequestLogger } from 'testcafe';
import { createPlace, deletePlace } from '../../helpers/backend-management';
import { Place } from '../../helpers/models';
import requestLoggerUtilities from '../../helpers/requestLoggerUtilities';
import { placesAdmin, readonlyUser } from '../../helpers/roles';
import { HomePage, PlaceDetailPage, PlacesPage } from '../../po';
require('dotenv').config();

const homePage = new HomePage();
const sutPage = new PlacesPage();
const detailPage = new PlaceDetailPage();

fixture('Places as Readonly user')
  .beforeEach(async t => {
     await t.useRole(readonlyUser);
     await homePage.navigateTo('places');
  });

test('we arrive to the right place and we see a table', async t => {
  await t
    .expect(sutPage.header.visible).ok()
    .expect(sutPage.table.visible).ok();
});

test('The table shows at least 1 result and have the right columns', async t => {
  await t
    .expect(sutPage.tableRows.count).gt(0)
    .expect(sutPage.getTableHeaderByName('Name').visible).ok()
    .expect(sutPage.getTableHeaderByName('Location').visible).ok()
    .expect(sutPage.getTableHeaderByName('Address').visible).ok()
    .expect(sutPage.getTableHeaderByName('City').visible).ok()
    .expect(sutPage.getTableHeaderByName('ZipCode').visible).ok()
    .expect(sutPage.getTableHeaderByName('Image').visible).ok()
});

test('the table can be sort by name', async t => {
  // Default, not ordered
  await t
    .expect(sutPage.getFirstRow().textContent).contains('Giralda')
    .expect((await sutPage.getLastRow()).textContent).contains('Torre Eiffel');

  // Order by name
  await t
    .click(sutPage.getTableHeaderByName('Name'))
    .expect(sutPage.getFirstRow().textContent).contains('Estatua')
    .expect((await sutPage.getLastRow()).textContent).contains('Torre Eiffel');

  // Order by name (DESC)
  await t
    .click(sutPage.getTableHeaderByName('Name'))
    .expect(sutPage.getFirstRow().textContent).contains('Torre Eiffel')
    .expect((await sutPage.getLastRow()).textContent).contains('Estatua');
});

test('filter works as expected', async t => {
  await t
    .expect(sutPage.tableRows.count).eql(4)
    .typeText(sutPage.searchInput, 'Estatua')
    .expect(sutPage.tableRows.count).eql(1)
    .expect(sutPage.getFirstRow().textContent).contains('Estatua');

  await t
    .click(sutPage.clearButton)
    .expect(sutPage.tableRows.count).eql(4)
});

const logger = RequestLogger({ url: `${process.env.SITE_URL}/api/places`, method: 'post' }, {
  logRequestBody: true,
  logResponseBody: true,
  stringifyResponseBody: false,
  logResponseHeaders: true
})

let sutPlace: Place = null;

fixture('Places as placesadmin user')
  .beforeEach(async t => {
    sutPlace = {
      name: 'Edificio Telefonica',
      city: 'Madrid',
      address: 'C/ Gran Vía, 28',
      location: {
        type: 'Point',
        coordinates: [40.403611, -3.701944]
      },
      zipCode: '28013'
    }
    await t.useRole(placesAdmin);
    await homePage.navigateTo('places');
  })
  .afterEach(async () => {
    if (sutPlace._id) {
      await deletePlace(sutPlace._id);
    }
  });

test.requestHooks(logger)('Can create new places', async t => {
  await t
    .click(sutPage.addButton)
    .typeText(detailPage.nameInput, sutPlace.name)
    .typeText(detailPage.cityInput, sutPlace.city)
    .typeText(detailPage.latitudeInput, sutPlace.location.coordinates[0].toString())
    .typeText(detailPage.longitudeInput, sutPlace.location.coordinates[1].toString())
    .typeText(detailPage.zipCodeInput, sutPlace.zipCode)
    .typeText(detailPage.addressInput, sutPlace.address)
    .click(detailPage.createButton)
    .expect(sutPage.tableRows.count).eql(5)
    .expect((await sutPage.getLastRow()).textContent).contains('Edificio Telefonica')

    await requestLoggerUtilities.unzipLoggerResponses(t, {requestLogger: logger, toJson: true});

    sutPlace = logger.requests[0].response.body;
});

test('Can delete an existing place', async t => {
  sutPlace = await createPlace(sutPlace) as Place;
  await t
    .click(sutPage.refreshButton)
    .expect(sutPage.tableRows.count).eql(5)
    // .expect((await sutPage.getLastRow()).textContent).contains('Tour Eiffel')
    .click(sutPage.getRowDeleteButton(sutPage.tableRows.nth(4))).wait(1000)
    .click(detailPage.deleteButton)
    .expect(sutPage.tableRows.count).eql(4);
});