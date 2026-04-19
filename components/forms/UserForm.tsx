import React from 'react';

interface FormProps {
  formData: any;
  handleChange: (e: React.ChangeEvent<any>) => void;
  renderInput: (name: string, label: string, type?: string, placeholder?: string, readOnly?: boolean, options?: string[]) => React.ReactNode;
}

export const UserForm: React.FC<FormProps> = ({ renderInput }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="md:col-span-2 bg-slate-50 dark:bg-slate-900 shadow-inner dark:shadow-none p-8 rounded-3xl border border-slate-200 dark:border-white/5 mb-4 transition-colors duration-300">
        <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight flex items-center gap-3">
          <i className="bi bi-person-badge-fill text-blue-500"></i> Manajemen Pengguna
        </h3>
      </div>
      {renderInput('Username', 'Username', 'text', 'Contoh: tareran')}
      {renderInput('ID_Puskesmas', 'ID Puskesmas', 'text', 'Contoh: PKM-001')}
      {renderInput('Password', 'Password', 'password', '••••••••')}
      {renderInput('Role', 'Role', 'select', '', false, ['admin', 'user'])}
      {renderInput('Name', 'Nama Lengkap', 'text', 'Nama Lengkap')}
      {renderInput('Status', 'Status Akun', 'select', '', false, ['Aktif', 'Non-Aktif'])}
    </div>
  );
};
