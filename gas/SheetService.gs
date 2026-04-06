function getRecords(sheetName) {
  try {
    var sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(sheetName);
    if (!sheet) return [];
    
    var data = sheet.getDataRange().getValues();
    if (data.length <= 1) return [];
    
    var headers = data[0];
    var result = [];
    
    for (var i = 1; i < data.length; i++) {
      var row = data[i];
      var obj = {};
      obj['Id_Data'] = i; // Use row index as simple ID
      for (var j = 0; j < headers.length; j++) {
        obj[headers[j]] = row[j];
      }
      result.push(obj);
    }
    return result;
  } catch (e) {
    return [];
  }
}

function submitData(sheetName, dataObj) {
  try {
    var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    var sheet = ss.getSheetByName(sheetName);
    
    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
      var headers = Object.keys(dataObj);
      headers.unshift("Timestamp");
      sheet.appendRow(headers);
    }
    
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    var rowData = [];
    
    for (var i = 0; i < headers.length; i++) {
      var header = headers[i];
      if (header === "Timestamp") {
        rowData.push(new Date());
      } else {
        rowData.push(dataObj[header] || "");
      }
    }
    
    if (dataObj.Id_Data) {
      var rowIndex = parseInt(dataObj.Id_Data) + 1;
      sheet.getRange(rowIndex, 1, 1, rowData.length).setValues([rowData]);
    } else {
      sheet.appendRow(rowData);
    }
    
    return { success: true, message: 'Data berhasil disimpan' };
  } catch (e) {
    return { success: false, message: e.toString() };
  }
}

function deleteData(sheetName, idData) {
  try {
    var sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(sheetName);
    if (!sheet) return { success: false, message: 'Sheet tidak ditemukan' };
    
    var rowIndex = parseInt(idData) + 1;
    sheet.deleteRow(rowIndex);
    return { success: true, message: 'Data berhasil dihapus' };
  } catch (e) {
    return { success: false, message: e.toString() };
  }
}

function getAllDashboardData() {
  return {
    sasaran: getRecords(SHEET_NAMES.SASARAN),
    kegiatan: getRecords(SHEET_NAMES.KEGIATAN),
    rpjmn: getRecords(SHEET_NAMES.RPJMN),
    kelasBalita: getRecords(SHEET_NAMES.KELAS_BALITA),
    kelasBalitaKabKota: getRecords(SHEET_NAMES.KELAS_BALITA_KABKOTA),
    kematianNeonatal: getRecords(SHEET_NAMES.KEMATIAN_NEONATAL),
    kematianBalita: getRecords(SHEET_NAMES.KEMATIAN_BALITA),
    users: getRecords(SHEET_NAMES.USERS)
  };
}
