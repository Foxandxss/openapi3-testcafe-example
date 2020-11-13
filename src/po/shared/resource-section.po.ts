import { Selector } from 'testcafe';

export class ResourceSection {
  header = Selector('h3');
  addButton = Selector('#caption a.iconBig[alt="Add"]');
  refreshButton = Selector('#caption a.iconBig[alt="Refresh"]')

  actionsButton = Selector('span[translate="cmd.bulkActions"]').parent('button');
  actionsList = this.actionsButton.nextSibling().find('li');
  searchInput = Selector('#searchTextbox');
  clearButton = Selector('.searchZone button');

  table = Selector('#itemList')
  tableHeaders = this.table.find('thead th');
  tableRows = this.table.find('tbody tr');

  getFirstRow() {
    return this.tableRows.nth(0);
  }

  async getLastRow() {
    const count = await this.tableRows.count;
    return this.tableRows.nth(count - 1);
  }

  getRowName(index: number) {
    return this.tableRows.nth(index).find('td a').nth(0);
  }

  getTableHeaderByName(name: string) {
    return this.tableHeaders.withText(name);
  }

  getRowDeleteButton(row: Selector) {
    return row.find('span.glyphicon-remove');
  }
}