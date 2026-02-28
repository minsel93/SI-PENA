
import React from 'react';
import { FormType } from '../types';
import { NAVIGATION_MENU, THEME_COLORS } from '../constants';

interface SidebarProps {
  currentForm: FormType;
  onNavigate: (form: FormType) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentForm, onNavigate }) => {
  return (
    <aside className="w-64 bg-white border-r border-slate-200 h-screen sticky top-0 flex flex-col">
      <div className="p-6 flex items-center gap-3 border-b border-slate-100">
        <div className={`${THEME_COLORS.primary} w-10 h-10 rounded-lg flex items-center justify-center text-white shadow-lg`}>
          <i className="fas fa-stethoscope text-xl"></i>
        </div>
        <div>
          <h1 className="font-bold text-lg leading-tight tracking-tight text-emerald-900">SI-PENA</h1>
          <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Health System</p>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {NAVIGATION_MENU.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 text-sm font-medium ${
              currentForm === item.id
                ? `${THEME_COLORS.primary} text-white shadow-md shadow-emerald-100`
                : 'text-slate-600 hover:bg-slate-100 hover:text-emerald-700'
            }`}
          >
            <span className="w-5 text-center">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-100">
        <div className="bg-emerald-50 rounded-xl p-4">
          <p className="text-xs font-semibold text-emerald-800 uppercase mb-1">Status Sistem</p>
          <div className="flex items-center gap-2 text-xs text-emerald-600">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Terhubung ke Cloud
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
