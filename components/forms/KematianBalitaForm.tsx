import React, { useEffect } from 'react';

interface FormProps {
  formData: any;
  handleChange: (e: React.ChangeEvent<any>) => void;
  renderInput: (name: string, label: string, type?: string, placeholder?: string, readOnly?: boolean, options?: string[]) => React.ReactNode;
}

export const KematianBalitaForm: React.FC<FormProps> = ({ formData, handleChange, renderInput }) => {
  useEffect(() => {
    const neo = Number(formData.Jumlah_Kematian_Neonatal || 0);
    const postNeo = Number(formData.Kematian_Post_Neonatal_29Hr_11Bln || 0);
    const bay011 = neo + postNeo;
    
    const bal1259 = Number(formData.Kematian_Anak_Balita_12_59_Bln || 0);
    const total = bay011 + bal1259;

    const updateEvent = (name: string, value: any) => {
      if (formData[name] != value) {
        handleChange({ target: { name, value } } as any);
      }
    };

    updateEvent('Kematian_Bayi_0_11_Bln', bay011);
    updateEvent('Kematian_Balita_0_59_Bln', total);
  }, [formData, handleChange]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div className="md:col-span-2 lg:col-span-3 bg-slate-50 dark:bg-slate-900 shadow-inner dark:shadow-none p-8 rounded-3xl border border-slate-200 dark:border-white/5 mb-4 transition-colors duration-300">
        <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight flex items-center gap-3">
          <i className="bi bi-hospital text-blue-500"></i> Informasi Puskesmas
        </h3>
      </div>
      {renderInput('Bulan', 'Bulan', 'select', '', false, ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'])}
      {renderInput('Tahun', 'Tahun', 'number', '2026')}
      {renderInput('Nama_Puskesmas', 'Nama Puskesmas')}
      {renderInput('Id_Puskesmas', 'ID Puskesmas', 'text', '', true)}

      <div className="md:col-span-2 lg:col-span-3 bg-slate-50 dark:bg-slate-900 shadow-inner dark:shadow-none p-8 rounded-3xl border border-slate-200 dark:border-white/5 my-6 transition-colors duration-300">
        <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight flex items-center gap-3">
          <i className="bi bi-person-x-fill text-rose-500"></i> Kematian Post Neonatal & Bayi
        </h3>
      </div>
      {renderInput('Jumlah_Kematian_Neonatal', 'Kematian Neonatal', 'number')}
      {renderInput('Kematian_Post_Neonatal_29Hr_11Bln', 'Kematian Post Neonatal', 'number')}
      {renderInput('Sebab_Post_Neo_Pneumonia', 'Pneumonia', 'number')}
      {renderInput('Sebab_Post_Neo_Diare', 'Diare', 'number')}
      {renderInput('Sebab_Post_Neo_Kelainan_Kongenital_Jantung', 'Kelainan Jantung', 'number')}
      {renderInput('Sebab_Post_Neo_Meningitis', 'Meningitis', 'number')}
      {renderInput('Sebab_Post_Neo_Kelainan_Kongenital_Lain', 'Kelainan Kongenital', 'number')}
      {renderInput('Sebab_Post_Neo_Demam_Berdarah', 'Demam Berdarah', 'number')}
      {renderInput('Sebab_Post_Neo_Penyakit_Saraf', 'Penyakit Saraf', 'number')}
      {renderInput('Sebab_Post_Neo_Lain_Lain', 'Lain-lain', 'number')}
      
      {renderInput('Kematian_Bayi_0_11_Bln', 'Total Kematian Bayi', 'number', '', true)}
      
      <div className="md:col-span-2 lg:col-span-3 bg-slate-50 dark:bg-slate-900 shadow-inner dark:shadow-none p-8 rounded-3xl border border-slate-200 dark:border-white/5 my-6 transition-colors duration-300">
        <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight flex items-center gap-3">
          <i className="bi bi-person-x text-amber-500"></i> Kematian Anak Balita (12-59 Bulan)
        </h3>
      </div>
      {renderInput('Kematian_Anak_Balita_12_59_Bln', 'Kematian Anak Balita', 'number')}
      {renderInput('Sebab_Balita_Diare', 'Diare', 'number')}
      {renderInput('Sebab_Balita_Demam_Berdarah', 'Demam Berdarah', 'number')}
      {renderInput('Sebab_Balita_Pneumonia', 'Pneumonia', 'number')}
      {renderInput('Sebab_Balita_Kelainan_Kongenital', 'Kelainan Kongenital', 'number')}
      {renderInput('Sebab_Balita_Kecelakaan_Lalin', 'Kecelakaan Lalin', 'number')}
      {renderInput('Sebab_Balita_Penyakit_Sistem_Saraf', 'Penyakit Sistem Saraf', 'number')}
      {renderInput('Sebab_Balita_Tenggelam', 'Tenggelam', 'number')}
      {renderInput('Sebab_Balita_Infeksi_Parasit', 'Infeksi Parasit', 'number')}
      {renderInput('Sebab_Balita_Lain_Lain', 'Lain-lain', 'number')}
      
      <div className="md:col-span-2 lg:col-span-3 h-px bg-slate-200 dark:bg-white/5 my-8"></div>
      <div className="md:col-span-2 lg:col-span-3">
        {renderInput('Kematian_Balita_0_59_Bln', 'Total Kematian Balita (0-59 Bln)', 'number', '', true)}
      </div>
    </div>
  );
};
