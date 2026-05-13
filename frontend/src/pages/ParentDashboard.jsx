import React, { useEffect } from 'react';
import FloatingCard from '../components/FloatingCard';
import { Book, Calendar, CreditCard, Star, MessageSquare, Bell } from 'lucide-react';
import anime from 'animejs/lib/anime.es.js';

const ParentDashboard = () => {
  useEffect(() => {
    anime({
      targets: '.parent-stagger',
      opacity: [0, 1],
      translateY: [20, 0],
      delay: anime.stagger(100),
      easing: 'easeOutExpo',
      duration: 1000
    });
  }, []);

  return (
    <div className="p-8">
      <header className="mb-10 parent-stagger flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back, Luna Skye</h1>
          <p className="text-slate-400">Monitoring Nova's academic progress in real-time.</p>
        </div>
        <div className="flex gap-4">
          <button className="relative p-3 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white transition-all">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-neon-cyan rounded-full shadow-[0_0_8px_rgba(34,211,238,0.8)]"></span>
          </button>
          <button className="flex items-center gap-2 px-6 py-3 bg-neon-cyan/10 border border-neon-cyan/20 text-neon-cyan rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-neon-cyan hover:text-space-950 transition-all">
            <MessageSquare size={18} />
            Contact Advisor
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        <FloatingCard className="parent-stagger bg-gradient-to-br from-neon-cyan/10 to-transparent">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-neon-cyan/20 border border-neon-cyan/30 flex items-center justify-center text-neon-cyan font-bold text-2xl shadow-[0_0_15px_rgba(34,211,238,0.2)]">
              NS
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Nova Skye</h3>
              <p className="text-slate-500 font-bold text-[10px] uppercase tracking-widest">Grade 10-A • ID: ST-001</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs mb-2 uppercase font-bold tracking-widest">
                <span className="text-slate-500">Academic Standing</span>
                <span className="text-emerald-400">EXCELLENT</span>
              </div>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex-1 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_5px_rgba(52,211,153,0.5)]"></div>
                ))}
              </div>
            </div>
          </div>
        </FloatingCard>

        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">
          <FloatingCard className="parent-stagger">
            <Calendar className="text-neon-cyan mb-4" size={24} />
            <h4 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Attendance</h4>
            <div className="text-2xl font-bold text-white">98.2%</div>
            <p className="text-[10px] text-emerald-400 mt-2 font-bold uppercase tracking-tighter">Perfect Streak: 12 Days</p>
          </FloatingCard>
          
          <FloatingCard className="parent-stagger">
            <Star className="text-neon-violet mb-4" size={24} />
            <h4 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Current GPA</h4>
            <div className="text-2xl font-bold text-white">3.92</div>
            <p className="text-[10px] text-neon-violet mt-2 font-bold uppercase tracking-tighter">Top 5% of Class</p>
          </FloatingCard>

          <FloatingCard className="parent-stagger">
            <CreditCard className="text-neon-pink mb-4" size={24} />
            <h4 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Fees Status</h4>
            <div className="text-2xl font-bold text-white">Settled</div>
            <p className="text-[10px] text-slate-500 mt-2 font-bold uppercase tracking-tighter">Next due: Aug 2026</p>
          </FloatingCard>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <FloatingCard className="parent-stagger">
          <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <Book className="text-neon-cyan" size={20} />
            Upcoming Assessments
          </h3>
          <div className="space-y-4">
            {[
              { subject: 'Quantum Physics', topic: 'String Theory', date: 'May 02', priority: 'High' },
              { subject: 'Advanced Math', topic: 'Tensor Calculus', date: 'May 05', priority: 'Medium' },
              { subject: 'Cyber Ethics', topic: 'AI Rights', date: 'May 12', priority: 'Low' },
            ].map((exam, i) => (
              <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/10 flex justify-between items-center group hover:border-neon-cyan/30 transition-all">
                <div>
                  <div className="text-white font-medium group-hover:text-neon-cyan transition-colors">{exam.subject}</div>
                  <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mt-1">{exam.topic}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-white font-bold">{exam.date}</div>
                  <div className={`text-[10px] font-bold uppercase tracking-widest ${
                    exam.priority === 'High' ? 'text-red-400' : exam.priority === 'Medium' ? 'text-yellow-400' : 'text-neon-cyan'
                  }`}>{exam.priority} Priority</div>
                </div>
              </div>
            ))}
          </div>
        </FloatingCard>

        <FloatingCard className="parent-stagger">
          <h3 className="text-lg font-bold text-white mb-6">Recent Teacher Feedback</h3>
          <div className="space-y-6">
            {[
              { teacher: 'Dr. Chen', feedback: 'Nova is showing exceptional grasp of non-linear dynamics. Suggesting advanced track.', date: '2 days ago' },
              { teacher: 'Ms. Kotto', feedback: 'Great participation in the Galactic History debate last week.', date: '1 week ago' },
            ].map((item, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex-shrink-0 flex items-center justify-center text-slate-400 font-bold uppercase text-xs">
                  {item.teacher[4]}
                </div>
                <div>
                  <p className="text-sm text-slate-300 leading-relaxed italic">"{item.feedback}"</p>
                  <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mt-2">{item.teacher} • {item.date}</p>
                </div>
              </div>
            ))}
          </div>
        </FloatingCard>
      </div>
    </div>
  );
};

export default ParentDashboard;
