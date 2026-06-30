import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import anime from 'animejs/lib/anime.es.js';
import { Shield, Users, BookOpen, AlertCircle, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const ROLE_TABS = [
  { key: 'ADMIN',   label: 'Admin',   Icon: Shield,   color: 'neon-cyan',   desc: 'SUPER_ADMIN / ADMIN' },
  { key: 'TEACHER', label: 'Teacher', Icon: BookOpen,  color: 'neon-blue',   desc: 'Teaching staff' },
  { key: 'PARENT',  label: 'Parent',  Icon: Users,     color: 'neon-violet', desc: 'Guardian portal' },
];

const ROLE_DASHBOARD = {
  SUPER_ADMIN: '/dashboard/admin',
  ADMIN:       '/dashboard/admin',
  TEACHER:     '/dashboard/teacher',
  PARENT:      '/dashboard/parent',
};

const LoginPage = () => {
  const [selectedTab, setSelectedTab] = useState('ADMIN');
  const [username, setUsername]       = useState('');
  const [password, setPassword]       = useState('');
  const [loading, setLoading]         = useState(false);
  const [error, setError]             = useState('');

  const { login, auth } = useAuth();
  const navigate = useNavigate();

  // Already logged in → go straight to dashboard
  useEffect(() => {
    if (auth?.token) {
      navigate(ROLE_DASHBOARD[auth.role] ?? '/login', { replace: true });
    }
  }, [auth, navigate]);

  useEffect(() => {
    anime({
      targets: '.login-card',
      opacity: [0, 1],
      scale: [0.9, 1],
      translateY: [20, 0],
      duration: 1000,
      easing: 'easeOutExpo',
    });
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { data } = await axios.post('http://localhost:9090/auth/login', {
        username,
        password,
      });
      // data = { token, username, role }
      login(data);
      const dest = ROLE_DASHBOARD[data.role];
      if (!dest) {
        setError(`Unknown role "${data.role}" returned by server.`);
        return;
      }
      navigate(dest, { replace: true });
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data ||
        err?.message ||
        'Login failed. Please check your credentials.';
      setError(typeof msg === 'string' ? msg : 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  const tabColor = ROLE_TABS.find(t => t.key === selectedTab)?.color ?? 'neon-cyan';

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

        {/* Role Tabs */}
        <div className="flex gap-3 mb-8">
          {ROLE_TABS.map(({ key, label, Icon }) => (
            <button
              key={key}
              type="button"
              onClick={() => { setSelectedTab(key); setError(''); }}
              className={`flex-1 p-3 rounded-2xl border transition-all duration-300 flex flex-col items-center gap-1.5
                ${selectedTab === key
                  ? `bg-${tabColor}/10 border-${tabColor} text-${tabColor} neon-border`
                  : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/30'}`}
            >
              <Icon size={20} />
              <span className="font-semibold text-xs">{label}</span>
            </button>
          ))}
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Username</label>
            <input
              id="login-username"
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="Enter your username"
              autoComplete="username"
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-neon-cyan/50 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Password</label>
            <input
              id="login-password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-neon-cyan/50 transition-colors"
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
              <AlertCircle size={16} className="flex-shrink-0" />
              {error}
            </div>
          )}

          <button
            id="login-submit"
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-neon-cyan to-neon-blue text-space-950 font-bold text-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-[0_0_20px_rgba(34,211,238,0.4)] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading && <Loader2 size={20} className="animate-spin" />}
            {loading ? 'AUTHENTICATING...' : 'AUTHENTICATE'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
