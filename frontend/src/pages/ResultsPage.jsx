import React, { useEffect } from 'react';
import FloatingCard from '../components/FloatingCard';
import { BarChart3, TrendingUp, Award, Target, ChevronRight } from 'lucide-react';
import anime from 'animejs/lib/anime.es.js';

const ResultsPage = () => {
  useEffect(() => {
    anime({
      targets: '.result-item',
      opacity: [0, 1],
      translateX: [20, 0],
      delay: anime.stagger(100),
      easing: 'easeOutExpo',
      duration: 1000
    });
  }, []);

  const topPerformers = [
    { name: 'Nova Skye', grade: '10-A', gpa: '4.0', subjects: 8 },
    { name: 'Orion Pax', grade: '12-B', gpa: '3.98', subjects: 7 },
    { name: 'Selene Moon', grade: '10-B', gpa: '3.95', subjects: 8 },
  ];

  return (
    <div className="p-8">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Academic Analytics</h1>
          <p className="text-slate-400">Synthesizing performance data across all academic sectors.</p>
        </div>
        <div className="flex gap-4">
          <button className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white transition-all font-bold text-sm uppercase tracking-widest flex items-center gap-2">
            <Target size={18} />
            Set Benchmarks
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <FloatingCard className="lg:col-span-2">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <BarChart3 className="text-neon-cyan" size={20} />
              Grade Distribution
            </h3>
            <div className="flex gap-2">
              {['Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'].map((g) => (
                <button key={g} className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-[10px] text-slate-500 font-bold uppercase tracking-widest hover:border-neon-cyan transition-all">
                  {g}
                </button>
              ))}
            </div>
          </div>
          
          <div className="h-64 flex items-end justify-around gap-2">
            {[30, 45, 85, 65, 25, 15].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-4">
                <div 
                  className={`w-full max-w-[60px] rounded-t-xl transition-all duration-700 ${
                    i === 2 ? 'bg-gradient-to-t from-neon-cyan/20 to-neon-cyan' : 'bg-white/10'
                  }`}
                  style={{ height: `${h}%` }}
                ></div>
                <span className="text-[10px] text-slate-500 font-bold uppercase">{['F', 'D', 'C', 'B', 'A', 'A+'][i]}</span>
              </div>
            ))}
          </div>
        </FloatingCard>

        <FloatingCard className="bg-gradient-to-br from-neon-violet/10 to-transparent">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Award className="text-neon-violet" size={20} />
            Top Cadets
          </h3>
          <div className="space-y-6">
            {topPerformers.map((student, i) => (
              <div key={i} className="result-item flex items-center gap-4 group cursor-pointer">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-neon-violet font-bold text-lg group-hover:bg-neon-violet/20 group-hover:border-neon-violet/30 transition-all">
                  {i + 1}
                </div>
                <div className="flex-1">
                  <div className="text-white font-bold group-hover:text-neon-violet transition-colors">{student.name}</div>
                  <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">{student.grade} • {student.subjects} Subjects</div>
                </div>
                <div className="text-right">
                  <div className="text-neon-violet font-bold">{student.gpa}</div>
                  <div className="text-[8px] text-slate-500 uppercase font-bold tracking-widest text-glow">GPA</div>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full py-3 mt-8 rounded-xl border border-neon-violet/20 text-neon-violet font-bold text-xs uppercase tracking-widest hover:bg-neon-violet hover:text-white transition-all">
            View Leaderboard
          </button>
        </FloatingCard>
      </div>

      <FloatingCard className="p-0 overflow-hidden">
        <div className="p-6 border-b border-white/10">
          <h3 className="text-lg font-bold text-white">Recent Subject Assessments</h3>
        </div>
        <div className="divide-y divide-white/5">
          {[
            { subject: 'Quantum Physics', avg: '88%', trend: '+4%', status: 'Exceeding' },
            { subject: 'Advanced Math', avg: '72%', trend: '-2%', status: 'Stable' },
            { subject: 'Cyber Ethics', avg: '94%', trend: '+1%', status: 'Optimal' },
            { subject: 'Astro-Biology', avg: '81%', trend: '0%', status: 'Stable' },
          ].map((sub, i) => (
            <div key={i} className="result-item flex items-center justify-between p-6 hover:bg-white/5 transition-all">
              <div className="flex items-center gap-6">
                <div className="text-white font-bold w-48">{sub.subject}</div>
                <div className="hidden md:flex items-center gap-2">
                  <div className="w-32 h-2 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-neon-cyan shadow-[0_0_8px_rgba(34,211,238,0.5)]" style={{ width: sub.avg }}></div>
                  </div>
                  <span className="text-xs text-slate-500 font-bold">{sub.avg}</span>
                </div>
              </div>
              <div className="flex items-center gap-8">
                <div className={`text-xs font-bold ${sub.trend.startsWith('+') ? 'text-emerald-400' : sub.trend === '0%' ? 'text-slate-500' : 'text-red-400'}`}>
                  {sub.trend}
                </div>
                <div className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest border ${
                  sub.status === 'Optimal' ? 'bg-neon-cyan/10 border-neon-cyan/20 text-neon-cyan' : 'bg-white/5 border-white/10 text-slate-400'
                }`}>
                  {sub.status}
                </div>
                <ChevronRight size={18} className="text-slate-700" />
              </div>
            </div>
          ))}
        </div>
      </FloatingCard>
    </div>
  );
};

export default ResultsPage;
