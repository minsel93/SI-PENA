/**
 * gasService.ts - Jembatan antara React (Frontend) dan Google Apps Script (Backend)
 */

declare const google: any;

// Flag untuk memastikan log environment hanya muncul sekali
let hasLoggedEnv = false;

export const gasService = {
  /**
   * Membungkus google.script.run ke dalam Promise agar bisa menggunakan async/await
   */
  async callServer(functionName: string, ...args: any[]): Promise<any> {
    return new Promise((resolve, reject) => {
      // Cek apakah berjalan di environment GAS
      if (typeof google === 'undefined' || !google.script || !google.script.run) {
        if (!hasLoggedEnv) {
          console.info("💡 SI-PENA: Berjalan dalam Mode Simulasi (Offline/Local).");
          hasLoggedEnv = true;
        }
        
        // Simulasi delay jaringan
        setTimeout(() => {
          // DATA SIMULASI (MOCK DATA) agar UI tidak kosong saat testing
          if (functionName === 'ambilData') {
            const sheetName = args[0];
            // Contoh data dummy untuk testing UI
            if (sheetName === 'users') resolve([{ username: 'admin', role: 'admin', puskesmasName: 'Dinkes Minsel' }]);
            if (sheetName === 'kegiatan') resolve([{ Nama_Puskesmas: 'Amurang', Bulan: 'Januari', Tahun: '2026', Status: 'Valid' }]);
            resolve([]); // Default kosong untuk sheet lain
          }
          
          if (functionName === 'simpanData') {
            resolve({ success: true, message: "Berhasil (Simulasi)" });
          }
          
          resolve({ success: true, mock: true });
        }, 500);
        return;
      }

      // Panggil fungsi asli di Kode.gs
      google.script.run
        .withSuccessHandler((result: any) => resolve(result))
        .withFailureHandler((error: any) => {
          console.error(`❌ Error Server [${functionName}]:`, error);
          reject(error);
        })
        [functionName](...args);
    });
  },

  /**
   * Menyimpan atau memperbarui data ke Spreadsheet
   */
  async submitData(sheetName: string, data: any) {
    try {
      return await this.callServer('simpanData', sheetName, data);
    } catch (error) {
      throw error;
    }
  },

  /**
   * Mengambil semua data dari sheet tertentu
   */
  async getRecords(sheetName: string) {
    try {
      return await this.callServer('ambilData', sheetName);
    } catch (error) {
      console.error(`Gagal mengambil data ${sheetName}:`, error);
      return [];
    }
  },

  /**
   * Menghapus data berdasarkan ID
   */
  async deleteRecord(sheetName: string, id: string) {
    try {
      return await this.callServer('hapusData', sheetName, id);
    } catch (error) {
      throw error;
    }
  }
};
