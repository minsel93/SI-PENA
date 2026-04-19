
import React, { useState, useEffect } from 'react';
import { 
  Chart as ChartJS, 
  ArcElement, 
  Tooltip, 
  Legend, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  PointElement, 
  LineElement, 
  Title,
  Filler
} from 'chart.js';
import { Pie, Bar, Line } from 'react-chartjs-2';
import { FormType, User } from '../types';
import { NAVIGATION_MENU } from '../constants';

ChartJS.register(
  ArcElement, 
  Tooltip, 
  Legend, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  PointElement, 
  LineElement, 
  Title,
  Filler
);

const sliderImages = [
  {
    url: "https://i.ibb.co.com/S4Vg2Tf4/unnamed-5.jpg",
    title: "Kesehatan Anak",
    desc: "Pantau, Analisis, dan Tingkatkan Kualitas Pelayanan"
  },
  {
    url: "https://i.ibb.co.com/pj1gMW1g/Desain-tanpa-judul-6.png",
    title: "SI-PENA",
    desc: "Sistem Pelaporan Kesehatan Anak Terintegrasi"
  },
  {
    url: "https://i.ibb.co.com/twq32zLZ/Gemini-Generated-Image-p2pquvp2pquvp2pq.jpg",
    title: "Digitalisasi Data",
    desc: "Pelaporan yang Cepat, Akurat dan Transparan"
  }
];

