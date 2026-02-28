import React from 'react';

interface FormProps {
  formData: any;
  handleChange: (e: React.ChangeEvent<any>) => void;
  renderInput: (name: string, label: string, type?: string, placeholder?: string, readOnly?: boolean, options?: string[]) => React.ReactNode;
}

export const SasaranForm: React.FC<FormProps> = ({ renderInput }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="md:col-span-2 bg-slate-50 p-6 rounded-2xl border border-slate-200 mb-4">
        <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight flex items-center gap-2">
          <i className="fas fa-hospital text-blue-600"></i> Informasi Puskesmas
        </h3>
      </div>
      {renderInput('Bulan', 'Bulan', 'select', '', false, ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'])}
      {renderInput('Tahun', 'Tahun', 'number', '2026')}
      {renderInput('Nama_Puskesmas', 'Nama Puskesmas')}
      {renderInput('Id_Puskesmas', 'ID Puskesmas', 'text', '', true)}

      <div className="md:col-span-2 bg-slate-50 p-6 rounded-2xl border border-slate-200 my-4">
        <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight flex items-center gap-2">
          <i className="fas fa-users text-emerald-600"></i> Indikator Sasaran
        </h3>
      </div>
      {renderInput('Sasaran_Indikator_Sasaran_Lahir_Hidup_(Pusdatin)', 'Sasaran Lahir Hidup (Pusdatin)', 'number')}
      {renderInput('Sasaran_Indikator_Sasaran_"0"Tahun(Surviving_Infant)', 'Sasaran 0 Tahun (Surviving Infant)', 'number')}
      {renderInput('Sasaran_Indikator_Sasaran_0-4_Tahun', 'Sasaran 0-4 Tahun', 'number')}
      {renderInput('Sasaran_Indikator_Sasaran_1-4_Tahun', 'Sasaran 1-4 Tahun', 'number')}
      {renderInput('Sasaran_Indikator_Sasaran_Anak_Pra_Sekolah_(5-6_Th)', 'Sasaran Anak Pra Sekolah (5-6 Th)', 'number')}
      {renderInput('Sasaran_Indikator_Jumlah_Tk', 'Jumlah TK', 'number')}
      {renderInput('Sasaran_Indikator_Jumlah_Sd/Mi', 'Jumlah SD/MI', 'number')}
      {renderInput('Sasaran_Indikator_Jumlah_Smp/Mts', 'Jumlah SMP/MTS', 'number')}
      {renderInput('Sasaran_Indikator_Jumlah_Smu/Smk/Ma', 'Jumlah SMU/SMK/MA', 'number')}
      {renderInput('Sasaran_Indikator_Jumlah_Peserta_Didik_Kelas_1', 'Jumlah Peserta Didik Kelas 1', 'number')}
      {renderInput('Sasaran_Indikator_Jumlah_Peserta_Didik_Kelas_7', 'Jumlah Peserta Didik Kelas 7', 'number')}
      {renderInput('Sasaran_Indikator_Jumlah_Peserta_Didik_Kelas_10', 'Jumlah Peserta Didik Kelas 10', 'number')}
      {renderInput('Sasaran_Indikator_Jumlah_Puskesmas_Panti/Lksa_(Sasaran)', 'Jumlah Puskesmas Panti/LKSA', 'number')}
      {renderInput('Jumlah_SLB_(Sasaran)', 'Jumlah SLB', 'number')}
      {renderInput('Jumlah_Lapas/Rutan_Anak_(Sasaran)_Rs_Memiliki_PPT/PKT', 'Jumlah Lapas/Rutan Anak / RS PPT/PKT', 'number')}
    </div>
  );
};
