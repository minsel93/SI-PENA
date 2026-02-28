// Ganti dengan URL Web App yang Anda dapatkan setelah deploy Google Apps Script
const GAS_WEB_APP_URL = "https://script.google.com/macros/s/AKfycbz7byWAls_flL2IiKZGGcyfjVODV4SHoQX8cZKi1bt-Fdzaw_hJte6Y0DFrG0oxHcZ5/exec";

export const gasService = {
  async callAPI(action: string, payload: any = {}): Promise<any> {
    try {
      const response = await fetch(GAS_WEB_APP_URL, {
        method: 'POST',
        // Menggunakan text/plain agar tidak memicu error CORS Preflight di browser
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ action, ...payload }),
        redirect: 'follow'
      });
      return await response.json();
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  },

  async submitData(sheetName: string, data: any) {
    return await this.callAPI('submitData', { sheetName, data });
  },

  async getRecords(sheetName: string) {
    const res = await this.callAPI('getRecords', { sheetName });
    return res.success ? res.data : [];
  },

  async login(username: string, password: string) {
    return await this.callAPI('login', { username, password });
  }
};
