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

function checkAndRepairHeaders(sheet, expectedHeaders) {
  if (!expectedHeaders || expectedHeaders.length === 0) return;
  
  var actualHeaders = sheet.getRange(1, 1, 1, Math.max(1, sheet.getLastColumn())).getValues()[0];
  var missingHeaders = expectedHeaders.filter(h => actualHeaders.indexOf(h) === -1);
  
  if (missingHeaders.length > 0) {
    var lastCol = sheet.getLastColumn();
    sheet.getRange(1, lastCol + 1, 1, missingHeaders.length).setValues([missingHeaders]);
  }
}

function submitData(sheetName, dataObj, user) {
  try {
    if (!user) throw new Error('Otoritasi diperlukan');
    
    var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    var sheet = ss.getSheetByName(sheetName);
    
    // Security check: Non-admins can only submit data for their own Puskesmas
    if (user.role !== 'admin') {
      if (dataObj.Id_Puskesmas && dataObj.Id_Puskesmas !== user.puskesmasId) {
        throw new Error('Anda tidak memiliki izin untuk menyimpan data Puskesmas lain.');
      }
      // Re-force identity
      dataObj.Id_Puskesmas = user.puskesmasId;
      dataObj.Nama_Puskesmas = user.puskesmasName;
    }
    
    // Get expected headers for this sheet
    var expectedHeaders = FORM_HEADERS[sheetName];
    
    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
      if (expectedHeaders) {
        sheet.appendRow(expectedHeaders);
      } else {
        // Fallback for custom sheets
        var headers = Object.keys(dataObj);
        headers.unshift("Timestamp");
        sheet.appendRow(headers);
      }
    } else if (expectedHeaders) {
      // Ensure existing sheet has all required headers
      checkAndRepairHeaders(sheet, expectedHeaders);
    }
    
    // Always use the sheet's actual headers
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    var rowData = [];
    
    for (var i = 0; i < headers.length; i++) {
      var header = headers[i];
      if (header === "Timestamp") {
        rowData.push(dataObj.Timestamp ? new Date(dataObj.Timestamp) : new Date());
      } else {
        // Try strict match first
        var val = dataObj[header];
        
        // Extended fuzzy matching if not found
        if (val === undefined) {
           var underscored = header.replace(/ /g, '_');
           val = dataObj[underscored];
        }
        if (val === undefined) {
           var spaced = header.replace(/_/g, ' ');
           val = dataObj[spaced];
        }
        
        rowData.push(val !== undefined ? val : "");
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

function deleteData(sheetName, idData, user) {
  try {
    if (!user) throw new Error('Otoritasi diperlukan');
    
    var sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(sheetName);
    if (!sheet) return { success: false, message: 'Sheet tidak ditemukan' };
    
    var rowIndex = parseInt(idData) + 1;
    
    // Security check for deletion
    if (user.role !== 'admin') {
      var rowData = sheet.getRange(rowIndex, 1, 1, sheet.getLastColumn()).getValues()[0];
      var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
      var pkmIdIdx = headers.indexOf('Id_Puskesmas');
      if (pkmIdIdx === -1) pkmIdIdx = headers.indexOf('ID_Puskesmas');
      
      if (pkmIdIdx !== -1) {
        var rowPkmId = (rowData[pkmIdIdx] || '').toString().trim();
        if (rowPkmId !== user.puskesmasId.toString().trim()) {
          throw new Error('Anda tidak memiliki izin untuk menghapus data Puskesmas lain.');
        }
      }
    }

    sheet.deleteRow(rowIndex);
    return { success: true, message: 'Data berhasil dihapus' };
  } catch (e) {
    return { success: false, message: e.toString() };
  }
}

function getAllDashboardData(user) {
  if (!user) return null;
  
  var data = {
    sasaran: getRecords(SHEET_NAMES.SASARAN),
    kegiatan: getRecords(SHEET_NAMES.KEGIATAN),
    rpjmn: getRecords(SHEET_NAMES.RPJMN),
    kelasBalita: getRecords(SHEET_NAMES.KELAS_BALITA),
    kelasBalitaKabKota: getRecords(SHEET_NAMES.KELAS_BALITA_KABKOTA),
    kematianNeonatal: getRecords(SHEET_NAMES.KEMATIAN_NEONATAL),
    kematianBalita: getRecords(SHEET_NAMES.KEMATIAN_BALITA)
  };
  
  // Only admins can see user list
  if (user.role === 'admin') {
    data.users = getRecords(SHEET_NAMES.USERS);
  } else {
    // Filter data for Puskesmas user specifically by Id_Puskesmas
    const userPkmId = (user.puskesmasId || '').toString().trim();
    for (var key in data) {
      if (data[key] && Array.isArray(data[key])) {
        data[key] = data[key].filter(function(r) {
          const rowPkmId = (r.Id_Puskesmas || r.ID_Puskesmas || '').toString().trim();
          return rowPkmId === userPkmId;
        });
      }
    }
  }
  
  return data;
}
