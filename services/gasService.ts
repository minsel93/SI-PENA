// Ganti dengan URL Web App yang Anda dapatkan setelah deploy Google Apps Script
const GAS_WEB_APP_URL = "https://script.google.com/macros/s/AKfycbxjRtU_rg_hzQUk-4SraEQvVoT8xdzG7jcKP717EFk2dudxLGGFslaI1c_YPuqOq07Guw/exec";

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

  async deleteData(sheetName: string, idData: string) {
    return await this.callAPI('deleteData', { sheetName, idData });
  },

  async getRecords(sheetName: string) {
    const res = await this.callAPI('getRecords', { sheetName });
    return res.success ? res.data : [];
  },

  async login(username: string, password: string) {
    return await this.callAPI('login', { username, password });
  }
};
