import { Selector } from 'testcafe';

export class HeaderSection {
  languageSelect = Selector('.language-selector select');
  languageOptions = this.languageSelect.find('option');
  name = Selector('.user-profile-tools .user-profile-name');
  role = Selector('.user-profile-tools .user-profile-role');
  loginButton = Selector('.user-profile-tools a[translate="cmd.login"]');
  logoutButton = Selector('.user-profile-tools a[translate="cmd.logout"]');
}