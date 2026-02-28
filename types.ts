
export enum FormType {
  DASHBOARD = 'DASHBOARD',
  SASARAN = 'FORM_SASARAN',
  KEGIATAN = 'FORM_KEGIATAN',
  RPJMN = 'FORM_RPJMN',
  KELAS_BALITA = 'FORM_KELAS_BALITA',
  KELAS_BALITA_KAB_KOTA = 'FORM_KELAS_BALITA_KAB_KOTA',
  KEMATIAN_NEONATAL = 'FORM_KEMATIAN_NEONATAL',
  KEMATIAN_BALITA = 'FORM_KEMATIAN_BALITA',
  USER = 'FORM_USER',
  AI_INSIGHTS = 'AI_INSIGHTS'
}

export interface SasaranData {
  Id_Data?: string;
  Bulan: string;
  Tahun: string;
  Id_Puskesmas: string;
  Nama_Puskesmas: string;
  "Sasaran_Indikator_Sasaran_Lahir_Hidup_(Pusdatin)": number;
  'Sasaran_Indikator_Sasaran_"0"Tahun(Surviving_Infant)': number;
  "Sasaran_Indikator_Sasaran_0-4_Tahun": number;
  "Sasaran_Indikator_Sasaran_1-4_Tahun": number;
  "Sasaran_Indikator_Sasaran_Anak_Pra_Sekolah_(5-6_Th)": number;
  "Sasaran_Indikator_Jumlah_Tk": number;
  "Sasaran_Indikator_Jumlah_Sd/Mi": number;
  "Sasaran_Indikator_Jumlah_Smp/Mts": number;
  "Sasaran_Indikator_Jumlah_Smu/Smk/Ma": number;
  "Sasaran_Indikator_Jumlah_Peserta_Didik_Kelas_1": number;
  "Sasaran_Indikator_Jumlah_Peserta_Didik_Kelas_7": number;
  "Sasaran_Indikator_Jumlah_Peserta_Didik_Kelas_10": number;
  "Sasaran_Indikator_Jumlah_Puskesmas_Panti/Lksa_(Sasaran)": number;
  "Jumlah_SLB_(Sasaran)": number;
  "Jumlah_Lapas/Rutan_Anak_(Sasaran)_Rs_Memiliki_PPT/PKT": number;
  Nama_Petugas_Penginput: string;
  Tanggal_Input: string;
  Status_Validasi: string;
  Catatan_Validasi: string;
}

export interface KegiatanData {
  Id_Data?: string;
  Bulan: string;
  Tahun: string;
  Id_Puskesmas: string;
  Nama_Puskesmas: string;
  "Sasaran_Lahir_Hidup_(Pudatin)": number;
  "Sasaran_Lahir_Hidup_Spm_(Pkm)": number;
  Sasaran_Neonatus_Komplikasi: number;
  "Sasaran_Komplikasi_Neonatus_(Spm)": number;
  Kunjungan_Neonatal_Kn_1_L: number;
  Kunjungan_Neonatal_Kn_1_P: number;
  Kunjungan_Neonatal_Kn_1_Jml: number;
  Kunjungan_Neonatal_Kn_1_Abs: number;
  "Kunjungan_Neonatal_Kn_1_%(Pusdatin)": number;
  "Kunjungan_Neonatal_Kn_1%(Spm)": number;
  Kunjungan_Neonatal_Kn_Lengkap_L: number;
  Kunjungan_Neonatal_Kn_Lengkap_P: number;
  Kunjungan_Neonatal_Kn_Lengkap_Jml: number;
  Kunjungan_Neonatal_Kn_Lengkap_Abs: number;
  "Kunjungan_Neonatal_Kn_Lengkap%(Pusdatin)": number;
  "Kunjungan_Neonatal_Kn_Lengkap%(Spm)": number;
  Kunjungan_Neonatal_Neonatus_Komplikasi_Yang_Ditangani_L: number;
  Kunjungan_Neonatal_Neonatus_Komplikasi_Yang_Ditangani_P: number;
  Kunjungan_Neonatal_Neonatus_Komplikasi_Yang_Ditangani_Jml: number;
  Kunjungan_Neonatal_Neonatus_Komplikasi_Yang_Ditangani_Abs: number;
  "Kunjungan_Neonatal_Neonatus_Komplikasi_Yang_Ditangani%(Pusdatin)": number;
  "Kunjungan_Neonatal_Neonatus_Komplikasi_Yang_Ditangani%(Spm)": number;
  Kunjungan_Bayi_L: number;
  Kunjungan_Bayi_P: number;
  Kunjungan_Bayi_Jml: number;
  Kunjungan_Bayi_Abs: number;
  "Kunjungan_Bayi%(Pusdatin)": number;
  "Kunjungan_Bayi%(Spm)": number;
  "Sasaran_Anak_Balita_0-4_Thn(Pusdatin)": number;
  "Sasaran_Balita_(Spm)": number;
  Pelayanan_Kesehatan_Anak_Balita_L: number;
  Pelayanan_Kesehatan_Anak_Balita_P: number;
  Pelayanan_Kesehatan_Anak_Balita_Jml: number;
  Pelayanan_Kesehatan_Anak_Balita_Abs: number;
  "Pelayanan_Kesehatan_Anak_Balita_%(Pusdatin)": number;
  "Pelayanan_Kesehatan_Anak_Balita%(Spm)": number;
  Indikator_Spm_Pelayanan_Kesehatan_Balita_Abs: number;
  "Indikator_Spm_Pelayanan_Kesehatan_Balita%": number;
  Jumlah_Balita_Yang_Memiliki_Dan_Menggunakan_Buku_Kia: number;
  Nama_Petugas_Penginput: string;
  Tanggal_Input: string;
  Status_Validasi: string;
  Catatan_Validasi: string;
}

