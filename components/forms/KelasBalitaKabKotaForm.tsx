import React, { useEffect } from 'react';

interface FormProps {
  formData: any;
  handleChange: (e: React.ChangeEvent<any>) => void;
  renderInput: (name: string, label: string, type?: string, placeholder?: string, readOnly?: boolean, options?: string[]) => React.ReactNode;
}

export const KelasBalitaKabKotaForm: React.FC<FormProps> = ({ formData, handleChange, renderInput }) => {
  useEffect(() => {
    const totalDesa = Number(formData.Jumlah_Desa_Kelurahan || 0);
    const absDesa = Number(formData.Desa_Dengan_Kelas_Ibu_Balita_Abs || 0);

    if (totalDesa > 0) {
      const persen = ((absDesa / totalDesa) * 100).toFixed(2);
      if (formData.Desa_Dengan_Kelas_Ibu_Balita_Persen != persen) {
        handleChange({ target: { name: 'Desa_Dengan_Kelas_Ibu_Balita_Persen', value: persen } } as any);
      }
      if (formData.Persen_Desa_Melaksanakan_KLS_Ibu_Balita != persen) {
        handleChange({ target: { name: 'Persen_Desa_Melaksanakan_KLS_Ibu_Balita', value: persen } } as any);
      }
    }

    const totalPkm = Number(formData.Jumlah_Puskesmas || 0);
    const pkmAbs = Number(formData.Puskesmas_Kelas_Ibu_Balita_50_Persen_Desa_Abs || 0);

    if (totalPkm > 0) {
      const pkmPersen = ((pkmAbs / totalPkm) * 100).toFixed(2);
      if (formData.Puskesmas_Kelas_Ibu_Balita_50_Persen_Desa_Persen != pkmPersen) {
        handleChange({ target: { name: 'Puskesmas_Kelas_Ibu_Balita_50_Persen_Desa_Persen', value: pkmPersen } } as any);
      }
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
          <i className="bi bi-building text-emerald-500"></i> Rekapitulasi Kab/Kota
        </h3>
      </div>
      {renderInput('Jumlah_Puskesmas', 'Jumlah Puskesmas', 'number')}
      {renderInput('Jumlah_Desa_Kelurahan', 'Jumlah Desa/Kelurahan', 'number')}
      {renderInput('Desa_Dengan_Kelas_Ibu_Balita_Abs', 'Desa Melaksanakan (Abs)', 'number')}
      {renderInput('Desa_Dengan_Kelas_Ibu_Balita_Persen', 'Desa Melaksanakan (%)', 'number', '', true)}
      {renderInput('Persen_Desa_Melaksanakan_KLS_Ibu_Balita', '% Desa Melaksanakan (Compatibility)', 'number', '', true)}
      
      {renderInput('Jumlah_Kelas_Ibu_Balita_yang_Ada', 'Jumlah Kelas Ada', 'number')}
      {renderInput('Jumlah_Ibu_Balita_yang_Ada', 'Jumlah Ibu Ada', 'number')}
      {renderInput('Puskesmas_Kelas_Ibu_Balita_50_Persen_Desa_Abs', 'PKM Melaksanakan (50% Desa) Abs', 'number')}
      {renderInput('Puskesmas_Kelas_Ibu_Balita_50_Persen_Desa_Persen', 'PKM Melaksanakan (50% Desa) %', 'number', '', true)}
    </div>
  );
};
