import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Mail, Lock, User, Zap, Check } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

export function SignupPage() {
  const navigate = useNavigate();
  const { setUser } = useAuthStore();
  const [formData, setFormData] = useState({ fullName: '', email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!formData.fullName.trim()) e.fullName = 'Full name is required';
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Enter a valid email';
    if (formData.password.length < 8) e.password = 'Minimum 8 characters';
    if (formData.password !== formData.confirmPassword) e.confirmPassword = 'Passwords do not match';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => {
      setUser({ id: Date.now().toString(), fullName: formData.fullName, email: formData.email });
      setLoading(false);
      navigate('/dashboard');
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(p => ({ ...p, [name]: value }));
    if (errors[name]) setErrors(p => ({ ...p, [name]: '' }));
  };

  const perks = ['Free forever plan', 'No credit card needed', 'AI agents ready instantly'];

  return (
    <div className="min-h-screen bg-[#050510] flex overflow-hidden">

      {/* LEFT — Branding panel */}
      <div className="hidden lg:flex flex-col justify-between w-[45%] relative p-12 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-violet-900/40 via-purple-950/60 to-[#050510]" />
        <div className="absolute top-20 left-20 w-72 h-72 bg-violet-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-32 right-10 w-64 h-64 bg-cyan-600/15 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-700/10 rounded-full blur-3xl" />

        {/* Floating card */}
        <div className="absolute top-32 right-8 bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl p-4 w-52 z-10">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-4 h-4 text-amber-400" />
            <span className="text-white text-xs font-semibold">Generating content...</span>
          </div>
          <div className="space-y-2">
            {['Blog post', 'Instagram', 'LinkedIn'].map(t => (
              <div key={t} className="flex items-center gap-2">
                <span className="text-slate-500 text-[10px] w-16 shrink-0">{t}</span>
                <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-linear-to-r from-violet-500 to-cyan-500 rounded-full"
                    style={{ width: `${Math.floor(Math.random() * 40) + 50}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-40 right-10 bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl p-4 w-44 z-10">
          <div className="text-slate-400 text-[10px] mb-1">Posts this month</div>
          <div className="text-2xl font-bold bg-linear-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">1,284</div>
          <div className="text-green-400 text-[10px] mt-1">+18% growth</div>
        </div>

        {/* Logo text */}
        <div className="relative z-10">
          <span className="text-xl font-bold text-white tracking-tight">KontentIQ</span>
        </div>

        <div className="relative z-10 space-y-6">
          <h2 className="text-4xl font-bold text-white leading-tight">
            Your brand.<br />
            <span className="bg-linear-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              Supercharged by AI.
            </span>
          </h2>
          <p className="text-slate-400 leading-relaxed text-sm">
            Set up your brand vault, train your AI agents, and generate on-brand content for every channel in minutes.
          </p>
          <div className="space-y-3">
            {perks.map((p, i) => (
              <div key={i} className="flex items-center gap-3 text-slate-300 text-sm">
                <div className="w-5 h-5 rounded-full bg-violet-500/20 border border-violet-500/40 flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 text-violet-400" />
                </div>
                {p}
              </div>
            ))}
          </div>
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
            <h1 className="text-3xl font-bold text-white">Create your account</h1>
            <p className="text-slate-400 text-sm">Join KontentIQ and start building smarter content</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                <User className="w-3.5 h-3.5" /> Full Name
              </label>
              <input name="fullName" type="text" placeholder="Full Name" value={formData.fullName}
                onChange={handleChange}
                className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-600 focus:outline-none focus:border-violet-500/50 transition-all text-sm" />
              {errors.fullName && <p className="text-red-400 text-xs">{errors.fullName}</p>}
            </div>

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
              <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                <Lock className="w-3.5 h-3.5" /> Password
              </label>
              <input name="password" type="password" placeholder="••••••••" value={formData.password}
                onChange={handleChange}
                className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-600 focus:outline-none focus:border-violet-500/50 transition-all text-sm" />
              {errors.password && <p className="text-red-400 text-xs">{errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                <Lock className="w-3.5 h-3.5" /> Confirm Password
              </label>
              <input name="confirmPassword" type="password" placeholder="••••••••" value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-600 focus:outline-none focus:border-violet-500/50 transition-all text-sm" />
              {errors.confirmPassword && <p className="text-red-400 text-xs">{errors.confirmPassword}</p>}
            </div>

            <button type="submit" disabled={loading}
              className="w-full h-12 rounded-xl bg-linear-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-semibold transition-all shadow-lg shadow-violet-500/25 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2">
              {loading ? (
                <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Creating account...</>
              ) : (
                <>Create Account <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500">
            Already have an account?{' '}
            <button onClick={() => navigate('/login')} className="text-violet-400 hover:text-violet-300 font-medium transition-colors">
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}