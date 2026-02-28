import React from 'react';

interface FormProps {
  formData: any;
  handleChange: (e: React.ChangeEvent<any>) => void;
  renderInput: (name: string, label: string, type?: string, placeholder?: string, readOnly?: boolean, options?: string[]) => React.ReactNode;
}

export const KelasBalitaKabKotaForm: React.FC<FormProps> = ({ renderInput }) => {
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
          <i className="fas fa-city text-emerald-600"></i> Rekapitulasi Kab/Kota
        </h3>
      </div>
      {renderInput('Jumlah_Puskesmas', 'Jumlah Puskesmas', 'number')}
      {renderInput('Jumlah_Desa_atau_Kelurahan', 'Jumlah Desa/Kelurahan', 'number')}
      {renderInput('Jumlah_Desa_dengan_Kelas_Ibu_Balita_Abs_Desa_dengan_Kelas_Ibu_Balita_%', 'Desa Melaksanakan (Abs/%)', 'text')}
      {renderInput('Jumlah_Kelas_Ibu_Balita', 'Jumlah Kelas Ibu Balita', 'number')}
      {renderInput('Jumlah_Ibu_yang_mengikuti_Kelas_Ibu_Balita', 'Jumlah Ibu Peserta', 'number')}
      {renderInput('Puskesmas_Melaksanakan_Kelas_Ibu_Balita_di_50%_Desa_atau_Kelurahan', 'PKM Melaksanakan >50%', 'select', '', false, ['Ya', 'Tidak'])}
      {renderInput('%_Desa_Melaksanakan_KLS_Ibu_Balita', '% Desa Melaksanakan', 'number', '', true)}
    </div>
  );
};
