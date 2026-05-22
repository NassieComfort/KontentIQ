import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { ArrowRight, Zap, BarChart3, Sparkles } from 'lucide-react';

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800">
      {/* Navigation */}
      <nav className="border-b border-slate-700/50 bg-slate-950/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Kontentiq
          </div>
          <div className="flex gap-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/login')}
              className="text-slate-300 hover:text-white"
            >
              Login
            </Button>
            <Button 
              onClick={() => navigate('/signup')}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Sign Up
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center space-y-8">
          <div className="inline-block px-4 py-2 bg-blue-500/10 border border-blue-500/50 rounded-full">
            <span className="text-blue-400 text-sm font-medium flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Powered by AI Intelligence
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
            Manage Your Brand <br />
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-600 bg-clip-text text-transparent">
              With AI
            </span>
          </h1>

          <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Automate your content creation, manage multiple brands, and scale your marketing with intelligent AI agents working 24/7.
          </p>

          <div className="flex gap-4 justify-center pt-4">
            <Button 
              onClick={() => navigate('/signup')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg"
            >
              Get Started <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-white text-center mb-16">Powerful Features</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="p-8 rounded-lg border border-slate-700 bg-slate-800/50 hover:bg-slate-800 transition-colors">
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">AI Content Creation</h3>
            <p className="text-slate-400">
              Generate high-quality content for all platforms in seconds with our advanced AI agents.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="p-8 rounded-lg border border-slate-700 bg-slate-800/50 hover:bg-slate-800 transition-colors">
            <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center mb-4">
              <BarChart3 className="w-6 h-6 text-cyan-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Analytics & Insights</h3>
            <p className="text-slate-400">
              Track performance metrics and get actionable insights to optimize your content strategy.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="p-8 rounded-lg border border-slate-700 bg-slate-800/50 hover:bg-slate-800 transition-colors">
            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Multi-Brand Management</h3>
            <p className="text-slate-400">
              Manage multiple brands with different tones and styles all from one unified dashboard.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Marketing?</h2>
          <p className="text-blue-100 mb-8 text-lg">Join hundreds of brands using Kontentiq to scale their content creation.</p>
          <Button 
            onClick={() => navigate('/signup')}
            className="bg-slate-900 text-white hover:bg-slate-800 border border-slate-700 px-8 py-3 font-semibold"
          >
            Start Free Trial
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700/50 bg-slate-950/50 mt-20 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center text-slate-400">
          <p>&copy; 2026 Kontentiq. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
