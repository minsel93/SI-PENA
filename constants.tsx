
import React from 'react';
import { FormType } from './types';

export const NAVIGATION_MENU = [
  { id: FormType.DASHBOARD, label: 'Beranda', icon: <i className="fas fa-home"></i>, color: 'bg-blue-500' },
  { id: FormType.SASARAN, label: 'Data Sasaran', icon: <i className="fas fa-file-circle-plus"></i>, color: 'bg-indigo-500' },
  { id: FormType.KEGIATAN, label: 'Laporan Kegiatan', icon: <i className="fas fa-clipboard-list"></i>, color: 'bg-emerald-500' },
  { id: FormType.KELAS_BALITA, label: 'Kelas Balita', icon: <i className="fas fa-chalkboard-user"></i>, color: 'bg-amber-500' },
  { id: FormType.KELAS_BALITA_KAB_KOTA, label: 'Kelas Balita Kab/Kota', icon: <i className="fas fa-city"></i>, color: 'bg-orange-500' },
  { id: FormType.KEMATIAN_NEONATAL, label: 'Kematian Neonatal', icon: <i className="fas fa-heart-pulse"></i>, color: 'bg-rose-500' },
  { id: FormType.KEMATIAN_BALITA, label: 'Kematian Balita', icon: <i className="fas fa-user-doctor"></i>, color: 'bg-slate-700' },
  { id: FormType.RPJMN, label: 'RPJMN & RENSTRA', icon: <i className="fas fa-chart-line"></i>, color: 'bg-sky-500' },
  { id: FormType.USER, label: 'Manajemen User', icon: <i className="fas fa-users-gear"></i>, color: 'bg-purple-500' },
];

export const THEME_COLORS = {
  primary: 'bg-emerald-600',
  secondary: 'bg-slate-900',
  accent: 'text-emerald-600'
};

export const PUSKESMAS_MAPPING: Record<string, string> = {
  'PUSKESMAS TARERAN': 'PKM-001',
  'PUSKESMAS SULUUN': 'PKM-002',
  'PUSKESMAS TATAPAAN': 'PKM-003',
  'PUSKESMAS TUMPAAN': 'PKM-004',
  'PUSKESMAS AMURANG TIMUR': 'PKM-005',
  'PUSKESMAS AMURANG': 'PKM-006',
  'PUSKESMAS AMURANG BARAT': 'PKM-007',
  'PUSKESMAS TENGA': 'PKM-008',
  'PUSKESMAS ONGKAW': 'PKM-009',
  'PUSKESMAS KUMELEMBUAI': 'PKM-010',
  'PUSKESMAS MOTOLING TIMUR': 'PKM-011',
  'PUSKESMAS MOTOLING': 'PKM-012',
  'PUSKESMAS MOTOLING BARAT': 'PKM-013',
  'PUSKESMAS POOPO': 'PKM-014',
  'PUSKESMAS TOMPASO BARU': 'PKM-015',
  'PUSKESMAS MAESAAN': 'PKM-016',
  'PUSKESMAS MODOINDING': 'PKM-017',
};

export const SPREADSHEET_ID = "1d28gDgem5iAQE81jtuM8xH1fNfeDpohe_PUJxPtK9gE";

