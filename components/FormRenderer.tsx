
import React, { useState } from 'react';
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
  const calculateDerivedValues = (data: any) => {
    const calc = { ...data };
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

    return { calc, changed };
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type: inputType } = e.target;
    // For numeric fields, allow empty string instead of forcing 0
    const newValue = inputType === 'number' ? (value === '' ? '' : parseFloat(value)) : value;
    
    setFormData((prev: any) => {
      const updated = { ...prev, [name]: newValue };
      const { calc, changed } = calculateDerivedValues(updated);
      return changed ? calc : updated;
    });
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

    const getColorClass = () => {
      if (hasError) return 'border-rose-500/50 bg-rose-500/5 focus:ring-rose-500/20 focus:border-rose-500';
      
      const n = name.toLowerCase();
      if (n.includes('status') || n.includes('validasi')) return 'border-blue-200 dark:border-blue-500/30 focus:border-blue-500 focus:ring-blue-500/20 bg-blue-50/30 dark:bg-blue-900/10';
      if (n.includes('sasaran') || n.includes('indikator')) return 'border-emerald-200 dark:border-emerald-500/30 focus:border-emerald-500 focus:ring-emerald-500/20 bg-emerald-50/30 dark:bg-emerald-900/10';
      if (n.includes('komplikasi') || n.includes('kematian')) return 'border-rose-200 dark:border-rose-500/30 focus:border-rose-500 focus:ring-rose-500/20 bg-rose-50/30 dark:bg-rose-900/10';
      if (n.includes('abs') || n.includes('jml')) return 'border-amber-200 dark:border-amber-500/30 focus:border-amber-500 focus:ring-amber-500/20 bg-amber-50/30 dark:bg-amber-900/10';
      if (n.includes('nama') || n.includes('petugas') || n.includes('bulan')) return 'border-violet-200 dark:border-violet-500/30 focus:border-violet-500 focus:ring-violet-500/20 bg-violet-50/30 dark:bg-violet-900/10';
      
      return 'border-slate-200 dark:border-white/10 focus:border-emerald-500 focus:ring-emerald-500/20 bg-white/60 dark:bg-slate-900/40';
    };

    return (
      <div className="space-y-2 group">
        <label className={`block text-[10px] font-black uppercase tracking-[0.2em] transition-colors duration-300 ${hasError ? 'text-rose-500' : 'text-slate-500 dark:text-slate-400 group-focus-within:font-bold'}`}>
          {label} {hasError && <span className="lowercase font-medium italic opacity-70">({errors[name]})</span>}
        </label>
        {options ? (
          <div className="relative">
            <select 
              name={name} 
              className={`rounded-2xl p-4 w-full border-2 transition-all appearance-none backdrop-blur-md text-slate-900 dark:text-white font-black h-[58px] shadow-sm hover:shadow-md ${getColorClass()} ${
                isFieldReadOnly ? 'opacity-50 cursor-not-allowed grayscale' : 'focus:ring-4'
              }`}
              value={formData[name] || ''} 
              onChange={handleChange}
              onFocus={(e) => e.target.select()}
              required
              disabled={isFieldReadOnly}
            >
              <option value="" className="bg-white dark:bg-slate-900">Pilih {label}</option>
              {options.map(opt => <option key={opt} value={opt} className="bg-white dark:bg-slate-900">{opt}</option>)}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
              <i className="bi bi-chevron-down"></i>
            </div>
          </div>
        ) : (
          <input 
            name={name} 
            type={type} 
            placeholder={placeholder}
            className={`rounded-2xl p-4 w-full border-2 transition-all backdrop-blur-md text-slate-900 dark:text-white font-black h-[58px] shadow-sm hover:shadow-md ${getColorClass()} ${
              isFieldReadOnly ? 'opacity-50 cursor-not-allowed grayscale' : 'focus:ring-4'
            }`}
            value={formData[name] ?? ''} 
            onChange={handleChange}
            onFocus={(e) => e.target.select()}
            readOnly={isFieldReadOnly}
            required={!isFieldReadOnly}
          />
        )}
      </div>
    );
  };

  const renderFooter = () => {
    return (
      <div className="col-span-1 md:col-span-2 bg-slate-50 dark:bg-slate-950/50 p-10 rounded-[2.5rem] border border-slate-200 dark:border-white/5 grid grid-cols-1 md:grid-cols-2 gap-12 mt-12 shadow-sm dark:shadow-none">
        <div className="space-y-6">
          <h4 className="text-slate-900 dark:text-white font-black uppercase text-[10px] tracking-[0.3em] mb-6 flex items-center gap-3">
            <span className="w-1.5 h-6 bg-blue-500 rounded-full"></span> Petugas Penginput
          </h4>
          {renderInput('Nama_Petugas_Penginput', 'Nama Petugas', 'text', 'Nama Lengkap')}
          {renderInput('Tanggal_Input', 'Tanggal Input', 'date')}
        </div>
        <div className="space-y-6">
          <h4 className="text-slate-900 dark:text-white font-black uppercase text-[10px] tracking-[0.3em] mb-6 flex items-center gap-3">
            <span className="w-1.5 h-6 bg-emerald-500 rounded-full"></span> Status Validasi
          </h4>
          {isAdmin ? (
            <>
              {renderInput('Status_Validasi', 'Status Validasi', 'select', '', false, ['Draft', 'Terkirim', 'Valid', 'Belum Valid'])}
              <div className="space-y-2">
                <label className="block text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.2em]">Catatan Validasi</label>
                <textarea 
                  name="Catatan_Validasi" 
                  className="rounded-2xl p-4 border-2 border-slate-200 dark:border-white/5 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold w-full focus:border-emerald-500 transition-all min-h-[120px]" 
                  placeholder="Berikan catatan perbaikan disini..." 
                  value={formData.Catatan_Validasi || ''} 
                  onChange={handleChange}
                ></textarea>
              </div>
            </>
          ) : (
            <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-white/5 shadow-sm dark:shadow-none">
              <div className="flex justify-between items-center mb-4">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Status:</span>
                <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] border shadow-lg ${
                  formData.Status_Validasi === 'Valid' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-500 border-emerald-500/30' :
                  formData.Status_Validasi === 'Belum Valid' ? 'bg-rose-500/10 text-rose-600 dark:text-rose-500 border-rose-500/30' :
                  'bg-blue-500/10 text-blue-600 dark:text-blue-500 border-blue-500/30'
                }`}>
                  {formData.Status_Validasi || 'Draft'}
                </span>
              </div>
              {formData.Catatan_Validasi && (
                <div className="mt-4 p-4 bg-rose-50 dark:bg-rose-500/5 rounded-2xl border border-rose-200 dark:border-rose-500/20">
                  <p className="text-[9px] font-black text-rose-600 dark:text-rose-500 uppercase tracking-[0.2em] mb-2">Pesan Dinas:</p>
                  <p className="text-sm text-slate-700 dark:text-slate-200 font-bold italic leading-relaxed">"{formData.Catatan_Validasi}"</p>
                </div>
              )}
              <div className="mt-6 flex items-start gap-3 bg-slate-50 dark:bg-slate-950/80 p-4 rounded-xl border border-slate-200 dark:border-white/5">
                <i className="bi bi-info-circle-fill text-emerald-500 mt-0.5"></i>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed font-bold">
                  Data yang dikirim akan diverifikasi oleh Admin Dinkes. Pastikan seluruh isian sudah sesuai dengan petunjuk teknis.
                </p>
              </div>
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
    <div className="bg-white dark:bg-slate-900/50 rounded-[3rem] border border-slate-200 dark:border-white/5 overflow-hidden animate-fade-in shadow-2xl backdrop-blur-xl transition-colors duration-300">
      <div className="bg-slate-100 dark:bg-slate-950 p-12 text-slate-900 dark:text-white relative overflow-hidden transition-colors duration-300">
        {/* Abstract Background Decoration */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] -mr-64 -mt-64"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[100px] -ml-40 -mb-40"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="bg-white/40 dark:bg-white/5 backdrop-blur-2xl border border-slate-200/50 dark:border-white/10 p-8 rounded-[2.5rem] shadow-3xl">
            <h2 className="text-4xl lg:text-5xl font-black tracking-tight mb-4 text-slate-900 dark:text-white">
              {getFormLabel()}
            </h2>
            <div className="flex items-center gap-4">
               <span className="w-10 h-1 bg-emerald-500 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.5)]"></span>
               <p className="text-slate-500 dark:text-slate-400 font-black uppercase tracking-[0.4em] text-[10px]">
                Pengisian Berkas Elektronik
              </p>
            </div>
          </div>
          
          <div className="hidden lg:block bg-white dark:bg-slate-900/50 backdrop-blur-md border border-slate-200 dark:border-white/5 p-6 rounded-3xl shadow-sm dark:shadow-none">
            <div className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500 mb-2">Identitas Digital Laporan</div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-500/20 text-emerald-600 dark:text-emerald-500 rounded-xl flex items-center justify-center text-xl">
                <i className="bi bi-shield-lock-fill"></i>
              </div>
              <div className="text-sm font-black text-slate-700 dark:text-slate-200 tracking-tight">SI-PENA SECURED ACCESS</div>
            </div>
          </div>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="p-12">
        <div className="bg-slate-50 dark:bg-slate-950/30 p-8 lg:p-12 rounded-[2.5rem] border border-slate-200 dark:border-white/5 shadow-inner transition-colors duration-300">
          {renderForm()}
        </div>
        
        {type !== FormType.USER && renderFooter()}
        
        <div className="mt-12 flex flex-col sm:flex-row justify-end gap-6">
          <button 
            type="button" 
            onClick={() => window.location.reload()}
            className="px-10 py-5 rounded-[1.5rem] text-slate-500 dark:text-slate-400 font-black text-sm hover:text-slate-800 dark:hover:text-white transition-all uppercase tracking-widest border border-transparent hover:bg-slate-200 dark:hover:bg-white/5"
          >
            Bersihkan Input
          </button>
          <button 
            type="submit" 
            className="bg-emerald-600 hover:bg-emerald-500 text-white px-12 py-5 rounded-[1.5rem] font-black text-sm shadow-2xl shadow-emerald-500/20 transition-all transform hover:scale-[1.03] active:scale-[0.98] uppercase tracking-widest flex items-center justify-center gap-3"
          >
            <i className="bi bi-cloud-arrow-up-fill text-lg"></i>
            Kirim Laporan Resmi
          </button>
        </div>
      </form>
    </div>
);
};

export default FormRenderer;
