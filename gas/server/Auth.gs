/**
 * Authentication & Session Management
 */

function login(username, password) {
  try {
    const users = getRecordsFromServer('USER');
    const user = users.find(u => u.UUsername === username && u.Password === password);
    
    if (user) {
      // Simpan sesi di PropertiesService jika perlu
      const userSession = {
        username: user.UUsername,
        role: user.Role,
        puskesmasId: user.ID_Puskesmas,
        puskesmasName: user.Name
      };
      return {
        success: true,
        user: userSession
      };
    }
    return { success: false, message: 'Username atau Password salah!' };
  } catch (e) {
    return { success: false, message: 'Terjadi kesalahan sistem: ' + e.toString() };
  }
}

function logout() {
  // Clear session logic here if using PropertiesService
  return { success: true };
}
