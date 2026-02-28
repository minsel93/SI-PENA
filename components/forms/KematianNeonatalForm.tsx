import React from 'react';

interface FormProps {
  formData: any;
  handleChange: (e: React.ChangeEvent<any>) => void;
  renderInput: (name: string, label: string, type?: string, placeholder?: string, readOnly?: boolean, options?: string[]) => React.ReactNode;
}

export const KematianNeonatalForm: React.FC<FormProps> = ({ renderInput }) => {
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
          <i className="fas fa-baby text-rose-600"></i> Data Kematian Neonatal
        </h3>
      </div>
      {renderInput('Lahir_Hidup_Absolut_(L)', 'Lahir Hidup (L)', 'number')}
      {renderInput('Lahir_Hidup_Absolut_(P)', 'Lahir Hidup (P)', 'number')}
      {renderInput('Lahir_Hidup_Total', 'Total Lahir Hidup', 'number', '', true)}
      {renderInput('JML_BAYI_LAHIR_MATI', 'Jumlah Bayi Lahir Mati', 'number')}
      
      {renderInput('Kematian_Neonatal_Kematian_0-6_hari', 'Kematian 0-6 Hari', 'number')}
      {renderInput('Kematian_Neonatal_Kematian_7-28_hari', 'Kematian 7-28 Hari', 'number')}
      {renderInput('Kematian_Neonatal_Jumlah_Kematian_Neonatal', 'Total Kematian Neonatal', 'number', '', true)}
      
      <div className="md:col-span-2 bg-slate-50 p-6 rounded-2xl border border-slate-200 my-4">
        <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight flex items-center gap-2">
          <i className="fas fa-virus text-rose-600"></i> Penyebab Kematian Neonatal
        </h3>
      </div>
      {renderInput('Sebab_Kematian_Neonatal_BBLR', 'BBLR', 'number')}
      {renderInput('Sebab_Kematian_Neonatal_Asfiksia', 'Asfiksia', 'number')}
      {renderInput('Sebab_Kematian_Neonatal_Tetanus_Neonatrum', 'Tetanus Neonatrum', 'number')}
      {renderInput('Sebab_Kematian_Neonatal_Infeksi', 'Infeksi', 'number')}
      {renderInput('Sebab_Kematian_Neonatal_Kelainan_Kongenital', 'Kelainan Kongenital', 'number')}
      {renderInput('Sebab_Kematian_Neonatal_COVID_19', 'COVID-19', 'number')}
      {renderInput('Sebab_Kematian_Neonatal_Lain-lain', 'Lain-lain', 'number')}
    </div>
  );
};
