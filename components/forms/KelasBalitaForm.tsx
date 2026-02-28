import React from 'react';

interface FormProps {
  formData: any;
  handleChange: (e: React.ChangeEvent<any>) => void;
  renderInput: (name: string, label: string, type?: string, placeholder?: string, readOnly?: boolean, options?: string[]) => React.ReactNode;
}

export const KelasBalitaForm: React.FC<FormProps> = ({ renderInput }) => {
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

      <div className="md:col-span-2 bg-slate-50 p-6 rounded-2xl border border-slate-200 my-4">
        <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight flex items-center gap-2">
          <i className="fas fa-chalkboard-user text-emerald-600"></i> Data Kelas Ibu Balita
        </h3>
      </div>
      {renderInput('Desa_dengan_Kelas_Ibu_Balita_Ya', 'Desa Melaksanakan (Ya)', 'number')}
      {renderInput('Desa_dengan_Kelas_Ibu_Balita_Tidak', 'Desa Melaksanakan (Tidak)', 'number')}
      {renderInput('Jumlah_Kelas_Ibu_Balita', 'Jumlah Kelas Ibu Balita', 'number')}
      
      {renderInput('Jumlah_Ibu_yang_Mengikuti_Kelas_Ibu_Balita_Kelas_0_-1_Tahun', 'Peserta Kelas 0-1 Tahun', 'number')}
      {renderInput('Jumlah_Ibu_yang_Mengikuti_Kelas_Ibu_Balita_Kelas_1-2_Tahun', 'Peserta Kelas 1-2 Tahun', 'number')}
      {renderInput('Jumlah_Ibu_yang_Mengikuti_Kelas_Ibu_Balita_Kelas_2-_5_Tahun', 'Peserta Kelas 2-5 Tahun', 'number')}
      {renderInput('Total_Ibu_Yang_ikut_KLS_Ibu_Balita', 'Total Peserta', 'number', '', true)}
    </div>
  );
};
