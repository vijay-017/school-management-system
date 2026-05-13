import React, { useEffect } from 'react';
import FloatingCard from '../components/FloatingCard';
import { BookOpen, Users, Clock, ArrowRight, Layers, LayoutGrid } from 'lucide-react';
import anime from 'animejs/lib/anime.es.js';

const ClassCard = ({ grade, section, students, teacher, subjects, delay }) => (
  <FloatingCard className="group hover:border-neon-violet/50 transition-all duration-500" delay={delay}>
    <div className="flex justify-between items-start mb-6">
      <div>
        <h3 className="text-2xl font-bold text-white group-hover:text-neon-violet transition-colors">Grade {grade}</h3>
        <p className="text-neon-violet font-bold text-xs uppercase tracking-widest mt-1">Section {section}</p>
      </div>
      <div className="p-3 rounded-xl bg-white/5 border border-white/10 group-hover:bg-neon-violet/10 group-hover:border-neon-violet/30 transition-all">
        <LayoutGrid size={20} className="text-slate-400 group-hover:text-neon-violet" />
      </div>
    </div>

    <div className="flex gap-6 mb-8">
      <div className="flex items-center gap-2">
        <Users size={16} className="text-slate-500" />
        <span className="text-sm text-slate-300 font-medium">{students} Students</span>
      </div>
      <div className="flex items-center gap-2">
        <Clock size={16} className="text-slate-500" />
        <span className="text-sm text-slate-300 font-medium">Full Day</span>
      </div>
    </div>

    <div className="space-y-4 mb-8">
      <h4 className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Active Subjects</h4>
      <div className="flex flex-wrap gap-2">
        {subjects.map((sub, i) => (
          <span key={i} className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-[10px] text-slate-400 font-bold hover:bg-white/10 transition-colors cursor-default">
            {sub}
          </span>
        ))}
      </div>
    </div>

    <div className="pt-6 border-t border-white/10 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-neon-violet/20 flex items-center justify-center text-neon-violet font-bold text-xs border border-neon-violet/30">
          {teacher[0]}
        </div>
        <span className="text-xs text-slate-400 font-medium">Advisor: <span className="text-white">{teacher}</span></span>
      </div>
      <button className="p-2 rounded-lg bg-white/5 text-slate-500 hover:text-white transition-all">
        <ArrowRight size={18} />
      </button>
    </div>
  </FloatingCard>
);

const ClassesPage = () => {
  useEffect(() => {
    anime({
      targets: '.class-card',
      opacity: [0, 1],
      scale: [0.9, 1],
      translateY: [20, 0],
      delay: anime.stagger(100),
      easing: 'easeOutExpo',
      duration: 1000
    });
  }, []);

  const classes = [
    { grade: '10', section: 'A', students: 32, teacher: 'Dr. Chen', subjects: ['Physics', 'Calculus', 'Astro-Bio'] },
    { grade: '12', section: 'B', students: 28, teacher: 'Prof. Vance', subjects: ['Ethics', 'History', 'Logistics'] },
    { grade: '9', section: 'C', students: 35, teacher: 'Ms. Rodriguez', subjects: ['Chemistry', 'Art', 'PE'] },
    { grade: '11', section: 'A', students: 30, teacher: 'Mr. Sterling', subjects: ['Coding', 'Econ', 'Gov'] },
    { grade: '10', section: 'B', students: 31, teacher: 'Ms. Kotto', subjects: ['Lit', 'Bio', 'History'] },
    { grade: '8', section: 'D', students: 34, teacher: 'Mr. Drago', subjects: ['Science', 'Math', 'PE'] },
  ];

  return (
    <div className="p-8">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Class Structure</h1>
          <p className="text-slate-400">Defining academic trajectories and group distribution.</p>
        </div>
        <div className="flex gap-4">
          <button className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white transition-all font-bold text-sm uppercase tracking-widest flex items-center gap-2">
            <Layers size={18} />
            Bulk Actions
          </button>
          <button className="px-6 py-3 rounded-xl bg-neon-violet/20 border border-neon-violet/50 text-neon-violet font-bold hover:bg-neon-violet hover:text-white transition-all text-sm uppercase tracking-widest shadow-[0_0_20px_rgba(168,85,247,0.3)]">
            NEW CLASS
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {classes.map((cls, i) => (
          <div key={i} className="class-card">
            <ClassCard {...cls} delay={i * 0.15} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClassesPage;