export interface RPJMNData {
  Id_Data?: string;
  Bulan: string;
  Tahun: string;
  Id_Puskesmas: string;
  Nama_Puskesmas: string;
  "Sasaran_Lahir_Hidup_(Pusdatin)": number;
  "Jumlah_bayi_baru_lahir_usia_0-28_hari_yang_mendapatkan_pelayanan_sesuai_standar_(KN_Lengkap)Abs": number;
  "Jumlah_bayi_baru_lahir_usia_0-28_hari_yang_mendapatkan_pelayanan_sesuai_standar(KN_Lengkap)%": number;
  "Sasaran_Balita_SPM_Kab_Minsel(0-4_Thn)": number;
  "Sasaran_Balita(Pusdatin)": number;
  Jumlah_Balita_yang_Dipantau_Pertumbuhan_dan_Perkembangan_Abs: number;
  "Jumlah_Balita_yang_Dipantau_Pertumbuhan_dan_Perkembangan_%(SPM_Kab)": number;
  "Jumlah_Balita_yang_Dipantau_Pertumbuhan_dan_Perkembangan%(Pusdatin)": number;
  Jumlah_Balita_Berobat_Abs: number;
  "Jumlah_Balita_Berobat%Pusdatin": number;
  "Jumlah_Balita_Berobat%SPM_Kab": number;
  Jumlah_Balita_MTBS_Abs: number;
  "Jumlah_Balita_MTBS%Pusdatin": number;
  "Jumlah_Balita_MTBS%SPM_Kab": number;
  Jumlah_Balita_SDIDTK_Abs: number;
  "Jumlah_Balita_SDIDTK%Pusdatin": number;
  "Jumlah_Balita_SDIDTK%SPM_Kab": number;
  Jumlah_Puskesmas: number;
  "Jumlah_puskesmas_melaksanakan_kelas_ibu_balita_di_50%desa/kelurahan_Abs": number;
  "Jumlah_puskesmas_melaksanakan_kelas_ibu_balita_di_50%desa/kelurahan%": number;
  Jumlah_Puskesmas_melaksanakan_pendekatan_MTBS_Abs: number;
  "Jumlah_Puskesmas_melaksanakan_pendekatan_MTBS%": number;
  Jumlah_Puskesmas_melaksanakan_SDIDTK_Abs: number;
  "Jumlah_Puskesmas_melaksanakan_SDIDTK%": number;
  "Kab/Kota_Menyelenggarakan_Pelayanan_Kesehatan_Balita_Ya": string;
  "Kab/Kota_Menyelenggarakan_Pelayanan_Kesehatan_Balita_Tidak": string;
  Nama_Petugas_Penginput: string;
  Tanggal_Input: string;
  Status_Validasi: string;
  Catatan_Validasi: string;
}

export interface KelasBalitaData {
  Id_Data?: string;
  Bulan: string;
  Tahun: string;
  Nama_Puskesmas: string;
  Desa_dengan_Kelas_Ibu_Balita_Ya: number;
  Desa_dengan_Kelas_Ibu_Balita_Tidak: number;
  Jumlah_Kelas_Ibu_Balita: number;
  "Jumlah_Ibu_yang_Mengikuti_Kelas_Ibu_Balita_Kelas_0_-1_Tahun": number;
  "Jumlah_Ibu_yang_Mengikuti_Kelas_Ibu_Balita_Kelas_1-2_Tahun": number;
  "Jumlah_Ibu_yang_Mengikuti_Kelas_Ibu_Balita_Kelas_2-_5_Tahun": number;
  Total_Ibu_Yang_ikut_KLS_Ibu_Balita: number;
  Nama_Petugas_Penginput: string;
  Tanggal_Input: string;
  Status_Validasi: string;
  Catatan_Validasi: string;
}

