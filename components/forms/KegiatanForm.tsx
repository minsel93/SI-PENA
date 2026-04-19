import React, { useEffect } from 'react';

interface FormProps {
  formData: any;
  handleChange: (e: React.ChangeEvent<any>) => void;
  renderInput: (name: string, label: string, type?: string, placeholder?: string, readOnly?: boolean, options?: string[]) => React.ReactNode;
}

export const KegiatanForm: React.FC<FormProps> = ({ formData, handleChange, renderInput }) => {
  // Real-time calculations
  useEffect(() => {
    // 15% Calculations as requested
    const sLahirPusdatin = Number(formData.Sasaran_Lahir_Hidup_Pusdatin || 0);
    const sLahirSPM = Number(formData.Sasaran_Lahir_Hidup_SPM_PKM || 0);

    const updateEvent = (name: string, value: any) => {
      if (formData[name] != value) {
        handleChange({ target: { name, value } } as any);
      }
    };

    updateEvent('Sasaran_Neonatus_Komplikasi', Math.round(0.15 * sLahirPusdatin));
    updateEvent('Sasaran_Komplikasi_Neonatus_SPM', Math.round(0.15 * sLahirSPM));

    const calculate = (prefix: string, sasaranPusdatinVal: number, sasaranSPMVal: number) => {
      const l = Number(formData[`${prefix}_L`] || 0);
      const p = Number(formData[`${prefix}_P`] || 0);
      const jml = l + p;
      updateEvent(`${prefix}_Jml`, jml);

      // Rule: Abs = Jml
      const abs = jml;
      updateEvent(`${prefix}_Abs`, abs);

      if (sasaranPusdatinVal > 0) {
        const persPusdatin = ((abs / sasaranPusdatinVal) * 100).toFixed(2);
        updateEvent(`${prefix}_Persen_Pusdatin`, persPusdatin);
      } else {
        updateEvent(`${prefix}_Persen_Pusdatin`, "0.00");
      }

      if (sasaranSPMVal > 0) {
        const persSPM = ((abs / sasaranSPMVal) * 100).toFixed(2);
        updateEvent(`${prefix}_Persen_SPM`, persSPM);
      } else {
        updateEvent(`${prefix}_Persen_SPM`, "0.00");
      }
    };

    const sNeoKomplikasi = Number(formData.Sasaran_Neonatus_Komplikasi || 0);
    const sNeoKomplikasiSPM = Number(formData.Sasaran_Komplikasi_Neonatus_SPM || 0);
    const sBalitaPusdatin = Number(formData.Sasaran_Anak_Balita_0_4_Th_Pusdatin || 0);
    const sBalitaSPM_PKM = Number(formData.Sasaran_Balita_SPM || 0);

    calculate('KN1', sLahirPusdatin, sLahirSPM);
    calculate('KN_Lengkap', sLahirPusdatin, sLahirSPM);
    
    // Special case for Neonatus Komplikasi Ditangani: It uses sNeoKomplikasi as denominator
    const l_komp = Number(formData.Neonatus_Komplikasi_Ditangani_L || 0);
    const p_komp = Number(formData.Neonatus_Komplikasi_Ditangani_P || 0);
    const jml_komp = l_komp + p_komp;
    updateEvent('Neonatus_Komplikasi_Ditangani_Jml', jml_komp);
    updateEvent('Neonatus_Komplikasi_Ditangani_Abs', jml_komp);
    
    if (sNeoKomplikasi > 0) {
      updateEvent('Neonatus_Komplikasi_Ditangani_Persen_Pusdatin', ((jml_komp / sNeoKomplikasi) * 100).toFixed(2));
    }
    if (sNeoKomplikasiSPM > 0) {
      updateEvent('Neonatus_Komplikasi_Ditangani_Persen_SPM', ((jml_komp / sNeoKomplikasiSPM) * 100).toFixed(2));
    }

    calculate('Kunjungan_Bayi', sLahirPusdatin, sLahirSPM);

    // Pelayanan Balita
    const l_bal = Number(formData.Pelayanan_Kesehatan_Balita_L || 0);
    const p_bal = Number(formData.Pelayanan_Kesehatan_Balita_P || 0);
    const jml_bal = l_bal + p_bal;
    updateEvent('Pelayanan_Kesehatan_Balita_Jml', jml_bal);
    updateEvent('Pelayanan_Kesehatan_Balita_Abs', jml_bal);

    if (sBalitaPusdatin > 0) {
      updateEvent('Pelayanan_Kesehatan_Balita_Persen_Pusdatin', ((jml_bal / sBalitaPusdatin) * 100).toFixed(2));
    }
    if (sBalitaSPM_PKM > 0) {
      updateEvent('Pelayanan_Kesehatan_Balita_Persen_SPM', ((jml_bal / sBalitaSPM_PKM) * 100).toFixed(2));
    }

    // SPM Balita Calculation
    const spmAbs = Number(formData.Indikator_SPM_Pelayanan_Kesehatan_Balita_Abs || 0);
    if (sBalitaSPM_PKM > 0) {
      const spmPersen = ((spmAbs / sBalitaSPM_PKM) * 100).toFixed(2);
      updateEvent('Indikator_SPM_Pelayanan_Kesehatan_Balita_Persen', spmPersen);
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
          <i className="bi bi-bullseye text-emerald-500"></i> Target Sasaran Laporan
        </h3>
      </div>
      {renderInput('Sasaran_Lahir_Hidup_Pusdatin', 'Sasaran Lahir Hidup (Pusdatin)', 'number')}
      {renderInput('Sasaran_Lahir_Hidup_SPM_PKM', 'Sasaran Lahir Hidup (SPM)', 'number')}
      {renderInput('Sasaran_Neonatus_Komplikasi', 'Sasaran Neonatus Komplikasi', 'number', '', true)}
      {renderInput('Sasaran_Komplikasi_Neonatus_SPM', 'Sasaran Komplikasi Neonatus (SPM)', 'number', '', true)}
      
      {/* KN 1 Section */}
      <div className="md:col-span-2 lg:col-span-3 h-px bg-slate-200 dark:bg-white/5 my-8"></div>
      <div className="md:col-span-2 lg:col-span-3 flex items-center gap-4 mb-4">
        <div className="w-12 h-12 bg-blue-500/10 text-blue-600 dark:text-blue-500 rounded-2xl flex items-center justify-center text-xl border border-blue-500/20">
          <i className="bi bi-activity"></i>
        </div>
        <h4 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-widest">Kunjungan Neonatal (KN 1)</h4>
      </div>
      {renderInput('KN1_L', 'KN 1 (L)', 'number')}
      {renderInput('KN1_P', 'KN 1 (P)', 'number')}
      {renderInput('KN1_Jml', 'KN 1 (Jumlah)', 'number', '', true)}
      {renderInput('KN1_Abs', 'KN 1 (Absolut)', 'number', '', true)}
      {renderInput('KN1_Persen_Pusdatin', 'KN 1 % (Pusdatin)', 'number', '', true)}
      {renderInput('KN1_Persen_SPM', 'KN 1 % (SPM)', 'number', '', true)}

      {/* KN Lengkap Section */}
      <div className="md:col-span-2 lg:col-span-3 h-px bg-slate-200 dark:bg-white/5 my-8"></div>
      <div className="md:col-span-2 lg:col-span-3 flex items-center gap-4 mb-4">
        <div className="w-12 h-12 bg-emerald-500/10 text-emerald-600 dark:text-emerald-500 rounded-2xl flex items-center justify-center text-xl border border-emerald-500/20">
          <i className="bi bi-check2-all"></i>
        </div>
        <h4 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-widest">KN Lengkap</h4>
      </div>
      {renderInput('KN_Lengkap_L', 'KN Lengkap (L)', 'number')}
      {renderInput('KN_Lengkap_P', 'KN Lengkap (P)', 'number')}
      {renderInput('KN_Lengkap_Jml', 'KN Lengkap (Jumlah)', 'number', '', true)}
      {renderInput('KN_Lengkap_Abs', 'KN Lengkap (Absolut)', 'number', '', true)}
      {renderInput('KN_Lengkap_Persen_Pusdatin', 'KN Lengkap % (Pusdatin)', 'number', '', true)}
      {renderInput('KN_Lengkap_Persen_SPM', 'KN Lengkap % (SPM)', 'number', '', true)}

      {/* Komplikasi Section */}
      <div className="md:col-span-2 lg:col-span-3 h-px bg-slate-200 dark:bg-white/5 my-8"></div>
      <div className="md:col-span-2 lg:col-span-3 flex items-center gap-4 mb-4">
        <div className="w-12 h-12 bg-rose-500/10 text-rose-600 dark:text-rose-500 rounded-2xl flex items-center justify-center text-xl border border-rose-500/20">
          <i className="bi bi-exclamation-triangle-fill"></i>
        </div>
        <h4 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-widest">Komplikasi Neonatus</h4>
      </div>
      {renderInput('Neonatus_Komplikasi_Ditangani_L', 'Komplikasi Ditangani (L)', 'number')}
      {renderInput('Neonatus_Komplikasi_Ditangani_P', 'Komplikasi Ditangani (P)', 'number')}
      {renderInput('Neonatus_Komplikasi_Ditangani_Jml', 'Komplikasi Ditangani (Jml)', 'number', '', true)}
      {renderInput('Neonatus_Komplikasi_Ditangani_Abs', 'Komplikasi Ditangani (Abs)', 'number', '', true)}
      {renderInput('Neonatus_Komplikasi_Ditangani_Persen_Pusdatin', 'Komplikasi Ditangani % (Pusdatin)', 'number', '', true)}
      {renderInput('Neonatus_Komplikasi_Ditangani_Persen_SPM', 'Komplikasi Ditangani % (SPM)', 'number', '', true)}

      {/* Kunjungan Bayi Section */}
      <div className="md:col-span-2 lg:col-span-3 h-px bg-slate-200 dark:bg-white/5 my-8"></div>
      <div className="md:col-span-2 lg:col-span-3 flex items-center gap-4 mb-4">
        <div className="w-12 h-12 bg-indigo-500/10 text-indigo-600 dark:text-indigo-500 rounded-2xl flex items-center justify-center text-xl border border-indigo-500/20">
          <i className="bi bi-person-fill-check"></i>
        </div>
        <h4 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-widest">Kunjungan Bayi</h4>
      </div>
      {renderInput('Kunjungan_Bayi_L', 'Kunjungan Bayi (L)', 'number')}
      {renderInput('Kunjungan_Bayi_P', 'Kunjungan Bayi (P)', 'number')}
      {renderInput('Kunjungan_Bayi_Jml', 'Kunjungan Bayi (Jml)', 'number', '', true)}
      {renderInput('Kunjungan_Bayi_Abs', 'Kunjungan Bayi (Abs)', 'number', '', true)}
      {renderInput('Kunjungan_Bayi_Persen_Pusdatin', 'Kunjungan Bayi % (Pusdatin)', 'number', '', true)}
      {renderInput('Kunjungan_Bayi_Persen_SPM', 'Kunjungan Bayi % (SPM)', 'number', '', true)}

      {/* Pelayanan Balita Section */}
      <div className="md:col-span-2 lg:col-span-3 h-px bg-slate-200 dark:bg-white/5 my-8"></div>
      <div className="md:col-span-2 lg:col-span-3 flex items-center gap-4 mb-4">
        <div className="w-12 h-12 bg-amber-500/10 text-amber-600 dark:text-amber-500 rounded-2xl flex items-center justify-center text-xl border border-amber-500/20">
          <i className="bi bi-heart-fill"></i>
        </div>
        <h4 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-widest">Pelayanan Kesehatan Balita</h4>
      </div>
      {renderInput('Sasaran_Anak_Balita_0_4_Th_Pusdatin', 'Sasaran Balita (Pusdatin)', 'number')}
      {renderInput('Sasaran_Balita_SPM', 'Sasaran Balita (SPM)', 'number')}
      {renderInput('Pelayanan_Kesehatan_Balita_L', 'Pelayanan Balita (L)', 'number')}
      {renderInput('Pelayanan_Kesehatan_Balita_P', 'Pelayanan Balita (P)', 'number')}
      {renderInput('Pelayanan_Kesehatan_Balita_Jml', 'Pelayanan Balita (Jumlah)', 'number', '', true)}
      {renderInput('Pelayanan_Kesehatan_Balita_Abs', 'Pelayanan Balita (Absolut)', 'number', '', true)}
      {renderInput('Pelayanan_Kesehatan_Balita_Persen_Pusdatin', 'Pelayanan Balita % (Pusdatin)', 'number', '', true)}
      {renderInput('Pelayanan_Kesehatan_Balita_Persen_SPM', 'Pelayanan Balita % (SPM)', 'number', '', true)}
      
      {/* Indikator SPM Balita */}
      <div className="md:col-span-2 lg:col-span-3 h-px bg-slate-200 dark:bg-white/5 my-8"></div>
      <div className="md:col-span-2 lg:col-span-3 flex items-center gap-4 mb-4">
        <div className="w-12 h-12 bg-slate-100 dark:bg-slate-500/10 text-slate-500 dark:text-slate-300 rounded-2xl flex items-center justify-center text-xl border border-slate-200 dark:border-white/10">
          <i className="bi bi-graph-up-arrow"></i>
        </div>
        <h4 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-widest">Indikator SPM & KIA</h4>
      </div>
      {renderInput('Indikator_SPM_Pelayanan_Kesehatan_Balita_Abs', 'Indikator SPM Balita (Abs)', 'number')}
      {renderInput('Indikator_SPM_Pelayanan_Kesehatan_Balita_Persen', 'Indikator SPM Balita (%)', 'number', '', true)}
      {renderInput('Jumlah_Balita_Memiliki_Dan_Menggunakan_Buku_KIA', 'Balita Memiliki Buku KIA', 'number')}
    </div>
  );
};
