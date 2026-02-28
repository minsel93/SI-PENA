
import React from 'react';
import { FormType } from './types';

export const NAVIGATION_MENU = [
  { id: FormType.DASHBOARD, label: 'Beranda', icon: <i className="fas fa-home"></i>, color: 'bg-blue-500' },
  { id: FormType.SASARAN, label: 'Data Sasaran', icon: <i className="fas fa-file-circle-plus"></i>, color: 'bg-indigo-500' },
  { id: FormType.KEGIATAN, label: 'Laporan Kegiatan', icon: <i className="fas fa-clipboard-list"></i>, color: 'bg-emerald-500' },
  { id: FormType.KELAS_BALITA, label: 'Kelas Balita', icon: <i className="fas fa-chalkboard-user"></i>, color: 'bg-amber-500' },
  { id: FormType.KELAS_BALITA_KAB_KOTA, label: 'Kelas Balita Kab/Kota', icon: <i className="fas fa-city"></i>, color: 'bg-orange-500' },
  { id: FormType.KEMATIAN_NEONATAL, label: 'Kematian Neonatal', icon: <i className="fas fa-heart-pulse"></i>, color: 'bg-rose-500' },
  { id: FormType.KEMATIAN_BALITA, label: 'Kematian Balita', icon: <i className="fas fa-user-doctor"></i>, color: 'bg-slate-700' },
  { id: FormType.RPJMN, label: 'RPJMN & RENSTRA', icon: <i className="fas fa-chart-line"></i>, color: 'bg-sky-500' },
  { id: FormType.USER, label: 'Manajemen User', icon: <i className="fas fa-users-gear"></i>, color: 'bg-purple-500' },
];

export const THEME_COLORS = {
  primary: 'bg-emerald-600',
  secondary: 'bg-slate-900',
  accent: 'text-emerald-600'
};

export const PUSKESMAS_MAPPING: Record<string, string> = {
  'PUSKESMAS TARERAN': 'PKM-001',
  'PUSKESMAS SULUUN': 'PKM-002',
  'PUSKESMAS TATAPAAN': 'PKM-003',
  'PUSKESMAS TUMPAAN': 'PKM-004',
  'PUSKESMAS AMURANG TIMUR': 'PKM-005',
  'PUSKESMAS AMURANG': 'PKM-006',
  'PUSKESMAS AMURANG BARAT': 'PKM-007',
  'PUSKESMAS TENGA': 'PKM-008',
  'PUSKESMAS ONGKAW': 'PKM-009',
  'PUSKESMAS KUMELEMBUAI': 'PKM-010',
  'PUSKESMAS MOTOLING TIMUR': 'PKM-011',
  'PUSKESMAS MOTOLING': 'PKM-012',
  'PUSKESMAS MOTOLING BARAT': 'PKM-013',
  'PUSKESMAS POOPO': 'PKM-014',
  'PUSKESMAS TOMPASO BARU': 'PKM-015',
  'PUSKESMAS MAESAAN': 'PKM-016',
  'PUSKESMAS MODOINDING': 'PKM-017',
};

export const SPREADSHEET_ID = "1d28gDgem5iAQE81jtuM8xH1fNfeDpohe_PUJxPtK9gE";

export const USER_LIST = [
  { username: 'admin1', password: 'admin001', role: 'admin', name: 'Admin Dinkes 1' },
  { username: 'admin2', password: 'admin002', role: 'admin', name: 'Admin Dinkes 2' },
  { username: 'tareran', password: 'pkmuser001', role: 'puskesmas', name: 'PUSKESMAS TARERAN', id: 'PKM-001' },
  { username: 'suluun', password: 'pkmuser002', role: 'puskesmas', name: 'PUSKESMAS SULUUN', id: 'PKM-002' },
  { username: 'tatapaan', password: 'pkmuser003', role: 'puskesmas', name: 'PUSKESMAS TATAPAAN', id: 'PKM-003' },
  { username: 'tumpaan', password: 'pkmuser004', role: 'puskesmas', name: 'PUSKESMAS TUMPAAN', id: 'PKM-004' },
  { username: 'amurangtimur', password: 'pkmuser005', role: 'puskesmas', name: 'PUSKESMAS AMURANG TIMUR', id: 'PKM-005' },
  { username: 'amurang', password: 'pkmuser006', role: 'puskesmas', name: 'PUSKESMAS AMURANG', id: 'PKM-006' },
  { username: 'amurangbarat', password: 'pkmuser007', role: 'puskesmas', name: 'PUSKESMAS AMURANG BARAT', id: 'PKM-007' },
  { username: 'tenga', password: 'pkmuser008', role: 'puskesmas', name: 'PUSKESMAS TENGA', id: 'PKM-008' },
  { username: 'ongkaw', password: 'pkmuser009', role: 'puskesmas', name: 'PUSKESMAS ONGKAW', id: 'PKM-009' },
  { username: 'kumelembuai', password: 'pkmuser010', role: 'puskesmas', name: 'PUSKESMAS KUMELEMBUAI', id: 'PKM-010' },
  { username: 'motolingtimur', password: 'pkmuser011', role: 'puskesmas', name: 'PUSKESMAS MOTOLING TIMUR', id: 'PKM-011' },
  { username: 'motoling', password: 'pkmuser012', role: 'puskesmas', name: 'PUSKESMAS MOTOLING', id: 'PKM-012' },
  { username: 'motolingbarat', password: 'pkmuser013', role: 'puskesmas', name: 'PUSKESMAS MOTOLING BARAT', id: 'PKM-013' },
  { username: 'poopo', password: 'pkmuser014', role: 'puskesmas', name: 'PUSKESMAS POOPO', id: 'PKM-014' },
  { username: 'tompasobaru', password: 'pkmuser015', role: 'puskesmas', name: 'PUSKESMAS TOMPASO BARU', id: 'PKM-015' },
  { username: 'maesaan', password: 'pkmuser016', role: 'puskesmas', name: 'PUSKESMAS MAESAAN', id: 'PKM-016' },
  { username: 'modoinding', password: 'pkmuser017', role: 'puskesmas', name: 'PUSKESMAS MODOINDING', id: 'PKM-017' },
];
