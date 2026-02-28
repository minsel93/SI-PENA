import React from 'react';

interface FormProps {
  formData: any;
  handleChange: (e: React.ChangeEvent<any>) => void;
  renderInput: (name: string, label: string, type?: string, placeholder?: string, readOnly?: boolean, options?: string[]) => React.ReactNode;
}

export const KegiatanForm: React.FC<FormProps> = ({ renderInput }) => {
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
      {renderInput('Id_Puskesmas', 'ID Puskesmas', 'text', '', true)}

      <div className="md:col-span-2 bg-slate-50 p-6 rounded-2xl border border-slate-200 my-4">
        <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight flex items-center gap-2">
          <i className="fas fa-baby text-emerald-600"></i> Kunjungan Neonatal
        </h3>
      </div>
      {renderInput('Sasaran_Lahir_Hidup_(Pudatin)', 'Sasaran Lahir Hidup (Pusdatin)', 'number')}
      {renderInput('Sasaran_Lahir_Hidup_Spm_(Pkm)', 'Sasaran Lahir Hidup (SPM)', 'number')}
      {renderInput('Sasaran_Neonatus_Komplikasi', 'Sasaran Neonatus Komplikasi', 'number')}
      {renderInput('Sasaran_Komplikasi_Neonatus_(Spm)', 'Sasaran Komplikasi Neonatus (SPM)', 'number')}
      
      {renderInput('Kunjungan_Neonatal_Kn_1_L', 'KN 1 (L)', 'number')}
      {renderInput('Kunjungan_Neonatal_Kn_1_P', 'KN 1 (P)', 'number')}
      {renderInput('Kunjungan_Neonatal_Kn_1_Jml', 'KN 1 (Jumlah)', 'number', '', true)}
      {renderInput('Kunjungan_Neonatal_Kn_1_Abs', 'KN 1 (Absolut)', 'number')}
      {renderInput('Kunjungan_Neonatal_Kn_1_%(Pusdatin)', 'KN 1 % (Pusdatin)', 'number', '', true)}
      {renderInput('Kunjungan_Neonatal_Kn_1%(Spm)', 'KN 1 % (SPM)', 'number', '', true)}

      {renderInput('Kunjungan_Neonatal_Kn_Lengkap_L', 'KN Lengkap (L)', 'number')}
      {renderInput('Kunjungan_Neonatal_Kn_Lengkap_P', 'KN Lengkap (P)', 'number')}
      {renderInput('Kunjungan_Neonatal_Kn_Lengkap_Jml', 'KN Lengkap (Jumlah)', 'number', '', true)}
      {renderInput('Kunjungan_Neonatal_Kn_Lengkap_Abs', 'KN Lengkap (Absolut)', 'number')}
      {renderInput('Kunjungan_Neonatal_Kn_Lengkap%(Pusdatin)', 'KN Lengkap % (Pusdatin)', 'number', '', true)}
      {renderInput('Kunjungan_Neonatal_Kn_Lengkap%(Spm)', 'KN Lengkap % (SPM)', 'number', '', true)}

      <div className="md:col-span-2 bg-slate-50 p-6 rounded-2xl border border-slate-200 my-4">
        <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight flex items-center gap-2">
          <i className="fas fa-notes-medical text-amber-600"></i> Komplikasi Neonatus
        </h3>
      </div>
      {renderInput('Kunjungan_Neonatal_Neonatus_Komplikasi_Yang_Ditangani_L', 'Komplikasi Ditangani (L)', 'number')}
      {renderInput('Kunjungan_Neonatal_Neonatus_Komplikasi_Yang_Ditangani_P', 'Komplikasi Ditangani (P)', 'number')}
      {renderInput('Kunjungan_Neonatal_Neonatus_Komplikasi_Yang_Ditangani_Jml', 'Komplikasi Ditangani (Jml)', 'number', '', true)}
      {renderInput('Kunjungan_Neonatal_Neonatus_Komplikasi_Yang_Ditangani_Abs', 'Komplikasi Ditangani (Abs)', 'number')}
      {renderInput('Kunjungan_Neonatal_Neonatus_Komplikasi_Yang_Ditangani%(Pusdatin)', 'Komplikasi Ditangani % (Pusdatin)', 'number', '', true)}
      {renderInput('Kunjungan_Neonatal_Neonatus_Komplikasi_Yang_Ditangani%(Spm)', 'Komplikasi Ditangani % (Spm)', 'number', '', true)}

      <div className="md:col-span-2 bg-slate-50 p-6 rounded-2xl border border-slate-200 my-4">
        <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight flex items-center gap-2">
          <i className="fas fa-baby-carriage text-emerald-600"></i> Kunjungan Bayi
        </h3>
      </div>
      {renderInput('Kunjungan_Bayi_L', 'Kunjungan Bayi (L)', 'number')}
      {renderInput('Kunjungan_Bayi_P', 'Kunjungan Bayi (P)', 'number')}
      {renderInput('Kunjungan_Bayi_Jml', 'Kunjungan Bayi (Jml)', 'number', '', true)}
      {renderInput('Kunjungan_Bayi_Abs', 'Kunjungan Bayi (Abs)', 'number')}
      {renderInput('Kunjungan_Bayi%(Pusdatin)', 'Kunjungan Bayi % (Pusdatin)', 'number', '', true)}
      {renderInput('Kunjungan_Bayi%(Spm)', 'Kunjungan Bayi % (Spm)', 'number', '', true)}

      <div className="md:col-span-2 bg-slate-50 p-6 rounded-2xl border border-slate-200 my-4">
        <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight flex items-center gap-2">
          <i className="fas fa-stethoscope text-blue-600"></i> Pelayanan Balita
        </h3>
      </div>
      {renderInput('Sasaran_Anak_Balita_0-4_Thn(Pusdatin)', 'Sasaran Balita (Pusdatin)', 'number')}
      {renderInput('Sasaran_Balita_(Spm)', 'Sasaran Balita (SPM)', 'number')}
      {renderInput('Pelayanan_Kesehatan_Anak_Balita_L', 'Pelayanan Balita (L)', 'number')}
      {renderInput('Pelayanan_Kesehatan_Anak_Balita_P', 'Pelayanan Balita (P)', 'number')}
      {renderInput('Pelayanan_Kesehatan_Anak_Balita_Jml', 'Pelayanan Balita (Jumlah)', 'number', '', true)}
      {renderInput('Pelayanan_Kesehatan_Anak_Balita_Abs', 'Pelayanan Balita (Absolut)', 'number')}
      {renderInput('Pelayanan_Kesehatan_Anak_Balita_%(Pusdatin)', 'Pelayanan Balita % (Pusdatin)', 'number', '', true)}
      {renderInput('Pelayanan_Kesehatan_Anak_Balita%(Spm)', 'Pelayanan Balita % (SPM)', 'number', '', true)}
      
      {renderInput('Indikator_Spm_Pelayanan_Kesehatan_Balita_Abs', 'Indikator SPM Balita (Abs)', 'number')}
      {renderInput('Indikator_Spm_Pelayanan_Kesehatan_Balita%', 'Indikator SPM Balita (%)', 'number', '', true)}
      {renderInput('Jumlah_Balita_Yang_Memiliki_Dan_Menggunakan_Buku_Kia', 'Jumlah Balita Memiliki Buku KIA', 'number')}
    </div>
  );
};
