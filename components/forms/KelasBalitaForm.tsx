import React, { useEffect } from 'react';

interface FormProps {
  formData: any;
  handleChange: (e: React.ChangeEvent<any>) => void;
  renderInput: (name: string, label: string, type?: string, placeholder?: string, readOnly?: boolean, options?: string[]) => React.ReactNode;
}

export const KelasBalitaForm: React.FC<FormProps> = ({ formData, handleChange, renderInput }) => {
  useEffect(() => {
    const v1 = Number(formData.Kelas_0_1_Tahun || 0);
    const v2 = Number(formData.Kelas_1_2_Tahun || 0);
    const v3 = Number(formData.Kelas_2_5_Tahun || 0);
    const total = v1 + v2 + v3;

    if (formData.Total_Ibu_Ikut_Kelas_Ibu_Balita !== total) {
      handleChange({ target: { name: 'Total_Ibu_Ikut_Kelas_Ibu_Balita', value: total } } as any);
    }
  }, [formData, handleChange]);

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
          <i className="bi bi-person-lines-fill text-emerald-500"></i> Data Kelas Ibu Balita
        </h3>
      </div>
      {renderInput('Desa_Dengan_Kelas_Ibu_Balita_Ya', 'Desa Melaksanakan (Ya)', 'number')}
      {renderInput('Desa_Dengan_Kelas_Ibu_Balita_Tidak', 'Desa Melaksanakan (Tidak)', 'number')}
      {renderInput('Jumlah_Kelas_Ibu_Balita', 'Jumlah Kelas Ibu Balita', 'number')}
      
      {renderInput('Kelas_0_1_Tahun', 'Peserta Kelas 0-1 Tahun', 'number')}
      {renderInput('Kelas_1_2_Tahun', 'Peserta Kelas 1-2 Tahun', 'number')}
      {renderInput('Kelas_2_5_Tahun', 'Peserta Kelas 2-5 Tahun', 'number')}
      {renderInput('Total_Ibu_Ikut_Kelas_Ibu_Balita', 'Total Peserta', 'number', '', true)}
    </div>
  );
};
