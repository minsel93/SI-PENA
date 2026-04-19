import React, { useState } from 'react';
import { motion } from 'motion/react';
import { User } from '../types';
import { gasService } from '../services/gasService';

interface LoginProps {
  onLogin: (user: User) => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await gasService.login(username, password);
      if (response.success) {
        onLogin({
          username: response.user.username,
          role: response.user.role,
          puskesmasName: response.user.puskesmasName,
          puskesmasId: response.user.puskesmasId
        });
      } else {
        setError(response.message || 'Username atau password salah.');
      }
    } catch (err) {
      console.error("Login error:", err);
      setError('Gagal terhubung ke server. Periksa koneksi internet Anda.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4 relative overflow-hidden font-sans transition-colors duration-300">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/5 dark:bg-emerald-500/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-[120px]"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl border border-slate-200 dark:border-white/10 rounded-[40px] p-10 shadow-2xl shadow-slate-200/50 dark:shadow-none overflow-hidden relative transition-colors duration-300">
          {/* Glassmorphism Shine */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent"></div>
          
          <div className="text-center mb-10">
            <motion.div 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mb-6"
            >
              <img 
                src="https://i.ibb.co.com/b58BrxT3/IMAGE-1.png" 
                alt="Logo Kabupaten" 
                className="h-24 mx-auto drop-shadow-xl dark:drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]"
              />
            </motion.div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-2">SI-PENA</h1>
            <p className="text-emerald-600 dark:text-emerald-500 text-xs font-bold uppercase tracking-[0.2em]">Sistem Pelaporan Kesehatan Anak</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">Username</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <i className="bi bi-person text-slate-300 group-focus-within:text-emerald-500 transition-colors"></i>
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-white/5 rounded-2xl py-4 pl-12 pr-4 text-slate-900 dark:text-white placeholder-slate-300 dark:placeholder-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/30 transition-all"
                  placeholder="Masukkan username"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <i className="bi bi-lock text-slate-300 group-focus-within:text-emerald-500 transition-colors"></i>
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-white/5 rounded-2xl py-4 pl-12 pr-4 text-slate-900 dark:text-white placeholder-slate-300 dark:placeholder-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/30 transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-rose-50 dark:bg-rose-500/10 border border-rose-100 dark:border-rose-500/20 text-rose-500 p-4 rounded-2xl text-sm flex items-center gap-3"
              >
                <i className="bi bi-exclamation-circle"></i>
                {error}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-slate-900 dark:bg-white dark:text-slate-900 text-white font-black py-4 rounded-2xl shadow-xl shadow-slate-900/10 transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3 group"
            >
              {isLoading ? (
                <i className="bi bi-arrow-repeat animate-spin"></i>
              ) : (
                <>
                  MASUK KE DASHBOARD
                  <i className="bi bi-arrow-right group-hover:translate-x-1 transition-transform"></i>
                </>
              )}
            </button>
          </form>

          <div className="mt-10 pt-6 border-t border-slate-50 dark:border-white/5 text-center">
            <p className="text-slate-400 dark:text-slate-600 text-[10px] font-bold uppercase tracking-widest">
              &copy; 2026 Dinas Kesehatan Kabupaten Minahasa Selatan
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
