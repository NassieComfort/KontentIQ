import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Mail, Lock } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

export function LoginPage() {
  const navigate = useNavigate();
  const { setUser } = useAuthStore();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Enter a valid email';
    if (formData.password.length < 6) e.password = 'Enter your password';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => {
      const stored = localStorage.getItem('auth-storage');
      let fullName = formData.email.split('@')[0];
      if (stored) {
        try {
          const p = JSON.parse(stored);
          if (p.state?.user?.fullName) fullName = p.state.user.fullName;
        } catch {}
      }
      setUser({ id: Date.now().toString(), fullName, email: formData.email });
      setLoading(false);
      navigate('/dashboard');
    }, 900);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(p => ({ ...p, [name]: value }));
    if (errors[name]) setErrors(p => ({ ...p, [name]: '' }));
  };

  return (
    <div className="min-h-screen bg-[#050510] flex overflow-hidden">

      {/* LEFT — Branding panel */}
      <div className="hidden lg:flex flex-col justify-between w-[45%] relative p-12 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-violet-900/40 via-purple-950/60 to-[#050510]" />
        <div className="absolute top-20 left-20 w-72 h-72 bg-violet-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-32 right-10 w-64 h-64 bg-cyan-600/15 rounded-full blur-3xl" />

        {/* Floating stats card */}
        <div className="absolute top-24 right-6 bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl p-4 w-48 z-10 space-y-4">
          <div>
            <div className="text-slate-500 text-[10px] mb-1">Posts Generated</div>
            <div className="flex items-end gap-2">
              <span className="text-white font-bold text-xl">1,284</span>
              <span className="text-green-400 text-[10px] mb-0.5">+18%</span>
            </div>
          </div>
          <div>
            <div className="text-slate-500 text-[10px] mb-1">Brand Score</div>
            <div className="flex items-end gap-2">
              <span className="text-white font-bold text-xl">94.2%</span>
              <span className="text-green-400 text-[10px] mb-0.5">+2.1%</span>
            </div>
          </div>
        </div>

        {/* AI agent active card */}
        <div className="absolute bottom-24 left-8 bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl px-4 py-3 flex items-center gap-3 w-48 z-10">
     <div className="w-8 h-8 rounded-full bg-linear-to-br from-violet-500 to-cyan-500 flex items-center justify-center shrink-0">
  <div className="w-2.5 h-2.5 bg-white rounded-full animate-pulse" />
</div>
          <div>
            <div className="text-white text-xs font-semibold">Agent active</div>
            <div className="text-slate-400 text-[10px]">Generating content...</div>
          </div>
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse ml-auto" />
        </div>

        {/* Logo text */}
        <div className="relative z-10">
          <span className="text-xl font-bold text-white tracking-tight">KontentIQ</span>
        </div>

        <div className="relative z-10 space-y-4">
          <h2 className="text-4xl font-bold text-white leading-tight">
            Welcome back.<br />
            <span className="bg-linear-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              Let's create.
            </span>
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            Your AI agents have been working. Sign in to see what they've created for your brands.
          </p>
        </div>

        <div className="relative z-10 text-slate-600 text-xs">© 2026 KontentIQ</div>
      </div>

      {/* RIGHT — Form */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 relative">
        <div className="absolute inset-0 bg-[#050510]" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-violet-900/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 w-full max-w-md space-y-8">

          {/* Mobile logo */}
          <div className="flex lg:hidden mb-4">
            <span className="text-lg font-bold text-white">KontentIQ</span>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-white">Welcome back</h1>
            <p className="text-slate-400 text-sm">Sign in to access your dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                <Mail className="w-3.5 h-3.5" /> Email Address
              </label>
              <input name="email" type="email" placeholder="you@example.com" value={formData.email}
                onChange={handleChange}
                className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-600 focus:outline-none focus:border-violet-500/50 transition-all text-sm" />
              {errors.email && <p className="text-red-400 text-xs">{errors.email}</p>}
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                  <Lock className="w-3.5 h-3.5" /> Password
                </label>
                <button type="button" className="text-violet-400 hover:text-violet-300 text-xs transition-colors">
                  Forgot password?
                </button>
              </div>
              <input name="password" type="password" placeholder="••••••••" value={formData.password}
                onChange={handleChange}
                className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-600 focus:outline-none focus:border-violet-500/50 transition-all text-sm" />
              {errors.password && <p className="text-red-400 text-xs">{errors.password}</p>}
            </div>

            <button type="submit" disabled={loading}
              className="w-full h-12 rounded-xl bg-linear-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-semibold transition-all shadow-lg shadow-violet-500/25 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2">
              {loading ? (
                <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Signing in...</>
              ) : (
                <>Sign In <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500">
            Don't have an account?{' '}
            <button onClick={() => navigate('/signup')} className="text-violet-400 hover:text-violet-300 font-medium transition-colors">
              Create one free
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}