import React from 'react';

interface FormProps {
  formData: any;
  handleChange: (e: React.ChangeEvent<any>) => void;
  renderInput: (name: string, label: string, type?: string, placeholder?: string, readOnly?: boolean, options?: string[]) => React.ReactNode;
}

export const RPJMNForm: React.FC<FormProps> = ({ renderInput }) => {
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
          <i className="fas fa-chart-line text-emerald-600"></i> Indikator RPJMN & RENSTRA
        </h3>
      </div>
      {renderInput('Sasaran_Lahir_Hidup_(Pusdatin)', 'Sasaran Lahir Hidup (Pusdatin)', 'number')}
      {renderInput('Jumlah_bayi_baru_lahir_usia_0-28_hari_yang_mendapatkan_pelayanan_sesuai_standar_(KN_Lengkap)Abs', 'KN Lengkap (Abs)', 'number')}
      {renderInput('Jumlah_bayi_baru_lahir_usia_0-28_hari_yang_mendapatkan_pelayanan_sesuai_standar(KN_Lengkap)%', 'KN Lengkap (%)', 'number', '', true)}
      
      {renderInput('Sasaran_Balita_SPM_Kab_Minsel(0-4_Thn)', 'Sasaran Balita SPM (0-4 Th)', 'number')}
      {renderInput('Sasaran_Balita(Pusdatin)', 'Sasaran Balita (Pusdatin)', 'number')}
      
      {renderInput('Jumlah_Balita_yang_Dipantau_Pertumbuhan_dan_Perkembangan_Abs', 'Balita Dipantau (Abs)', 'number')}
      {renderInput('Jumlah_Balita_yang_Dipantau_Pertumbuhan_dan_Perkembangan_%(SPM_Kab)', 'Balita Dipantau % (SPM)', 'number', '', true)}
      {renderInput('Jumlah_Balita_yang_Dipantau_Pertumbuhan_dan_Perkembangan%(Pusdatin)', 'Balita Dipantau % (Pusdatin)', 'number', '', true)}

      {renderInput('Jumlah_Balita_Berobat_Abs', 'Balita Berobat (Abs)', 'number')}
      {renderInput('Jumlah_Balita_Berobat%Pusdatin', 'Balita Berobat % (Pusdatin)', 'number', '', true)}
      {renderInput('Jumlah_Balita_Berobat%SPM_Kab', 'Balita Berobat % (SPM)', 'number', '', true)}

      {renderInput('Jumlah_Balita_MTBS_Abs', 'Balita MTBS (Abs)', 'number')}
      {renderInput('Jumlah_Balita_MTBS%Pusdatin', 'Balita MTBS % (Pusdatin)', 'number', '', true)}
      {renderInput('Jumlah_Balita_MTBS%SPM_Kab', 'Balita MTBS % (SPM)', 'number', '', true)}

      {renderInput('Jumlah_Balita_SDIDTK_Abs', 'Balita SDIDTK (Abs)', 'number')}
      {renderInput('Jumlah_Balita_SDIDTK%Pusdatin', 'Balita SDIDTK % (Pusdatin)', 'number', '', true)}
      {renderInput('Jumlah_Balita_SDIDTK%SPM_Kab', 'Balita SDIDTK % (SPM)', 'number', '', true)}

      <div className="md:col-span-2 bg-slate-50 p-6 rounded-2xl border border-slate-200 my-4">
        <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight flex items-center gap-2">
          <i className="fas fa-building text-blue-600"></i> Indikator Puskesmas
        </h3>
      </div>
      {renderInput('Jumlah_Puskesmas', 'Jumlah Puskesmas', 'number')}
      {renderInput('Jumlah_puskesmas_melaksanakan_kelas_ibu_balita_di_50%desa/kelurahan_Abs', 'Puskesmas Kelas Ibu (Abs)', 'number')}
      {renderInput('Jumlah_puskesmas_melaksanakan_kelas_ibu_balita_di_50%desa/kelurahan%', 'Puskesmas Kelas Ibu (%)', 'number', '', true)}
      
      {renderInput('Jumlah_Puskesmas_melaksanakan_pendekatan_MTBS_Abs', 'Puskesmas MTBS (Abs)', 'number')}
      {renderInput('Jumlah_Puskesmas_melaksanakan_pendekatan_MTBS%', 'Puskesmas MTBS (%)', 'number', '', true)}
      
      {renderInput('Jumlah_Puskesmas_melaksanakan_SDIDTK_Abs', 'Puskesmas SDIDTK (Abs)', 'number')}
      {renderInput('Jumlah_Puskesmas_melaksanakan_SDIDTK%', 'Puskesmas SDIDTK (%)', 'number', '', true)}

      {renderInput('Kab/Kota_Menyelenggarakan_Pelayanan_Kesehatan_Balita_Ya', 'Kab/Kota Menyelenggarakan (Ya)', 'select', '', false, ['Ya', 'Tidak'])}
      {renderInput('Kab/Kota_Menyelenggarakan_Pelayanan_Kesehatan_Balita_Tidak', 'Kab/Kota Menyelenggarakan (Tidak)', 'select', '', false, ['Ya', 'Tidak'])}
    </div>
  );
};
