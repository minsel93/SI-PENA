function loginUser(username, password) {
  if (username === 'admin' && password === 'admin') {
    return { success: true, user: { username: 'admin', role: 'admin', puskesmasName: 'Dinkes Kab', puskesmasId: '000' } };
  }
  
  try {
    var sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAMES.USERS);
    if (!sheet) return { success: false, message: 'Database user tidak ditemukan' };
    
    var data = sheet.getDataRange().getValues();
    for (var i = 1; i < data.length; i++) {
      if (data[i][0] === username && data[i][1] === password) {
        return { 
          success: true, 
          user: { 
            username: data[i][0], 
            role: data[i][2], 
            puskesmasName: data[i][3], 
            puskesmasId: data[i][4] 
          } 
        };
      }
    }
    return { success: false, message: 'Username atau password salah' };
  } catch (e) {
    return { success: false, message: 'Gagal mengakses database. Pastikan ID Spreadsheet benar.' };
  }
}
