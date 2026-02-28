/**
 * SI-PENA Backend - Google Apps Script
 * Skrip ini berjalan di server Google Apps Script
 */

/**
 * Fungsi utama untuk merender aplikasi React
 */
function doGet(e) {
  return HtmlService.createHtmlOutputFromFile('index')
    .setTitle('SI-PENA - Kabupaten Minahasa Selatan')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * Konfigurasi Nama Sheet
 */
const SHEETS = {
  SASARAN: 'sasaran',
  KEGIATAN: 'kegiatan',
  RPJMN: 'rpjmn',
  KELAS_BALITA: 'kelasBalita',
  KELAS_BALITA_KABKOTA: 'kelasBalitaKabKota',
  KEMATIAN_NEONATAL: 'kematianNeonatal',
  KEMATIAN_BALITA: 'kematianBalita',
  USERS: 'users'
};

/**
 * Inisialisasi Database (Jalankan fungsi ini sekali di editor GAS)
 */
function setupDatabase() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  Object.values(SHEETS).forEach(sheetName => {
    let sheet = ss.getSheetByName(sheetName);
    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
      // Header default (Id_Data selalu di kolom pertama)
      sheet.appendRow(['Id_Data', 'Timestamp', 'Data_JSON']);
      console.log('Sheet dibuat: ' + sheetName);
    }
  });
  return "Database SI-PENA berhasil disiapkan!";
}

/**
 * Helper untuk mendapatkan sheet secara aman
 */
function getSheet(sheetName) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
    sheet.appendRow(['Id_Data', 'Timestamp', 'Data_JSON']);
  }
  return sheet;
}

/**
 * Simpan atau Update Data
 */
function simpanData(sheetName, data) {
  try {
    const sheet = getSheet(sheetName);
    const id = data.Id_Data || Utilities.getUuid();
    data.Id_Data = id;
    
    const values = sheet.getDataRange().getValues();
    let rowIndex = -1;
    
    // Cari baris jika update
    for (let i = 1; i < values.length; i++) {
      if (values[i][0] == id) {
        rowIndex = i + 1;
        break;
      }
    }
    
    const timestamp = new Date();
    const rowData = [id, timestamp, JSON.stringify(data)];
    
    if (rowIndex > 0) {
      sheet.getRange(rowIndex, 1, 1, rowData.length).setValues([rowData]);
    } else {
      sheet.appendRow(rowData);
    }
    
    return { success: true, id: id, message: "Data berhasil disimpan" };
  } catch (error) {
    return { success: false, error: error.toString() };
  }
}

/**
 * Ambil Semua Data dari Sheet
 */
function ambilData(sheetName) {
  try {
    const sheet = getSheet(sheetName);
    const values = sheet.getDataRange().getValues();
    if (values.length <= 1) return [];
    
    return values.slice(1).map(row => {
      try {
        return JSON.parse(row[2]);
      } catch (e) {
        return { Id_Data: row[0], error: "JSON Parse Error" };
      }
    });
  } catch (error) {
    return [];
  }
}

/**
 * Hapus Data berdasarkan ID
 */
function hapusData(sheetName, id) {
  try {
    const sheet = getSheet(sheetName);
    const values = sheet.getDataRange().getValues();
    
    for (let i = 1; i < values.length; i++) {
      if (values[i][0] == id) {
        sheet.deleteRow(i + 1);
        return { success: true, message: "Data berhasil dihapus" };
      }
    }
    return { success: false, message: "ID tidak ditemukan" };
  } catch (error) {
    return { success: false, error: error.toString() };
  }
}

