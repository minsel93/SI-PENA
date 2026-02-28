
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, LineChart, Line } from 'recharts';
import { FormType, User } from '../types';
import { NAVIGATION_MENU } from '../constants';

const dataBar = [
  { name: 'Jan', Laporan: 45 },
  { name: 'Feb', Laporan: 60 },
  { name: 'Mar', Laporan: 80 },
  { name: 'Apr', Laporan: 55 },
  { name: 'Mei', Laporan: 90 },
  { name: 'Jun', Laporan: 75 },
  { name: 'Jul', Laporan: 0 },
  { name: 'Agu', Laporan: 0 },
  { name: 'Sep', Laporan: 0 },
  { name: 'Okt', Laporan: 0 },
  { name: 'Nov', Laporan: 0 },
  { name: 'Des', Laporan: 0 },
];

const dataPie = [
  { name: 'Tercapai', value: 75, color: '#0056b3' },
  { name: 'Belum', value: 25, color: '#e9ecef' },
];

const sliderImages = [
  {
    url: "https://i.ibb.co.com/S4Vg2Tf4/unnamed-5.jpg",
    title: "Child Health",
    desc: "Track, Analyze, and improve outcomes"
  },
  {
    url: "https://i.ibb.co.com/pj1gMW1g/Desain-tanpa-judul-6.png",
    title: "SI-PENA",
    desc: "Sistem Pelaporan Kesehatan Anak"
  },
  {
    url: "https://i.ibb.co.com/twq32zLZ/Gemini-Generated-Image-p2pquvp2pquvp2pq.jpg",
    title: "Digitalisasi Data Anak",
    desc: "Pelaporan Kesehatan yang Cepat, Akurat dan Transparan"
  }
];

