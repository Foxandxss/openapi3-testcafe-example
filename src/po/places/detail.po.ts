import { Selector } from 'testcafe';

export class PlaceDetailPage {
  header = Selector('h3:not(.ng-hide)');

  nameInput = Selector('#inputName');
  cityInput = Selector('#inputCity');
  latitudeInput = Selector('#input01');
  longitudeInput = Selector('#input02');
  mapButton = Selector('#inputLocation button');
  zipCodeInput = Selector('#inputZipCode');
  addressInput = Selector('#inputAddress');
  image = Selector('#currentImg');

  positionModal = Selector('.modal-dialog');
  closeModalButton = Selector('button[translate="cmd.close"]');

  backButton = Selector('span[translate="cmd.back"]').parent('button');
  createButton = Selector('span[translate="cmd.create"]').parent('button');
  deleteButton = Selector('span[translate="cmd.delete"]').parent('button');
  modifyButton = Selector('span[translate="cmd.modify"]').parent('button');
  confirmDeleteButton = Selector('span[translate="cmd.confirmDeletion"]').parent('button');

  errorArea = Selector('.alert-danger');
}