export const FORM_HEADERS = {
  SASARAN: [
    'Id_Data', 'Bulan', 'Tahun', 'Id_Puskesmas', 'Nama_Puskesmas', 'Sasaran_Lahir_Hidup_Pusdatin', 
    'Sasaran_0_Tahun_Surviving_Infant', 'Sasaran_0_4_Tahun', 'Sasaran_1_4_Tahun', 'Sasaran_Anak_Pra_Sekolah_5_6_Th', 
    'Jumlah_TK', 'Jumlah_SD_MI', 'Jumlah_SMP_MTs', 'Jumlah_SMU_SMK_MA', 'Jumlah_Peserta_Didik_Kelas_1', 
    'Jumlah_Peserta_Didik_Kelas_7', 'Jumlah_Peserta_Didik_Kelas_10', 'Jumlah_Puskesmas', 'Jumlah_Panti_LKSA_Sasaran', 
    'Jumlah_SLB_Sasaran', 'Jumlah_Lapas_Rutan_Anak_Sasaran', 'Jumlah_RS_Memiliki_PPT_PKT', 'Nama_Petugas_Penginput', 
    'Tanggal_Input', 'Status_Validasi', 'Catatan_Validasi', 'Timestamp'
  ],
  KEGIATAN: [
    'Id_Data', 'Bulan', 'Tahun', 'Id_Puskesmas', 'Nama_Puskesmas', 'Sasaran_Lahir_Hidup_Pusdatin', 
    'Sasaran_Lahir_Hidup_SPM_PKM', 'Sasaran_Komplikasi_Neonatus_SPM', 'Sasaran_Neonatus_Komplikasi', 'KN1_L', 'KN1_P', 
    'KN1_Jml', 'KN1_Abs', 'KN1_Persen_Pusdatin', 'KN1_Persen_SPM', 'KN_Lengkap_L', 'KN_Lengkap_P', 'KN_Lengkap_Jml', 
    'KN_Lengkap_Abs', 'KN_Lengkap_Persen_Pusdatin', 'KN_Lengkap_Persen_SPM', 'Neonatus_Komplikasi_Ditangani_L', 
    'Neonatus_Komplikasi_Ditangani_P', 'Neonatus_Komplikasi_Ditangani_Jml', 'Neonatus_Komplikasi_Ditangani_Abs', 
    'Neonatus_Komplikasi_Ditangani_Persen_Pusdatin', 'Neonatus_Komplikasi_Ditangani_Persen_SPM', 'Kunjungan_Bayi_L', 
    'Kunjungan_Bayi_P', 'Kunjungan_Bayi_Jml', 'Kunjungan_Bayi_Abs', 'Kunjungan_Bayi_Persen_Pusdatin', 
    'Kunjungan_Bayi_Persen_SPM', 'Sasaran_Anak_Balita_0_4_Th_Pusdatin', 'Sasaran_Balita_SPM', 'Pelayanan_Kesehatan_Balita_L', 
    'Pelayanan_Kesehatan_Balita_P', 'Pelayanan_Kesehatan_Balita_Jml', 'Pelayanan_Kesehatan_Balita_Abs', 
    'Pelayanan_Kesehatan_Balita_Persen_Pusdatin', 'Pelayanan_Kesehatan_Balita_Persen_SPM', 
    'Indikator_SPM_Pelayanan_Kesehatan_Balita_Abs', 'Indikator_SPM_Pelayanan_Kesehatan_Balita_Persen', 
    'Jumlah_Balita_Memiliki_Dan_Menggunakan_Buku_KIA', 'Nama_Petugas_Penginput', 'Tanggal_Input', 'Status_Validasi', 
    'Catatan_Validasi', 'Timestamp'
  ],
  RPJMN: [
    'Id_Data', 'Bulan', 'Tahun', 'Id_Puskesmas', 'Nama_Puskesmas', 'Sasaran_Lahir_Hidup_Pusdatin', 'KN_Lengkap_Abs', 
    'KN_Lengkap_Persen', 'Sasaran_Balita_SPM_Kab_Minsel_0_4_Th', 'Sasaran_Balita_Pusdatin', 
    'Balita_Dipantau_Tumbuh_Kembang_Abs', 'Balita_Dipantau_Tumbuh_Kembang_Persen_SPM_Kab', 
    'Balita_Dipantau_Tumbuh_Kembang_Persen_Pusdatin', 'Jumlah_Balita_Berobat_Abs', 'Jumlah_Balita_Berobat_Persen_Pusdatin', 
    'Jumlah_Balita_Berobat_Persen_SPM_Kab', 'Jumlah_Balita_MTBS_Abs', 'Jumlah_Balita_MTBS_Persen_Pusdatin', 
    'Jumlah_Balita_MTBS_Persen_SPM_Kab', 'Jumlah_Balita_SDIDTK_Abs', 'Jumlah_Balita_SDIDTK_Persen_Pusdatin', 
    'Jumlah_Balita_SDIDTK_Persen_SPM_Kab', 'Jumlah_Puskesmas', 'Puskesmas_Kelas_Ibu_Balita_50_Persen_Desa_Abs', 
    'Puskesmas_Kelas_Ibu_Balita_50_Persen_Desa_Persen', 'Puskesmas_Melaksanakan_MTBS_Abs', 'Puskesmas_Melaksanakan_MTBS_Persen', 
    'Puskesmas_Melaksanakan_SDIDTK_Abs', 'Puskesmas_Melaksanakan_SDIDTK_Persen', 
    'Kab_Kota_Menyelenggarakan_Pelayanan_Kesehatan_Balita_Ya', 
    'Kab_Kota_Menyelenggarakan_Pelayanan_Kesehatan_Balita_Tidak', 'Nama_Petugas_Penginput', 'Tanggal_Input', 
    'Status_Validasi', 'Catatan_Validasi', 'Timestamp'
  ],
  KELAS_BALITA: [
    'Id_Data', 'Bulan', 'Tahun', 'Id_Puskesmas', 'Nama_Puskesmas', 'Desa_Dengan_Kelas_Ibu_Balita_Ya', 
    'Desa_Dengan_Kelas_Ibu_Balita_Tidak', 'Jumlah_Kelas_Ibu_Balita', 'Kelas_0_1_Tahun', 'Kelas_1_2_Tahun', 
    'Kelas_2_5_Tahun', 'Total_Ibu_Ikut_Kelas_Ibu_Balita', 'Nama_Petugas_Penginput', 'Tanggal_Input', 'Status_Validasi', 
    'Catatan_Validasi', 'Timestamp'
  ],
  KELAS_BALITA_KAB_KOTA: [
    'Id_Data', 'Bulan', 'Tahun', 'Id_Puskesmas', 'Nama_Puskesmas', 'Jumlah_Puskesmas', 'Jumlah_Desa_Kelurahan', 
    'Desa_Dengan_Kelas_Ibu_Balita_Abs', 'Desa_Dengan_Kelas_Ibu_Balita_Persen', 'Jumlah_Kelas_Ibu_Balita', 
    'Jumlah_Ibu_Mengikuti_Kelas_Ibu_Balita', 'Puskesmas_Melaksanakan_Kelas_Ibu_Balita_di_50_Persen_Desa_Kelurahan', 
    'Persen_Desa_Melaksanakan_KLS_Ibu_Balita', 'Nama_Petugas_Penginput', 'Tanggal_Input', 'Status_Validasi', 
    'Catatan_Validasi', 'Timestamp'
  ],
  KEMATIAN_NEONATAL: [
    'Id_Data', 'Bulan', 'Tahun', 'Id_Puskesmas', 'Nama_Puskesmas', 'Lahir_Hidup_Absolut_L', 'Lahir_Hidup_Absolut_P', 
    'Lahir_Hidup_Total', 'Jml_Bayi_Lahir_Mati', 'Kematian_0_6_Hari', 'Kematian_7_28_Hari', 'Jumlah_Kematian_Neonatal', 
    'Sebab_BBLR', 'Sebab_Asfiksia', 'Sebab_Tetanus_Neonatrum', 'Sebab_Infeksi', 'Sebab_Kelainan_Kongenital', 
    'Sebab_COVID_19', 'Sebab_Lain_Lain', 'Nama_Petugas_Penginput', 'Tanggal_Input', 'Status_Validasi', 
    'Catatan_Validasi', 'Timestamp'
  ],
  KEMATIAN_BALITA: [
    'Id_Data', 'Bulan', 'Tahun', 'Id_Puskesmas', 'Nama_Puskesmas', 'Kematian_Post_Neonatal_29Hr_11Bln', 
    'Sebab_Post_Neo_Pneumonia', 'Sebab_Post_Neo_Diare', 'Sebab_Post_Neo_Kelainan_Kongenital_Jantung', 
    'Sebab_Post_Neo_Meningitis', 'Sebab_Post_Neo_Kelainan_Kongenital_Lain', 'Sebab_Post_Neo_Demam_Berdarah', 
    'Sebab_Post_Neo_Penyakit_Saraf', 'Sebab_Post_Neo_Lain_Lain', 'Kematian_Bayi_0_11_Bln', 'Kematian_Anak_Balita_12_59_Bln', 
    'Sebab_Balita_Diare', 'Sebab_Balita_Demam_Berdarah', 'Sebab_Balita_Pneumonia', 'Sebab_Balita_Kelainan_Kongenital', 
    'Sebab_Balita_Kecelakaan_Lalin', 'Sebab_Balita_Penyakit_Sistem_Saraf', 'Sebab_Balita_Tenggelam', 
    'Sebab_Balita_Infeksi_Parasit', 'Sebab_Balita_Lain_Lain', 'Kematian_Balita_0_59_Bln', 'Nama_Petugas_Penginput', 
    'Tanggal_Input', 'Status_Validasi', 'Catatan_Validasi', 'Timestamp'
  ],
  USER: ['Username', 'ID_Puskesmas', 'Password', 'Role', 'Name', 'Status']
};

