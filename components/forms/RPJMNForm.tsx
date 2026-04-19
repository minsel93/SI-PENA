import React, { useEffect } from 'react';

interface FormProps {
  formData: any;
  handleChange: (e: React.ChangeEvent<any>) => void;
  renderInput: (name: string, label: string, type?: string, placeholder?: string, readOnly?: boolean, options?: string[]) => React.ReactNode;
}

export const RPJMNForm: React.FC<FormProps> = ({ formData, handleChange, renderInput }) => {
  useEffect(() => {
    const sLahirPusdatin = Number(formData.Sasaran_Lahir_Hidup_Pusdatin || 0);
    const sBalitaSPM_Kab = Number(formData.Sasaran_Balita_SPM_Kab_Minsel_0_4_Th || 0);
    const sBalitaPusdatin = Number(formData.Sasaran_Balita_Pusdatin || 0);
    const totalPuskesmas = Number(formData.Jumlah_Puskesmas || 0);

    const updateEvent = (name: string, value: any) => {
      if (formData[name] != value && !isNaN(Number(value))) {
        handleChange({ target: { name, value } } as any);
      }
    };

    // Calculations
    if (sLahirPusdatin > 0) {
      updateEvent('KN_Lengkap_Persen', ((Number(formData.KN_Lengkap_Abs || 0) / sLahirPusdatin) * 100).toFixed(2));
    }

    if (sBalitaSPM_Kab > 0) {
      updateEvent('Balita_Dipantau_Tumbuh_Kembang_Persen_SPM_Kab', ((Number(formData.Balita_Dipantau_Tumbuh_Kembang_Abs || 0) / sBalitaSPM_Kab) * 100).toFixed(2));
      updateEvent('Jumlah_Balita_Berobat_Persen_SPM_Kab', ((Number(formData.Jumlah_Balita_Berobat_Abs || 0) / sBalitaSPM_Kab) * 100).toFixed(2));
      updateEvent('Jumlah_Balita_SDIDTK_Persen_SPM_Kab', ((Number(formData.Jumlah_Balita_SDIDTK_Abs || 0) / sBalitaSPM_Kab) * 100).toFixed(2));
    }

    if (sBalitaPusdatin > 0) {
      updateEvent('Balita_Dipantau_Tumbuh_Kembang_Persen_Pusdatin', ((Number(formData.Balita_Dipantau_Tumbuh_Kembang_Abs || 0) / sBalitaPusdatin) * 100).toFixed(2));
      updateEvent('Jumlah_Balita_Berobat_Persen_Pusdatin', ((Number(formData.Jumlah_Balita_Berobat_Abs || 0) / sBalitaPusdatin) * 100).toFixed(2));
      updateEvent('Jumlah_Balita_SDIDTK_Persen_Pusdatin', ((Number(formData.Jumlah_Balita_SDIDTK_Abs || 0) / sBalitaPusdatin) * 100).toFixed(2));
    }

    // Special formula for MTBS %: (MTBS_Abs / Berobat_Abs) * 100
    const berobatAbs = Number(formData.Jumlah_Balita_Berobat_Abs || 0);
    if (berobatAbs > 0) {
      const mtbsAbs = Number(formData.Jumlah_Balita_MTBS_Abs || 0);
      const mtbsPersen = ((mtbsAbs / berobatAbs) * 100).toFixed(2);
      updateEvent('Jumlah_Balita_MTBS_Persen_Pusdatin', mtbsPersen);
      updateEvent('Jumlah_Balita_MTBS_Persen_SPM_Kab', mtbsPersen);
    } else {
      updateEvent('Jumlah_Balita_MTBS_Persen_Pusdatin', "0.00");
      updateEvent('Jumlah_Balita_MTBS_Persen_SPM_Kab', "0.00");
    }

    if (totalPuskesmas > 0) {
      updateEvent('Puskesmas_Kelas_Ibu_Balita_50_Persen_Desa_Persen', ((Number(formData.Puskesmas_Kelas_Ibu_Balita_50_Persen_Desa_Abs || 0) / totalPuskesmas) * 100).toFixed(2));
      updateEvent('Puskesmas_Melaksanakan_MTBS_Persen', ((Number(formData.Puskesmas_Melaksanakan_MTBS_Abs || 0) / totalPuskesmas) * 100).toFixed(2));
      updateEvent('Puskesmas_Melaksanakan_SDIDTK_Persen', ((Number(formData.Puskesmas_Melaksanakan_SDIDTK_Abs || 0) / totalPuskesmas) * 100).toFixed(2));
    }
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
          <i className="bi bi-graph-up text-emerald-500"></i> Indikator RPJMN & RENSTRA
        </h3>
      </div>
      {renderInput('Sasaran_Lahir_Hidup_Pusdatin', 'Sasaran Lahir Hidup (Pusdatin)', 'number')}
      {renderInput('KN_Lengkap_Abs', 'KN Lengkap (Abs)', 'number')}
      {renderInput('KN_Lengkap_Persen', 'KN Lengkap (%)', 'number', '', true)}
      
      {renderInput('Sasaran_Balita_SPM_Kab_Minsel_0_4_Th', 'Sasaran Balita SPM (0-4 Th)', 'number')}
      {renderInput('Sasaran_Balita_Pusdatin', 'Sasaran Balita (Pusdatin)', 'number')}
      
      {renderInput('Balita_Dipantau_Tumbuh_Kembang_Abs', 'Balita Dipantau (Abs)', 'number')}
      {renderInput('Balita_Dipantau_Tumbuh_Kembang_Persen_SPM_Kab', 'Balita Dipantau % (SPM)', 'number', '', true)}
      {renderInput('Balita_Dipantau_Tumbuh_Kembang_Persen_Pusdatin', 'Balita Dipantau % (Pusdatin)', 'number', '', true)}

      {renderInput('Jumlah_Balita_Berobat_Abs', 'Balita Berobat (Abs)', 'number')}
      {renderInput('Jumlah_Balita_Berobat_Persen_Pusdatin', 'Balita Berobat % (Pusdatin)', 'number', '', true)}
      {renderInput('Jumlah_Balita_Berobat_Persen_SPM_Kab', 'Balita Berobat % (SPM)', 'number', '', true)}

      {renderInput('Jumlah_Balita_MTBS_Abs', 'Balita MTBS (Abs)', 'number')}
      {renderInput('Jumlah_Balita_MTBS_Persen_Pusdatin', 'Balita MTBS % (Pusdatin)', 'number', '', true)}
      {renderInput('Jumlah_Balita_MTBS_Persen_SPM_Kab', 'Balita MTBS % (SPM)', 'number', '', true)}

      {renderInput('Jumlah_Balita_SDIDTK_Abs', 'Balita SDIDTK (Abs)', 'number')}
      {renderInput('Jumlah_Balita_SDIDTK_Persen_Pusdatin', 'Balita SDIDTK % (Pusdatin)', 'number', '', true)}
      {renderInput('Jumlah_Balita_SDIDTK_Persen_SPM_Kab', 'Balita SDIDTK % (SPM)', 'number', '', true)}

      <div className="md:col-span-2 lg:col-span-3 bg-slate-50 dark:bg-slate-900 shadow-inner dark:shadow-none p-8 rounded-3xl border border-slate-200 dark:border-white/5 my-6 transition-colors duration-300">
        <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight flex items-center gap-3">
          <i className="bi bi-building text-blue-500"></i> Indikator Puskesmas
        </h3>
      </div>
      {renderInput('Jumlah_Puskesmas', 'Jumlah Puskesmas', 'number')}
      {renderInput('Puskesmas_Kelas_Ibu_Balita_50_Persen_Desa_Abs', 'Puskesmas Kelas Ibu (Abs)', 'number')}
      {renderInput('Puskesmas_Kelas_Ibu_Balita_50_Persen_Desa_Persen', 'Puskesmas Kelas Ibu (%)', 'number', '', true)}
      
      {renderInput('Puskesmas_Melaksanakan_MTBS_Abs', 'Puskesmas MTBS (Abs)', 'number')}
      {renderInput('Puskesmas_Melaksanakan_MTBS_Persen', 'Puskesmas MTBS (%)', 'number', '', true)}
      
      {renderInput('Puskesmas_Melaksanakan_SDIDTK_Abs', 'Puskesmas SDIDTK (Abs)', 'number')}
      {renderInput('Puskesmas_Melaksanakan_SDIDTK_Persen', 'Puskesmas SDIDTK (%)', 'number', '', true)}

      {renderInput('Kab_Kota_Menyelenggarakan_Pelayanan_Kesehatan_Balita_Ya', 'Pely. Kes. Balita (Ya)', 'select', '', false, ['Ya', 'Tidak'])}
      {renderInput('Kab_Kota_Menyelenggarakan_Pelayanan_Kesehatan_Balita_Tidak', 'Pely. Kes. Balita (Tidak)', 'select', '', false, ['Ya', 'Tidak'])}
    </div>
  );
};
