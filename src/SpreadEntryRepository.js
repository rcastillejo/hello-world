import EntryRepository from './EntryRepository';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import credentials from './credentials.json';

class SpreadEntryRepository extends EntryRepository {
  constructor(spreadsheetId) {
    this.spreadsheetId = spreadsheetId;
  }
  
  async readSpreadsheet() {
    const doc = new GoogleSpreadsheet(this.spreadsheetId);

    try {
      await doc.useServiceAccountAuth(credentials);
      await doc.loadInfo();

      const sheet = doc.sheetsByIndex[0];
      const rows = await sheet.getRows();

      rows.forEach((row) => {
        console.log('Row:', row._rawData);
        // Access individual cell values using row.<column-name>
        // Example: console.log('Date:', row.Date, 'Description:', row.Description, 'Amount:', row.Amount);
      });
    } catch (error) {
      console.error('Error:', error);
    }
  }
}

export default SpreadEntryRepository;
