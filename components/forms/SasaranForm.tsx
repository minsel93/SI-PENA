import React from 'react';

interface FormProps {
  formData: any;
  handleChange: (e: React.ChangeEvent<any>) => void;
  renderInput: (name: string, label: string, type?: string, placeholder?: string, readOnly?: boolean, options?: string[]) => React.ReactNode;
}

export const SasaranForm: React.FC<FormProps> = ({ renderInput }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="md:col-span-2 bg-slate-50 dark:bg-slate-900 shadow-inner dark:shadow-none p-8 rounded-3xl border border-slate-200 dark:border-white/5 mb-4 transition-colors duration-300">
        <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight flex items-center gap-3">
          <i className="bi bi-hospital text-blue-500"></i> Informasi Puskesmas
        </h3>
      </div>
      {renderInput('Bulan', 'Bulan', 'select', '', false, ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'])}
      {renderInput('Tahun', 'Tahun', 'number', '2026')}
      {renderInput('Nama_Puskesmas', 'Nama Puskesmas')}
      {renderInput('Id_Puskesmas', 'ID Puskesmas', 'text', '', true)}

      <div className="md:col-span-2 bg-slate-50 dark:bg-slate-900 shadow-inner dark:shadow-none p-8 rounded-3xl border border-slate-200 dark:border-white/5 my-6 transition-colors duration-300">
        <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight flex items-center gap-3">
          <i className="bi bi-people text-emerald-500"></i> Indikator Sasaran
        </h3>
      </div>
      {renderInput('Sasaran_Lahir_Hidup_Pusdatin', 'Sasaran Lahir Hidup (Pusdatin)', 'number')}
      {renderInput('Sasaran_0_Tahun_Surviving_Infant', 'Sasaran 0 Tahun (Surviving Infant)', 'number')}
      {renderInput('Sasaran_0_4_Tahun', 'Sasaran 0-4 Tahun', 'number')}
      {renderInput('Sasaran_1_4_Tahun', 'Sasaran 1-4 Tahun', 'number')}
      {renderInput('Sasaran_Anak_Pra_Sekolah_5_6_Th', 'Sasaran Anak Pra Sekolah (5-6 Th)', 'number')}
      {renderInput('Jumlah_TK', 'Jumlah TK', 'number')}
      {renderInput('Jumlah_SD_MI', 'Jumlah SD/MI', 'number')}
      {renderInput('Jumlah_SMP_MTs', 'Jumlah SMP/MTS', 'number')}
      {renderInput('Jumlah_SMU_SMK_MA', 'Jumlah SMU/SMK/MA', 'number')}
      {renderInput('Jumlah_Peserta_Didik_Kelas_1', 'Jumlah Peserta Didik Kelas 1', 'number')}
      {renderInput('Jumlah_Peserta_Didik_Kelas_7', 'Jumlah Peserta Didik Kelas 7', 'number')}
      {renderInput('Jumlah_Peserta_Didik_Kelas_10', 'Jumlah Peserta Didik Kelas 10', 'number')}
      {renderInput('Jumlah_Puskesmas', 'Jumlah Puskesmas', 'number')}
      {renderInput('Jumlah_Panti_LKSA_Sasaran', 'Jumlah Panti LKSA', 'number')}
      {renderInput('Jumlah_SLB_Sasaran', 'Jumlah SLB', 'number')}
      {renderInput('Jumlah_Lapas_Rutan_Anak_Sasaran', 'Jumlah Lapas/Rutan Anak', 'number')}
      {renderInput('Jumlah_RS_Memiliki_PPT_PKT', 'Jumlah RS Memiliki PPT/PKT', 'number')}
    </div>
  );
};
