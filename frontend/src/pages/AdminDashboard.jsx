import React, { useEffect } from 'react';
import FloatingCard from '../components/FloatingCard';
import {
  Users, GraduationCap, BookOpen, Wallet, ArrowUpRight, TrendingUp,
  ClipboardList, CalendarCheck, Settings,
} from 'lucide-react';
import anime from 'animejs/lib/anime.es.js';
import { useAuth } from '../context/AuthContext';

const StatCard = ({ icon: Icon, label, value, trend, color, delay }) => (
  <FloatingCard className="flex-1 min-w-[220px]" delay={delay}>
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-2xl bg-${color}/10 text-${color}`}>
        <Icon size={24} />
      </div>
      <div className="flex items-center gap-1 text-emerald-400 text-sm font-medium">
        {trend} <ArrowUpRight size={16} />
      </div>
    </div>
    <h3 className="text-slate-400 text-sm font-medium mb-1">{label}</h3>
    <div className="text-3xl font-bold text-white">{value}</div>
  </FloatingCard>
);

const ModuleCard = ({ icon: Icon, label, sub, color, path }) => (
  <a
    href={path}
    className="glass-card p-5 flex items-center gap-4 hover:border-neon-cyan/40 cursor-pointer group transition-all"
    onClick={e => e.preventDefault()}
  >
    <div className={`w-11 h-11 rounded-xl bg-${color}/10 flex items-center justify-center text-${color} flex-shrink-0 group-hover:scale-110 transition-transform`}>
      <Icon size={20} />
    </div>
    <div>
      <p className="text-white text-sm font-semibold group-hover:text-neon-cyan transition-colors">{label}</p>
      <p className="text-slate-500 text-xs">{sub}</p>
    </div>
  </a>
);

const AdminDashboard = () => {
  const { auth } = useAuth();

  useEffect(() => {
    anime({
      targets: '.stagger-item',
      opacity: [0, 1],
      translateY: [20, 0],
      delay: anime.stagger(80),
      easing: 'easeOutExpo',
      duration: 1000,
    });
  }, []);

  const roleLabel = auth?.role === 'SUPER_ADMIN' ? 'Super Admin' : 'Admin';

  return (
    <div className="p-8">
      <header className="mb-10 stagger-item">
        <p className="text-neon-cyan text-xs font-bold uppercase tracking-widest mb-1">{roleLabel} Console</p>
        <h1 className="text-3xl font-bold text-white mb-1">
          Systems Overview{auth?.username ? ` — ${auth.username}` : ''}
        </h1>
        <p className="text-slate-400">Atmosphere remains stable. Operational efficiency at 98%.</p>
      </header>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard icon={GraduationCap} label="Total Students"  value="1,284" trend="+12%" color="cyan-400"   delay={0} />
        <StatCard icon={Users}         label="Total Teachers"  value="86"    trend="+4%"  color="violet-400" delay={0.1} />
        <StatCard icon={BookOpen}      label="Total Classes"   value="42"    trend="0%"   color="blue-400"   delay={0.2} />
        <StatCard icon={Wallet}        label="Fee Collection"  value="$142K" trend="+8%"  color="pink-400"   delay={0.3} />
      </div>

      {/* Module Grid */}
      <div className="mb-10 stagger-item">
        <h2 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
          <Settings className="text-neon-cyan" size={18} />
          Management Modules
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <ModuleCard icon={GraduationCap} label="Students"       sub="Manage enrollments"    color="neon-cyan"   path="/dashboard/admin/students" />
          <ModuleCard icon={Users}         label="Teachers"        sub="Staff management"     color="neon-violet" path="/dashboard/admin/teachers" />
          <ModuleCard icon={Users}         label="Parents"         sub="Guardian accounts"    color="neon-blue"   path="/dashboard/admin/parents" />
          <ModuleCard icon={BookOpen}      label="Classes"         sub="Classes & sections"   color="blue-400"    path="/dashboard/admin/classes" />
          <ModuleCard icon={ClipboardList} label="Subjects"        sub="Curriculum modules"   color="violet-400"  path="/dashboard/admin/subjects" />
          <ModuleCard icon={CalendarCheck} label="Attendance"      sub="Daily logs"           color="emerald-400" path="/dashboard/admin/attendance" />
          <ModuleCard icon={TrendingUp}    label="Exams"           sub="Schedule & results"   color="yellow-400"  path="/dashboard/admin/exams" />
          <ModuleCard icon={ArrowUpRight}  label="Marks"           sub="Grade entry & reports"color="pink-400"    path="/dashboard/admin/marks" />
          <ModuleCard icon={Wallet}        label="Timetable"       sub="Weekly schedule"      color="cyan-400"    path="/dashboard/admin/timetable" />
          <ModuleCard icon={Settings}      label="User Management" sub="Roles & access"       color="slate-400"   path="/dashboard/admin/users" />
        </div>
      </div>

      {/* Charts / Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <FloatingCard className="stagger-item" delay={2}>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <TrendingUp className="text-neon-cyan" size={20} />
              Performance Metrics
            </h2>
            <select className="bg-white/5 border border-white/10 rounded-lg px-3 py-1 text-xs text-slate-400">
              <option>Last 30 Days</option>
              <option>Last 6 Months</option>
            </select>
          </div>
          <div className="h-52 flex items-end gap-3 px-4">
            {[60, 80, 45, 90, 70, 85, 95].map((height, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                <div
                  className="w-full bg-gradient-to-t from-neon-blue/20 to-neon-cyan rounded-t-lg transition-all duration-500 group-hover:scale-y-110"
                  style={{ height: `${height}%` }}
                ></div>
                <span className="text-[10px] text-slate-500 uppercase">
                  {['M','T','W','T','F','S','S'][i]}
                </span>
              </div>
            ))}
          </div>
        </FloatingCard>

        <FloatingCard className="stagger-item" delay={2.5}>
          <h2 className="text-xl font-bold text-white mb-6">Recent Alerts</h2>
          <div className="space-y-4">
            {[
              { msg: '12 payments overdue for Grade 10-A', time: '2h ago',  color: 'text-red-400' },
              { msg: 'Unusual absence spike in Grade 8',   time: '4h ago',  color: 'text-yellow-400' },
              { msg: 'Monthly reports generated',          time: '1d ago',  color: 'text-emerald-400' },
            ].map((alert, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-all cursor-pointer">
                <div className={`w-2 h-2 rounded-full ${alert.color.replace('text', 'bg')} shadow-[0_0_8px_currentColor]`}></div>
                <div className="flex-1">
                  <p className="text-sm text-slate-200">{alert.msg}</p>
                  <p className="text-[10px] text-slate-500 uppercase mt-1">{alert.time}</p>
                </div>
              </div>
            ))}
          </div>
        </FloatingCard>
      </div>
    </div>
  );
};

export default AdminDashboard;
