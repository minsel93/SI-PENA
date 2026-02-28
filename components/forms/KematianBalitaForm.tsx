import React from 'react';

interface FormProps {
  formData: any;
  handleChange: (e: React.ChangeEvent<any>) => void;
  renderInput: (name: string, label: string, type?: string, placeholder?: string, readOnly?: boolean, options?: string[]) => React.ReactNode;
}

export const KematianBalitaForm: React.FC<FormProps> = ({ renderInput }) => {
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
          <i className="fas fa-user-doctor text-rose-600"></i> Data Kematian Balita
        </h3>
      </div>
      {renderInput('Kematian_post_neonatal_(29_hr_-11_bln)', 'Kematian Post Neonatal (29 Hr - 11 Bln)', 'number')}
      {renderInput('Sebab_Kematian_Post_Neonatal_Pneumonia', 'Pneumonia', 'number')}
      {renderInput('Sebab_Kematian_Post_Neonatal_Diare', 'Diare', 'number')}
      {renderInput('Sebab_Kematian_Post_Neonatal_Kelainan_Kongenital(Jantung)', 'Kelainan Kongenital Jantung', 'number')}
      {renderInput('Sebab_Kematian_Post_Neonatal_Meningitis', 'Meningitis', 'number')}
      {renderInput('Sebab_Kematian_Post_Neonatal_Kelainan_Kongenital', 'Kelainan Kongenital', 'number')}
      {renderInput('Sebab_Kematian_Post_Neonatal_Demam_Berdarah', 'Demam Berdarah', 'number')}
      {renderInput('Sebab_Kematian_Post_Neonatal_Penyakit_Saraf', 'Penyakit Saraf', 'number')}
      {renderInput('Sebab_Kematian_Post_Neonatal_Lain-lain', 'Lain-lain', 'number')}
      
      {renderInput('Kematian_Bayi_(0-11_bln)(neonatal+post_neonatal)', 'Total Kematian Bayi (0-11 Bln)', 'number', '', true)}
      {renderInput('Kematian_Anak_Balita(12-59_bulan)', 'Kematian Anak Balita (12-59 Bln)', 'number')}
      
      {renderInput('Anak_Balita_(12_-59_bln)Diare', 'Balita Diare', 'number')}
      {renderInput('Anak_Balita(12-59_bln)Demam_Berdarah', 'Balita Demam Berdarah', 'number')}
      {renderInput('Anak_Balita(12-59_bln)Pneumonia', 'Balita Pneumonia', 'number')}
      {renderInput('Anak_Balita(12-59_bln)Kelainan_Kongenital', 'Balita Kelainan Kongenital', 'number')}
      {renderInput('Anak_Balita(12-59_bln)Kecelakaan_Lalin', 'Balita Kecelakaan Lalin', 'number')}
      {renderInput('Anak_Balita(12-59_bln)Penyakit_Sistem_Saraf', 'Balita Penyakit Sistem Saraf', 'number')}
      {renderInput('Anak_Balita(12-59_bln)Tenggelam', 'Balita Tenggelam', 'number')}
      {renderInput('Anak Balita(12-59_bln)Infeksi_Parasit', 'Balita Infeksi Parasit', 'number')}
      {renderInput('Anak_Balita(12-59_bln)Lain-lain', 'Balita Lain-lain', 'number')}
      
      {renderInput('Kematian_Balita(0-59_bln)(neonatal_+_post_neonatal+anak_balita)', 'Total Kematian Balita (0-59 Bln)', 'number', '', true)}
    </div>
  );
};
