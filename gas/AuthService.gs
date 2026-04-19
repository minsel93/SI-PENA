function loginUser(username, password) {
  // Hardcoded fallback users for security and guaranteed access
  const FALLBACK_USERS = [
    { username: 'admin1', puskesmasId: '', password: 'admin001', role: 'admin', name: 'Admin Dinkes 1', status: 'Aktif' },
    { username: 'admin2', puskesmasId: '', password: 'admin002', role: 'admin', name: 'Admin Dinkes 2', status: 'Aktif' },
    { username: 'tareran', puskesmasId: 'PKM-001', password: 'pkmuser001', role: 'puskesmas', name: 'PUSKESMAS TARERAN', status: 'Aktif' },
    { username: 'suluun', puskesmasId: 'PKM-002', password: 'pkmuser002', role: 'puskesmas', name: 'PUSKESMAS SULUUN', status: 'Aktif' },
    { username: 'tatapaan', puskesmasId: 'PKM-003', password: 'pkmuser003', role: 'puskesmas', name: 'PUSKESMAS TATAPAAN', status: 'Aktif' },
    { username: 'tumpaan', puskesmasId: 'PKM-004', password: 'pkmuser004', role: 'puskesmas', name: 'PUSKESMAS TUMPAAN', status: 'Aktif' },
    { username: 'amurangtimur', puskesmasId: 'PKM-005', password: 'pkmuser005', role: 'puskesmas', name: 'PUSKESMAS AMURANG TIMUR', status: 'Aktif' },
    { username: 'amurang', puskesmasId: 'PKM-006', password: 'pkmuser006', role: 'puskesmas', name: 'PUSKESMAS AMURANG', status: 'Aktif' },
    { username: 'amurangbarat', puskesmasId: 'PKM-007', password: 'pkmuser007', role: 'puskesmas', name: 'PUSKESMAS AMURANG BARAT', status: 'Aktif' },
    { username: 'tenga', puskesmasId: 'PKM-008', password: 'pkmuser008', role: 'puskesmas', name: 'PUSKESMAS TENGA', status: 'Aktif' },
    { username: 'ongkaw', puskesmasId: 'PKM-009', password: 'pkmuser009', role: 'puskesmas', name: 'PUSKESMAS ONGKAW', status: 'Aktif' },
    { username: 'kumelembuai', puskesmasId: 'PKM-010', password: 'pkmuser010', role: 'puskesmas', name: 'PUSKESMAS KUMELEMBUAI', status: 'Aktif' },
    { username: 'motolingtimur', puskesmasId: 'PKM-011', password: 'pkmuser011', role: 'puskesmas', name: 'PUSKESMAS MOTOLING TIMUR', status: 'Aktif' },
    { username: 'motoling', puskesmasId: 'PKM-012', password: 'pkmuser012', role: 'puskesmas', name: 'PUSKESMAS MOTOLING', status: 'Aktif' },
    { username: 'motolingbarat', puskesmasId: 'PKM-013', password: 'pkmuser013', role: 'puskesmas', name: 'PUSKESMAS MOTOLING BARAT', status: 'Aktif' },
    { username: 'poopo', puskesmasId: 'PKM-014', password: 'pkmuser014', role: 'puskesmas', name: 'PUSKESMAS POOPO', status: 'Aktif' },
    { username: 'tompasobaru', puskesmasId: 'PKM-015', password: 'pkmuser015', role: 'puskesmas', name: 'PUSKESMAS TOMPASO BARU', status: 'Aktif' },
    { username: 'maesaan', puskesmasId: 'PKM-016', password: 'pkmuser016', role: 'puskesmas', name: 'PUSKESMAS MAESAAN', status: 'Aktif' },
    { username: 'modoinding', puskesmasId: 'PKM-017', password: 'pkmuser017', role: 'puskesmas', name: 'PUSKESMAS MODOINDING', status: 'Aktif' }
  ];

  try {
    var sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAMES.USERS);
    
    // First try to check from Spreadsheet if it exists
    if (sheet) {
      var data = sheet.getDataRange().getValues();
      if (data.length > 1) { // Has data beyond header
        for (var i = 1; i < data.length; i++) {
          if (data[i][0] === username && data[i][2] === password) {
            if (data[i][5] !== 'Aktif') {
              return { success: false, message: 'Akun Anda tidak aktif. Hubungi Administrator.' };
            }
            return { 
              success: true, 
              user: { 
                username: data[i][0], 
                puskesmasId: data[i][1],
                role: data[i][3], 
                puskesmasName: data[i][4] 
              } 
            };
          }
        }
        return { success: false, message: 'Username atau password salah' };
      }
    }
  } catch (e) {
    // If spreadsheet fails, fallback to hardcoded data below
    console.log("Spreadsheet access failed, falling back to hardcoded users.");
  }

  // Fallback to hardcoded users if spreadsheet is empty or inaccessible
  for (var j = 0; j < FALLBACK_USERS.length; j++) {
    var u = FALLBACK_USERS[j];
    if (u.username === username && u.password === password) {
      if (u.status !== 'Aktif') {
        return { success: false, message: 'Akun Anda tidak aktif. Hubungi Administrator.' };
      }
      return {
        success: true,
        user: {
          username: u.username,
          puskesmasId: u.puskesmasId,
          role: u.role,
          puskesmasName: u.name
        }
      };
    }
  }

  return { success: false, message: 'Username atau password salah' };
}