const Dashboard: React.FC<{ 
  onNavigate: (id: FormType, editingData?: { type: FormType, data: any }) => void,
  onDelete?: (type: FormType, idData: string) => void,
  records: any,
  isAdmin?: boolean,
  currentUser?: User | null,
  theme: 'light' | 'dark'
}> = ({ onNavigate, onDelete, records, isAdmin, currentUser, theme }) => {
  const [time, setTime] = useState(new Date());
  const [activeSlide, setActiveSlide] = useState(0);

  const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
  const monthShorts = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];

  // Real-time Stats
  let totalLaporan = 0;
  let totalValid = 0;
  let totalTerkirim = 0;
  let totalPerbaikan = 0;

  const monthlyReportCounts = new Array(12).fill(0);
  const deathNeonatalCounts = new Array(12).fill(0);
  const deathBalitaCounts = new Array(12).fill(0);

  const safeRecords = records || {};

  Object.entries(safeRecords).forEach(([key, list]: [string, any]) => {
    if (Array.isArray(list) && key !== 'users') {
      list.forEach((r: any) => {
        totalLaporan++;
        if (r.Status_Validasi === 'Valid') totalValid++;
        if (r.Status_Validasi === 'Terkirim') totalTerkirim++;
        if (r.Status_Validasi === 'Belum Valid') totalPerbaikan++;
        
        const monthIdx = months.indexOf(r.Bulan);
        if (monthIdx !== -1) {
          monthlyReportCounts[monthIdx]++;
          
          if (key === 'kematianNeonatal') {
            deathNeonatalCounts[monthIdx] += (Number(r.Jumlah_Kematian_Neonatal) || 0);
          }
          if (key === 'kematianBalita') {
            deathBalitaCounts[monthIdx] += (Number(r.Kematian_Balita_0_59_Bln) || 0);
          }
        }
      });
    }
  });

  const rateValidasi = totalLaporan > 0 ? Math.round((totalValid / totalLaporan) * 100) : 0;

  // Chart Data: Validation Pie
  const pieData = {
    labels: ['Valid', 'Proses/Revisi'],
    datasets: [{
      data: [totalValid, totalLaporan - totalValid],
      backgroundColor: ['#10b981', '#1e293b'],
      borderColor: ['#065f46', '#0f172a'],
      borderWidth: 2,
    }]
  };

  // Chart Data: Monthly Bar
  const barData = {
    labels: monthShorts,
    datasets: [{
      label: 'Jumlah Laporan',
      data: monthlyReportCounts,
      backgroundColor: monthlyReportCounts.map(c => c > 0 ? '#10b981' : '#1e293b'),
      borderRadius: 8,
      borderWidth: 0,
    }]
  };

  // Chart Data: Death Line
  const lineData = {
    labels: monthShorts,
    datasets: [
      {
        label: 'Kematian Neonatal',
        data: deathNeonatalCounts,
        borderColor: '#f43f5e',
        backgroundColor: 'rgba(244, 63, 94, 0.1)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#f43f5e',
        pointRadius: 4,
      },
      {
        label: 'Kematian Balita',
        data: deathBalitaCounts,
        borderColor: '#f59e0b',
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#f59e0b',
        pointRadius: 4,
      }
    ]
  };

  // Tooltip & Scales color adjustments
  const secondaryTextColor = theme === 'dark' ? '#64748b' : '#94a3b8';
  const gridLineColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)';
  const tooltipBg = theme === 'dark' ? '#0f172a' : '#ffffff';
  const tooltipText = theme === 'dark' ? '#ffffff' : '#0f172a';

  const chartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: tooltipBg,
        titleColor: tooltipText,
        bodyColor: tooltipText,
        padding: 12,
        titleFont: { size: 14, weight: 'bold' },
        bodyFont: { size: 13 },
        cornerRadius: 12,
        borderColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
        borderWidth: 1,
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: gridLineColor, drawBorder: false },
        ticks: { color: secondaryTextColor, font: { size: 11 } }
      },
      x: {
        grid: { display: false },
        ticks: { color: secondaryTextColor, font: { size: 11 } }
      }
    }
  };

  const donutOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '75%',
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true }
    }
  };

  // Filter navigation menu based on role
  const filteredMenu = NAVIGATION_MENU.filter(m => {
    if (m.id === FormType.DASHBOARD) return false;
    if (m.id === FormType.USER && !isAdmin) return false;
    return true;
  });

  const getFormTypeFromKey = (key: string): FormType => {
    const mapping: Record<string, FormType> = {
      sasaran: FormType.SASARAN,
      kegiatan: FormType.KEGIATAN,
      rpjmn: FormType.RPJMN,
      kelasBalita: FormType.KELAS_BALITA,
      kelasBalitaKabKota: FormType.KELAS_BALITA_KAB_KOTA,
      kematianNeonatal: FormType.KEMATIAN_NEONATAL,
      kematianBalita: FormType.KEMATIAN_BALITA,
      users: FormType.USER
    };
    return mapping[key] || FormType.DASHBOARD;
  };

  const needsRevision = Object.entries(records).flatMap(([key, list]: [string, any]) => {
    const type = getFormTypeFromKey(key);
    if (type === FormType.DASHBOARD) return [];
    return (Array.isArray(list) ? list : []).filter((r: any) => r.Status_Validasi === 'Belum Valid').map((r: any) => ({ ...r, _type: type }));
  });

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    const sliderTimer = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % sliderImages.length);
    }, 5000);
    return () => {
      clearInterval(timer);
      clearInterval(sliderTimer);
    };
  }, []);

  const formatDate = () => {
    return new Intl.DateTimeFormat('id-ID', {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
    }).format(time);
  };

  const formatTime = () => {
    return time.toLocaleTimeString('id-ID', {
      hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
    });
  };

  return (
    <div className="space-y-10">
      {/* Hero Section */}
      <section className="relative h-[450px] rounded-[3rem] overflow-hidden shadow-2xl group">
        {sliderImages.map((img, idx) => (
          <div 
            key={idx}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${idx === activeSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}`}
          >
            <img src={img.url} className="w-full h-full object-cover" alt="Hero" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex flex-col items-center justify-center text-center p-8">
              <h2 className="text-white text-5xl md:text-7xl font-black mb-4 drop-shadow-2xl translate-y-4 animate-fade-in">
                {img.title}
              </h2>
              <p className="text-emerald-400 text-lg md:text-2xl font-black uppercase tracking-[0.3em] max-w-2xl drop-shadow-lg">
                {img.desc}
              </p>
            </div>
          </div>
        ))}

        <div className="absolute bottom-8 left-8 right-8 flex flex-col md:flex-row justify-between items-end md:items-center bg-white/5 backdrop-blur-2xl border border-white/10 p-8 rounded-[2.5rem]">
          <div className="space-y-1">
            <h3 className="text-white text-3xl font-black tracking-tight">
              Halo, {currentUser?.puskesmasName || currentUser?.username}
            </h3>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs flex items-center gap-2">
              <i className="bi bi-calendar3 text-emerald-500"></i> {formatDate()}
            </p>
          </div>
          <div className="text-white text-3xl md:text-5xl font-black tracking-tighter mt-4 md:mt-0 font-mono opacity-80 drop-shadow-md">
            {formatTime()}
          </div>
        </div>
      </section>

      {/* Real-time Stats Container */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Laporan', value: totalLaporan, icon: 'bi-files', color: 'text-blue-500', bg: 'bg-blue-500/10' },
          { label: 'Rate Validasi', value: `${rateValidasi}%`, icon: 'bi-check2-circle', color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
          { label: 'Data Terkirim', value: totalTerkirim, icon: 'bi-send', color: 'text-amber-500', bg: 'bg-amber-500/10' },
          { label: 'Perbaikan', value: totalPerbaikan, icon: 'bi-exclamation-octagon', color: 'text-rose-500', bg: 'bg-rose-500/10' },
        ].map((stat, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 p-6 rounded-[2rem] flex items-center gap-5 transition-transform hover:scale-105 shadow-sm dark:shadow-none">
            <div className={`${stat.bg} ${stat.color} w-16 h-16 rounded-2xl flex items-center justify-center text-2xl shadow-inner`}>
              <i className={`bi ${stat.icon}`}></i>
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{stat.label}</p>
              <h4 className="text-3xl font-black text-slate-900 dark:text-white leading-none">{stat.value}</h4>
            </div>
          </div>
        ))}
      </section>

      {/* Charts Section */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-white/5 flex flex-col items-center shadow-sm dark:shadow-none">
          <h3 className="text-slate-900 dark:text-white text-lg font-black uppercase tracking-widest self-start mb-10 flex items-center gap-3">
            <span className="w-2 h-6 bg-emerald-500 rounded-full"></span> Validasi
          </h3>
          <div className="w-full h-64 relative">
            <Pie data={pieData} options={donutOptions} />
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-5xl font-black text-slate-900 dark:text-white">{rateValidasi}%</span>
              <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-1">Selesai</span>
            </div>
          </div>
          <div className="mt-8 flex gap-6">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Valid</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-slate-200 dark:bg-slate-800"></span>
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Proses</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-white/5 shadow-sm dark:shadow-none">
          <h3 className="text-slate-900 dark:text-white text-lg font-black uppercase tracking-widest mb-10 flex items-center gap-3">
            <span className="w-2 h-6 bg-blue-500 rounded-full"></span> Laporan Bulanan
          </h3>
          <div className="h-64 w-full">
            <Bar data={barData} options={chartOptions} />
          </div>
        </div>

        <div className="lg:col-span-3 bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] border border-slate-200 dark:border-white/5 shadow-sm dark:shadow-none">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
            <h3 className="text-slate-900 dark:text-white text-xl font-black uppercase tracking-widest flex items-center gap-3">
              <span className="w-2 h-8 bg-rose-500 rounded-full"></span> Tren Kematian Anak
            </h3>
            <div className="flex gap-6 bg-slate-50 dark:bg-slate-950/50 px-6 py-3 rounded-2xl border border-slate-200 dark:border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.5)]"></div>
                <span className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Neonatal</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]"></div>
                <span className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Balita</span>
              </div>
            </div>
          </div>
          <div className="h-80 w-full">
            <Line data={lineData} options={chartOptions} />
          </div>
        </div>
      </section>

      {/* Revision Alerts Section */}
      {needsRevision.length > 0 && (
        <section className="animate-fade-in">
          <div className="mb-8 flex items-center gap-4">
            <div className="w-3 h-10 bg-rose-500 rounded-full shadow-[0_0_20px_rgba(244,63,94,0.3)]"></div>
            <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Laporan Perlu Perbaikan</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {needsRevision.map((report, idx) => (
              <div key={idx} className="bg-rose-500/5 hover:bg-rose-500/10 border-2 border-rose-500/20 p-8 rounded-[2.5rem] flex flex-col justify-between transition-all group shadow-sm dark:shadow-none">
                <div>
                  <div className="flex gap-5 items-start mb-6">
                    <div className="w-16 h-16 bg-rose-500 text-white rounded-[1.25rem] flex items-center justify-center text-3xl shadow-2xl shadow-rose-500/30 group-hover:scale-110 transition-transform">
                      <i className="bi bi-exclamation-triangle-fill"></i>
                    </div>
                    <div>
                      <h4 className="text-xl font-black text-slate-900 dark:text-white leading-tight mb-2">
                        {NAVIGATION_MENU.find(m => m.id === report._type)?.label}
                      </h4>
                      <p className="text-[10px] text-rose-600 dark:text-rose-500 font-black uppercase tracking-widest opacity-80">
                        {report.Bulan} {report.Tahun}
                      </p>
                    </div>
                  </div>
                  <div className="bg-rose-50 dark:bg-rose-500/10 p-5 rounded-2xl border border-rose-200 dark:border-rose-500/10 mb-8">
                    <p className="text-[10px] font-black text-rose-600 dark:text-rose-400 uppercase tracking-[0.2em] mb-2">Catatan Validasi:</p>
                    <p className="text-sm text-slate-700 dark:text-slate-200 font-bold leading-relaxed italic">
                      "{report.Catatan_Validasi || 'Data perlu diperiksa dan diinput kembali dengan benar.'}"
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => onNavigate(report._type, { type: report._type, data: report })}
                  className="w-full bg-rose-500 hover:bg-rose-600 text-white py-4 rounded-2xl text-sm font-black shadow-xl shadow-rose-500/20 transition-all active:scale-[0.97]"
                >
                  PERBAIKI DATA SEKARANG
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Navigation Grid */}
      <section>
        <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-3 h-10 bg-emerald-500 rounded-full"></div>
            <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Navigasi Pelaporan</h3>
          </div>
          <p className="text-slate-500 dark:text-slate-500 font-bold text-sm tracking-wide bg-white dark:bg-slate-900 px-6 py-2 rounded-full border border-slate-200 dark:border-white/5 italic shadow-sm dark:shadow-none">
            * Pilih menu dibawah ini untuk memulai pelaporan
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredMenu.map((item) => (
            <div 
              key={item.id} 
              onClick={() => onNavigate(item.id as FormType)}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 p-8 rounded-[2.5rem] cursor-pointer group transition-all hover:bg-slate-50 dark:hover:bg-slate-800/80 hover:border-emerald-500/30 hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-500/10 dark:shadow-none"
            >
              <div className={`${item.color} w-16 h-16 rounded-[1.25rem] flex items-center justify-center text-white text-3xl mb-8 shadow-xl group-hover:rotate-6 transition-all`}>
                {item.icon}
              </div>
              <h4 className="text-xl font-black text-slate-800 dark:text-white mb-2 group-hover:text-emerald-500 transition-colors uppercase tracking-tight">{item.label}</h4>
              <p className="text-xs text-slate-500 font-bold leading-relaxed group-hover:text-slate-600 dark:group-hover:text-slate-400 transition-colors">
                Lakukan pengisian data {item.label.toLowerCase()} secara berkala sesuai periode.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* History Section */}
      <section className="animate-fade-in">
        <div className="mb-8 flex items-center gap-4">
          <div className="w-3 h-10 bg-slate-500 rounded-full"></div>
          <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Riwayat Terakhir</h3>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-white/5 overflow-hidden shadow-2xl dark:shadow-none">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-950/50 border-b border-slate-200 dark:border-white/5 text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">
                  <th className="p-6">Jenis Laporan</th>
                  <th className="p-6">Puskesmas</th>
                  <th className="p-6">Periode</th>
                  <th className="p-6">Status</th>
                  <th className="p-6 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(records).flatMap(([key, list]: [string, any]) => {
                  const type = getFormTypeFromKey(key);
                  if (type === FormType.DASHBOARD) return [];
                  return (Array.isArray(list) ? list : []).map((r: any) => ({ ...r, _type: type }));
                }).sort((a, b) => {
                  const dateA = a.Timestamp ? new Date(a.Timestamp).getTime() : 0;
                  const dateB = b.Timestamp ? new Date(b.Timestamp).getTime() : 0;
                  return dateB - dateA;
                })
                  .slice(0, 15)
                  .map((report, idx) => (
                  <tr key={idx} className="border-b border-slate-100 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group">
                    <td className="p-6 font-black text-slate-900 dark:text-white group-hover:text-emerald-500 transition-colors">
                      {NAVIGATION_MENU.find(m => m.id === report._type)?.label}
                    </td>
                    <td className="p-6 text-slate-500 dark:text-slate-400 font-bold">{report.Nama_Puskesmas}</td>
                    <td className="p-6 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider text-xs">
                      {report.Bulan} {report.Tahun}
                    </td>
                    <td className="p-6">
                      <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] ${
                        report.Status_Validasi === 'Valid' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-500 border border-emerald-500/30' :
                        report.Status_Validasi === 'Belum Valid' ? 'bg-rose-500/10 text-rose-600 dark:text-rose-500 border border-rose-500/30' :
                        'bg-blue-500/10 text-blue-600 dark:text-blue-500 border border-blue-500/30'
                      }`}>
                        {report.Status_Validasi || 'Draft'}
                      </span>
                    </td>
                    <td className="p-6 text-right">
                      <div className="flex justify-end gap-3">
                        <button 
                          onClick={() => onNavigate(report._type, { type: report._type, data: report })}
                          className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-blue-500 hover:text-white flex items-center justify-center transition-all shadow-md dark:shadow-lg"
                        >
                          <i className="bi bi-pencil-square"></i>
                        </button>
                        {onDelete && (isAdmin || report.Status_Validasi !== 'Valid') && (
                          <button 
                            onClick={() => onDelete(report._type, report.Id_Data)}
                            className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-rose-500 hover:text-white flex items-center justify-center transition-all shadow-md dark:shadow-lg"
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