export const USER_LIST = [
  { username: 'admin1', password: 'admin001', role: 'admin', name: 'Admin Dinkes 1' },
  { username: 'admin2', password: 'admin002', role: 'admin', name: 'Admin Dinkes 2' },
  { username: 'tareran', password: 'pkmuser001', role: 'puskesmas', name: 'PUSKESMAS TARERAN', id: 'PKM-001' },
  { username: 'suluun', password: 'pkmuser002', role: 'puskesmas', name: 'PUSKESMAS SULUUN', id: 'PKM-002' },
  { username: 'tatapaan', password: 'pkmuser003', role: 'puskesmas', name: 'PUSKESMAS TATAPAAN', id: 'PKM-003' },
  { username: 'tumpaan', password: 'pkmuser004', role: 'puskesmas', name: 'PUSKESMAS TUMPAAN', id: 'PKM-004' },
  { username: 'amurangtimur', password: 'pkmuser005', role: 'puskesmas', name: 'PUSKESMAS AMURANG TIMUR', id: 'PKM-005' },
  { username: 'amurang', password: 'pkmuser006', role: 'puskesmas', name: 'PUSKESMAS AMURANG', id: 'PKM-006' },
  { username: 'amurangbarat', password: 'pkmuser007', role: 'puskesmas', name: 'PUSKESMAS AMURANG BARAT', id: 'PKM-007' },
  { username: 'tenga', password: 'pkmuser008', role: 'puskesmas', name: 'PUSKESMAS TENGA', id: 'PKM-008' },
  { username: 'ongkaw', password: 'pkmuser009', role: 'puskesmas', name: 'PUSKESMAS ONGKAW', id: 'PKM-009' },
  { username: 'kumelembuai', password: 'pkmuser010', role: 'puskesmas', name: 'PUSKESMAS KUMELEMBUAI', id: 'PKM-010' },
  { username: 'motolingtimur', password: 'pkmuser011', role: 'puskesmas', name: 'PUSKESMAS MOTOLING TIMUR', id: 'PKM-011' },
  { username: 'motoling', password: 'pkmuser012', role: 'puskesmas', name: 'PUSKESMAS MOTOLING', id: 'PKM-012' },
  { username: 'motolingbarat', password: 'pkmuser013', role: 'puskesmas', name: 'PUSKESMAS MOTOLING BARAT', id: 'PKM-013' },
  { username: 'poopo', password: 'pkmuser014', role: 'puskesmas', name: 'PUSKESMAS POOPO', id: 'PKM-014' },
  { username: 'tompasobaru', password: 'pkmuser015', role: 'puskesmas', name: 'PUSKESMAS TOMPASO BARU', id: 'PKM-015' },
  { username: 'maesaan', password: 'pkmuser016', role: 'puskesmas', name: 'PUSKESMAS MAESAAN', id: 'PKM-016' },
  { username: 'modoinding', password: 'pkmuser017', role: 'puskesmas', name: 'PUSKESMAS MODOINDING', id: 'PKM-017' },
];
