declare global {
  interface Window {
    google: any;
  }
}

const isGas = typeof window !== 'undefined' && window.google && window.google.script;

const runGas = (functionName: string, ...args: any[]): Promise<any> => {
  return new Promise((resolve, reject) => {
    if (!isGas) {
      reject(new Error('Google Apps Script environment not detected'));
      return;
    }
    (window.google.script.run as any).withSuccessHandler(resolve).withFailureHandler(reject)[functionName](...args);
  });
};

// Mock service for AI Studio Preview
export const gasService = {
  async submitData(sheetName: string, data: any) {
    if (isGas) {
      return runGas('submitData', sheetName, data);
    }
    
    console.log(`[Mock] Submitting to ${sheetName}:`, data);
    const records = JSON.parse(localStorage.getItem('mock_db') || '{}');
    if (!records[sheetName]) records[sheetName] = [];
    
    // Add ID and timestamp
    const newData = {
      ...data,
      Id_Data: data.Id_Data || `ID-${Date.now()}`,
      Status_Validasi: data.Status_Validasi || 'Terkirim',
      Timestamp: data.Timestamp || new Date().toISOString()
    };
    
    if (data.Id_Data) {
      const idx = records[sheetName].findIndex((r: any) => r.Id_Data === data.Id_Data);
      if (idx !== -1) records[sheetName][idx] = newData;
      else records[sheetName].push(newData);
    } else {
      records[sheetName].push(newData);
    }
    
    localStorage.setItem('mock_db', JSON.stringify(records));
    return { success: true };
  },

  async deleteData(sheetName: string, idData: string) {
    if (isGas) {
      return runGas('deleteData', sheetName, idData);
    }

    console.log(`[Mock] Deleting from ${sheetName}:`, idData);
    const records = JSON.parse(localStorage.getItem('mock_db') || '{}');
    if (records[sheetName]) {
      records[sheetName] = records[sheetName].filter((r: any) => r.Id_Data !== idData);
      localStorage.setItem('mock_db', JSON.stringify(records));
    }
    return { success: true };
  },

  async getRecords(sheetName: string) {
    if (isGas) {
      return runGas('getRecords', sheetName);
    }

    console.log(`[Mock] Getting records for ${sheetName}`);
    const records = JSON.parse(localStorage.getItem('mock_db') || '{}');
    return records[sheetName] || [];
  },

  async getAllDashboardData() {
    if (isGas) {
      return runGas('getAllDashboardData');
    }

    console.log(`[Mock] Getting all dashboard data`);
    const records = JSON.parse(localStorage.getItem('mock_db') || '{}');
    return {
      sasaran: records.sasaran || [],
      kegiatan: records.kegiatan || [],
      rpjmn: records.rpjmn || [],
      kelasBalita: records.kelasBalita || [],
      kelasBalitaKabKota: records.kelasBalitaKabKota || [],
      kematianNeonatal: records.kematianNeonatal || [],
      kematianBalita: records.kematianBalita || [],
      users: records.users || []
    };
  },

  async login(username: string, password: string) {
    if (isGas) {
      return runGas('loginUser', username, password);
    }

    console.log(`[Mock] Login attempt:`, username);
    // Mock login logic matching the GAS fallback users
    const FALLBACK_USERS = [
      { username: 'admin1', puskesmasId: '', password: 'admin001', role: 'admin', puskesmasName: 'Admin Dinkes 1', status: 'Aktif' },
      { username: 'admin2', puskesmasId: '', password: 'admin002', role: 'admin', puskesmasName: 'Admin Dinkes 2', status: 'Aktif' },
      { username: 'tareran', puskesmasId: 'PKM-001', password: 'pkmuser001', role: 'puskesmas', puskesmasName: 'PUSKESMAS TARERAN', status: 'Aktif' }
    ];
    
    const user = FALLBACK_USERS.find(u => u.username === username && u.password === password);
    if (user) {
      return { success: true, user };
    }
    return { success: false, message: 'Username atau password salah' };
  }
};
