import React from 'react';

interface FormProps {
  formData: any;
  handleChange: (e: React.ChangeEvent<any>) => void;
  renderInput: (name: string, label: string, type?: string, placeholder?: string, readOnly?: boolean, options?: string[]) => React.ReactNode;
}

export const UserForm: React.FC<FormProps> = ({ renderInput }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="md:col-span-2 bg-slate-50 p-6 rounded-2xl border border-slate-200 mb-4">
        <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight flex items-center gap-2">
          <i className="fas fa-user-shield text-blue-600"></i> Manajemen Pengguna
        </h3>
      </div>
      {renderInput('Username', 'Username', 'text', 'Contoh: tareran')}
      {renderInput('ID_Puskesmas', 'ID Puskesmas', 'text', 'Contoh: PKM-001')}
      {renderInput('Password', 'Password', 'password', '••••••••')}
      {renderInput('Role', 'Role', 'select', '', false, ['admin', 'user'])}
      {renderInput('Name', 'Nama Lengkap', 'text', 'Nama Lengkap')}
      
      <div className="md:col-span-2 bg-slate-50 p-6 rounded-2xl border border-slate-200 mt-4">
        <h4 className="text-sm font-black text-slate-700 uppercase tracking-widest mb-4">Status & Catatan</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {renderInput('Status_Validasi', 'Status User', 'select', '', false, ['Aktif', 'Non-Aktif'])}
          {renderInput('Catatan_Validasi', 'Catatan User', 'text', 'Catatan')}
        </div>
      </div>
    </div>
  );
};
