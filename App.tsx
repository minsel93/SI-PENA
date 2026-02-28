
import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import FormRenderer from './components/FormRenderer';
import { Login } from './components/Login';
import { FormType, AppState, User } from './types';
import { NAVIGATION_MENU } from './constants';
import { gasService } from './services/gasService';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    currentForm: FormType.DASHBOARD,
    records: { 
      sasaran: [], kegiatan: [], rpjmn: [], kelasBalita: [], 
      kelasBalitaKabKota: [], kematianNeonatal: [], kematianBalita: [], users: [] 
    },
    isLoading: false,
    notification: null,
    isAdmin: false,
    isAuthenticated: false,
    currentUser: null
  });

  // Check for existing session and fetch initial data
  useEffect(() => {
    const savedUser = localStorage.getItem('sipena_user');
    if (savedUser) {
      const user = JSON.parse(savedUser) as User;
      setState(prev => ({ 
        ...prev, 
        isAuthenticated: true, 
        currentUser: user,
        isAdmin: user.role === 'admin'
      }));
      fetchInitialData();
    }
  }, []);

  const fetchInitialData = async () => {
    setState(prev => ({ ...prev, isLoading: true }));
    try {
      const sheets = ['sasaran', 'kegiatan', 'rpjmn', 'kelasBalita', 'kelasBalitaKabKota', 'kematianNeonatal', 'kematianBalita', 'users'];
      const results = await Promise.all(sheets.map(s => gasService.getRecords(s)));
      
      const newRecords: any = {};
      sheets.forEach((s, i) => {
        newRecords[s] = results[i];
      });

      setState(prev => ({
        ...prev,
        records: newRecords,
        isLoading: false
      }));
    } catch (error) {
      console.error("Gagal mengambil data awal:", error);
      setState(prev => ({ ...prev, isLoading: false }));
    }
  };

  const handleLogin = (user: User) => {
    localStorage.setItem('sipena_user', JSON.stringify(user));
    setState(prev => ({ 
      ...prev, 
      isAuthenticated: true, 
      currentUser: user,
      isAdmin: user.role === 'admin'
    }));
    fetchInitialData();
  };

  const handleLogout = () => {
    localStorage.removeItem('sipena_user');
    setState(prev => ({ 
      ...prev, 
      isAuthenticated: false, 
      currentUser: null, 
      isAdmin: false,
      currentForm: FormType.DASHBOARD,
      records: { 
        sasaran: [], kegiatan: [], rpjmn: [], kelasBalita: [], 
        kelasBalitaKabKota: [], kematianNeonatal: [], kematianBalita: [], users: [] 
      }
    }));
  };

  const [activeModal, setActiveModal] = useState<'tentang' | 'bantuan' | null>(null);

  const handlePrintManual = () => {
    window.print();
  };

  const handleNavigation = (form: FormType, editingData?: { type: FormType, data: any }) => {
    setState(prev => ({ 
      ...prev, 
      currentForm: form,
      editingData: editingData 
    }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFormSubmit = async (data: any) => {
    setState(prev => ({ ...prev, isLoading: true }));
    
    try {
      const formType = state.currentForm;
      // Gunakan nama sheet yang sesuai
      let sheetName = formType.toLowerCase().replace('form_', '') as string;
      if (sheetName === 'user') sheetName = 'users';

      // Kirim ke Google Apps Script menggunakan simpanData
      await gasService.submitData(sheetName, data);

      // Refresh data lokal setelah submit
      await fetchInitialData();
      
      setState(prev => ({
        ...prev,
        isLoading: false,
        currentForm: FormType.DASHBOARD,
        editingData: undefined,
        notification: { message: 'Laporan berhasil disimpan ke database!', type: 'success' }
      }));
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        isLoading: false,
        notification: { message: 'Gagal mengirim laporan. Silakan coba lagi.', type: 'error' }
      }));
    }
    
    setTimeout(() => setState(prev => ({ ...prev, notification: null })), 3000);
  };

  if (!state.isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="glass-header shadow-sm">
        <div className="container-fluid px-6 py-3 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-5 cursor-pointer" onClick={() => handleNavigation(FormType.DASHBOARD)}>
            <img 
              src="https://i.ibb.co.com/b58BrxT3/IMAGE-1.png" 
              className="h-24 w-auto drop-shadow-md transition-transform hover:scale-105" 
              alt="Logo Kabupaten Minahasa Selatan" 
            />
            <div className="border-l-2 border-slate-200 pl-5">
              <h1 className="text-4xl font-black text-blue-900 leading-none tracking-tighter">SI–PENA</h1>
              <p className="text-sm font-bold text-slate-500 uppercase tracking-[0.1em] mt-2">Sistem Pelaporan Kesehatan Anak</p>
            </div>
          </div>
          
          <nav className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-3 mr-6 bg-slate-100 px-4 py-2 rounded-2xl border border-slate-200">
              <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                {state.currentUser?.username.charAt(0).toUpperCase()}
              </div>
              <div className="text-left">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">User Aktif</p>
                <p className="text-xs font-black text-slate-800">{state.currentUser?.puskesmasName || state.currentUser?.username}</p>
              </div>
            </div>

            <button onClick={() => handleNavigation(FormType.DASHBOARD)} className="nav-link-custom text-sm">
              <i className="bi bi-grid-1x2-fill text-lg"></i> Beranda
            </button>
            <button onClick={() => setActiveModal('tentang')} className="nav-link-custom text-sm">
              <i className="bi bi-info-circle text-lg"></i> Tentang
            </button>
            <button onClick={() => setActiveModal('bantuan')} className="nav-link-custom text-sm">
              <i className="bi bi-question-circle text-lg"></i> Bantuan
            </button>
            <button onClick={handleLogout} className="bg-rose-50 hover:bg-rose-100 text-rose-600 px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 border border-rose-200 ml-2">
              <i className="fas fa-power-off"></i> Keluar
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container-fluid px-6 py-10 lg:px-12">
        {state.currentForm === FormType.DASHBOARD ? (
          <Dashboard 
            onNavigate={handleNavigation} 
            records={state.isAdmin ? state.records : Object.keys(state.records).reduce((acc: any, key) => {
              acc[key] = (state.records[key as keyof typeof state.records] as any[]).filter(
                (r: any) => r.Nama_Puskesmas === state.currentUser?.puskesmasName
              );
              return acc;
            }, {})} 
            isAdmin={state.isAdmin}
            currentUser={state.currentUser}
          />
        ) : (
          <div className="max-w-5xl mx-auto">
            <button 
                onClick={() => handleNavigation(FormType.DASHBOARD)}
                className="mb-8 flex items-center gap-2 text-slate-500 hover:text-emerald-600 font-bold transition-colors"
            >
                <i className="fas fa-arrow-left"></i> Kembali ke Beranda
            </button>
            <FormRenderer 
              type={state.currentForm} 
              onSubmit={handleFormSubmit} 
              initialData={state.editingData?.data}
              isAdmin={state.isAdmin}
              currentUser={state.currentUser}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-20 py-16 px-6 lg:px-12 border-t border-white/5">
        <div className="container-fluid grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-6">
            <div className="bg-white/10 px-4 py-2 rounded-lg inline-block">
                <span className="text-white font-black tracking-tighter text-xl">SI-PENA</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Sistem Pelaporan Kesehatan Anak di Kabupaten Minahasa Selatan Secara Terintegrasi. Mengawal kesehatan generasi penerus bangsa.
            </p>
          </div>
          
          <div>
            <h5 className="text-white font-bold mb-6 text-lg tracking-wide uppercase">HUBUNGI KAMI</h5>
            <ul className="space-y-4 text-sm text-slate-400">
              <li className="flex gap-3">
                <i className="fas fa-map-marker-alt text-emerald-500 mt-1"></i>
                Jl. Trans Sulawesi, Kel. Pondang, Amurang Timur 95354
              </li>
              <li className="flex gap-3">
                <i className="fas fa-envelope text-emerald-500 mt-1"></i>
                dinkesmsumpag@gmail.com
              </li>
            </ul>
          </div>

          <div>
            <h5 className="text-white font-bold mb-6 text-lg tracking-wide uppercase">MEDIA SOSIAL</h5>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/share/1FDFaLRUDE/" target="_blank" rel="noopener noreferrer" className="w-11 h-11 bg-white/5 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-all"><i className="fab fa-facebook-f text-lg"></i></a>
              <a href="https://www.instagram.com/dinkes_minsel?igsh=d3NtMmx4NzU4YWdw" target="_blank" rel="noopener noreferrer" className="w-11 h-11 bg-white/5 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-all"><i className="fab fa-instagram text-lg"></i></a>
              <a href="https://wa.me/6285214000037" target="_blank" rel="noopener noreferrer" className="w-11 h-11 bg-white/5 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-all"><i className="fab fa-whatsapp text-lg"></i></a>
            </div>
          </div>
        </div>
        
        <div className="container-fluid mt-16 pt-8 border-t border-white/5 text-center text-xs font-medium text-slate-500 uppercase tracking-[0.3em]">
            SI-PENA © 2026 | Kabupaten Minahasa Selatan
        </div>
      </footer>

      {/* Modal Tentang */}
      {activeModal === 'tentang' && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in">
          <div className="bg-white w-full max-w-2xl modal-content-custom overflow-hidden shadow-2xl">
            <div className="bg-blue-900 p-8 text-white relative">
              <button onClick={() => setActiveModal(null)} className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors">
                <i className="fas fa-times text-xl"></i>
              </button>
              <h2 className="text-3xl font-black mb-2 flex items-center gap-3">
                <i className="bi bi-info-circle"></i> Tentang SI-PENA
              </h2>
              <p className="text-blue-200 font-medium">Sistem Pelaporan Kesehatan Anak</p>
            </div>
            <div className="p-8 space-y-6 text-slate-700 max-h-[70vh] overflow-y-auto">
              <p className="leading-relaxed">
                <strong>SI-PENA (Sistem Pelaporan Kesehatan Anak)</strong> adalah platform digital resmi Dinas Kesehatan Kabupaten Minahasa Selatan yang dirancang untuk modernisasi proses pencatatan dan pelaporan data kesehatan anak.
              </p>
              
              <div className="bg-emerald-50 p-6 rounded-3xl border border-emerald-100">
                <h4 className="text-emerald-800 font-bold mb-3 flex items-center gap-2">
                  <i className="bi bi-lightbulb-fill"></i> Visi
                </h4>
                <p className="text-sm italic leading-relaxed text-slate-700">
                  "Mewujudkan data kesehatan anak yang akurat, cepat, dan transparan di seluruh wilayah kerja Puskesmas Kabupaten Minahasa Selatan demi mengambil kebijakan yang lebih tepat sasaran."
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                  <span className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Versi Aplikasi</span>
                  <span className="font-bold text-slate-800 text-lg">2.0 (Build 2026)</span>
                </div>
                <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                  <span className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Pengembang</span>
                  <span className="font-bold text-slate-800">Administrator Dinkes</span>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100">
                <p className="text-xs text-slate-400 font-bold uppercase tracking-[0.2em] mb-2">Instansi Terkait</p>
                <p className="font-extrabold text-slate-800 flex items-center gap-2">
                  <i className="bi bi-building text-blue-600"></i> Dinas Kesehatan Kabupaten Minahasa Selatan
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Bantuan */}
      {activeModal === 'bantuan' && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in">
          <div className="bg-white w-full max-w-2xl modal-content-custom overflow-hidden shadow-2xl">
            <div className="bg-emerald-600 p-8 text-white relative">
              <button onClick={() => setActiveModal(null)} className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors">
                <i className="fas fa-times text-xl"></i>
              </button>
              <h2 className="text-3xl font-black mb-2 flex items-center gap-3">
                <i className="bi bi-question-circle"></i> Pusat Bantuan
              </h2>
              <p className="text-emerald-100 font-medium tracking-wide">Dukungan Teknis & Panduan SI-PENA</p>
            </div>
            <div className="p-8 space-y-8 text-slate-700 max-h-[70vh] overflow-y-auto">
              <section>
                <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2 text-lg">
                  <i className="bi bi-journal-text text-emerald-600"></i> Panduan Penggunaan
                </h4>
                <p className="text-sm leading-relaxed mb-4">Silakan cetak atau simpan panduan lengkap untuk tata cara pengisian form Sasaran, Kegiatan, dan Kematian.</p>
                <button 
                  onClick={handlePrintManual}
                  className="bg-emerald-600 text-white px-6 py-3 rounded-2xl text-sm font-bold shadow-lg shadow-emerald-100 hover:bg-emerald-700 transition-all flex items-center gap-2"
                >
                  <i className="fas fa-print"></i> Cetak Buku Panduan (PDF)
                </button>
              </section>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-amber-50 rounded-2xl border border-amber-100">
                  <h4 className="font-bold text-amber-900 mb-2 flex items-center gap-2">
                    <i className="bi bi-shield-lock"></i> Lupa Password
                  </h4>
                  <p className="text-xs leading-relaxed text-amber-800">Hubungi Administrator Dinas Kesehatan untuk melakukan reset akun jika Anda kehilangan akses login.</p>
                </div>
                <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100">
                  <h4 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                    <i className="bi bi-lightning"></i> Masalah Teknis
                  </h4>
                  <p className="text-xs leading-relaxed text-blue-800">Pastikan koneksi internet stabil dan gunakan browser <strong>Google Chrome</strong> versi terbaru untuk performa terbaik.</p>
                </div>
              </div>

              <section className="bg-slate-50 p-6 rounded-3xl border border-slate-200">
                <h4 className="font-black text-slate-900 mb-5 uppercase text-xs tracking-[0.2em] border-b pb-3">Kontak Admin SI-PENA</h4>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                      <i className="fab fa-whatsapp text-xl"></i>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-bold uppercase">WhatsApp Admin</p>
                      <p className="font-black text-slate-800">+62 852-1400-0037</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                      <i className="bi bi-clock-history text-xl"></i>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-bold uppercase">Jam Operasional</p>
                      <p className="text-sm font-bold text-slate-800">Senin - Kamis (08.00 - 17.00 WITA)</p>
                      <p className="text-sm font-bold text-slate-800">Jumat (08.00 - 11.30 WITA)</p>
                      <p className="text-xs text-rose-600 font-black mt-1 italic">* Minggu & Tanggal Merah Libur</p>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      )}

      {/* WhatsApp Floating */}
      <a 
        href="https://wa.me/6285214000037" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="wa-float"
        title="Hubungi Admin SI-PENA"
      >
        <i className="fab fa-whatsapp"></i>
      </a>

      {/* Notification Toast */}
      {state.notification && (
        <div className="fixed top-24 right-8 z-[1001] bg-emerald-600 text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-slide-in">
          <i className="fas fa-check-circle text-xl"></i>
          <span className="font-bold">{state.notification.message}</span>
        </div>
      )}

      {/* Printable Manual Content (Hidden from UI, visible in print) */}
      <div className="hidden print:block p-12 bg-white text-slate-900 font-sans">
        <div className="text-center mb-12 border-b-4 border-blue-900 pb-8">
          <h1 className="text-5xl font-black mb-2">BUKU PANDUAN PENGGUNA</h1>
          <h2 className="text-3xl font-bold text-blue-900 uppercase tracking-widest">SI-PENA SISTEM PELAPORAN KESEHATAN ANAK</h2>
          <p className="text-lg font-medium mt-4">DINAS KESEHATAN KABUPATEN MINAHASA SELATAN</p>
        </div>

        <section className="mb-10">
          <h3 className="text-2xl font-black border-b-2 border-slate-200 mb-4 pb-2 uppercase">1. PENDAHULUAN</h3>
          <p className="leading-relaxed mb-4">SI-PENA adalah aplikasi pelaporan kesehatan anak yang digunakan oleh seluruh Puskesmas di Kabupaten Minahasa Selatan untuk mengirimkan data sasaran, kegiatan, dan kematian secara periodik.</p>
        </section>

        <section className="mb-10">
          <h3 className="text-2xl font-black border-b-2 border-slate-200 mb-4 pb-2 uppercase">2. CARA LOGIN</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Gunakan Username dan Password yang telah diberikan oleh Admin Dinkes.</li>
            <li>Pastikan ID Puskesmas sudah sesuai dengan wilayah kerja Anda.</li>
            <li>Jika lupa password, hubungi Admin melalui kontak yang tertera di aplikasi.</li>
          </ul>
        </section>

        <section className="mb-10">
          <h3 className="text-2xl font-black border-b-2 border-slate-200 mb-4 pb-2 uppercase">3. PENGISIAN FORMULIR</h3>
          <p className="mb-4">Terdapat 8 jenis formulir utama yang harus diisi:</p>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 border border-slate-200 rounded-lg"><strong>Data Sasaran:</strong> Input target tahunan.</div>
            <div className="p-4 border border-slate-200 rounded-lg"><strong>Laporan Kegiatan:</strong> Input capaian bulanan.</div>
            <div className="p-4 border border-slate-200 rounded-lg"><strong>Kematian:</strong> Input data kematian neonatal/balita.</div>
            <div className="p-4 border border-slate-200 rounded-lg"><strong>RPJMN:</strong> Input indikator strategis.</div>
          </div>
          <p className="mt-4 font-bold text-rose-600 italic">* Pastikan semua kolom bertanda bintang (*) diisi dengan benar.</p>
        </section>

        <section className="mb-10">
          <h3 className="text-2xl font-black border-b-2 border-slate-200 mb-4 pb-2 uppercase">4. VALIDASI DATA</h3>
          <p className="leading-relaxed">Setelah data dikirim, Admin Dinkes akan melakukan validasi. Jika status <strong>"Belum Valid"</strong>, silakan klik tombol <strong>"PERBAIKI"</strong> di dashboard untuk melakukan revisi sesuai catatan admin.</p>
        </section>

        <div className="mt-20 pt-10 border-t border-slate-100 text-center text-sm text-slate-400">
          Dicetak pada: {new Date().toLocaleDateString('id-ID')} | SI-PENA v2.0
        </div>
      </div>
    </div>
  );
};

export default App;
