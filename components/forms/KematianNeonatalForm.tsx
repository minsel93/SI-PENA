import React, { useEffect } from 'react';

interface FormProps {
  formData: any;
  handleChange: (e: React.ChangeEvent<any>) => void;
  renderInput: (name: string, label: string, type?: string, placeholder?: string, readOnly?: boolean, options?: string[]) => React.ReactNode;
}

export const KematianNeonatalForm: React.FC<FormProps> = ({ formData, handleChange, renderInput }) => {
  useEffect(() => {
    const l = Number(formData.Lahir_Hidup_Absolut_L || 0);
    const p = Number(formData.Lahir_Hidup_Absolut_P || 0);
    const lhTotal = l + p;

    const k1 = Number(formData.Kematian_0_6_Hari || 0);
    const k2 = Number(formData.Kematian_7_28_Hari || 0);
    const knTotal = k1 + k2;

    if (formData.Lahir_Hidup_Total !== lhTotal) {
      handleChange({ target: { name: 'Lahir_Hidup_Total', value: lhTotal } } as any);
    }
    if (formData.Jumlah_Kematian_Neonatal !== knTotal) {
      handleChange({ target: { name: 'Jumlah_Kematian_Neonatal', value: knTotal } } as any);
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
          <i className="bi bi-heart-pulse-fill text-rose-500"></i> Data Kematian Neonatal
        </h3>
      </div>
      {renderInput('Lahir_Hidup_Absolut_L', 'Lahir Hidup (L)', 'number')}
      {renderInput('Lahir_Hidup_Absolut_P', 'Lahir Hidup (P)', 'number')}
      {renderInput('Lahir_Hidup_Total', 'Total Lahir Hidup', 'number', '', true)}
      {renderInput('Jml_Bayi_Lahir_Mati', 'Jumlah Bayi Lahir Mati', 'number')}
      
      {renderInput('Kematian_0_6_Hari', 'Kematian 0-6 Hari', 'number')}
      {renderInput('Kematian_7_28_Hari', 'Kematian 7-28 Hari', 'number')}
      {renderInput('Jumlah_Kematian_Neonatal', 'Total Kematian Neonatal', 'number', '', true)}
      
      <div className="md:col-span-2 bg-slate-50 dark:bg-slate-900 shadow-inner dark:shadow-none p-8 rounded-3xl border border-slate-200 dark:border-white/5 my-6 transition-colors duration-300">
        <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight flex items-center gap-3">
          <i className="bi bi-virus text-rose-500"></i> Penyebab Kematian Neonatal
        </h3>
      </div>
      {renderInput('Sebab_BBLR', 'BBLR', 'number')}
      {renderInput('Sebab_Asfiksia', 'Asfiksia', 'number')}
      {renderInput('Sebab_Tetanus_Neonatrum', 'Tetanus Neonatrum', 'number')}
      {renderInput('Sebab_Infeksi', 'Infeksi', 'number')}
      {renderInput('Sebab_Kelainan_Kongenital', 'Kelainan Kongenital', 'number')}
      {renderInput('Sebab_COVID_19', 'COVID-19', 'number')}
      {renderInput('Sebab_Lain_Lain', 'Lain-lain', 'number')}
    </div>
  );
};
