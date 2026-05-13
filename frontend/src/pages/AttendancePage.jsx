import React, { useState, useEffect } from 'react';
import FloatingCard from '../components/FloatingCard';
import { Calendar, ChevronLeft, ChevronRight, Check, X, AlertCircle } from 'lucide-react';
import anime from 'animejs/lib/anime.es.js';

const AttendancePage = () => {
  const [selectedClass, setSelectedClass] = useState('10-A');
  const [date, setDate] = useState(new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }));

  useEffect(() => {
    anime({
      targets: '.attendance-item',
      opacity: [0, 1],
      scale: [0.95, 1],
      delay: anime.stagger(30),
      easing: 'easeOutQuad',
      duration: 600
    });
  }, [selectedClass]);

  const students = [
    { id: 'ST-001', name: 'Nova Skye', status: 'present' },
    { id: 'ST-002', name: 'Orion Pax', status: 'absent' },
    { id: 'ST-003', name: 'Lyra Vance', status: 'present' },
    { id: 'ST-004', name: 'Atlas Thorne', status: 'present' },
    { id: 'ST-005', name: 'Selene Moon', status: 'present' },
    { id: 'ST-006', name: 'Kaelen Voss', status: 'late' },
    { id: 'ST-007', name: 'Eara Nox', status: 'present' },
    { id: 'ST-008', name: 'Cyrus Vane', status: 'absent' },
  ];

  return (
    <div className="p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 text-glow">Attendance Control</h1>
          <p className="text-slate-400 font-medium uppercase tracking-[0.1em] text-xs">Registry Synchronization Active</p>
        </div>

        <div className="flex gap-4 w-full md:w-auto">
          <div className="flex-1 md:w-48 px-4 py-3 bg-white/5 border border-white/10 rounded-xl flex items-center justify-between group hover:border-neon-cyan transition-colors cursor-pointer">
            <span className="text-white font-medium">{selectedClass}</span>
            <ChevronRight size={18} className="text-slate-500 group-hover:text-neon-cyan" />
          </div>
          <div className="flex-1 md:w-64 px-4 py-3 bg-white/5 border border-white/10 rounded-xl flex items-center justify-between group hover:border-neon-cyan transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
              <Calendar size={18} className="text-neon-cyan" />
              <span className="text-white font-medium">{date}</span>
            </div>
            <div className="flex gap-1">
              <ChevronLeft size={18} className="text-slate-500 hover:text-white" />
              <ChevronRight size={18} className="text-slate-500 hover:text-white" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <FloatingCard className="lg:col-span-2 p-0 overflow-hidden">
          <div className="p-6 border-b border-white/10 flex justify-between items-center">
            <h3 className="text-lg font-bold text-white">Class List - {selectedClass}</h3>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                <span className="text-xs text-slate-400 font-bold uppercase">Present</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <span className="text-xs text-slate-400 font-bold uppercase">Absent</span>
              </div>
            </div>
          </div>
          
          <div className="max-h-[500px] overflow-y-auto">
            {students.map((student, i) => (
              <div key={student.id} className="attendance-item flex items-center justify-between p-6 border-b border-white/5 hover:bg-white/5 transition-all">
                <div className="flex items-center gap-4">
                  <span className="text-xs font-mono text-slate-600">{student.id}</span>
                  <span className="text-white font-medium">{student.name}</span>
                </div>
                
                <div className="flex gap-2">
                  <button className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                    student.status === 'present' 
                      ? 'bg-emerald-400 text-space-950 shadow-[0_0_15px_rgba(52,211,153,0.4)]' 
                      : 'bg-white/5 text-slate-500 hover:bg-white/10'
                  }`}>
                    <Check size={20} />
                  </button>
                  <button className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                    student.status === 'absent' 
                      ? 'bg-red-400 text-space-950 shadow-[0_0_15px_rgba(248,113,113,0.4)]' 
                      : 'bg-white/5 text-slate-500 hover:bg-white/10'
                  }`}>
                    <X size={20} />
                  </button>
                  <button className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                    student.status === 'late' 
                      ? 'bg-yellow-400 text-space-950 shadow-[0_0_15px_rgba(250,204,21,0.4)]' 
                      : 'bg-white/5 text-slate-500 hover:bg-white/10'
                  }`}>
                    <AlertCircle size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="p-6 bg-white/5 flex justify-end gap-4">
            <button className="px-6 py-2 rounded-xl text-slate-400 font-bold hover:text-white transition-colors uppercase text-sm">Reset</button>
            <button className="px-8 py-2 rounded-xl bg-neon-cyan text-space-950 font-bold hover:scale-105 transition-all shadow-[0_0_20px_rgba(34,211,238,0.4)] uppercase text-sm">Finalize Logs</button>
          </div>
        </FloatingCard>

        <div className="space-y-6">
          <FloatingCard>
            <h3 className="text-lg font-bold text-white mb-6">Today's Statistics</h3>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-400">Completion Rate</span>
                  <span className="text-neon-cyan font-bold">84%</span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-neon-cyan w-[84%] shadow-[0_0_10px_rgba(34,211,238,0.5)]"></div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-emerald-400/10 border border-emerald-400/20 text-center">
                  <p className="text-[10px] text-emerald-400 font-bold uppercase mb-1">Present</p>
                  <p className="text-2xl font-bold text-white">1,078</p>
                </div>
                <div className="p-4 rounded-2xl bg-red-400/10 border border-red-400/20 text-center">
                  <p className="text-[10px] text-red-400 font-bold uppercase mb-1">Absent</p>
                  <p className="text-2xl font-bold text-white">42</p>
                </div>
              </div>
            </div>
          </FloatingCard>

          <FloatingCard className="bg-gradient-to-br from-neon-violet/10 to-transparent border-neon-violet/20">
            <h3 className="text-lg font-bold text-white mb-4">Absence Insights</h3>
            <p className="text-sm text-slate-400 mb-6 italic opacity-80">"Spike detected in Grade 12 students. Majority reason: Project Submission overload."</p>
            <button className="w-full py-3 rounded-xl border border-neon-violet/30 text-neon-violet font-bold hover:bg-neon-violet/10 transition-all text-xs uppercase tracking-widest">Generate Report</button>
          </FloatingCard>
        </div>
      </div>
    </div>
  );
};

export default AttendancePage;