export interface KelasBalitaKabKotaData {
  Id_Data?: string;
  Bulan: string;
  Tahun: string;
  Nama_Puskesmas: string;
  Jumlah_Puskesmas: number;
  Jumlah_Desa_atau_Kelurahan: number;
  "Jumlah_Desa_dengan_Kelas_Ibu_Balita_Abs_Desa_dengan_Kelas_Ibu_Balita_%": string;
  Jumlah_Kelas_Ibu_Balita: number;
  Jumlah_Ibu_yang_mengikuti_Kelas_Ibu_Balita: number;
  "Puskesmas_Melaksanakan_Kelas_Ibu_Balita_di_50%_Desa_atau_Kelurahan": string;
  "%_Desa_Melaksanakan_KLS_Ibu_Balita": number;
  Nama_Petugas_Penginput: string;
  Tanggal_Input: string;
  Status_Validasi: string;
  Catatan_Validasi: string;
}

export interface KematianNeonatalData {
  Id_Data?: string;
  Bulan: string;
  Tahun: string;
  Nama_Puskesmas: string;
  "Lahir_Hidup_Absolut_(L)": number;
  "Lahir_Hidup_Absolut_(P)": number;
  Lahir_Hidup_Total: number;
  JML_BAYI_LAHIR_MATI: number;
  "Kematian_Neonatal_Kematian_0-6_hari": number;
  "Kematian_Neonatal_Kematian_7-28_hari": number;
  Kematian_Neonatal_Jumlah_Kematian_Neonatal: number;
  Sebab_Kematian_Neonatal_BBLR: number;
  Sebab_Kematian_Neonatal_Asfiksia: number;
  Sebab_Kematian_Neonatal_Tetanus_Neonatrum: number;
  Sebab_Kematian_Neonatal_Infeksi: number;
  Sebab_Kematian_Neonatal_Kelainan_Kongenital: number;
  Sebab_Kematian_Neonatal_COVID_19: number;
  "Sebab_Kematian_Neonatal_Lain-lain": number;
  Nama_Petugas_Penginput: string;
  Tanggal_Input: string;
  Status_Validasi: string;
  Catatan_Validasi: string;
}

export interface KematianBalitaData {
  Id_Data?: string;
  Bulan: string;
  Tahun: string;
  Nama_Puskesmas: string;
  "Kematian_post_neonatal_(29_hr_-11_bln)": number;
  Sebab_Kematian_Post_Neonatal_Pneumonia: number;
  Sebab_Kematian_Post_Neonatal_Diare: number;
  "Sebab_Kematian_Post_Neonatal_Kelainan_Kongenital(Jantung)": number;
  Sebab_Kematian_Post_Neonatal_Meningitis: number;
  Sebab_Kematian_Post_Neonatal_Kelainan_Kongenital: number;
  Sebab_Kematian_Post_Neonatal_Demam_Berdarah: number;
  Sebab_Kematian_Post_Neonatal_Penyakit_Saraf: number;
  "Sebab_Kematian_Post_Neonatal_Lain-lain": number;
  "Kematian_Bayi_(0-11_bln)(neonatal+post_neonatal)": number;
  "Kematian_Anak_Balita(12-59_bulan)": number;
  "Anak_Balita_(12_-59_bln)Diare": number;
  "Anak_Balita(12-59_bln)Demam_Berdarah": number;
  "Anak_Balita(12-59_bln)Pneumonia": number;
  "Anak_Balita(12-59_bln)Kelainan_Kongenital": number;
  "Anak_Balita(12-59_bln)Kecelakaan_Lalin": number;
  "Anak_Balita(12-59_bln)Penyakit_Sistem_Saraf": number;
  "Anak_Balita(12-59_bln)Tenggelam": number;
  "Anak Balita(12-59_bln)Infeksi_Parasit": number;
  "Anak_Balita(12-59_bln)Lain-lain": number;
  "Kematian_Balita(0-59_bln)(neonatal_+_post_neonatal+anak_balita)": number;
  Nama_Petugas_Penginput: string;
  Tanggal_Input: string;
  Status_Validasi: string;
  Catatan_Validasi: string;
}

export interface UserData {
  Username: string;
  ID_Puskesmas: string;
  Password?: string;
  Role: string;
  Name: string;
  Status_Validasi?: string;
  Catatan_Validasi?: string;
}

export interface User {
  username: string;
  role: 'admin' | 'puskesmas';
  puskesmasName?: string;
  puskesmasId?: string;
}

export interface AppState {
  currentForm: FormType;
  records: {
    sasaran: SasaranData[];
    kegiatan: KegiatanData[];
    rpjmn: RPJMNData[];
    kelasBalita: KelasBalitaData[];
    kelasBalitaKabKota: KelasBalitaKabKotaData[];
    kematianNeonatal: KematianNeonatalData[];
    kematianBalita: KematianBalitaData[];
    users: UserData[];
  };
  isLoading: boolean;
  notification: { message: string; type: 'success' | 'error' | null } | null;
  editingData?: { type: FormType; data: any };
  isAdmin?: boolean;
  isAuthenticated: boolean;
  currentUser: User | null;
}
