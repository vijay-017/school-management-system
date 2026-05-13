import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import anime from 'animejs/lib/anime.es.js';
import { Shield, Users } from 'lucide-react';

const LoginPage = () => {
  const [role, setRole] = useState('admin');
  const navigate = useNavigate();

  useEffect(() => {
    anime({
      targets: '.login-card',
      opacity: [0, 1],
      scale: [0.9, 1],
      translateY: [20, 0],
      duration: 1000,
      easing: 'easeOutExpo'
    });
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    navigate(role === 'admin' ? '/admin' : '/parent');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')] bg-cover bg-center">
      <div className="absolute inset-0 bg-space-950/80 backdrop-blur-sm"></div>
      
      <div className="login-card glass p-8 rounded-3xl w-full max-w-md relative z-10 border border-white/20">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-neon-cyan to-neon-violet bg-clip-text text-transparent neon-text mb-2">
            AETHERIS
          </h1>
          <p className="text-slate-400">Welcome to the future of education</p>
        </div>

        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setRole('admin')}
            className={`flex-1 p-4 rounded-2xl border transition-all duration-300 flex flex-col items-center gap-2
              ${role === 'admin' 
                ? 'bg-neon-cyan/10 border-neon-cyan text-neon-cyan neon-border' 
                : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/30'}`}
          >
            <Shield size={24} />
            <span className="font-semibold">Admin</span>
          </button>
          <button
            onClick={() => setRole('parent')}
            className={`flex-1 p-4 rounded-2xl border transition-all duration-300 flex flex-col items-center gap-2
              ${role === 'parent' 
                ? 'bg-neon-violet/10 border-neon-violet text-neon-violet neon-border' 
                : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/30'}`}
          >
            <Users size={24} />
            <span className="font-semibold">Parent</span>
          </button>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Access ID</label>
            <input
              type="text"
              placeholder="Enter your ID"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-neon-cyan/50 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Security Key</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-neon-cyan/50 transition-colors"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-xl bg-gradient-to-r from-neon-cyan to-neon-blue text-space-950 font-bold text-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-[0_0_20px_rgba(34,211,238,0.4)]"
          >
            AUTHENTICATE
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