const Dashboard: React.FC<{ 
  onNavigate: (id: FormType, editingData?: { type: FormType, data: any }) => void,
  records: any,
  isAdmin?: boolean,
  currentUser?: User | null
}> = ({ onNavigate, records, isAdmin, currentUser }) => {
  const [time, setTime] = useState(new Date());
  const [activeSlide, setActiveSlide] = useState(0);

  // Process data for charts
  const monthlyStats = [
    { name: 'Jan', Laporan: 0 }, { name: 'Feb', Laporan: 0 }, { name: 'Mar', Laporan: 0 },
    { name: 'Apr', Laporan: 0 }, { name: 'Mei', Laporan: 0 }, { name: 'Jun', Laporan: 0 },
    { name: 'Jul', Laporan: 0 }, { name: 'Agu', Laporan: 0 }, { name: 'Sep', Laporan: 0 },
    { name: 'Okt', Laporan: 0 }, { name: 'Nov', Laporan: 0 }, { name: 'Des', Laporan: 0 },
  ];

  let totalValid = 0;
  let totalReports = 0;

  Object.values(records).forEach((list: any) => {
    (list || []).forEach((r: any) => {
      totalReports++;
      if (r.Status_Validasi === 'Valid') totalValid++;
      
      const monthIdx = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'].indexOf(r.Bulan);
      if (monthIdx !== -1) {
        monthlyStats[monthIdx].Laporan++;
      }
    });
  });

  const validPercentage = totalReports > 0 ? Math.round((totalValid / totalReports) * 100) : 0;
  const dataPie = [
    { name: 'Valid', value: validPercentage, color: '#10b981' },
    { name: 'Proses', value: 100 - validPercentage, color: '#e2e8f0' },
  ];

  // Process death trends
  const deathTrends = [
    { name: 'Jan', Neonatal: 0, Balita: 0 }, { name: 'Feb', Neonatal: 0, Balita: 0 }, { name: 'Mar', Neonatal: 0, Balita: 0 },
    { name: 'Apr', Neonatal: 0, Balita: 0 }, { name: 'Mei', Neonatal: 0, Balita: 0 }, { name: 'Jun', Neonatal: 0, Balita: 0 },
    { name: 'Jul', Neonatal: 0, Balita: 0 }, { name: 'Agu', Neonatal: 0, Balita: 0 }, { name: 'Sep', Neonatal: 0, Balita: 0 },
    { name: 'Okt', Neonatal: 0, Balita: 0 }, { name: 'Nov', Neonatal: 0, Balita: 0 }, { name: 'Des', Neonatal: 0, Balita: 0 },
  ];

  (records.kematianNeonatal || []).forEach((r: any) => {
    const monthIdx = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'].indexOf(r.Bulan);
    if (monthIdx !== -1) {
      deathTrends[monthIdx].Neonatal += (r.Kematian_Neonatal_Jumlah_Kematian_Neonatal || 0);
    }
  });

  (records.kematianBalita || []).forEach((r: any) => {
    const monthIdx = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'].indexOf(r.Bulan);
    if (monthIdx !== -1) {
      deathTrends[monthIdx].Balita += (r["Kematian_Balita(0-59_bln)(neonatal_+_post_neonatal+anak_balita)"] || 0);
    }
  });

  // Filter navigation menu based on role
  const filteredMenu = NAVIGATION_MENU.filter(m => {
    if (m.id === FormType.DASHBOARD || m.id === FormType.AI_INSIGHTS) return false;
    if (m.id === FormType.USER && !isAdmin) return false;
    return true;
  });

  // Filter reports that need revision (for Puskesmas)
  const needsRevision = Object.entries(records).flatMap(([key, list]: [string, any]) => {
    let typeStr = key.toUpperCase();
    if (typeStr === 'USERS') typeStr = 'USER';
    const type = ('FORM_' + typeStr) as FormType;
    return (list || []).filter((r: any) => r.Status_Validasi === 'Belum Valid').map((r: any) => ({ ...r, _type: type }));
  });

  // Filter incoming reports for validation (for Admin)
  const incomingReports = Object.entries(records).flatMap(([key, list]: [string, any]) => {
    let typeStr = key.toUpperCase();
    if (typeStr === 'USERS') typeStr = 'USER';
    const type = ('FORM_' + typeStr) as FormType;
    return (list || []).filter((r: any) => r.Status_Validasi === 'Terkirim').map((r: any) => ({ ...r, _type: type }));
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

  const getGreeting = () => {
    const hour = time.getHours();
    if (hour < 11) return "Selamat Pagi";
    if (hour < 15) return "Selamat Siang";
    if (hour < 19) return "Selamat Sore";
    return "Selamat Malam";
  };

  const formatDate = () => {
    return new Intl.DateTimeFormat('id-ID', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(time);
  };

  const formatTime = () => {
    return time.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  };

  return (
    <div className="space-y-12">
      {/* Hero Slider Section */}
      <section className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
        {sliderImages.map((img, idx) => (
          <div 
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === activeSlide ? 'opacity-100' : 'opacity-0'}`}
          >
            <img src={img.url} className="w-full h-full object-cover scale-105" alt="Hero" />
            <div className="absolute inset-0 bg-black/40 hero-gradient-overlay flex flex-col items-center justify-center text-center p-6">
              <h2 className="text-white text-5xl md:text-6xl font-extrabold mb-4 animate-fade-in-up drop-shadow-lg">
                {img.title}
              </h2>
              <p className="text-slate-100 text-xl md:text-2xl font-medium max-w-2xl drop-shadow-md">
                {img.desc}
              </p>
            </div>
          </div>
        ))}

        {/* Floating Greeting & Clock Widget */}
        <div className="absolute bottom-6 left-6 right-6 flex flex-col md:flex-row justify-between items-end md:items-center bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl">
          <div>
            <h3 className="text-white text-2xl font-bold flex items-center gap-2">
              {getGreeting()}, {currentUser?.puskesmasName || currentUser?.username || 'Petugas SI-PENA'}
            </h3>
            <p className="text-slate-200 font-medium">{formatDate()}</p>
          </div>
          <div className="text-white text-5xl font-mono font-bold tracking-widest mt-4 md:mt-0">
            {formatTime()}
          </div>
        </div>
      </section>

      {/* Analytics Charts Section */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center">
          <h3 className="text-slate-800 text-lg font-bold self-start mb-6">Validasi Laporan</h3>
          <div className="w-full h-72 relative">
            <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0} debounce={1}>
              <PieChart>
                <Pie
                  data={dataPie}
                  innerRadius={80}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {dataPie.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-4xl font-black text-slate-800">{validPercentage}%</span>
              <span className="text-xs text-slate-500 font-bold uppercase tracking-widest">Valid</span>
            </div>
          </div>
          <div className="flex gap-6 mt-4">
            {dataPie.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full" style={{backgroundColor: item.color}}></span>
                <span className="text-sm font-semibold text-slate-600">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
          <h3 className="text-slate-800 text-lg font-bold mb-6">Statistik Laporan Bulanan</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0} debounce={1}>
              <BarChart data={monthlyStats}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                />
                <Bar dataKey="Laporan" fill="#0ea5e9" radius={[6, 6, 0, 0]} barSize={32}>
                    {monthlyStats.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.Laporan > 0 ? '#10b981' : '#e2e8f0'} />
                    ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-3 bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-slate-800 text-lg font-bold">Tren Kematian Anak (Neonatal & Balita)</h3>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                <span className="text-xs font-bold text-slate-500 uppercase">Neonatal</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                <span className="text-xs font-bold text-slate-500 uppercase">Balita</span>
              </div>
            </div>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0} debounce={1}>
              <LineChart data={deathTrends}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                />
                <Line type="monotone" dataKey="Neonatal" stroke="#f43f5e" strokeWidth={4} dot={{r: 6, fill: '#f43f5e', strokeWidth: 2, stroke: '#fff'}} activeDot={{r: 8}} />
                <Line type="monotone" dataKey="Balita" stroke="#f59e0b" strokeWidth={4} dot={{r: 6, fill: '#f59e0b', strokeWidth: 2, stroke: '#fff'}} activeDot={{r: 8}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* Admin: Incoming Reports Section */}
      {isAdmin && incomingReports.length > 0 && (
        <section className="animate-fade-in">
          <div className="mb-6 flex items-center gap-3">
            <div className="w-2 h-8 bg-emerald-500 rounded-full"></div>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">Laporan Masuk (Perlu Validasi)</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {incomingReports.map((report, idx) => (
              <div key={idx} className="bg-emerald-50 border border-emerald-100 p-6 rounded-3xl flex justify-between items-center shadow-sm">
                <div className="flex gap-4 items-center">
                  <div className="w-12 h-12 bg-emerald-500 text-white rounded-2xl flex items-center justify-center text-xl shadow-lg">
                    <i className="fas fa-file-import"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">{NAVIGATION_MENU.find(m => m.id === report._type)?.label}</h4>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">{report.Nama_Puskesmas} • {report.Bulan} {report.Tahun}</p>
                    <p className="text-sm text-emerald-600 font-medium mt-1">Menunggu validasi admin</p>
                  </div>
                </div>
                <button 
                  onClick={() => onNavigate(report._type, { type: report._type, data: report })}
                  className="bg-white text-emerald-600 px-5 py-2.5 rounded-xl text-sm font-black shadow-sm hover:bg-emerald-600 hover:text-white transition-all border border-emerald-200"
                >
                  VALIDASI
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Revision Alerts Section */}
      {needsRevision.length > 0 && (
        <section className="animate-fade-in">
          <div className="mb-6 flex items-center gap-3">
            <div className="w-2 h-8 bg-rose-500 rounded-full"></div>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">Laporan Perlu Perbaikan</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {needsRevision.map((report, idx) => (
              <div key={idx} className="bg-rose-50 border border-rose-100 p-6 rounded-3xl flex justify-between items-center shadow-sm">
                <div className="flex gap-4 items-center">
                  <div className="w-12 h-12 bg-rose-500 text-white rounded-2xl flex items-center justify-center text-xl shadow-lg">
                    <i className="fas fa-exclamation-triangle"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">{NAVIGATION_MENU.find(m => m.id === report._type)?.label}</h4>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">{report.Bulan} {report.Tahun}</p>
                    <p className="text-sm text-rose-600 font-medium mt-1 italic">"{report.Catatan_Validasi || 'Data perlu diperiksa kembali'}"</p>
                  </div>
                </div>
                <button 
                  onClick={() => onNavigate(report._type, { type: report._type, data: report })}
                  className="bg-white text-rose-600 px-5 py-2.5 rounded-xl text-sm font-black shadow-sm hover:bg-rose-600 hover:text-white transition-all border border-rose-200"
                >
                  PERBAIKI
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Form Navigation Grid */}
      <section>
        <div className="mb-8 flex items-center justify-between">
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">Navigasi Pelaporan</h3>
            <p className="text-slate-500 font-medium">Klik pada kartu untuk membuka formulir input data.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredMenu.map((item) => (
            <div 
              key={item.id} 
              onClick={() => onNavigate(item.id)}
              className="form-card bg-white p-6 cursor-pointer group"
            >
              <div className={`${item.color} w-14 h-14 rounded-2xl flex items-center justify-center text-white text-2xl mb-5 shadow-lg group-hover:scale-110 transition-transform`}>
                {item.icon}
              </div>
              <h4 className="text-lg font-bold text-slate-800 mb-1 group-hover:text-emerald-600 transition-colors">{item.label}</h4>
              <p className="text-xs text-slate-400 font-medium leading-relaxed">Kelola dan input data {item.label.toLowerCase()} secara berkala.</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
