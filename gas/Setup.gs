/**
 * Setup unique spreadsheet structure and initial data.
 * Run this function once or when changes to sheet structure are needed.
 */
function setupSpreadsheet() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  
  // 1. Create and Format Sheets
  Object.keys(FORM_HEADERS).forEach(sheetName => {
    let sheet = ss.getSheetByName(sheetName);
    
    // Create sheet if it doesn't exist
    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
    }
    
    const headers = FORM_HEADERS[sheetName];
    
    // Set first row headers
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    
    // Format headers
    sheet.getRange(1, 1, 1, headers.length)
      .setFontWeight('bold')
      .setBackground('#f3f3f3')
      .setHorizontalAlignment('center');
      
    // Freeze top row
    sheet.setFrozenRows(1);
    
    // Auto-resize columns (optional but good for visibility)
    if (headers.length > 0) {
      sheet.autoResizeColumns(1, headers.length);
    }
  });
  
  // 2. Initial Data for User Sheet
  const userSheet = ss.getSheetByName(SHEET_NAMES.USERS);
  if (userSheet && userSheet.getLastRow() <= 1) {
    const initialUsers = [
      ["admin1", "", "admin001", "admin", "Admin Dinkes 1", "Aktif"],
      ["admin2", "", "admin002", "admin", "Admin Dinkes 2", "Aktif"],
      ["tareran", "PKM-001", "pkmuser001", "puskesmas", "PUSKESMAS TARERAN", "Aktif"],
      ["suluun", "PKM-002", "pkmuser002", "puskesmas", "PUSKESMAS SULUUN", "Aktif"],
      ["tatapaan", "PKM-003", "pkmuser003", "puskesmas", "PUSKESMAS TATAPAAN", "Aktif"],
      ["tumpaan", "PKM-004", "pkmuser004", "puskesmas", "PUSKESMAS TUMPAAN", "Aktif"],
      ["amurangtimur", "PKM-005", "pkmuser005", "puskesmas", "PUSKESMAS AMURANG TIMUR", "Aktif"],
      ["amurang", "PKM-006", "pkmuser006", "puskesmas", "PUSKESMAS AMURANG", "Aktif"],
      ["amurangbarat", "PKM-007", "pkmuser007", "puskesmas", "PUSKESMAS AMURANG BARAT", "Aktif"],
      ["tenga", "PKM-008", "pkmuser008", "puskesmas", "PUSKESMAS TENGA", "Aktif"],
      ["ongkaw", "PKM-009", "pkmuser009", "puskesmas", "PUSKESMAS ONGKAW", "Aktif"],
      ["kumelembuai", "PKM-010", "pkmuser010", "puskesmas", "PUSKESMAS KUMELEMBUAI", "Aktif"],
      ["motolingtimur", "PKM-011", "pkmuser011", "puskesmas", "PUSKESMAS MOTOLING TIMUR", "Aktif"],
      ["motoling", "PKM-012", "pkmuser012", "puskesmas", "PUSKESMAS MOTOLING", "Aktif"],
      ["motolingbarat", "PKM-013", "pkmuser013", "puskesmas", "PUSKESMAS MOTOLING BARAT", "Aktif"],
      ["poopo", "PKM-014", "pkmuser014", "puskesmas", "PUSKESMAS POOPO", "Aktif"],
      ["tompasobaru", "PKM-015", "pkmuser015", "puskesmas", "PUSKESMAS TOMPASO BARU", "Aktif"],
      ["maesaan", "PKM-016", "pkmuser016", "puskesmas", "PUSKESMAS MAESAAN", "Aktif"],
      ["modoinding", "PKM-017", "pkmuser017", "puskesmas", "PUSKESMAS MODOINDING", "Aktif"]
    ];
    
    userSheet.getRange(2, 1, initialUsers.length, initialUsers[0].length).setValues(initialUsers);
  }
  
  console.log("Spreadsheet setup completed successfully.");
}
