
import React, { useState, useEffect } from 'react';
import { FormType, User } from '../types';
import { PUSKESMAS_MAPPING, NAVIGATION_MENU } from '../constants';
import { SasaranForm } from './forms/SasaranForm';
import { KegiatanForm } from './forms/KegiatanForm';
import { RPJMNForm } from './forms/RPJMNForm';
import { KelasBalitaForm } from './forms/KelasBalitaForm';
import { KelasBalitaKabKotaForm } from './forms/KelasBalitaKabKotaForm';
import { KematianNeonatalForm } from './forms/KematianNeonatalForm';
import { KematianBalitaForm } from './forms/KematianBalitaForm';
import { UserForm } from './forms/UserForm';

interface FormRendererProps {
  type: FormType;
  onSubmit: (data: any) => void;
  initialData?: any;
  isAdmin?: boolean;
  currentUser?: User | null;
}

const FormRenderer: React.FC<FormRendererProps> = ({ type, onSubmit, initialData, isAdmin, currentUser }) => {
  const [formData, setFormData] = useState<any>(initialData || {
    Tanggal_Input: new Date().toISOString().split('T')[0],
    Status_Validasi: 'Draft',
    Nama_Puskesmas: isAdmin ? '' : currentUser?.puskesmasName || '',
    Id_Puskesmas: isAdmin ? '' : currentUser?.puskesmasId || '',
    Nama_Petugas_Penginput: isAdmin ? '' : currentUser?.username || ''
  });
  const [errors, setErrors] = useState<any>({});

  // Advanced Feature: Automatic Calculations
  useEffect(() => {
    const calc = { ...formData };
    let changed = false;

    // Helper to update if value changed
    const update = (key: string, val: any) => {
      if (calc[key] !== val) {
        calc[key] = val;
        changed = true;
      }
    };

    // Puskesmas ID Auto-Mapping
    if (calc.Nama_Puskesmas && PUSKESMAS_MAPPING[calc.Nama_Puskesmas]) {
      update('Id_Puskesmas', PUSKESMAS_MAPPING[calc.Nama_Puskesmas]);
      update('ID_PUSKESMAS', PUSKESMAS_MAPPING[calc.Nama_Puskesmas]);
    }

    if (type === FormType.KEGIATAN) {
      const slh_p = calc["Sasaran_Lahir_Hidup_(Pudatin)"] || 0;
      const slh_s = calc["Sasaran_Lahir_Hidup_Spm_(Pkm)"] || 0;
      
      // 15% Calculations
      update('Sasaran_Neonatus_Komplikasi', Math.round(slh_p * 0.15));
      update('Sasaran_Komplikasi_Neonatus_(Spm)', Math.round(slh_s * 0.15));

      // KN1
      const kn1_l = calc.Kunjungan_Neonatal_Kn_1_L || 0;
      const kn1_p = calc.Kunjungan_Neonatal_Kn_1_P || 0;
      const kn1_jml = kn1_l + kn1_p;
      update('Kunjungan_Neonatal_Kn_1_Jml', kn1_jml);
      update('Kunjungan_Neonatal_Kn_1_Abs', kn1_jml);
      if (slh_p > 0) update('Kunjungan_Neonatal_Kn_1_%(Pusdatin)', parseFloat(((kn1_jml / slh_p) * 100).toFixed(2)));
      if (slh_s > 0) update('Kunjungan_Neonatal_Kn_1%(Spm)', parseFloat(((kn1_jml / slh_s) * 100).toFixed(2)));

      // KN Lengkap
      const knl_l = calc.Kunjungan_Neonatal_Kn_Lengkap_L || 0;
      const knl_p = calc.Kunjungan_Neonatal_Kn_Lengkap_P || 0;
      const knl_jml = knl_l + knl_p;
      update('Kunjungan_Neonatal_Kn_Lengkap_Jml', knl_jml);
      update('Kunjungan_Neonatal_Kn_Lengkap_Abs', knl_jml);
      if (slh_p > 0) update('Kunjungan_Neonatal_Kn_Lengkap%(Pusdatin)', parseFloat(((knl_jml / slh_p) * 100).toFixed(2)));
      if (slh_s > 0) update('Kunjungan_Neonatal_Kn_Lengkap%(Spm)', parseFloat(((knl_jml / slh_s) * 100).toFixed(2)));

      // Komplikasi
      const kom_l = calc.Kunjungan_Neonatal_Neonatus_Komplikasi_Yang_Ditangani_L || 0;
      const kom_p = calc.Kunjungan_Neonatal_Neonatus_Komplikasi_Yang_Ditangani_P || 0;
      const kom_jml = kom_l + kom_p;
      update('Kunjungan_Neonatal_Neonatus_Komplikasi_Yang_Ditangani_Jml', kom_jml);
      update('Kunjungan_Neonatal_Neonatus_Komplikasi_Yang_Ditangani_Abs', kom_jml);
      const s_kom_p = calc.Sasaran_Neonatus_Komplikasi || 0;
      const s_kom_s = calc["Sasaran_Komplikasi_Neonatus_(Spm)"] || 0;
      if (s_kom_p > 0) update('Kunjungan_Neonatal_Neonatus_Komplikasi_Yang_Ditangani%(Pusdatin)', parseFloat(((kom_jml / s_kom_p) * 100).toFixed(2)));
      if (s_kom_s > 0) update('Kunjungan_Neonatal_Neonatus_Komplikasi_Yang_Ditangani%(Spm)', parseFloat(((kom_jml / s_kom_s) * 100).toFixed(2)));

      // Bayi
      const bayi_l = calc.Kunjungan_Bayi_L || 0;
      const bayi_p = calc.Kunjungan_Bayi_P || 0;
      const bayi_jml = bayi_l + bayi_p;
      update('Kunjungan_Bayi_Jml', bayi_jml);
      update('Kunjungan_Bayi_Abs', bayi_jml);
      if (slh_p > 0) update('Kunjungan_Bayi%(Pusdatin)', parseFloat(((bayi_jml / slh_p) * 100).toFixed(2)));
      if (slh_s > 0) update('Kunjungan_Bayi%(Spm)', parseFloat(((bayi_jml / slh_s) * 100).toFixed(2)));

      // Balita
      const bal_l = calc.Pelayanan_Kesehatan_Anak_Balita_L || 0;
      const bal_p = calc.Pelayanan_Kesehatan_Anak_Balita_P || 0;
      const bal_jml = bal_l + bal_p;
      update('Pelayanan_Kesehatan_Anak_Balita_Jml', bal_jml);
      update('Pelayanan_Kesehatan_Anak_Balita_Abs', bal_jml);
      const s_bal_p = calc["Sasaran_Anak_Balita_0-4_Thn(Pusdatin)"] || 0;
      const s_bal_s = calc["Sasaran_Balita_(Spm)"] || 0;
      if (s_bal_p > 0) update('Pelayanan_Kesehatan_Anak_Balita_%(Pusdatin)', parseFloat(((bal_jml / s_bal_p) * 100).toFixed(2)));
      if (s_bal_s > 0) update('Pelayanan_Kesehatan_Anak_Balita%(Spm)', parseFloat(((bal_jml / s_bal_s) * 100).toFixed(2)));
      
      if (s_bal_s > 0) update('Indikator_Spm_Pelayanan_Kesehatan_Balita%', parseFloat(((bal_jml / s_bal_s) * 100).toFixed(2)));
    }

    if (type === FormType.RPJMN) {
      const s_bal_p = calc["Sasaran_Balita(Pusdatin)"] || 0;
      const s_bal_s = calc["Sasaran_Balita_SPM_Kab_Minsel(0-4_Thn)"] || 0;
      const p_abs = calc.Jumlah_Balita_yang_Dipantau_Pertumbuhan_dan_Perkembangan_Abs || 0;
      if (s_bal_p > 0) update('Jumlah_Balita_yang_Dipantau_Pertumbuhan_dan_Perkembangan%(Pusdatin)', parseFloat(((p_abs / s_bal_p) * 100).toFixed(2)));
      if (s_bal_s > 0) update('Jumlah_Balita_yang_Dipantau_Pertumbuhan_dan_Perkembangan_%(SPM_Kab)', parseFloat(((p_abs / s_bal_s) * 100).toFixed(2)));

      const b_abs = calc.Jumlah_Balita_Berobat_Abs || 0;
      if (s_bal_p > 0) update('Jumlah_Balita_Berobat%Pusdatin', parseFloat(((b_abs / s_bal_p) * 100).toFixed(2)));
      if (s_bal_s > 0) update('Jumlah_Balita_Berobat%SPM_Kab', parseFloat(((b_abs / s_bal_s) * 100).toFixed(2)));

      const mtbs_abs = calc.Jumlah_Balita_MTBS_Abs || 0;
      if (b_abs > 0) update('Jumlah_Balita_MTBS%Pusdatin', parseFloat(((mtbs_abs / b_abs) * 100).toFixed(2)));

      const sdidtk_abs = calc.Jumlah_Balita_SDIDTK_Abs || 0;
      if (s_bal_p > 0) update('Jumlah_Balita_SDIDTK%Pusdatin', parseFloat(((sdidtk_abs / s_bal_p) * 100).toFixed(2)));
      if (s_bal_s > 0) update('Jumlah_Balita_SDIDTK%SPM_Kab', parseFloat(((sdidtk_abs / s_bal_s) * 100).toFixed(2)));

      const jml_pkm = calc.Jumlah_Puskesmas || 0;
      if (jml_pkm > 0) {
        const ki_abs = calc["Jumlah_puskesmas_melaksanakan_kelas_ibu_balita_di_50%desa/kelurahan_Abs"] || 0;
        update('Jumlah_puskesmas_melaksanakan_kelas_ibu_balita_di_50%desa/kelurahan%', parseFloat(((ki_abs / jml_pkm) * 100).toFixed(2)));
        const mtbs_p_abs = calc.Jumlah_Puskesmas_melaksanakan_pendekatan_MTBS_Abs || 0;
        update('Jumlah_Puskesmas_melaksanakan_pendekatan_MTBS%', parseFloat(((mtbs_p_abs / jml_pkm) * 100).toFixed(2)));
        const sdidtk_p_abs = calc.Jumlah_Puskesmas_melaksanakan_SDIDTK_Abs || 0;
        update('Jumlah_Puskesmas_melaksanakan_SDIDTK%', parseFloat(((sdidtk_p_abs / jml_pkm) * 100).toFixed(2)));
      }
    }

    if (type === FormType.KELAS_BALITA) {
      const g1 = calc["Jumlah_Ibu_yang_Mengikuti_Kelas_Ibu_Balita_Kelas_0_-1_Tahun"] || 0;
      const g2 = calc["Jumlah_Ibu_yang_Mengikuti_Kelas_Ibu_Balita_Kelas_1-2_Tahun"] || 0;
      const g3 = calc["Jumlah_Ibu_yang_Mengikuti_Kelas_Ibu_Balita_Kelas_2-_5_Tahun"] || 0;
      update('Total_Ibu_Yang_ikut_KLS_Ibu_Balita', g1 + g2 + g3);
    }

    if (type === FormType.KELAS_BALITA_KAB_KOTA) {
      const jml_desa = calc.Jumlah_Desa_atau_Kelurahan || 0;
      const abs_desa = parseFloat(calc["Jumlah_Desa_dengan_Kelas_Ibu_Balita_Abs_Desa_dengan_Kelas_Ibu_Balita_%"]?.split('/')[0] || '0');
      if (jml_desa > 0) {
        update('%_Desa_Melaksanakan_KLS_Ibu_Balita', parseFloat(((abs_desa / jml_desa) * 100).toFixed(2)));
      }
    }

    if (type === FormType.KEMATIAN_NEONATAL) {
      const l = calc["Lahir_Hidup_Absolut_(L)"] || 0;
      const p = calc["Lahir_Hidup_Absolut_(P)"] || 0;
      update('Lahir_Hidup_Total', l + p);
      const d1 = calc["Kematian_Neonatal_Kematian_0-6_hari"] || 0;
      const d2 = calc["Kematian_Neonatal_Kematian_7-28_hari"] || 0;
      update('Kematian_Neonatal_Jumlah_Kematian_Neonatal', d1 + d2);
    }

    if (type === FormType.KEMATIAN_BALITA) {
      const post = calc["Kematian_post_neonatal_(29_hr_-11_bln)"] || 0;
      // We don't have neonatal death in this form, but we can try to estimate or just use post
      update('Kematian_Bayi_(0-11_bln)(neonatal+post_neonatal)', post); 
      const anak = calc["Kematian_Anak_Balita(12-59_bulan)"] || 0;
      update('Kematian_Balita(0-59_bln)(neonatal_+_post_neonatal+anak_balita)', post + anak);
    }

    if (changed) {
      setFormData(calc);
    }
  }, [formData, type]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type: inputType } = e.target;
    setFormData((prev: any) => ({ 
      ...prev, 
      [name]: inputType === 'number' ? (value === '' ? 0 : parseFloat(value)) : value 
    }));
    if (errors[name]) {
      setErrors((prev: any) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: any = {};
    const requiredFields = ['Bulan', 'Tahun', 'Nama_Puskesmas', 'Nama_Petugas_Penginput'];
    
    requiredFields.forEach(field => {
      if (!formData[field]) {
        newErrors[field] = `${field.replace(/_/g, ' ')} wajib diisi`;
      }
    });

    if (formData.Tahun && (formData.Tahun < 2020 || formData.Tahun > 2030)) {
      newErrors.Tahun = 'Tahun harus antara 2020 - 2030';
    }

    Object.keys(formData).forEach(key => {
      const value = formData[key];
      if (typeof value === 'number' && value < 0) {
        newErrors[key] = 'Nilai tidak boleh negatif';
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const finalData = { 
        ...formData, 
        Status_Validasi: isAdmin ? formData.Status_Validasi : 'Terkirim' 
      };
      onSubmit(finalData);
    } else {
      const firstError = Object.keys(newErrors)[0];
      const element = document.getElementsByName(firstError)[0];
      if (element) element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const renderInput = (name: string, label: string, type: string = 'text', placeholder: string = '', readOnly: boolean = false, options?: string[]) => {
    const hasError = !!errors[name];
    
    // Logic for restricted fields
    let isFieldReadOnly = readOnly;
    if (!isAdmin && (name === 'Nama_Puskesmas' || name === 'Id_Puskesmas')) {
      isFieldReadOnly = true;
    }

    return (
      <div className="space-y-1">
        <label className={`block text-xs font-bold uppercase tracking-wider ${hasError ? 'text-rose-500' : 'text-slate-500'}`}>
          {label} {hasError && <span className="lowercase font-medium italic">({errors[name]})</span>}
        </label>
        {options ? (
          <select 
            name={name} 
            className={`form-select rounded-xl p-3 w-full border-2 transition-all ${isFieldReadOnly ? 'bg-slate-100 cursor-not-allowed' : 'border-slate-200 focus:border-emerald-500'} ${hasError ? 'border-rose-300 bg-rose-50' : ''}`}
            value={formData[name] || ''} 
            onChange={handleChange}
            required
            disabled={isFieldReadOnly}
          >
            <option value="">Pilih {label}</option>
            {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        ) : (
          <input 
            name={name} 
            type={type} 
            placeholder={placeholder}
            className={`form-control rounded-xl p-3 w-full border-2 transition-all ${isFieldReadOnly ? 'bg-slate-100 font-bold' : 'border-slate-200 focus:border-emerald-500'} ${hasError ? 'border-rose-300 bg-rose-50' : ''}`}
            value={formData[name] || ''} 
            onChange={handleChange}
            readOnly={isFieldReadOnly}
            required={!isFieldReadOnly}
          />
        )}
      </div>
    );
  };

  const renderFooter = () => {
    return (
      <div className="col-span-1 md:col-span-2 bg-slate-50 p-8 rounded-3xl border border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <div className="space-y-4">
          <h4 className="text-slate-900 font-black uppercase text-xs tracking-widest mb-4 flex items-center gap-2">
            <i className="fas fa-user-edit text-blue-600"></i> Petugas Penginput
          </h4>
          {renderInput('Nama_Petugas_Penginput', 'Nama Petugas', 'text', 'Nama Lengkap')}
          {renderInput('Tanggal_Input', 'Tanggal Input', 'date')}
        </div>
        <div className="space-y-4">
          <h4 className="text-slate-900 font-black uppercase text-xs tracking-widest mb-4 flex items-center gap-2">
            <i className="fas fa-clipboard-check text-emerald-600"></i> Status Validasi
          </h4>
          {isAdmin ? (
            <>
              {renderInput('Status_Validasi', 'Status Validasi', 'select', '', false, ['Draft', 'Terkirim', 'Valid', 'Belum Valid'])}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Catatan Validasi</label>
                <textarea 
                  name="Catatan_Validasi" 
                  className="form-control rounded-xl p-3 border-2 border-slate-200 w-full focus:border-emerald-500 transition-all" 
                  placeholder="Berikan catatan jika ada perbaikan..." 
                  rows={2} 
                  value={formData.Catatan_Validasi || ''} 
                  onChange={handleChange}
                ></textarea>
              </div>
            </>
          ) : (
            <div className="p-4 bg-white rounded-2xl border border-slate-200">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-slate-400 uppercase">Status Saat Ini:</span>
                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                  formData.Status_Validasi === 'Valid' ? 'bg-emerald-100 text-emerald-700' :
                  formData.Status_Validasi === 'Belum Valid' ? 'bg-rose-100 text-rose-700' :
                  formData.Status_Validasi === 'Terkirim' ? 'bg-blue-100 text-blue-700' :
                  'bg-slate-100 text-slate-600'
                }`}>
                  {formData.Status_Validasi || 'Draft'}
                </span>
              </div>
              {formData.Catatan_Validasi && (
                <div className="mt-3 p-3 bg-rose-50 rounded-xl border border-rose-100">
                  <p className="text-[10px] font-bold text-rose-400 uppercase mb-1">Catatan Dinas:</p>
                  <p className="text-sm text-rose-700 font-medium italic">"{formData.Catatan_Validasi}"</p>
                </div>
              )}
              <p className="text-[10px] text-slate-400 mt-4 leading-relaxed">
                * Status akan berubah otomatis menjadi <strong>Terkirim</strong> setelah anda menekan tombol <strong>Kirim Laporan Sekarang</strong>.
              </p>
            </div>
          )}
        </div>
      </div>
    );
  };

  const getFormLabel = () => {
    return NAVIGATION_MENU.find(m => m.id === type)?.label || 'Formulir';
  };

  const renderForm = () => {
    const props = { formData, handleChange, renderInput };
    switch (type) {
      case FormType.SASARAN: return <SasaranForm {...props} />;
      case FormType.KEGIATAN: return <KegiatanForm {...props} />;
      case FormType.RPJMN: return <RPJMNForm {...props} />;
      case FormType.KELAS_BALITA: return <KelasBalitaForm {...props} />;
      case FormType.KELAS_BALITA_KAB_KOTA: return <KelasBalitaKabKotaForm {...props} />;
      case FormType.KEMATIAN_NEONATAL: return <KematianNeonatalForm {...props} />;
      case FormType.KEMATIAN_BALITA: return <KematianBalitaForm {...props} />;
      case FormType.USER: return <UserForm {...props} />;
      default: return null;
    }
  };

  return (
    <div className="bg-white rounded-[40px] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden animate-fade-in">
      <div className="bg-slate-900 p-12 text-white relative overflow-hidden">
        {/* Glassmorphism Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/20 rounded-full blur-[100px] -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] -ml-32 -mb-32"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-2xl">
            <h2 className="text-4xl font-black tracking-tight mb-2 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              Formulir {getFormLabel()}
            </h2>
            <p className="text-emerald-400 font-bold uppercase tracking-[0.2em] text-xs flex items-center gap-2">
              <span className="w-8 h-0.5 bg-emerald-500"></span>
              SI-PENA Sistem Pelaporan Kesehatan Anak
            </p>
          </div>
          
          <div className="hidden md:block bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-2xl">
            <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Status Dokumen</div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-sm font-bold">{formData.Status_Validasi || 'Draft'}</span>
            </div>
          </div>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="p-10">
        {renderForm()}
        {type !== FormType.USER && renderFooter()}
        
        <div className="mt-10 flex justify-end gap-4">
          <button 
            type="button" 
            onClick={() => window.location.reload()}
            className="px-8 py-4 rounded-2xl text-slate-600 font-black text-sm hover:bg-slate-50 transition-all"
          >
            BATALKAN
          </button>
          <button 
            type="submit" 
            className="bg-emerald-600 hover:bg-emerald-500 text-white px-10 py-4 rounded-2xl font-black text-sm shadow-xl shadow-emerald-600/20 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
          >
            KIRIM LAPORAN SEKARANG
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormRenderer;
