/**
 * Database Interaction (Google Sheets)
 */

const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID_HERE'; // GANTI DENGAN ID SPREADSHEET ANDA

function getRecordsFromServer(sheetName) {
  try {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = ss.getSheetByName(sheetName);
    if (!sheet) return [];
    
    const data = sheet.getDataRange().getValues();
    if (data.length < 2) return [];
    
    const headers = data.shift();
    
    return data.map(row => {
      const obj = {};
      headers.forEach((header, i) => { 
        if (header) obj[header] = row[i]; 
      });
      return obj;
    });
  } catch (e) { 
    Logger.log('Error getRecords: ' + e.toString());
    return []; 
  }
}

function submitDataToServer(sheetName, data) {
  try {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = ss.getSheetByName(sheetName);
    
    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
      sheet.appendRow(Object.keys(data));
    }
    
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    const row = headers.map(h => data[h] === undefined ? '' : data[h]);
    
    sheet.appendRow(row);
    return { success: true };
  } catch (e) {
    return { success: false, error: e.toString() };
  }
}
