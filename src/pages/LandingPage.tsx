import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Zap, BarChart3, Sparkles, Brain, Layers, Globe, Check } from 'lucide-react';

function NeuralCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    let animId: number;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);
    const nodes: { x: number; y: number; vx: number; vy: number; r: number }[] = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 2 + 1,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      nodes.forEach(n => {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
      });
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(109,94,245,${1 - dist / 150})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      nodes.forEach(n => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(139,92,246,0.8)';
        ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-40 pointer-events-none" />;
}

function TypeWriter({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[index % words.length];
    const timeout = setTimeout(() => {
      if (!deleting) {
        setText(current.slice(0, text.length + 1));
        if (text.length === current.length) setTimeout(() => setDeleting(true), 1500);
      } else {
        setText(current.slice(0, text.length - 1));
        if (text.length === 0) { setDeleting(false); setIndex(i => i + 1); }
      }
    }, deleting ? 40 : 80);
    return () => clearTimeout(timeout);
  }, [text, deleting, index, words]);

  return (
    <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
      {text}<span className="animate-pulse">|</span>
    </span>
  );
}

const features = [
  { icon: Brain,    color: 'from-violet-500 to-purple-600',  title: 'AI Content Engine',        desc: 'Generate blog posts, captions, and campaigns for every platform in seconds.' },
  { icon: Layers,   color: 'from-cyan-500 to-blue-600',      title: 'Multi-Brand Management',   desc: 'Store brand colors, fonts, voice, and assets — all in one place.' },
  { icon: Zap,      color: 'from-amber-500 to-orange-500',   title: 'Smart Automation',          desc: 'AI agents work 24/7 to create, review, and schedule your content.' },
  { icon: BarChart3,color: 'from-green-500 to-emerald-600',  title: 'Performance Analytics',    desc: 'Track engagement, optimize strategy, and grow faster with data.' },
  { icon: Globe,    color: 'from-pink-500 to-rose-600',      title: 'Multi-Channel Publishing', desc: 'Instagram, LinkedIn, Twitter/X, blogs — publish everywhere at once.' },
  { icon: Sparkles, color: 'from-indigo-500 to-violet-600',  title: 'Brand Intelligence',       desc: 'AI that learns your brand voice and never breaks consistency.' },
];

const stats = [
  { value: '10x',  label: 'Faster content creation' },
  { value: '500+', label: 'Brands powered' },
  { value: '98%',  label: 'Brand consistency score' },
  { value: '24/7', label: 'AI agents working' },
];

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#050510] text-white overflow-x-hidden">

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#050510]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-purple-700 flex items-center justify-center shadow-lg shadow-violet-500/30">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">KontentIQ</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-slate-400">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#how" className="hover:text-white transition-colors">How it works</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/login')}
              className="text-sm text-slate-300 hover:text-white transition-colors px-4 py-2">
              Log in
            </button>
            <button onClick={() => navigate('/signup')}
              className="text-sm bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white px-5 py-2 rounded-xl font-semibold transition-all shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:-translate-y-0.5">
              Get Started Free
            </button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        <NeuralCanvas />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 text-center max-w-5xl mx-auto px-6 space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-sm font-medium">
            <div className="w-2 h-2 bg-violet-400 rounded-full animate-pulse" />
            AI-Powered Brand Intelligence Platform
          </div>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight">
            Create Content That
            <br />
            <TypeWriter words={['Converts.', 'Captivates.', 'Scales.', 'Dominates.', 'Resonates.']} />
          </h1>

          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            KontentIQ trains AI agents on your brand DNA — colors, voice, tone, audience —
            and generates on-brand content for every channel, automatically.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={() => navigate('/signup')}
              className="group flex items-center gap-2 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white px-8 py-4 rounded-2xl text-lg font-semibold transition-all shadow-2xl shadow-violet-500/30 hover:shadow-violet-500/50 hover:-translate-y-1">
              Start for Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button onClick={() => navigate('/login')}
              className="flex items-center gap-2 border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 text-white px-8 py-4 rounded-2xl text-lg font-medium transition-all">
              View Dashboard
            </button>
          </div>

          <p className="text-sm text-slate-500">No credit card required · Free forever plan available</p>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-600 animate-bounce">
          <div className="w-px h-8 bg-gradient-to-b from-transparent to-slate-600" />
        </div>
      </section>

      {/* STATS */}
      <section className="border-y border-white/5 py-16">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <div key={i} className="text-center space-y-1">
              <div className="text-4xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">{s.value}</div>
              <div className="text-sm text-slate-500">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-28">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-slate-400 text-xs font-medium uppercase tracking-wider">
            Features
          </div>
          <h2 className="text-4xl md:text-5xl font-bold">Everything your brand needs</h2>
          <p className="text-slate-400 max-w-xl mx-auto">One platform to create, manage, and publish on-brand content across every channel.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div key={i}
              className="group relative p-6 rounded-3xl border border-white/5 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/10 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
              <div className={`absolute inset-0 bg-gradient-to-br ${f.color} opacity-0 group-hover:opacity-5 transition-opacity rounded-3xl`} />
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-4 shadow-lg`}>
                <f.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-2">{f.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-950/10 to-transparent pointer-events-none" />
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-slate-400 text-xs font-medium uppercase tracking-wider">
              How it works
            </div>
            <h2 className="text-4xl md:text-5xl font-bold">From brand to content in minutes</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-8 left-1/3 right-1/3 h-px bg-gradient-to-r from-violet-500/50 to-cyan-500/50" />
            {[
              { step: '01', title: 'Set up your Brand Vault', desc: 'Upload your colors, fonts, logo, and brand voice. KontentIQ learns your DNA.' },
              { step: '02', title: 'Configure AI agents',     desc: 'Choose platforms, tone, content types. AI agents are trained on your brand.' },
              { step: '03', title: 'Generate & publish',      desc: 'One click generates on-brand content ready to review, edit, and publish.' },
            ].map((s, i) => (
              <div key={i} className="text-center space-y-4 relative">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600/20 to-purple-600/20 border border-violet-500/20 flex items-center justify-center mx-auto">
                  <span className="text-violet-400 font-bold text-lg">{s.step}</span>
                </div>
                <h3 className="text-xl font-bold">{s.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <div className="relative rounded-3xl overflow-hidden p-12 text-center border border-violet-500/20">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-900/40 via-purple-900/30 to-slate-900/40" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px bg-gradient-to-r from-transparent via-violet-500 to-transparent" />
          <div className="relative z-10 space-y-6">
            <h2 className="text-4xl font-bold">Ready to scale your content?</h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">
              Join brands already using KontentIQ to generate on-brand content at scale.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              {['No credit card required', 'Free plan available', 'Cancel anytime'].map((t, i) => (
                <span key={i} className="flex items-center gap-1.5 text-sm text-slate-400">
                  <Check className="w-4 h-4 text-violet-400" /> {t}
                </span>
              ))}
            </div>
            <button onClick={() => navigate('/signup')}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white px-10 py-4 rounded-2xl text-lg font-semibold transition-all shadow-2xl shadow-violet-500/30 hover:-translate-y-1">
              Get Started Free <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 py-10 mt-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-violet-600 to-purple-700 flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-white" />
            </div>
            <span className="font-bold text-sm">KontentIQ</span>
          </div>
          <p className="text-slate-600 text-sm">© 2026 KontentIQ. All rights reserved.</p>
          <div className="flex gap-6 text-sm text-slate-600">
            <a href="#" className="hover:text-slate-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-slate-400 transition-colors">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}